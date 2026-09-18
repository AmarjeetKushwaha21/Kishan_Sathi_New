import { Link } from 'react-router-dom';
import { FiChevronRight, FiClock, FiShield } from 'react-icons/fi';

import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import { useMarketplace } from '@/context/MarketplaceContext';
import { formatINR } from '@/utils/format';

const STATUS_STYLES = {
  pending: { variant: 'accent', label: 'Pending' },
  accepted: { variant: 'primary', label: 'Accepted' },
  rejected: { variant: 'outline', label: 'Rejected' },
  expired: { variant: 'danger', label: 'Expired' },
};

export default function OfferCard({ offer, showListing = true }) {
  const { listings, companies, buyers } = useMarketplace();
  const buyer =
    offer.buyerType === 'company'
      ? companies.find((c) => c.id === offer.buyerId)
      : buyers.find((b) => b.id === offer.buyerId);
  const listing = listings.find((l) => l.id === offer.listingId);
  const status = STATUS_STYLES[offer.status] || STATUS_STYLES.pending;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card sm:p-5">
      <div className="flex items-center gap-3">
        <Avatar name={buyer?.name || 'Buyer'} size="md" color={offer.buyerType === 'company' ? '#15803d' : '#f59e0b'} />
        <div className="min-w-0 flex-1">
          <Link
            to={
              offer.buyerType === 'company'
                ? `/dashboard/marketplace/company/${offer.buyerId}`
                : `/dashboard/marketplace/buyer/${offer.buyerId}`
            }
            className="focus-ring block truncate rounded-md text-sm font-semibold text-gray-900 hover:text-primary-700"
          >
            {buyer?.name || 'Buyer'}
          </Link>
          <p className="text-xs text-gray-500">
            {buyer?.type} · {buyer?.rating}★
          </p>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      {showListing && listing && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
          <span aria-hidden="true">{listing.emoji}</span>
          {listing.crop} · {listing.variety}
          <span className="ml-auto font-semibold text-gray-700">{listing.quantity} qtl</span>
        </p>
      )}

      <div className="mt-3 flex items-baseline gap-2 rounded-xl bg-primary-50/60 px-3.5 py-3">
        <span className="font-display text-xl font-bold text-gray-900">{formatINR(offer.pricePerQuintal)}</span>
        <span className="text-xs text-gray-400">/quintal</span>
        <span className="ml-auto text-sm font-semibold text-gray-700">{formatINR(offer.total)} total</span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
        <p className="flex items-center gap-1.5 text-gray-600">
          <FiShield className="shrink-0 text-primary-600" aria-hidden="true" />
          {offer.paymentTerms}
        </p>
        <p className="flex items-center justify-end gap-1.5 text-gray-600">
          <FiClock className="shrink-0 text-primary-600" aria-hidden="true" />
          Pickup in {offer.delivery} days
        </p>
      </div>

      <Link
        to={`/dashboard/marketplace/offers/${offer.id}`}
        className="focus-ring mt-4 inline-flex items-center justify-center gap-1 rounded-xl border border-primary-200 py-2 text-sm font-semibold text-primary-700 transition hover:bg-primary-50"
      >
        View offer <FiChevronRight aria-hidden="true" />
      </Link>
    </article>
  );
}