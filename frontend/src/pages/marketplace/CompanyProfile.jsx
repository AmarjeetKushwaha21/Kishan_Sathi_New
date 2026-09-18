import { useParams } from 'react-router-dom';
import { FiBriefcase } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import MarketplaceProfile from '@/components/marketplace/MarketplaceProfile';
import { useMarketplace } from '@/context/MarketplaceContext';

export default function CompanyProfile() {
  const { companyId } = useParams();
  const { companies, deals } = useMarketplace();
  const company = companies.find((c) => c.id === companyId);

  return (
    <PageTransition>
      <MarketplaceHeader title="Company Profile" showBack />

      {company ? (
        <MarketplaceProfile party={company} deals={deals} extraLabel={`${company.sectors.length} sectors`} />
      ) : (
        <Card variant="soft">
          <EmptyState icon={FiBriefcase} title="Company not found" description="This company profile is unavailable." />
        </Card>
      )}
    </PageTransition>
  );
}