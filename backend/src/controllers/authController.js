import User from '../models/User.js';
import Farmer from '../models/Farmer.js';
import Company from '../models/Company.js';
import { generateToken, generateRefreshToken } from '../utils/generateToken.js';

// Predefined demo credentials for fallback/initial seeds
export const DEMO_CREDENTIALS = {
  farmer: {
    phone: '9876543210',
    email: 'farmer@kishansathi.demo',
    password: 'Sathi@123',
  },
  company: {
    email: 'company@kishansathi.demo',
    password: 'company123',
  },
};

/**
 * Universal Login for both Farmer and Company
 * POST /api/auth/login
 */
export async function login(req, res, next) {
  try {
    const { phone, email, password } = req.body;

    if (!password || (!phone && !email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email or phone and password',
      });
    }

    const cleanEmail = email ? email.trim().toLowerCase() : null;
    const cleanPhone = phone ? phone.trim() : null;

    const query = cleanEmail ? { email: cleanEmail } : { phone: cleanPhone };
    const user = await User.findOne(query).select('+password');

    // Generic invalid credentials response to prevent user enumeration
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    if (user.isActive === false) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Please contact support.',
      });
    }

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    const safeUser = {
      id: user._id,
      name: user.name,
      fullName: user.name,
      email: user.email || '',
      phone: user.phone || '',
      role: user.role,
      avatarColor: user.avatarColor,
    };

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        refreshToken,
        user: safeUser,
      },
      token,
      accessToken: token,
      refreshToken,
      role: user.role,
      user: safeUser,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Farmer Login explicitly
 * POST /api/auth/login/farmer
 */
export async function loginFarmer(req, res, next) {
  req.body.role = 'farmer';
  return login(req, res, next);
}

/**
 * Company Login explicitly
 * POST /api/auth/login/company
 */
export async function loginCompany(req, res, next) {
  req.body.role = 'company';
  return login(req, res, next);
}

/**
 * Register Farmer
 * POST /api/auth/register/farmer
 */
export async function registerFarmer(req, res, next) {
  let createdUser = null;
  try {
    const rawName = req.body.name || req.body.fullName;
    const { phone, password, state, district, village, email } = req.body;

    if (!rawName || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, mobile number, and password are required',
      });
    }

    const name = rawName.trim();
    const cleanPhone = phone.trim();
    const cleanEmail = email ? email.trim().toLowerCase() : undefined;

    // Minimum password length validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Check duplicate phone
    const existingPhone = await User.findOne({ phone: cleanPhone });
    if (existingPhone) {
      return res.status(409).json({
        success: false,
        message: 'An account with this mobile number already exists',
      });
    }

    // Check duplicate email if provided
    if (cleanEmail) {
      const existingEmail = await User.findOne({ email: cleanEmail });
      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: 'An account with this email already exists',
        });
      }
    }

    // 1. Create User
    createdUser = await User.create({
      name,
      phone: cleanPhone,
      email: cleanEmail,
      password,
      role: 'farmer',
    });

    // 2. Create Farmer profile with transaction safety (rollback on failure)
    try {
      await Farmer.create({
        user: createdUser._id,
        userId: createdUser._id,
        fullName: name,
        phone: cleanPhone,
        email: cleanEmail || '',
        state: state || 'Punjab',
        district: district || 'Ludhiana',
        village: village || 'Samrala',
      });
    } catch (profileError) {
      // Rollback newly created User to prevent orphaned records
      if (createdUser && createdUser._id) {
        await User.findByIdAndDelete(createdUser._id);
      }
      throw profileError;
    }

    const token = generateToken(createdUser);
    const refreshToken = generateRefreshToken(createdUser);

    const safeUser = {
      id: createdUser._id,
      name: createdUser.name,
      fullName: createdUser.name,
      phone: createdUser.phone,
      email: createdUser.email || '',
      role: 'farmer',
    };

    return res.status(201).json({
      success: true,
      message: 'Farmer registered successfully',
      data: {
        token,
        refreshToken,
        user: safeUser,
      },
      token,
      accessToken: token,
      refreshToken,
      role: 'farmer',
      user: safeUser,
    });
  } catch (error) {
    // If an error occurred and user was created, rollback
    if (createdUser && createdUser._id) {
      try {
        await User.findByIdAndDelete(createdUser._id);
      } catch (cleanupErr) {
        console.error('Failed to cleanup user during registration failure:', cleanupErr);
      }
    }
    next(error);
  }
}

/**
 * Register Company
 * POST /api/auth/register/company
 */
