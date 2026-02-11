/**
 * 부현전기 안전보건 플랫폼 - 아키텍처 구성도 설정
 * 보고용 데모: 메뉴/라우팅/목업 일관성 유지
 */

export const ARCH_ROUTES = {
  index: "/architecture",
  mobile: "/architecture/mobile",
  siteAdmin: "/architecture/site-admin",
  hqAdmin: "/architecture/hq-admin",
  // 플랫폼 개요 페이지 (플랫폼 박스 클릭 시 이동)
  platformCore: "/architecture/platform",
} as const;

export const MOBILE_FUNCTIONS = [
  "작업지시 확인",
  "위험성평가 작성",
  "TBM 서명",
  "위험 신고 (사진/음성/텍스트)",
  "작업중지권 발동",
  "MSDS 조회",
] as const;

export const SITE_ADMIN_FUNCTIONS = [
  "현장 현황 대시보드",
  "위험신고 관리",
  "시정조치 등록/확인",
  "TBM 관리",
  "근로자 관리",
  "산안비 사용 촬영",
  "산안비 집행 관리",
  "교육 이수 관리",
  "건강정보 등록",
] as const;

export const HQ_ADMIN_FUNCTIONS = [
  "표준 위험성평가 DB 관리",
  "사고사례 관리",
  "KPI 관리",
  "통합 관제 (지도 기반)",
  "ERP 연동 관리",
  "결재함",
] as const;

export const PLATFORM_CORE_FUNCTIONS = [
  "위험성평가 엔진",
  "가변 위험요인 DB",
  "MOC(작업 변경 감지)",
  "Health-Lock",
  "OCR 처리",
  "알림 엔진",
] as const;

export const EXTERNAL_FUNCTIONS = [
  "ERP",
  "OCR 엔진",
  "알림톡",
  "기상청 API",
] as const;

export const ARROW_LABELS = {
  mobileToPlatform: "작업 결과 전송",
  platformToExternal: "연동 정보 수신",
  platformToSiteAdmin: "현장 결과 공유",
  platformToHqAdmin: "관리 현황 공유",
  hqToExternal: "알림 발송",
} as const;

export type ArchitectureSection = keyof typeof ARCH_ROUTES;
