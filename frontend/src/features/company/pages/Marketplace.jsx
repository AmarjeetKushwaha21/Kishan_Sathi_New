import { useEffect, useState } from 'react';
import { FiSearch, FiBookmark, FiTrendingUp, FiShoppingBag, FiCheck } from 'react-icons/fi';
import cropService from '../services/cropService';
import PlaceBidModal from '../components/PlaceBidModal';

export default function Marketplace() {
  const [crops, setCrops] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [savedIds, setSavedIds] = useState(() => {
    try {
      const stored = localStorage.getItem('ks_saved_listings');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [selectedCropForBid, setSelectedCropForBid] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    cropService.getCrops().then(setCrops);
  }, []);

  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('ks_saved_listings', JSON.stringify(next));
      return next;
    });
  };

  const filtered = crops.filter((c) => {
    if (activeTab === 'saved') return savedIds.includes(c.id);
    if (search) {
      return (
        c.crop.toLowerCase().includes(search.toLowerCase()) ||
        c.farmer.toLowerCase().includes(search.toLowerCase()) ||
        c.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 dark:border-gray-800 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            B2B Commodity Marketplace
          </h1>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
            Contract farming lots, bulk grain lots, and spot procurement directly with farmer FPOs.
          </p>
        </div>

        {/* Tab switcher: All vs Saved */}
        <div className="flex gap-2 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
              activeTab === 'all'
                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            All Lots ({crops.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-xs font-semibold transition ${
              activeTab === 'saved'
                ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white'
                : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <FiBookmark className="text-xs" />
            <span>Saved Lots ({savedIds.length})</span>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <FiSearch className="absolute left-3.5 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Filter marketplace lots…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="focus-ring w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
        />
      </div>

      {/* Marketplace Lots */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((lot) => {
          const isSaved = savedIds.includes(lot.id);
          return (
            <div
              key={lot.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-soft transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={lot.image} alt={lot.crop} className="h-12 w-12 rounded-xl object-cover" />
                    <div>
                      <span className="rounded bg-primary-50 px-2 py-0.5 text-[10px] font-bold text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">
                        {lot.grade}
                      </span>
                      <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white">
                        {lot.crop}
                      </h3>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSave(lot.id)}
                    className={`rounded-lg p-2 transition ${
                      isSaved
                        ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    title={isSaved ? 'Saved to Watchlist' : 'Save Lot'}
                  >
                    <FiBookmark className={isSaved ? 'fill-current' : ''} />
                  </button>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                  <p>
                    <span className="text-gray-400">Seller / Farmer:</span>{' '}
                    <strong className="text-gray-800 dark:text-gray-200">{lot.farmer}</strong>
                  </p>
                  <p>
                    <span className="text-gray-400">Mandi Location:</span> {lot.location}
                  </p>
                  <p>
                    <span className="text-gray-400">Available Volume:</span>{' '}
                    <strong>{lot.quantity} {lot.unit}</strong>
                  </p>
                  <p>
                    <span className="text-gray-400">Moisture Index:</span> {lot.moisture}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-gray-100 pt-4 dark:border-gray-800">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-gray-400">Base Price:</span>
                  <span className="font-display text-base font-extrabold text-primary-700 dark:text-primary-400">
                    ₹{lot.expectedPrice} / Q
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCropForBid(lot)}
                  className="focus-ring mt-3 w-full rounded-xl bg-primary-600 py-2 text-xs font-semibold text-white shadow-soft transition hover:bg-primary-700 active:bg-primary-800"
                >
                  Place Procurement Bid
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center text-sm text-gray-500 dark:border-gray-800">
          {activeTab === 'saved' ? 'No saved crop lots yet.' : 'No crop lots match your search.'}
        </div>
      )}

      {selectedCropForBid && (
        <PlaceBidModal
          crop={selectedCropForBid}
          onClose={() => setSelectedCropForBid(null)}
        />
      )}
    </div>
  );
}
