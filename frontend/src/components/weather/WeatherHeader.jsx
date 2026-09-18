import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiArrowLeft,
  FiCompass,
  FiMapPin,
  FiNavigation,
  FiRefreshCw,
  FiSearch,
  FiX,
  FiCheck,
} from 'react-icons/fi';

import { useWeather } from '@/context/WeatherContext';
import { cn } from '@/utils/cn';

const POPULAR_AGRI_HUBS = [
  { name: 'Ludhiana', district: 'Ludhiana', state: 'Punjab', lat: 30.9, lng: 75.85 },
  { name: 'Karnal', district: 'Karnal', state: 'Haryana', lat: 29.69, lng: 76.98 },
  { name: 'Indore', district: 'Indore', state: 'Madhya Pradesh', lat: 22.72, lng: 75.86 },
  { name: 'Nashik', district: 'Nashik', state: 'Maharashtra', lat: 19.99, lng: 73.79 },
  { name: 'Patna', district: 'Patna', state: 'Bihar', lat: 25.6, lng: 85.14 },
  { name: 'Varanasi', district: 'Varanasi', state: 'Uttar Pradesh', lat: 25.32, lng: 82.97 },
];

export default function WeatherHeader({ title, subtitle, showBack = false }) {
  const {
    unit,
    setUnit,
    activeLocation,
    selectLocation,
    detectCurrentLocation,
    refreshWeather,
    searchLocations,
    loading,
    isLocating,
    isLiveLocation,
    locationError,
  } = useWeather();

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);

  // Debounced search
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchLocations(searchQuery);
        setSearchResults(results);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(searchTimeoutRef.current);
  }, [searchQuery, searchLocations]);

  const handleSelect = (loc) => {
    selectLocation(loc);
    setIsModalOpen(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-lg text-gray-600 shadow-sm transition hover:bg-gray-50 hover:text-primary-600"
            >
              <FiArrowLeft aria-hidden="true" />
            </button>
          )}

          <div className="min-w-0">
            <h2 className="truncate font-display text-lg font-bold text-gray-900 sm:text-xl">{title}</h2>
            {subtitle && <p className="truncate text-xs text-gray-500">{subtitle}</p>}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Location Selector Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className={cn(
              'group inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold shadow-soft transition',
              isLiveLocation
                ? 'border-primary-200 bg-primary-50/60 text-primary-900 hover:bg-primary-100/70'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            )}
            title="Click to change location or search your village/city"
          >
            <FiMapPin className={isLiveLocation ? 'text-primary-600' : 'text-sky-500'} aria-hidden="true" />
            <span className="max-w-[140px] truncate sm:max-w-[200px]">
              {activeLocation.name}{activeLocation.district && activeLocation.district !== activeLocation.name ? `, ${activeLocation.district}` : ''}
            </span>
            {isLiveLocation && (
              <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
                GPS
              </span>
            )}
          </button>

          {/* Current Location GPS Button */}
          <button
            type="button"
            onClick={detectCurrentLocation}
            disabled={isLocating}
            className={cn(
              'focus-ring inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-2.5 py-2 text-xs font-semibold text-gray-700 shadow-soft transition hover:bg-sky-50 hover:text-sky-700 disabled:opacity-50'
            )}
            title="Detect My Live Location via GPS"
          >
            <FiNavigation className={cn('text-sky-600', isLocating && 'animate-spin')} aria-hidden="true" />
            <span className="hidden sm:inline">{isLocating ? 'Locating...' : 'Use My GPS'}</span>
          </button>

          {/* Refresh Button */}
          <button
            type="button"
            onClick={refreshWeather}
            disabled={loading}
            className="focus-ring flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-soft transition hover:bg-gray-50 hover:text-primary-600 disabled:opacity-50"
            title="Refresh Live Weather"
          >
            <FiRefreshCw className={cn('text-sm', loading && 'animate-spin text-primary-600')} aria-hidden="true" />
          </button>

          {/* Unit Toggle (°C / °F) */}
          <div
            role="group"
            aria-label="Temperature unit"
            className="flex items-center rounded-xl border border-gray-200 bg-white p-1 shadow-soft"
          >
            {['c', 'f'].map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={unit === u}
                onClick={() => setUnit(u)}
                className={cn(
                  'focus-ring rounded-lg px-2.5 py-1 text-xs font-bold transition',
                  unit === u ? 'bg-sky-500 text-white shadow-sm' : 'text-gray-500 hover:text-sky-600'
                )}
              >
                °{u.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {locationError && (
        <div className="mb-4 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs text-amber-800">
          <span>⚠️ {locationError}</span>
          <button
            type="button"
            onClick={detectCurrentLocation}
            className="font-bold underline hover:text-amber-950"
          >
            Retry GPS
          </button>
        </div>
      )}

      {/* Location Search / Picker Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <FiCompass className="text-primary-600 text-lg" />
                <h3 className="font-display font-bold text-gray-900">Change Weather Location</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <FiX className="text-lg" />
              </button>
            </div>

            {/* GPS Auto-detect Option */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => {
                  detectCurrentLocation();
                  setIsModalOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-xl border border-primary-200 bg-primary-50/70 p-3 text-left transition hover:bg-primary-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-white shadow-soft">
                    <FiNavigation className={cn(isLocating && 'animate-spin')} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary-950">Detect My GPS Location</p>
                    <p className="text-[11px] text-primary-700">Accurate farm weather using browser GPS</p>
                  </div>
                </div>
                {isLiveLocation && <FiCheck className="text-primary-700" />}
              </button>
            </div>

            {/* Search Input */}
            <div className="relative mt-4">
              <FiSearch className="absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search any village, district, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="focus-ring w-full rounded-xl border border-gray-200 py-2 pl-9 pr-4 text-xs text-gray-800 placeholder-gray-400"
              />
            </div>

            {/* Search Results */}
            {isSearching && (
              <p className="py-4 text-center text-xs text-gray-400">Searching locations...</p>
            )}

            {!isSearching && searchResults.length > 0 && (
              <div className="mt-2 max-h-48 overflow-y-auto divide-y divide-gray-100 rounded-xl border border-gray-100">
                {searchResults.map((loc) => (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => handleSelect(loc)}
                    className="flex w-full items-center justify-between p-2.5 text-left text-xs transition hover:bg-primary-50/50"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{loc.name}</p>
                      <p className="text-[11px] text-gray-500">{loc.district}, {loc.state}</p>
                    </div>
                    <FiMapPin className="text-gray-400 text-sm" />
                  </button>
                ))}
              </div>
            )}

            {/* Popular Agricultural Centers */}
            <div className="mt-4 border-t border-gray-100 pt-3">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Major Agricultural Centers
              </p>
              <div className="grid grid-cols-2 gap-2">
                {POPULAR_AGRI_HUBS.map((hub) => (
                  <button
                    key={hub.name}
                    type="button"
                    onClick={() => handleSelect({ ...hub, id: `hub-${hub.name.toLowerCase()}` })}
                    className={cn(
                      'flex items-center justify-between rounded-xl border p-2 text-left text-xs transition',
                      activeLocation.name === hub.name
                        ? 'border-primary-500 bg-primary-50 text-primary-900 font-semibold'
                        : 'border-gray-200 text-gray-700 hover:border-primary-300 hover:bg-gray-50'
                    )}
                  >
                    <div>
                      <p className="font-medium">{hub.name}</p>
                      <p className="text-[10px] text-gray-400">{hub.state}</p>
                    </div>
                    {activeLocation.name === hub.name && <FiCheck className="text-primary-600 text-xs" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}