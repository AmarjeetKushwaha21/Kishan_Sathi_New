import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiDroplet, FiTrendingUp } from 'react-icons/fi';

import Badge from '@/components/ui/Badge';
import ScoreRing from './ScoreRing';
import SuitabilityBar from './SuitabilityBar';
import { formatINR } from '@/utils/format';

export default function ResultHero({ crop }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-primary-600 to-primary-700 p-6 text-white shadow-soft sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-16 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 h-56 w-56 rounded-full bg-accent-300/20 blur-2xl" />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/15 text-4xl shadow-inner" aria-hidden="true">
              {crop.emoji}
            </span>
            <div>
              <Badge variant="accent">Best pick</Badge>
              <h3 className="mt-1.5 font-display text-2xl font-bold">{crop.name}</h3>
              <p className="text-sm text-primary-100">{crop.seasonLabel} · {crop.bestRegions.join(', ')}</p>
            </div>
          </div>
          <ScoreRing score={crop.suitability} size={104} stroke={9} label="suitability" />
        </div>

        <SuitabilityBar value={crop.suitability} className="mt-5 bg-white/20" />

        <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
            <dt className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-primary-100">
              <FiTrendingUp aria-hidden="true" /> Return / acre
            </dt>
            <dd className="mt-1 font-display text-lg font-bold">{crop.profit.margin}%</dd>
            <dd className="text-[11px] text-primary-100">≈ {formatINR(crop.profit.profitPerAcre)}</dd>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
            <dt className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-primary-100">
              <FiCalendar aria-hidden="true" /> Duration
            </dt>
            <dd className="mt-1 font-display text-lg font-bold">{crop.durationMonths} mo</dd>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
            <dt className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-primary-100">
              <FiDroplet aria-hidden="true" /> Water need
            </dt>
            <dd className="mt-1 font-display text-lg font-bold">{'💧'.repeat(crop.waterNeed)}</dd>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-primary-100">Market demand</dt>
            <dd className="mt-1 font-display text-lg font-bold">{crop.demandTrend}</dd>
            <dd className="text-[11px] text-primary-100">{crop.demandScore}/10 score</dd>
          </div>
        </dl>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link to="/dashboard/recommendation/profit" className="focus-ring rounded-xl bg-white/15 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/25">
            Profit prediction
          </Link>
          <Link to="/dashboard/recommendation/demand" className="focus-ring rounded-xl bg-white/15 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/25">
            Market demand
          </Link>
          <Link to="/dashboard/recommendation/weather" className="focus-ring rounded-xl bg-white/15 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/25">
            Weather fit
          </Link>
          <Link to="/dashboard/recommendation/soil" className="focus-ring rounded-xl bg-white/15 px-3 py-1.5 text-xs font-semibold transition hover:bg-white/25">
            Soil fit
          </Link>
        </div>

        <Link to="/dashboard/recommendation/crops" className="focus-ring mt-5 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline">
          Compare all suitable crops <FiArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}