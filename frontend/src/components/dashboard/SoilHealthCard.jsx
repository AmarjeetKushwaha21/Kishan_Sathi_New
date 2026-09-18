import { FiDroplet, FiThermometer, FiTruck } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import SectionHeader from '@/components/ui/SectionHeader';
import { SOIL_HEALTH } from '@/data/mock/dashboard';
import { cn } from '@/utils/cn';

const NPK_STYLES = {
  Optimal: 'bg-primary-500',
  Moderate: 'bg-accent-400',
  Low: 'bg-red-500',
};

function ScoreRing({ score }) {
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-24 w-24" role="img" aria-label={`Soil health score ${score} out of 100`}>
      <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
        <circle cx="40" cy="40" r={radius} fill="none" stroke="#dcfce7" strokeWidth="8" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="#16a34a"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-bold text-primary-700">{score}</span>
        <span className="text-[9px] font-semibold uppercase tracking-wide text-gray-400">/100</span>
      </div>
    </div>
  );
}

export default function SoilHealthCard() {
  return (
    <Card variant="soft" className="flex h-full flex-col">
      <SectionHeader title="Soil Health Card" subtitle={`Last tested ${SOIL_HEALTH.lastTested}`} />

      <div className="flex items-center gap-5 rounded-2xl bg-primary-50/60 p-4">
        <ScoreRing score={SOIL_HEALTH.ratingScore} />
        <div>
          <p className="text-xs text-gray-500">Overall rating</p>
          <p className="font-display text-lg font-bold text-gray-900">{SOIL_HEALTH.rating}</p>
          <p className="mt-1 text-xs text-gray-500">
            pH {SOIL_HEALTH.ph.value} · {SOIL_HEALTH.texture}
          </p>
          <Badge variant="primary" size="sm" className="mt-2">
            {SOIL_HEALTH.ph.status}
          </Badge>
        </div>
      </div>

      <div className="mt-5 flex-1 space-y-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Nutrients (NPK)</p>
          <ul className="space-y-3">
            {SOIL_HEALTH.npk.map((n) => (
              <li key={n.name}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-gray-700">{n.name}</span>
                  <span className="text-gray-500">
                    {n.value}% · <span className="font-semibold text-gray-700">{n.status}</span>
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={cn('h-full rounded-full', NPK_STYLES[n.status])}
                    style={{ width: `${n.value}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <dl className="grid grid-cols-3 gap-2.5">
          <div className="rounded-xl bg-primary-50/60 p-3 text-center">
            <FiDroplet className="mx-auto mb-1 text-sky-500" aria-hidden="true" />
            <dt className="text-[10px] font-medium text-gray-500">Moisture</dt>
            <dd className="text-sm font-bold text-gray-900">{SOIL_HEALTH.moisture}%</dd>
          </div>
          <div className="rounded-xl bg-primary-50/60 p-3 text-center">
            <FiThermometer className="mx-auto mb-1 text-accent-500" aria-hidden="true" />
            <dt className="text-[10px] font-medium text-gray-500">Org. Carbon</dt>
            <dd className="text-sm font-bold text-gray-900">{SOIL_HEALTH.organicCarbon}%</dd>
          </div>
          <div className="rounded-xl bg-primary-50/60 p-3 text-center">
            <FiTruck className="mx-auto mb-1 text-primary-500" aria-hidden="true" />
            <dt className="text-[10px] font-medium text-gray-500">Texture</dt>
            <dd className="text-sm font-bold text-gray-900">{SOIL_HEALTH.texture.split(' ')[0]}</dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}