import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiClock, FiMapPin, FiNavigation, FiPhone, FiRefreshCw } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import LogisticsHeader from '@/components/logistics/LogisticsHeader';
import MapPlaceholder from '@/components/logistics/MapPlaceholder';
import TimelineStep from '@/components/logistics/TimelineStep';
import { useLogistics } from '@/context/LogisticsContext';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

export default function TrackDelivery() {
  const { deliveryId } = useParams();
  const { active, getDelivery, getVehicle, getDriver, setSelectedDeliveryId, refreshProgress } = useLogistics();
  const [selectedId, setSelectedId] = useState(() => deliveryId || active[0]?.id || '');

  useEffect(() => {
    setSelectedId(deliveryId || active[0]?.id || '');
  }, [deliveryId, active]);

  const delivery = getDelivery(selectedId) || active[0];

  useEffect(() => {
    if (delivery) setSelectedDeliveryId(delivery.id);
  }, [delivery, setSelectedDeliveryId]);

  if (!delivery) {
    return (
      <PageTransition>
        <LogisticsHeader title="Track Delivery" showBack />
        <EmptyState title="No active delivery" description="Book a pickup and you will see live tracking here." />
      </PageTransition>
    );
  }

  const vehicle = getVehicle(delivery.vehicleId);
  const driver = getDriver(delivery.driverId);

  return (
    <PageTransition>
      <LogisticsHeader title="Track Delivery" subtitle={`${delivery.bookingId} · ${delivery.commodity} ${delivery.quantity} qtl`} showBack status={delivery.status === 'scheduled' ? 'Scheduled' : 'In transit'} />

      {active.length > 1 && (
        <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
          {active.map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={d.id === delivery.id}
              onClick={() => setSelectedId(d.id)}
              className={cn(
                'focus-ring shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold transition',
                d.id === delivery.id ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
              )}
            >
              {d.bookingId} · {d.commodity}
            </button>
          ))}
        </div>
      )}

      <MapPlaceholder progress={delivery.progress} from="Farm" to={delivery.toCity} distance={delivery.km} />

      <Card variant="soft" className="mt-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Live progress</p>
            <p className="font-display text-xl font-bold text-gray-900">{delivery.progress}%</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">ETA</p>
            <p className="font-display text-lg font-bold text-primary-700">{delivery.eta}</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            leftIcon={FiRefreshCw}
            onClick={() => refreshProgress(delivery.id)}
            disabled={delivery.status !== 'in-transit'}
          >
            Refresh
          </Button>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-primary-500 transition-all duration-700" style={{ width: `${delivery.progress}%` }} aria-hidden="true" />
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
          <FiMapPin className="text-primary-600" aria-hidden="true" /> {delivery.currentLocation}
        </p>
      </Card>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Link to={`/dashboard/logistics/vehicle/${vehicle.id}`} className="focus-ring rounded-2xl">
          <Card variant="soft" className="flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-card">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-xl" aria-hidden="true">{vehicle.emoji}</span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-bold text-gray-900">{vehicle.name}</p>
              <p className="text-xs text-gray-500">{vehicle.reg} · {vehicle.capacity} qtl</p>
            </div>
            <FiNavigation className="text-gray-300" aria-hidden="true" />
          </Card>
        </Link>
        <Link to={`/dashboard/logistics/driver/${driver.id}`} className="focus-ring rounded-2xl">
          <Card variant="soft" className="flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:shadow-card">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-xl" aria-hidden="true">{driver.emoji}</span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-bold text-gray-900">{driver.name}</p>
              <p className="text-xs text-gray-500">{driver.rating}★ · {driver.experience} yrs</p>
            </div>
            <a href={`tel:${delivery.contact.replace(/\s/g, '')}`} className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl border border-primary-200 bg-primary-50 text-primary-600" aria-label={`Call ${driver.name}`}>
              <FiPhone aria-hidden="true" />
            </a>
          </Card>
        </Link>
      </div>

      <Card variant="soft" className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-gray-900">Delivery progress</h3>
          <Link to={`/dashboard/logistics/timeline/${delivery.id}`} className="focus-ring rounded-lg text-xs font-bold text-primary-600 hover:text-primary-700">
            Full timeline →
          </Link>
        </div>
        {delivery.timeline.slice(-3).map((step, i) => (
          <TimelineStep key={step.time + step.label} step={step} last={i === Math.min(2, delivery.timeline.length - 1)} />
        ))}
      </Card>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-primary-200 bg-primary-50/60 p-4">
        <p className="flex items-center gap-2 text-sm text-gray-600">
          <FiClock className="text-primary-600" aria-hidden="true" /> Live location refreshes every 30 seconds.
        </p>
        <p className="text-xs text-gray-400">Fare {formatINR(delivery.amount)} · pay on delivery</p>
      </div>
    </PageTransition>
  );
}