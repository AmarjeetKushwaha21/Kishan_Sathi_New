const rawApiUrl = (import.meta.env.VITE_API_URL || '').trim();
const resolvedBaseUrl = rawApiUrl
  ? (rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl.replace(/\/+$/, '')}/api`)
  : '/api';

export const APP = Object.freeze({
  name: 'Kishan Sathi',
  tagline: 'AI-Powered Agriculture Companion',
  description:
    'Your AI-powered agriculture companion. Smart crop insights, weather alerts, market prices and expert guidance — all in one place.',
  baseUrl: resolvedBaseUrl,
  version: '0.1.0',
  supportEmail: 'support@kishansathi.in',
});

export const STORAGE_KEYS = Object.freeze({
  token: 'ks_access_token',
  refreshToken: 'ks_refresh_token',
  user: 'ks_user',
  otpPending: 'ks_otp_pending',
});

export const OTP_LENGTH = 4;