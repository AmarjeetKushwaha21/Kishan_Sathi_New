import initialBids from '../data/bids.json';

const STORAGE_KEY = 'ks_company_bids';

function readStoredBids() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : initialBids;
  } catch {
    return initialBids;
  }
}

export const bidService = {
  async getBids() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...readStoredBids()]), 50);
    });
  },

  async placeBid({ cropId, cropName, farmerName, location, bidAmount, quantity, unit = 'Quintal' }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const current = readStoredBids();
        const newBid = {
          id: `BID-${Math.floor(500 + Math.random() * 500)}`,
          crop: cropName,
          bidAmount: Number(bidAmount),
          unit,
          quantity: Number(quantity),
          totalValue: `₹${(Number(bidAmount) * Number(quantity)).toLocaleString('en-IN')}`,
          farmer: farmerName,
          location,
          status: 'Active',
          date: new Date().toISOString().split('T')[0],
          validUntil: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        };
        const updated = [newBid, ...current];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve(newBid);
      }, 100);
    });
  },

  async cancelBid(bidId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const current = readStoredBids();
        const updated = current.map((b) => (b.id === bidId ? { ...b, status: 'Cancelled' } : b));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve(true);
      }, 80);
    });
  },
};

export default bidService;
