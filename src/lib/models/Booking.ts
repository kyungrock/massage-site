import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  shopId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  serviceId: string;
  date: Date;
  time: string;
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema: Schema = new Schema({
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
  serviceId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
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
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  notes: {
    type: String,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
BookingSchema.index({ shopId: 1, date: 1 });
BookingSchema.index({ userId: 1, date: 1 });
BookingSchema.index({ status: 1 });

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema);




