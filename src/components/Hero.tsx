'use client';

import { useState } from 'react';
import { Search, MapPin, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Search:', { searchQuery, selectedLocation });
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            편안한 휴식을 위한
            <span className="text-primary-600 block">최고의 마사지</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            전국 마사지 업체를 쉽게 찾고 예약할 수 있는 플랫폼입니다. 
            지역별, 가격별, 서비스별로 검색하고 예약하세요.
          </p>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Location Search */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">지역을 선택하세요</option>
                    <option value="seoul">서울</option>
                    <option value="busan">부산</option>
                    <option value="daegu">대구</option>
                    <option value="incheon">인천</option>
                    <option value="gwangju">광주</option>
                    <option value="daejeon">대전</option>
                    <option value="ulsan">울산</option>
                  </select>
                </div>

                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="업체명, 서비스로 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Search Button */}
                <Link
                  href={`/shops?search=${encodeURIComponent(searchQuery)}&location=${selectedLocation}`}
                  className="btn-primary flex items-center justify-center space-x-2 py-3"
                >
                  <Search className="w-5 h-5" />
                  <span>검색하기</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
                <p className="text-gray-600">전국 업체</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">10,000+</h3>
                <p className="text-gray-600">월 예약 건수</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
                <p className="text-gray-600">예약 가능</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

