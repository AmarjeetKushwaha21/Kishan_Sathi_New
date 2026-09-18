import { FiFileText, FiMapPin } from 'react-icons/fi';

import Badge from '@/components/ui/Badge';
import ScoreRing from '@/components/recommendation/ScoreRing';
import { cn } from '@/utils/cn';

export default function ReportHero({ report }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-primary-600 to-primary-700 p-6 text-white shadow-soft sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 -top-16 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -left-12 h-56 w-56 rounded-full bg-accent-300/20 blur-2xl" />

      <div className="relative">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="accent">{report.id}</Badge>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Sample {report.sampleId}</span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold">{report.farmer.plot}</h3>
            <p className="mt-1 text-sm text-primary-100">
              {report.soilType} soil · {report.farmer.area} · {report.labName}
            </p>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-primary-100">
              <span className="inline-flex items-center gap-1"><FiFileText aria-hidden="true" /> {report.package}</span>
              <span className="inline-flex items-center gap-1"><FiMapPin aria-hidden="true" /> Tested {report.testedAt}</span>
            </p>
          </div>

          <div className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur">
            <ScoreRing score={report.health.score} size={104} stroke={9} label="health" />
            <p className="mt-2 text-sm font-bold">Soil health: {report.health.rating}</p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-primary-100">pH</dt>
            <dd className="font-display text-lg font-bold">{report.ph.value}</dd>
            <dd className="text-[11px] text-primary-100">{report.ph.status}</dd>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-primary-100">Organic carbon</dt>
            <dd className="font-display text-lg font-bold">{report.organicCarbon.value}%</dd>
            <dd className="text-[11px] text-primary-100">{report.organicCarbon.status}</dd>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-primary-100">Nitrogen</dt>
            <dd className="font-display text-lg font-bold">{report.nitrogen.value}</dd>
            <dd className="text-[11px] text-primary-100">{report.nitrogen.unit}</dd>
          </div>
          <div className="rounded-2xl bg-white/10 p-3 backdrop-blur">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-primary-100">Moisture</dt>
            <dd className="font-display text-lg font-bold">{report.moisture}%</dd>
            <dd className="text-[11px] text-primary-100">{report.drainage} drainage</dd>
          </div>
        </dl>

        {report.status === 'processing' && (
          <p className={cn('mt-4 rounded-xl bg-white/15 px-3 py-2 text-xs font-semibold')}>
            Sample under processing — this is the latest available report.
          </p>
        )}
      </div>
    </div>
  );
}