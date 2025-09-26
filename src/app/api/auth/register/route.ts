import { NextRequest, NextResponse } from 'next/server';
import { memoryDB } from '@/lib/memory-db';

export async function POST(request: NextRequest) {
  try {
    const { name, username, email, phone, password } = await request.json();

    // 입력 검증
    if (!name || !username || !email || !phone || !password) {
      return NextResponse.json(
        { error: '모든 필드를 입력해주세요.' },
        { status: 400 }
      );
    }

    if (username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { error: '아이디는 3-20자 사이여야 합니다.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: '비밀번호는 최소 6자 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    // 아이디 중복 확인
    const existingUsername = await memoryDB.users.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { error: '이미 사용 중인 아이디입니다.' },
        { status: 400 }
      );
    }

    // 이메일 중복 확인
    const existingEmail = await memoryDB.users.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { error: '이미 사용 중인 이메일입니다.' },
        { status: 400 }
      );
    }

    // 새 사용자 생성
    const user = await memoryDB.users.create({
      name,
      username,
      email,
      phone,
      password, // 메모리 DB에서는 평문 저장 (실제로는 해시화 필요)
      role: 'user', // 기본적으로 일반 사용자
    });

    return NextResponse.json(
      { message: '회원가입이 완료되었습니다.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
