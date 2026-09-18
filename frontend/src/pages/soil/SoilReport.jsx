import { Link } from 'react-router-dom';
import {
  FiActivity,
  FiDroplet,
  FiFileText,
  FiLayers,
  FiThermometer,
  FiTrendingUp,
  FiUmbrella,
} from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import SoilHeader from '@/components/soil/SoilHeader';
import ReportHero from '@/components/soil/ReportHero';
import FactorCard from '@/components/soil/FactorCard';
import { useSoilTest } from '@/context/SoilTestContext';
import { SOIL_REPORT } from '@/data/mock/soilTest';

const DEEP_LINKS = [
  { to: '/dashboard/soil/nutrients', label: 'Nutrients', icon: FiLayers, color: 'bg-primary-50 text-primary-600' },
  { to: '/dashboard/soil/ph', label: 'pH Analysis', icon: FiThermometer, color: 'bg-accent-50 text-accent-600' },
  { to: '/dashboard/soil/fertilizer', label: 'Fertilizer', icon: FiActivity, color: 'bg-violet-50 text-violet-600' },
  { to: '/dashboard/soil/charts', label: 'Charts', icon: FiTrendingUp, color: 'bg-sky-50 text-sky-600' },
];

export default function SoilReport() {
  const { latestReport } = useSoilTest();
  const report = latestReport || SOIL_REPORT;

  return (
    <PageTransition>
      <SoilHeader title="Soil Report" subtitle={`${report.id} · ${report.sampleId}`} showBack status={report.status === 'processing' ? 'Processing' : 'Ready'} />

      <ReportHero report={report} />

      <section aria-label="Key factors" className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <FactorCard icon={FiThermometer} label="pH level" value={report.ph.value} unit={report.ph.unit} status={report.ph.status} notes={report.ph.notes} optimal={report.ph.optimal.join(' – ')} />
        <FactorCard icon={FiDroplet} label="Electrical conductivity" value={report.ec.value} unit={report.ec.unit} status={report.ec.status} notes={report.ec.notes} optimal={report.ec.optimal} />
        <FactorCard icon={FiActivity} label="Organic carbon" value={report.organicCarbon.value} unit={report.organicCarbon.unit} status={report.organicCarbon.status} notes={report.organicCarbon.notes} optimal={report.organicCarbon.optimal} />
        <FactorCard icon={FiLayers} label="Soil texture" value={report.texture} unit="" status="Safe" notes="Balanced sand-silt-clay mix for water retention." />
        <FactorCard icon={FiUmbrella} label="Moisture" value={`${report.moisture}`} unit="%" status="Safe" notes="Soil moisture at sampling time." />
        <FactorCard icon={FiFileText} label="Drainage" value={report.drainage} unit="" status="Safe" notes="Well-drained profile; safe from waterlogging." />
      </section>

      <Card variant="soft" className="mt-6">
        <h3 className="mb-4 font-display text-base font-semibold text-gray-900">Recommended actions</h3>
        <ul className="space-y-2.5">
          {report.recommendations.map((rec) => (
            <li key={rec} className="flex items-start gap-2.5 rounded-xl bg-primary-50/60 p-3 text-sm text-gray-700">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" aria-hidden="true" />
              {rec}
            </li>
          ))}
        </ul>
      </Card>

      <section aria-label="Deep dive" className="mt-6">
        <h2 className="mb-4 font-display text-base font-semibold text-gray-900">Deep dive</h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {DEEP_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.to} to={link.to} className="focus-ring rounded-2xl">
                <Card variant="soft" className="h-full p-4 text-center transition hover:-translate-y-0.5 hover:shadow-card">
                  <span className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${link.color}`}>
                    <Icon aria-hidden="true" />
                  </span>
                  <p className="mt-3 font-display text-sm font-bold text-gray-900">{link.label}</p>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </PageTransition>
  );
}