'use client';

import { useState } from 'react';
import { SearchFilters as SearchFiltersType } from '@/types';

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFiltersType) => void;
}

export default function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFiltersType>({
    priceMin: undefined,
    priceMax: undefined,
    rating: undefined,
    amenities: [],
    location: {
      region: '',
      district: ''
    }
  });

  const amenities = [
    '주차장',
    '샤워시설',
    '휴게실',
    'WiFi',
    '음료제공',
    '개인룸',
    '커플룸',
    '단체룸',
  ];

  const handleFilterChange = (key: keyof SearchFiltersType, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities?.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...(filters.amenities || []), amenity];
    
    handleFilterChange('amenities', newAmenities);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          가격 범위
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="최소"
            value={filters.priceMin || ''}
            onChange={(e) => handleFilterChange('priceMin', e.target.value ? Number(e.target.value) : undefined)}
            className="input-field"
          />
          <span className="flex items-center text-gray-500">~</span>
          <input
            type="number"
            placeholder="최대"
            value={filters.priceMax || ''}
            onChange={(e) => handleFilterChange('priceMax', e.target.value ? Number(e.target.value) : undefined)}
            className="input-field"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          최소 평점
        </label>
        <select
          value={filters.rating || ''}
          onChange={(e) => handleFilterChange('rating', e.target.value ? Number(e.target.value) : undefined)}
          className="input-field"
        >
          <option value="">전체</option>
          <option value="4.5">4.5점 이상</option>
          <option value="4.0">4.0점 이상</option>
          <option value="3.5">3.5점 이상</option>
          <option value="3.0">3.0점 이상</option>
        </select>
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          편의시설
        </label>
        <div className="grid grid-cols-2 gap-2">
          {amenities.map((amenity) => (
            <label key={amenity} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.amenities?.includes(amenity) || false}
                onChange={() => handleAmenityToggle(amenity)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}