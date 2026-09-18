import { FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi';

import { cn } from '@/utils/cn';

export default function TrendBadge({ changePct, className }) {
  const up = changePct >= 0;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full px-2 py-1 text-[11px] font-bold',
        up ? 'bg-primary-100 text-primary-700' : 'bg-red-100 text-red-600',
        className
      )}
    >
      {up ? <FiArrowUpRight aria-hidden="true" /> : <FiArrowDownRight aria-hidden="true" />}
      {up ? '+' : ''}
      {(changePct * 100).toFixed(1)}%
    </span>
  );
}