import { FiLayers } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import RecHeader from '@/components/recommendation/RecHeader';
import CropCard from '@/components/recommendation/CropCard';
import { useRecommendation } from '@/context/RecommendationContext';
import { cn } from '@/utils/cn';

export default function SuitableCrops() {
  const { result } = useRecommendation();

  return (
    <PageTransition>
      <RecHeader title="Suitable Crops" subtitle={`${result.recommendations.length} crops matched to your farm`} showBack />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <Card variant="soft" className="p-4 text-center">
          <p className="font-display text-3xl font-bold text-gray-900">{result.recommendations.length}</p>
          <Badge variant="primary" size="sm" className="mt-1">Suitable crops</Badge>
        </Card>
        <Card variant="soft" className="p-4 text-center">
          <p className="font-display text-3xl font-bold text-gray-900">{result.avgSuitability}%</p>
          <Badge variant="outline" size="sm" className="mt-1">Avg suitability</Badge>
        </Card>
        <Card variant="soft" className="p-4 text-center">
          <p className="font-display text-3xl font-bold text-accent-600">{result.avgMargin}%</p>
          <Badge variant="accent" size="sm" className="mt-1">Avg return / acre</Badge>
        </Card>
        <Card variant="soft" className="p-4 text-center">
          <p className="font-display text-3xl font-bold text-gray-900">{result.alternatives.length}</p>
          <Badge variant="default" size="sm" className="mt-1">Next-season options</Badge>
        </Card>
      </div>

      <div className="mt-6 space-y-3">
        {result.recommendations.map((crop, index) => (
          <div key={crop.key} className="relative">
            {index < 3 && (
              <span className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 sm:block">
                <span
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold text-white shadow-soft',
                    index === 0 ? 'bg-primary-600' : index === 1 ? 'bg-accent-500' : 'bg-sky-500'
                  )}
                >
                  {index + 1}
                </span>
              </span>
            )}
            <CropCard crop={crop} highlight={index < 3} to="/dashboard/recommendation/profit" />
          </div>
        ))}
      </div>

      {result.alternatives.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
            <FiLayers className="text-gray-400" aria-hidden="true" /> Not the best fit this season
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {result.alternatives.map((crop) => (
              <CropCard key={crop.key} crop={crop} to="/dashboard/recommendation/weather" />
            ))}
          </div>
        </div>
      )}
    </PageTransition>
  );
}