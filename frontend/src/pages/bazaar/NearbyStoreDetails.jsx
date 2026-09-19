import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiClock,
  FiCompass,
  FiMapPin,
  FiNavigation,
  FiPhone,
  FiSearch,
  FiShield,
  FiStar,
  FiX,
} from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { RETAILER_STORES } from '@/data/mock/retailerStores';
import { RETAILER_PRODUCTS } from '@/data/mock/retailerProducts';
import { formatINR } from '@/utils/format';
import { cn } from '@/utils/cn';

export default function NearbyStoreDetails() {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const [searchInStore, setSearchInStore] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);

  const store = useMemo(() => {
    return RETAILER_STORES.find((s) => s.id === storeId) || RETAILER_STORES[0];
  }, [storeId]);

  const storeProducts = useMemo(() => {
    let list = RETAILER_PRODUCTS.filter((p) => p.storeId === store.id);
    if (searchInStore.trim()) {
      const q = searchInStore.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.productName.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.variety.toLowerCase().includes(q)
      );
    }
    return list;
  }, [store.id, searchInStore]);

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate('/dashboard/bazaar?mode=nearby')}
          className="focus-ring inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-soft transition hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200"
        >
          <FiArrowLeft /> Back to Nearby Stores
        </button>

        {/* Store Profile Card */}
        <Card variant="soft" className="p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-3xl shadow-soft dark:border-sky-800 dark:bg-sky-950">
                🏪
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
                    {store.name}
                  </h1>
                  <Badge variant="info" size="sm">
                    Demo Store
                  </Badge>
                </div>

                <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-sky-700 dark:text-sky-400">
                  <FiMapPin /> {store.area}, {store.city} · ~{store.distance} km away
                </p>

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {store.address}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-1 font-semibold text-gray-900 dark:text-white">
                    <FiStar className="text-amber-500" /> {store.rating} ({store.reviewCount} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <FiClock className="text-gray-400" /> {store.timing}
                  </span>
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {storeProducts.length} verified products listed
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Actions */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setShowContactModal(true)}
                className="focus-ring flex items-center gap-1.5 rounded-xl bg-sky-600 px-4 py-2.5 text-xs font-bold text-white shadow-soft transition hover:bg-sky-700"
              >
                <FiPhone /> Contact Store
              </button>
              <button
                type="button"
                onClick={() => setShowDirectionsModal(true)}
                className="focus-ring flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-700 shadow-soft transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <FiNavigation /> Get Directions
              </button>
            </div>
          </div>

          {/* Categories Offered */}
          <div className="mt-5 border-t border-gray-100 pt-4 dark:border-gray-800">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Categories Available in Store:
            </span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {store.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-lg bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-800 dark:bg-sky-950 dark:text-sky-300"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </Card>

        {/* In-Store Product Inventory */}
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                Products Available at {store.name}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sample retailer pricing and inventory status
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={searchInStore}
                onChange={(e) => setSearchInStore(e.target.value)}
                placeholder="Search within this store..."
                className="input-base pl-9 text-xs"
              />
            </div>
          </div>

          {storeProducts.length === 0 ? (
            <EmptyState
              title={`No items found matching "${searchInStore}"`}
              description="Try searching for another product name or brand."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {storeProducts.map((p) => (
                <Card key={p.id} variant="soft" className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-display text-base font-bold text-gray-900 dark:text-white">
                        {p.productName}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {p.brand} · {p.variety}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'rounded-md px-2 py-0.5 text-[10px] font-bold',
                        p.stockStatus === 'Available' && 'bg-emerald-50 text-emerald-700',
                        p.stockStatus === 'Limited Stock' && 'bg-amber-50 text-amber-700',
                        p.stockStatus === 'Out of Stock' && 'bg-red-50 text-red-700'
                      )}
                    >
                      {p.stockStatus}
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
                    <div>
                      <span className="font-display text-xl font-bold text-gray-900 dark:text-white">
                        {formatINR(p.price)}
                      </span>
                      <span className="ml-1 text-xs text-gray-400">/ {p.unit}</span>
                    </div>
                    <span className="text-[11px] text-gray-400">
                      {p.lastUpdated}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>Quantity in stock: {p.stockQuantity}</span>
                    <button
                      type="button"
                      onClick={() => setShowContactModal(true)}
                      className="font-bold text-sky-600 hover:text-sky-700"
                    >
                      Reserve / Inquire →
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Demo Contact Dialog */}
        {showContactModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  Contact Store
                </h4>
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX />
                </button>
              </div>
              <div className="mt-4 space-y-3 text-xs text-gray-600 dark:text-gray-300">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{store.name}</p>
                <p>📍 {store.address}</p>
                <p>🕐 Operating Hours: {store.timing}</p>
                <div className="rounded-xl border border-sky-100 bg-sky-50 p-3 text-sky-900 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-200">
                  <span className="font-bold">Demo Phone:</span> {store.phone}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  alert(`Calling ${store.name} at ${store.phone} (Demo Mode)`);
                  setShowContactModal(false);
                }}
                className="focus-ring mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-2.5 text-xs font-bold text-white hover:bg-sky-700"
              >
                <FiPhone /> Call Retailer (Demo)
              </button>
            </div>
          </div>
        )}

        {/* Demo Directions Dialog */}
        {showDirectionsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
              <div className="flex items-center justify-between">
                <h4 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  Store Directions
                </h4>
                <button
                  type="button"
                  onClick={() => setShowDirectionsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX />
                </button>
              </div>
              <div className="mt-4 space-y-2.5 text-xs text-gray-600 dark:text-gray-300">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{store.name}</p>
                <p>📍 {store.address}</p>
                <p className="font-medium text-emerald-600">Estimated distance: ~{store.distance} km</p>
                <div className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-[11px] text-gray-500 dark:border-gray-800 dark:bg-gray-800">
                  In the future production release, this will launch direct turn-by-turn navigation in Google Maps.
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  alert(`Navigating to ${store.name} (Demo Navigation)`);
                  setShowDirectionsModal(false);
                }}
                className="focus-ring mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-2.5 text-xs font-bold text-white hover:bg-sky-700"
              >
                <FiNavigation /> Start Navigation (Demo)
              </button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
