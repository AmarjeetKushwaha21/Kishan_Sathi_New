import { FiCompass, FiFilter, FiMapPin, FiRefreshCw, FiSearch, FiTag, FiX } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import { useMandiPrice, getCropEmoji } from '@/context/MandiPriceContext';
import { cn } from '@/utils/cn';

const SORTS = [
  { value: 'modal-desc', label: 'Price: High → Low' },
  { value: 'modal-asc', label: 'Price: Low → High' },
  { value: 'change-desc', label: 'Top price trends' },
];

export default function FilterBar({ withMandi = true, withSort = true }) {
  const {
    search,
    setSearch,
    sort,
    setSort,
    selectedState,
    setSelectedState,
    selectedDistrict,
    setSelectedDistrict,
    selectedCrop,
    setSelectedCrop,
    statesList,
    availableDistricts,
    cropsList,
    loading,
    refreshPrices,
    resetFilters,
  } = useMandiPrice();

  const hasActiveFilters =
    selectedState !== 'All States' ||
    selectedDistrict !== 'All Districts' ||
    selectedCrop !== 'All Crops' ||
    search.trim().length > 0;

  return (
    <Card variant="soft" className="p-4 sm:p-5">
      {/* Top Search & Refresh */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <FiSearch
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-gray-400"
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search any crop, APMC mandi, or district (e.g. Wheat, Khanna, Nashik)…"
            aria-label="Search commodities"
            className="input-base pl-11"
          />
        </div>
        <button
          type="button"
          onClick={refreshPrices}
          disabled={loading}
          className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-soft transition hover:bg-gray-50 hover:text-primary-600 disabled:opacity-50"
          title="Refresh Live Mandi Rates"
        >
          <FiRefreshCw className={cn('text-base', loading && 'animate-spin text-primary-600')} />
        </button>
      </div>

      {/* 4-Column Selectors: State, District, Crop, Sort */}
      <div className="mt-3.5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. State Selector */}
        <label className="relative block">
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Select State
          </span>
          <div className="relative">
            <FiCompass
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary-600"
            />
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('All Districts');
              }}
              aria-label="Select State"
              className="input-base cursor-pointer appearance-none pl-9 font-semibold text-gray-800"
            >
              {statesList.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </label>

        {/* 2. District Selector */}
        <label className="relative block">
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Select District
          </span>
          <div className="relative">
            <FiMapPin
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sky-600"
            />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              aria-label="Select District"
              className="input-base cursor-pointer appearance-none pl-9 text-gray-800"
            >
              {availableDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </label>

        {/* 3. Crop Selector Dropdown */}
        <label className="relative block">
          <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Select Crop / Commodity
          </span>
          <div className="relative">
            <FiTag
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-amber-600 text-sm"
            />
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              aria-label="Select Crop"
              className="input-base cursor-pointer appearance-none pl-9 font-semibold text-gray-800"
            >
              {cropsList.map((c) => (
                <option key={c} value={c}>
                  {c === 'All Crops' ? '🌾 All Crops' : `${getCropEmoji(c)} ${c}`}
                </option>
              ))}
            </select>
          </div>
        </label>

        {/* 4. Sort Filter */}
        {withSort && (
          <label className="relative block">
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Sort By Rate
            </span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort prices"
              className="input-base cursor-pointer appearance-none text-gray-800"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-2.5">
          <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-400">
            <FiFilter className="text-xs" /> Filters:
          </span>
          {selectedState !== 'All States' && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-700">
              State: {selectedState}
              <button
                type="button"
                onClick={() => {
                  setSelectedState('All States');
                  setSelectedDistrict('All Districts');
                }}
                className="hover:text-primary-900"
                title="Clear state"
              >
                <FiX className="text-xs" />
              </button>
            </span>
          )}
          {selectedDistrict !== 'All Districts' && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-sky-50 px-2 py-0.5 text-xs font-semibold text-sky-700">
              District: {selectedDistrict}
              <button
                type="button"
                onClick={() => setSelectedDistrict('All Districts')}
                className="hover:text-sky-900"
                title="Clear district"
              >
                <FiX className="text-xs" />
              </button>
            </span>
          )}
          {selectedCrop !== 'All Crops' && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800">
              Crop: {selectedCrop}
              <button
                type="button"
                onClick={() => setSelectedCrop('All Crops')}
                className="hover:text-amber-950"
                title="Clear crop"
              >
                <FiX className="text-xs" />
              </button>
            </span>
          )}
          {search.trim().length > 0 && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
              Search: &ldquo;{search}&rdquo;
              <button
                type="button"
                onClick={() => setSearch('')}
                className="hover:text-gray-900"
                title="Clear search"
              >
                <FiX className="text-xs" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={resetFilters}
            className="ml-auto text-[11px] font-bold text-red-500 hover:text-red-700"
          >
            Reset All
          </button>
        </div>
      )}

      {/* Popular Crops Quick Filter Chips */}
      <div className="mt-3.5 border-t border-gray-100 pt-3">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Quick Crop Select</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100/70 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
            🏛️ Live Govt Agmarknet Data
          </span>
        </div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {cropsList.map((crop) => (
            <button
              key={crop}
              type="button"
              aria-pressed={selectedCrop === crop}
              onClick={() => setSelectedCrop(crop)}
              className={cn(
                'focus-ring shrink-0 rounded-xl border px-3 py-1.5 text-xs font-semibold transition',
                selectedCrop === crop
                  ? 'border-primary-600 bg-primary-600 text-white shadow-soft'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary-300 hover:text-primary-700'
              )}
            >
              {crop === 'All Crops' ? '🌾 All Crops' : `${getCropEmoji(crop)} ${crop}`}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}