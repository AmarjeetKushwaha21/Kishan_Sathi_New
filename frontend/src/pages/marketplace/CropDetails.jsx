import { Link, useParams } from 'react-router-dom';
import { FiCalendar, FiEye, FiInbox, FiMapPin, FiShield, FiTag } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import Timeline from '@/components/marketplace/Timeline';
import OfferCard from '@/components/marketplace/OfferCard';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import { useMarketplace } from '@/context/MarketplaceContext';
import { formatINR } from '@/utils/format';

export default function CropDetails() {
  const { cropId } = useParams();
  const { listings, offers } = useMarketplace();
  const listing = listings.find((l) => l.id === cropId);

  if (!listing) {
    return (
      <PageTransition>
        <MarketplaceHeader title="Crop Details" showBack />
        <Card variant="soft">
          <EmptyState icon={FiTag} title="Listing not found" description="This crop lot may have been removed." />
        </Card>
      </PageTransition>
    );
  }

  const listingOffers = offers.filter((o) => o.listingId === listing.id);
  const pendingOffers = listingOffers.filter((o) => o.status === 'pending');
  const lifecycle = [
    { id: 'a', title: 'Listing published', description: `${listing.crop} ${listing.variety} listed`, date: listing.listedAt, status: 'done' },
    { id: 'b', title: 'Buyers viewing', description: `${listing.views} views so far`, date: listing.listedAt, status: 'done' },
    {
      id: 'c',
      title: listing.status === 'sold' ? 'Deal completed' : 'Receiving offers',
      description:
        listing.status === 'sold'
          ? 'Lot sold to a verified buyer'
          : `${listingOffers.length} offer${listingOffers.length === 1 ? '' : 's'} received`,
      date: listing.status === 'sold' ? listing.harvestDate : null,
      status: listing.status === 'sold' ? 'done' : listingOffers.length > 0 ? 'current' : 'upcoming',
    },
  ];

  return (
    <PageTransition>
      <MarketplaceHeader title="Crop Details" showBack />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <Card variant="soft" className="overflow-hidden p-0">
            {listing.image ? (
              <div className="relative h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 sm:h-80">
                <img
                  src={listing.image}
                  alt={`${listing.crop} - ${listing.variety}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary-100 via-white to-accent-100/60 text-8xl dark:from-primary-900/40 dark:via-gray-900 dark:to-accent-900/30">
                <span aria-hidden="true">{listing.emoji || '🌾'}</span>
              </div>
            )}
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={listing.status === 'active' ? 'primary' : 'outline'}>
                  {listing.status === 'active' ? 'Active' : 'Sold'}
                </Badge>
                <Badge variant="accent">Grade {listing.grade}</Badge>
                {listing.organic && <Badge variant="primary">Organic</Badge>}
                {listing.certifications?.map((c) => (
                  <Badge key={c} variant="outline">{c}</Badge>
                ))}
              </div>

              <h1 className="mt-3 font-display text-2xl font-bold text-gray-900">
                {listing.crop} · {listing.variety}
              </h1>

              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5"><FiMapPin aria-hidden="true" /> {listing.location}</span>
                <span className="inline-flex items-center gap-1.5"><FiCalendar aria-hidden="true" /> Harvest {new Date(`${listing.harvestDate}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                <span className="inline-flex items-center gap-1.5"><FiEye aria-hidden="true" /> {listing.views} views</span>
              </div>

              <div className="mt-4 rounded-2xl bg-primary-50/60 p-4">
                <p className="text-sm leading-relaxed text-gray-600">{listing.description}</p>
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-gray-100 p-3">
                  <dt className="text-[10px] font-semibold uppercase text-gray-400">Asking price</dt>
                  <dd className="font-display text-lg font-bold text-gray-900">{formatINR(listing.pricePerQuintal)}<span className="text-xs text-gray-400">/qtl</span></dd>
                </div>
                <div className="rounded-xl border border-gray-100 p-3">
                  <dt className="text-[10px] font-semibold uppercase text-gray-400">Quantity</dt>
                  <dd className="font-display text-lg font-bold text-gray-900">{listing.quantity}<span className="text-xs text-gray-400"> qtl</span></dd>
                </div>
                <div className="rounded-xl border border-gray-100 p-3">
                  <dt className="text-[10px] font-semibold uppercase text-gray-400">Est. value</dt>
                  <dd className="font-display text-lg font-bold text-primary-700">{formatINR(listing.quantity * listing.pricePerQuintal)}</dd>
                </div>
                <div className="rounded-xl border border-gray-100 p-3">
                  <dt className="text-[10px] font-semibold uppercase text-gray-400">Offers</dt>
                  <dd className="font-display text-lg font-bold text-gray-900">{listingOffers.length}</dd>
                </div>
              </dl>
            </div>
          </Card>

          <Card variant="soft">
            <Timeline title="Listing timeline" items={lifecycle} />
          </Card>
        </div>

        <div className="space-y-6">
          <Card variant="tinted">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl text-primary-600 shadow-soft">
                <FiInbox aria-hidden="true" />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-gray-900">{pendingOffers.length} pending offer{pendingOffers.length === 1 ? '' : 's'}</p>
                <p className="text-xs text-gray-500">Best offer: {listingOffers.length ? formatINR(Math.max(...listingOffers.map((o) => o.pricePerQuintal))) : '—'}/qtl</p>
              </div>
            </div>
            {listing.status === 'active' && (
              <div className="mt-4">
                <Link to="/dashboard/marketplace/offers" className="focus-ring block rounded-xl">
                  <Button fullWidth leftIcon={FiInbox}>Review all offers</Button>
                </Link>
              </div>
            )}
          </Card>

          <div>
            <h2 className="mb-3 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
              <FiShield className="text-primary-600" aria-hidden="true" />
              Offers for this lot
            </h2>
            {listingOffers.length > 0 ? (
              <div className="space-y-3">
                {listingOffers.map((offer) => (
                  <OfferCard key={offer.id} offer={offer} showListing={false} />
                ))}
              </div>
            ) : (
              <EmptyState icon={FiInbox} title="No offers yet" description="Offers from buyers will appear here." />
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}