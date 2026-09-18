import { FiAlertTriangle, FiAward } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Alert from '@/components/ui/Alert';
import SoilHeader from '@/components/soil/SoilHeader';
import FertilizerCard from '@/components/soil/FertilizerCard';
import { useSoilTest } from '@/context/SoilTestContext';
import { formatINR } from '@/utils/format';

const CROP_EMOJIS = { Wheat: '🌾', Paddy: '🍚', Maize: '🌽' };

export default function FertilizerRecommendation() {
  const { latestReport: report } = useSoilTest();
  const totalCost = report.deficits.reduce((sum, d) => sum + d.cost, 0);

  return (
    <PageTransition>
      <SoilHeader title="Fertilizer Recommendation" subtitle="Apply exactly what your soil needs" showBack status={report.id} />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Crop plans</p>
          <p className="mt-1 font-display text-xl font-bold text-gray-900">{report.fertilizer.length}</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Deficits to fix</p>
          <p className="mt-1 font-display text-xl font-bold text-accent-600">{report.deficits.length}</p>
        </Card>
        <Card variant="soft" className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Est. correction cost</p>
          <p className="mt-1 font-display text-xl font-bold text-primary-700">{formatINR(totalCost)}</p>
          <p className="text-xs text-gray-400">one-time soil correction</p>
        </Card>
      </div>

      <section aria-label="Deficits" className="mt-6">
        <h2 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
          <FiAlertTriangle className="text-accent-500" aria-hidden="true" /> Fix these first
        </h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {report.deficits.map((deficit) => (
            <Card key={deficit.nutrient} variant="soft" className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-gray-900">{deficit.nutrient}</h3>
                <BadgeTone level={deficit.level} />
              </div>
              <p className="mt-1 text-xs text-gray-500">{deficit.level}</p>
              <dl className="mt-3 space-y-1.5 text-sm">
                <div className="flex justify-between gap-2"><dt className="text-gray-500">Product</dt><dd className="text-right font-semibold text-gray-800">{deficit.product}</dd></div>
                <div className="flex justify-between gap-2"><dt className="text-gray-500">Dosage</dt><dd className="text-right font-semibold text-gray-800">{deficit.dosage}</dd></div>
                <div className="flex justify-between gap-2"><dt className="text-gray-500">Method</dt><dd className="text-right font-semibold text-gray-800">{deficit.method}</dd></div>
                <div className="flex justify-between gap-2 border-t border-gray-100 pt-2"><dt className="text-gray-500">Est. cost</dt><dd className="font-bold text-primary-700">{formatINR(deficit.cost)}</dd></div>
              </dl>
            </Card>
          ))}
        </div>
      </section>

      <section aria-label="Crop-wise fertilizer plan" className="mt-8">
        <h2 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
          <FiAward className="text-primary-600" aria-hidden="true" /> Crop-wise application plan
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {report.fertilizer.map((item, index) => (
            <FertilizerCard key={item.crop} item={{ ...item, emoji: CROP_EMOJIS[item.crop] }} highlight={index === 0} />
          ))}
        </div>
      </section>

      <Alert variant="info" className="mt-6" title="Tip">
        Split urea into 2–3 doses to reduce losses and improve uptake. Combine corrective
        amendments with the first ploughing.
      </Alert>
    </PageTransition>
  );
}

function BadgeTone({ level }) {
  const isDeficient = level.toLowerCase().includes('deficient');
  const tone = isDeficient ? 'bg-red-50 text-red-600' : 'bg-accent-50 text-accent-700';
  return <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${tone}`}>{isDeficient ? 'Deficient' : 'Moderate'}</span>;
}