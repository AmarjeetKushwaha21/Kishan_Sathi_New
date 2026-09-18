import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';
import MandiHeader from '@/components/mandi/MandiHeader';
import MandiCard from '@/components/mandi/MandiCard';
import TrendBadge from '@/components/mandi/TrendBadge';
import { useMandiPrice } from '@/context/MandiPriceContext';
import { buildTodayPrices } from '@/data/mock/mandiPrices';
import { formatINR } from '@/utils/format';

export default function FavoriteMarkets() {
  const { mandis, favorites, toggleFavorite, selectedMandiId, setSelectedMandiId } = useMandiPrice();
  const navigate = useNavigate();

  const favoriteMandis = useMemo(() => mandis.filter((m) => favorites.includes(m.id)), [mandis, favorites]);
  const allToday = useMemo(() => buildTodayPrices(), []);

  function topFor(mandiId) {
    return allToday
      .filter((r) => r.mandiId === mandiId)
      .sort((a, b) => b.modal - a.modal)
      .slice(0, 3);
  }

  return (
    <PageTransition>
      <MandiHeader
        title="Favourite Markets"
        subtitle="Quick access to your most-used mandis"
        showBack
        status={`${favoriteMandis.length} saved`}
      />

      {favoriteMandis.length === 0 ? (
        <EmptyState
          icon={FiHeart}
          title="No favourite markets yet"
          description="Tap the heart on any mandi to pin it here for quick price checks."
          action
          actionLabel="Browse nearby mandis"
          onAction={() => navigate('/dashboard/market-prices/nearby')}
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {favoriteMandis.map((mandi) => (
            <MandiCard
              key={mandi.id}
              mandi={mandi}
              selected={mandi.id === selectedMandiId}
              onSelect={setSelectedMandiId}
              onFavorite={toggleFavorite}
              extra={
                <div>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-400">Top rates today</p>
                  <ul className="space-y-1.5">
                    {topFor(mandi.id).map((row) => (
                      <li key={row.id} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-soft">
                        <span className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                          <span aria-hidden="true">{row.emoji}</span> {row.commodity}
                        </span>
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{formatINR(row.modal)}</span>
                          <TrendBadge changePct={row.changePct} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Badge variant="outline">
          <Link to="/dashboard/market-prices/nearby" className="text-xs font-bold">Explore all mandis</Link>
        </Badge>
        <Badge variant="outline">
          <Link to="/dashboard/market-prices" className="text-xs font-bold">Today&apos;s prices</Link>
        </Badge>
      </div>
    </PageTransition>
  );
}