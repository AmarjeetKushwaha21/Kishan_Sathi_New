import { FiGrid } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import SectionHeader from '@/components/ui/SectionHeader';
import { CROPS } from '@/data/mock/dashboard';
import { cn } from '@/utils/cn';

const HEALTH_STYLES = {
  excellent: { variant: 'primary', label: 'Excellent' },
  good: { variant: 'outline', label: 'Good' },
  attention: { variant: 'danger', label: 'Needs attention' },
};

const HEALTH_DOT = {
  excellent: 'bg-primary-500',
  good: 'bg-accent-400',
  attention: 'bg-red-500',
};

export default function CropOverview() {
  return (
    <Card variant="soft" className="flex h-full flex-col">
      <SectionHeader title="Crop Overview" subtitle="Growth stage across your farm" icon={FiGrid} to="/dashboard/field-reports" />

      <ul className="flex-1 space-y-3.5">
        {CROPS.map((crop) => {
          const health = HEALTH_STYLES[crop.healthKey];
          return (
            <li key={crop.name} className="rounded-xl border border-gray-100 p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                  {crop.image ? (
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="h-10 w-10 shrink-0 rounded-xl object-cover shadow-sm ring-1 ring-black/5"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 text-lg dark:from-primary-900/40 dark:to-primary-950/60"
                    >
                      🌾
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-sm font-semibold text-gray-900">
                      {crop.name}
                      <Badge variant={health.variant} size="sm">
                        {health.label}
                      </Badge>
                    </p>
                    <p className="text-xs text-gray-500">
                      {crop.area} · {crop.stage}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{crop.yield}</p>
                  <p className="text-[10px] font-medium uppercase tracking-wide text-gray-400">expected yield</p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1">
                  <div className="mb-1 flex justify-between text-[10px] text-gray-400">
                    <span>Growth progress</span>
                    <span>{crop.stageProgress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-primary-500" style={{ width: `${crop.stageProgress}%` }} />
                  </div>
                </div>
                <span className={cn('h-2.5 w-2.5 shrink-0 rounded-full', HEALTH_DOT[crop.healthKey])} aria-label={`Health: ${health.label}`} />
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}