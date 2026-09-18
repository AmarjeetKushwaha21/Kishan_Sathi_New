import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiBarChart2,
  FiDroplet,
  FiLayers,
  FiMapPin,
  FiTruck,
  FiTrendingUp,
  FiUser,
} from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import RecHeader from '@/components/recommendation/RecHeader';
import ResultHero from '@/components/recommendation/ResultHero';
import CropCard from '@/components/recommendation/CropCard';
import AiThinking from '@/components/recommendation/AiThinking';
import { useRecommendation } from '@/context/RecommendationContext';

export default function RecommendationResult() {
  const { result, loading } = useRecommendation();

  if (loading || !result) {
    return (
      <PageTransition>
        <RecHeader title="Recommendation Result" subtitle="Your personalised crop plan" showBack />
        <AiThinking />
      </PageTransition>
    );
  }

  const recommendations = Array.isArray(result.recommendations) ? result.recommendations : [];
  const [best, ...rest] = recommendations;
  const top = recommendations.slice(0, 3);
  const alternatives = Array.isArray(result.alternatives) ? result.alternatives : [];

  return (
    <PageTransition>
      <RecHeader title="Recommendation Result" subtitle={`Generated at ${result.generatedAt || 'Recently'}`} showBack />

      <Card variant="soft" className="relative overflow-hidden">
        <span className="absolute -left-4 top-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-600 text-xl text-white shadow-soft" aria-hidden="true">
          <FiLayers />
        </span>
        <div className="pl-14">
          <h3 className="font-display text-lg font-bold text-gray-900">{result.summary || 'Crop Recommendation Summary'}</h3>
          <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1"><FiUser aria-hidden="true" /> {result.input?.soilLabel || 'Optimal'} soil</span>
            <span className="inline-flex items-center gap-1"><FiMapPin aria-hidden="true" /> {result.input?.seasonLabel || 'Current Season'}</span>
            <span className="inline-flex items-center gap-1"><FiDroplet aria-hidden="true" /> {result.input?.irrigationLabel || 'Irrigation'}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <span className="font-semibold text-gray-700">
              {recommendations.length} suitable crops
            </span>
            <span className="font-semibold text-primary-700">Avg suitability {result.avgSuitability ?? 85}%</span>
            <span className="font-semibold text-accent-700">Avg return {result.avgMargin ?? 38}%</span>
          </div>
        </div>
      </Card>

      {best && <div className="mt-6"><ResultHero crop={best} /></div>}

      <section aria-label="Top suitable crops" className="mt-6">
        <h2 className="mb-4 font-display text-base font-semibold text-gray-900">Top suitable crops</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {top.map((crop) => (
            <CropCard key={crop.key} crop={crop} highlight={crop.key === best.key} to="/dashboard/recommendation/crops" />
          ))}
        </div>
      </section>

      <section aria-label="Deep dive" className="mt-6">
        <h2 className="mb-4 font-display text-base font-semibold text-gray-900">Deep dive</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <Link to="/dashboard/recommendation/crops" className="focus-ring rounded-2xl">
            <Card variant="soft" className="h-full p-4 text-center transition hover:-translate-y-0.5 hover:shadow-card">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-xl text-primary-600"><FiLayers aria-hidden="true" /></span>
              <p className="mt-3 font-display text-sm font-bold text-gray-900">Suitable Crops</p>
              <p className="mt-1 text-xs text-gray-500">Scores & details</p>
            </Card>
          </Link>
          <Link to="/dashboard/recommendation/profit" className="focus-ring rounded-2xl">
            <Card variant="soft" className="h-full p-4 text-center transition hover:-translate-y-0.5 hover:shadow-card">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-xl text-accent-600"><FiTrendingUp aria-hidden="true" /></span>
              <p className="mt-3 font-display text-sm font-bold text-gray-900">Profit Prediction</p>
              <p className="mt-1 text-xs text-gray-500">Returns per acre</p>
            </Card>
          </Link>
          <Link to="/dashboard/recommendation/demand" className="focus-ring rounded-2xl">
            <Card variant="soft" className="h-full p-4 text-center transition hover:-translate-y-0.5 hover:shadow-card">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-xl text-violet-600"><FiTruck aria-hidden="true" /></span>
              <p className="mt-3 font-display text-sm font-bold text-gray-900">Market Demand</p>
              <p className="mt-1 text-xs text-gray-500">Prices & demand</p>
            </Card>
          </Link>
          <Link to="/dashboard/recommendation/weather" className="focus-ring rounded-2xl">
            <Card variant="soft" className="h-full p-4 text-center transition hover:-translate-y-0.5 hover:shadow-card">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-xl text-sky-600"><FiBarChart2 aria-hidden="true" /></span>
              <p className="mt-3 font-display text-sm font-bold text-gray-900">Weather & Soil</p>
              <p className="mt-1 text-xs text-gray-500">Compatibility fit</p>
            </Card>
          </Link>
        </div>
      </section>

      {alternatives.length > 0 && (
        <Card variant="tinted" className="mt-6">
          <h3 className="mb-2 font-display text-base font-semibold text-gray-900">Try these next season</h3>
          <p className="mb-3 text-xs text-gray-500">
            {alternatives.map((c) => c?.name || '').filter(Boolean).join(' · ')} scored below 55% for your current soil & season.
          </p>
          <Link to="/dashboard/recommendation/crops" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700">
            View full crop list <FiArrowRight aria-hidden="true" />
          </Link>
        </Card>
      )}

      {rest.length > 0 && (
        <p className="mt-4 text-xs text-gray-400">
          {rest.map((c) => c?.name || '').filter(Boolean).join(' · ')} also cleared the suitability bar.
        </p>
      )}
    </PageTransition>
  );
}