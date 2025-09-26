'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Search, Menu, X, MapPin, User, Calendar, LogOut } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">마사지예약</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/shops" className="text-gray-700 hover:text-primary-600 transition-colors">
              업체 찾기
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-primary-600 transition-colors">
              서비스
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              소개
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              문의
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="지역, 업체명으로 검색..."
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            {/* 사용자 메뉴 */}
            {session ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">안녕하세요, {session.user.name}님</span>
                {session.user.role === 'admin' && (
                  <Link href="/admin" className="btn-secondary">
                    관리자
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="btn-secondary flex items-center space-x-1"
                >
                  <LogOut className="w-4 h-4" />
                  <span>로그아웃</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin" className="btn-secondary">
                  로그인
                </Link>
                <Link href="/auth/signup" className="btn-primary">
                  회원가입
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/shops" 
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                업체 찾기
              </Link>
              <Link 
                href="/services" 
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                서비스
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                소개
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                문의
              </Link>
              <div className="pt-4 border-t">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="지역, 업체명으로 검색..."
                    className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <Link href="/admin" className="btn-secondary w-full text-center">
                  관리자
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

