'use client';

import { useState } from 'react';
import { ArrowLeft, Plus, Trash2, MapPin } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { MassageShop } from '@/types';
import SimpleMapDisplay from '@/components/SimpleMapDisplay';

export default function NewShopPage() {
  const [formData, setFormData] = useState<Partial<MassageShop>>({
    name: '',
    description: '',
    address: '',
    city: '',
    district: '',
    phone: '',
    email: '',
    website: '',
    images: [],
    services: [],
    amenities: [],
    operatingHours: {
      monday: [{ open: '09:00', close: '18:00' }],
      tuesday: [{ open: '09:00', close: '18:00' }],
      wednesday: [{ open: '09:00', close: '18:00' }],
      thursday: [{ open: '09:00', close: '18:00' }],
      friday: [{ open: '09:00', close: '18:00' }],
      saturday: [{ open: '10:00', close: '17:00' }],
      sunday: [],
    },
    location: { lat: 0, lng: 0 },
    priceRange: { min: 0, max: 0 },
    isActive: true,
  });

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    duration: 60,
    price: 0,
    category: 'massage' as const,
  });

  const [newAmenity, setNewAmenity] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // TODO: API call to create shop
      console.log('Creating shop:', formData);
      toast.success('업체가 성공적으로 등록되었습니다!');
      // Redirect to shops list
    } catch (error) {
      toast.error('업체 등록 중 오류가 발생했습니다.');
    }
  };

  const addService = () => {
    if (newService.name && newService.price > 0) {
      setFormData({
        ...formData,
        services: [...(formData.services || []), { ...newService, _id: Date.now().toString() }]
      });
      setNewService({
        name: '',
        description: '',
        duration: 60,
        price: 0,
        category: 'massage',
      });
    }
  };

  const removeService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services?.filter((_, i) => i !== index)
    });
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData({
        ...formData,
        amenities: [...(formData.amenities || []), newAmenity.trim()]
      });
      setNewAmenity('');
    }
  };

  const removeAmenity = (index: number) => {
    setFormData({
      ...formData,
      amenities: formData.amenities?.filter((_, i) => i !== index)
    });
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), newImage.trim()]
      });
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images?.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/shops" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">새 업체 등록</h1>
            <p className="text-gray-600">새로운 마사지 업체를 등록합니다.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">기본 정보</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  업체명 *
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  전화번호 *
                </label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  웹사이트
                </label>
                <input
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  업체 설명 *
                </label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input-field"
                  rows={4}
                  required
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">위치 정보</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  시/도 *
                </label>
                <select
                  value={formData.city || ''}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">선택하세요</option>
                  <option value="서울">서울</option>
                  <option value="부산">부산</option>
                  <option value="대구">대구</option>
                  <option value="인천">인천</option>
                  <option value="광주">광주</option>
                  <option value="대전">대전</option>
                  <option value="울산">울산</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  구/군 *
                </label>
                <input
                  type="text"
                  value={formData.district || ''}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  상세 주소 *
                </label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                좌표 (위도, 경도)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  step="any"
                  placeholder="위도"
                  value={formData.location?.lat || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location!, lat: Number(e.target.value) }
                  })}
                  className="input-field"
                />
                <input
                  type="number"
                  step="any"
                  placeholder="경도"
                  value={formData.location?.lng || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    location: { ...formData.location!, lng: Number(e.target.value) }
                  })}
                  className="input-field"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                구글 맵에서 좌표를 확인할 수 있습니다.
              </p>
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">서비스</h2>
            
            <div className="space-y-4">
              {formData.services?.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{service.name}</h4>
                    <button
                      type="button"
                      onClick={() => removeService(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                  <div className="flex space-x-4 text-sm">
                    <span>가격: {service.price.toLocaleString()}원</span>
                    <span>시간: {service.duration}분</span>
                    <span>카테고리: {service.category}</span>
                  </div>
                </div>
              ))}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <h4 className="font-medium mb-4">새 서비스 추가</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="서비스명"
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="설명"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    className="input-field"
                  />
                  <input
                    type="number"
                    placeholder="가격"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
                    className="input-field"
                  />
                  <input
                    type="number"
                    placeholder="소요시간 (분)"
                    value={newService.duration}
                    onChange={(e) => setNewService({ ...newService, duration: Number(e.target.value) })}
                    className="input-field"
                  />
                  <select
                    value={newService.category}
                    onChange={(e) => setNewService({ ...newService, category: e.target.value as any })}
                    className="input-field"
                  >
                    <option value="massage">마사지</option>
                    <option value="spa">스파</option>
                    <option value="therapy">치료</option>
                    <option value="beauty">뷰티</option>
                  </select>
                  <button
                    type="button"
                    onClick={addService}
                    className="btn-primary flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>추가</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">편의시설</h2>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.amenities?.map((amenity, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm flex items-center space-x-2"
                >
                  <span>{amenity}</span>
                  <button
                    type="button"
                    onClick={() => removeAmenity(index)}
                    className="text-primary-500 hover:text-primary-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="편의시설 추가"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={addAmenity}
                className="btn-secondary"
              >
                추가
              </button>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">이미지</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {formData.images?.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`업체 이미지 ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="url"
                placeholder="이미지 URL 추가"
                value={newImage}
                onChange={(e) => setNewImage(e.target.value)}
                className="input-field flex-1"
              />
              <button
                type="button"
                onClick={addImage}
                className="btn-secondary"
              >
                추가
              </button>
            </div>
          </div>

          {/* Price Range */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">가격 범위</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  최소 가격 *
                </label>
                <input
                  type="number"
                  value={formData.priceRange?.min || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    priceRange: { ...formData.priceRange!, min: Number(e.target.value) }
                  })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  최대 가격 *
                </label>
                <input
                  type="number"
                  value={formData.priceRange?.max || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    priceRange: { ...formData.priceRange!, max: Number(e.target.value) }
                  })}
                  className="input-field"
                  required
                />
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              위치 및 지도
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 좌표 입력 */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    위도 (Latitude) *
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.location?.lat || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location!, lat: Number(e.target.value) }
                    })}
                    className="input-field"
                    placeholder="예: 37.5665"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    경도 (Longitude) *
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={formData.location?.lng || ''}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: { ...formData.location!, lng: Number(e.target.value) }
                    })}
                    className="input-field"
                    placeholder="예: 126.9780"
                    required
                  />
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>💡 팁:</strong> Google Maps에서 주소를 검색하고 우클릭하여 좌표를 복사할 수 있습니다.
                  </p>
                </div>
              </div>
              
              {/* 지도 미리보기 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  지도 미리보기
                </label>
                {formData.location?.lat && formData.location?.lng ? (
                  <SimpleMapDisplay
                    lat={formData.location.lat}
                    lng={formData.location.lng}
                    address={formData.address || '업체 위치'}
                  />
                ) : (
                  <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-2" />
                      <p>위도와 경도를 입력하면 지도가 표시됩니다</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex space-x-4">
            <Link href="/admin/shops" className="btn-secondary flex-1 text-center">
              취소
            </Link>
            <button type="submit" className="btn-primary flex-1">
              업체 등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


