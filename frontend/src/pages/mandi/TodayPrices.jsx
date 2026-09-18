import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiHeart, FiTrendingUp } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import MandiHeader from '@/components/mandi/MandiHeader';
import FilterBar from '@/components/mandi/FilterBar';
import PriceCard from '@/components/mandi/PriceCard';
import { useMandiPrice } from '@/context/MandiPriceContext';
import { formatINR } from '@/utils/format';

export default function TodayPrices() {
  const {
    todayPrices,
    selectedState,
    selectedDistrict,
    selectedCrop,
    loading,
    updatedAt,
    bestPriceMap,
  } = useMandiPrice();

  const stats = useMemo(() => {
    if (todayPrices.length === 0) return null;
    const avg = Math.round(todayPrices.reduce((sum, r) => sum + r.modal, 0) / todayPrices.length);
    const gainer = todayPrices.reduce((max, r) => (r.changePct > max.changePct ? r : max), todayPrices[0]);
    const lots = todayPrices.reduce((sum, r) => sum + (r.vol || 200), 0);
    return { avg, gainer, lots };
  }, [todayPrices]);

  return (
    <PageTransition>
      <MandiHeader
        title="Today's Mandi Prices"
        subtitle={`${selectedState} Mandis${selectedDistrict !== 'All Districts' ? ' · ' + selectedDistrict : ''}${selectedCrop !== 'All Crops' ? ' · ' + selectedCrop : ''} · Live Agmarknet`}
        status={`Updated ${updatedAt}`}
      />

      {stats && (
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Card variant="soft" className="flex items-center gap-3 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-xl text-primary-600 shadow-soft">
              <FiTrendingUp aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Avg Modal Rate</p>
              <p className="font-display text-lg font-bold text-gray-900">{formatINR(stats.avg)} <span className="text-xs font-normal text-gray-400">/qtl</span></p>
            </div>
          </Card>
          <Card variant="soft" className="flex items-center gap-3 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-xl text-accent-600 shadow-soft">
              <FiArrowUpRight aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Active Mandi Crop</p>
              <p className="truncate font-display text-lg font-bold text-gray-900">
                {stats.gainer.emoji} {stats.gainer.commodity}
              </p>
            </div>
          </Card>
          <Card variant="soft" className="flex items-center gap-3 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-xl text-sky-600 shadow-soft">
              <FiHeart aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Total APMC Listings</p>
              <p className="font-display text-lg font-bold text-gray-900">{todayPrices.length} records</p>
            </div>
          </Card>
        </div>
      )}

      <FilterBar />

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-bold text-gray-800">{todayPrices.length}</span> market rates for{' '}
          <span className="font-semibold text-primary-700">{selectedState}</span>
          {selectedDistrict !== 'All Districts' && <span className="font-semibold text-sky-700"> · {selectedDistrict}</span>}
          {selectedCrop !== 'All Crops' && <span className="font-semibold text-amber-800"> · {selectedCrop}</span>}
        </p>
        <Link
          to="/dashboard/market-prices/compare"
          className="focus-ring rounded-lg text-xs font-bold text-primary-600 hover:text-primary-700"
        >
          Compare Across States →
        </Link>
      </div>

      {loading ? (
        <div className="mt-8 flex flex-col items-center justify-center py-12 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary-600 border-t-transparent" />
          <p className="mt-3 text-xs font-medium text-gray-500">Fetching live rates from Agmarknet...</p>
        </div>
      ) : todayPrices.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title={`No records for ${selectedCrop !== 'All Crops' ? selectedCrop : 'selected filters'}`}
            description={`Try selecting "All States" or choosing another crop to view available mandis.`}
          />
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {todayPrices.map((row) => (
            <PriceCard
              key={row.id}
              row={row}
              bestIn={bestPriceMap[row.commodityKey]?.mandiId === row.mandiId}
            />
          ))}
        </div>
      )}

      <p className="mt-6 text-center text-xs text-gray-400">
        Data powered by Agmarknet, Directorate of Marketing & Inspection, Ministry of Agriculture, Govt of India.
      </p>
    </PageTransition>
  );
}