import { MdSpa } from 'react-icons/md';

import { cn } from '@/utils/cn';
import { APP } from '@/constants/app';

const SIZES = {
  sm: 'h-8 w-8 text-sm',
  md: 'h-10 w-10 text-lg',
  lg: 'h-14 w-14 text-2xl',
};

const TEXT_SIZES = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-2xl',
};

export default function Logo({ size = 'md', className, textClassName, showText = true }) {
  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        className={cn(
          'flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-soft',
          SIZES[size]
        )}
        aria-hidden="true"
      >
        <MdSpa />
      </span>
      {showText && (
        <span
          className={cn(
            'font-display font-bold tracking-tight text-gray-900',
            TEXT_SIZES[size],
            textClassName
          )}
        >
          {APP.name}
          <span className="text-primary-600">.</span>
        </span>
      )}
    </span>
  );
}