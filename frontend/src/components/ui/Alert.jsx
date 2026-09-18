import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi';

import { cn } from '@/utils/cn';

const VARIANTS = {
  success: {
    icon: FiCheckCircle,
    classes: 'border-primary-200 bg-primary-50 text-primary-800',
    iconClasses: 'text-primary-600',
  },
  error: {
    icon: FiAlertCircle,
    classes: 'border-red-200 bg-red-50 text-red-800',
    iconClasses: 'text-red-600',
  },
  warning: {
    icon: FiAlertTriangle,
    classes: 'border-accent-300 bg-accent-50 text-accent-800',
    iconClasses: 'text-accent-600',
  },
  info: {
    icon: FiInfo,
    classes: 'border-sky-200 bg-sky-50 text-sky-800',
    iconClasses: 'text-sky-600',
  },
};

export default function Alert({ variant = 'info', title, children, onClose, className }) {
  const { icon: Icon, classes, iconClasses } = VARIANTS[variant];

  return (
    <div
      role="alert"
      className={cn('flex items-start gap-3 rounded-xl border p-4 text-sm', classes, className)}
    >
      <Icon aria-hidden="true" className={cn('mt-0.5 shrink-0 text-lg', iconClasses)} />
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={cn(title && 'mt-0.5')}>{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss alert"
          className="focus-ring shrink-0 rounded-md p-1 opacity-60 hover:opacity-100"
        >
          <FiX aria-hidden="true" />
        </button>
      )}
    </div>
  );
}