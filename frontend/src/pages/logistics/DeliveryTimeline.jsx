import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiMapPin, FiNavigation } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import LogisticsHeader from '@/components/logistics/LogisticsHeader';
import MapPlaceholder from '@/components/logistics/MapPlaceholder';
import TimelineStep from '@/components/logistics/TimelineStep';
import { useLogistics } from '@/context/LogisticsContext';
import { cn } from '@/utils/cn';

export default function DeliveryTimeline() {
  const { deliveryId } = useParams();
  const { deliveries, getDelivery, getVehicle } = useLogistics();
  const [selectedId, setSelectedId] = useState(() => deliveryId || deliveries[0]?.id || '');

  useEffect(() => {
    setSelectedId(deliveryId || deliveries[0]?.id || '');
  }, [deliveryId, deliveries]);

  const delivery = getDelivery(selectedId);
  if (!delivery) {
    return (
      <PageTransition>
        <LogisticsHeader title="Delivery Timeline" showBack />
        <EmptyState title="No deliveries yet" description="Book a pickup to start tracking its journey." />
      </PageTransition>
    );
  }

  const vehicle = getVehicle(delivery.vehicleId);
  const doneCount = delivery.timeline.filter((s) => s.done).length;

  return (
    <PageTransition>
      <LogisticsHeader title="Delivery Timeline" subtitle={`${delivery.bookingId} · ${delivery.commodity}`} showBack status={delivery.status === 'delivered' ? 'Delivered' : 'In transit'} />

      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {deliveries.slice(0, 8).map((d) => (
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
            {d.bookingId}
          </button>
        ))}
      </div>

      <div className="mt-5 grid items-start gap-6 lg:grid-cols-[1fr_380px]">
        <Card variant="soft" className="p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-display text-base font-semibold text-gray-900">Journey checkpoints</h3>
            <Badge variant="outline" size="sm">{doneCount}/{delivery.timeline.length} completed</Badge>
          </div>

          {delivery.timeline.length === 0 ? (
            <p className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-400">Timeline not recorded for this delivery.</p>
          ) : (
            delivery.timeline.map((step, i) => (
              <TimelineStep key={step.time + step.label} step={step} last={i === delivery.timeline.length - 1} />
            ))
          )}
        </Card>

        <div className="space-y-4">
          <Card variant="soft" className="p-4">
            <MapPlaceholder progress={delivery.progress} from="Farm" to={delivery.toCity} distance={delivery.km} legend={false} />
            <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-3 py-2.5 shadow-soft">
              <p className="flex items-center gap-1.5 text-xs text-gray-500">
                <FiMapPin className="text-primary-600" aria-hidden="true" /> {delivery.currentLocation}
              </p>
              {delivery.status !== 'delivered' && <p className="text-xs font-bold text-primary-700">ETA {delivery.eta}</p>}
            </div>
          </Card>

          <Card variant="soft" className="p-4">
            <h3 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
              <FiNavigation className="text-primary-600" aria-hidden="true" /> Trip summary
            </h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Route</dt><dd className="font-semibold text-gray-900">{delivery.km} km</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Vehicle</dt><dd className="font-semibold text-gray-900">{vehicle.emoji} {vehicle.name}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Load</dt><dd className="font-semibold text-gray-900">{delivery.commodity} · {delivery.quantity} qtl</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Started</dt><dd className="font-semibold text-gray-900">{delivery.startedAt}</dd></div>
              {delivery.status === 'delivered' ? (
                <>
                  <div className="flex justify-between"><dt className="text-gray-500">Delivered</dt><dd className="font-semibold text-gray-900">{delivery.deliveredAt}</dd></div>
                  <div className="flex justify-between"><dt className="text-gray-500">Time taken</dt><dd className="font-semibold text-gray-900">{delivery.timeTaken}</dd></div>
                </>
              ) : (
                <div className="flex justify-between"><dt className="text-gray-500">Status</dt><dd className="inline-flex items-center gap-1 font-semibold text-accent-600"><FiClock aria-hidden="true" /> {delivery.status === 'scheduled' ? 'Scheduled' : 'In transit'}</dd></div>
              )}
              {delivery.status === 'delivered' && delivery.rating && (
                <div className="flex justify-between border-t border-gray-100 pt-2"><dt className="text-gray-500">Your rating</dt><dd className="inline-flex items-center gap-1 font-semibold text-gray-900"><FiCheckCircle className="text-primary-600" aria-hidden="true" /> {delivery.rating}/5</dd></div>
              )}
            </dl>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}