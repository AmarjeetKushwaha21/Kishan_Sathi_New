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
  const { todayPrices, selectedMandi, bestPriceMap, filteredCommodities } = useMandiPrice();

  const stats = useMemo(() => {
    if (todayPrices.length === 0) return null;
    const avg = Math.round(todayPrices.reduce((sum, r) => sum + r.modal, 0) / todayPrices.length);
    const gainer = todayPrices.reduce((max, r) => (r.changePct > max.changePct ? r : max), todayPrices[0]);
    const lots = todayPrices.reduce((sum, r) => sum + r.vol, 0);
    return { avg, gainer, lots };
  }, [todayPrices]);

  return (
    <PageTransition>
      <MandiHeader
        title="Today's Mandi Prices"
        subtitle={`${selectedMandi.name} · updated 8:45 AM`}
        status={new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
      />

      {stats && (
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Card variant="soft" className="flex items-center gap-3 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-xl text-primary-600">
              <FiTrendingUp aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Avg modal price</p>
              <p className="font-display text-lg font-bold text-gray-900">{formatINR(stats.avg)}</p>
            </div>
          </Card>
          <Card variant="soft" className="flex items-center gap-3 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-50 text-xl text-accent-600">
              <FiArrowUpRight aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Top gainer</p>
              <p className="truncate font-display text-lg font-bold text-gray-900">
                {stats.gainer.emoji} {stats.gainer.commodity}
              </p>
            </div>
          </Card>
          <Card variant="soft" className="flex items-center gap-3 p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-xl text-sky-600">
              <FiHeart aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Arrivals today</p>
              <p className="font-display text-lg font-bold text-gray-900">~{stats.lots} qtl</p>
            </div>
          </Card>
        </div>
      )}

      <FilterBar />

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {todayPrices.length} commodities · best rate across nearby mandis marked
        </p>
        <Link to="/dashboard/market-prices/compare" className="focus-ring rounded-lg text-xs font-bold text-primary-600 hover:text-primary-700">
          Compare commodities →
        </Link>
      </div>

      {todayPrices.length === 0 ? (
        <div className="mt-4">
          <EmptyState title="No commodities found" description="Try a different search term or category filter." />
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
        Filtered across {filteredCommodities.length} commodities. Prices are modal rates in {selectedMandi.short} mandi.
      </p>
    </PageTransition>
  );
}