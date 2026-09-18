import { FiLayers } from 'react-icons/fi';

import { NOTIFICATION_CATEGORIES } from '@/data/mock/notifications';
import { CategoryDot } from '@/components/notifications/CategoryIcon';
import { cn } from '@/utils/cn';

export default function CategoryFilter({ active, counts, onChange }) {
  const allUnread = NOTIFICATION_CATEGORIES.reduce((sum, c) => sum + (counts[c.id]?.unread || 0), 0);

  const chips = [
    { id: 'all', label: 'All', unread: allUnread, dot: false },
    ...NOTIFICATION_CATEGORIES.map((c) => ({ id: c.id, label: c.label, unread: counts[c.id]?.unread || 0, dot: true, color: c.color })),
  ];

  return (
    <div className="no-scrollbar -mx-4 mb-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0" role="tablist" aria-label="Filter notifications">
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          role="tab"
          aria-selected={active === chip.id}
          onClick={() => onChange(chip.id)}
          className={cn(
            'focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-bold transition',
            active === chip.id
              ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
              : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300 hover:text-primary-700'
          )}
        >
          {chip.dot ? (
            <CategoryDot category={chip.id} className={active === chip.id ? '!bg-white/80' : undefined} />
          ) : (
            <FiLayers className={active === chip.id ? 'text-white' : 'text-gray-400'} aria-hidden="true" />
          )}
          {chip.label}
          {chip.unread > 0 && (
            <span
              className={cn(
                'rounded-full px-1.5 text-[10px] leading-4',
                active === chip.id ? 'bg-white/25 text-white' : 'bg-primary-100 text-primary-700'
              )}
            >
              {chip.unread}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}