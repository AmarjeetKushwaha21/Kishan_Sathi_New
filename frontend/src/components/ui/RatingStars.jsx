import { FiStar } from 'react-icons/fi';

import { cn } from '@/utils/cn';

const SIZE_MAP = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export default function RatingStars({ rating, value, size = 'sm', showValue = true, className }) {
  const score = Number(rating ?? value ?? 0);
  const rounded = Math.round(score);
  const iconClass = SIZE_MAP[size] || size;

  return (
    <span
      className={cn('inline-flex items-center gap-1', className)}
      aria-label={`${score.toFixed(1)} out of 5 stars`}
    >
      <span className="inline-flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar
            key={i}
            className={cn(
              iconClass,
              i < rounded ? 'fill-accent-400 text-accent-500' : 'fill-gray-200 text-gray-200'
            )}
          />
        ))}
      </span>
      {showValue && (
        <span className="text-xs font-semibold text-gray-700">{score.toFixed(1)}</span>
      )}
    </span>
  );
}