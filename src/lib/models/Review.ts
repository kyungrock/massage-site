import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  shopId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema({
  shopId: {
    type: Schema.Types.ObjectId,
    ref: 'MassageShop',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
}, {
  timestamps: true,
});

// Index for efficient queries
ReviewSchema.index({ shopId: 1, createdAt: -1 });
ReviewSchema.index({ userId: 1 });

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);




