import Card from '@/components/ui/Card';
import { cn } from '@/utils/cn';

export default function AdminChartCard({ title, subtitle, action, children, className }) {
  return (
    <Card variant="soft" className={cn('p-4 sm:p-5', className)}>
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-base font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </Card>
  );
}