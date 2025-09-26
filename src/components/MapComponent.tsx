'use client';

import { useEffect, useRef } from 'react';

interface MapComponentProps {
  lat: number;
  lng: number;
  address: string;
}

export default function MapComponent({ lat, lng, address }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      // 더 명확하고 시각적인 지도 플레이스홀더
      mapRef.current.innerHTML = `
        <div style="
          width: 100%; 
          height: 300px; 
          background: linear-gradient(135deg, #1e40af 0%, #3b82f6 25%, #60a5fa 50%, #93c5fd 75%, #dbeafe 100%);
          display: flex; 
          flex-direction: column;
          align-items: center; 
          justify-content: center; 
          border-radius: 12px;
          color: white;
          font-size: 16px;
          text-align: center;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          border: 2px solid #3b82f6;
        " onmouseover="this.style.transform='scale(1.02)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.2)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)'">
          
          <!-- 지도 패턴 배경 -->
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 2px, transparent 2px),
              linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%);
            background-size: 20px 20px, 20px 20px, 100% 100%;
            opacity: 0.8;
          "></div>
          
          <!-- 메인 콘텐츠 -->
          <div style="position: relative; z-index: 2; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            <div style="font-size: 48px; margin-bottom: 16px; animation: pulse 2s infinite;">🗺️</div>
            <div style="font-weight: 800; margin-bottom: 12px; font-size: 24px; letter-spacing: 0.5px;">
              인터랙티브 지도
            </div>
            <div style="font-size: 14px; opacity: 0.9; margin-bottom: 8px; font-family: monospace;">
              📍 위도: ${lat.toFixed(6)}
            </div>
            <div style="font-size: 14px; opacity: 0.9; margin-bottom: 16px; font-family: monospace;">
              📍 경도: ${lng.toFixed(6)}
            </div>
            <div style="
              background: rgba(255,255,255,0.25); 
              padding: 12px 16px; 
              border-radius: 16px; 
              font-size: 14px; 
              margin-top: 12px;
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255,255,255,0.3);
              font-weight: 600;
            ">
              📍 ${address}
            </div>
            <div style="
              font-size: 12px; 
              opacity: 0.9; 
              margin-top: 12px;
              font-style: italic;
              background: rgba(0,0,0,0.2);
              padding: 6px 12px;
              border-radius: 20px;
              display: inline-block;
            ">
              ✨ 클릭하여 실제 지도 보기
            </div>
          </div>
          
          <!-- 펄스 애니메이션 -->
          <style>
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
          </style>
        </div>
      `;
    }
  }, [lat, lng, address]);

  return (
    <div>
      <div ref={mapRef} className="w-full h-80 rounded-lg overflow-hidden shadow-lg" />
      <p className="text-sm text-gray-600 mt-2 flex items-center">
        <span className="mr-1">📍</span>
        {address}
      </p>
      <div className="mt-2 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>지도 기능:</strong> 실제 서비스에서는 Google Maps API를 연동하여 
          인터랙티브한 지도와 길찾기 기능을 제공합니다.
        </p>
        <div className="mt-2 flex space-x-2">
          <button className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 transition-colors">
            길찾기
          </button>
          <button className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200 transition-colors">
            공유하기
          </button>
        </div>
      </div>
    </div>
  );
}