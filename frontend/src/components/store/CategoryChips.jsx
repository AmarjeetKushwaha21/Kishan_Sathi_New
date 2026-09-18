import { FiGrid } from 'react-icons/fi';

import { useStore } from '@/context/StoreContext';
import { cn } from '@/utils/cn';

export default function CategoryChips({ scrollRef }) {
  const { categories, categoryCounts, filters, setFilters } = useStore();

  return (
    <nav aria-label="Product categories" ref={scrollRef}>
      <ul className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        <li className="shrink-0">
          <button
            type="button"
            onClick={() => setFilters((f) => ({ ...f, category: 'all' }))}
            aria-pressed={filters.category === 'all'}
            className={cn(
              'focus-ring flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition',
              filters.category === 'all'
                ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300 hover:text-primary-700'
            )}
          >
            <FiGrid aria-hidden="true" />
            All
            <span className={cn('rounded-full px-1.5 text-xs', filters.category === 'all' ? 'bg-white/20' : 'bg-gray-100')}>
              {categoryCounts.all}
            </span>
          </button>
        </li>

        {categories.map((cat) => {
          const active = filters.category === cat.key;
          return (
            <li key={cat.key} className="shrink-0">
              <button
                type="button"
                onClick={() => setFilters((f) => ({ ...f, category: active ? 'all' : cat.key }))}
                aria-pressed={active}
                className={cn(
                  'focus-ring flex items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-semibold transition',
                  active
                    ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300 hover:text-primary-700'
                )}
              >
                <span aria-hidden="true">{cat.emoji}</span>
                {cat.label}
                <span className={cn('rounded-full px-1.5 text-xs', active ? 'bg-white/20' : 'bg-gray-100')}>
                  {categoryCounts[cat.key]}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}