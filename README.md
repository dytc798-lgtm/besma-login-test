# BESMA Platform

부현전기 안전보건 통합 플랫폼 (Boohyun Electric Safety Management App)

## 개요

BESMA는 건설 현장의 안전보건 관리를 위한 통합 플랫폼입니다. 작업 관리, 위험 평가, 법령 준수, 문서 관리 등 안전보건 관련 모든 기능을 제공합니다.

## 주요 기능

### 1. 작업 관리
- **작업계획서**: 지게차, 크레인, 굴착기 작업계획서 작성 및 자동 안전계수 계산
- **작업허가서**: 현장 승인 → 본사 승인 플로우 관리
- **작업 관리**: 작업지시 확인 및 진행 현황 관리
- **TBM 일지**: 작업 전 회의록 및 안전교육 기록
- **무재해일지**: 일일 작업 완료 기록 및 서명 관리

### 2. 위험 관리
- **위험성 평가**: 위험요인 등록 및 조치 관리
- **아차사고 보고**: Near Miss 보고 및 TBM 가이드 연동
- **안전 신문고**: 위험요인 신고 및 처리 현황

### 3. 법령 및 컴플라이언스
- **법령 정보**: 산안법, 중처법 등 법령 조회 및 검색
- **컴플라이언스 대시보드**: 법령 준수율 모니터링
- **법령 요지**: 전기공사 관련 법령 요약

### 4. 교육 및 점검
- **안전 교육**: 교육 계획 및 이력 관리
- **점검계획**: 점검 일정 및 결과 관리
- **인력 관리**: 근로자 자격증 및 교육 이력 관리

### 5. 문서 관리
- **안전문서 취합**: 전현장 필수 안전 서류 제출 현황 관리
- **안전문서 설정**: 서류 종류 및 주기 관리

### 6. 현장 관리
- **본사 대시보드**: 전사 안전보건 현황 모니터링
- **현장 대시보드**: 현장별 실시간 현황 및 GIS 지도
- **근로자 앱**: 모바일 기반 작업 확인 및 서명

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom Components (shadcn/ui 스타일)
- **Charts**: Recharts
- **Icons**: Lucide React
- **DB (베타)**: PostgreSQL + Prisma ORM, 로컬은 Docker Compose로 Postgres 제공

## 시작하기

### 설치

```bash
npm install
```

### 환경변수 (베타 `/beta` 접근)

`.env.example`을 참고해 `.env.local`을 만드세요.

- **BETA_PASSCODE**: 베타 경로 접근용 패스코드 (코드에 넣지 말고 환경변수로만 검증)
- **DATABASE_URL**: Prisma용 PostgreSQL 연결 문자열 (로컬 Docker 또는 Neon/Supabase 등)

**Vercel**: 프로젝트 설정 → Environment Variables에 `BETA_PASSCODE`, `DATABASE_URL` 등록.

### 로컬 환경 (베타 개발용 DB)

베타(`/beta`) 기능(작업지시·작업일보 등)은 DB가 필요합니다. 로컬에서는 Docker로 Postgres를 띄우고, ORM/마이그레이션으로 스키마를 맞춥니다.

**순서:**

1. **환경 설정**  
   `.env.example` 내용을 `.env.local`로 복사한 뒤, `DATABASE_URL`이 로컬 Postgres를 가리키는지 확인 (Docker 사용 시 예: `postgresql://postgres:postgres@localhost:5432/besma?schema=public`). 마이그레이션/시드는 `.env.local`을 사용합니다.

2. **Postgres 기동 (Docker)**

   ```bash
   docker compose up -d
   ```

3. **마이그레이션 적용**

   ```bash
   npm run db:migrate
   ```

4. **시드 데이터 넣기** (현장·근로자 등)

   ```bash
   npm run db:seed
   ```

5. **개발 서버 실행**

   ```bash
   npm run dev
   ```

이후 [http://localhost:3000](http://localhost:3000)에서 확인하고, **베타 전용 기능은 `/beta` 하위에서만** 사용할 수 있습니다.

**Managed Postgres(Neon, Supabase 등) 사용 시:**  
`docker-compose`는 사용하지 않고, 해당 서비스에서 제공하는 **connection string**을 `.env.local`의 `DATABASE_URL`에 넣으면 됩니다. 마이그레이션·시드·앱 실행 방식은 동일합니다 (`db:migrate` → `db:seed` → `npm run dev`).

### 개발 서버만 실행 (DB 없이)

DB 없이 프론트/일부 API만 확인할 때:

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요. 베타 DB 연동 기능은 `DATABASE_URL`이 없으면 동작하지 않을 수 있습니다.

### 라우트 보호(allowlist) 테스트

`npm run dev` 후 허용 경로만 열리는지 확인: `http://localhost:3000/` → 200, `http://localhost:3000/beta` → 쿠키 없으면 `/`로 리다이렉트. `http://localhost:3000/admin`, `http://localhost:3000/demo`, `http://localhost:3000/plan` 등은 모두 `/`로 리다이렉트되어야 함.

### 홈페이지 수정이 안 보일 때

로컬: 저장 후 브라우저 **강력 새로고침**(Ctrl+Shift+R) 또는 개발 서버 재시작. 배포(Vercel): 최신 커밋 푸시 후 배포 완료까지 대기 → 대시보드에서 **Redeploy** 한 번 실행해 보기. 루트 레이아웃에 `dynamic = "force-dynamic"`이 있어 캐시로 인한 미반영을 줄였음.

### DB 스크립트 (베타)

- `npm run db:migrate` — Prisma 마이그레이션 적용
- `npm run db:seed` — 시드 데이터 삽입 (현장·근로자 등)

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
BESMA/
├── app/                    # Next.js App Router 페이지
│   ├── dashboard/         # 대시보드 및 기능 페이지
│   ├── beta/              # 베타 전용 (작업지시·작업일보 등, /beta 하위)
│   ├── plan/              # 플랫폼 구축 계획 페이지
│   └── layout.tsx         # 루트 레이아웃
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/                # UI 컴포넌트 (Button, Card 등)
│   ├── MobileView.tsx     # 모바일 뷰 컴포넌트
│   └── SignaturePad.tsx  # 서명 패드 컴포넌트
├── lib/                   # 유틸리티 및 데이터
│   ├── prisma.ts          # Prisma 클라이언트 (DB)
│   ├── mock-data.ts       # Mock 데이터
│   ├── legal-data.ts      # 법령 데이터
│   └── safety-document-config.ts  # 안전문서 설정
├── prisma/                # ORM 스키마·마이그레이션·시드
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── docker-compose.yml     # 로컬 Postgres (베타 개발용)
└── public/                # 정적 파일
```

## 주요 페이지

- `/` - 랜딩 페이지
- `/plan` - 플랫폼 구축 계획
- `/dashboard` - 본사 대시보드
- `/dashboard/work-plan` - 작업계획서
- `/dashboard/work-permit` - 작업허가서
- `/dashboard/safety-documents` - 안전문서 취합
- `/dashboard/worker-app` - 근로자 앱 시뮬레이션

## 배포

Vercel을 통한 배포를 지원합니다.

```bash
vercel --prod
```

## 라이선스

Private - 부현전기 내부 사용
