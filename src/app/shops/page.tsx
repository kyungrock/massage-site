'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Star, MapPin, Clock, Filter, Search } from 'lucide-react';
import Link from 'next/link';
import ShopCard from '@/components/ShopCard';
import SearchFilters from '@/components/SearchFilters';

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
      { name: '족욕', price: 30000, duration: 30 },
      { name: '발 관리', price: 80000, duration: 90 },
    ],
    amenities: ['주차장', '휴게실'],
    operatingHours: {
      monday: [{ open: '10:00', close: '23:00' }],
      tuesday: [{ open: '10:00', close: '23:00' }],
      wednesday: [{ open: '10:00', close: '23:00' }],
      thursday: [{ open: '10:00', close: '23:00' }],
      friday: [{ open: '10:00', close: '23:00' }],
      saturday: [{ open: '10:00', close: '23:00' }],
      sunday: [{ open: '10:00', close: '23:00' }],
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
    name: '전통 한방 마사지',
    description: '한의학 기반의 전통 마사지로 몸의 균형을 맞춰드립니다',
    address: '서울시 중구 명동 789',
    city: '서울',
    district: '중구',
    phone: '02-3456-7890',
    email: 'info@hanbangmassage.com',
    images: ['https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=300&fit=crop'],
    services: [
      { name: '한방 마사지', price: 60000, duration: 60 },
      { name: '침술', price: 80000, duration: 45 },
      { name: '부항', price: 50000, duration: 30 },
    ],
    amenities: ['주차장', '샤워시설', '휴게실', '한약재'],
    operatingHours: {
      monday: [{ open: '09:00', close: '18:00' }],
      tuesday: [{ open: '09:00', close: '18:00' }],
      wednesday: [{ open: '09:00', close: '18:00' }],
      thursday: [{ open: '09:00', close: '18:00' }],
      friday: [{ open: '09:00', close: '18:00' }],
      saturday: [{ open: '09:00', close: '15:00' }],
      sunday: [],
    },
    location: { lat: 37.5636, lng: 126.9826 },
    rating: 4.9,
    reviewCount: 203,
    priceRange: { min: 50000, max: 120000 },
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ShopsPage() {
  const searchParams = useSearchParams();
  const [shops, setShops] = useState(mockShops);
  const [filteredShops, setFilteredShops] = useState(mockShops);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || '');
  
  // URL 파라미터에서 지역 정보 가져오기
  const urlLocation = searchParams.get('location');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [filters, setFilters] = useState({
    priceMin: undefined,
    priceMax: undefined,
    rating: undefined,
    amenities: [],
    location: {
      region: urlLocation ? '서울' : '',
      district: urlLocation || ''
    }
  });

  useEffect(() => {
    let filtered = shops;

    // Search query filter
    if (searchQuery) {
      filtered = filtered.filter(shop =>
        shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        shop.services.some(service => 
          service.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Location filter (새로운 지역 선택 방식)
    if (filters.location.district) {
      filtered = filtered.filter(shop =>
        shop.district === filters.location.district
      );
    } else if (filters.location.region) {
      filtered = filtered.filter(shop =>
        shop.city === filters.location.region
      );
    }

    // Legacy location filter
    if (selectedLocation) {
      filtered = filtered.filter(shop =>
        shop.city.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        shop.district.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(shop =>
        shop.services.some(service => 
          service.name.toLowerCase().includes(selectedCategory.toLowerCase())
        )
      );
    }

    // Price filter
    if (filters.priceMin !== undefined) {
      filtered = filtered.filter(shop =>
        shop.priceRange.min >= filters.priceMin!
      );
    }
    if (filters.priceMax !== undefined) {
      filtered = filtered.filter(shop =>
        shop.priceRange.max <= filters.priceMax!
      );
    }

    // Rating filter
    if (filters.rating !== undefined) {
      filtered = filtered.filter(shop =>
        shop.rating >= filters.rating!
      );
    }

    // Amenities filter
    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter(shop =>
        filters.amenities!.every(amenity =>
          shop.amenities.includes(amenity)
        )
      );
    }

    setFilteredShops(filtered);
  }, [shops, searchQuery, selectedLocation, selectedCategory, filters]);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  // URL 파라미터 변경 시 필터 업데이트
  useEffect(() => {
    if (urlLocation) {
      setFilters(prev => ({
        ...prev,
        location: {
          region: '서울',
          district: urlLocation
        }
      }));
    }
  }, [urlLocation]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            마사지 업체 찾기
          </h1>
          <p className="text-gray-600">
            전국 {shops.length}개의 마사지 업체 중에서 원하는 업체를 찾아보세요.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="업체명, 서비스로 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Location Select */}
            <div className="lg:w-48">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">전체 지역</option>
                <option value="강남구">강남구</option>
                <option value="마포구">마포구</option>
                <option value="중구">중구</option>
                <option value="서초구">서초구</option>
                <option value="송파구">송파구</option>
              </select>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Filter className="w-5 h-5" />
              <span>필터</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t">
              <SearchFilters
                onFiltersChange={handleFiltersChange}
              />
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{filteredShops.length}</span>개의 업체를 찾았습니다.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">정렬:</span>
              <select className="px-3 py-1 border border-gray-300 rounded-md text-sm">
                <option value="rating">평점 높은 순</option>
                <option value="price-low">가격 낮은 순</option>
                <option value="price-high">가격 높은 순</option>
                <option value="reviews">리뷰 많은 순</option>
              </select>
            </div>
          </div>
        </div>

        {/* Shop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map((shop) => (
            <ShopCard key={shop._id} shop={shop} />
          ))}
        </div>

        {/* No Results */}
        {filteredShops.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              다른 검색어나 필터를 시도해보세요.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('');
                setSelectedCategory('');
              }}
              className="btn-primary"
            >
              필터 초기화
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


