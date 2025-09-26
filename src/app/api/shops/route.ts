import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MassageShop from '@/lib/models/MassageShop';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const district = searchParams.get('district');
    const category = searchParams.get('category');
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const rating = searchParams.get('rating');
    const amenities = searchParams.get('amenities');
    const search = searchParams.get('search');

    // Build query
    let query: any = { isActive: true };

    if (city) {
      query.city = new RegExp(city, 'i');
    }

    if (district) {
      query.district = new RegExp(district, 'i');
    }

    if (priceMin || priceMax) {
      query['priceRange.min'] = {};
      if (priceMin) query['priceRange.min'].$gte = Number(priceMin);
      if (priceMax) query['priceRange.max'] = { $lte: Number(priceMax) };
    }

    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    if (amenities) {
      const amenityList = amenities.split(',');
      query.amenities = { $in: amenityList };
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') },
        { 'services.name': new RegExp(search, 'i') },
      ];
    }

    if (category) {
      query['services.category'] = category;
    }

    const shops = await MassageShop.find(query)
      .sort({ rating: -1, reviewCount: -1 })
      .limit(50);

    return NextResponse.json({ shops });
  } catch (error) {
    console.error('Error fetching shops:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shops' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const shop = new MassageShop(body);
    await shop.save();

    return NextResponse.json({ shop }, { status: 201 });
  } catch (error) {
    console.error('Error creating shop:', error);
    return NextResponse.json(
      { error: 'Failed to create shop' },
      { status: 500 }
    );
  }
}




