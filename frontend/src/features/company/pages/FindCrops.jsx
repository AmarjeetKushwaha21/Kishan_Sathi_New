import { useEffect, useState } from 'react';
import { FiSearch, FiFilter, FiMapPin, FiCalendar, FiCheck } from 'react-icons/fi';
import cropService from '../services/cropService';
import PlaceBidModal from '../components/PlaceBidModal';

export default function FindCrops() {
  const [crops, setCrops] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCropType, setSelectedCropType] = useState('All');
  const [sortBy, setSortBy] = useState('date_desc');
  const [selectedCropForBid, setSelectedCropForBid] = useState(null);
  const [detailModalCrop, setDetailModalCrop] = useState(null);

  const fetchCrops = () => {
    cropService
      .getCrops({
        search,
        state: selectedState,
        cropType: selectedCropType,
        sortBy,
      })
      .then(setCrops);
  };

  useEffect(() => {
    fetchCrops();
  }, [search, selectedState, selectedCropType, sortBy]);

  const states = ['All', 'Punjab', 'Haryana', 'Gujarat', 'Madhya Pradesh', 'Rajasthan', 'Karnataka', 'Maharashtra', 'Uttar Pradesh'];
  const cropTypes = ['All', 'Wheat', 'Rice', 'Cotton', 'Soybean', 'Mustard', 'Maize', 'Onion', 'Potato'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
          Find Crops & Direct Procurement
        </h1>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
          Discover verified harvest listings directly from farmers across Indian agricultural clusters.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search Input */}
          <div className="relative">
            <FiSearch className="absolute left-3.5 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by crop, farmer, or city…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="focus-ring w-full rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            />
          </div>

          {/* State Filter */}
          <div>
            <select
              aria-label="Filter by state"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            >
              {states.map((st) => (
                <option key={st} value={st}>
                  {st === 'All' ? 'All States' : st}
                </option>
              ))}
            </select>
          </div>

          {/* Crop Type Filter */}
          <div>
            <select
              aria-label="Filter by crop type"
              value={selectedCropType}
              onChange={(e) => setSelectedCropType(e.target.value)}
              className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            >
              {cropTypes.map((ct) => (
                <option key={ct} value={ct}>
                  {ct === 'All' ? 'All Crop Categories' : ct}
                </option>
              ))}
            </select>
          </div>

          {/* Sorting */}
          <div>
            <select
              aria-label="Sort listings"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="focus-ring w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
            >
              <option value="date_desc">Sort by: Newest Listings</option>
              <option value="price_asc">Sort by: Price (Low to High)</option>
              <option value="price_desc">Sort by: Price (High to Low)</option>
              <option value="quantity_desc">Sort by: Highest Quantity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Crop Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {crops.map((crop) => (
          <div
            key={crop.id}
            className="flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <div>
              <div className="relative h-44 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={crop.image}
                  alt={crop.crop}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-primary-700 shadow-sm backdrop-blur-sm dark:bg-gray-900/95 dark:text-primary-300">
                  {crop.grade}
                </span>
                <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                  Moisture: {crop.moisture}
                </span>
              </div>

              <div className="p-4">
                <h3 className="font-display text-base font-bold text-gray-900 dark:text-white">
                  {crop.crop}
                </h3>

                <div className="mt-2 space-y-1 text-xs text-gray-600 dark:text-gray-300">
                  <p className="flex items-center gap-1.5">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Farmer:</span>
                    <span>{crop.farmer}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <FiMapPin className="text-primary-600 dark:text-primary-400" />
                    <span>{crop.location}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <FiCalendar className="text-primary-600 dark:text-primary-400" />
                    <span>Availability: {crop.availableDate}</span>
                  </p>
                </div>

                <div className="mt-4 flex items-baseline justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                      Total Volume
                    </span>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {crop.quantity} {crop.unit}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                      Expected Price
                    </span>
                    <p className="font-display text-base font-extrabold text-primary-700 dark:text-primary-400">
                      ₹{crop.expectedPrice}/Q
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 border-t border-gray-100 p-4 pt-3 dark:border-gray-800">
              <button
                type="button"
                onClick={() => setDetailModalCrop(crop)}
                className="focus-ring w-1/2 rounded-xl border border-gray-200 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                View Details
              </button>
              <button
                type="button"
                onClick={() => setSelectedCropForBid(crop)}
                className="focus-ring w-1/2 rounded-xl bg-primary-600 py-2 text-xs font-semibold text-white shadow-soft transition hover:bg-primary-700 active:bg-primary-800"
              >
                Place Bid
              </button>
            </div>
          </div>
        ))}
      </div>

      {crops.length === 0 && (
        <div className="rounded-2xl border border-dashed border-gray-200 p-12 text-center dark:border-gray-800">
          <p className="text-sm text-gray-500">No crop listings match your filter criteria.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedState('All');
              setSelectedCropType('All');
            }}
            className="mt-3 text-xs font-bold text-primary-600 underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Place Bid Modal */}
      {selectedCropForBid && (
        <PlaceBidModal
          crop={selectedCropForBid}
          onClose={() => setSelectedCropForBid(null)}
        />
      )}

      {/* Details Modal */}
      {detailModalCrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
            <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
              {detailModalCrop.crop}
            </h3>
            <p className="text-xs text-gray-500">{detailModalCrop.farmer} • {detailModalCrop.location}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                <span className="text-gray-400">Available Quantity:</span>
                <p className="font-bold text-gray-900 dark:text-white">{detailModalCrop.quantity} {detailModalCrop.unit}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                <span className="text-gray-400">Expected Rate:</span>
                <p className="font-bold text-primary-600 dark:text-primary-400">₹{detailModalCrop.expectedPrice} / Quintal</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                <span className="text-gray-400">Quality Grade:</span>
                <p className="font-bold text-gray-900 dark:text-white">{detailModalCrop.grade}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                <span className="text-gray-400">Moisture Level:</span>
                <p className="font-bold text-gray-900 dark:text-white">{detailModalCrop.moisture}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDetailModalCrop(null)}
                className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const target = detailModalCrop;
                  setDetailModalCrop(null);
                  setSelectedCropForBid(target);
                }}
                className="rounded-xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-700"
              >
                Place Bid Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
