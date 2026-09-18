import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { cn } from '@/utils/cn';

const STATUS_VARIANT = {
  Optimal: 'primary',
  Safe: 'primary',
  Moderate: 'accent',
  Deficient: 'danger',
  Excessive: 'primary',
};

export default function FactorCard({ icon: Icon, label, value, unit, status, notes, optimal }) {
  return (
    <Card variant="soft" className="p-4">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-lg text-primary-600">
          <Icon aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
          <p className="font-display text-lg font-bold text-gray-900">
            {value} <span className="text-xs font-medium text-gray-400">{unit}</span>
          </p>
        </div>
        <Badge variant={STATUS_VARIANT[status] || 'primary'} size="sm">{status}</Badge>
      </div>
      <p className={cn('mt-3 text-xs leading-relaxed text-gray-500')}>
        {notes} {optimal ? <span className="text-gray-400">Ideal {optimal}.</span> : null}
      </p>
    </Card>
  );
}