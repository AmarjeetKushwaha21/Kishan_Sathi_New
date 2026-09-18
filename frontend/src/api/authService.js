import httpClient from './httpClient';

export const authService = {
  /**
   * Universal login (farmer or company)
   * POST /api/auth/login
   */
  async login(credentials) {
    const { data } = await httpClient.post('/auth/login', credentials);
    return data;
  },

  /**
   * Register new farmer
   * POST /api/auth/register/farmer
   */
  async registerFarmer(payload) {
    const { data } = await httpClient.post('/auth/register/farmer', payload);
    return data;
  },

  /**
   * Register new corporate company
   * POST /api/auth/register/company
   */
  async registerCompany(payload) {
    const { data } = await httpClient.post('/auth/register/company', payload);
    return data;
  },

  /**
   * Backward-compatible register alias
   */
  async register(payload) {
    return this.registerFarmer(payload);
  },

  /**
   * Get current authenticated user profile
   * GET /api/auth/me
   */
  async getCurrentUser() {
    const { data } = await httpClient.get('/auth/me');
    return data;
  },

  /**
   * Verify registration OTP
   * POST /api/auth/verify-otp
   */
  async verifyOtp(payload) {
    const { data } = await httpClient.post('/auth/verify-otp', payload);
    return data;
  },

  /**
   * Resend OTP
   * POST /api/auth/resend-otp
   */
  async resendOtp(payload) {
    const { data } = await httpClient.post('/auth/resend-otp', payload);
    return data;
  },

  /**
   * Forgot password request
   * POST /api/auth/forgot-password
   */
  async forgotPassword(payload) {
    const { data } = await httpClient.post('/auth/forgot-password', payload);
    return data;
  },

  /**
   * Reset password with token
   * POST /api/auth/reset-password
   */
  async resetPassword(payload) {
    const { data } = await httpClient.post('/auth/reset-password', payload);
    return data;
  },

  /**
   * Logout session
   * POST /api/auth/logout
   */
  async logout() {
    try {
      const { data } = await httpClient.post('/auth/logout');
      return data;
    } catch {
      return { success: true, message: 'Logged out' };
    }
  },
};

export default authService;

