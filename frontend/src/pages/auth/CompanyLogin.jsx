import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiBriefcase, FiMail, FiLock } from 'react-icons/fi';
import { MdSpa } from 'react-icons/md';

import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import { useAuth } from '@/context/AuthContext';

export default function CompanyLogin() {
  const { loginCompany, isAuthenticated, isCompany } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && isCompany) {
      navigate('/company/dashboard', { replace: true });
    }
  }, [isAuthenticated, isCompany, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function fillDemoCompany() {
    setValue('email', 'company@kishansathi.demo', { shouldValidate: true });
    setValue('password', 'company123', { shouldValidate: true });
    setServerError(null);
  }

  async function onSubmit(data) {
    setServerError(null);
    try {
      const result = await loginCompany(data);
      if (result.user?.role === 'company') {
        navigate('/company/dashboard', { replace: true });
      }
    } catch (error) {
      setServerError(error.message || 'Login failed. Please check corporate credentials.');
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
            <FiBriefcase className="text-xs" />
            <span>Corporate Procurement Portal</span>
          </div>
          <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Company / Buyer Login
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
            Access crop procurement, direct mandi bids, orders, and your agricultural supply chain.
          </p>

          {/* Quick Demo Access Bar */}
          <div className="mt-4 flex items-center justify-between gap-2 rounded-2xl border border-primary-200/80 bg-primary-50/60 p-2.5 text-xs text-primary-900 dark:border-primary-900/50 dark:bg-primary-950/40 dark:text-primary-200">
            <div className="flex flex-col text-left">
              <span className="font-semibold text-primary-800 dark:text-primary-300">Demo Corporate Credentials:</span>
              <span className="text-[11px] text-primary-600 dark:text-primary-400">company@kishansathi.demo &bull; company123</span>
            </div>
            <button
              type="button"
              onClick={fillDemoCompany}
              className="rounded-xl bg-primary-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-primary-700 active:scale-95"
            >
              Fill Demo
            </button>
          </div>
        </div>

        {serverError && <Alert variant="error">{serverError}</Alert>}


        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Input
            label="Business Email"
            placeholder="company@kishansathi.demo"
            type="email"
            required
            autoComplete="email"
            leftIcon={FiMail}
            error={errors.email?.message}
            {...register('email', {
              required: 'Business email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Enter a valid business email address',
              },
            })}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter corporate password"
            required
            autoComplete="current-password"
            leftIcon={FiLock}
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={isSubmitting}
            leftIcon={FiBriefcase}
            className="mt-2 bg-primary-600 hover:bg-primary-700"
          >
            {isSubmitting ? 'Authenticating…' : 'Login as Company'}
          </Button>
        </form>

        <div className="border-t border-gray-100 pt-5 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <p>
            Are you a farmer?{' '}
            <Link
              to="/login/farmer"
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Login to Farmer Portal →
            </Link>
          </p>
          <p className="mt-2">
            New to Kishan Sathi?{' '}
            <Link
              to="/register/company"
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
