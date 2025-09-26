'use client';

import { useEffect, useRef } from 'react';

interface BasicKakaoMapProps {
  lat: number;
  lng: number;
  address: string;
}

export default function BasicKakaoMap({ lat, lng, address }: BasicKakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 카카오 지도 API 키 (하드코딩)
    const apiKey = '8eec0890b2cb092db80119361928e156';
    
    // 스크립트가 이미 로드되었는지 확인
    const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
    
    if (existingScript) {
      // 이미 로드된 경우 바로 초기화
      if (window.kakao && window.kakao.maps) {
        initializeMap();
      } else {
        // 카카오 객체가 아직 준비되지 않은 경우 잠시 대기
        setTimeout(() => {
          if (window.kakao && window.kakao.maps) {
            initializeMap();
          }
        }, 1000);
      }
    } else {
      // 스크립트 로드
      const script = document.createElement('script');
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`;
      script.async = true;
      
      script.onload = () => {
        console.log('카카오 지도 스크립트 로드 완료');
        initializeMap();
      };
      
      script.onerror = () => {
        console.error('카카오 지도 스크립트 로드 실패');
      };
      
      document.head.appendChild(script);
    }

    function initializeMap() {
      if (!mapRef.current) {
        console.error('지도 컨테이너를 찾을 수 없습니다');
        return;
      }

      if (!window.kakao || !window.kakao.maps) {
        console.error('카카오 지도 API가 로드되지 않았습니다');
        return;
      }

      try {
        console.log('지도 초기화 시작:', lat, lng);
        
        // 지도 생성
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3
        });

        // 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map
        });

        // 정보창 생성
        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `
            <div style="padding: 12px; min-width: 200px;">
              <div style="font-weight: bold; font-size: 14px; color: #333; margin-bottom: 4px;">
                📍 ${address}
              </div>
              <div style="font-size: 12px; color: #666;">
                위치: ${lat.toFixed(6)}, ${lng.toFixed(6)}
              </div>
            </div>
          `
        });

        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(map, marker);
        });

        console.log('지도 초기화 완료');
      } catch (error) {
        console.error('지도 초기화 오류:', error);
      }
    }
  }, [lat, lng, address]);

  return (
    <div className="w-full">
      <div 
        ref={mapRef} 
        className="w-full h-80 rounded-lg shadow-lg border-2 border-gray-200 bg-gray-100"
        style={{ minHeight: '320px' }}
      >
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p>지도 로딩 중...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// 카카오 지도 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}


