import mongoose from 'mongoose';

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    businessEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    companyType: {
      type: String,
      trim: true,
      default: 'Agri-Procurement & Processing',
    },
    gstin: {
      type: String,
      trim: true,
      default: '',
    },
    state: {
      type: String,
      trim: true,
      default: '',
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    pinCode: {
      type: String,
      trim: true,
      default: '',
    },
    address: {
      type: String,
      trim: true,
      default: '',
    },
    companyLogo: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    // Keep backwards-compatibility fields for dashboard analytics
    registrationNo: {
      type: String,
      default: 'CIN-U01100DL2021PTC384920',
    },
    sectors: {
      type: [String],
      default: ['Grains & Cereals', 'Pulses & Legumes', 'Spices & Condiments', 'Oilseeds'],
    },
    operatingStates: {
      type: [String],
      default: ['Punjab', 'Haryana', 'Madhya Pradesh', 'Rajasthan', 'Uttar Pradesh'],
    },
    procurementBudgetLakhs: {
      type: Number,
      default: 250,
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'verified',
    },
  },
  {
    timestamps: true,
  }
);

// Keep userId and user in sync
companySchema.pre('save', function (next) {
  if (this.user && !this.userId) {
    this.userId = this.user;
  }
  if (this.userId && !this.user) {
    this.user = this.userId;
  }
  next();
});

export const Company = mongoose.model('Company', companySchema);
export default Company;

