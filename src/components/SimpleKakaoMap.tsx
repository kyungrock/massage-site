'use client';

import { useEffect, useRef, useState } from 'react';

interface SimpleKakaoMapProps {
  lat: number;
  lng: number;
  address: string;
}

export default function SimpleKakaoMap({ lat, lng, address }: SimpleKakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loadKakaoMap = () => {
      // 하드코딩된 API 키로 테스트
      const apiKey = '8eec0890b2cb092db80119361928e156';
      
      console.log('카카오 API 키 로드 시도:', apiKey);

      // 카카오 지도 API 스크립트 로드
      if (!window.kakao) {
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        script.async = true;
        
        script.onload = () => {
          console.log('카카오 지도 스크립트 로드 완료');
          window.kakao.maps.load(() => {
            console.log('카카오 지도 초기화 시작');
            initializeMap();
          });
        };
        
        script.onerror = (error) => {
          console.error('카카오 지도 스크립트 로드 실패:', error);
        };
        
        document.head.appendChild(script);
      } else {
        console.log('카카오 지도 이미 로드됨');
        window.kakao.maps.load(() => {
          initializeMap();
        });
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.kakao) {
        console.error('지도 컨테이너 또는 카카오 객체가 없습니다');
        return;
      }

      try {
        console.log('지도 초기화 시작:', lat, lng);
        
        // 지도 생성
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3
        });

        console.log('지도 생성 완료');

        // 마커 생성
        const markerPosition = new window.kakao.maps.LatLng(lat, lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map
        });

        console.log('마커 생성 완료');

        // 정보창 생성
        const infoWindow = new window.kakao.maps.InfoWindow({
          content: `
            <div style="padding: 12px; min-width: 200px; font-family: 'Noto Sans KR', sans-serif;">
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
        setMapLoaded(true);
      } catch (error) {
        console.error('지도 초기화 오류:', error);
      }
    };

    loadKakaoMap();
  }, [lat, lng, address]);

  return (
    <div className="w-full">
      <div ref={mapRef} className="w-full h-80 rounded-lg shadow-lg border-2 border-gray-200" />
      {mapLoaded && (
        <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800 flex items-center">
            <span className="mr-2">✅</span>
            카카오 지도가 로드되었습니다. 줌인/줌아웃 및 팬이 가능합니다.
          </p>
        </div>
      )}
    </div>
  );
}

// 카카오 지도 타입 선언
declare global {
  interface Window {
    kakao: any;
  }
}


