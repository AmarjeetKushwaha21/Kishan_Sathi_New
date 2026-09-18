import mongoose from 'mongoose';

const farmerSchema = new mongoose.Schema(
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
    fullName: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    state: {
      type: String,
      default: 'Punjab',
      trim: true,
    },
    district: {
      type: String,
      default: 'Ludhiana',
      trim: true,
    },
    village: {
      type: String,
      default: 'Samrala',
      trim: true,
    },
    pinCode: {
      type: String,
      default: '',
      trim: true,
    },
    farmSize: {
      type: String,
      default: '5.5 Acres',
    },
    farmLocation: {
      type: String,
      default: '',
    },
    soilType: {
      type: String,
      default: 'Alluvial Loam',
    },
    crops: {
      type: [String],
      default: ['Wheat', 'Basmati Rice', 'Mustard'],
    },
    profileImage: {
      type: String,
      default: '',
    },
    // Supporting existing dashboard analytics
    totalLandAcres: {
      type: Number,
      default: 5.5,
    },
    primaryCrops: {
      type: [String],
      default: ['Wheat', 'Basmati Rice', 'Mustard'],
    },
    kisanCreditCardNo: {
      type: String,
      default: 'KCC-9876-5432-1098',
    },
  },
  {
    timestamps: true,
  }
);

// Keep userId and user in sync
farmerSchema.pre('save', function (next) {
  if (this.user && !this.userId) {
    this.userId = this.user;
  }
  if (this.userId && !this.user) {
    this.user = this.userId;
  }
  next();
});

export const Farmer = mongoose.model('Farmer', farmerSchema);
export default Farmer;

