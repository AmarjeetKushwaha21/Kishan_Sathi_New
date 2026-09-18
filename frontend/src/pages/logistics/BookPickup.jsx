import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiMapPin, FiNavigation } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LogisticsHeader from '@/components/logistics/LogisticsHeader';
import VehicleCard from '@/components/logistics/VehicleCard';
import { useLogistics } from '@/context/LogisticsContext';
import { PICKUP_TIMES, estimateFare } from '@/data/mock/logistics';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

export default function BookPickup() {
  const {
    vehicles,
    destinations,
    commodities,
    farmDefault,
    bookPickup,
    selectedVehicleId,
    setSelectedVehicleId,
  } = useLogistics();

  const [destinationId, setDestinationId] = useState(destinations[1].id);
  const [commodity, setCommodity] = useState(commodities[0]);
  const [quantity, setQuantity] = useState(60);
  const [pickupTime, setPickupTime] = useState(PICKUP_TIMES[1]);
  const [contact, setContact] = useState('98765 12340');
  const [busy, setBusy] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const destination = destinations.find((d) => d.id === destinationId);
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId);
  const fare = useMemo(
    () => estimateFare(selectedVehicle, destination.km, quantity),
    [selectedVehicle, destination.km, quantity]
  );

  function onConfirm() {
    setBusy(true);
    setTimeout(() => {
      const delivery = bookPickup({ vehicleId: selectedVehicleId, destinationId, commodity, quantity, pickupTime, contact });
      setConfirmation(delivery);
      setBusy(false);
    }, 900);
  }

  if (confirmation) {
    return (
      <PageTransition>
        <LogisticsHeader title="Pickup Booked" showBack />

        <Card variant="tinted" className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary-600 text-3xl text-white shadow-soft">
            <FiCheckCircle aria-hidden="true" />
          </span>
          <h3 className="mt-4 font-display text-xl font-bold text-gray-900">Pickup scheduled</h3>
          <p className="mt-1 text-sm text-gray-500">
            {confirmation.commodity} · {confirmation.quantity} qtl · {confirmation.pickupTime}
          </p>

          <dl className="mt-5 space-y-2.5 rounded-2xl bg-white p-4 text-left text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Booking ID</dt><dd className="font-bold text-gray-900">{confirmation.bookingId}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Route</dt><dd className="text-right font-bold text-gray-900">{farmDefault} → {confirmation.to}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Vehicle</dt><dd className="font-bold text-gray-900">{selectedVehicle.emoji} {selectedVehicle.name}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Fare</dt><dd className="font-bold text-primary-700">{formatINR(confirmation.amount)}</dd></div>
          </dl>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link to={`/dashboard/logistics/track/${confirmation.id}`} className="focus-ring rounded-xl">
              <Button fullWidth leftIcon={FiNavigation}>Track vehicle</Button>
            </Link>
            <Link to="/dashboard/logistics/completed" className="focus-ring rounded-xl">
              <Button variant="outline" fullWidth>Past deliveries</Button>
            </Link>
          </div>
        </Card>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <LogisticsHeader title="Book a Pickup" subtitle="Move produce from your farm to mandi or warehouse" status={`${fare ? formatINR(fare) : ''}`} />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <Card variant="soft">
            <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Pickup details</h3>
            <div className="flex items-center gap-3 rounded-xl bg-primary-50/70 p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-lg text-white">
                <FiMapPin aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Pickup from</p>
                <p className="text-sm font-bold text-gray-900">{farmDefault}</p>
              </div>
            </div>

            <p className="mb-2 mt-5 text-xs font-semibold text-gray-500">Destination</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {destinations.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  aria-pressed={destinationId === d.id}
                  onClick={() => setDestinationId(d.id)}
                  className={cn(
                    'focus-ring flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left transition',
                    destinationId === d.id ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                  )}
                >
                  <span>
                    <span className="block text-xs font-bold">{d.name}</span>
                    <span className="block text-[11px] text-gray-400">{d.city}</span>
                  </span>
                  <Badge variant={destinationId === d.id ? 'primary' : 'default'} size="sm">{d.km} km</Badge>
                </button>
              ))}
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="mb-2 text-xs font-semibold text-gray-500">Commodity</p>
                <select value={commodity} onChange={(e) => setCommodity(e.target.value)} aria-label="Commodity" className="input-base cursor-pointer appearance-none">
                  {commodities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-gray-500">Quantity (qtl)</p>
                <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} aria-label="Quantity in quintals" className="input-base" />
              </div>
              <div>
                <p className="mb-2 text-xs font-semibold text-gray-500">Pickup time</p>
                <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} aria-label="Pickup time" className="input-base cursor-pointer appearance-none">
                  {PICKUP_TIMES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold text-gray-500">Contact number</p>
              <Input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} aria-label="Contact number" />
            </div>
          </Card>

          <Card variant="soft">
            <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Choose a vehicle</h3>
            <div className="space-y-4">
              {vehicles.map((v) => (
                <VehicleCard
                  key={v.id}
                  vehicle={v}
                  fare={v.available ? estimateFare(v, destination.km, quantity) : undefined}
                  selected={selectedVehicleId === v.id}
                  onSelect={setSelectedVehicleId}
                />
              ))}
            </div>
          </Card>
        </div>

        <Card variant="tinted" className="lg:sticky lg:top-24">
          <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Booking summary</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Route</dt><dd className="text-right font-semibold text-gray-900">{destination.km} km</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Commodity</dt><dd className="font-semibold text-gray-900">{commodity}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Quantity</dt><dd className="font-semibold text-gray-900">{quantity} qtl</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Vehicle</dt><dd className="font-semibold text-gray-900">{selectedVehicle.emoji} {selectedVehicle.name}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Pickup</dt><dd className="font-semibold text-gray-900">{pickupTime}</dd></div>
            <div className="flex justify-between border-t border-primary-100 pt-3"><dt className="font-semibold text-gray-700">Estimated fare</dt><dd className="font-display text-lg font-bold text-primary-700">{formatINR(fare)}</dd></div>
          </dl>
          <div className="mt-3 rounded-xl bg-white p-3 text-[11px] leading-relaxed text-gray-500 shadow-soft">
            Base {formatINR(selectedVehicle.baseFare)} + {selectedVehicle.ratePerKm}/km × {destination.km} km
            {quantity > selectedVehicle.capacity && ` + overload ${formatINR((quantity - selectedVehicle.capacity) * 3)}`}
          </div>
          <Button fullWidth className="mt-5" loading={busy} rightIcon={FiArrowRight} onClick={onConfirm}>
            Confirm pickup
          </Button>
          <Badge variant="outline" className="mt-4">Pay on delivery · Cash / UPI accepted</Badge>
        </Card>
      </div>
    </PageTransition>
  );
}