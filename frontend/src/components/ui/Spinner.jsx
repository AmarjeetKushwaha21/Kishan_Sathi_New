import { FiLoader } from 'react-icons/fi';

import { cn } from '@/utils/cn';

const SIZES = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
};

export default function Spinner({ size = 'md', className, label = 'Loading…' }) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn('inline-flex items-center justify-center gap-3', className)}
    >
      <FiLoader
        aria-hidden="true"
        className={cn('animate-spin rounded-full text-primary-600', SIZES[size])}
      />
      <span className="sr-only">{label}</span>
    </span>
  );
}