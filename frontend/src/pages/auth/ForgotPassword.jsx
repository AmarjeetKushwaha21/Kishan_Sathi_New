import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiMail } from 'react-icons/fi';

import AuthLayout from '@/components/layout/AuthLayout';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { identifier: '' } });

  async function onSubmit(data) {
    setServerError(null);
    try {
      await forgotPassword({ identifier: data.identifier });
      setSent(true);
    } catch (error) {
      setServerError(error.message);
    }
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your registered mobile number or email and we'll send you a reset link."
    >
      <div className="space-y-5">
        {serverError && <Alert variant="error">{serverError}</Alert>}

        {sent ? (
          <div className="space-y-4">
            <Alert variant="success" title="Reset link sent!">
              Check your SMS/email for instructions to reset your password.
            </Alert>
            <Link to="/login" className="focus-ring block rounded-xl">
              <Button variant="outline" fullWidth leftIcon={FiArrowLeft}>
                Back to login
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Input
              label="Mobile or Email"
              placeholder="10-digit mobile or email address"
              autoComplete="username"
              required
              error={errors.identifier?.message}
              {...register('identifier', {
                required: 'Enter your mobile number or email',
                validate: (value) =>
                  /^[0-9]{10}$/.test(value) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                  'Enter a valid mobile number or email',
              })}
            />

            <Button type="submit" size="lg" fullWidth loading={isSubmitting} leftIcon={FiMail}>
              {isSubmitting ? 'Sending…' : 'Send reset link'}
            </Button>
          </form>
        )}

        <p className="text-center text-sm text-gray-600">
          Remembered it?{' '}
          <Link to="/login" className="font-semibold text-primary-600 hover:text-primary-700">
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}