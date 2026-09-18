import mongoose from 'mongoose';

const bidSchema = new mongoose.Schema(
  {
    cropListingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CropListing',
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    offeredPricePerQuintal: {
      type: Number,
      required: true,
    },
    requestedQuantityQuintals: {
      type: Number,
      required: true,
    },
    paymentTerms: {
      type: String,
      default: 'Instant Escrow on Dispatch',
    },
    proposedPickupDate: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
      default: 'pending',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Bid = mongoose.model('Bid', bidSchema);
export default Bid;
