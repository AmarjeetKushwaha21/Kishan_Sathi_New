import { Link, useParams } from 'react-router-dom';
import { FiAward, FiBriefcase, FiGlobe, FiPhone, FiStar, FiTruck } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import LogisticsHeader from '@/components/logistics/LogisticsHeader';
import VehicleCard from '@/components/logistics/VehicleCard';
import DeliveryCard from '@/components/logistics/DeliveryCard';
import RatingStars from '@/components/ui/RatingStars';
import { useLogistics } from '@/context/LogisticsContext';

export default function DriverDetails() {
  const { driverId } = useParams();
  const { getDriver, getVehicle, deliveries } = useLogistics();
  const driver = getDriver(driverId);
  const vehicle = getVehicle(driver.vehicleId);
  const trips = deliveries.filter((d) => d.driverId === driver.id);

  return (
    <PageTransition>
      <LogisticsHeader title="Driver Details" subtitle={driver.name} showBack status={driver.badge} />

      <Card variant="soft" className="overflow-hidden p-0">
        <div className="flex flex-col gap-4 bg-gradient-to-br from-accent-400 to-accent-500 p-5 sm:flex-row sm:items-center">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/25 text-4xl backdrop-blur" aria-hidden="true">
            {driver.emoji}
          </span>
          <div className="min-w-0 flex-1 text-white">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-xl font-bold">{driver.name}</h3>
              <Badge variant="outline" size="sm" className="!border-white/40 !bg-white/15 !text-white">{driver.badge}</Badge>
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/90">
              <span className="inline-flex items-center gap-1"><FiStar aria-hidden="true" /> {driver.rating} rating</span>
              <span className="inline-flex items-center gap-1"><FiBriefcase aria-hidden="true" /> {driver.experience} years</span>
            </p>
          </div>
          <a href={`tel:${driver.phone.replace(/\s/g, '')}`} className="focus-ring rounded-xl">
            <Button size="sm" className="!bg-white !text-accent-700" leftIcon={FiPhone}>Call {driver.name.split(' ')[0]}</Button>
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4 sm:p-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Trips completed</p>
            <p className="mt-0.5 font-display text-lg font-bold text-gray-900">{driver.trips}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Experience</p>
            <p className="mt-0.5 font-display text-lg font-bold text-gray-900">{driver.experience} yrs</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Languages</p>
            <p className="mt-0.5 flex items-center gap-1 text-sm font-bold text-gray-900"><FiGlobe className="text-gray-400" aria-hidden="true" /> {driver.languages.join(', ')}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Licences</p>
            <p className="mt-0.5 text-sm font-bold text-gray-900">{driver.licenses.join(', ')}</p>
          </div>
        </div>
      </Card>

      <Card variant="soft" className="mt-6 p-4 sm:p-5">
        <h3 className="mb-2 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
          <FiAward className="text-accent-500" aria-hidden="true" /> About
        </h3>
        <p className="text-sm leading-relaxed text-gray-600">{driver.bio}</p>
        <div className="mt-4 flex items-center gap-2">
          <RatingStars value={driver.rating} size="text-sm" />
          <span className="text-xs text-gray-400">based on {driver.trips} trips</span>
        </div>
      </Card>

      <section aria-label="Current vehicle" className="mt-6">
        <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Currently driving</h3>
        <VehicleCard vehicle={vehicle} />
      </section>

      <section aria-label="Recent trips" className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-gray-900">Recent trips by this driver</h3>
          <Badge variant="outline" size="sm" className="gap-1"><FiTruck aria-hidden="true" /> {trips.length}</Badge>
        </div>
        {trips.length === 0 ? (
          <p className="rounded-xl bg-white px-4 py-3 text-sm text-gray-400 shadow-soft">No trips recorded for this driver yet.</p>
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
          <Button fullWidth leftIcon={FiTruck}>Book a pickup with this driver</Button>
        </Link>
      </div>
    </PageTransition>
  );
}