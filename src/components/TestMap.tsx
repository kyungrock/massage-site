'use client';

import { useEffect, useState } from 'react';

export default function TestMap() {
  const [status, setStatus] = useState('테스트 중...');

  useEffect(() => {
    // 카카오 API 키 테스트
    const apiKey = '8eec0890b2cb092db80119361928e156';
    
    // JavaScript API 로드 테스트
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}`;
    script.async = true;
    
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        setStatus('✅ 카카오 지도 API 로드 성공!');
      } else {
        setStatus('❌ 카카오 객체 로드 실패');
      }
    };
    
    script.onerror = () => {
      setStatus('❌ 스크립트 로드 실패 - API 키 또는 도메인 문제');
    };
    
    document.head.appendChild(script);
  }, []);

  return (
    <div className="w-full p-4 bg-white rounded-lg border">
      <h3 className="text-lg font-semibold mb-4">지도 API 테스트</h3>
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700 mb-2">현재 상태:</p>
        <p className="font-mono text-sm">{status}</p>
      </div>
      
      <div className="mt-4 p-3 bg-red-50 rounded-lg">
        <h4 className="font-semibold text-red-800 mb-2">401 오류 해결 방법:</h4>
        <ol className="text-sm text-red-700 space-y-2">
          <li><strong>1. 카카오 개발자 콘솔 접속</strong> (developers.kakao.com)</li>
          <li><strong>2. 애플리케이션 선택</strong> → 앱 설정 → 앱 키 확인</li>
          <li><strong>3. 플랫폼 설정</strong> → Web → 도메인 등록:
            <ul className="ml-4 mt-1">
              <li>• http://localhost:3000</li>
              <li>• https://xn--z69au6wh5golr.com</li>
            </ul>
          </li>
          <li><strong>4. 제품 설정</strong> → 카카오맵 → JavaScript API 활성화</li>
          <li><strong>5. 저장 후 브라우저 새로고침</strong> (Ctrl+F5)</li>
        </ol>
      </div>
      
      <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold text-yellow-800 mb-2">현재 API 키:</h4>
        <p className="font-mono text-xs text-yellow-700 break-all">
          8eec0890b2cb092db80119361928e156
        </p>
        <p className="text-xs text-yellow-600 mt-1">
          이 키가 카카오 개발자 콘솔의 JavaScript 키와 일치하는지 확인하세요.
        </p>
      </div>
    </div>
  );
}
