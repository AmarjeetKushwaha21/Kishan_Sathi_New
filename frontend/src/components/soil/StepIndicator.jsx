import { FiCheck } from 'react-icons/fi';

import { cn } from '@/utils/cn';

const STEPS = [
  { key: 'book', label: 'Book' },
  { key: 'lab', label: 'Lab' },
  { key: 'appointment', label: 'Appointment' },
];

export default function StepIndicator({ current }) {
  const currentIndex = STEPS.findIndex((s) => s.key === current);

  return (
    <ol className="mb-6 flex items-center gap-2" aria-label="Booking progress">
      {STEPS.map((step, index) => {
        const done = index < currentIndex;
        const active = index === currentIndex;
        return (
          <li key={step.key} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition',
                done
                  ? 'border-primary-600 bg-primary-600 text-white'
                  : active
                  ? 'border-primary-600 bg-white text-primary-700 ring-4 ring-primary-100'
                  : 'border-gray-200 bg-white text-gray-400'
              )}
              aria-hidden="true"
            >
              {done ? <FiCheck /> : index + 1}
            </span>
            <span className={cn('hidden text-xs font-semibold sm:block', active ? 'text-primary-700' : 'text-gray-400')}>
              {step.label}
            </span>
            {index < STEPS.length - 1 && (
              <span className={cn('h-0.5 flex-1 rounded-full', index < currentIndex ? 'bg-primary-500' : 'bg-gray-200')} aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}