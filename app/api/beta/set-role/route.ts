import { NextRequest, NextResponse } from "next/server";
import { BETA_ROLE_COOKIE, BETA_WORKER_ID_COOKIE } from "@/lib/beta-auth";

const BETA_COOKIE = "besma_beta";

export async function POST(request: NextRequest) {
  if (request.cookies.get(BETA_COOKIE)?.value !== "1") {
    return NextResponse.json({ error: "Beta access required." }, { status: 403 });
  }
  let body: { role?: string; workerId?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }
  const role = body.role === "SITE_ADMIN" || body.role === "WORKER" || body.role === "HQ_ADMIN" ? body.role : null;
  const workerId = typeof body.workerId === "string" ? body.workerId.trim() || null : null;
  const res = NextResponse.json({ ok: true });
  const opts = { path: "/", maxAge: 60 * 60 * 24 * 7 };
  if (role) res.cookies.set(BETA_ROLE_COOKIE, role, opts);
  if (workerId != null) res.cookies.set(BETA_WORKER_ID_COOKIE, workerId ?? "", opts);
  return res;
}
