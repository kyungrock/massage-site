'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, MapPin, Phone, Clock, Calendar, Users, Heart, Share2 } from 'lucide-react';
import Image from 'next/image';
import ShopGallery from '@/components/ShopGallery';
import ServiceList from '@/components/ServiceList';
import ReviewSection from '@/components/ReviewSection';
import BookingModal from '@/components/BookingModal';
import SimpleMapDisplay from '@/components/SimpleMapDisplay';
import TestMap from '@/components/TestMap';

// Mock data - 실제로는 API에서 가져올 데이터
const mockShop = {
  _id: '1',
  name: '힐링 스파',
  description: '프리미엄 아로마 마사지와 스파 서비스를 제공하는 힐링 공간입니다. 전문 마사지사가 개인별 맞춤 서비스를 제공하며, 최고급 시설과 자연 친화적인 환경에서 진정한 휴식을 경험하실 수 있습니다.',
  address: '서울시 강남구 테헤란로 123',
  city: '서울',
  district: '강남구',
  phone: '02-1234-5678',
  email: 'info@healingspa.com',
  website: 'https://healingspa.com',
  images: [
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop',
  ],
  services: [
    { 
      _id: '1',
      name: '아로마 마사지', 
      description: '천연 아로마 오일을 사용한 프리미엄 마사지',
      price: 80000, 
      duration: 60,
      category: 'massage' as const
    },
    { 
      _id: '2',
      name: '스파 패키지', 
      description: '마사지 + 스파 + 얼굴 관리 통합 패키지',
      price: 150000, 
      duration: 120,
      category: 'spa' as const
    },
    { 
      _id: '3',
      name: '얼굴 관리', 
      description: '전문 에스테틱 얼굴 관리 서비스',
      price: 100000, 
      duration: 90,
      category: 'beauty' as const
    },
  ],
  amenities: ['주차장', '샤워시설', '휴게실', 'WiFi', '음료제공', '개인룸'],
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
};

export default function ShopDetailPage() {
  const params = useParams();
  const [shop, setShop] = useState(mockShop);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(shop.services[0]);

  const handleBookingClick = (service: any) => {
    setSelectedService(service);
    setIsBookingModalOpen(true);
  };

  const formatOperatingHours = (hours: any) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const dayNames = ['월', '화', '수', '목', '금', '토', '일'];
    
    return days.map((day, index) => {
      const dayHours = hours[day];
      if (!dayHours || dayHours.length === 0) {
        return { day: dayNames[index], hours: '휴무' };
      }
      const timeSlots = dayHours.map((slot: any) => `${slot.open} - ${slot.close}`).join(', ');
      return { day: dayNames[index], hours: timeSlots };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{shop.name}</h1>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-6 h-6" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{shop.rating}</span>
                  <span className="text-gray-600">({shop.reviewCount}개 리뷰)</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{shop.address}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>{shop.phone}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{shop.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {shop.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:ml-8 lg:w-80">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">가격 정보</h3>
                <div className="space-y-2 mb-6">
                  {shop.services.map((service) => (
                    <div key={service._id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{service.name}</span>
                      <span className="font-semibold">{service.price.toLocaleString()}원</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleBookingClick(shop.services[0])}
                  className="btn-primary w-full"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  예약하기
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ShopGallery images={shop.images} />

            {/* Services */}
            <ServiceList 
              services={shop.services} 
              onServiceSelect={handleBookingClick}
            />

            {/* Reviews */}
            <ReviewSection shopId={shop._id} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Operating Hours */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                운영시간
              </h3>
              <div className="space-y-2">
                {formatOperatingHours(shop.operatingHours).map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{item.day}</span>
                    <span className="font-medium">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                위치
              </h3>
              <SimpleMapDisplay 
                lat={shop.location.lat} 
                lng={shop.location.lng} 
                address={shop.address}
              />
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">연락처 정보</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span>{shop.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-5 h-5 text-gray-400">@</span>
                  <span>{shop.email}</span>
                </div>
                {shop.website && (
                  <div className="flex items-center space-x-3">
                    <span className="w-5 h-5 text-gray-400">🌐</span>
                    <a 
                      href={shop.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      웹사이트 방문
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        shop={shop}
        selectedService={selectedService}
      />
    </div>
  );
}