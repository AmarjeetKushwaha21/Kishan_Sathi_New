import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

import { cn } from '@/utils/cn';

export default function SectionHeader({ title, subtitle, icon: Icon, to, linkLabel = 'View all', className }) {
  return (
    <div className={cn('mb-4 flex items-start justify-between gap-3', className)}>
      <div className="min-w-0">
        <h2 className="flex items-center gap-2 font-display text-base font-semibold text-gray-900">
          {Icon && (
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-sm text-primary-600">
              <Icon aria-hidden="true" />
            </span>
          )}
          {title}
        </h2>
        {subtitle && <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>}
      </div>
      {to && (
        <Link
          to={to}
          className="focus-ring inline-flex shrink-0 items-center gap-0.5 rounded-md text-xs font-semibold text-primary-600 hover:text-primary-700"
        >
          {linkLabel}
          <FiChevronRight aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}