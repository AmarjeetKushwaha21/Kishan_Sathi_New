import { FiCheck } from 'react-icons/fi';

import { cn } from '@/utils/cn';

const STATUS_DOT = {
  done: 'bg-primary-600 border-primary-600',
  current: 'bg-white border-primary-600 ring-4 ring-primary-100',
  upcoming: 'bg-gray-200 border-gray-200',
};

const STATUS_TEXT = {
  done: 'text-gray-900',
  current: 'text-primary-700 font-semibold',
  upcoming: 'text-gray-500',
};

export default function Timeline({ items, title, className }) {
  return (
    <div className={className}>
      {title && <h3 className="mb-4 font-display text-base font-semibold text-gray-900">{title}</h3>}
      <ol className="space-y-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const dot = STATUS_DOT[item.status] || STATUS_DOT.upcoming;
          return (
            <li key={item.id || index} className="relative flex gap-4 pb-6 last:pb-0">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    'z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[10px] text-white transition',
                    dot
                  )}
                  aria-hidden="true"
                >
                  {item.status === 'done' && <FiCheck />}
                </span>
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className={cn('w-0.5 flex-1 -my-1', item.status === 'upcoming' ? 'bg-gray-200' : 'bg-primary-200')}
                  />
                )}
              </div>
              <div className={cn('min-w-0 pb-1', STATUS_TEXT[item.status])}>
                <p className="text-sm font-medium">{item.title}</p>
                {item.description && <p className="mt-0.5 text-xs leading-relaxed text-gray-500">{item.description}</p>}
                {item.date && <p className="mt-1 text-[11px] text-gray-400">{item.date}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}