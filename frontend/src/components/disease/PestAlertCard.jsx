import { FiAlertTriangle, FiBell, FiInfo, FiMapPin } from 'react-icons/fi';

import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import { cn } from '@/utils/cn';

const SEVERITY_META = {
  warning: { icon: FiAlertTriangle, badge: 'danger', ring: 'border-l-red-500' },
  advisory: { icon: FiBell, badge: 'accent', ring: 'border-l-accent-500' },
  info: { icon: FiInfo, badge: 'primary', ring: 'border-l-sky-500' },
};

export default function PestAlertCard({ alert }) {
  if (!alert) return null;
  const severity = alert.severity || 'info';
  const { icon: Icon, badge, ring } = SEVERITY_META[severity] || SEVERITY_META.info;
  return (
    <Card className={cn('border-l-4 p-5', ring)}>
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-lg text-gray-600">
          <Icon aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-sm font-bold text-gray-900">{alert.title || 'Pest Alert'}</h3>
            <Badge size="sm" variant={badge} className="capitalize">
              {severity}
            </Badge>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {alert.crop || 'All Crops'} ·{' '}
            <span className="inline-flex items-center gap-0.5">
              <FiMapPin aria-hidden="true" /> {alert.region || 'Regional'}
            </span>
          </p>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{alert.message || ''}</p>
          {alert.date && <p className="mt-2 text-[11px] font-medium text-gray-400">{alert.date}</p>}
        </div>
      </div>
    </Card>
  );
}