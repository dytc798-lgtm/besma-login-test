import { NextRequest, NextResponse } from "next/server";
import { listWorkOrdersForWorker } from "@/lib/beta-workorder";
import { getBetaRoleFromCookie, getBetaWorkerIdFromCookie } from "@/lib/beta-auth";

const BETA_COOKIE = "besma_beta";

function requireBeta(request: NextRequest): NextResponse | null {
  if (request.cookies.get(BETA_COOKIE)?.value !== "1") {
    return NextResponse.json({ error: "Beta access required." }, { status: 403 });
  }
  return null;
}

function requireWorker(request: NextRequest): { workerId: string } | NextResponse {
  const role = getBetaRoleFromCookie(request.cookies.get("besma_beta_role")?.value);
  const workerId = getBetaWorkerIdFromCookie(request.cookies.get("besma_beta_worker_id")?.value);
  if (role !== "WORKER" || !workerId) {
    return NextResponse.json({ error: "WORKER role and besma_beta_worker_id required." }, { status: 403 });
  }
  return { workerId };
}

export async function GET(request: NextRequest) {
  const err = requireBeta(request);
  if (err) return err;
  const auth = requireWorker(request);
  if (auth instanceof NextResponse) return auth;
  const list = await listWorkOrdersForWorker(undefined, auth.workerId);
  return NextResponse.json({ items: list });
}
