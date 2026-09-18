import mongoose from 'mongoose';

const cropListingSchema = new mongoose.Schema(
  {
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    farmerName: {
      type: String,
      required: true,
    },
    cropName: {
      type: String,
      required: true,
      trim: true,
    },
    variety: {
      type: String,
      default: 'Premium Hybrid',
    },
    quantityQuintals: {
      type: Number,
      required: true,
    },
    expectedPricePerQuintal: {
      type: Number,
      required: true,
    },
    location: {
      district: { type: String, default: 'Ludhiana' },
      state: { type: String, default: 'Punjab' },
      mandi: { type: String, default: 'Khanna Mandi' },
    },
    harvestDate: {
      type: Date,
      default: Date.now,
    },
    moisturePercentage: {
      type: Number,
      default: 12,
    },
    qualityGrade: {
      type: String,
      enum: ['Grade A', 'Grade B', 'Grade C'],
      default: 'Grade A',
    },
    status: {
      type: String,
      enum: ['active', 'under_bid', 'deal_finalized', 'sold', 'cancelled'],
      default: 'active',
    },
    images: {
      type: [String],
      default: [],
    },
    bidCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const CropListing = mongoose.model('CropListing', cropListingSchema);
export default CropListing;
