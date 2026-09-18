import express from 'express';
import {
  getCompanyDashboard,
  getCompanyProfile,
  getCompanyBids,
  placeBid,
} from '../controllers/companyController.js';
import { protect } from '../middleware/authMiddleware.js';
import { companyOnly } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Strict Company-Only Gate: requires valid token and company role
router.use(protect, companyOnly);

router.get('/dashboard', getCompanyDashboard);
router.get('/profile', getCompanyProfile);
router.get('/bids', getCompanyBids);
router.post('/bids', placeBid);

export default router;
