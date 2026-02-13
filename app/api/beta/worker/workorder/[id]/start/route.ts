import { NextRequest, NextResponse } from "next/server";
import { startWorkOrder } from "@/lib/beta-workorder";
import { getBetaWorkerIdFromCookie } from "@/lib/beta-auth";

const BETA_COOKIE = "besma_beta";

function requireBeta(request: NextRequest): NextResponse | null {
  if (request.cookies.get(BETA_COOKIE)?.value !== "1") {
    return NextResponse.json({ error: "Beta access required." }, { status: 403 });
  }
  return null;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const err = requireBeta(request);
  if (err) return err;
  const workerId = getBetaWorkerIdFromCookie(request.cookies.get("besma_beta_worker_id")?.value);
  if (!workerId) {
    return NextResponse.json({ error: "besma_beta_worker_id required." }, { status: 403 });
  }
  const { id } = await params;
  try {
    const order = await startWorkOrder(id, workerId);
    return NextResponse.json(order);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Start failed.";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
