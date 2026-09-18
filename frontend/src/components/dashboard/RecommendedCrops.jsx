import { FiTrendingUp } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import SectionHeader from '@/components/ui/SectionHeader';
import { RECOMMENDED_CROPS } from '@/data/mock/dashboard';

export default function RecommendedCrops() {
  return (
    <Card variant="soft" className="flex h-full flex-col">
      <SectionHeader
        title="Recommended Crops"
        subtitle="Based on soil, season & market demand"
        icon={FiTrendingUp}
        to="/dashboard/crop-planner"
        linkLabel="Plan crops"
      />

      <ul className="flex-1 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
        {RECOMMENDED_CROPS.map((crop) => (
          <li key={crop.name} className="flex items-start gap-3 rounded-xl border border-gray-100 p-3.5">
            {crop.image ? (
              <img
                src={crop.image}
                alt={crop.name}
                className="mt-0.5 h-10 w-10 shrink-0 rounded-xl object-cover shadow-soft ring-1 ring-black/5"
              />
            ) : (
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg text-white shadow-soft"
                style={{ backgroundColor: crop.color }}
              >
                🌱
              </span>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-gray-900">{crop.name}</p>
                <Badge variant="primary" size="sm">
                  {crop.suitability}% match
                </Badge>
              </div>
              <p className="mt-0.5 text-xs text-gray-500">{crop.window}</p>
              <p className="mt-1 text-xs text-gray-600">{crop.reason}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 rounded-lg bg-primary-50/60 px-3 py-2 text-[11px] text-gray-500">
        Arhar Dal (Toor) has the highest suitability for your soil this season.
      </p>
    </Card>
  );
}