import { FiLayers } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import RecHeader from '@/components/recommendation/RecHeader';
import CompatibilityCard from '@/components/recommendation/CompatibilityCard';
import { useRecommendation } from '@/context/RecommendationContext';

export default function SoilCompatibility() {
  const { result } = useRecommendation();
  const crops = result.recommendations;
  const best = crops.reduce((prev, c) => (c.soil.score > prev.soil.score ? c : prev), crops[0]);
  const avg = crops.length ? Math.round(crops.reduce((s, c) => s + c.soil.score, 0) / crops.length) : 0;
  const soilLabel = result.input.soilLabel;

  return (
    <PageTransition>
      <RecHeader title="Soil Compatibility" subtitle={`How well each crop fits ${soilLabel} soil`} showBack />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Your soil</p>
          <p className="mt-1 font-display text-xl font-bold text-gray-900">{soilLabel}</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
            <FiLayers aria-hidden="true" /> Best soil match
          </p>
          <p className="mt-1 font-display text-xl font-bold text-gray-900">{best.name}</p>
          <p className="text-xs text-gray-400">{best.soil.score}% fit</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Avg soil fit</p>
          <p className="mt-1 font-display text-xl font-bold text-primary-700">{avg}%</p>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {crops.map((crop) => (
          <CompatibilityCard key={crop.key} crop={crop} type="soil" />
        ))}
      </div>

      <Card variant="tinted" className="mt-6">
        <h3 className="mb-2 font-display text-base font-semibold text-gray-900">Soil tip</h3>
        <p className="text-xs leading-relaxed text-gray-600">
          Add farmyard manure or green manure before sowing to lift organic carbon, and test your soil every
          6 months. Matching the right crop to your soil texture cuts input costs by up to 20%.
        </p>
      </Card>
    </PageTransition>
  );
}