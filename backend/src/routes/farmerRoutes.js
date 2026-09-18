import express from 'express';
import {
  getFarmerDashboard,
  getFarmerProfile,
  getFarmerCrops,
  addCropListing,
} from '../controllers/farmerController.js';
import { protect } from '../middleware/authMiddleware.js';
import { farmerOnly } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Strict Farmer-Only Gate: requires valid token and farmer role
router.use(protect, farmerOnly);

router.get('/dashboard', getFarmerDashboard);
router.get('/profile', getFarmerProfile);
router.get('/crops', getFarmerCrops);
router.post('/crops', addCropListing);

export default router;
