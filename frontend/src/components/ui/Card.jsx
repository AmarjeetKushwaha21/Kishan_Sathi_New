import { cn } from '@/utils/cn';

const CARD_VARIANTS = {
  default: 'bg-white shadow-card',
  soft: 'bg-white shadow-soft',
  flat: 'bg-white border border-gray-200',
  tinted: 'bg-primary-50/60 border border-primary-100',
  outline: 'bg-white border-2 border-primary-100',
};

export default function Card({ variant = 'default', className, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl p-5 sm:p-6',
        CARD_VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}