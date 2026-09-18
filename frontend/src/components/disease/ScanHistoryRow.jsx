import { Link } from 'react-router-dom';
import { FiCamera, FiMapPin } from 'react-icons/fi';

import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { DISEASES } from '@/data/mock/diseaseDetection';
import { cn } from '@/utils/cn';

export default function ScanHistoryRow({ scan }) {
  if (!scan) return null;

  const disease = DISEASES.find((d) => d.id === scan.diseaseId) || DISEASES[0];
  const confidence = typeof scan.confidence === 'number' ? scan.confidence : 0;
  const severity = disease?.severity || 'medium';

  return (
    <Link
      to="/dashboard/disease-detection/history"
      className="focus-ring block rounded-2xl transition"
    >
      <Card variant="soft" className="flex items-center gap-4 p-4 hover:border-primary-200">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 text-2xl">
          {scan.emoji || disease?.emoji || '🌿'}
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-gray-900">
            {disease?.name || 'Unknown condition'}
            <Badge size="sm" variant={severity === 'high' || severity === 'critical' ? 'danger' : 'accent'}>
              {severity}
            </Badge>
          </p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <FiCamera aria-hidden="true" /> {scan.crop || 'Crop'}
            </span>
            <span className="inline-flex items-center gap-1">
              <FiMapPin aria-hidden="true" /> {scan.field || 'Unassigned field'}
            </span>
            <span>{scan.date || 'Recently'}</span>
          </p>
        </div>
        <span
          className={cn(
            'shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold',
            confidence >= 90 ? 'bg-primary-50 text-primary-700' : 'bg-accent-50 text-accent-700'
          )}
        >
          {confidence}%
        </span>
      </Card>
    </Link>
  );
}