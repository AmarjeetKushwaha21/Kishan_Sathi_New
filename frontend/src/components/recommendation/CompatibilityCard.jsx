import { FiCheckCircle, FiMinusCircle, FiXCircle } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import ScoreRing from './ScoreRing';
import { cn } from '@/utils/cn';

const STATUS_META = {
  good: { icon: FiCheckCircle, text: 'text-primary-700', chip: 'bg-primary-50 text-primary-700', label: 'Good' },
  fair: { icon: FiMinusCircle, text: 'text-accent-700', chip: 'bg-accent-50 text-accent-700', label: 'Fair' },
  poor: { icon: FiXCircle, text: 'text-rose-600', chip: 'bg-red-50 text-red-600', label: 'Poor' },
};

export default function CompatibilityCard({ crop, type }) {
  const compat = crop[type];
  const isSoil = type === 'soil';

  return (
    <Card variant="soft" className="p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-2xl" aria-hidden="true">
          {crop.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base font-bold text-gray-900">{crop.name}</p>
          <p className="text-xs text-gray-500">{crop.seasonLabel}</p>
        </div>
        <ScoreRing score={compat.score} size={64} stroke={6} label={isSoil ? 'soil' : 'weather'} />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-gray-500">{compat.notes}</p>

      <ul className="mt-4 space-y-2">
        {compat.factors.map((factor) => {
          const meta = STATUS_META[factor.status] || STATUS_META.fair;
          const Icon = meta.icon;
          return (
            <li key={factor.label} className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 shadow-soft">
              <span className="text-xs font-semibold text-gray-500">{factor.label}</span>
              <span className="flex min-w-0 items-center gap-2">
                <span className="truncate text-xs font-semibold text-gray-800">{factor.value}</span>
                <span className={cn('inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold', meta.chip)}>
                  <Icon aria-hidden="true" /> {meta.label}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}