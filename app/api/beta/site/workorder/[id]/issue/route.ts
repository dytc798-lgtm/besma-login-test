import { NextRequest, NextResponse } from "next/server";
import { issueWorkOrder } from "@/lib/beta-workorder";
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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const err = requireBeta(request) ?? requireSiteAdmin(request);
  if (err) return err;
  const { id } = await params;
  const actorId = request.cookies.get("besma_beta_worker_id")?.value ?? "site-admin";
  try {
    const order = await issueWorkOrder(id, actorId);
    return NextResponse.json(order);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Issue failed.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
