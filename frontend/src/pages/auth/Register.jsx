import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiUserPlus } from 'react-icons/fi';

import AuthLayout from '@/components/layout/AuthLayout';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import { useAuth } from '@/context/AuthContext';

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  async function onSubmit(data) {
    setServerError(null);
    try {
      await registerUser({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        password: data.password,
      });
      const searchParams = new URLSearchParams(location.search);
      const from = location.state?.from || searchParams.get('redirect');
      navigate('/otp', {
        state: { phone: data.phone, purpose: 'registration', from },
      });
    } catch (error) {
      setServerError(error.message);
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join 50,000+ farmers growing smarter with AI."
    >
      <div className="space-y-5">
        {serverError && <Alert variant="error">{serverError}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Input
            label="Full Name"
            placeholder="e.g. Amarjeet Kushwaha"
            autoComplete="name"
            required
            error={errors.fullName?.message}
            {...register('fullName', {
              required: 'Please enter your name',
              minLength: { value: 3, message: 'Name must be at least 3 characters' },
            })}
          />

          <Input
            label="Mobile Number"
            placeholder="10-digit mobile number"
            inputMode="numeric"
            autoComplete="tel"
            required
            error={errors.phone?.message}
            {...register('phone', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Enter a valid 10-digit mobile number',
              },
            })}
          />

          <Input
            label="Email (optional)"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email', {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            })}
          />

          <PasswordInput
            label="Password"
            placeholder="At least 6 characters"
            autoComplete="new-password"
            required
            hint="Use at least 6 characters with a mix of letters and numbers."
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-enter your password"
            autoComplete="new-password"
            required
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === password || 'Passwords do not match',
            })}
          />

          <Button type="submit" size="lg" fullWidth loading={isSubmitting} leftIcon={FiUserPlus}>
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </Button>
        </form>

        <p className="text-center text-xs text-gray-500">
          By continuing, you agree to our{' '}
          <a href="#" className="font-medium text-primary-600 hover:text-primary-700">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-primary-600 hover:text-primary-700">
            Privacy Policy
          </a>
          .
        </p>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
            Log in
          </Link>
        </p>

        <p className="text-center text-xs text-gray-500">
          Are you a Company or Bulk Buyer?{' '}
          <Link to="/register/company" className="font-semibold text-primary-600 hover:text-primary-700">
            Register as Company →
          </Link>
        </p>

      </div>
    </AuthLayout>
  );
}