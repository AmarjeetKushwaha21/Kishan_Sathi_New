import { useState } from 'react';
import { FiInbox } from 'react-icons/fi';

import PageTransition from '@/components/ui/PageTransition';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import OfferCard from '@/components/marketplace/OfferCard';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import { useMarketplace } from '@/context/MarketplaceContext';
import { cn } from '@/utils/cn';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'rejected', label: 'Rejected' },
];

export default function BuyerOffers() {
  const { offers, offerStats } = useMarketplace();
  const [tab, setTab] = useState('all');

  const visible = tab === 'all' ? offers : offers.filter((o) => o.status === tab);
  const counts = { all: offers.length, ...offerStats };

  return (
    <PageTransition>
      <MarketplaceHeader title="Buyer Offers" subtitle={`${offerStats.pending} pending · ${offerStats.total} total`} />

      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter offers by status">
        {TABS.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            onClick={() => setTab(t.key)}
            className={cn(
              'focus-ring flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition',
              tab === t.key ? 'bg-primary-600 text-white shadow-soft' : 'bg-white text-gray-500 hover:bg-primary-50 hover:text-primary-700'
            )}
          >
            {t.label}
            <span className={cn('rounded-full px-1.5 text-xs', tab === t.key ? 'bg-white/20' : 'bg-gray-100')}>
              {counts[t.key] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      ) : (
        <Card variant="soft" className="mt-5">
          <EmptyState icon={FiInbox} title="No offers here" description="Offers with this status will show up in this view." />
        </Card>
      )}
    </PageTransition>
  );
}