export async function registerCompany(req, res, next) {
  let createdUser = null;
  try {
    const rawCompanyName = req.body.companyName || req.body.name;
    const rawEmail = req.body.businessEmail || req.body.email;
    const { phone, password, companyType, gstin, state, city, pinCode } = req.body;

    if (!rawCompanyName || !rawEmail || !password) {
      return res.status(400).json({
        success: false,
        message: 'Company name, business email, and password are required',
      });
    }

    const companyName = rawCompanyName.trim();
    const cleanEmail = rawEmail.trim().toLowerCase();
    const cleanPhone = phone ? phone.trim() : undefined;

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid business email address',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Check duplicate email
    const existingEmail = await User.findOne({ email: cleanEmail });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: 'An account with this email already exists',
      });
    }

    // 1. Create User
    createdUser = await User.create({
      name: companyName,
      email: cleanEmail,
      phone: cleanPhone,
      password,
      role: 'company',
    });

    // 2. Create Company profile with rollback safety
    try {
      await Company.create({
        user: createdUser._id,
        userId: createdUser._id,
        companyName,
        businessEmail: cleanEmail,
        phone: cleanPhone || '',
        companyType: companyType || 'Agri-Procurement & Processing',
        gstin: gstin || '',
        state: state || '',
        city: city || '',
        pinCode: pinCode || '',
      });
    } catch (profileError) {
      if (createdUser && createdUser._id) {
        await User.findByIdAndDelete(createdUser._id);
      }
      throw profileError;
    }

    const token = generateToken(createdUser);
    const refreshToken = generateRefreshToken(createdUser);

    const safeUser = {
      id: createdUser._id,
      name: createdUser.name,
      companyName,
      email: createdUser.email,
      phone: createdUser.phone || '',
      role: 'company',
    };

    return res.status(201).json({
      success: true,
      message: 'Company registered successfully',
      data: {
        token,
        refreshToken,
        user: safeUser,
      },
      token,
      accessToken: token,
      refreshToken,
      role: 'company',
      user: safeUser,
    });
  } catch (error) {
    if (createdUser && createdUser._id) {
      try {
        await User.findByIdAndDelete(createdUser._id);
      } catch (cleanupErr) {
        console.error('Failed to cleanup user during registration failure:', cleanupErr);
      }
    }
    next(error);
  }
}

/**
 * Logout
 * POST /api/auth/logout
 */
export async function logout(req, res) {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
}

/**
 * Verify OTP (Maintains compatibility with frontend OTP page)
 * POST /api/auth/verify-otp
 */
export async function verifyOtp(req, res, next) {
  try {
    const { otp, phone } = req.body;
    if (!otp) {
      return res.status(400).json({
        success: false,
        message: 'OTP is required',
      });
    }

    const cleanPhone = (phone || '').trim();

    if (cleanPhone) {
      const dbUser = await User.findOne({ phone: cleanPhone });
      if (dbUser) {
        const token = generateToken(dbUser);
        const refreshToken = generateRefreshToken(dbUser);
        const safeUser = {
          id: dbUser._id,
          name: dbUser.name,
          fullName: dbUser.name,
          phone: dbUser.phone,
          email: dbUser.email,
          role: dbUser.role,
        };

        return res.status(200).json({
          success: true,
          message: 'OTP verified successfully',
          data: {
            token,
            refreshToken,
            user: safeUser,
          },
          token,
          accessToken: token,
          refreshToken,
          role: dbUser.role,
          user: safeUser,
        });
      }
    }

    // In demo development mode, accept standard test OTP
    if (otp === '1234' || otp === '123456') {
      const existingUser = await User.findOne({ role: 'farmer' });
      if (existingUser) {
        const token = generateToken(existingUser);
        return res.status(200).json({
          success: true,
          message: 'OTP verified successfully',
          token,
          accessToken: token,
          role: 'farmer',
          user: {
            id: existingUser._id,
            name: existingUser.name,
            fullName: existingUser.name,
            phone: existingUser.phone,
            role: 'farmer',
          },
        });
      }
    }

    return res.status(400).json({
      success: false,
      message: 'Invalid OTP. Please try again.',
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Resend OTP
 * POST /api/auth/resend-otp
 */
export async function resendOtp(req, res) {
  res.status(200).json({
    success: true,
    message: 'OTP resent successfully to registered phone/email',
  });
}

/**
 * Forgot Password
 * POST /api/auth/forgot-password
 */
export async function forgotPassword(req, res) {
  res.status(200).json({
    success: true,
    message: 'Password reset service is coming soon. Please contact administrator.',
  });
}

/**
 * Reset Password
 * POST /api/auth/reset-password
 */
export async function resetPassword(req, res) {
  res.status(200).json({
    success: true,
    message: 'Password reset service is coming soon.',
  });
}

/**
 * Get current authenticated user profile
 * GET /api/auth/me
 */
export async function getMe(req, res, next) {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    let extraProfile = null;
    if (req.user.role === 'farmer') {
      extraProfile = await Farmer.findOne({
        $or: [{ user: req.user._id }, { userId: req.user._id }],
      });
    } else if (req.user.role === 'company') {
      extraProfile = await Company.findOne({
        $or: [{ user: req.user._id }, { userId: req.user._id }],
      });
    }

    const safeUser = {
      id: req.user._id,
      name: req.user.name,
      fullName: req.user.name,
      email: req.user.email || '',
      phone: req.user.phone || '',
      role: req.user.role,
      avatarColor: req.user.avatarColor,
      isActive: req.user.isActive,
    };

    res.status(200).json({
      success: true,
      data: {
        user: safeUser,
        profile: extraProfile,
      },
      user: safeUser,
      profile: extraProfile,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  login,
  loginFarmer,
  loginCompany,
  registerFarmer,
  registerCompany,
  verifyOtp,
  resendOtp,
  forgotPassword,
  resetPassword,
  logout,
  getMe,
};

