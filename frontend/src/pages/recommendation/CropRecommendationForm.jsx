import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FiCpu, FiZap } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Alert from '@/components/ui/Alert';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import RecHeader from '@/components/recommendation/RecHeader';
import AiThinking from '@/components/recommendation/AiThinking';
import { useRecommendation } from '@/context/RecommendationContext';
import { BUDGET_RANGES, IRRIGATION_OPTIONS, REGIONS, SEASONS, SOIL_TYPES } from '@/data/mock/aiRecommendation';
import { cn } from '@/utils/cn';

function ChipGroup({ label, options, value, onChange, columns = 'grid-cols-2 sm:grid-cols-3' }) {
  return (
    <div>
      <span className="label-base">{label}</span>
      <div className={cn('grid gap-2', columns)}>
        {options.map((option) => {
          const selected = value === option.key;
          return (
            <button
              key={option.key}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.key)}
              className={cn(
                'focus-ring flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition',
                selected
                  ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
              )}
            >
              <span aria-hidden="true">{option.emoji}</span>
              <span className="min-w-0">
                <span className="block truncate">{option.label}</span>
                {option.months && (
                  <span className={cn('block text-[10px] font-medium', selected ? 'text-primary-100' : 'text-gray-400')}>
                    {option.months}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CropRecommendationForm() {
  const navigate = useNavigate();
  const { generate, loading } = useRecommendation();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      soilType: 'loamy',
      season: 'kharif',
      irrigation: 'full',
      landArea: 5,
      budget: 'medium',
      region: 'punjab',
    },
  });

  const soilType = watch('soilType');
  const season = watch('season');
  const irrigation = watch('irrigation');

  async function onSubmit(data) {
    setServerError(null);
    try {
      await generate(data);
      navigate('/dashboard/recommendation/result');
    } catch (error) {
      setServerError(error.message || 'Something went wrong while generating recommendations.');
    }
  }

  return (
    <PageTransition>
      <RecHeader title="Crop Recommendation" subtitle="Tell AI Sathi about your farm" />

      {loading ? (
        <AiThinking />
      ) : (
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {serverError && <Alert variant="error">{serverError}</Alert>}

            <Card variant="soft">
              <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
                <FiCpu className="text-primary-600" aria-hidden="true" /> Farm profile
              </h3>

              <div className="space-y-5">
                <ChipGroup
                  label="Soil type"
                  options={SOIL_TYPES}
                  value={soilType}
                  onChange={(key) => setValue('soilType', key)}
                />

                <ChipGroup
                  label="Growing season"
                  options={SEASONS}
                  value={season}
                  onChange={(key) => setValue('season', key)}
                />

                <ChipGroup
                  label="Water availability"
                  options={IRRIGATION_OPTIONS}
                  value={irrigation}
                  onChange={(key) => setValue('irrigation', key)}
                />
              </div>
            </Card>

            <Card variant="soft">
              <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Field details</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <Input
                  label="Land area (acres)"
                  type="number"
                  min="1"
                  step="0.5"
                  required
                  error={errors.landArea?.message}
                  {...register('landArea', {
                    required: 'Land area is required',
                    min: { value: 0.5, message: 'Minimum 0.5 acre' },
                  })}
                />
                <label className="block">
                  <span className="label-base">Budget / acre</span>
                  <select {...register('budget')} className="input-base">
                    {BUDGET_RANGES.map((b) => (
                      <option key={b.key} value={b.key}>{b.label}</option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="label-base">State / region</span>
                  <select {...register('region')} className="input-base">
                    {REGIONS.map((r) => (
                      <option key={r.key} value={r.key}>{r.label}</option>
                    ))}
                  </select>
                </label>
              </div>
            </Card>

            <Button type="submit" size="lg" fullWidth leftIcon={FiZap}>
              Generate recommendations
            </Button>
          </form>

          <Card variant="tinted" className="lg:sticky lg:top-24">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-2xl text-white shadow-soft">
              <FiCpu aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-gray-900">What AI Sathi does</h3>
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-gray-600">
              <li>• Scores every crop against your soil and season.</li>
              <li>• Estimates per-acre cost, revenue and returns.</li>
              <li>• Flags market demand, weather and soil fit.</li>
              <li>• Suggests the safest high-return options first.</li>
            </ul>
            <p className="mt-4 rounded-xl bg-white p-3 text-xs leading-relaxed text-gray-500">
              Recommendations are illustrative and based on dummy farm data for this demo.
            </p>
          </Card>
        </div>
      )}
    </PageTransition>
  );
}