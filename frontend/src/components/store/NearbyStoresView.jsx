import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiAlertCircle,
  FiBell,
  FiCheck,
  FiClock,
  FiCompass,
  FiExternalLink,
  FiEye,
  FiFilter,
  FiInfo,
  FiMap,
  FiMapPin,
  FiNavigation,
  FiPhone,
  FiSearch,
  FiSliders,
  FiStar,
  FiX,
} from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { RETAILER_STORES, CITY_AREAS } from '@/data/mock/retailerStores';
import { RETAILER_PRODUCTS } from '@/data/mock/retailerProducts';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

const COMPARISON_COMMODITIES = [
  'All Products',
  'Mustard Seed',
  'Wheat Seed',
  'Urea',
  'DAP (Di-Ammonium Phosphate)',
  'NPK 10-26-26',
  'Knapsack Sprayer 16L',
  'Neem Based Bio Pesticide',
  'Agricultural Khurpa',
  'Paddy Seed (Basmati 1121)',
  'Tomato Seeds (Hybrid)',
];

export default function NearbyStoresView() {
  const navigate = useNavigate();

  // Primary filters
  const [selectedCity, setSelectedCity] = useState('Ghaziabad');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('compare'); // 'compare' | 'stores' | 'find' | 'map'
  const [selectedCommodity, setSelectedCommodity] = useState('Mustard Seed');

  // Multi-shop Comparison Selection (stores to compare)
  const [selectedStoreIds, setSelectedStoreIds] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Demo Modals
  const [contactModalStore, setContactModalStore] = useState(null);
  const [directionsModalStore, setDirectionsModalStore] = useState(null);
  const [notifyModalItem, setNotifyModalItem] = useState(null);
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [notifyContact, setNotifyContact] = useState('');

  // Areas for current city
  const areasList = useMemo(() => {
    return CITY_AREAS[selectedCity] || ['All Areas'];
  }, [selectedCity]);

  // Stores in current city + area
  const filteredStores = useMemo(() => {
    let list = RETAILER_STORES.filter((s) => s.city.toLowerCase() === selectedCity.toLowerCase());
    if (selectedArea !== 'All Areas') {
      list = list.filter((s) => s.area.toLowerCase() === selectedArea.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.area.toLowerCase().includes(q) ||
          s.categories.some((cat) => cat.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selectedCity, selectedArea, searchQuery]);

  // Product listings in current city + area
  const filteredProducts = useMemo(() => {
    let list = RETAILER_PRODUCTS.filter((p) => p.city.toLowerCase() === selectedCity.toLowerCase());
    if (selectedArea !== 'All Areas') {
      list = list.filter((p) => p.area.toLowerCase() === selectedArea.toLowerCase());
    }
    if (selectedCommodity !== 'All Products') {
      list = list.filter((p) => p.productName.toLowerCase().includes(selectedCommodity.toLowerCase()));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.productName.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.variety.toLowerCase().includes(q) ||
          p.storeName.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedCity, selectedArea, selectedCommodity, searchQuery]);

  // Toggle store in comparison selection (max 4)
  const toggleStoreSelection = (storeId) => {
    setSelectedStoreIds((prev) => {
      if (prev.includes(storeId)) {
        return prev.filter((id) => id !== storeId);
      }
      if (prev.length >= 4) {
        alert('You can select a maximum of 4 stores to compare.');
        return prev;
      }
      return [...prev, storeId];
    });
  };

  // Products for the comparison table (using selectedCommodity)
  const comparisonItems = useMemo(() => {
    const list = RETAILER_PRODUCTS.filter(
      (p) =>
        p.city.toLowerCase() === selectedCity.toLowerCase() &&
        p.productName.toLowerCase().includes(selectedCommodity.toLowerCase()) &&
        (selectedStoreIds.length === 0 || selectedStoreIds.includes(p.storeId))
    );

    return list.sort((a, b) => a.price - b.price);
  }, [selectedCity, selectedCommodity, selectedStoreIds]);

  // Calculations for Lowest Price & Nearest Store
  const lowestPrice = useMemo(() => {
    const available = comparisonItems.filter((i) => i.stockStatus !== 'Out of Stock');
    if (available.length === 0) return null;
    return Math.min(...available.map((i) => i.price));
  }, [comparisonItems]);

  const nearestDistance = useMemo(() => {
    if (comparisonItems.length === 0) return null;
    return Math.min(...comparisonItems.map((i) => i.distance));
  }, [comparisonItems]);

  return (
    <div className="space-y-6">
      {/* Demo Network Disclaimer Banner */}
      <div className="rounded-xl border border-sky-200 bg-sky-50/80 p-3.5 text-xs text-sky-800 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-300">
        <div className="flex items-start gap-2.5">
          <FiInfo className="mt-0.5 shrink-0 text-base text-sky-600 dark:text-sky-400" />
          <div>
            <span className="font-bold">Demo Retailer Network:</span> Store and product information shown here is sample data for demonstration in Ghaziabad and Hapur. Real retailer listings and live prices will be connected in a future release.
          </div>
        </div>
      </div>

      {/* Top Filter Bar: City Selector, Area Filter & Search */}
      <Card variant="soft" className="p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
          {/* City Selector */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Select Your City
            </label>
            <div className="mt-1 flex rounded-xl border border-gray-200 bg-white p-1 shadow-inner dark:border-gray-700 dark:bg-gray-800">
              <button
                type="button"
                onClick={() => {
                  setSelectedCity('Ghaziabad');
                  setSelectedArea('All Areas');
                  setSelectedStoreIds([]);
                }}
                className={cn(
                  'flex-1 rounded-lg py-1.5 text-xs font-bold transition',
                  selectedCity === 'Ghaziabad'
                    ? 'bg-sky-600 text-white shadow-soft'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                )}
              >
                📍 Ghaziabad
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedCity('Hapur');
                  setSelectedArea('All Areas');
                  setSelectedStoreIds([]);
                }}
                className={cn(
                  'flex-1 rounded-lg py-1.5 text-xs font-bold transition',
                  selectedCity === 'Hapur'
                    ? 'bg-sky-600 text-white shadow-soft'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                )}
              >
                📍 Hapur
              </button>
            </div>
          </div>

          {/* Area Filter */}
          <div className="lg:col-span-3">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Select Area in {selectedCity}
            </label>
            <div className="relative mt-1">
              <FiMapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sky-600" />
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                aria-label="Select Area"
                className="input-base cursor-pointer appearance-none pl-9 font-semibold text-gray-800 dark:text-gray-100"
              >
                {areasList.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Across Local Products & Stores */}
          <div className="lg:col-span-6">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Search Product or Local Shop
            </label>
            <div className="relative mt-1">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Mustard Seed, Urea, DAP, Khurpa, Sprayer, Beej Bhandar..."
                className="input-base pl-9 text-gray-800 dark:text-gray-100"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* View Sub-Tabs */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3 dark:border-gray-800">
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('compare')}
              className={cn(
                'focus-ring flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                activeTab === 'compare'
                  ? 'bg-sky-600 text-white shadow-soft'
                  : 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
              )}
            >
              <FiSliders />
              <span>Compare Prices ({filteredProducts.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('stores')}
              className={cn(
                'focus-ring flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                activeTab === 'stores'
                  ? 'bg-sky-600 text-white shadow-soft'
                  : 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
              )}
            >
              <FiCompass />
              <span>Available Shops ({filteredStores.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('map')}
              className={cn(
                'focus-ring flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition',
                activeTab === 'map'
                  ? 'bg-sky-600 text-white shadow-soft'
                  : 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300'
              )}
            >
              <FiMap />
              <span>Virtual Map</span>
            </button>
          </div>

          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Showing results for <strong className="text-gray-800 dark:text-gray-100">{selectedArea}</strong>, {selectedCity}
          </p>
        </div>
      </Card>

      {/* ================= VIEW 1: PRICE COMPARISON ================= */}
      {activeTab === 'compare' && (
        <div className="space-y-4">
          {/* Commodity Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Compare Product:
            </span>
            {COMPARISON_COMMODITIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setSelectedCommodity(c);
                  setSelectedStoreIds([]);
                }}
                className={cn(
                  'focus-ring shrink-0 rounded-xl border px-3 py-1.5 font-semibold transition',
                  selectedCommodity === c
                    ? 'border-sky-600 bg-sky-600 text-white shadow-soft'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-sky-300 hover:text-sky-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Results Summary Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs text-gray-600 dark:text-gray-300">
              <strong>{filteredProducts.length} local offers</strong> found for{' '}
              <span className="font-semibold text-sky-700 dark:text-sky-400">
                {selectedCommodity !== 'All Products' ? selectedCommodity : 'all products'}
              </span>{' '}
              in {selectedCity}. Check boxes to compare shops side-by-side.
            </p>
            {selectedStoreIds.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedStoreIds([])}
                className="text-xs font-semibold text-red-500 hover:text-red-700"
              >
                Clear comparison selection ({selectedStoreIds.length})
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <EmptyState
              title={`No local listings found for "${searchQuery || selectedCommodity}"`}
              description={`Try switching between Ghaziabad and Hapur, or search for staple seeds like "Mustard Seed", "Wheat Seed", "Urea", or "DAP".`}
            />
          ) : (
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((item) => {
                const isSelected = selectedStoreIds.includes(item.storeId);
                const isLowest = lowestPrice !== null && item.price === lowestPrice && item.stockStatus !== 'Out of Stock';
                const isNearest = nearestDistance !== null && item.distance === nearestDistance;

                return (
                  <Card
                    key={item.id}
                    variant="soft"
                    className={cn(
                      'relative flex flex-col justify-between p-4 transition-all duration-150',
                      isSelected ? 'border-2 border-sky-500 bg-sky-50/20 dark:bg-sky-950/20' : 'hover:border-gray-300'
                    )}
                  >
                    <div>
                      {/* Top Checkbox & Factual Tag */}
                      <div className="flex items-start justify-between gap-2">
                        <label className="flex cursor-pointer items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            disabled={item.stockStatus === 'Out of Stock'}
                            onChange={() => toggleStoreSelection(item.storeId)}
                            className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500 disabled:opacity-50"
                          />
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-200">
                            {isSelected ? 'Selected' : 'Compare'}
                          </span>
                        </label>

                        <div className="flex flex-wrap items-center gap-1">
                          {isLowest && (
                            <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              Lowest Listed Price
                            </span>
                          )}
                          {isNearest && (
                            <span className="rounded-md bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                              Nearest Store
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Product Name & Brand */}
                      <h4 className="mt-3 font-display text-base font-bold text-gray-900 dark:text-white">
                        {item.productName}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.brand} · {item.variety}
                      </p>

                      {/* Store Name & Location */}
                      <div className="mt-2.5 rounded-lg border border-gray-100 bg-white/60 p-2 text-xs dark:border-gray-800 dark:bg-gray-800/60">
                        <div className="flex items-center justify-between font-semibold text-gray-800 dark:text-gray-100">
                          <span className="truncate">{item.storeName}</span>
                          <span className="shrink-0 text-gray-400">{item.distance} km</span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          📍 {item.area}, {item.city}
                        </p>
                      </div>

                      {/* Price Display */}
                      <div className="mt-3 flex items-baseline justify-between">
                        <div>
                          <span className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                            {formatINR(item.price)}
                          </span>
                          <span className="ml-1 text-xs text-gray-500">/ {item.unit}</span>
                        </div>
                        <span
                          className={cn(
                            'text-xs font-semibold',
                            item.stockStatus === 'Available' && 'text-emerald-600',
                            item.stockStatus === 'Limited Stock' && 'text-amber-600',
                            item.stockStatus === 'Out of Stock' && 'text-red-500'
                          )}
                        >
                          {item.stockStatus === 'Available' && '✓ Available'}
                          {item.stockStatus === 'Limited Stock' && '⚠ Limited Stock'}
                          {item.stockStatus === 'Out of Stock' && '✕ Out of Stock'}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                      <button
                        type="button"
                        onClick={() => navigate(`/dashboard/bazaar/nearby/${item.storeId}`)}
                        className="focus-ring flex flex-1 items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white py-1.5 text-xs font-semibold text-gray-700 shadow-soft transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                      >
                        <FiEye className="text-xs" /> View Store
                      </button>

                      {item.stockStatus === 'Out of Stock' ? (
                        <button
                          type="button"
                          onClick={() => {
                            setNotifyModalItem(item);
                            setNotifySuccess(false);
                          }}
                          className="focus-ring flex items-center justify-center gap-1 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600"
                        >
                          <FiBell /> Notify Me
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            const store = RETAILER_STORES.find((s) => s.id === item.storeId);
                            setContactModalStore(store);
                          }}
                          className="focus-ring flex items-center justify-center gap-1 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-sky-700"
                          title="Contact Store"
                        >
                          <FiPhone /> Contact
                        </button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ================= VIEW 2: AVAILABLE STORES DIRECTORY ================= */}
      {activeTab === 'stores' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStores.map((store) => (
              <Card
                key={store.id}
                variant="soft"
                className="flex flex-col justify-between p-4 transition-all duration-150 hover:border-sky-300"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display text-base font-bold text-gray-900 dark:text-white">
                        {store.name}
                      </h4>
                      <p className="text-xs font-semibold text-sky-700 dark:text-sky-400">
                        📍 {store.area}, {store.city}
                      </p>
                    </div>
                    <Badge variant="info" size="sm">
                      {store.badge}
                    </Badge>
                  </div>

                  <p className="mt-2 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                    {store.address}
                  </p>

                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-300">
                    <span className="flex items-center gap-1 font-semibold">
                      <FiStar className="text-amber-500" /> {store.rating} ({store.reviewCount})
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="text-gray-400" /> {store.timing}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-500">Distance: ~{store.distance} km</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400">
                      {store.productsCount} products listed
                    </span>
                  </div>

                  {/* Categories */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {store.categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={() => navigate(`/dashboard/bazaar/nearby/${store.id}`)}
                    className="focus-ring flex flex-1 items-center justify-center gap-1 rounded-lg bg-sky-600 py-2 text-xs font-semibold text-white transition hover:bg-sky-700"
                  >
                    <FiEye /> View Store & Products
                  </button>
                  <button
                    type="button"
                    onClick={() => setDirectionsModalStore(store)}
                    className="focus-ring flex items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    title="Directions"
                  >
                    <FiNavigation />
                  </button>
                  <button
                    type="button"
                    onClick={() => setContactModalStore(store)}
                    className="focus-ring flex items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    title="Contact Store"
                  >
                    <FiPhone />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* ================= VIEW 3: VIRTUAL MAP UI ================= */}
      {activeTab === 'map' && (
        <Card variant="soft" className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-bold text-gray-900 dark:text-white">
                Virtual Map View — {selectedCity} Retailers
              </h3>
              <p className="text-xs text-gray-500">
                Interactive schematic map of agriculture shops. Ready for Google Maps integration.
              </p>
            </div>
            <Badge variant="outline">
              <FiMap className="mr-1" /> {filteredStores.length} Retailers on Map
            </Badge>
          </div>

          {/* Virtual Map Canvas */}
          <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-gray-200 bg-slate-900 p-4 shadow-inner">
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

            {/* City landmark banner */}
            <div className="absolute left-4 top-4 rounded-lg border border-slate-700 bg-slate-800/90 px-3 py-1.5 text-xs font-bold text-slate-300 backdrop-blur">
              📍 {selectedCity} District Agri Hub
            </div>

            {/* Markers */}
            {filteredStores.map((store) => (
              <div
                key={store.id}
                style={{
                  left: `${store.mapCoords?.x || 50}%`,
                  top: `${store.mapCoords?.y || 50}%`,
                }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <span className="absolute h-6 w-6 animate-ping rounded-full bg-sky-400/40" />
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-sky-600 text-sm text-white shadow-lg transition group-hover:scale-110">
                    🏪
                  </span>
                </div>

                {/* Hover/Click Popup Card */}
                <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-48 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="rounded-xl border border-slate-700 bg-slate-900 p-2.5 text-xs text-white shadow-2xl">
                    <p className="font-bold text-sky-400">{store.name}</p>
                    <p className="text-[10px] text-slate-300">{store.area} · ~{store.distance} km</p>
                    <p className="mt-1 text-[10px] text-emerald-400">{store.productsCount} products available</p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/bazaar/nearby/${store.id}`);
                      }}
                      className="mt-2 block w-full rounded bg-sky-600 py-1 text-center text-[10px] font-bold hover:bg-sky-500"
                    >
                      View Store
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ================= STICKY BOTTOM COMPARISON BAR ================= */}
      {selectedStoreIds.length > 0 && (
        <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-2xl border border-sky-300 bg-slate-900/95 px-5 py-3 text-white shadow-2xl backdrop-blur-md">
          <div>
            <p className="text-xs font-bold text-sky-300">
              {selectedStoreIds.length} {selectedStoreIds.length === 1 ? 'store' : 'stores'} selected for comparison
            </p>
            <p className="text-[10px] text-slate-400">
              Product: <span className="text-white font-semibold">{selectedCommodity}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (selectedStoreIds.length < 2) {
                  alert('Please select at least 2 stores to view side-by-side comparison.');
                  return;
                }
                setIsCompareModalOpen(true);
              }}
              className="focus-ring rounded-xl bg-sky-500 px-4 py-2 text-xs font-bold text-white shadow-soft hover:bg-sky-400"
            >
              Compare Selected Prices
            </button>
            <button
              type="button"
              onClick={() => setSelectedStoreIds([])}
              className="rounded-xl border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ================= SIDE-BY-SIDE COMPARISON MODAL / TABLE ================= */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/70 px-6 py-4 dark:border-gray-800 dark:bg-gray-800/70">
              <div>
                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  Multi-Store Price Comparison: {selectedCommodity}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Factual side-by-side comparison across selected retailers in {selectedCity}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto p-6">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:border-gray-700">
                    <th className="pb-3 pr-4">Store Name</th>
                    <th className="pb-3 pr-4">Area & Distance</th>
                    <th className="pb-3 pr-4">Brand / Variety</th>
                    <th className="pb-3 pr-4 text-right">Listed Price</th>
                    <th className="pb-3 pr-4 text-center">Availability</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {comparisonItems
                    .filter((item) => selectedStoreIds.includes(item.storeId))
                    .map((item) => {
                      const isLowest = lowestPrice !== null && item.price === lowestPrice;
                      const isNearest = nearestDistance !== null && item.distance === nearestDistance;

                      return (
                        <tr key={item.id} className="hover:bg-sky-50/20 dark:hover:bg-sky-950/20">
                          <td className="py-4 pr-4">
                            <p className="font-bold text-gray-900 dark:text-white">{item.storeName}</p>
                            <span className="text-xs text-gray-400">{item.lastUpdated}</span>
                          </td>
                          <td className="py-4 pr-4 text-xs">
                            <p className="font-semibold text-gray-700 dark:text-gray-300">📍 {item.area}</p>
                            <span className="text-gray-400">{item.distance} km from center</span>
                          </td>
                          <td className="py-4 pr-4 text-xs text-gray-600 dark:text-gray-300">
                            {item.brand} ({item.variety})
                          </td>
                          <td className="py-4 pr-4 text-right">
                            <div className="flex flex-col items-end">
                              <span className="font-display text-lg font-bold text-gray-900 dark:text-white">
                                {formatINR(item.price)}
                              </span>
                              <span className="text-[10px] text-gray-400">per {item.unit}</span>
                              {isLowest && (
                                <span className="mt-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">
                                  Lowest Listed Price
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 pr-4 text-center text-xs">
                            <span
                              className={cn(
                                'inline-block rounded-md px-2 py-0.5 font-bold',
                                item.stockStatus === 'Available' && 'bg-emerald-50 text-emerald-700',
                                item.stockStatus === 'Limited Stock' && 'bg-amber-50 text-amber-700',
                                item.stockStatus === 'Out of Stock' && 'bg-red-50 text-red-700'
                              )}
                            >
                              {item.stockStatus}
                            </span>
                            {isNearest && (
                              <p className="mt-1 text-[10px] font-semibold text-sky-600">Nearest Store</p>
                            )}
                          </td>
                          <td className="py-4 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                setIsCompareModalOpen(false);
                                navigate(`/dashboard/bazaar/nearby/${item.storeId}`);
                              }}
                              className="focus-ring rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-700"
                            >
                              View Store
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

              <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-3 text-[11px] text-gray-500 dark:border-gray-800 dark:bg-gray-800/50">
                <strong>Disclaimer:</strong> Prices shown are sample demo retailer updates. We do not endorse or rank any particular store as &ldquo;best store&rdquo;. Information provided is for farmer comparison and awareness.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= DEMO CONTACT MODAL ================= */}
      {contactModalStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                Contact Store
              </h4>
              <button
                type="button"
                onClick={() => setContactModalStore(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs text-gray-600 dark:text-gray-300">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {contactModalStore.name}
              </p>
              <p>📍 {contactModalStore.address}</p>
              <p>🕐 Operating Hours: {contactModalStore.timing}</p>
              <div className="rounded-xl border border-sky-100 bg-sky-50 p-3 text-sky-900 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200">
                <span className="font-bold">Demo Phone:</span> {contactModalStore.phone}
                <p className="mt-1 text-[11px] text-sky-700 dark:text-sky-400">
                  (Simulated contact dialog for demonstration)
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                alert(`Calling ${contactModalStore.name} at ${contactModalStore.phone} (Demo Mode)`);
                setContactModalStore(null);
              }}
              className="focus-ring mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-2.5 text-xs font-bold text-white hover:bg-sky-700"
            >
              <FiPhone /> Call Retailer (Demo)
            </button>
          </div>
        </div>
      )}

      {/* ================= DEMO DIRECTIONS MODAL ================= */}
      {directionsModalStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                Get Store Directions
              </h4>
              <button
                type="button"
                onClick={() => setDirectionsModalStore(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            </div>
            <div className="mt-4 space-y-2.5 text-xs text-gray-600 dark:text-gray-300">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                {directionsModalStore.name}
              </p>
              <p>📍 {directionsModalStore.address}</p>
              <p className="font-medium text-emerald-600">Estimated distance: ~{directionsModalStore.distance} km</p>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-[11px] text-gray-500 dark:border-gray-800 dark:bg-gray-800">
                Route simulation ready. In the future production release, this will open Google Maps navigation directly to the store coordinates.
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                alert(`Navigating to ${directionsModalStore.name} via ${directionsModalStore.area} (Demo Navigation)`);
                setDirectionsModalStore(null);
              }}
              className="focus-ring mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-2.5 text-xs font-bold text-white hover:bg-sky-700"
            >
              <FiNavigation /> Start Navigation (Demo)
            </button>
          </div>
        </div>
      )}

      {/* ================= DEMO NOTIFY ME MODAL ================= */}
      {notifyModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                Notify When Available
              </h4>
              <button
                type="button"
                onClick={() => setNotifyModalItem(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX />
              </button>
            </div>

            {notifySuccess ? (
              <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-center text-xs text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">
                <p className="text-base font-bold">✓ Availability alert saved!</p>
                <p className="mt-1 text-gray-600 dark:text-gray-400">
                  You will be notified via SMS as soon as {notifyModalItem.productName} is back in stock at {notifyModalItem.storeName}.
                </p>
                <button
                  type="button"
                  onClick={() => setNotifyModalItem(null)}
                  className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-700"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!notifyContact) return;
                  setNotifySuccess(true);
                }}
                className="mt-4 space-y-3 text-xs"
              >
                <p className="text-gray-600 dark:text-gray-300">
                  Enter your mobile number or email to receive a notification when{' '}
                  <strong className="text-gray-900 dark:text-white">{notifyModalItem.productName}</strong> is restocked.
                </p>
                <div>
                  <label className="block font-semibold text-gray-700 dark:text-gray-300">
                    Mobile Number / Email
                  </label>
                  <input
                    type="text"
                    required
                    value={notifyContact}
                    onChange={(e) => setNotifyContact(e.target.value)}
                    placeholder="+91 98765 43210 or farmer@example.com"
                    className="input-base mt-1"
                  />
                </div>
                <button
                  type="submit"
                  className="focus-ring mt-4 flex w-full items-center justify-center gap-1 rounded-xl bg-amber-500 py-2.5 text-xs font-bold text-white hover:bg-amber-600"
                >
                  <FiBell /> Save Stock Alert
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
