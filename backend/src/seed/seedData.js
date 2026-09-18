import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Farmer from '../models/Farmer.js';
import Company from '../models/Company.js';
import CropListing from '../models/CropListing.js';
import Bid from '../models/Bid.js';
import { connectDB } from '../config/db.js';

dotenv.config();

async function seed() {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await connectDB();

    console.log('[Seed] Ensuring demo Farmer...');
    let farmerUser = await User.findOne({
      $or: [{ phone: '9876543210' }, { email: 'farmer@kishansathi.demo' }],
    });

    if (!farmerUser) {
      farmerUser = await User.create({
        name: 'Ramesh Patel',
        phone: '9876543210',
        email: 'farmer@kishansathi.demo',
        password: 'Sathi@123',
        role: 'farmer',
        avatarColor: '#16a34a',
      });
      console.log(`✅ [Seed] Created demo farmer user: ${farmerUser.email} / ${farmerUser.phone}`);
    } else {
      farmerUser.password = 'Sathi@123';
      farmerUser.role = 'farmer';
      await farmerUser.save();
      console.log(`ℹ️ [Seed] Updated demo farmer user password`);
    }

    let farmerProfile = await Farmer.findOne({
      $or: [{ user: farmerUser._id }, { userId: farmerUser._id }],
    });
    if (!farmerProfile) {
      farmerProfile = await Farmer.create({
        user: farmerUser._id,
        userId: farmerUser._id,
        fullName: 'Ramesh Patel',
        phone: '9876543210',
        email: 'farmer@kishansathi.demo',
        state: 'Punjab',
        district: 'Ludhiana',
        village: 'Khanna',
        farmSize: '5.5 Acres',
        primaryCrops: ['Basmati Rice', 'Sharbati Wheat', 'Mustard'],
      });
      console.log(`✅ [Seed] Created demo farmer profile`);
    }

    console.log('[Seed] Ensuring demo Company...');
    let companyUser = await User.findOne({ email: 'company@kishansathi.demo' });
    if (!companyUser) {
      companyUser = await User.create({
        name: 'AgriCorp Procurement Team',
        email: 'company@kishansathi.demo',
        phone: '+91 98765 00001',
        password: 'company123',
        role: 'company',
        avatarColor: '#15803d',
      });
      console.log(`✅ [Seed] Created demo company user: ${companyUser.email}`);
    } else {
      companyUser.password = 'company123';
      companyUser.role = 'company';
      await companyUser.save();
      console.log(`ℹ️ [Seed] Updated demo company user password`);
    }

    let companyProfile = await Company.findOne({
      $or: [{ user: companyUser._id }, { userId: companyUser._id }],
    });
    if (!companyProfile) {
      companyProfile = await Company.create({
        user: companyUser._id,
        userId: companyUser._id,
        companyName: 'AgriCorp Global B2B Private Limited',
        businessEmail: 'company@kishansathi.demo',
        phone: '+91 98765 00001',
        gstin: '07AAAAA0000A1Z5',
        companyType: 'Food Processing & Agricultural Export',
        state: 'Delhi',
        city: 'New Delhi',
        isVerified: true,
      });
      console.log(`✅ [Seed] Created demo company profile`);
    }

    console.log('[Seed] Creating sample crop listings for farmer...');
    const crop1 = await CropListing.create({
      farmerId: farmerUser._id,
      cropName: 'Basmati Rice 1121 Export Grade',
      category: 'Cereals',
      quantity: 50,
      unit: 'Quintal',
      expectedPrice: 4200,
      status: 'active',
      location: { state: 'Punjab', district: 'Ludhiana' },
      description: 'Single origin organic basmati rice with moisture content under 12%.',
    });

    const crop2 = await CropListing.create({
      farmerId: farmerUser._id,
      cropName: 'Sharbati Wheat Grade A',
      category: 'Cereals',
      quantity: 120,
      unit: 'Quintal',
      expectedPrice: 2850,
      status: 'active',
      location: { state: 'Punjab', district: 'Ludhiana' },
      description: 'Golden high protein wheat suitable for direct milling.',
    });

    console.log('[Seed] Creating sample company bid...');
    await Bid.create({
      companyId: companyUser._id,
      listingId: crop1._id,
      farmerId: farmerUser._id,
      bidAmount: 4350,
      quantityOffered: 50,
      message: 'Immediate bulk procurement ready for factory dispatch with standard testing.',
      status: 'pending',
    });

    console.log('----------------------------------------------------');
    console.log('✅ Kishan Sathi Demo Data Seeded Successfully!');
    console.log('----------------------------------------------------');
    console.log('🌾 Farmer Credentials:');
    console.log('   Phone:    9876543210');
    console.log('   Password: Sathi@123');
    console.log('🏢 Company Credentials:');
    console.log('   Email:    company@kishansathi.demo');
    console.log('   Password: company123');
    console.log('----------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
}

seed();
