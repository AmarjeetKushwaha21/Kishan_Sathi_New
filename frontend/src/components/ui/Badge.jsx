import { cn } from '@/utils/cn';

const VARIANTS = {
  default: 'bg-gray-100 text-gray-700',
  primary: 'bg-primary-100 text-primary-800',
  accent: 'bg-accent-100 text-accent-800',
  danger: 'bg-red-100 text-red-700',
  outline: 'border border-primary-200 bg-white text-primary-700',
};

const SIZES = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-2.5 py-1 text-xs',
};

export default function Badge({ variant = 'primary', size = 'md', className, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-semibold',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}