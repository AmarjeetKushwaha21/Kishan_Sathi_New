import { cn } from '@/utils/cn';

const STATUS_TONE = {
  Optimal: 'bg-primary-500',
  Moderate: 'bg-accent-500',
  Deficient: 'bg-rose-400',
  Excessive: 'bg-violet-500',
  Safe: 'bg-primary-500',
};

const STATUS_BADGE = {
  Optimal: 'bg-primary-50 text-primary-700',
  Moderate: 'bg-accent-50 text-accent-700',
  Deficient: 'bg-red-50 text-red-600',
  Excessive: 'bg-violet-50 text-violet-700',
  Safe: 'bg-primary-50 text-primary-700',
};

export default function NutrientMeter({ name, value, unit, status, optimal, icon: Icon }) {
  const max = parseInt((optimal || '100').split(' – ')[1] || (optimal || '100'), 10) || 100;
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-soft">
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-lg text-primary-600">
            <Icon aria-hidden="true" />
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-400">Ideal {optimal} {unit}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-lg font-bold text-gray-900">{value} <span className="text-xs font-medium text-gray-400">{unit}</span></p>
          <span className={cn('inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold', STATUS_BADGE[status] || STATUS_BADGE.Optimal)}>
            {status}
          </span>
        </div>
      </div>
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className={cn('h-full rounded-full transition-all duration-700', STATUS_TONE[status] || 'bg-primary-500')}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}