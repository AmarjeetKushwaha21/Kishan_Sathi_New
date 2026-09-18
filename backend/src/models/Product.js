import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['Seeds', 'Fertilizers', 'Crop Protection', 'Farming Equipment', 'Irrigation'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: 'bag',
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    reviewCount: {
      type: Number,
      default: 120,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockCount: {
      type: Number,
      default: 50,
    },
    manufacturer: {
      type: String,
      default: 'National Agro Industries',
    },
    image: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: ['certified', 'high-yield'],
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model('Product', productSchema);
export default Product;
