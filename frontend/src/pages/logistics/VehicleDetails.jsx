import { Link, useParams } from 'react-router-dom';
import { FiArrowRight, FiAward, FiShield, FiStar, FiTruck } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import LogisticsHeader from '@/components/logistics/LogisticsHeader';
import DriverCard from '@/components/logistics/DriverCard';
import DeliveryCard from '@/components/logistics/DeliveryCard';
import { useLogistics } from '@/context/LogisticsContext';
import { formatINR } from '@/utils/format';

export default function VehicleDetails() {
  const { vehicleId } = useParams();
  const { getVehicle, getDriver, deliveries } = useLogistics();
  const vehicle = getVehicle(vehicleId);
  const driver = getDriver(vehicle.driverId);
  const trips = deliveries.filter((d) => d.vehicleId === vehicle.id);

  return (
    <PageTransition>
      <LogisticsHeader title="Vehicle Details" subtitle={`${vehicle.name} · ${vehicle.reg}`} showBack status={vehicle.available ? 'Available' : 'Unavailable'} />

      <Card variant="soft" className="overflow-hidden p-0">
        <div className="flex flex-col gap-4 bg-gradient-to-br from-primary-600 to-emerald-600 p-5 sm:flex-row sm:items-center">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/20 text-4xl backdrop-blur" aria-hidden="true">
            {vehicle.emoji}
          </span>
          <div className="min-w-0 flex-1 text-white">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-xl font-bold">{vehicle.name}</h3>
              <Badge variant="outline" size="sm" className="!border-white/40 !bg-white/15 !text-white">{vehicle.type}</Badge>
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/90">
              <span className="inline-flex items-center gap-1"><FiStar aria-hidden="true" /> {vehicle.rating}</span>
              <span>{vehicle.fuel}</span>
              <span>{vehicle.reg}</span>
            </p>
            <p className="mt-2 text-xs text-white/80">{vehicle.notes}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:p-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Capacity</p>
            <p className="mt-0.5 font-display text-lg font-bold text-gray-900">{vehicle.capacity} qtl</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Base fare</p>
            <p className="mt-0.5 font-display text-lg font-bold text-primary-700">{formatINR(vehicle.baseFare)}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Rate / km</p>
            <p className="mt-0.5 font-display text-lg font-bold text-gray-900">{formatINR(vehicle.ratePerKm)}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Total trips</p>
            <p className="mt-0.5 font-display text-lg font-bold text-gray-900">{vehicle.trips}</p>
          </div>
        </div>
      </Card>

      <Card variant="soft" className="mt-6 flex items-start gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-lg text-primary-600">
          <FiShield aria-hidden="true" />
        </span>
        <div className="text-xs leading-relaxed text-gray-500">
          <p><strong className="text-gray-700">Condition: {vehicle.condition}.</strong> Serviced and insured. All vehicles are registered and GPS-enabled for live tracking.</p>
        </div>
      </Card>

      <section aria-label="Assigned driver" className="mt-6">
        <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Assigned driver</h3>
        <DriverCard driver={driver} />
      </section>

      <section aria-label="Recent trips" className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-gray-900">Recent trips with this vehicle</h3>
          <Badge variant="outline" size="sm" className="gap-1"><FiAward aria-hidden="true" /> {trips.length}</Badge>
        </div>
        {trips.length === 0 ? (
          <p className="rounded-xl bg-white px-4 py-3 text-sm text-gray-400 shadow-soft">No trips recorded for this vehicle yet.</p>
        ) : (
          <div className="space-y-3">
            {trips.slice(0, 4).map((d) => (
              <DeliveryCard key={d.id} delivery={d} />
            ))}
          </div>
        )}
      </section>

      <div className="mt-6">
        <Link to="/dashboard/logistics" className="focus-ring rounded-xl">
          <Button fullWidth leftIcon={FiTruck} rightIcon={FiArrowRight}>Book this vehicle</Button>
        </Link>
      </div>
    </PageTransition>
  );
}