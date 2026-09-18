import Card from '@/components/ui/Card';
import { cn } from '@/utils/cn';

export default function SectionCard({ title, icon: Icon, action, children, className }) {
  return (
    <Card variant="soft" className={cn('p-4 sm:p-5', className)}>
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          {title && (
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-gray-900">
              {Icon && <Icon className="text-lg text-primary-600" aria-hidden="true" />}
              {title}
            </h3>
          )}
          {action}
        </div>
      )}
      {children}
    </Card>
  );
}