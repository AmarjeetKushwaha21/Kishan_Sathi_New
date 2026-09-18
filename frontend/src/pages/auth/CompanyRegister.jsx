import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiBriefcase, FiMail, FiPhone, FiLock, FiMapPin, FiFileText } from 'react-icons/fi';
import { MdSpa } from 'react-icons/md';

import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import PasswordInput from '@/components/ui/PasswordInput';
import { useAuth } from '@/context/AuthContext';

export default function CompanyRegister() {
  const { registerCompany } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      companyName: '',
      businessEmail: '',
      phone: '',
      companyType: 'Agri-Procurement & Processing',
      gstin: '',
      state: '',
      city: '',
      pinCode: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  async function onSubmit(data) {
    setServerError(null);
    try {
      await registerCompany({
        companyName: data.companyName,
        businessEmail: data.businessEmail,
        phone: data.phone,
        companyType: data.companyType,
        gstin: data.gstin,
        state: data.state,
        city: data.city,
        pinCode: data.pinCode,
        password: data.password,
      });

      // Navigate to Company Dashboard
      navigate('/company/dashboard', { replace: true });
    } catch (error) {
      setServerError(error.message || 'Company registration failed. Please try again.');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-card dark:border-gray-800 dark:bg-gray-900 sm:p-10">
        {/* Brand Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-2xl text-white shadow-soft">
              <MdSpa />
            </div>
          </Link>
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-950/70 dark:text-primary-300">
            <FiBriefcase className="text-xs" />
            <span>Corporate Buyer Onboarding</span>
          </div>
          <h1 className="mt-3 font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Register Your Company
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400 sm:text-sm">
            Source high-grade farm produce directly from verified farmers across India.
          </p>
        </div>

        {serverError && <Alert variant="error">{serverError}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <Input
            label="Company / Enterprise Name"
            placeholder="e.g. AgriCorp Global B2B Private Limited"
            required
            autoComplete="organization"
            leftIcon={FiBriefcase}
            error={errors.companyName?.message}
            {...register('companyName', {
              required: 'Company name is required',
              minLength: { value: 3, message: 'Company name must be at least 3 characters' },
            })}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input
              label="Business Email"
              type="email"
              placeholder="procurement@company.com"
              required
              autoComplete="email"
              leftIcon={FiMail}
              error={errors.businessEmail?.message}
              {...register('businessEmail', {
                required: 'Business email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Enter a valid business email address',
                },
              })}
            />

            <Input
              label="Contact Phone"
              type="tel"
              placeholder="10-digit phone number"
              autoComplete="tel"
              leftIcon={FiPhone}
              error={errors.phone?.message}
              {...register('phone', {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Enter a valid 10-digit mobile number',
                },
              })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
                Company Type
              </label>
              <select
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-xs transition focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                {...register('companyType')}
              >
                <option value="Agri-Procurement & Processing">Agri-Procurement & Processing</option>
                <option value="Food Processing & Export">Food Processing & Export</option>
                <option value="Wholesale Buyer / Trader">Wholesale Buyer / Trader</option>
                <option value="Retailer / Supermarket Chain">Retailer / Supermarket Chain</option>
                <option value="Agritech & Logistics">Agritech & Logistics</option>
              </select>
            </div>

            <Input
              label="GSTIN Number (optional)"
              placeholder="e.g. 07AAAAA0000A1Z5"
              autoComplete="off"
              leftIcon={FiFileText}
              error={errors.gstin?.message}
              {...register('gstin')}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Input
              label="State"
              placeholder="e.g. Delhi / Punjab"
              leftIcon={FiMapPin}
              error={errors.state?.message}
              {...register('state')}
            />

            <Input
              label="City"
              placeholder="e.g. New Delhi"
              error={errors.city?.message}
              {...register('city')}
            />

            <Input
              label="PIN Code"
              placeholder="e.g. 110001"
              error={errors.pinCode?.message}
              {...register('pinCode')}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <PasswordInput
              label="Password"
              placeholder="At least 6 characters"
              autoComplete="new-password"
              required
              leftIcon={FiLock}
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter password"
              autoComplete="new-password"
              required
              leftIcon={FiLock}
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm password',
                validate: (value) => value === password || 'Passwords do not match',
              })}
            />
          </div>

          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={isSubmitting}
            leftIcon={FiBriefcase}
            className="mt-4 bg-primary-600 hover:bg-primary-700"
          >
            {isSubmitting ? 'Creating Company Account…' : 'Register as Company'}
          </Button>
        </form>

        <div className="border-t border-gray-100 pt-5 text-center text-xs text-gray-500 dark:border-gray-800 dark:text-gray-400">
          <p>
            Already have a corporate account?{' '}
            <Link
              to="/login/company"
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Login to Company Portal →
            </Link>
          </p>
          <p className="mt-2">
            Are you a farmer?{' '}
            <Link
              to="/register"
              className="font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Register as Farmer →
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
