import { FiArrowDownRight, FiArrowUpRight, FiTrendingUp } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

export default function ProfitCard({ crop, highlight = false }) {
  const { costPerAcre, revenuePerAcre, profitPerAcre, margin } = crop.profit;
  const tone = margin >= 250 ? 'bg-primary-500' : margin >= 150 ? 'bg-accent-500' : 'bg-rose-400';

  return (
    <Card variant="soft" className={cn('p-4 sm:p-5', highlight && 'border-2 border-primary-200 bg-primary-50/40')}>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-2xl" aria-hidden="true">
          {crop.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base font-bold text-gray-900">{crop.name}</p>
          <p className="flex items-center gap-1 text-xs font-semibold text-primary-600">
            <FiTrendingUp aria-hidden="true" /> {margin}% return / acre
          </p>
        </div>
        <span className="text-right">
          <span className="block font-display text-lg font-bold text-gray-900">{formatINR(profitPerAcre)}</span>
          <span className="block text-[10px] text-gray-400">profit / acre</span>
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span className="text-[11px] font-semibold text-gray-400">ROI</span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
          <div className={cn('h-full rounded-full', tone)} style={{ width: `${Math.min(100, margin)}%` }} />
        </div>
        <span className="text-xs font-bold text-gray-800">{margin}%</span>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-xl bg-white p-2.5 shadow-soft">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Cost</dt>
          <dd className="mt-0.5 flex items-center justify-center gap-0.5 text-sm font-bold text-rose-500">
            <FiArrowDownRight aria-hidden="true" /> {formatINR(costPerAcre)}
          </dd>
        </div>
        <div className="rounded-xl bg-white p-2.5 shadow-soft">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Revenue</dt>
          <dd className="mt-0.5 flex items-center justify-center gap-0.5 text-sm font-bold text-gray-900">
            <FiArrowUpRight aria-hidden="true" /> {formatINR(revenuePerAcre)}
          </dd>
        </div>
        <div className="rounded-xl bg-white p-2.5 shadow-soft">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Yield</dt>
          <dd className="mt-0.5 text-sm font-bold text-gray-800">{crop.yieldPerAcre} qtl/ac</dd>
        </div>
      </dl>

      <p className="mt-3 text-xs leading-relaxed text-gray-500">{crop.marketNote}</p>
    </Card>
  );
}