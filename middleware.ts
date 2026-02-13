import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  BETA_TIER_COOKIE_NAME,
  parseTierFromCookie,
  isPathAllowedForTier,
  DEFAULT_TIER,
} from "@/lib/beta-license";

const BETA_COOKIE_NAME = "besma_beta";

/** allowlist: 이 경로만 허용, 나머지는 리다이렉트(또는 404) */
function isPathAllowed(path: string): boolean {
  if (path === "/") return true;
  if (path.startsWith("/_next/") || path === "/favicon.ico" || path === "/robots.txt") return true;
  if (path.startsWith("/api/beta/unlock")) return true;
  if (path.startsWith("/api/beta/license")) return true; // /beta 페이지에서 사용
  if (path.startsWith("/beta")) return true;
  return false;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (!isPathAllowed(path)) {
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
