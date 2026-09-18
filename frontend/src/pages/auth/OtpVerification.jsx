import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiShield } from 'react-icons/fi';

import AuthLayout from '@/components/layout/AuthLayout';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import OtpInput from '@/components/ui/OtpInput';
import { OTP_LENGTH } from '@/constants/app';
import { useAuth } from '@/context/AuthContext';

function useCountdown(seconds) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  return { remaining, reset: () => setRemaining(seconds) };
}

export default function OtpVerification() {
  const { verifyOtp, resendOtp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || '98xxxxxx10';

  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [verifying, setVerifying] = useState(false);
  const { remaining, reset } = useCountdown(30);

  useEffect(() => {
    if (otp.length === OTP_LENGTH && !verifying) {
      handleVerify(otp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  async function handleVerify(code) {
    setError(null);
    setVerifying(true);
    try {
      await verifyOtp({ phone, otp: code, purpose: 'registration' });
      const searchParams = new URLSearchParams(location.search);
      const from = location.state?.from || searchParams.get('redirect') || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      setOtp('');
    } finally {
      setVerifying(false);
    }
  }

  async function handleResend() {
    setError(null);
    setInfo(null);
    try {
      await resendOtp({ phone });
      setInfo('A new OTP has been sent to your mobile.');
      reset();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <AuthLayout
      title="Verify your number"
      subtitle={`We sent a 4-digit code to ${phone}.`}
    >
      <div className="space-y-5">
        <Alert variant="success" title="OTP sent">
          Use <strong>1234</strong> in demo mode.
        </Alert>

        {info && <Alert variant="info">{info}</Alert>}
        {error && <Alert variant="error">{error}</Alert>}

        <OtpInput
          length={OTP_LENGTH}
          value={otp}
          onChange={setOtp}
          error={error}
          disabled={verifying}
        />

        <Button
          size="lg"
          fullWidth
          loading={verifying}
          disabled={otp.length !== OTP_LENGTH}
          leftIcon={FiCheckCircle}
          onClick={() => handleVerify(otp)}
        >
          {verifying ? 'Verifying…' : 'Verify & Continue'}
        </Button>

        <div className="flex items-center justify-between text-sm">
          <p className="flex items-center gap-1.5 text-gray-500">
            <FiShield className="text-primary-500" aria-hidden="true" />
            OTP is valid for 10 minutes
          </p>
          <button
            type="button"
            onClick={handleResend}
            disabled={remaining > 0}
            className="focus-ring rounded-md font-semibold text-primary-600 transition hover:text-primary-700 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            {remaining > 0 ? `Resend in 0:${String(remaining).padStart(2, '0')}` : 'Resend OTP'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-600">
          Wrong number?{' '}
          <Link to="/register" className="font-semibold text-primary-600 hover:text-primary-700">
            Change it here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}