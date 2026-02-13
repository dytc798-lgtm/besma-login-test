import { NextRequest, NextResponse } from "next/server";
import {
  listWorkOrdersForSite,
  createWorkOrder,
} from "@/lib/beta-workorder";
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
  const siteId = request.nextUrl.searchParams.get("siteId");
  if (!siteId) {
    return NextResponse.json({ error: "siteId required." }, { status: 400 });
  }
  const status = request.nextUrl.searchParams.get("status") ?? undefined;
  const list = await listWorkOrdersForSite(undefined, siteId, status ? { status: status as "DRAFT" | "ISSUED" | "CONFIRMED" | "STARTED" | "ENDED" } : undefined);
  return NextResponse.json({ items: list });
}

export async function POST(request: NextRequest) {
  const err = requireBeta(request) ?? requireSiteAdmin(request);
  if (err) return err;
  const actorId = request.cookies.get("besma_beta_worker_id")?.value ?? "site-admin";
  let body: { siteId?: string; worklogId?: string; assigneeId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }
  const siteId = typeof body.siteId === "string" ? body.siteId.trim() : "";
  const worklogId = typeof body.worklogId === "string" ? body.worklogId.trim() : "";
  const assigneeId = typeof body.assigneeId === "string" ? body.assigneeId.trim() || undefined : undefined;
  if (!siteId || !worklogId) {
    return NextResponse.json({ error: "siteId, worklogId required." }, { status: 400 });
  }
  try {
    const order = await createWorkOrder("default", { siteId, worklogId, assigneeId }, actorId);
    return NextResponse.json(order);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Create failed.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
