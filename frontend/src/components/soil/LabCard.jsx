import { FiCheckCircle, FiClock, FiMapPin, FiStar, FiShield } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

export default function LabCard({ lab, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(lab.id)}
      aria-pressed={selected}
      className={cn(
        'focus-ring w-full rounded-2xl text-left transition',
        selected && '-translate-y-0.5'
      )}
    >
      <Card
        variant="soft"
        className={cn('transition', selected ? 'border-2 border-primary-500 bg-primary-50/40' : 'border-2 border-transparent hover:border-primary-200')}
      >
        <div className="flex items-start gap-3">
          <span className={cn('mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2', selected ? 'border-primary-600' : 'border-gray-300')} aria-hidden="true">
            {selected && <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-base font-bold text-gray-900">{lab.name}</h3>
              {lab.govt && <Badge variant="primary" size="sm">Govt.</Badge>}
              {lab.certified && <Badge variant="accent" size="sm"><FiShield aria-hidden="true" /> Certified</Badge>}
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
              <span className="inline-flex items-center gap-1"><FiMapPin aria-hidden="true" /> {lab.address}</span>
              <span className="inline-flex items-center gap-1"><FiClock aria-hidden="true" /> {lab.distanceKm} km</span>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-lg bg-accent-50 px-2 py-1 text-xs font-semibold text-accent-700">
                <FiStar className="fill-accent-400 text-accent-400" aria-hidden="true" /> {lab.rating}
              </span>
              <span className="text-xs text-gray-500">{lab.turnaroundDays}-day reports</span>
              <span className="ml-auto font-display text-base font-bold text-gray-900">₹{lab.price}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {lab.specialties.map((s) => (
                <span key={s} className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">{s}</span>
              ))}
            </div>
          </div>
        </div>
        {selected && (
          <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary-700">
            <FiCheckCircle aria-hidden="true" /> Selected · {lab.contact}
          </p>
        )}
      </Card>
    </button>
  );
}