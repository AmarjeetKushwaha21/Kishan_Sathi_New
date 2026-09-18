import { Link } from 'react-router-dom';
import { FiChevronRight, FiShield, FiStar } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/utils/cn';
import { formatINR } from '@/utils/format';

export default function VehicleCard({ vehicle, fare, selected = false, onSelect }) {
  return (
    <Card
      variant="soft"
      className={cn('p-4 sm:p-5', selected && 'border-2 border-primary-300 bg-primary-50/40')}
    >
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-2xl" aria-hidden="true">
          {vehicle.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-bold text-gray-900">{vehicle.name}</h3>
            {!vehicle.available && <Badge variant="accent" size="sm">Unavailable</Badge>}
          </div>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1"><FiStar className="text-accent-500" aria-hidden="true" /> {vehicle.rating}</span>
            <span>{vehicle.type}</span>
            <span>{vehicle.capacity} qtl capacity</span>
            <span>{vehicle.reg}</span>
          </p>
        </div>
        {fare != null && (
          <div className="text-right">
            <p className="font-display text-lg font-bold text-primary-700">{formatINR(fare)}</p>
            <p className="text-[10px] text-gray-400">est. fare</p>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-gray-500">{vehicle.notes}</p>
        {onSelect && (
          <button
            type="button"
            onClick={() => onSelect(vehicle.id)}
            disabled={!vehicle.available}
            className={cn(
              'focus-ring shrink-0 rounded-xl border px-3 py-2 text-xs font-bold transition',
              selected
                ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                : vehicle.available
                ? 'border-primary-300 bg-white text-primary-700 hover:bg-primary-50'
                : 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
            )}
          >
            {selected ? 'Selected' : 'Select'}
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-soft">
        <p className="flex items-center gap-1.5 text-[11px] text-gray-500">
          <FiShield className="text-primary-600" aria-hidden="true" /> {vehicle.condition} condition · {vehicle.fuel} · {vehicle.trips} trips
        </p>
        <Link to={`/dashboard/logistics/vehicle/${vehicle.id}`} className="focus-ring inline-flex items-center gap-0.5 rounded-lg text-xs font-bold text-primary-600 hover:text-primary-700">
          Details <FiChevronRight aria-hidden="true" />
        </Link>
      </div>
    </Card>
  );
}