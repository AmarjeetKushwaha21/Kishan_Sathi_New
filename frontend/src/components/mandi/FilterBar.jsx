import { FiMapPin, FiSearch } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import { useMandiPrice } from '@/context/MandiPriceContext';
import { cn } from '@/utils/cn';

const SORTS = [
  { value: 'modal-desc', label: 'Price: High → Low' },
  { value: 'modal-asc', label: 'Price: Low → High' },
  { value: 'change-desc', label: 'Biggest gainers' },
];

export default function FilterBar({ withMandi = true, withSort = true }) {
  const { search, setSearch, category, setCategory, categories, selectedMandiId, setSelectedMandiId, mandis, sort, setSort } = useMandiPrice();

  return (
    <Card variant="soft" className="p-4">
      <div className="relative">
        <FiSearch aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search commodity — wheat, tomato, chana…"
          aria-label="Search commodities"
          className="input-base pl-11"
        />
      </div>

      <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={category === cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'focus-ring shrink-0 rounded-xl border px-3 py-2 text-xs font-semibold transition',
              category === cat ? 'border-primary-600 bg-primary-600 text-white shadow-soft' : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {(withMandi || withSort) && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {withMandi && (
            <label className="relative block">
              <FiMapPin aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-primary-600" />
              <select
                value={selectedMandiId}
                onChange={(event) => setSelectedMandiId(event.target.value)}
                aria-label="Select mandi"
                className="input-base cursor-pointer appearance-none pl-10"
              >
                {mandis.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.short} · {m.distance} km
                  </option>
                ))}
              </select>
            </label>
          )}
          {withSort && (
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort prices"
              className="input-base cursor-pointer appearance-none"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
    </Card>
  );
}