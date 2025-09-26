# 마사지 예약 플랫폼

Next.js 14 기반의 마사지 업체 예약 플랫폼입니다.

## 주요 기능

- 🏢 **업체 관리**: 지역별 마사지 업체 리스트 및 상세 정보
- 🔍 **검색/필터**: 지역, 가격, 서비스 종류별 검색 및 필터링
- 📅 **예약 시스템**: 실시간 예약 및 예약 관리
- 👨‍💼 **관리자 페이지**: 업체 등록/수정/삭제 기능
- 🗺️ **지도 통합**: 업체 위치 표시 (Mapbox/Google Maps)
- 📱 **반응형 디자인**: 모바일/태블릿/데스크톱 지원
- 🔍 **SEO 최적화**: 메타데이터, 사이트맵, 구조화된 데이터

## 기술 스택

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Maps**: Mapbox/Google Maps API
- **UI Components**: Lucide React Icons
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── shops/         # 업체 관련 API
│   │   └── bookings/      # 예약 관련 API
│   ├── admin/             # 관리자 페이지
│   ├── shops/             # 업체 페이지
│   └── globals.css        # 전역 스타일
├── components/            # React 컴포넌트
│   ├── Header.tsx         # 헤더
│   ├── Footer.tsx         # 푸터
│   ├── ShopCard.tsx       # 업체 카드
│   ├── BookingModal.tsx   # 예약 모달
│   └── ...
├── lib/                   # 유틸리티 및 설정
│   ├── mongodb.ts         # MongoDB 연결
│   ├── models/            # 데이터베이스 모델
│   └── geocoding.ts       # 지오코딩 유틸리티
├── types/                 # TypeScript 타입 정의
└── hooks/                 # 커스텀 훅
```

## 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:

```env
MONGODB_URI=mongodb://localhost:27017/massage-booking
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token-here
```

### 3. MongoDB 설정

MongoDB를 설치하고 실행하세요:

```bash
# MongoDB 설치 (macOS)
brew install mongodb-community

# MongoDB 실행
brew services start mongodb-community
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 데이터베이스 스키마

### MassageShop (업체)
- 기본 정보: 이름, 설명, 주소, 연락처
- 서비스: 서비스 목록, 가격, 소요시간
- 위치: 위도/경도 좌표
- 운영시간: 요일별 운영시간
- 편의시설: 주차장, 샤워시설 등

### Booking (예약)
- 예약 정보: 업체, 서비스, 날짜/시간
- 고객 정보: 이름, 연락처, 이메일
- 상태: 대기/확정/취소/완료

### Review (리뷰)
- 리뷰 내용: 평점, 댓글, 이미지
- 작성자 정보: 이름, 작성일

## API 엔드포인트

### 업체 관련
- `GET /api/shops` - 업체 목록 조회
- `GET /api/shops/[id]` - 업체 상세 조회
- `POST /api/shops` - 업체 등록
- `PUT /api/shops/[id]` - 업체 수정
- `DELETE /api/shops/[id]` - 업체 삭제

### 예약 관련
- `GET /api/bookings` - 예약 목록 조회
- `POST /api/bookings` - 예약 생성
- `PUT /api/bookings/[id]` - 예약 수정
- `DELETE /api/bookings/[id]` - 예약 취소

## 배포

### Vercel 배포

1. GitHub에 코드 푸시
2. Vercel에서 프로젝트 연결
3. 환경 변수 설정
4. MongoDB Atlas 연결

### 환경 변수 설정 (배포시)

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/massage-booking
NEXTAUTH_SECRET=production-secret-key
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_MAPBOX_TOKEN=your-mapbox-token
```

## 주요 기능 상세

### 1. 업체 검색 및 필터링
- 지역별 검색 (시/도, 구/군)
- 가격 범위 필터
- 서비스 카테고리 필터
- 평점 필터
- 편의시설 필터

### 2. 예약 시스템
- 실시간 예약 가능 시간 확인
- 예약 중복 방지
- 예약 상태 관리
- 이메일/SMS 알림 (구현 예정)

### 3. 관리자 기능
- 업체 등록/수정/삭제
- 예약 관리
- 통계 대시보드
- 사용자 관리

### 4. SEO 최적화
- 메타데이터 최적화
- 구조화된 데이터 (JSON-LD)
- 사이트맵 자동 생성
- robots.txt 설정

## 개발 가이드

### 새로운 컴포넌트 추가
1. `src/components/` 디렉토리에 컴포넌트 생성
2. TypeScript 타입 정의
3. TailwindCSS로 스타일링
4. Storybook 문서화 (선택사항)

### API 라우트 추가
1. `src/app/api/` 디렉토리에 라우트 생성
2. HTTP 메서드별 핸들러 구현
3. 데이터베이스 모델 연동
4. 에러 처리 및 검증

### 데이터베이스 모델 추가
1. `src/lib/models/` 디렉토리에 모델 생성
2. Mongoose 스키마 정의
3. 인덱스 설정
4. 타입 정의 추가

## 라이선스

MIT License

## 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

