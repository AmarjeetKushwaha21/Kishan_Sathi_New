import Company from '../models/Company.js';
import Bid from '../models/Bid.js';
import CropListing from '../models/CropListing.js';
import Order from '../models/Order.js';
import { isDbConnected } from '../config/db.js';

/**
 * Get Company Dashboard Overview
 * GET /api/company/dashboard
 */
export async function getCompanyDashboard(req, res, next) {
  try {
    const companyId = req.user.id || req.user._id;

    if (isDbConnected()) {
      const [bids, orders, companyProfile] = await Promise.all([
        Bid.find({ companyId }).lean(),
        Order.find({ companyId }).lean(),
        Company.findOne({ userId: companyId }).lean(),
      ]);

      const totalProcuredAmount = orders
        .filter((o) => o.status === 'delivered')
        .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

      return res.status(200).json({
        success: true,
        stats: {
          activeBids: bids.filter((b) => b.status === 'pending').length,
          contractsCompleted: orders.length,
          totalProcuredValue: totalProcuredAmount,
          verifiedStatus: companyProfile?.verificationStatus || 'Verified',
        },
        bids,
        orders,
        profile: companyProfile,
      });
    }

    // Fallback mock company dashboard
    res.status(200).json({
      success: true,
      stats: {
        activeBids: 8,
        contractsCompleted: 42,
        totalProcuredValue: 12500000,
        verifiedStatus: 'Verified Corporate Buyer',
      },
      message: 'Company dashboard retrieved successfully',
      user: {
        id: companyId,
        name: req.user.name,
        companyName: req.user.companyName || 'AgriCorp Global B2B Private Limited',
        role: 'company',
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get Company Profile
 * GET /api/company/profile
 */
export async function getCompanyProfile(req, res, next) {
  try {
    const companyId = req.user.id || req.user._id;

    const profile = await Company.findOne({
      $or: [{ user: companyId }, { userId: companyId }],
    });

    return res.status(200).json({
      success: true,
      user: req.user,
      companyProfile: profile,
      profile,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get Company Bids
 * GET /api/company/bids
 */
export async function getCompanyBids(req, res, next) {
  try {
    const companyId = req.user.id || req.user._id;

    if (isDbConnected()) {
      const bids = await Bid.find({ companyId }).populate('listingId');
      return res.status(200).json({
        success: true,
        count: bids.length,
        bids,
      });
    }

    res.status(200).json({
      success: true,
      count: 2,
      bids: [
        {
          id: 'BID-101',
          crop: 'Basmati Rice 1121',
          farmerName: 'Ramesh Patel',
          offeredPrice: 4350,
          quantity: '50 Quintals',
          status: 'Accepted',
        },
        {
          id: 'BID-102',
          crop: 'Organic Sharbati Wheat',
          farmerName: 'Harpreet Singh',
          offeredPrice: 2900,
          quantity: '100 Quintals',
          status: 'Under Negotiation',
        },
      ],
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Place a Bid on Crop Listing
 * POST /api/company/bids
 */
export async function placeBid(req, res, next) {
  try {
    const companyId = req.user.id || req.user._id;
    const { listingId, bidAmount, quantityOffered, message } = req.body;

    if (!bidAmount || !quantityOffered) {
      return res.status(400).json({
        success: false,
        message: 'Bid amount and quantity are required',
      });
    }

    if (isDbConnected()) {
      const newBid = await Bid.create({
        companyId,
        listingId,
        bidAmount,
        quantityOffered,
        message: message || '',
        status: 'pending',
      });

      return res.status(201).json({
        success: true,
        message: 'Bid placed successfully',
        bid: newBid,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Bid submitted successfully to the farmer',
      bid: {
        id: `BID-${Date.now()}`,
        companyId,
        bidAmount,
        quantityOffered,
        status: 'pending',
      },
    });
  } catch (error) {
    next(error);
  }
}

export default {
  getCompanyDashboard,
  getCompanyProfile,
  getCompanyBids,
  placeBid,
};
