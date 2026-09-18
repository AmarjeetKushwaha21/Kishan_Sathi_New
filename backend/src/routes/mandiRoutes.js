import express from 'express';
import {
  getMandiPrices,
  getMandiMeta,
  getMandiComparison,
} from '../controllers/mandiController.js';

const router = express.Router();

// Live Mandi Prices list with filters
router.get('/prices', getMandiPrices);

// States and Crops metadata
router.get('/meta', getMandiMeta);

// Inter-state comparison for commodities
router.get('/compare', getMandiComparison);

export default router;
