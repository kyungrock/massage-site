import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import MassageShop from '@/lib/models/MassageShop';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const shop = await MassageShop.findById(params.id);
    
    if (!shop) {
      return NextResponse.json(
        { error: 'Shop not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ shop });
  } catch (error) {
    console.error('Error fetching shop:', error);
    return NextResponse.json(
      { error: 'Failed to fetch shop' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    const shop = await MassageShop.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );

    if (!shop) {
      return NextResponse.json(
        { error: 'Shop not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ shop });
  } catch (error) {
    console.error('Error updating shop:', error);
    return NextResponse.json(
      { error: 'Failed to update shop' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const shop = await MassageShop.findByIdAndDelete(params.id);

    if (!shop) {
      return NextResponse.json(
        { error: 'Shop not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Shop deleted successfully' });
  } catch (error) {
    console.error('Error deleting shop:', error);
    return NextResponse.json(
      { error: 'Failed to delete shop' },
      { status: 500 }
    );
  }
}




