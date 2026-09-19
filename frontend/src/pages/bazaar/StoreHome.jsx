import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiChevronDown, FiCompass, FiFilter, FiHome, FiMapPin, FiSearch, FiShoppingBag, FiShoppingCart, FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

import PageTransition from '@/components/ui/PageTransition';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/store/ProductCard';
import CategoryChips from '@/components/store/CategoryChips';
import FilterPanel from '@/components/store/FilterPanel';
import StoreHeader from '@/components/store/StoreHeader';
import StoreChoiceLanding from '@/components/store/StoreChoiceLanding';
import NearbyStoresView from '@/components/store/NearbyStoresView';
import { useStore } from '@/context/StoreContext';
import { cn } from '@/utils/cn';

export default function StoreHome() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') || 'landing'; // 'landing' | 'online' | 'nearby'
  const [activeMode, setActiveMode] = useState(initialMode);

  // Sync mode with URL query parameter
  const switchMode = (mode) => {
    setActiveMode(mode);
    setSearchParams(mode === 'landing' ? {} : { mode });
  };

  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (modeParam && ['landing', 'online', 'nearby'].includes(modeParam)) {
      setActiveMode(modeParam);
    }
  }, [searchParams]);

  const { filters, setFilters, filteredProducts, sortOptions, activeFilterCount, categories } = useStore();
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const activeCategory = (categories || []).find((c) => c.key === filters?.category);

  useEffect(() => {
    if (!filterOpen) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') setFilterOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    const timer = setTimeout(() => filterRef.current?.focus(), 50);
    return () => {
      document.removeEventListener('keydown', handleKey);
      clearTimeout(timer);
    };
  }, [filterOpen]);

  return (
    <PageTransition>
      <StoreHeader title="Agriculture Store" />

      {/* Top Mode Navigation Switcher */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3 dark:border-gray-800">
        <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-soft dark:border-gray-700 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => switchMode('landing')}
            className={cn(
              'focus-ring flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition',
              activeMode === 'landing'
                ? 'bg-gray-900 text-white shadow-soft dark:bg-white dark:text-gray-900'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
            )}
          >
            <FiHome className="text-sm" />
            <span>Overview</span>
          </button>
          <button
            type="button"
            onClick={() => switchMode('online')}
            className={cn(
              'focus-ring flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition',
              activeMode === 'online'
                ? 'bg-primary-600 text-white shadow-soft'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
            )}
          >
            <FiShoppingCart className="text-sm" />
            <span>🛒 Online Store</span>
          </button>
          <button
            type="button"
            onClick={() => switchMode('nearby')}
            className={cn(
              'focus-ring flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition',
              activeMode === 'nearby'
                ? 'bg-sky-600 text-white shadow-soft'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
            )}
          >
            <FiMapPin className="text-sm" />
            <span>📍 Nearby Stores (Ghaziabad & Hapur)</span>
          </button>
        </div>

        {activeMode !== 'landing' && (
          <button
            type="button"
            onClick={() => switchMode('landing')}
            className="text-xs font-semibold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ← Change Mode
          </button>
        )}
      </div>

      {/* 1. LANDING MODE: Initial 2-Choice Screen */}
      {activeMode === 'landing' && (
        <StoreChoiceLanding onSelectMode={switchMode} />
      )}

      {/* 2. NEARBY STORES MODE */}
      {activeMode === 'nearby' && (
        <NearbyStoresView />
      )}

      {/* 3. ONLINE STORE MODE */}
      {activeMode === 'online' && (
        <>
          <section className="relative mb-6 overflow-hidden rounded-3xl border border-primary-100 bg-primary-50 p-6 text-gray-900 shadow-soft dark:border-primary-900/50 dark:bg-primary-950/40 dark:text-white sm:p-7">
            <p className="text-xs font-bold uppercase tracking-wider text-primary-700 dark:text-primary-400">
              Kishan Sathi Online Store
            </p>
            <h2 className="mt-1 font-display text-xl font-bold sm:text-2xl">
              Buy Certified Seeds, Fertilizers, Equipment & Tools Online
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              High quality inputs with transparent pricing. Free delivery on orders above ₹999.
            </p>
          </section>

          <CategoryChips />

          <div className="mt-4 grid gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="hidden lg:block">
              <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900">
                <FilterPanel />
              </div>
            </aside>

            <div className="min-w-0">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="relative flex-1">
                  <span className="sr-only">Search products</span>
                  <FiSearch
                    aria-hidden="true"
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400"
                  />
                  <input
                    type="search"
                    value={filters.search}
                    onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                    placeholder="Search seeds, fertilizers, tools, equipment (e.g. mustard, urea, sprayer)…"
                    className="input-base pl-11"
                  />
                </label>

                <div className="flex gap-2">
                  <label className="relative flex-1 sm:flex-none">
                    <span className="sr-only">Sort products</span>
                    <select
                      value={filters.sort}
                      onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
                      className="input-base appearance-none pr-10 sm:w-48"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown
                      aria-hidden="true"
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => setFilterOpen(true)}
                    className="focus-ring flex items-center justify-center gap-1.5 rounded-xl border border-primary-300 bg-white px-4 py-3 text-sm font-semibold text-primary-700 transition hover:bg-primary-50 lg:hidden dark:border-primary-800 dark:bg-gray-900 dark:text-primary-300"
                  >
                    <FiFilter aria-hidden="true" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] text-white">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-500" role="status">
                Showing{' '}
                <span className="font-semibold text-gray-900 dark:text-white">{filteredProducts.length}</span> products
                {activeCategory ? ` in ${activeCategory.label}` : filters.search ? ' matching your search' : ''}
              </p>

              {filteredProducts.length > 0 ? (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} compact />
                  ))}
                </div>
              ) : (
                <div className="mt-6">
                  <EmptyState
                    icon={FiSearch}
                    title="No products found"
                    description="Try another product or category, or adjust your price and rating filters."
                  />
                </div>
              )}
            </div>
          </div>

          <AnimatePresence>
            {filterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setFilterOpen(false)}
                  aria-hidden="true"
                  className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                />
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'tween', duration: 0.25 }}
                  className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 pb-24 outline-none lg:hidden dark:bg-gray-900"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Product filters"
                  ref={filterRef}
                  tabIndex={-1}
                >
                  <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-200" aria-hidden="true" />
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Filter products</h3>
                    <button
                      type="button"
                      onClick={() => setFilterOpen(false)}
                      aria-label="Close filters"
                      className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <FiX aria-hidden="true" className="text-lg" />
                    </button>
                  </div>
                  <FilterPanel />
                  <div className="fixed inset-x-0 bottom-0 border-t border-gray-100 bg-white p-4 lg:hidden dark:border-gray-800 dark:bg-gray-900">
                    <Button fullWidth onClick={() => setFilterOpen(false)} className={cn(activeFilterCount === 0 && 'bg-primary-600 hover:bg-primary-700')}>
                      Show {filteredProducts.length} products
                    </Button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </PageTransition>
  );
}