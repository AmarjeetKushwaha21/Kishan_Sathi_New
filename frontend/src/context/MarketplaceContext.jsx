import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import {
  BUYERS,
  COMPANIES,
  CROP_IMAGES,
  MARKETPLACE_RULES,
  SEED_DEALS,
  SEED_LISTINGS,
  SEED_OFFERS,
  SEED_TRANSACTIONS,
} from '@/data/mock/marketplace';

const MarketplaceContext = createContext(null);

const KEYS = {
  listings: 'ks_mkt_listings',
  offers: 'ks_mkt_offers',
  deals: 'ks_mkt_deals',
  transactions: 'ks_mkt_transactions',
};

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function readListingsStorage() {
  try {
    const raw = localStorage.getItem(KEYS.listings);
    let items = raw ? JSON.parse(raw) : SEED_LISTINGS;

    // Ensure all items have high-resolution authentic crop images
    items = items.map((item) => {
      const key = item.cropKey || item.crop?.toLowerCase();
      const img = item.image || CROP_IMAGES[key] || CROP_IMAGES[item.crop?.toLowerCase()] || '/assets/crops/wheat.jpg';
      return { ...item, image: img };
    });

    // Merge any missing seed listings so new crops (Potato, Onion, Garlic, Gram, Beans, Arhar Dal, etc.) appear
    const existingIds = new Set(items.map((i) => i.id));
    for (const seed of SEED_LISTINGS) {
      if (!existingIds.has(seed.id)) {
        items.push(seed);
      }
    }
    return items;
  } catch {
    return SEED_LISTINGS;
  }
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function makeId(prefix) {
  return `${prefix}-${Date.now()}`;
}

export function MarketplaceProvider({ children }) {
  const [listings, setListings] = useState(() => readListingsStorage());
  const [offers, setOffers] = useState(() => readStorage(KEYS.offers, SEED_OFFERS));
  const [deals, setDeals] = useState(() => readStorage(KEYS.deals, SEED_DEALS));
  const [transactions, setTransactions] = useState(() => readStorage(KEYS.transactions, SEED_TRANSACTIONS));

  useEffect(() => {
    localStorage.setItem(KEYS.listings, JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem(KEYS.offers, JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem(KEYS.deals, JSON.stringify(deals));
  }, [deals]);

  useEffect(() => {
    localStorage.setItem(KEYS.transactions, JSON.stringify(transactions));
  }, [transactions]);

  const addListing = useCallback((data) => {
    const listing = {
      id: makeId('l'),
      crop: data.crop,
      cropKey: data.cropKey,
      variety: data.variety,
      emoji: data.emoji || '🌾',
      image: data.image || CROP_IMAGES[data.cropKey] || CROP_IMAGES[data.crop?.toLowerCase()] || '/assets/crops/wheat.jpg',
      quantity: Number(data.quantity),
      unit: 'quintals',
      pricePerQuintal: Number(data.pricePerQuintal),
      grade: data.grade,
      location: data.location,
      harvestDate: data.harvestDate,
      organic: Boolean(data.organic),
      certifications: data.certifications || [],
      description: data.description,
      status: 'active',
      listedAt: today(),
      views: 0,
      offers: 0,
    };
    setListings((prev) => [listing, ...prev]);
    return listing;
  }, []);

  const rejectOffer = useCallback((offerId) => {
    setOffers((prev) =>
      prev.map((offer) =>
        offer.id === offerId
          ? {
              ...offer,
              status: 'rejected',
              timeline: [
                ...offer.timeline.map((s) => ({ ...s, status: 'done' })),
                { id: makeId('s'), title: 'Offer rejected', description: 'Offer declined by you', date: today(), status: 'done' },
              ],
            }
          : offer
      )
    );
  }, []);

  const acceptOffer = useCallback(
    (offerId) => {
      const offer = offers.find((o) => o.id === offerId);
      if (!offer || offer.status !== 'pending') return null;

      const listing = listings.find((l) => l.id === offer.listingId);
      const buyer =
        offer.buyerType === 'company'
          ? COMPANIES.find((c) => c.id === offer.buyerId)
          : BUYERS.find((b) => b.id === offer.buyerId);

      const dealId = makeId('d');
      const total = offer.total;
      const commission = Math.round(total * MARKETPLACE_RULES.commissionRate);

      setOffers((prev) =>
        prev.map((o) => {
          if (o.id === offerId) {
            return {
              ...o,
              status: 'accepted',
              timeline: [
                ...o.timeline.map((s) => ({ ...s, status: 'done' })),
                { id: makeId('s'), title: 'Offer accepted', description: 'You accepted the offer', date: today(), status: 'done' },
              ],
            };
          }
          if (o.listingId === offer.listingId && o.status === 'pending') {
            return {
              ...o,
              status: 'rejected',
              timeline: [...o.timeline, { id: makeId('s'), title: 'Offer rejected', description: 'Another offer was accepted for this lot', date: today(), status: 'done' }],
            };
          }
          return o;
        })
      );

      setListings((prev) =>
        prev.map((l) => (l.id === offer.listingId ? { ...l, status: 'sold', offers: l.offers + 1 } : l))
      );

      setDeals((prev) => [
        {
          id: dealId,
          offerId: offer.id,
          listingId: offer.listingId,
          crop: listing?.crop || 'Crop',
          variety: listing?.variety || '',
          emoji: listing?.emoji || '🌾',
          buyerName: buyer?.name || 'Buyer',
          buyerId: offer.buyerId,
          buyerType: offer.buyerType,
          quantity: offer.quantity,
          pricePerQuintal: offer.pricePerQuintal,
          total,
          paymentStatus: 'pending',
          commission,
          dealDate: today(),
          timeline: [
            { id: makeId('t'), title: 'Offer accepted', description: `Deal locked with ${buyer?.name || 'buyer'}`, date: today(), status: 'done' },
            { id: makeId('t'), title: 'Goods handover', description: `Hand over ${offer.quantity} quintals to complete`, date: null, status: 'current' },
            { id: makeId('t'), title: 'Payment received', description: 'Settlement credited to your wallet', date: null, status: 'upcoming' },
          ],
        },
        ...prev,
      ]);

      setTransactions((prev) => [
        {
          id: makeId('tx'),
          dealId,
          type: 'IN',
          category: 'Settlement',
          amount: total,
          date: today(),
          status: 'Pending',
          reference: `DEAL-${dealId.slice(2).toUpperCase()}`,
          description: `Settlement pending from ${buyer?.name || 'buyer'} (${listing?.crop || 'Crop'})`,
        },
        {
          id: makeId('tx'),
          dealId,
          type: 'OUT',
          category: 'Commission',
          amount: commission,
          date: today(),
          status: 'Success',
          reference: `CM-${dealId.slice(2).toUpperCase()}`,
          description: `Marketplace commission 1.5% (${listing?.crop || 'Crop'} deal)`,
        },
        ...prev,
      ]);

      return { dealId, total, commission };
    },
    [offers, listings]
  );

  const markDealPaid = useCallback(
    (dealId) => {
      setDeals((prev) =>
        prev.map((deal) =>
          deal.id === dealId
            ? {
                ...deal,
                paymentStatus: 'received',
                timeline: deal.timeline.map((step) =>
                  step.title === 'Payment received'
                    ? { ...step, description: `₹${deal.total.toLocaleString('en-IN')} settled`, status: 'done' }
                    : step
                ),
              }
            : deal
        )
      );

      setTransactions((prev) =>
        prev.map((tx) => {
          if (tx.dealId === dealId && tx.type === 'IN' && tx.status === 'Pending') {
            return { ...tx, status: 'Success', date: today() };
          }
          return tx;
        })
      );
    },
    []
  );

  const wallet = useMemo(() => {
    let balance = 0;
    let pending = 0;
    transactions.forEach((tx) => {
      if (tx.status !== 'Success') {
        if (tx.type === 'IN' && tx.status === 'Pending') pending += tx.amount;
        return;
      }
      balance += tx.type === 'IN' ? tx.amount : -tx.amount;
    });
    return { balance, pending };
  }, [transactions]);

  const offerStats = useMemo(() => {
    const counts = { pending: 0, accepted: 0, rejected: 0, total: offers.length };
    offers.forEach((o) => {
      if (counts[o.status] !== undefined) counts[o.status] += 1;
    });
    return counts;
  }, [offers]);

  const activeListingCount = useMemo(() => listings.filter((l) => l.status === 'active').length, [listings]);

  const value = useMemo(
    () => ({
      listings,
      offers,
      deals,
      transactions,
      companies: COMPANIES,
      buyers: BUYERS,
      wallet,
      offerStats,
      activeListingCount,
      addListing,
      acceptOffer,
      rejectOffer,
      markDealPaid,
      rules: MARKETPLACE_RULES,
    }),
    [
      listings,
      offers,
      deals,
      transactions,
      wallet,
      offerStats,
      activeListingCount,
      addListing,
      acceptOffer,
      rejectOffer,
      markDealPaid,
    ]
  );

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
}