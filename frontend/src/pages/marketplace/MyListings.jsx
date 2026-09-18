import { Link, useNavigate } from 'react-router-dom';
import { FiInbox, FiPlus, FiTag, FiTrendingUp } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import StatCard from '@/components/ui/StatCard';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import ListingCard from '@/components/marketplace/ListingCard';
import { useMarketplace } from '@/context/MarketplaceContext';

export default function MyListings() {
  const { listings, activeListingCount, offerStats, wallet } = useMarketplace();
  const navigate = useNavigate();

  return (
    <PageTransition>
      <MarketplaceHeader title="My Listings" subtitle="Manage your crop lots on the marketplace" />

      <section aria-label="Marketplace summary" className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard icon={FiTag} label="Active Listings" value={activeListingCount} color="primary" />
        <StatCard icon={FiInbox} label="Offers Received" value={offerStats.pending} trend={`${offerStats.total} total`} color="accent" />
        <StatCard icon={FiTrendingUp} label="Net Wallet" value={`₹${wallet.balance.toLocaleString('en-IN')}`} color="sky" />
        <StatCard icon={FiPlus} label="Deals Completed" value={listings.filter((l) => l.status === 'sold').length} color="violet" />
      </section>

      <div className="mt-6 flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-gray-900">Your crop lots</h2>
        <Link to="/dashboard/marketplace/sell" className="focus-ring rounded-xl">
          <Button leftIcon={FiPlus} size="sm">
            Sell Crop
          </Button>
        </Link>
      </div>

      {listings.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <Card variant="soft" className="mt-4">
          <EmptyState
            icon={FiTag}
            title="No listings yet"
            description="List your first crop lot and start receiving buyer offers."
            action
            actionLabel="Sell a crop"
            onAction={() => navigate('/dashboard/marketplace/sell')}
          />
        </Card>
      )}
    </PageTransition>
  );
}