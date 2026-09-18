import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiAlertTriangle, FiCheckCircle, FiClock, FiShield, FiXCircle } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Alert from '@/components/ui/Alert';
import Avatar from '@/components/ui/Avatar';
import EmptyState from '@/components/ui/EmptyState';
import Timeline from '@/components/marketplace/Timeline';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import { useMarketplace } from '@/context/MarketplaceContext';
import { formatINR } from '@/utils/format';

const STATUS_STYLES = {
  pending: { variant: 'accent', label: 'Pending' },
  accepted: { variant: 'primary', label: 'Accepted' },
  rejected: { variant: 'outline', label: 'Rejected' },
  expired: { variant: 'danger', label: 'Expired' },
};

export default function OfferDetails() {
  const { offerId } = useParams();
  const { offers, listings, companies, buyers, acceptOffer, rejectOffer, rules } = useMarketplace();
  const [busy, setBusy] = useState(null);
  const [message, setMessage] = useState(null);

  const offer = offers.find((o) => o.id === offerId);

  if (!offer) {
    return (
      <PageTransition>
        <MarketplaceHeader title="Offer Details" showBack />
        <Card variant="soft">
          <EmptyState icon={FiXCircle} title="Offer not found" description="This offer is no longer available." />
        </Card>
      </PageTransition>
    );
  }

  const listing = listings.find((l) => l.id === offer.listingId);
  const buyer =
    offer.buyerType === 'company'
      ? companies.find((c) => c.id === offer.buyerId)
      : buyers.find((b) => b.id === offer.buyerId);
  const status = STATUS_STYLES[offer.status] || STATUS_STYLES.pending;
  const buyerProfile =
    offer.buyerType === 'company'
      ? `/dashboard/marketplace/company/${offer.buyerId}`
      : `/dashboard/marketplace/buyer/${offer.buyerId}`;
  const commission = Math.round(offer.total * rules.commissionRate);

  async function handleAccept() {
    setBusy('accept');
    setMessage(null);
    await new Promise((resolve) => setTimeout(resolve, 700));
    const result = acceptOffer(offer.id);
    setMessage({
      variant: 'success',
      title: 'Offer accepted!',
      text: `Deal created for ${formatINR(result.total)}. Pending settlement of ${formatINR(result.total)}.`,
    });
    setBusy(null);
  }

  async function handleReject() {
    setBusy('reject');
    setMessage(null);
    await new Promise((resolve) => setTimeout(resolve, 500));
    rejectOffer(offer.id);
    setMessage({ variant: 'info', title: 'Offer rejected', text: 'The buyer has been notified.' });
    setBusy(null);
  }

  return (
    <PageTransition>
      <MarketplaceHeader title="Offer Details" showBack />

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <Card variant="soft">
            <div className="flex flex-wrap items-center gap-4">
              <Avatar name={buyer?.name || 'Buyer'} size="lg" color={offer.buyerType === 'company' ? '#15803d' : '#f59e0b'} />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-400">{buyer?.type}</p>
                <h1 className="font-display text-xl font-bold text-gray-900">{buyer?.name || 'Buyer'}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge variant="accent">{buyer?.rating}★ rating</Badge>
                  <Badge variant="outline">{buyer?.deals} deals</Badge>
                  {buyer?.verified && <Badge variant="primary"><FiShield aria-hidden="true" /> Verified</Badge>}
                </div>
              </div>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>

            {listing && (
              <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl bg-primary-50/60 p-4">
                {listing.image ? (
                  <img
                    src={listing.image}
                    alt={listing.crop}
                    className="h-12 w-12 rounded-xl object-cover shadow-sm"
                  />
                ) : (
                  <span className="text-3xl" aria-hidden="true">{listing.emoji}</span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900">{listing.crop} · {listing.variety}</p>
                  <p className="text-xs text-gray-500">{listing.location} · Grade {listing.grade}</p>
                </div>
                <span className="text-sm font-bold text-gray-900">{listing.quantity} qtl available</span>
              </div>
            )}
          </Card>

          <Card variant="soft">
            <h2 className="mb-4 font-display text-base font-semibold text-gray-900">Price breakdown</h2>
            <dl className="space-y-2.5 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Offered price</dt><dd className="font-semibold text-gray-900">{formatINR(offer.pricePerQuintal)}/quintal</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Quantity</dt><dd className="font-semibold text-gray-900">{offer.quantity} quintals</dd></div>
              <div className="flex justify-between border-b border-gray-100 pb-2.5"><dt className="text-gray-500">Delivery in</dt><dd className="font-semibold text-gray-900">{offer.delivery} days</dd></div>
              <div className="flex justify-between text-base"><dt className="font-semibold text-gray-900">Offer total</dt><dd className="font-display text-lg font-bold text-primary-700">{formatINR(offer.total)}</dd></div>
              <div className="flex justify-between text-xs"><dt className="text-gray-400">Marketplace commission (1.5%)</dt><dd className="text-gray-400">− {formatINR(commission)}</dd></div>
              <div className="flex justify-between text-xs"><dt className="text-gray-400">You receive (est.)</dt><dd className="font-semibold text-gray-700">{formatINR(offer.total - commission)}</dd></div>
            </dl>

            <div className="mt-4 rounded-xl bg-primary-50/60 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <FiShield aria-hidden="true" className="text-primary-600" /> Payment terms
              </p>
              <p className="mt-1 text-sm text-gray-600">{offer.paymentTerms}</p>
              {offer.note && <p className="mt-2 text-sm italic text-gray-500">&ldquo;{offer.note}&rdquo;</p>}
            </div>

            <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
              <FiClock aria-hidden="true" /> Offer expires on {offer.expiresAt}
            </p>
          </Card>

          <Card variant="soft">
            <Timeline title="Offer timeline" items={offer.timeline} />
          </Card>
        </div>

        <div className="space-y-5">
          {message && (
            <Alert variant={message.variant} title={message.title} onClose={() => setMessage(null)}>
              {message.text}
            </Alert>
          )}

          <Card variant="tinted">
            <h3 className="mb-2 font-display text-base font-semibold text-gray-900">Your decision</h3>
            {offer.status === 'pending' ? (
              <div className="space-y-3">
                <Button
                  size="lg"
                  fullWidth
                  loading={busy === 'accept'}
                  onClick={handleAccept}
                  leftIcon={FiCheckCircle}
                >
                  Accept offer
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  loading={busy === 'reject'}
                  onClick={handleReject}
                  leftIcon={FiXCircle}
                >
                  Reject offer
                </Button>
                <p className="text-center text-xs text-gray-400">
                  Accepting locks the deal and notifies other buyers for this lot.
                </p>
              </div>
            ) : (
              <div className="flex items-start gap-2.5 rounded-xl bg-white p-3 text-sm text-gray-600">
                {offer.status === 'accepted' ? (
                  <FiCheckCircle className="mt-0.5 shrink-0 text-primary-600" aria-hidden="true" />
                ) : (
                  <FiAlertTriangle className="mt-0.5 shrink-0 text-gray-400" aria-hidden="true" />
                )}
                <span>
                  {offer.status === 'accepted'
                    ? 'You accepted this offer. Track it under Accepted Deals.'
                    : 'This offer is no longer active.'}
                </span>
              </div>
            )}

            <Link to={buyerProfile} className="focus-ring mt-4 block rounded-xl">
              <Button variant="ghost" fullWidth>
                View buyer profile
              </Button>
            </Link>
          </Card>

          <Card variant="soft">
            <h3 className="mb-2 font-display text-base font-semibold text-gray-900">About this buyer</h3>
            <p className="text-sm leading-relaxed text-gray-600">{buyer?.description}</p>
            <p className="mt-3 text-xs text-gray-500">Based in {buyer?.location}</p>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}