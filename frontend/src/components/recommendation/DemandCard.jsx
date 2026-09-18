import { FiTrendingUp, FiTruck } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

const TREND_TONE = {
  Rising: { badge: 'primary', text: 'text-primary-600' },
  Stable: { badge: 'accent', text: 'text-accent-600' },
  Seasonal: { badge: 'outline', text: 'text-gray-600' },
};

export default function DemandCard({ crop, highlight = false }) {
  const tone = TREND_TONE[crop.demandTrend] || TREND_TONE.Stable;

  return (
    <Card variant="soft" className={cn('p-4 sm:p-5', highlight && 'border-2 border-primary-200 bg-primary-50/40')}>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-2xl" aria-hidden="true">
          {crop.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base font-bold text-gray-900">{crop.name}</p>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant={tone.badge} size="sm">
              <FiTrendingUp aria-hidden="true" /> {crop.demandTrend}
            </Badge>
            <span className="text-xs text-gray-400">{crop.demandScore}/10 demand</span>
          </div>
        </div>
        <span className="text-right">
          <span className="block font-display text-lg font-bold text-gray-900">{formatINR(crop.pricePerQuintal)}</span>
          <span className="block text-[10px] text-gray-400">/ quintal</span>
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-[11px] font-semibold text-gray-400">Demand</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-accent-400 to-primary-500"
            style={{ width: `${crop.demandScore * 10}%` }}
          />
        </div>
        <span className="text-xs font-bold text-gray-800">{crop.demandScore * 10}%</span>
      </div>

      <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-gray-500">
        <FiTruck className="mt-0.5 shrink-0 text-primary-500" aria-hidden="true" />
        {crop.marketNote}
      </p>
    </Card>
  );
}