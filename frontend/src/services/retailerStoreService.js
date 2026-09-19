// Retailer Discovery & Price Comparison Service
// Ready to swap to backend APIs: GET /api/retailers, GET /api/retailer-products, etc.

import { RETAILER_STORES, CITIES, CITY_AREAS } from '@/data/mock/retailerStores';
import { RETAILER_PRODUCTS } from '@/data/mock/retailerProducts';

export function getCities() {
  return CITIES;
}

export function getCityAreas(city = 'Ghaziabad') {
  return CITY_AREAS[city] || ['All Areas'];
}

export async function getRetailerStores({ city = 'Ghaziabad', area = 'All Areas', search = '' } = {}) {
  let stores = RETAILER_STORES.filter((s) => s.city.toLowerCase() === city.toLowerCase());

  if (area && area !== 'All Areas') {
    stores = stores.filter((s) => s.area.toLowerCase() === area.toLowerCase());
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    stores = stores.filter((s) =>
      s.name.toLowerCase().includes(q) ||
      s.area.toLowerCase().includes(q) ||
      s.categories.some((cat) => cat.toLowerCase().includes(q))
    );
  }

  return Promise.resolve(stores);
}

export async function getRetailerStoreById(id) {
  const store = RETAILER_STORES.find((s) => s.id === id);
  if (!store) return Promise.resolve(null);
  const products = RETAILER_PRODUCTS.filter((p) => p.storeId === id);
  return Promise.resolve({ ...store, products });
}

export async function searchRetailerProducts({ query = '', city = 'Ghaziabad', area = 'All Areas', category = 'All' } = {}) {
  let list = RETAILER_PRODUCTS.filter((p) => p.city.toLowerCase() === city.toLowerCase());

  if (area && area !== 'All Areas') {
    list = list.filter((p) => p.area.toLowerCase() === area.toLowerCase());
  }

  if (category && category !== 'All') {
    list = list.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (query.trim()) {
    const q = query.trim().toLowerCase();
    list = list.filter((p) =>
      p.productName.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.variety.toLowerCase().includes(q) ||
      p.storeName.toLowerCase().includes(q) ||
      p.area.toLowerCase().includes(q)
    );
  }

  return Promise.resolve(list);
}

export async function getProductsByStore(storeId) {
  const items = RETAILER_PRODUCTS.filter((p) => p.storeId === storeId);
  return Promise.resolve(items);
}

export async function compareProductPrices(productName = 'Mustard Seed', city = 'Ghaziabad') {
  const q = productName.trim().toLowerCase();
  const matched = RETAILER_PRODUCTS.filter(
    (p) => p.city.toLowerCase() === city.toLowerCase() && p.productName.toLowerCase().includes(q)
  );

  return Promise.resolve(matched.sort((a, b) => a.price - b.price));
}

export default {
  getCities,
  getCityAreas,
  getRetailerStores,
  getRetailerStoreById,
  searchRetailerProducts,
  getProductsByStore,
  compareProductPrices,
};
