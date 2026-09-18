import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiMapPin, FiTrendingUp } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import TrendBadge from '@/components/mandi/TrendBadge';
import { formatINR } from '@/utils/format';

export default function PriceCard({ row, bestIn = false }) {
  return (
    <Card variant="soft" className="flex flex-col p-4 sm:p-5 transition-shadow hover:shadow-card">
      <div className="flex items-start gap-3">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-2xl shadow-xs"
          aria-hidden="true"
        >
          {row.emoji || '🌾'}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate font-display text-base font-bold text-gray-900">{row.commodity}</p>
            {row.isLive && (
              <span className="inline-flex items-center rounded-md bg-emerald-50 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700">
                Govt
              </span>
            )}
          </div>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            <FiMapPin className="text-primary-600 text-[11px]" />
            <span className="font-medium text-gray-700">{row.mandiName}</span>
            {row.district && <span className="text-gray-400">· {row.district}</span>}
          </p>
          {row.state && <p className="text-[11px] font-semibold text-sky-700">{row.state}</p>}
        </div>
        {row.changePct != null && <TrendBadge changePct={row.changePct} />}
      </div>

      <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Modal Price (Rate)</p>
          <p className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
            {formatINR(row.modal)} <span className="text-xs font-semibold text-gray-400">{row.unit || '₹/qtl'}</span>
          </p>
        </div>
        {bestIn && (
          <Badge variant="outline" size="sm" className="gap-1 border-emerald-300 text-emerald-700">
            <FiTrendingUp aria-hidden="true" /> Top Rate
          </Badge>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-white p-2.5 shadow-soft">
        <div>
          <p className="text-[10px] font-medium text-gray-400">Day's Range</p>
          <p className="text-xs font-semibold text-gray-700">
            {formatINR(row.min)} – {formatINR(row.max)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-medium text-gray-400">Arrival / Variety</p>
          <p className="truncate max-w-[120px] text-xs font-medium text-gray-600">
            {row.variety || row.grade || 'Standard'}
          </p>
        </div>
      </div>

      <Link
        to={`/dashboard/market-prices/compare?c=${encodeURIComponent(row.commodity)}`}
        className="focus-ring mt-3.5 flex items-center justify-center gap-1.5 rounded-xl border border-primary-200 bg-primary-50/60 py-2 text-xs font-bold text-primary-700 transition hover:bg-primary-100"
      >
        Compare Across States <FiArrowRight aria-hidden="true" />
      </Link>
    </Card>
  );
}