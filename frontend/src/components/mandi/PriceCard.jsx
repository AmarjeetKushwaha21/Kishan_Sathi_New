import { Link } from 'react-router-dom';
import { FiArrowRight, FiTrendingUp } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import TrendBadge from '@/components/mandi/TrendBadge';
import { formatINR } from '@/utils/format';

export default function PriceCard({ row, bestIn = false }) {
  return (
    <Card variant="soft" className="flex flex-col p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-2xl" aria-hidden="true">
          {row.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-sm font-bold text-gray-900">{row.commodity}</p>
          <p className="text-xs text-gray-400">{row.category} · {row.mandiName}</p>
        </div>
        <TrendBadge changePct={row.changePct} />
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Modal price</p>
          <p className="font-display text-2xl font-bold text-gray-900">
            {formatINR(row.modal)} <span className="text-xs font-medium text-gray-400">{row.unit}</span>
          </p>
        </div>
        {bestIn && (
          <Badge variant="outline" size="sm" className="gap-1">
            <FiTrendingUp aria-hidden="true" /> Best rate
          </Badge>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-soft">
        <p className="text-[11px] text-gray-500">
          Range <span className="font-semibold text-gray-700">{formatINR(row.min)} – {formatINR(row.max)}</span>
        </p>
        <p className="text-[11px] text-gray-400">~{row.vol} qtl</p>
      </div>

      <Link
        to={`/dashboard/market-prices/charts?c=${row.commodityKey}`}
        className="focus-ring mt-3 flex items-center justify-center gap-1.5 rounded-xl border border-primary-200 bg-primary-50/60 py-2 text-xs font-bold text-primary-700 transition hover:bg-primary-100"
      >
        View price chart <FiArrowRight aria-hidden="true" />
      </Link>
    </Card>
  );
}