import mongoose, { Schema, Document } from 'mongoose';

export interface IMassageShop extends Document {
  name: string;
  description: string;
  address: string;
  city: string;
  district: string;
  phone: string;
  email: string;
  website?: string;
  images: string[];
  services: {
    name: string;
    description: string;
    duration: number;
    price: number;
    category: 'massage' | 'spa' | 'therapy' | 'beauty';
  }[];
  amenities: string[];
  operatingHours: {
    monday: { open: string; close: string }[];
    tuesday: { open: string; close: string }[];
    wednesday: { open: string; close: string }[];
    thursday: { open: string; close: string }[];
    friday: { open: string; close: string }[];
    saturday: { open: string; close: string }[];
    sunday: { open: string; close: string }[];
  };
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  reviewCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MassageShopSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  images: [{
    type: String,
  }],
  services: [{
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ['massage', 'spa', 'therapy', 'beauty'],
      required: true,
    },
  }],
  amenities: [{
    type: String,
  }],
  operatingHours: {
    monday: [{ open: String, close: String }],
    tuesday: [{ open: String, close: String }],
    wednesday: [{ open: String, close: String }],
    thursday: [{ open: String, close: String }],
    friday: [{ open: String, close: String }],
    saturday: [{ open: String, close: String }],
    sunday: [{ open: String, close: String }],
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  priceRange: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Index for search functionality
MassageShopSchema.index({ city: 1, district: 1 });
MassageShopSchema.index({ location: '2dsphere' });
MassageShopSchema.index({ rating: -1 });
MassageShopSchema.index({ 'priceRange.min': 1, 'priceRange.max': 1 });

export default mongoose.models.MassageShop || mongoose.model<IMassageShop>('MassageShop', MassageShopSchema);




