import cropListingsData from '../data/cropListings.json';

export const cropService = {
  async getCrops(filters = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...cropListingsData];
        if (filters.search) {
          const s = filters.search.toLowerCase();
          results = results.filter(
            (c) =>
              c.crop.toLowerCase().includes(s) ||
              c.farmer.toLowerCase().includes(s) ||
              c.location.toLowerCase().includes(s)
          );
        }
        if (filters.state && filters.state !== 'All') {
          results = results.filter((c) => c.state === filters.state);
        }
        if (filters.cropType && filters.cropType !== 'All') {
          results = results.filter((c) => c.crop.toLowerCase().includes(filters.cropType.toLowerCase()));
        }
        if (filters.maxPrice) {
          results = results.filter((c) => c.expectedPrice <= Number(filters.maxPrice));
        }
        if (filters.sortBy === 'price_asc') {
          results.sort((a, b) => a.expectedPrice - b.expectedPrice);
        } else if (filters.sortBy === 'price_desc') {
          results.sort((a, b) => b.expectedPrice - a.expectedPrice);
        } else if (filters.sortBy === 'quantity_desc') {
          results.sort((a, b) => b.quantity - a.quantity);
        }
        resolve(results);
      }, 50);
    });
  },

  async getCropById(id) {
    return new Promise((resolve) => {
      const found = cropListingsData.find((c) => c.id === id) || null;
      setTimeout(() => resolve(found), 50);
    });
  },
};

export default cropService;
