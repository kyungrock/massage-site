import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import MassageShop from '@/lib/models/MassageShop';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const shopId = searchParams.get('shopId');
    const status = searchParams.get('status');

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (shopId) {
      query.shopId = shopId;
    }

    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('shopId', 'name address phone')
      .sort({ createdAt: -1 });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const { shopId, serviceId, date, time, duration, price, userId, notes } = body;
    
    if (!shopId || !serviceId || !date || !time || !duration || !price || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if shop exists
    const shop = await MassageShop.findById(shopId);
    if (!shop) {
      return NextResponse.json(
        { error: 'Shop not found' },
        { status: 404 }
      );
    }

    // Check for conflicting bookings
    const existingBooking = await Booking.findOne({
      shopId,
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'Time slot already booked' },
        { status: 409 }
      );
    }

    // Create booking
    const booking = new Booking({
      shopId,
      userId,
      serviceId,
      date: new Date(date),
      time,
      duration,
      price,
      notes,
      status: 'pending'
    });

    await booking.save();

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}




