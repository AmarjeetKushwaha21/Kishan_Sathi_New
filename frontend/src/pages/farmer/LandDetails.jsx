import { FiHome, FiLayers, FiMap, FiMapPin } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import StatCard from '@/components/ui/StatCard';
import FarmerHeader from '@/components/farmer/FarmerHeader';
import LandCard from '@/components/farmer/LandCard';
import { useFarmer } from '@/context/FarmerContext';

export default function LandDetails() {
  const { lands, landStats } = useFarmer();

  return (
    <PageTransition>
      <FarmerHeader title="Land Details" subtitle={`${landStats.count} parcels · ${landStats.total} acres total`} showBack />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiMap} label="Total area" value={`${landStats.total} acres`} color="primary" />
        <StatCard icon={FiHome} label="Owned" value={`${landStats.owned} acres`} color="sky" />
        <StatCard icon={FiMapPin} label="Leased" value={`${landStats.leased} acres`} color="accent" />
        <StatCard icon={FiLayers} label="Parcels" value={`${landStats.count}`} color="violet" />
      </div>

      <div className="mt-6 grid items-start gap-5 lg:grid-cols-2">
        {lands.map((land) => (
          <LandCard key={land.id} land={land} />
        ))}
      </div>

      <p className="mt-5 rounded-2xl border border-primary-200 bg-primary-50/60 px-4 py-3 text-xs leading-relaxed text-gray-600">
        Land records are synced from the revenue department via your Khasra numbers. Contact the patwari if any parcel
        looks incorrect before the next sowing season.
      </p>
    </PageTransition>
  );
}