import { useParams } from 'react-router-dom';
import { FiUsers } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import MarketplaceProfile from '@/components/marketplace/MarketplaceProfile';
import { useMarketplace } from '@/context/MarketplaceContext';

export default function BuyerProfile() {
  const { buyerId } = useParams();
  const { buyers, deals } = useMarketplace();
  const buyer = buyers.find((b) => b.id === buyerId);

  return (
    <PageTransition>
      <MarketplaceHeader title="Buyer Profile" showBack />

      {buyer ? (
        <MarketplaceProfile party={buyer} deals={deals} extraLabel={`${buyer.preferences.length} crop interests`} />
      ) : (
        <Card variant="soft">
          <EmptyState icon={FiUsers} title="Buyer not found" description="This buyer profile is unavailable." />
        </Card>
      )}
    </PageTransition>
  );
}