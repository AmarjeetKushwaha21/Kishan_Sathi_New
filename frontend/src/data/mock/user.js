import mockUser from '@/data/mockUser.json';

export const DEMO_USER = Object.freeze({
  id: mockUser.id,
  fullName: mockUser.fullName,
  firstName: mockUser.firstName,
  lastName: mockUser.lastName,
  phone: mockUser.phone,
  email: mockUser.email,
  role: mockUser.role,
  avatarColor: mockUser.avatarColor,
  preferences: mockUser.preferences,
});

export const DEMO_CREDENTIALS = Object.freeze({
  phone: '9876543210',
  password: 'Sathi@123',
  email: mockUser.email,
  otp: '1234',
});

export const DEMO_OTP = '1234';

