import { FiCheckCircle, FiCircle } from 'react-icons/fi';

import { cn } from '@/utils/cn';

export default function TimelineStep({ step, last = false }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span
          className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
            step.done ? 'bg-primary-600 text-white shadow-soft' : 'bg-gray-100 text-gray-300'
          )}
          aria-hidden="true"
        >
          {step.done ? <FiCheckCircle /> : <FiCircle />}
        </span>
        {!last && <span className={cn('my-1 w-0.5 flex-1', step.done ? 'bg-primary-200' : 'bg-gray-200')} aria-hidden="true" />}
      </div>
      <div className={cn('min-w-0 pb-6', last && 'pb-0')}>
        <div className="flex flex-wrap items-center gap-2">
          <p className={cn('font-display text-sm font-bold', step.done ? 'text-gray-900' : 'text-gray-400')}>{step.label}</p>
          <span className={cn('text-[11px] font-semibold', step.done ? 'text-gray-500' : 'text-gray-300')}>{step.time}</span>
        </div>
        {step.detail && <p className={cn('mt-0.5 text-xs leading-relaxed', step.done ? 'text-gray-500' : 'text-gray-300')}>{step.detail}</p>}
      </div>
    </div>
  );
}