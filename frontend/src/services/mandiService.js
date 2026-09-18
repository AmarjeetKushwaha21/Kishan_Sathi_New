import httpClient from '@/api/httpClient';

/**
 * Fetch live government mandi prices with state, district, and crop filters
 */
export async function fetchMandiPrices({ state, district, commodity, limit = 50, offset = 0 } = {}) {
  try {
    const params = new URLSearchParams();
    if (state && state !== 'All States') params.append('state', state);
    if (district && district !== 'All Districts') params.append('district', district);
    if (commodity && commodity !== 'All Crops') params.append('commodity', commodity);
    if (limit) params.append('limit', String(limit));
    if (offset) params.append('offset', String(offset));

    const { data } = await httpClient.get(`/mandi/prices?${params.toString()}`);
    return data;
  } catch (error) {
    console.warn('[mandiService] Live API fetch failed:', error.message);
    throw error;
  }
}

/**
 * Fetch available states and popular crops metadata
 */
export async function fetchMandiMeta() {
  try {
    const { data } = await httpClient.get('/mandi/meta');
    return data;
  } catch (error) {
    console.warn('[mandiService] Meta fetch failed:', error.message);
    return {
      states: [
        'All States',
        'Punjab',
        'Haryana',
        'Uttar Pradesh',
        'Madhya Pradesh',
        'Maharashtra',
        'Rajasthan',
        'Gujarat',
        'Bihar',
      ],
      crops: [
        'All Crops',
        'Wheat',
        'Paddy(Common)',
        'Potato',
        'Onion',
        'Tomato',
        'Mustard',
        'Maize',
        'Cotton',
        'Soyabean',
        'Bengal Gram(Gram)',
        'Garlic',
      ],
    };
  }
}

/**
 * Compare crop prices across multiple major states
 */
export async function fetchMandiComparison(commodity = 'Wheat') {
  try {
    const { data } = await httpClient.get(`/mandi/compare?commodity=${encodeURIComponent(commodity)}`);
    return data;
  } catch (error) {
    console.warn('[mandiService] Comparison fetch failed:', error.message);
    throw error;
  }
}

export default {
  fetchMandiPrices,
  fetchMandiMeta,
  fetchMandiComparison,
};
