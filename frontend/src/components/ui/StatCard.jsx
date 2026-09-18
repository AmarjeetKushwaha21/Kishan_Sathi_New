import { FiArrowUpRight } from 'react-icons/fi';

import Card from './Card';
import { cn } from '@/utils/cn';

export default function StatCard({ icon: Icon, label, value, trend, trendDirection = 'up', color = 'primary' }) {
  const colorMap = {
    primary: 'bg-primary-50 text-primary-600',
    accent: 'bg-accent-50 text-accent-600',
    sky: 'bg-sky-50 text-sky-600',
    violet: 'bg-violet-50 text-violet-600',
  };

  return (
    <Card variant="soft" className="flex items-center gap-4 p-4 sm:p-5">
      <span
        className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl',
          colorMap[color]
        )}
      >
        <Icon aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</p>
        <p className="font-display text-xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className="mt-0.5 inline-flex items-center gap-1 text-xs font-medium text-primary-600">
            <FiArrowUpRight className={cn(trendDirection === 'down' && 'rotate-90 text-red-500')} aria-hidden="true" />
            {trend}
          </p>
        )}
      </div>
    </Card>
  );
}