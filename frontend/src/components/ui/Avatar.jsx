import { cn } from '@/utils/cn';

const SIZES = {
  xs: 'h-7 w-7 text-xs',
  sm: 'h-9 w-9 text-sm',
  md: 'h-11 w-11 text-base',
  lg: 'h-16 w-16 text-xl',
};

export default function Avatar({ name = '', src, size = 'md', color = '#16a34a', className }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white',
        SIZES[size],
        className
      )}
      style={!src ? { backgroundColor: color } : undefined}
      aria-hidden="true"
    >
      {src ? (
        <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full rounded-full object-cover" />
      ) : (
        initials
      )}
    </span>
  );
}