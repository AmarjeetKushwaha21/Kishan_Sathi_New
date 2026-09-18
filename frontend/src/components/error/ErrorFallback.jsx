import { FiAlertTriangle } from 'react-icons/fi';

import Button from '@/components/ui/Button';

export default function ErrorFallback({ reset }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary-50/50 px-6 text-center dark:bg-[#0a0f1e]">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-3xl text-red-500 ring-1 ring-inset ring-red-500/10 dark:bg-red-500/10">
        <FiAlertTriangle aria-hidden="true" />
      </span>
      <h1 className="mt-6 font-display text-2xl font-bold text-gray-900 dark:text-gray-100">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
        An unexpected error occurred while rendering this page. Try reloading, or head back to the
        dashboard.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button leftIcon={FiAlertTriangle} onClick={reset}>
          Reload page
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            window.location.href = '/dashboard';
          }}
        >
          Go to dashboard
        </Button>
      </div>
    </div>
  );
}