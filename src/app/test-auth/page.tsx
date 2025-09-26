'use client';

import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function TestAuthPage() {
  const { data: session, status } = useSession();
  const [credentials, setCredentials] = useState({
    username: 'admin',
    password: 'admin123',
  });

  const handleLogin = async () => {
    try {
      const result = await signIn('credentials', {
        username: credentials.username,
        password: credentials.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('로그인 실패: ' + result.error);
      } else {
        toast.success('로그인 성공!');
      }
    } catch (error) {
      toast.error('로그인 중 오류 발생');
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const createTestUser = async () => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: '테스트사용자',
          username: 'testuser',
          email: 'test@example.com',
          phone: '010-9999-9999',
          password: 'test123',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('테스트 사용자 생성 성공!');
      } else {
        toast.error('테스트 사용자 생성 실패: ' + data.error);
      }
    } catch (error) {
      toast.error('테스트 사용자 생성 중 오류 발생');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">인증 테스트 페이지</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 로그인 테스트 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">로그인 테스트</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  아이디
                </label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <button
                onClick={handleLogin}
                className="w-full btn-primary"
              >
                로그인 테스트
              </button>
            </div>
          </div>

          {/* 세션 정보 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">세션 정보</h2>
            
            <div className="space-y-4">
              <div>
                <strong>상태:</strong> {status}
              </div>
              
              {session ? (
                <div className="space-y-2">
                  <div><strong>이름:</strong> {session.user.name}</div>
                  <div><strong>아이디:</strong> {session.user.username}</div>
                  <div><strong>이메일:</strong> {session.user.email}</div>
                  <div><strong>권한:</strong> {session.user.role}</div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full btn-secondary mt-4"
                  >
                    로그아웃
                  </button>
                </div>
              ) : (
                <p className="text-gray-600">로그인되지 않음</p>
              )}
            </div>
          </div>

          {/* 테스트 사용자 생성 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">테스트 사용자 생성</h2>
            
            <button
              onClick={createTestUser}
              className="w-full btn-primary"
            >
              테스트 사용자 생성
            </button>
          </div>

          {/* 데모 계정 정보 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">데모 계정</h2>
            
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-gray-50 rounded">
                <strong>관리자:</strong><br />
                아이디: admin<br />
                비밀번호: admin123
              </div>
              
              <div className="p-3 bg-gray-50 rounded">
                <strong>일반사용자:</strong><br />
                아이디: user<br />
                비밀번호: user123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



