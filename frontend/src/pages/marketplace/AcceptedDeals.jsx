import { FiCheckCircle, FiClock } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import DealCard from '@/components/marketplace/DealCard';
import Timeline from '@/components/marketplace/Timeline';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import { useMarketplace } from '@/context/MarketplaceContext';

export default function AcceptedDeals() {
  const { deals } = useMarketplace();
  const pendingCount = deals.filter((d) => d.paymentStatus !== 'received').length;
  const recent = deals[0];

  return (
    <PageTransition>
      <MarketplaceHeader
        title="Accepted Deals"
        subtitle={pendingCount > 0 ? `${pendingCount} pending settlement` : 'All settlements received'}
      />

      {deals.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {deals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>

          {recent && (
            <Card variant="soft" className="mt-6">
              <h2 className="mb-4 flex items-center gap-2 font-display text-base font-semibold text-gray-900">
                {recent.paymentStatus === 'received' ? (
                  <FiCheckCircle className="text-primary-600" aria-hidden="true" />
                ) : (
                  <FiClock className="text-accent-500" aria-hidden="true" />
                )}
                Latest deal progress
              </h2>
              <div className="grid gap-8 lg:grid-cols-2">
                <Timeline title="Deal milestones" items={recent.timeline} />
                <div className="rounded-2xl bg-primary-50/60 p-5">
                  <p className="text-sm text-gray-500">Deal value</p>
                  <p className="font-display text-2xl font-bold text-gray-900">
                    ₹{recent.total.toLocaleString('en-IN')}
                  </p>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-gray-500">Crop</dt><dd className="font-semibold text-gray-800">{recent.crop} · {recent.variety}</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Buyer</dt><dd className="font-semibold text-gray-800">{recent.buyerName}</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Quantity</dt><dd className="font-semibold text-gray-800">{recent.quantity} quintals</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Commission</dt><dd className="font-semibold text-gray-800">₹{recent.commission.toLocaleString('en-IN')}</dd></div>
                  </dl>
                </div>
              </div>
            </Card>
          )}
        </>
      ) : (
        <Card variant="soft">
          <EmptyState
            icon={FiCheckCircle}
            title="No deals yet"
            description="Accept a buyer offer to create your first deal."
          />
        </Card>
      )}
    </PageTransition>
  );
}