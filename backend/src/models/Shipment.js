import mongoose from 'mongoose';

const shipmentSchema = new mongoose.Schema(
  {
    shipmentNumber: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    carrier: {
      type: String,
      default: 'Kishan Sathi Logistics Express',
    },
    vehicleNumber: {
      type: String,
      default: 'PB-10-CZ-4921',
    },
    driverName: {
      type: String,
      default: 'Gurpreet Singh',
    },
    driverPhone: {
      type: String,
      default: '+91 98140 22334',
    },
    pickupLocation: {
      type: String,
      default: 'Khanna Grain Mandi Yard #4',
    },
    dropoffLocation: {
      type: String,
      default: 'AgriCorp Hub, Kundli, Sonipat, Haryana',
    },
    currentStatus: {
      type: String,
      enum: ['scheduled', 'picked_up', 'in_transit', 'delivered'],
      default: 'in_transit',
    },
    estimatedArrival: {
      type: Date,
      default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
  },
  {
    timestamps: true,
  }
);

export const Shipment = mongoose.model('Shipment', shipmentSchema);
export default Shipment;
