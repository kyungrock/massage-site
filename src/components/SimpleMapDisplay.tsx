'use client';

interface SimpleMapDisplayProps {
  lat: number;
  lng: number;
  address: string;
}

export default function SimpleMapDisplay({ lat, lng, address }: SimpleMapDisplayProps) {
  return (
    <div className="w-full">
      {/* 지도 대체 화면 */}
      <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border-2 border-blue-300 flex flex-col items-center justify-center text-center p-6">
        <div className="text-6xl mb-4">🗺️</div>
        <h3 className="text-xl font-bold text-blue-800 mb-2">지도 미리보기</h3>
        <p className="text-blue-700 mb-4">{address}</p>
        
        {/* 좌표 정보 */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
          <p className="text-sm text-gray-600 mb-2">위치 정보</p>
          <p className="font-mono text-sm text-gray-800">
            위도: {lat.toFixed(6)}
          </p>
          <p className="font-mono text-sm text-gray-800">
            경도: {lng.toFixed(6)}
          </p>
        </div>
        
        {/* 지도 링크 */}
        <div className="flex flex-col sm:flex-row gap-2">
          <a
            href={`https://www.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="mr-2">🌍</span>
            Google Maps에서 보기
          </a>
          
          <a
            href={`https://map.kakao.com/link/map/${address},${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <span className="mr-2">🗺️</span>
            카카오맵에서 보기
          </a>
        </div>
        
        {/* 설명 */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
          <p><strong>💡 팁:</strong> 위 버튼을 클릭하면 실제 지도에서 위치를 확인할 수 있습니다.</p>
        </div>
      </div>
      
      {/* 주소 정보 */}
      <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-800 flex items-center">
          <span className="mr-2">📍</span>
          <strong>주소:</strong> {address}
        </p>
        <p className="text-xs text-gray-600 mt-1">
          <strong>좌표:</strong> {lat.toFixed(6)}, {lng.toFixed(6)}
        </p>
      </div>
    </div>
  );
}
