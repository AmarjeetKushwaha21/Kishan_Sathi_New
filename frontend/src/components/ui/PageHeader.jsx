import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { cn } from '@/utils/cn';

export default function PageHeader({
  title,
  subtitle,
  showBack = false,
  status,
  statusIcon: StatusIcon,
  className,
}) {
  const navigate = useNavigate();

  return (
    <div className={cn('mb-5 flex flex-wrap items-center gap-3', className)}>
      {showBack && (
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg text-gray-600 transition hover:text-primary-600"
        >
          <FiArrowLeft aria-hidden="true" />
        </button>
      )}

      <div className="min-w-0 flex-1">
        <h2 className="truncate font-display text-lg font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="truncate text-xs text-gray-500">{subtitle}</p>}
      </div>

      {status && (
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-primary-200 bg-primary-50 px-3 py-2 text-xs font-bold text-primary-700">
          {StatusIcon && <StatusIcon aria-hidden="true" />}
          {status}
        </span>
      )}
    </div>
  );
}