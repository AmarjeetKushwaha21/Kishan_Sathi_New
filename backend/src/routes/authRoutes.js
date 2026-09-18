import express from 'express';
import {
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
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Core Authentication Endpoints
router.post('/login', login);
router.post('/login/farmer', loginFarmer);
router.post('/login/company', loginCompany);

router.post('/register/farmer', registerFarmer);
router.post('/register/company', registerCompany);
router.post('/register', registerFarmer);

router.get('/me', protect, getMe);
router.post('/logout', logout);

// OTP & Password Management
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;

