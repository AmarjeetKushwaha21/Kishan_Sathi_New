import { FiAlertTriangle, FiArrowLeft, FiHome } from 'react-icons/fi';

import Button from '@/components/ui/Button';
import PageTransition from '@/components/ui/PageTransition';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage({
  code = 'Error',
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  actionLabel = 'Go to dashboard',
  action,
  showBack = true,
}) {
  const navigate = useNavigate();

  return (
    <PageTransition className="flex min-h-screen flex-col items-center justify-center bg-primary-50/50 px-6 text-center dark:bg-[#0a0f1e]">
      <span className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-red-50 to-accent-50 text-4xl text-red-500 shadow-soft ring-1 ring-inset ring-red-500/10 dark:from-red-500/10 dark:to-accent-500/10">
        <FiAlertTriangle aria-hidden="true" />
      </span>
      <p className="mt-6 font-display text-6xl font-bold text-primary-200 dark:text-primary-800 sm:text-7xl">
        {code}
      </p>
      <h1 className="mt-3 font-display text-2xl font-bold text-gray-900 dark:text-gray-100">
        {title}
      </h1>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {message}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {showBack && (
          <Button variant="outline" leftIcon={FiArrowLeft} onClick={() => navigate(-1)}>
            Go back
          </Button>
        )}
        <Button leftIcon={FiHome} onClick={action ?? (() => navigate('/dashboard'))}>
          {actionLabel}
        </Button>
      </div>
    </PageTransition>
  );
}