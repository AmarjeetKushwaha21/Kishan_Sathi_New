import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiMapPin } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Button from '@/components/ui/Button';
import SoilHeader from '@/components/soil/SoilHeader';
import StepIndicator from '@/components/soil/StepIndicator';
import LabCard from '@/components/soil/LabCard';
import { useSoilTest } from '@/context/SoilTestContext';

export default function LabSelection() {
  const navigate = useNavigate();
  const { labs, selectedLabId, setSelectedLabId, selectedPackageInfo } = useSoilTest();

  return (
    <PageTransition>
      <SoilHeader title="Lab Selection" subtitle="Choose a NABL-style certified testing lab" showBack />

      <StepIndicator current="lab" />

      <p className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <FiMapPin className="text-primary-600" aria-hidden="true" />
        Showing labs near Ludhiana for the {selectedPackageInfo.name}.
      </p>

      <div className="space-y-4">
        {labs.map((lab) => (
          <LabCard key={lab.id} lab={lab} selected={lab.id === selectedLabId} onSelect={setSelectedLabId} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-xs text-gray-400">Sample can be dropped off or picked from your farm.</p>
        <Button size="lg" rightIcon={FiArrowRight} onClick={() => navigate('/dashboard/soil/appointment')}>
          Schedule appointment
        </Button>
      </div>
    </PageTransition>
  );
}