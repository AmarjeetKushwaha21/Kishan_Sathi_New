import { Link } from 'react-router-dom';
import { FiBriefcase, FiChevronRight, FiPhone, FiStar } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useLogistics } from '@/context/LogisticsContext';

export default function DriverCard({ driver }) {
  const { getVehicle } = useLogistics();
  const vehicle = getVehicle(driver.vehicleId);

  return (
    <Card variant="soft" className="p-4 sm:p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-2xl" aria-hidden="true">
          {driver.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-bold text-gray-900">{driver.name}</h3>
            <Badge variant={driver.badge === 'Top rated' ? 'accent' : 'primary'} size="sm">{driver.badge}</Badge>
          </div>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1"><FiStar className="text-accent-500" aria-hidden="true" /> {driver.rating}</span>
            <span className="inline-flex items-center gap-1"><FiBriefcase aria-hidden="true" /> {driver.experience} yrs</span>
            <span>{driver.trips} trips</span>
          </p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {driver.licenses.map((l) => (
          <Badge key={l} variant="outline" size="sm">{l} licence</Badge>
        ))}
        <Badge variant="default" size="sm">{driver.languages.join(', ')}</Badge>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-soft">
        <div className="min-w-0">
          <p className="text-[11px] text-gray-400">Currently driving</p>
          <p className="truncate text-sm font-semibold text-gray-800">{vehicle.emoji} {vehicle.name}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a href={`tel:${driver.phone.replace(/\s/g, '')}`} className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl border border-primary-200 bg-primary-50 text-primary-600 transition hover:bg-primary-100" aria-label={`Call ${driver.name}`}>
            <FiPhone aria-hidden="true" />
          </a>
          <Link to={`/dashboard/logistics/driver/${driver.id}`} className="focus-ring inline-flex items-center gap-0.5 rounded-lg text-xs font-bold text-primary-600 hover:text-primary-700">
            Profile <FiChevronRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Card>
  );
}