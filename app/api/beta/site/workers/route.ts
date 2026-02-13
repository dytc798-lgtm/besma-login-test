import { NextRequest, NextResponse } from "next/server";
import { listWorkers } from "@/lib/beta-workorder";
import { getBetaRoleFromCookie } from "@/lib/beta-auth";

const BETA_COOKIE = "besma_beta";

function requireBeta(request: NextRequest): NextResponse | null {
  if (request.cookies.get(BETA_COOKIE)?.value !== "1") {
    return NextResponse.json({ error: "Beta access required." }, { status: 403 });
  }
  return null;
}

function requireSiteAdmin(request: NextRequest): NextResponse | null {
  const role = getBetaRoleFromCookie(request.cookies.get("besma_beta_role")?.value);
  if (role !== "SITE_ADMIN" && role !== "HQ_ADMIN") {
    return NextResponse.json({ error: "SITE_ADMIN only." }, { status: 403 });
  }
  return null;
}

export async function GET(request: NextRequest) {
  const err = requireBeta(request) ?? requireSiteAdmin(request);
  if (err) return err;
  const siteId = request.nextUrl.searchParams.get("siteId") ?? undefined;
  const list = await listWorkers(undefined, siteId);
  return NextResponse.json({ items: list });
}
