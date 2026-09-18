import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiPlusCircle, FiZap } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import PageHeader from '@/components/ui/PageHeader';
import { CROPS_FOR_PLAN, FIELDS_FOR_PLAN, SEASONS } from '@/data/mock/cropPlanner';
import { cn } from '@/utils/cn';

export default function NewPlan() {
  const navigate = useNavigate();
  const [season, setSeason] = useState('rabi');
  const [cropKey, setCropKey] = useState('wheat');
  const [field, setField] = useState('North Field · 3.5 acres');
  const [variety, setVariety] = useState('');
  const [sowDate, setSowDate] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => navigate('/dashboard/crop-planner'), 900);
    }, 1100);
  }

  const selectedCrop = CROPS_FOR_PLAN.find((c) => c.key === cropKey);

  return (
    <PageTransition>
      <PageHeader title="New Crop Plan" subtitle="Plan your season with AI-suggested schedules" showBack />

      {success ? (
        <Card variant="tinted" className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-2xl text-white shadow-soft" aria-hidden="true">
            <FiCheckCircle />
          </span>
          <h3 className="mt-4 font-display text-lg font-bold text-gray-900">Crop plan created!</h3>
          <p className="mt-1 text-sm text-gray-500">AI tasks for irrigation, fertilizer and pest checks are added.</p>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="grid items-start gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-5">
            <Card variant="soft">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Season</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SEASONS.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    aria-pressed={season === item.key}
                    onClick={() => setSeason(item.key)}
                    className={cn(
                      'focus-ring rounded-xl border px-3.5 py-2 text-xs font-semibold transition',
                      season === item.key
                        ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </Card>

            <Card variant="soft">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Crop</p>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {CROPS_FOR_PLAN.map((crop) => (
                  <button
                    key={crop.key}
                    type="button"
                    aria-pressed={cropKey === crop.key}
                    onClick={() => setCropKey(crop.key)}
                    className={cn(
                      'focus-ring flex flex-col items-center gap-2 rounded-xl border p-4 transition',
                      cropKey === crop.key
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 bg-white hover:border-primary-300'
                    )}
                  >
                    <span className="text-2xl" aria-hidden="true">{crop.emoji}</span>
                    <span className="text-xs font-semibold text-gray-700">{crop.label}</span>
                  </button>
                ))}
              </div>
            </Card>

            <Card variant="soft">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Details</p>
              <div className="mt-3 space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-gray-600">Field</span>
                  <select value={field} onChange={(event) => setField(event.target.value)} className="input-base w-full">
                    {FIELDS_FOR_PLAN.map((f) => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-gray-600">Variety</span>
                    <input
                      required
                      value={variety}
                      onChange={(event) => setVariety(event.target.value)}
                      placeholder={`e.g. HD-2967`}
                      className="input-base w-full"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-semibold text-gray-600">Sowing date</span>
                    <input
                      required
                      type="date"
                      value={sowDate}
                      onChange={(event) => setSowDate(event.target.value)}
                      className="input-base w-full"
                    />
                  </label>
                </div>
              </div>
            </Card>

            <Alert variant="success" title="AI schedule enabled">
              Sowing, irrigation, urea splits, weed control and harvest tasks are auto-generated for {selectedCrop?.label || 'your crop'} and appear in the planner immediately.
            </Alert>
          </div>

          <aside className="space-y-4">
            <Card className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
              <p className="flex items-center gap-2 font-display text-sm font-bold">
                <FiZap aria-hidden="true" /> AI crop planner
              </p>
              <ul className="mt-3 space-y-2 text-xs text-primary-100">
                <li>• Variety-matched irrigation windows</li>
                <li>• Split fertilizer recommendations</li>
                <li>• Pest checks during risk periods</li>
                <li>• Harvest readiness estimates</li>
              </ul>
            </Card>
            <Card variant="flat">
              <Button type="submit" fullWidth loading={submitting} leftIcon={!submitting ? FiPlusCircle : undefined} rightIcon={FiArrowRight}>
                Create plan
              </Button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="focus-ring mt-3 w-full rounded-xl py-2 text-xs font-semibold text-gray-500 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </Card>
          </aside>
        </form>
      )}
    </PageTransition>
  );
}