import { NextRequest, NextResponse } from "next/server";
import {
  getDefaultTenantId,
  inMemoryLicenseStore,
  parseTierFromCookie,
  DEFAULT_TIER,
  BETA_TIER_COOKIE_NAME,
} from "@/lib/beta-license";

const BETA_COOKIE_NAME = "besma_beta";

export async function GET(request: NextRequest) {
  const hasBeta = request.cookies.get(BETA_COOKIE_NAME)?.value === "1";
  if (!hasBeta) {
    return NextResponse.json({ error: "Beta access required." }, { status: 403 });
  }

  const cookieTier = parseTierFromCookie(
    request.cookies.get(BETA_TIER_COOKIE_NAME)?.value
  );
  if (cookieTier) {
    return NextResponse.json({ package_tier: cookieTier });
  }
  const tenantId = getDefaultTenantId();
  const stored = await inMemoryLicenseStore.getTier(tenantId);
  const tier = stored ?? DEFAULT_TIER;
  return NextResponse.json({ package_tier: tier });
}
