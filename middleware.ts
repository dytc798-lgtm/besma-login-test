import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  BETA_TIER_COOKIE_NAME,
  parseTierFromCookie,
  isPathAllowedForTier,
  DEFAULT_TIER,
} from "@/lib/beta-license";

const BETA_COOKIE_NAME = "besma_beta";

/** 베타 쿠키가 있어야 접근 가능한 경로 (데모/관리용) */
const BETA_GATED_PREFIXES = ["/dashboard", "/demo", "/architecture", "/admin", "/plan"];

function isBetaGatedPath(path: string): boolean {
  return BETA_GATED_PREFIXES.some((prefix) => path === prefix || path.startsWith(prefix + "/"));
}

/** allowlist: 이 경로만 허용, 나머지는 리다이렉트 */
function isPathAllowed(path: string, hasBetaCookie: boolean): boolean {
  if (path === "/") return true;
  if (path.startsWith("/_next/") || path === "/favicon.ico" || path === "/robots.txt") return true;
  if (path.startsWith("/api/beta/unlock")) return true;
  if (path.startsWith("/api/beta/license")) return true;
  if (path.startsWith("/beta")) return true;
  if (isBetaGatedPath(path)) return hasBetaCookie;
  return false;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const hasBetaCookie = request.cookies.get(BETA_COOKIE_NAME)?.value === "1";

  if (!isPathAllowed(path, hasBetaCookie)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path.startsWith("/api/beta/unlock") || path.startsWith("/api/beta/license")) {
    return NextResponse.next();
  }

  if (path.startsWith("/beta")) {
    const hasCookie = request.cookies.get(BETA_COOKIE_NAME)?.value === "1";
    if (!hasCookie) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    const tierRaw = request.cookies.get(BETA_TIER_COOKIE_NAME)?.value;
    const tier = parseTierFromCookie(tierRaw) ?? DEFAULT_TIER;
    if (!isPathAllowedForTier(path, tier)) {
      return NextResponse.redirect(new URL("/beta", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|woff2?)$).*)"],
};
