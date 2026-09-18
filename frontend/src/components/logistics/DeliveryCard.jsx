import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiClock, FiMapPin, FiStar, FiTruck } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import RatingStars from '@/components/ui/RatingStars';
import { useLogistics } from '@/context/LogisticsContext';
import { formatINR } from '@/utils/format';

export default function DeliveryCard({ delivery }) {
  const { getVehicle, getDriver } = useLogistics();
  const vehicle = getVehicle(delivery.vehicleId);
  const driver = getDriver(delivery.driverId);
  const active = delivery.status === 'in-transit' || delivery.status === 'scheduled';

  return (
    <Card variant="soft" className="p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-display text-sm font-bold text-gray-900">{delivery.bookingId}</p>
        {active ? (
          <Badge variant="accent" size="sm" className="gap-1"><FiClock aria-hidden="true" /> {delivery.status === 'scheduled' ? 'Scheduled' : 'In transit'}</Badge>
        ) : (
          <Badge variant="primary" size="sm" className="gap-1"><FiCheckCircle aria-hidden="true" /> Delivered</Badge>
        )}
        {delivery.status === 'in-transit' && (
          <span className="ml-auto font-display text-sm font-bold text-gray-900">{delivery.progress}%</span>
        )}
      </div>

      <div className="mt-3 flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 shadow-soft">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate text-xs text-gray-500"><FiMapPin className="shrink-0 text-primary-600" aria-hidden="true" /> {delivery.from}</p>
          <div className="my-1 flex items-center gap-2">
            <span className="h-px flex-1 bg-primary-200" aria-hidden="true" />
            <span className="flex items-center gap-1 text-[11px] font-bold text-gray-400"><FiTruck aria-hidden="true" /> {delivery.km} km</span>
            <span className="h-px flex-1 bg-primary-200" aria-hidden="true" />
          </div>
          <p className="flex items-center gap-1.5 truncate text-xs text-gray-500"><FiMapPin className="shrink-0 text-accent-600" aria-hidden="true" /> {delivery.to}</p>
        </div>
      </div>

      {active && (
        <div className="mt-3">
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-primary-500 transition-all" style={{ width: `${delivery.progress}%` }} aria-hidden="true" />
          </div>
          <p className="mt-1.5 flex items-center justify-between text-[11px] text-gray-500">
            <span>{delivery.currentLocation}</span>
            <span className="font-bold text-primary-700">ETA {delivery.eta}</span>
          </p>
        </div>
      )}

      {!active && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
          <span>{delivery.date}</span>
          <span>Delivered {delivery.deliveredAt}</span>
          <span>{delivery.timeTaken}</span>
          {delivery.rating ? (
            <RatingStars value={delivery.rating} size="text-xs" />
          ) : (
            <Badge variant="outline" size="sm" className="gap-1"><FiStar aria-hidden="true" /> Rate</Badge>
          )}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span aria-hidden="true">{vehicle.emoji}</span>
          <span className="font-semibold text-gray-800">{vehicle.name}</span>
          <span className="text-gray-400">·</span>
          <span>{driver.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-gray-900">{formatINR(delivery.amount)}</span>
          <Link
            to={active ? `/dashboard/logistics/track/${delivery.id}` : `/dashboard/logistics/timeline/${delivery.id}`}
            className="focus-ring inline-flex items-center gap-1 rounded-lg text-xs font-bold text-primary-600 hover:text-primary-700"
          >
            {active ? 'Track' : 'Timeline'} <FiArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </Card>
  );
}