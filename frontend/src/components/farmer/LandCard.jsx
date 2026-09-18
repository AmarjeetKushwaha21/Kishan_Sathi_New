import { FiDroplet, FiMapPin, FiStar } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

const STATUS_STYLES = {
  Cultivated: 'bg-primary-100 text-primary-800',
  Resting: 'bg-accent-100 text-accent-800',
};

export default function LandCard({ land }) {
  return (
    <Card variant="soft" className="p-4">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="font-display text-sm font-bold text-gray-900">{land.khasra}</h4>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
            <FiMapPin className="text-primary-500" aria-hidden="true" /> {land.location}
          </p>
        </div>
        <Badge variant={land.ownership === 'Owned' ? 'primary' : 'accent'} size="sm">{land.ownership}</Badge>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 rounded-xl bg-white p-3 text-xs shadow-soft">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Area</p>
          <p className="font-display text-base font-bold text-gray-900">{land.size} acres</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Soil</p>
          <p className="text-sm font-semibold text-gray-700">{land.soil}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Irrigation</p>
          <p className="flex items-center gap-1 text-sm font-semibold text-gray-700"><FiDroplet className="text-sky-500" aria-hidden="true" /> {land.irrigation}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Current crop</p>
          <p className="flex items-center gap-1 text-sm font-semibold text-gray-700"><FiStar className="text-accent-500" aria-hidden="true" /> {land.currentCrop}</p>
        </div>
      </div>

      <span className={cn('mt-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold', STATUS_STYLES[land.status] || 'bg-gray-100 text-gray-600')}>
        {land.status}
      </span>
    </Card>
  );
}