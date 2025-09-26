import connectDB from './mongodb';
import User from './models/User';
import bcrypt from 'bcryptjs';

export async function seedUsers() {
  try {
    await connectDB();

    // 기존 사용자 삭제 (개발용)
    await User.deleteMany({});

    // 관리자 계정 생성
    const adminUser = new User({
      name: '관리자',
      username: 'admin',
      email: 'admin@example.com',
      phone: '010-0000-0000',
      password: 'admin123',
      role: 'admin',
    });

    // 일반 사용자 계정 생성
    const regularUser = new User({
      name: '일반사용자',
      username: 'user',
      email: 'user@example.com',
      phone: '010-1111-1111',
      password: 'user123',
      role: 'user',
    });

    await adminUser.save();
    await regularUser.save();

    console.log('데모 계정이 생성되었습니다:');
    console.log('관리자: admin / admin123');
    console.log('일반사용자: user / user123');
  } catch (error) {
    console.error('Seed error:', error);
  }
}
