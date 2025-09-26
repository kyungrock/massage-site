import { NextResponse } from 'next/server';
import { seedUsers } from '@/lib/seed';

export async function POST() {
  try {
    await seedUsers();
    return NextResponse.json({ message: '데모 계정이 생성되었습니다.' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: '데모 계정 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}



