'use client';

import { useEffect, useRef, useState } from 'react';

interface InteractiveMapProps {
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

export default function InteractiveMap({ lat, lng, address, shops = [] }: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const loadGoogleMaps = async () => {
      try {
        // Google Maps API 키 확인
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        
        if (!apiKey || apiKey === 'your-google-maps-api-key-here') {
          console.warn('Google Maps API 키가 설정되지 않았습니다. 플레이스홀더를 표시합니다.');
          setMapError(true);
          return;
        }

        // Google Maps API 스크립트 로드
        if (!window.google) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
          script.async = true;
          script.defer = true;
          
          script.onload = () => {
            initializeMap();
          };
          
          script.onerror = () => {
            setMapError(true);
          };
          
          document.head.appendChild(script);
        } else {
          initializeMap();
        }
      } catch (error) {
        console.error('Google Maps 로드 오류:', error);
        setMapError(true);
      }
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return;

      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: 15,
          mapTypeId: 'roadmap',
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        // 메인 업체 마커
        const mainMarker = new window.google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: address,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#3b82f6" stroke="#ffffff" stroke-width="3"/>
                <text x="20" y="26" text-anchor="middle" fill="white" font-size="16" font-weight="bold">📍</text>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(40, 40)
          }
        });

        // 정보창
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #1f2937; font-size: 16px;">${address}</h3>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">위치: ${lat.toFixed(6)}, ${lng.toFixed(6)}</p>
            </div>
          `
        });

        mainMarker.addListener('click', () => {
          infoWindow.open(map, mainMarker);
        });

        // 다른 업체들 마커 추가
        shops.forEach((shop) => {
          if (shop.lat !== lat || shop.lng !== lng) {
            const shopMarker = new window.google.maps.Marker({
              position: { lat: shop.lat, lng: shop.lng },
              map: map,
              title: shop.name,
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="12" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
                    <text x="15" y="19" text-anchor="middle" fill="white" font-size="12" font-weight="bold">🏪</text>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(30, 30)
              }
            });

            const shopInfoWindow = new window.google.maps.InfoWindow({
              content: `
                <div style="padding: 8px; max-width: 180px;">
                  <h4 style="margin: 0 0 4px 0; color: #1f2937; font-size: 14px;">${shop.name}</h4>
                  <p style="margin: 0; color: #6b7280; font-size: 12px;">${shop.address}</p>
                </div>
              `
            });

            shopMarker.addListener('click', () => {
              shopInfoWindow.open(map, shopMarker);
            });
          }
        });

        setMapLoaded(true);
      } catch (error) {
        console.error('지도 초기화 오류:', error);
        setMapError(true);
      }
    };

    loadGoogleMaps();
  }, [lat, lng, address, shops]);

  // API 키가 없거나 오류가 발생한 경우 플레이스홀더 표시
  if (mapError || !mapLoaded) {
    return (
      <div className="w-full">
        <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border-2 border-blue-300 flex flex-col items-center justify-center text-center p-6">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-bold text-blue-800 mb-2">Google Maps API 필요</h3>
          <p className="text-blue-700 mb-4">
            실제 인터랙티브 지도를 사용하려면 Google Maps API 키가 필요합니다.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
            <p className="font-semibold mb-2">설정 방법:</p>
            <ol className="text-left space-y-1">
              <li>1. Google Cloud Console에서 Maps API 활성화</li>
              <li>2. API 키 생성</li>
              <li>3. .env.local에 NEXT_PUBLIC_GOOGLE_MAPS_API_KEY 추가</li>
            </ol>
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
          실제 Google Maps가 로드되었습니다. 줌인/줌아웃 및 팬이 가능합니다.
        </p>
      </div>
    </div>
  );
}

// Google Maps 타입 선언
declare global {
  interface Window {
    google: any;
  }
}
