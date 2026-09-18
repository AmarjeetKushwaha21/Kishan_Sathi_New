import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    farmerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cropListingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CropListing',
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    quantityQuintals: {
      type: Number,
      required: true,
    },
    ratePerQuintal: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['order_placed', 'dispatched', 'in_transit', 'delivered', 'completed', 'cancelled'],
      default: 'order_placed',
    },
    deliveryAddress: {
      type: String,
      default: 'AgriCorp Warehouse Hub 4, Kundli Logistics Park, Haryana',
    },
    expectedDelivery: {
      type: Date,
      default: () => new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model('Order', orderSchema);
export default Order;
