import Farmer from '../models/Farmer.js';
import CropListing from '../models/CropListing.js';
import Order from '../models/Order.js';
import { isDbConnected } from '../config/db.js';

/**
 * Get Farmer Dashboard Overview / Stats
 * GET /api/farmer/dashboard
 */
export async function getFarmerDashboard(req, res, next) {
  try {
    const farmerId = req.user.id || req.user._id;

    if (isDbConnected()) {
      const [listings, orders, farmerProfile] = await Promise.all([
        CropListing.find({ farmerId }).lean(),
        Order.find({ farmerId }).lean(),
        Farmer.findOne({ userId: farmerId }).lean(),
      ]);

      const totalEarnings = orders
        .filter((o) => o.paymentStatus === 'paid')
        .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

      return res.status(200).json({
        success: true,
        stats: {
          activeListings: listings.length,
          totalOrders: orders.length,
          totalEarnings,
          profileCompletion: farmerProfile ? 100 : 80,
        },
        listings,
        orders,
        profile: farmerProfile,
      });
    }

    // Standalone fallback mock dashboard data
    res.status(200).json({
      success: true,
      stats: {
        activeListings: 4,
        totalOrders: 12,
        totalEarnings: 345000,
        profileCompletion: 95,
      },
      message: 'Farmer dashboard retrieved successfully',
      user: {
        id: farmerId,
        name: req.user.name,
        role: 'farmer',
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get Farmer Profile
 * GET /api/farmer/profile
 */
export async function getFarmerProfile(req, res, next) {
  try {
    const farmerId = req.user.id || req.user._id;

    const profile = await Farmer.findOne({
      $or: [{ user: farmerId }, { userId: farmerId }],
    });

    return res.status(200).json({
      success: true,
      user: req.user,
      farmerProfile: profile,
      profile,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get Crop Listings
 * GET /api/farmer/crops
 */
export async function getFarmerCrops(req, res, next) {
  try {
    const farmerId = req.user.id || req.user._id;

    if (isDbConnected()) {
      const crops = await CropListing.find({ farmerId });
      return res.status(200).json({
        success: true,
        count: crops.length,
        crops,
      });
    }

    res.status(200).json({
      success: true,
      count: 3,
      crops: [
        { id: 'CROP-1', name: 'Premium Basmati Rice 1121', quantity: '50 Quintals', expectedPrice: 4200, status: 'Active' },
        { id: 'CROP-2', name: 'Organic Sharbati Wheat', quantity: '120 Quintals', expectedPrice: 2850, status: 'Active' },
        { id: 'CROP-3', name: 'Mustard Seeds (High Yield)', quantity: '35 Quintals', expectedPrice: 5600, status: 'Pending Bids' },
      ],
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Add New Crop Listing
 * POST /api/farmer/crops
 */
export async function addCropListing(req, res, next) {
  try {
    const farmerId = req.user.id || req.user._id;
    const { cropName, category, quantity, unit, expectedPrice, harvestDate } = req.body;

    if (!cropName || !quantity || !expectedPrice) {
      return res.status(400).json({
        success: false,
        message: 'Crop name, quantity, and expected price are required',
      });
    }

    if (isDbConnected()) {
      const newCrop = await CropListing.create({
        farmerId,
        cropName,
        category: category || 'Cereals',
        quantity,
        unit: unit || 'Quintal',
        expectedPrice,
        harvestDate: harvestDate || new Date(),
      });

      return res.status(201).json({
        success: true,
        message: 'Crop listing created successfully',
        crop: newCrop,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Crop listing created successfully (demo session)',
      crop: {
        id: `CROP-${Date.now()}`,
        farmerId,
        cropName,
        quantity,
        expectedPrice,
        status: 'Active',
      },
    });
  } catch (error) {
    next(error);
  }
}

export default {
  getFarmerDashboard,
  getFarmerProfile,
  getFarmerCrops,
  addCropListing,
};
