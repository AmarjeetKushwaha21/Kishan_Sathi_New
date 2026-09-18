import {
  INDIAN_STATES,
  POPULAR_CROPS,
  fetchGovMandiPrices,
  compareCommodityAcrossStates,
} from '../services/mandiGovService.js';

/**
 * Get live government mandi prices with state, district, and crop filtering
 * GET /api/mandi/prices?state=...&district=...&commodity=...
 */
export async function getMandiPrices(req, res, next) {
  try {
    const { state, district, commodity, limit = 60, offset = 0 } = req.query;

    const data = await fetchGovMandiPrices({
      state,
      district,
      commodity,
      limit: Number(limit) || 60,
      offset: Number(offset) || 0,
    });

    res.status(200).json({
      success: true,
      ...data,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get available states and crops list
 * GET /api/mandi/meta
 */
export async function getMandiMeta(req, res) {
  res.status(200).json({
    success: true,
    states: INDIAN_STATES,
    crops: POPULAR_CROPS,
  });
}

/**
 * Inter-state comparison for a specific crop
 * GET /api/mandi/compare?commodity=Wheat
 */
export async function getMandiComparison(req, res, next) {
  try {
    const commodity = req.query.commodity || 'Wheat';
    const comparison = await compareCommodityAcrossStates(commodity);

    res.status(200).json({
      success: true,
      commodity,
      comparison,
    });
  } catch (error) {
    next(error);
  }
}

export default {
  getMandiPrices,
  getMandiMeta,
  getMandiComparison,
};
