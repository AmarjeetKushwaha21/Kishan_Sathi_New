import { FiRotateCcw } from 'react-icons/fi';

import Button from '@/components/ui/Button';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/utils/cn';

function RadioRow({ checked, onChange, label, hint }) {
  return (
    <button
      type="button"
      onClick={onChange}
      role="radio"
      aria-checked={checked}
      className="focus-ring flex w-full items-start gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-primary-50"
    >
      <span
        className={cn(
          'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition',
          checked ? 'border-primary-600' : 'border-gray-300'
        )}
      >
        {checked && <span className="h-2 w-2 rounded-full bg-primary-600" />}
      </span>
      <span className="min-w-0">
        <span className={cn('block text-sm font-medium', checked ? 'text-primary-700' : 'text-gray-700')}>{label}</span>
        {hint && <span className="block text-xs text-gray-400">{hint}</span>}
      </span>
    </button>
  );
}

function ToggleRow({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className="focus-ring flex w-full items-center justify-between gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-primary-50"
    >
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition',
          checked ? 'bg-primary-600' : 'bg-gray-300'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all',
            checked ? 'left-[22px]' : 'left-0.5'
          )}
        />
      </span>
    </button>
  );
}

export default function FilterPanel() {
  const { filters, setFilters, resetFilters, priceRanges, activeFilterCount } = useStore();

  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));

  return (
    <div className="space-y-5" role="group" aria-label="Product filters">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold text-gray-900">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={resetFilters}
            className="focus-ring inline-flex items-center gap-1 rounded-md text-xs font-semibold text-primary-600 hover:text-primary-700"
          >
            <FiRotateCcw aria-hidden="true" /> Reset all
          </button>
        )}
      </div>

      <fieldset>
        <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Price range</legend>
        <div role="radiogroup" aria-label="Price range">
          {priceRanges.map((range) => (
            <RadioRow
              key={range.key}
              checked={filters.priceRange === range.key}
              onChange={() => set({ priceRange: range.key })}
              label={range.label}
            />
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Customer rating</legend>
        <div role="radiogroup" aria-label="Minimum rating">
          {[
            { key: 0, label: 'All ratings' },
            { key: 4, label: '4★ & above' },
            { key: 3, label: '3★ & above' },
          ].map((option) => (
            <RadioRow
              key={option.key}
              checked={filters.minRating === option.key}
              onChange={() => set({ minRating: option.key })}
              label={option.label}
            />
          ))}
        </div>
      </fieldset>

      <div className="space-y-1 border-t border-gray-100 pt-4">
        <ToggleRow
          checked={filters.inStock}
          onChange={() => set({ inStock: !filters.inStock })}
          label="In stock only"
        />
        <ToggleRow
          checked={filters.organic}
          onChange={() => set({ organic: !filters.organic })}
          label="Organic only"
        />
      </div>

      <Button variant="outline" fullWidth onClick={resetFilters}>
        Clear filters
      </Button>
    </div>
  );
}