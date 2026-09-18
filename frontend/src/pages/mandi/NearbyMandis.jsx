import { FiNavigation } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import MandiHeader from '@/components/mandi/MandiHeader';
import MandiCard from '@/components/mandi/MandiCard';
import { useMandiPrice } from '@/context/MandiPriceContext';

export default function NearbyMandis() {
  const { mandis, selectedMandiId, setSelectedMandiId, toggleFavorite } = useMandiPrice();
  const sorted = [...mandis].sort((a, b) => a.distance - b.distance);

  return (
    <PageTransition>
      <MandiHeader
        title="Nearby Mandis"
        subtitle="Live arrival points within 50 km of your farm"
        showBack
        status={`${sorted.length} mandis`}
      />

      <p className="mb-4 flex items-center gap-2 text-sm text-gray-500">
        <FiNavigation className="text-primary-600" aria-hidden="true" />
        Nearest first. Set your default market to see its rates across the app.
      </p>

      <div className="grid gap-4 lg:grid-cols-2">
        {sorted.map((mandi) => (
          <MandiCard
            key={mandi.id}
            mandi={mandi}
            selected={mandi.id === selectedMandiId}
            onSelect={setSelectedMandiId}
            onFavorite={toggleFavorite}
          />
        ))}
      </div>
    </PageTransition>
  );
}