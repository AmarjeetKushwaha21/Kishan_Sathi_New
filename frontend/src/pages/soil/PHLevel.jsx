import { FiCheckCircle, FiThermometer } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import SoilHeader from '@/components/soil/SoilHeader';
import { useSoilTest } from '@/context/SoilTestContext';
import { cn } from '@/utils/cn';

const ZONES = [
  { label: 'Acidic', range: [0, 6.5], color: 'bg-rose-300', tone: 'text-rose-500' },
  { label: 'Neutral', range: [6.5, 7.5], color: 'bg-primary-400', tone: 'text-primary-600' },
  { label: 'Alkaline', range: [7.5, 14], color: 'bg-sky-400', tone: 'text-sky-500' },
];

export default function PHLevel() {
  const { latestReport: report, reports } = useSoilTest();
  const previous = reports[1]?.ph;

  return (
    <PageTransition>
      <SoilHeader title="pH Analysis" subtitle="Soil acidity and alkalinity" showBack status={report.id} />

      <Card variant="soft">
        <div className="flex flex-wrap items-center gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-2xl text-accent-600">
            <FiThermometer aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Current pH</p>
            <p className="font-display text-4xl font-bold text-gray-900">
              {report.ph.value} <span className="text-sm font-medium text-gray-400">{report.ph.unit}</span>
            </p>
            <div className="mt-1 flex items-center gap-2">
              <Badge variant={report.ph.status === 'Optimal' ? 'primary' : 'accent'}>{report.ph.status}</Badge>
              <span className="text-xs text-gray-400">Ideal {report.ph.optimal.join(' – ')}</span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="relative h-4 w-full overflow-hidden rounded-full">
            {ZONES.map((zone) => {
              const width = ((zone.range[1] - zone.range[0]) / 14) * 100;
              return (
                <span
                  key={zone.label}
                  aria-hidden="true"
                  className={cn('absolute inset-y-0', zone.color)}
                  style={{ left: `${(zone.range[0] / 14) * 100}%`, width: `${width}%` }}
                />
              );
            })}
            <span
              aria-hidden="true"
              className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-gray-900 shadow-lg"
              style={{ left: `${(report.ph.value / 14) * 100}%` }}
            />
          </div>
          <div className="mt-3 flex justify-between text-[10px] font-semibold text-gray-400">
            {ZONES.map((zone) => (
              <span key={zone.label} className={cn(zone.tone)}>{zone.label}</span>
            ))}
          </div>
        </div>

        <p className="mt-5 rounded-xl bg-primary-50/60 p-3.5 text-sm leading-relaxed text-gray-600">{report.ph.notes}</p>
      </Card>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-2">
        <Card variant="soft">
          <h3 className="mb-4 font-display text-base font-semibold text-gray-900">What to do about it</h3>
          <ul className="space-y-2.5">
            {[
              'No liming needed — pH is in the safe zone for most crops.',
              'Maintain with farmyard manure each season.',
              'Avoid excessive urea; it can slowly acidify the soil.',
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2.5 rounded-xl bg-white p-3 text-sm text-gray-600 shadow-soft">
                <FiCheckCircle className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        </Card>

        <Card variant="soft">
          <h3 className="mb-4 font-display text-base font-semibold text-gray-900">pH over recent tests</h3>
          <ul className="space-y-2">
            {reports.slice(0, 3).map((r) => (
              <li key={r.id} className="flex items-center justify-between rounded-xl bg-white px-3.5 py-3 shadow-soft">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{r.id}</p>
                  <p className="text-xs text-gray-400">{r.testedAt} · {r.labName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={r.ph >= 6.5 && r.ph <= 7.5 ? 'primary' : 'accent'}>{r.ph} pH</Badge>
                  {r.id === report.id && <span className="text-[10px] font-bold uppercase text-gray-400">latest</span>}
                </div>
              </li>
            ))}
          </ul>
          {previous != null && (
            <p className="mt-3 text-xs text-gray-400">
              {report.ph > previous
                ? `pH rose by ${(report.ph - previous).toFixed(1)} vs the previous test.`
                : report.ph < previous
                ? `pH dropped by ${(previous - report.ph).toFixed(1)} vs the previous test.`
                : 'pH is stable since the previous test.'}
            </p>
          )}
        </Card>
      </div>
    </PageTransition>
  );
}