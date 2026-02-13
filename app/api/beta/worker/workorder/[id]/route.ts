import { NextRequest, NextResponse } from "next/server";
import { getWorkOrderById } from "@/lib/beta-workorder";
import { getWorklogById } from "@/lib/beta-safety-worklog";
import { getBetaWorkerIdFromCookie } from "@/lib/beta-auth";

const BETA_COOKIE = "besma_beta";

function requireBeta(request: NextRequest): NextResponse | null {
  if (request.cookies.get(BETA_COOKIE)?.value !== "1") {
    return NextResponse.json({ error: "Beta access required." }, { status: 403 });
  }
  return null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const err = requireBeta(request);
  if (err) return err;
  const workerId = getBetaWorkerIdFromCookie(request.cookies.get("besma_beta_worker_id")?.value);
  const { id } = await params;
  const order = await getWorkOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  if (workerId && order.assigneeId !== workerId) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }
  const worklog = getWorklogById(order.worklogId);
  return NextResponse.json({ order, worklog: worklog ?? null });
}
