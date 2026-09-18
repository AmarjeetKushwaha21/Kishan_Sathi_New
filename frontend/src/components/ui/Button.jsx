import { forwardRef } from 'react';
import { FiLoader } from 'react-icons/fi';

import { cn } from '@/utils/cn';

const VARIANTS = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500/40 shadow-soft',
  accent:
    'bg-accent-400 text-primary-950 hover:bg-accent-500 focus-visible:ring-accent-500/40 shadow-soft',
  secondary:
    'bg-primary-100 text-primary-800 hover:bg-primary-200 focus-visible:ring-primary-500/30',
  outline:
    'border border-primary-300 bg-white text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-500/30',
  ghost: 'text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-500/30',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500/40 shadow-soft',
  dark: 'bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-700/40 shadow-soft',
};

const SIZES = {
  xs: 'px-3 py-1.5 text-xs',
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
  icon: 'p-2.5',
};

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    loading = false,
    fullWidth = false,
    disabled,
    className,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    type = 'button',
    ...props
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={cn(
        'focus-ring inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.98]',
        VARIANTS[variant],
        SIZES[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'cursor-not-allowed opacity-60 active:scale-100',
        className
      )}
      {...props}
    >
      {loading ? (
        <FiLoader className="animate-spin" aria-hidden="true" />
      ) : (
        LeftIcon && <LeftIcon aria-hidden="true" className="text-lg" />
      )}
      <span>{children}</span>
      {!loading && RightIcon && (
        <RightIcon aria-hidden="true" className="text-lg" />
      )}
    </button>
  );
});

export default Button;