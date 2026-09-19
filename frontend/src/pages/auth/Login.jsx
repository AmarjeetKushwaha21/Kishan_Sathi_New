import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiLogIn, FiPhone, FiLock, FiUser } from 'react-icons/fi';
import { MdSpa } from 'react-icons/md';

import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const { loginFarmer, isAuthenticated, isFarmer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && isFarmer) {
      const searchParams = new URLSearchParams(location.search);
      const redirectParam = searchParams.get('redirect');
      const target = location.state?.from || redirectParam || '/dashboard';
      // Never redirect a farmer to company portal
      if (!target.includes('/company')) {
        navigate(target, { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, isFarmer, navigate, location.state, location.search]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  function fillDemoFarmer() {
    setValue('phone', '9876543210', { shouldValidate: true });
    setValue('password', 'Sathi@123', { shouldValidate: true });
    setServerError(null);
  }

  async function onSubmit(data) {
    setServerError(null);
    try {
      const result = await loginFarmer({ phone: data.phone, password: data.password });
      if (result.user?.role === 'farmer') {
        const searchParams = new URLSearchParams(location.search);
        const redirectParam = searchParams.get('redirect');
        const from = location.state?.from || redirectParam || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (error) {
      setServerError(error.message || 'Login failed. Please check your credentials.');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-card dark:border-gray-800 dark:bg-gray-900 sm:p-10">
        {/* Brand Logo & Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-2xl text-white shadow-soft">
              <MdSpa />
            </div>
          </Link>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-950/70 dark:text-primary-300">
            <FiUser className="text-xs" />
            <span>Farmer & Producer Portal</span>
          </div>
          <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Farmer Login
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
            Access crop advisory, live mandi prices, farm analytics, and sell your produce directly.
          </p>

          {/* Quick Demo Access Bar */}
          <div className="mt-4 flex items-center justify-between gap-2 rounded-2xl border border-primary-200/80 bg-primary-50/60 p-2.5 text-xs text-primary-900 dark:border-primary-900/50 dark:bg-primary-950/40 dark:text-primary-200">
            <div className="flex flex-col text-left">
              <span className="font-semibold text-primary-800 dark:text-primary-300">Demo Farmer Credentials:</span>
              <span className="text-[11px] text-primary-600 dark:text-primary-400">9876543210 &bull; Sathi@123</span>
            </div>
            <button
              type="button"
              onClick={fillDemoFarmer}
              className="rounded-xl bg-primary-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-primary-700 active:scale-95"
            >
              Fill Demo
            </button>
          </div>
        </div>

        {serverError && <Alert variant="error">{serverError}</Alert>}


        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Input
            label="Mobile Number"
            placeholder="9876543210"
            type="tel"
            inputMode="numeric"
            required
            autoComplete="tel"
            leftIcon={FiPhone}
            error={errors.phone?.message}
            {...register('phone', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Enter a valid 10-digit mobile number',
              },
            })}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            required
            autoComplete="current-password"
            leftIcon={FiLock}
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />

          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="text-xs font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={isSubmitting}
            leftIcon={FiLogIn}
            className="mt-2 bg-primary-600 hover:bg-primary-700"
          >
            {isSubmitting ? 'Authenticating…' : 'Login as Farmer'}
          </Button>
        </form>

        <div className="border-t border-gray-100 pt-5 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <p>
            Are you a Company or Buyer?{' '}
            <Link
              to="/login/company"
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Login to Company Portal →
            </Link>
          </p>
          <p className="mt-2">
            New to Kishan Sathi?{' '}
            <Link
              to="/register"
              state={location.state}
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Create an account
            </Link>
          </p>
          <p className="mt-3">
            <Link to="/" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              ← Return to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}