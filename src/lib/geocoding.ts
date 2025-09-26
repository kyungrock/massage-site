// 지오코딩 유틸리티 함수들
// 실제 서비스에서는 Google Maps Geocoding API 또는 다른 지오코딩 서비스를 사용

export interface GeocodingResult {
  lat: number;
  lng: number;
  formatted_address: string;
  address_components: {
    long_name: string;
    short_name: string;
    types: string[];
  }[];
}

export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  try {
    // 실제 구현에서는 API 호출
    // const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`);
    // const data = await response.json();
    
    // Mock data for demonstration
    const mockResults: { [key: string]: GeocodingResult } = {
      '서울시 강남구 테헤란로 123': {
        lat: 37.5665,
        lng: 126.9780,
        formatted_address: '서울특별시 강남구 테헤란로 123',
        address_components: [
          { long_name: '123', short_name: '123', types: ['street_number'] },
          { long_name: '테헤란로', short_name: '테헤란로', types: ['route'] },
          { long_name: '강남구', short_name: '강남구', types: ['sublocality', 'political'] },
          { long_name: '서울특별시', short_name: '서울', types: ['locality', 'political'] },
          { long_name: '대한민국', short_name: 'KR', types: ['country', 'political'] }
        ]
      },
      '서울시 마포구 홍대입구역 456': {
        lat: 37.5563,
        lng: 126.9226,
        formatted_address: '서울특별시 마포구 홍대입구역 456',
        address_components: [
          { long_name: '456', short_name: '456', types: ['street_number'] },
          { long_name: '홍대입구역', short_name: '홍대입구역', types: ['route'] },
          { long_name: '마포구', short_name: '마포구', types: ['sublocality', 'political'] },
          { long_name: '서울특별시', short_name: '서울', types: ['locality', 'political'] },
          { long_name: '대한민국', short_name: 'KR', types: ['country', 'political'] }
        ]
      },
      '서울시 중구 명동 789': {
        lat: 37.5636,
        lng: 126.9826,
        formatted_address: '서울특별시 중구 명동 789',
        address_components: [
          { long_name: '789', short_name: '789', types: ['street_number'] },
          { long_name: '명동', short_name: '명동', types: ['route'] },
          { long_name: '중구', short_name: '중구', types: ['sublocality', 'political'] },
          { long_name: '서울특별시', short_name: '서울', types: ['locality', 'political'] },
          { long_name: '대한민국', short_name: 'KR', types: ['country', 'political'] }
        ]
      }
    };

    // 간단한 매칭 로직
    for (const [key, value] of Object.entries(mockResults)) {
      if (address.includes(key.split(' ')[2]) || address.includes(key.split(' ')[3])) {
        return value;
      }
    }

    // 기본값 반환
    return {
      lat: 37.5665,
      lng: 126.9780,
      formatted_address: address,
      address_components: []
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}




