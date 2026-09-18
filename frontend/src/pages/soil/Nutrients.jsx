import { FiAlertTriangle, FiDroplet, FiLayers } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Alert from '@/components/ui/Alert';
import Badge from '@/components/ui/Badge';
import SoilHeader from '@/components/soil/SoilHeader';
import NutrientMeter from '@/components/soil/NutrientMeter';
import { useSoilTest } from '@/context/SoilTestContext';

export default function Nutrients() {
  const { latestReport: report } = useSoilTest();
  const deficient = report.micronutrients.filter((m) => m.status === 'Deficient');

  return (
    <PageTransition>
      <SoilHeader title="Nutrients" subtitle="Macro & micro nutrient levels in your soil" showBack status={report.id} />

      <Card variant="soft">
        <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
          <FiLayers className="text-primary-600" aria-hidden="true" /> Macro nutrients (kg/ha)
        </h3>
        <div className="grid gap-3 md:grid-cols-3">
          <NutrientMeter name="Nitrogen (N)" value={report.nitrogen.value} unit={report.nitrogen.unit} status={report.nitrogen.status} optimal={report.nitrogen.optimal} icon={FiLayers} />
          <NutrientMeter name="Phosphorus (P)" value={report.phosphorus.value} unit={report.phosphorus.unit} status={report.phosphorus.status} optimal={report.phosphorus.optimal} icon={FiLayers} />
          <NutrientMeter name="Potassium (K)" value={report.potassium.value} unit={report.potassium.unit} status={report.potassium.status} optimal={report.potassium.optimal} icon={FiLayers} />
        </div>
      </Card>

      <Card variant="soft" className="mt-6">
        <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
          <FiDroplet className="text-sky-500" aria-hidden="true" /> Micronutrients (mg/kg)
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {report.micronutrients.map((micro) => (
            <NutrientMeter
              key={micro.name}
              name={micro.name}
              value={micro.value}
              unit={micro.unit}
              status={micro.status}
              optimal={micro.optimal}
              icon={FiDroplet}
            />
          ))}
        </div>
      </Card>

      {deficient.length > 0 && (
        <Alert variant="warning" title="Deficiencies detected" className="mt-6">
          {deficient.map((m) => (
            <p key={m.name}>
              {m.name} at {m.value} {m.unit} — {m.notes}
            </p>
          ))}
        </Alert>
      )}

      <Card variant="tinted" className="mt-6">
        <p className="flex items-start gap-2.5 text-sm leading-relaxed text-gray-600">
          <FiAlertTriangle className="mt-0.5 shrink-0 text-accent-500" aria-hidden="true" />
          Levels are measured against standard agronomy tables for <Badge variant="outline" size="sm">{report.soilType}</Badge> soil in Punjab. Re-test after each cropping season.
        </p>
      </Card>
    </PageTransition>
  );
}