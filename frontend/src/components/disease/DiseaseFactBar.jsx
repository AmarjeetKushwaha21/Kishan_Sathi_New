import { FiClock, FiTrendingDown } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import { cn } from '@/utils/cn';

const SEVERITY_STYLES = {
  critical: 'bg-red-100 text-red-700',
  high: 'bg-accent-100 text-accent-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-primary-100 text-primary-700',
};

export default function DiseaseFactBar({ disease }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card variant="flat" className="p-3 text-center">
        <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold capitalize', SEVERITY_STYLES[disease.severity])}>
          {disease.severity}
        </span>
        <p className="mt-2 text-[11px] font-medium text-gray-500">Severity level</p>
      </Card>
      <Card variant="flat" className="p-3 text-center">
        <p className="inline-flex items-center gap-1 text-xs font-bold text-gray-900">
          <FiClock aria-hidden="true" className="text-primary-600" />
          {disease.window}
        </p>
        <p className="mt-2 text-[11px] font-medium text-gray-500">Act fast</p>
      </Card>
      <Card variant="flat" className="p-3 text-center">
        <p className="inline-flex items-center gap-1 text-xs font-bold text-gray-900">
          <FiTrendingDown aria-hidden="true" className="text-red-500" />
          {disease.yieldLoss}
        </p>
        <p className="mt-2 text-[11px] font-medium text-gray-500">Yield at risk</p>
      </Card>
    </div>
  );
}