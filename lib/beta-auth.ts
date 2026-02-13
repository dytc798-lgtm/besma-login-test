/**
 * 베타 영역 간이 인증: 쿠키로 역할/근로자 식별.
 * SITE_ADMIN: 생성/배포만 가능
 * WORKER: 본인 배정 작업만 서명 가능 (besma_beta_worker_id와 assigneeId 일치)
 */

import type { Role } from "@/lib/roles";

export const BETA_ROLE_COOKIE = "besma_beta_role";
export const BETA_WORKER_ID_COOKIE = "besma_beta_worker_id";

export function getBetaRoleFromCookie(cookieValue: string | undefined): Role | null {
  if (!cookieValue) return null;
  if (cookieValue === "SITE_ADMIN" || cookieValue === "WORKER" || cookieValue === "HQ_ADMIN") return cookieValue;
  return null;
}

export function getBetaWorkerIdFromCookie(cookieValue: string | undefined): string | null {
  if (!cookieValue || typeof cookieValue !== "string") return null;
  return cookieValue.trim() || null;
}
