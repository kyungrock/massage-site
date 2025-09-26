'use client';

import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { seoulRegions, getDistrictsByRegion } from '@/lib/regions';

interface LocationSelectorProps {
  onLocationChange?: (region: string, district: string) => void;
  className?: string;
  initialRegion?: string;
  initialDistrict?: string;
}

export default function LocationSelector({ 
  onLocationChange, 
  className = '', 
  initialRegion = '', 
  initialDistrict = '' 
}: LocationSelectorProps) {
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleRegionChange = (regionCode: string) => {
    console.log('Selected region code:', regionCode);
    setSelectedRegion(regionCode);
    setSelectedDistrict('');
    
    const region = seoulRegions.find(r => r.code === regionCode);
    console.log('Found region:', region);
    if (region && onLocationChange) {
      onLocationChange(region.name, '');
    }
  };

  const handleDistrictChange = (districtCode: string) => {
    setSelectedDistrict(districtCode);
    
    const region = seoulRegions.find(r => r.code === selectedRegion);
    if (region) {
      const district = region.districts.find(d => d.code === districtCode);
      if (district && onLocationChange) {
        onLocationChange(region.name, district.name);
        // 구 선택 후 박스 사라지게 하기 위해 상태 초기화
        setTimeout(() => {
          setSelectedRegion('');
          setSelectedDistrict('');
        }, 1000);
      }
    }
  };

  const districts = getDistrictsByRegion(selectedRegion);
  const selectedRegionData = seoulRegions.find(r => r.code === selectedRegion);
  
  console.log('Current selectedRegion:', selectedRegion);
  console.log('Districts:', districts);
  console.log('Districts length:', districts.length);
  console.log('Condition check:', selectedRegion === 'seoul' && districts.length > 0);

  return (
    <div className={`relative ${className}`}>
      {/* 지역 선택 드롭다운 */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-3">
          지역 선택
        </label>
        <div className="relative">
          <select 
            value={selectedRegion} 
            onChange={(e) => handleRegionChange(e.target.value)}
            className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white cursor-pointer"
          >
            <option value="">지역선택</option>
            {seoulRegions.map((region) => (
              <option key={region.code} value={region.code}>
                {region.name}마사지
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* 디버깅용 임시 박스 */}
      <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
        <p className="text-sm text-yellow-800">
          디버깅: selectedRegion = "{selectedRegion}", districts.length = {districts.length}
        </p>
      </div>

      {/* 구 선택 드롭다운 박스 */}
      {selectedRegion && (
        <div className="mt-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border-2 border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary-600" />
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedRegionData?.name} 구 선택
              </h3>
            </div>
            <span className="text-sm text-primary-600 bg-primary-100 px-3 py-1 rounded-full font-medium">
              {districts.length}개 구
            </span>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {districts.map((district) => (
              <button
                key={district.code}
                onClick={() => handleDistrictChange(district.code)}
                className={`px-4 py-3 text-sm font-semibold border-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  selectedDistrict === district.code 
                    ? 'border-primary-500 bg-primary-500 text-white shadow-lg transform scale-105' 
                    : 'border-gray-300 bg-white text-gray-700 hover:border-primary-400 hover:text-primary-600 hover:shadow-md'
                }`}
              >
                {district.name}
              </button>
            ))}
          </div>
          
          {selectedDistrict && (
            <div className="mt-4 p-4 bg-white border-2 border-primary-300 rounded-lg shadow-md">
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5 text-primary-600" />
                <span className="font-semibold text-primary-800 text-lg">
                  {selectedRegionData?.name} {districts.find(d => d.code === selectedDistrict)?.name} 선택됨
                </span>
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">
                잠시 후 자동으로 업체 목록이 표시됩니다
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}