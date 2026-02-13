import { NextRequest, NextResponse } from "next/server";
import {
  PACKAGE_TIERS,
  type PackageTier,
  getDefaultTenantId,
  inMemoryLicenseStore,
  BETA_TIER_COOKIE_NAME,
} from "@/lib/beta-license";

const BETA_COOKIE_NAME = "besma_beta";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1년

export async function POST(request: NextRequest) {
  const hasBeta = request.cookies.get(BETA_COOKIE_NAME)?.value === "1";
  if (!hasBeta) {
    return NextResponse.json({ error: "Beta access required." }, { status: 403 });
  }

  let body: { package_tier?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const raw = body.package_tier;
  if (typeof raw !== "string" || !PACKAGE_TIERS.includes(raw as PackageTier)) {
    return NextResponse.json(
      { error: "package_tier must be one of: ERP_ONLY, SAFETY_ONLY, BUNDLE." },
      { status: 400 }
    );
  }

  const tier = raw as PackageTier;
  const tenantId = getDefaultTenantId();
  await inMemoryLicenseStore.setTier(tenantId, tier);

  const res = NextResponse.json({ success: true, package_tier: tier });
  res.cookies.set(BETA_TIER_COOKIE_NAME, tier, {
    httpOnly: false,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
