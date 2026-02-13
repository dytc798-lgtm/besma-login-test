/**
 * 베타 영역 전용 제품 패키지 라이선스.
 * DB 없이 메모리/쿠키로 동작, 추후 DB 교체 가능하도록 인터페이스 유지.
 */

export type PackageTier = "ERP_ONLY" | "SAFETY_ONLY" | "BUNDLE";

export const PACKAGE_TIERS: PackageTier[] = [
  "ERP_ONLY",
  "SAFETY_ONLY",
  "BUNDLE",
];

export const PACKAGE_TIER_LABEL: Record<PackageTier, string> = {
  ERP_ONLY: "ERP 단독",
  SAFETY_ONLY: "안전보건 단독",
  BUNDLE: "ERP + 안전보건 번들",
};

export const BETA_TIER_COOKIE_NAME = "besma_beta_tier";
export const DEFAULT_TIER: PackageTier = "BUNDLE";

/** 라이선스 저장소 추상화 (추후 DB 구현체로 교체 가능) */
export interface LicenseStore {
  getTier(tenantId: string): Promise<PackageTier | null>;
  setTier(tenantId: string, tier: PackageTier): Promise<void>;
}

const DEFAULT_TENANT_ID = "default";

/** 메모리 저장소 (단일 프로세스 기준, DB 도입 시 교체) */
const memoryStore = new Map<string, PackageTier>();

export const inMemoryLicenseStore: LicenseStore = {
  async getTier(tenantId: string): Promise<PackageTier | null> {
    return memoryStore.get(tenantId) ?? null;
  },
  async setTier(tenantId: string, tier: PackageTier): Promise<void> {
    memoryStore.set(tenantId, tier);
  },
};

export function getDefaultTenantId(): string {
  return DEFAULT_TENANT_ID;
}

/**
 * 경로가 해당 티어로 접근 가능한지 판단.
 * /beta, /beta/admin → 항상 허용
 * /beta/erp, /beta/erp/* → ERP_ONLY | BUNDLE
 * /beta/safety, /beta/safety/* → SAFETY_ONLY | BUNDLE
 */
export function isPathAllowedForTier(path: string, tier: PackageTier): boolean {
  if (path === "/beta" || path === "/beta/") return true;
  if (path.startsWith("/beta/admin")) return true;
  if (path.startsWith("/beta/erp")) return tier === "ERP_ONLY" || tier === "BUNDLE";
  if (path.startsWith("/beta/safety")) return tier === "SAFETY_ONLY" || tier === "BUNDLE";
  if (path.startsWith("/beta/site") || path.startsWith("/beta/worker")) return tier === "SAFETY_ONLY" || tier === "BUNDLE";
  return true;
}

export function parseTierFromCookie(value: string | undefined): PackageTier | null {
  if (!value) return null;
  if (PACKAGE_TIERS.includes(value as PackageTier)) return value as PackageTier;
  return null;
}
