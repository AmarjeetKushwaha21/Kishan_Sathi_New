import { FiArrowUpRight, FiClock, FiMapPin } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import LogisticsHeader from '@/components/logistics/LogisticsHeader';
import MapPlaceholder from '@/components/logistics/MapPlaceholder';
import { useLogistics } from '@/context/LogisticsContext';

export default function LogisticsMap() {
  const { active, completed, getVehicle, getDriver } = useLogistics();

  return (
    <PageTransition>
      <LogisticsHeader title="Delivery Map" subtitle="Live view of produce moving across the region" showBack status={active.length ? `${active.length} active` : 'Idle'} />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <MapPlaceholder progress={active.length ? active[0].progress : 0} from="Farm" to={active.length ? active[0].toCity : 'Mandi'} distance={active.length ? active[0].km : 0} />

          <Card variant="soft" className="p-4 sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-base font-semibold text-gray-900">Live deliveries</h3>
              <Badge variant="outline" size="sm" className="gap-1"><FiClock aria-hidden="true" /> Updates every 30s</Badge>
            </div>

            {active.length === 0 ? (
              <p className="rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-400">No deliveries are currently on the road.</p>
            ) : (
              <div className="space-y-3">
                {active.map((d) => {
                  const vehicle = getVehicle(d.vehicleId);
                  const driver = getDriver(d.driverId);
                  return (
                    <div key={d.id} className="flex flex-wrap items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-soft">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-50 text-lg" aria-hidden="true">{vehicle.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-gray-900">{d.commodity} · {d.quantity} qtl</p>
                        <p className="truncate text-[11px] text-gray-400">{d.from} → {d.toCity} · {driver.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-sm font-bold text-primary-700">{d.progress}%</p>
                        <p className="text-[11px] text-gray-400">ETA {d.eta}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card variant="tinted" className="p-4">
            <h3 className="mb-3 font-display text-base font-semibold text-gray-900">This week</h3>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Deliveries completed</dt><dd className="font-bold text-gray-900">{completed.length}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Distance covered</dt><dd className="font-bold text-gray-900">{completed.reduce((s, d) => s + d.km, 0)} km</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Top destination</dt><dd className="font-bold text-gray-900">{completed[0]?.toCity || '—'}</dd></div>
            </dl>
          </Card>

          <Card variant="soft" className="p-4">
            <h3 className="mb-3 font-display text-base font-semibold text-gray-900">All routes</h3>
            <div className="space-y-2">
              {['Ludhiana Mandi', 'Kila Raipur', 'Aarti Rice Mill', 'Punjab Cold Storage'].map((place) => (
                <p key={place} className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-xs font-semibold text-gray-600 shadow-soft">
                  <span className="flex items-center gap-1.5"><FiMapPin className="text-primary-600" aria-hidden="true" /> {place}</span>
                  <FiArrowUpRight className="text-gray-300" aria-hidden="true" />
                </p>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}