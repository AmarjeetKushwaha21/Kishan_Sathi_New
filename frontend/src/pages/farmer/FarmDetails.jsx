import { FiDroplet, FiHome, FiMapPin, FiSun, FiWind, FiZap } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Badge from '@/components/ui/Badge';
import StatCard from '@/components/ui/StatCard';
import FarmerHeader from '@/components/farmer/FarmerHeader';
import SectionCard from '@/components/farmer/SectionCard';
import { useFarmer } from '@/context/FarmerContext';

export default function FarmDetails() {
  const { farm, landStats } = useFarmer();

  return (
    <PageTransition>
      <FarmerHeader title="Farm Details" subtitle={farm.name} showBack status="Active" />

      <SectionCard title="Overview" icon={FiHome}>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Farm name</dt>
            <dd className="mt-0.5 text-sm font-bold text-gray-900">{farm.name}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Farm type</dt>
            <dd className="mt-0.5 text-sm font-bold text-gray-900">{farm.type}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Farming since</dt>
            <dd className="mt-0.5 text-sm font-bold text-gray-900">{farm.since}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Address</dt>
            <dd className="mt-0.5 flex items-start gap-1.5 text-sm font-bold text-gray-900">
              <FiMapPin className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" /> {farm.address}
            </dd>
          </div>
        </dl>
      </SectionCard>

      <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FiMapPin} label="Total area" value={`${farm.totalArea} acres`} color="primary" />
        <StatCard icon={FiHome} label="Owned" value={`${landStats.owned} acres`} color="sky" />
        <StatCard icon={FiMapPin} label="Leased" value={`${landStats.leased} acres`} color="accent" />
        <StatCard icon={FiDroplet} label="Tube wells" value={`${farm.tubeWells}`} color="violet" />
      </div>

      <div className="mt-5 space-y-5">
        <SectionCard title="Soil & water" icon={FiDroplet}>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Soil type</dt>
              <dd className="mt-0.5 text-sm font-bold text-gray-900">{farm.soilType}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Soil pH</dt>
              <dd className="mt-0.5 text-sm font-bold text-gray-900">{farm.soilPH}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Irrigation</dt>
              <dd className="mt-0.5 text-sm font-bold text-gray-900">{farm.irrigation}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Electricity</dt>
              <dd className="mt-0.5 text-sm font-bold text-gray-900">{farm.electricity}</dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="Farming practices" icon={FiSun}>
          <div className="flex flex-wrap gap-2">
            {['Zero tillage', 'Crop rotation', 'Drip irrigation', 'Mulching', 'Integrated pest management'].map((practice) => (
              <Badge key={practice} variant="outline">{practice}</Badge>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-500">{farm.farmingPractice} keeps the soil healthy across all fields.</p>
        </SectionCard>

        <SectionCard title="Machinery & equipment" icon={FiZap}>
          <ul className="space-y-2.5">
            {farm.machinery.map((item) => (
              <li key={item} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-gray-700 shadow-soft">
                <FiWind className="text-primary-500" aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </PageTransition>
  );
}