import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ['escrow_hold', 'farmer_payout', 'store_purchase', 'refund'],
      default: 'escrow_hold',
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'completed',
    },
    paymentMethod: {
      type: String,
      default: 'UPI / NEFT Institutional Escrow',
    },
    utrNumber: {
      type: String,
      default: () => `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`,
    },
  },
  {
    timestamps: true,
  }
);

export const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
