'use client';

import { Star, MapPin, Clock, Users } from 'lucide-react';
import Link from 'next/link';

// Mock data - 실제로는 API에서 가져올 데이터
const featuredShops = [
  {
    id: '1',
    name: '힐링 스파',
    description: '프리미엄 아로마 마사지와 스파 서비스를 제공하는 힐링 공간',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop',
    rating: 4.8,
    reviewCount: 127,
    location: '강남구',
    priceRange: { min: 80000, max: 150000 },
    services: ['아로마 마사지', '스파 패키지', '얼굴 관리'],
  },
  {
    id: '2',
    name: '발마사지 전문점',
    description: '전문 발 마사지사가 제공하는 프리미엄 발 관리 서비스',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    rating: 4.6,
    reviewCount: 89,
    location: '홍대',
    priceRange: { min: 50000, max: 80000 },
    services: ['발 마사지', '족욕', '발 관리'],
  },
  {
    id: '3',
    name: '전통 한방 마사지',
    description: '한의학 기반의 전통 마사지로 몸의 균형을 맞춰드립니다',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=300&fit=crop',
    rating: 4.9,
    reviewCount: 203,
    location: '명동',
    priceRange: { min: 60000, max: 120000 },
    services: ['한방 마사지', '침술', '부항'],
  },
];

export default function FeaturedShops() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            추천 마사지 업체
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            고객들이 가장 많이 선택한 인기 업체들을 만나보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredShops.map((shop) => (
            <Link key={shop.id} href={`/shops/${shop.id}`}>
              <div className="card hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="relative mb-4">
                  <img
                    src={shop.image}
                    alt={shop.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{shop.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {shop.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{shop.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">
                    {shop.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{shop.reviewCount}개 리뷰</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-primary-600">
                        {shop.priceRange.min.toLocaleString()}원~
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {shop.services.slice(0, 2).map((service, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                    {shop.services.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        +{shop.services.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shops" className="btn-primary">
            모든 업체 보기
          </Link>
        </div>
      </div>
    </section>
  );
}


