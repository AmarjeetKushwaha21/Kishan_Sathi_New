import { FiMinus, FiPlus } from 'react-icons/fi';

import { cn } from '@/utils/cn';

export default function QuantityStepper({ value, onChange, min = 1, max = 99, size = 'md', disabled }) {
  const sizes = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-9 w-9 text-sm',
  };

  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border border-primary-200 bg-white" role="group" aria-label="Quantity">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={disabled || value <= min}
        aria-label="Decrease quantity"
        className={cn(
          'focus-ring flex items-center justify-center text-gray-600 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-40',
          sizes[size]
        )}
      >
        <FiMinus aria-hidden="true" />
      </button>
      <span className={cn('min-w-10 select-none border-x border-gray-100 text-center font-bold text-gray-900', size === 'sm' ? 'text-xs leading-7' : 'text-sm leading-9')} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={disabled || value >= max}
        aria-label="Increase quantity"
        className={cn(
          'focus-ring flex items-center justify-center text-gray-600 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:opacity-40',
          sizes[size]
        )}
      >
        <FiPlus aria-hidden="true" />
      </button>
    </div>
  );
}