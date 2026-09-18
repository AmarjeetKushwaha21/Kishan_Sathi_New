import mongoose from 'mongoose';

const governmentSchemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortCode: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      default: 'Financial Support',
    },
    level: {
      type: String,
      enum: ['central', 'state'],
      default: 'central',
    },
    state: {
      type: String,
      default: 'All India',
    },
    description: {
      type: String,
      required: true,
    },
    benefits: {
      type: [String],
      default: [],
    },
    eligibility: {
      type: [String],
      default: [],
    },
    documentsRequired: {
      type: [String],
      default: ['Aadhaar Card', 'Land Ownership Records', 'Bank Passbook'],
    },
    applicationUrl: {
      type: String,
      default: 'https://pmkisan.gov.in',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const GovernmentScheme = mongoose.model('GovernmentScheme', governmentSchemeSchema);
export default GovernmentScheme;
