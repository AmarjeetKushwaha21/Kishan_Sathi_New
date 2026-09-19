// Agriculture Store Service (Online E-Commerce Abstraction)
// Ready to swap to real backend APIs: GET /api/products, GET /api/products/:id, etc.

import { PRODUCTS, STORE_CATEGORIES, DELIVERY } from '@/data/mock/store';

export async function getOnlineProducts() {
  return Promise.resolve([...PRODUCTS]);
}

export async function getProductById(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  return Promise.resolve(product || null);
}

export async function searchOnlineProducts(query = '') {
  const q = query.trim().toLowerCase();
  if (!q) return Promise.resolve([...PRODUCTS]);
  const results = PRODUCTS.filter((p) => {
    const haystack = `${p.name} ${p.brand} ${p.categoryKey} ${p.description}`.toLowerCase();
    return haystack.includes(q);
  });
  return Promise.resolve(results);
}

export async function filterOnlineProducts({ category = 'all', search = '', priceRange = 'all', sort = 'featured', inStock = false, organic = false }) {
  let list = [...PRODUCTS];

  if (category && category !== 'all') {
    list = list.filter((p) => p.categoryKey === category);
  }

  if (search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter((p) => {
      const haystack = `${p.name} ${p.brand} ${p.categoryKey} ${p.description}`.toLowerCase();
      return haystack.includes(q);
    });
  }

  if (inStock) {
    list = list.filter((p) => p.stock > 0);
  }

  if (organic) {
    list = list.filter((p) => p.organic);
  }

  if (priceRange === 'under-500') list = list.filter((p) => p.price <= 500);
  else if (priceRange === '500-1500') list = list.filter((p) => p.price >= 500 && p.price <= 1500);
  else if (priceRange === '1500-5000') list = list.filter((p) => p.price >= 1500 && p.price <= 5000);
  else if (priceRange === '5000+') list = list.filter((p) => p.price >= 5000);

  if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating);
  else if (sort === 'popular') list.sort((a, b) => b.reviews - a.reviews);

  return Promise.resolve(list);
}

export function getStoreCategories() {
  return STORE_CATEGORIES;
}

export function getDeliveryPolicy() {
  return DELIVERY;
}

export default {
  getOnlineProducts,
  getProductById,
  searchOnlineProducts,
  filterOnlineProducts,
  getStoreCategories,
  getDeliveryPolicy,
};
