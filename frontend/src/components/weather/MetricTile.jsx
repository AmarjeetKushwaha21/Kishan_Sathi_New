import Card from '@/components/ui/Card';
import { cn } from '@/utils/cn';

const COLOR_MAP = {
  sky: 'bg-sky-50 text-sky-600',
  primary: 'bg-primary-50 text-primary-600',
  accent: 'bg-accent-50 text-accent-600',
  violet: 'bg-violet-50 text-violet-600',
  rose: 'bg-rose-50 text-rose-500',
};

export default function MetricTile({ icon: Icon, label, value, sub, color = 'sky', className }) {
  return (
    <Card variant="soft" className={cn('flex items-center gap-3 p-4', className)}>
      <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg', COLOR_MAP[color])}>
        <Icon aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">{label}</p>
        <p className="truncate font-display text-base font-bold text-gray-900">{value}</p>
        {sub && <p className="truncate text-[11px] text-gray-400">{sub}</p>}
      </div>
    </Card>
  );
}