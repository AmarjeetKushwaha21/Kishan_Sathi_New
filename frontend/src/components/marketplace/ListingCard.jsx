import { Link } from 'react-router-dom';
import { FiCalendar, FiEye, FiMapPin, FiTrendingUp } from 'react-icons/fi';

import Badge from '@/components/ui/Badge';
import { formatINR } from '@/utils/format';

const STATUS_STYLES = {
  active: { variant: 'primary', label: 'Active' },
  sold: { variant: 'outline', label: 'Sold' },
  expired: { variant: 'danger', label: 'Expired' },
};

export default function ListingCard({ listing, showOffers = true }) {
  const status = STATUS_STYLES[listing.status] || STATUS_STYLES.active;
  const formattedDate = new Date(`${listing.harvestDate}T00:00:00`);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
      <Link
        to={`/dashboard/marketplace/crop/${listing.id}`}
        className="focus-ring relative block"
        aria-label={`View ${listing.crop} listing`}
      >
        {listing.image ? (
          <div className="relative h-44 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={listing.image}
              alt={`${listing.crop} - ${listing.variety}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br from-primary-100 via-white to-accent-100/60 text-5xl transition group-hover:scale-105 dark:from-primary-900/40 dark:via-gray-900 dark:to-accent-900/30">
            <span aria-hidden="true">{listing.emoji || '🌾'}</span>
          </div>
        )}
        <Badge variant={status.variant} size="sm" className="absolute left-3 top-3 shadow-soft">
          {status.label}
        </Badge>
        {listing.organic && (
          <Badge variant="primary" size="sm" className="absolute right-3 top-3 shadow-soft">
            Organic
          </Badge>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-gray-900">
          <Link to={`/dashboard/marketplace/crop/${listing.id}`} className="focus-ring rounded-md hover:text-primary-700">
            {listing.crop} · {listing.variety}
          </Link>
        </h3>

        <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
          <FiMapPin aria-hidden="true" className="shrink-0" />
          {listing.location}
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-lg font-bold text-gray-900">{formatINR(listing.pricePerQuintal)}</span>
          <span className="text-xs text-gray-400">/quintal</span>
        </div>

        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-lg bg-primary-50/60 px-2.5 py-2">
            <dt className="text-[10px] text-gray-400">Quantity</dt>
            <dd className="font-semibold text-gray-800">{listing.quantity} {listing.unit}</dd>
          </div>
          <div className="rounded-lg bg-primary-50/60 px-2.5 py-2">
            <dt className="text-[10px] text-gray-400">Grade</dt>
            <dd className="font-semibold text-gray-800">{listing.grade}{listing.certifications?.length ? ' · Certified' : ''}</dd>
          </div>
        </dl>

        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-[11px] text-gray-400">
          <span className="inline-flex items-center gap-1">
            <FiCalendar aria-hidden="true" />
            {formattedDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </span>
          <span className="inline-flex items-center gap-1">
            <FiEye aria-hidden="true" /> {listing.views}
          </span>
          {showOffers && (
            <span className="inline-flex items-center gap-1">
              <FiTrendingUp aria-hidden="true" /> {listing.offers} offers
            </span>
          )}
        </div>
      </div>
    </article>
  );
}