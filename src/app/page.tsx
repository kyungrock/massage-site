'use client';

import { useState, useEffect } from 'react';
import { Star, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import FeaturedShops from '@/components/FeaturedShops';
import ServiceCategories from '@/components/ServiceCategories';
import WhyChooseUs from '@/components/WhyChooseUs';
import LocationSelector from '@/components/LocationSelector';

// Mock data - 실제로는 API에서 가져올 데이터
const mockShops = [
  {
    _id: '1',
    name: '힐링 스파',
    description: '프리미엄 아로마 마사지와 스파 서비스를 제공하는 힐링 공간',
    address: '서울시 강남구 테헤란로 123',
    city: '서울',
    district: '강남구',
    phone: '02-1234-5678',
    email: 'info@healingspa.com',
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop'],
    services: [
      { name: '아로마 마사지', price: 80000, duration: 60 },
      { name: '스파 패키지', price: 150000, duration: 120 },
      { name: '얼굴 관리', price: 100000, duration: 90 },
    ],
    amenities: ['주차장', '샤워시설', '휴게실'],
    operatingHours: {
      monday: [{ open: '09:00', close: '22:00' }],
      tuesday: [{ open: '09:00', close: '22:00' }],
      wednesday: [{ open: '09:00', close: '22:00' }],
      thursday: [{ open: '09:00', close: '22:00' }],
      friday: [{ open: '09:00', close: '22:00' }],
      saturday: [{ open: '10:00', close: '21:00' }],
      sunday: [{ open: '10:00', close: '21:00' }],
    },
    location: { lat: 37.5665, lng: 126.9780 },
    rating: 4.8,
    reviewCount: 127,
    priceRange: { min: 80000, max: 150000 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    name: '발마사지 전문점',
    description: '전문 발 마사지사가 제공하는 프리미엄 발 관리 서비스',
    address: '서울시 마포구 홍대입구역 456',
    city: '서울',
    district: '마포구',
    phone: '02-2345-6789',
    email: 'info@footmassage.com',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'],
    services: [
      { name: '발 마사지', price: 50000, duration: 60 },
      { name: '전신 마사지', price: 80000, duration: 90 },
      { name: '족욕 서비스', price: 30000, duration: 30 },
    ],
    amenities: ['주차장', 'WiFi', '음료제공'],
    operatingHours: {
      monday: [{ open: '10:00', close: '22:00' }],
      tuesday: [{ open: '10:00', close: '22:00' }],
      wednesday: [{ open: '10:00', close: '22:00' }],
      thursday: [{ open: '10:00', close: '22:00' }],
      friday: [{ open: '10:00', close: '22:00' }],
      saturday: [{ open: '10:00', close: '21:00' }],
      sunday: [{ open: '10:00', close: '21:00' }],
    },
    location: { lat: 37.5563, lng: 126.9226 },
    rating: 4.6,
    reviewCount: 89,
    priceRange: { min: 30000, max: 80000 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '3',
    name: '타이 마사지 센터',
    description: '전통 타이 마사지와 현대적 테라피를 결합한 전문 마사지 센터',
    address: '서울시 종로구 인사동길 789',
    city: '서울',
    district: '종로구',
    phone: '02-3456-7890',
    email: 'info@thaimassage.com',
    images: ['https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=300&fit=crop'],
    services: [
      { name: '타이 마사지', price: 70000, duration: 90 },
      { name: '아로마 테라피', price: 90000, duration: 60 },
      { name: '핫스톤 마사지', price: 120000, duration: 120 },
    ],
    amenities: ['개인룸', '커플룸', '샤워시설'],
    operatingHours: {
      monday: [{ open: '09:00', close: '23:00' }],
      tuesday: [{ open: '09:00', close: '23:00' }],
      wednesday: [{ open: '09:00', close: '23:00' }],
      thursday: [{ open: '09:00', close: '23:00' }],
      friday: [{ open: '09:00', close: '23:00' }],
      saturday: [{ open: '09:00', close: '22:00' }],
      sunday: [{ open: '09:00', close: '22:00' }],
    },
    location: { lat: 37.5735, lng: 126.9788 },
    rating: 4.9,
    reviewCount: 203,
    priceRange: { min: 70000, max: 120000 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '4',
    name: '부산 힐링 스파',
    description: '부산 해운대의 프리미엄 스파와 마사지 서비스',
    address: '부산시 해운대구 우동 해운대로 123',
    city: '부산',
    district: '해운대구',
    phone: '051-1234-5678',
    email: 'info@busanhealing.com',
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&h=300&fit=crop'],
    services: [
      { name: '바다 뷰 마사지', price: 90000, duration: 90 },
      { name: '해운대 스파', price: 120000, duration: 120 },
      { name: '아로마 테라피', price: 80000, duration: 60 },
    ],
    amenities: ['바다뷰', '주차장', '샤워시설'],
    operatingHours: {
      monday: [{ open: '09:00', close: '22:00' }],
      tuesday: [{ open: '09:00', close: '22:00' }],
      wednesday: [{ open: '09:00', close: '22:00' }],
      thursday: [{ open: '09:00', close: '22:00' }],
      friday: [{ open: '09:00', close: '22:00' }],
      saturday: [{ open: '09:00', close: '21:00' }],
      sunday: [{ open: '09:00', close: '21:00' }],
    },
    location: { lat: 35.1595, lng: 129.1606 },
    rating: 4.7,
    reviewCount: 156,
    priceRange: { min: 80000, max: 120000 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '5',
    name: '부산 전통 마사지',
    description: '부산 중구의 전통적인 마사지 서비스',
    address: '부산시 중구 중앙대로 456',
    city: '부산',
    district: '중구',
    phone: '051-2345-6789',
    email: 'info@busantraditional.com',
    images: ['https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'],
    services: [
      { name: '전통 마사지', price: 60000, duration: 60 },
      { name: '발 마사지', price: 40000, duration: 45 },
      { name: '어깨 마사지', price: 50000, duration: 50 },
    ],
    amenities: ['전통시설', 'WiFi', '음료제공'],
    operatingHours: {
      monday: [{ open: '10:00', close: '22:00' }],
      tuesday: [{ open: '10:00', close: '22:00' }],
      wednesday: [{ open: '10:00', close: '22:00' }],
      thursday: [{ open: '10:00', close: '22:00' }],
      friday: [{ open: '10:00', close: '22:00' }],
      saturday: [{ open: '10:00', close: '21:00' }],
      sunday: [{ open: '10:00', close: '21:00' }],
    },
    location: { lat: 35.1017, lng: 129.0304 },
    rating: 4.5,
    reviewCount: 98,
    priceRange: { min: 40000, max: 60000 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState({
    region: '',
    district: ''
  });
  const [filteredShops, setFilteredShops] = useState(mockShops);

  const handleLocationChange = (region: string, district: string) => {
    setSelectedLocation({ region, district });
  };

  // 지역 선택에 따른 업체 필터링
  useEffect(() => {
    let filtered = mockShops;

    if (selectedLocation.district) {
      filtered = filtered.filter(shop => shop.district === selectedLocation.district);
    } else if (selectedLocation.region) {
      filtered = filtered.filter(shop => shop.city === selectedLocation.region);
    }

    setFilteredShops(filtered);
  }, [selectedLocation]);

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* 지역 선택 섹션 */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              원하는 지역을 선택하세요
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              서울, 부산 전 지역의 마사지 업체를 찾아보세요
            </p>
            {selectedLocation.district && (
              <div className="inline-flex items-center px-6 py-3 bg-primary-100 text-primary-700 rounded-full text-lg font-semibold shadow-lg">
                <MapPin className="w-5 h-5 mr-3" />
                {selectedLocation.district} 선택됨
              </div>
            )}
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <LocationSelector onLocationChange={handleLocationChange} />
            </div>
          </div>
        </div>
      </section>

      {/* 선택된 지역의 업체 결과 */}
      {selectedLocation.district && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedLocation.district} 마사지 업체
              </h2>
              <p className="text-lg text-gray-600">
                <span className="font-semibold text-primary-600">{filteredShops.length}</span>개의 업체를 찾았습니다.
              </p>
            </div>
            
            {filteredShops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredShops.map((shop) => (
                  <div key={shop._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="relative h-48">
                      <img
                        src={shop.images[0]}
                        alt={shop.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{shop.rating}</span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{shop.name}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{shop.description}</p>
                      
                      <div className="flex items-center text-gray-500 mb-4">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span className="text-sm">{shop.address}</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{shop.operatingHours.monday[0].open} - {shop.operatingHours.monday[0].close}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {shop.reviewCount}개 리뷰
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-primary-600">
                          {shop.priceRange.min.toLocaleString()}원 ~ {shop.priceRange.max.toLocaleString()}원
                        </div>
                        <Link 
                          href={`/shops/${shop._id}`}
                          className="btn-primary"
                        >
                          자세히 보기
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <MapPin className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  해당 지역에 업체가 없습니다
                </h3>
                <p className="text-gray-600">
                  다른 지역을 선택해보세요.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <ServiceCategories />
      <FeaturedShops />
      <WhyChooseUs />
    </div>
  );
}


