'use client';

interface StaticMapProps {
  lat: number;
  lng: number;
  address: string;
}

export default function StaticMap({ lat, lng, address }: StaticMapProps) {
  // 카카오 정적 지도 이미지 URL 생성
  const mapImageUrl = `https://dapi.kakao.com/v2/maps/staticmap?center=${lng},${lat}&level=3&size=600x320&markers=color:red|${lng},${lat}&appkey=8eec0890b2cb092db80119361928e156`;

  return (
    <div className="w-full">
      <div className="w-full h-80 rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden">
        <img
          src={mapImageUrl}
          alt={`${address} 위치`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // 이미지 로드 실패 시 대체 콘텐츠
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center text-center p-6">
                  <div class="text-6xl mb-4">🗺️</div>
                  <h3 class="text-xl font-bold text-blue-800 mb-2">지도 미리보기</h3>
                  <p class="text-blue-700 mb-4">${address}</p>
                  <div class="bg-blue-50 p-3 rounded-lg">
                    <p class="text-sm text-blue-800">
                      <strong>위치:</strong> ${lat.toFixed(6)}, ${lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              `;
            }
          }}
        />
      </div>
      
      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800 flex items-center">
          <span className="mr-2">📍</span>
          {address}
        </p>
        <p className="text-xs text-blue-600 mt-1">
          위치: {lat.toFixed(6)}, {lng.toFixed(6)}
        </p>
      </div>
    </div>
  );
}


