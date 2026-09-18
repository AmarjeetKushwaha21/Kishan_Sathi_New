import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiDroplet } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import ScoreRing from './ScoreRing';
import SuitabilityBar from './SuitabilityBar';
import { formatINR } from '@/utils/format';

export default function CropCard({ crop, highlight = false, to }) {
  const Inner = (
    <Card
      variant="soft"
      className={`flex h-full flex-col p-4 sm:p-5 ${highlight ? 'border-2 border-primary-200 bg-primary-50/40' : ''}`}
    >
      <div className="flex items-start gap-3">
        {crop.image ? (
          <img
            src={crop.image}
            alt={crop.name}
            className="h-12 w-12 shrink-0 rounded-2xl object-cover shadow-soft ring-1 ring-black/5"
          />
        ) : (
          <span
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${
              highlight ? 'bg-white shadow-soft' : 'bg-primary-50'
            }`}
            aria-hidden="true"
          >
            {crop.emoji}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-bold text-gray-900">{crop.name}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <Badge variant="outline" size="sm">{crop.seasonLabel}</Badge>
            {crop.demandScore >= 8 && <Badge variant="accent" size="sm">{crop.demandTrend} demand</Badge>}
          </div>
        </div>
        <ScoreRing score={crop.suitability} size={64} stroke={6} />
      </div>

      <SuitabilityBar value={crop.suitability} className="mt-4" />

      <dl className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-white p-2.5 text-center shadow-soft">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Duration</dt>
          <dd className="mt-0.5 flex items-center justify-center gap-1 text-sm font-bold text-gray-800">
            <FiCalendar className="text-gray-400" aria-hidden="true" /> {crop.durationMonths} mo
          </dd>
        </div>
        <div className="rounded-xl bg-white p-2.5 text-center shadow-soft">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Water need</dt>
          <dd className="mt-0.5 flex items-center justify-center gap-1 text-sm font-bold text-gray-800">
            <FiDroplet className="text-sky-500" aria-hidden="true" /> {'💧'.repeat(crop.waterNeed)}
          </dd>
        </div>
        <div className="rounded-xl bg-white p-2.5 text-center shadow-soft">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Investment</dt>
          <dd className="mt-0.5 text-sm font-bold text-gray-800">{formatINR(crop.profit.costPerAcre)}/ac</dd>
        </div>
        <div className="rounded-xl bg-white p-2.5 text-center shadow-soft">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Return</dt>
          <dd className="mt-0.5 text-sm font-bold text-primary-700">{crop.profit.margin}%</dd>
        </div>
      </dl>

      {crop.risks?.length > 0 && (
        <p className="mt-3 truncate text-[11px] text-gray-400" title={crop.risks[0]}>
          ⚠ {crop.risks[0]}
        </p>
      )}

      {to && (
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-600">
          View details <FiArrowRight aria-hidden="true" />
        </span>
      )}
    </Card>
  );

  if (!to) return Inner;
  return (
    <Link to={to} className="focus-ring block h-full rounded-2xl">
      {Inner}
    </Link>
  );
}