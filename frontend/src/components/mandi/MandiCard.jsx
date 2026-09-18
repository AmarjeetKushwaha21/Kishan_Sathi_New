import { FiClock, FiHeart, FiMapPin, FiStar, FiTruck } from 'react-icons/fi';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { useMandiPrice } from '@/context/MandiPriceContext';
import { cn } from '@/utils/cn';

export default function MandiCard({ mandi, selected = false, onSelect, onFavorite, extra }) {
  const { isFavorite } = useMandiPrice();
  const fav = isFavorite(mandi.id);

  return (
    <Card variant="soft" className={cn('p-4 sm:p-5', selected && 'border-2 border-primary-300 bg-primary-50/40')}>
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-50 text-2xl" aria-hidden="true">
          {mandi.emoji}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-bold text-gray-900">{mandi.name}</h3>
            {fav && <Badge variant="primary" size="sm">Favourite</Badge>}
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
            <FiMapPin aria-hidden="true" /> {mandi.district} district · {mandi.distance} km away
          </p>
        </div>
        <button
          type="button"
          onClick={() => onFavorite(mandi.id)}
          aria-pressed={fav}
          aria-label={fav ? `Remove ${mandi.short} from favourites` : `Add ${mandi.short} to favourites`}
          className={cn(
            'focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-lg transition',
            fav ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 bg-white text-gray-300 hover:text-red-400'
          )}
        >
          <FiHeart aria-hidden="true" />
        </button>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        <div className="rounded-xl bg-white p-2.5 shadow-soft">
          <dt className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400"><FiStar aria-hidden="true" /> Rating</dt>
          <dd className="mt-0.5 text-sm font-bold text-gray-800">{mandi.rating} / 5</dd>
        </div>
        <div className="rounded-xl bg-white p-2.5 shadow-soft">
          <dt className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400"><FiTruck aria-hidden="true" /> Arrivals</dt>
          <dd className="mt-0.5 text-sm font-bold text-gray-800">{mandi.arrivals}</dd>
        </div>
        <div className="rounded-xl bg-white p-2.5 shadow-soft">
          <dt className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400"><FiClock aria-hidden="true" /> Timings</dt>
          <dd className="mt-0.5 text-sm font-bold text-gray-800">{mandi.opens}</dd>
        </div>
        <div className="rounded-xl bg-white p-2.5 shadow-soft">
          <dt className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Dala charge</dt>
          <dd className="mt-0.5 text-sm font-bold text-gray-800">{mandi.dala}</dd>
        </div>
      </dl>

      {extra && <div className="mt-3">{extra}</div>}

      {onSelect && (
        <Button
          variant={selected ? 'primary' : 'outline'}
          size="sm"
          fullWidth
          className="mt-4"
          onClick={() => onSelect(mandi.id)}
        >
          {selected ? 'Selected market' : 'Set as my market'}
        </Button>
      )}
    </Card>
  );
}