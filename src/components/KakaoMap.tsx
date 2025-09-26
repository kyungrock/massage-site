'use client';

import { useEffect, useRef, useState } from 'react';

interface KakaoMapProps {
  lat: number;
  lng: number;
  address: string;
  shops?: Array<{
    _id: string;
    name: string;
    lat: number;
    lng: number;
    address: string;
  }>;
}

export default function KakaoMap({ lat, lng, address, shops = [] }: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const loadKakaoMap = async () => {
      try {
        // 카카오 지도 API 키 확인
        const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY;
        
        console.log('카카오 API 키:', apiKey); // 디버깅용
        
        if (!apiKey || apiKey === 'your-kakao-map-api-key-here') {
          console.warn('카카오 지도 API 키가 설정되지 않았습니다. 플레이스홀더를 표시합니다.');
          setMapError(true);
          return;
        }

        // 카카오 지도 API 스크립트 로드
        if (!window.kakao) {
          const script = document.createElement('script');
          script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
          script.async = true;
          
          script.onload = () => {
            window.kakao.maps.load(() => {
              initializeMap();
            });
          };
          
          script.onerror = () => {
            setMapError(true);
          };
          
          document.head.appendChild(script);
        } else {
          window.kakao.maps.load(() => {
            initializeMap();
          });
        }
      } catch (error) {
        console.error('카카오 지도 로드 오류:', error);
        setMapError(true);
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.kakao) return;

      try {
        // 지도 생성
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 3 // 지도 확대 레벨 (1-14, 숫자가 작을수록 확대)
        });

        // 메인 업체 마커
        const mainMarkerPosition = new window.kakao.maps.LatLng(lat, lng);
        const mainMarker = new window.kakao.maps.Marker({
          position: mainMarkerPosition,
          map: map
        });

        // 메인 마커 커스텀 이미지
        const mainMarkerImage = new window.kakao.maps.MarkerImage(
          'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#FF6B6B" stroke="#ffffff" stroke-width="3"/>
              <text x="20" y="26" text-anchor="middle" fill="white" font-size="16" font-weight="bold">📍</text>
            </svg>
          `),
          new window.kakao.maps.Size(40, 40),
          { offset: new window.kakao.maps.Point(20, 20) }
        );
        mainMarker.setImage(mainMarkerImage);

        // 메인 마커 정보창
        const mainInfoWindow = new window.kakao.maps.InfoWindow({
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

        // 메인 마커 클릭 이벤트
        window.kakao.maps.event.addListener(mainMarker, 'click', () => {
          mainInfoWindow.open(map, mainMarker);
        });

        // 다른 업체들 마커 추가
        shops.forEach((shop) => {
          if (shop.lat !== lat || shop.lng !== lng) {
            const shopMarkerPosition = new window.kakao.maps.LatLng(shop.lat, shop.lng);
            const shopMarker = new window.kakao.maps.Marker({
              position: shopMarkerPosition,
              map: map
            });

            // 업체 마커 커스텀 이미지
            const shopMarkerImage = new window.kakao.maps.MarkerImage(
              'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="12" fill="#4ECDC4" stroke="#ffffff" stroke-width="2"/>
                  <text x="15" y="19" text-anchor="middle" fill="white" font-size="12" font-weight="bold">🏪</text>
                </svg>
              `),
              new window.kakao.maps.Size(30, 30),
              { offset: new window.kakao.maps.Point(15, 15) }
            );
            shopMarker.setImage(shopMarkerImage);

            // 업체 정보창
            const shopInfoWindow = new window.kakao.maps.InfoWindow({
              content: `
                <div style="padding: 10px; min-width: 180px; font-family: 'Noto Sans KR', sans-serif;">
                  <div style="font-weight: bold; font-size: 13px; color: #333; margin-bottom: 3px;">
                    🏪 ${shop.name}
                  </div>
                  <div style="font-size: 11px; color: #666;">
                    ${shop.address}
                  </div>
                </div>
              `
            });

            // 업체 마커 클릭 이벤트
            window.kakao.maps.event.addListener(shopMarker, 'click', () => {
              shopInfoWindow.open(map, shopMarker);
            });
          }
        });

        setMapLoaded(true);
      } catch (error) {
        console.error('카카오 지도 초기화 오류:', error);
        setMapError(true);
      }
    };

    loadKakaoMap();
  }, [lat, lng, address, shops]);

  // API 키가 없거나 오류가 발생한 경우 플레이스홀더 표시
  if (mapError || !mapLoaded) {
    return (
      <div className="w-full">
        <div className="w-full h-80 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-lg border-2 border-yellow-300 flex flex-col items-center justify-center text-center p-6">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-bold text-orange-800 mb-2">카카오 지도 API 필요</h3>
          <p className="text-orange-700 mb-4">
            실제 인터랙티브 지도를 사용하려면 카카오 지도 API 키가 필요합니다.
          </p>
          <div className="bg-orange-50 p-4 rounded-lg text-sm text-orange-800">
            <p className="font-semibold mb-2">설정 방법:</p>
            <ol className="text-left space-y-1">
              <li>1. 카카오 개발자 콘솔에서 JavaScript API 활성화</li>
              <li>2. 앱 키 생성</li>
              <li>3. .env.local에 NEXT_PUBLIC_KAKAO_MAP_API_KEY 추가</li>
            </ol>
            <div className="mt-3 p-2 bg-yellow-100 rounded text-xs">
              <strong>💡 장점:</strong> 월 30만회 무료 (Google의 10배!)
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">현재 위치:</p>
            <p className="font-mono text-sm">{address}</p>
            <p className="font-mono text-xs text-gray-500">
              {lat.toFixed(6)}, {lng.toFixed(6)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div ref={mapRef} className="w-full h-80 rounded-lg shadow-lg border-2 border-gray-200" />
      <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-800 flex items-center">
          <span className="mr-2">✅</span>
          카카오 지도가 로드되었습니다. 줌인/줌아웃 및 팬이 가능합니다.
        </p>
        <div className="mt-2 text-xs text-green-700">
          <span className="font-semibold">🎯 기능:</span> 마우스 휠로 줌, 드래그로 이동, 마커 클릭으로 정보 확인
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
