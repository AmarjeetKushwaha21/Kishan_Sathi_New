import { cn } from '@/utils/cn';

export default function SuitabilityBar({ value, className }) {
  const tone = value >= 80 ? 'bg-primary-500' : value >= 60 ? 'bg-accent-500' : 'bg-rose-400';
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-gray-100', className)} role="img" aria-label={`${value}% suitability`}>
      <div
        className={cn('h-full rounded-full transition-all duration-700', tone)}
        style={{ width: `${Math.min(100, value)}%` }}
      />
    </div>
  );
}