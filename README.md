# BESMA - 부현전기 안전보건플랫폼

중대재해처벌법 완벽 대응을 위한 디지털 안전보건 관리 플랫폼

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom Components (Shadcn UI 스타일)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Deployment**: Vercel

## 주요 기능

### 메인 랜딩 페이지
- Hero Section: 플랫폼 소개 및 CTA
- Key Features: AI 위험성평가, 스마트 TBM, 작업 허가제, Digital Edu Log
- Social Proof: 파트너사 로고

### 관리자 대시보드
- 실시간 현장 현황 (GIS Map)
- 작업 허가(PTW) 승인 대기
- 고위험 장비 현황
- 근로자 건강 & 기상 모니터링
- 교육 및 TBM 이행률
- 안전 신문고 (Feedback Loop)
- 협력사 평가 현황
- 위험성 평가 현황

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 프로젝트 구조

```
.
├── app/
│   ├── page.tsx          # 메인 랜딩 페이지
│   ├── dashboard/
│   │   └── page.tsx      # 관리자 대시보드
│   ├── layout.tsx        # 루트 레이아웃
│   └── globals.css       # 전역 스타일
├── components/
│   └── ui/               # UI 컴포넌트
├── lib/
│   ├── mock-data.ts      # Mock 데이터
│   └── utils.ts          # 유틸리티 함수
└── public/               # 정적 파일
```

## 배포

Vercel에 배포하려면:

1. GitHub에 프로젝트를 푸시
2. Vercel에 연결
3. 자동 배포 완료

또는 Vercel CLI 사용:

```bash
npm i -g vercel
vercel
```

## 참고사항

- 모든 데이터는 Mock 데이터로 구성되어 있습니다
- 실제 API 연동은 추후 구현 예정입니다
- 다국어 지원은 UI만 준비되어 있습니다 (기능 미구현)
