'use client';

import { useEffect, useRef, useState } from 'react';

interface ReliableKakaoMapProps {
  lat: number;
  lng: number;
  address: string;
}

export default function ReliableKakaoMap({ lat, lng, address }: ReliableKakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapStatus, setMapStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    const apiKey = '8eec0890b2cb092db80119361928e156';
    
    // 카카오 지도 스크립트 로드 함수
    const loadKakaoScript = () => {
      return new Promise((resolve, reject) => {
        // 이미 스크립트가 로드된 경우
        if (window.kakao && window.kakao.maps) {
          resolve(true);
          return;
        }

        // 이미 스크립트 태그가 있는 경우
        const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
        if (existingScript) {
          // 스크립트는 있지만 아직 로드되지 않은 경우
          const checkKakao = setInterval(() => {
            if (window.kakao && window.kakao.maps) {
              clearInterval(checkKakao);
              resolve(true);
            }
          }, 100);
          
          // 5초 후 타임아웃
          setTimeout(() => {
            clearInterval(checkKakao);
            reject(new Error('카카오 지도 로드 타임아웃'));
          }, 5000);
          return;
        }

        // 새 스크립트 로드
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`;
        script.async = true;
        
        script.onload = () => {
          console.log('카카오 지도 스크립트 로드 완료');
          resolve(true);
        };
        
        script.onerror = () => {
          console.error('카카오 지도 스크립트 로드 실패');
          reject(new Error('스크립트 로드 실패'));
        };
        
        document.head.appendChild(script);
      });
    };

    // 지도 초기화 함수
    const initializeMap = () => {
      if (!mapRef.current || !window.kakao || !window.kakao.maps) {
        console.error('지도 초기화 실패: 필요한 객체가 없습니다');
        setMapStatus('error');
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
        setMapStatus('loaded');
      } catch (error) {
        console.error('지도 초기화 오류:', error);
        setMapStatus('error');
      }
    };

    // 메인 실행 함수
    const initMap = async () => {
      try {
        await loadKakaoScript();
        initializeMap();
      } catch (error) {
        console.error('지도 로드 오류:', error);
        setMapStatus('error');
      }
    };

    initMap();
  }, [lat, lng, address]);

  return (
    <div className="w-full">
      <div 
        ref={mapRef} 
        className="w-full h-80 rounded-lg shadow-lg border-2 border-gray-200"
        style={{ minHeight: '320px' }}
      >
        {mapStatus === 'loading' && (
          <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p>지도 로딩 중...</p>
            </div>
          </div>
        )}
        
        {mapStatus === 'error' && (
          <div className="w-full h-full flex items-center justify-center bg-red-50">
            <div className="text-center text-red-600">
              <div className="text-4xl mb-2">⚠️</div>
              <p className="font-semibold">지도 로드 실패</p>
              <p className="text-sm mt-1">API 키 또는 도메인 설정을 확인해주세요</p>
            </div>
          </div>
        )}
      </div>
      
      {mapStatus === 'loaded' && (
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


