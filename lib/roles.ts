// 도메인(업무) 역할: 문서/견적/시방서/화면에 쓰는 공식 용어
export type Role = "HQ_ADMIN" | "SITE_ADMIN" | "WORKER";

// 화면/라우팅/기능 그룹핑: 코드 내부 표현(기존 구조 유지)
export type RoleCategory = "hq-admin" | "site-admin" | "mobile";

// 단일 매핑(절대 변경 금지 규칙으로 둘 것)
export const ROLE_CATEGORY_BY_ROLE: Record<Role, RoleCategory> = {
  HQ_ADMIN: "hq-admin",
  SITE_ADMIN: "site-admin",
  WORKER: "mobile",
};

// 화면 라벨(표기 통일)
export const ROLE_LABEL: Record<Role, string> = {
  HQ_ADMIN: "본사 관리자",
  SITE_ADMIN: "현장 관리자",
  WORKER: "근로자",
};
