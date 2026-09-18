import { FiCloud, FiDroplet } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import RecHeader from '@/components/recommendation/RecHeader';
import CompatibilityCard from '@/components/recommendation/CompatibilityCard';
import { useRecommendation } from '@/context/RecommendationContext';

export default function WeatherCompatibility() {
  const { result } = useRecommendation();
  const crops = result.recommendations;
  const best = crops.reduce((prev, c) => (c.weather.score > prev.weather.score ? c : prev), crops[0]);
  const avg = crops.length ? Math.round(crops.reduce((s, c) => s + c.weather.score, 0) / crops.length) : 0;

  return (
    <PageTransition>
      <RecHeader title="Weather Compatibility" subtitle="Rainfall, temperature and humidity fit per crop" showBack />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        <Card variant="soft" className="p-4">
          <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
            <FiCloud aria-hidden="true" /> Best weather match
          </p>
          <p className="mt-1 font-display text-xl font-bold text-gray-900">{best.name}</p>
          <p className="text-xs text-gray-400">{best.weather.score}% fit</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Avg weather fit</p>
          <p className="mt-1 font-display text-xl font-bold text-sky-600">{avg}%</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Water need</p>
          <p className="mt-1 flex items-center gap-1 font-display text-xl font-bold text-gray-900">
            <FiDroplet className="text-sky-500" aria-hidden="true" /> {result.input.irrigationLabel}
          </p>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {crops.map((crop) => (
          <CompatibilityCard key={crop.key} crop={crop} type="weather" />
        ))}
      </div>
    </PageTransition>
  );
}