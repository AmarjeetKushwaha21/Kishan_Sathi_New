import jwt from 'jsonwebtoken';

const getSecret = () => {
  const secret = process.env.JWT_SECRET || 'kishan_sathi_production_fallback_jwt_secret_2026';
  if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
    console.warn('⚠️ [JWT Warning]: JWT_SECRET is not set in environment variables. Using fallback secret.');
  }
  return secret;
};

const getExpiresIn = () => process.env.JWT_EXPIRES_IN || '7d';

/**
 * Generate signed JWT access token containing only minimal safe payload
 * @param {Object} user - User document or minimal object with id/_id and role
 */
export function generateToken(user) {
  const payload = {
    id: (user.id || user._id).toString(),
    role: user.role,
  };

  return jwt.sign(payload, getSecret(), {
    expiresIn: getExpiresIn(),
  });
}

/**
 * Generate signed refresh token
 */
export function generateRefreshToken(user) {
  const payload = {
    id: (user.id || user._id).toString(),
    role: user.role,
  };

  return jwt.sign(payload, getSecret(), {
    expiresIn: '30d',
  });
}

/**
 * Verify signed JWT token
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, getSecret());
  } catch (error) {
    return null;
  }
}

export default generateToken;
