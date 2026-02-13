import { NextRequest, NextResponse } from "next/server";
import { getDefaultTenantId, listWorklogs, createWorklogManual } from "@/lib/beta-safety-worklog";

const BETA_COOKIE_NAME = "besma_beta";

function requireBeta(request: NextRequest): NextResponse | null {
  if (request.cookies.get(BETA_COOKIE_NAME)?.value !== "1") {
    return NextResponse.json({ error: "Beta access required." }, { status: 403 });
  }
  return null;
}

export async function GET(request: NextRequest) {
  const err = requireBeta(request);
  if (err) return err;

  const { searchParams } = request.nextUrl;
  const siteId = searchParams.get("siteId") ?? undefined;
  const from = searchParams.get("from") ?? undefined;
  const to = searchParams.get("to") ?? undefined;

  const tenantId = getDefaultTenantId();
  const list = listWorklogs(tenantId, { siteId, from, to });
  return NextResponse.json({ items: list });
}

export async function POST(request: NextRequest) {
  const err = requireBeta(request);
  if (err) return err;

  let body: {
    siteId?: string;
    workDate?: string;
    crew?: string;
    workName?: string;
    description?: string;
    hazard?: string;
    measure?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const siteId = typeof body.siteId === "string" ? body.siteId.trim() : "";
  const workDate = typeof body.workDate === "string" ? body.workDate.trim() : "";
  const crew = typeof body.crew === "string" ? body.crew.trim() : "";
  const workName = typeof body.workName === "string" ? body.workName.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const hazard = typeof body.hazard === "string" ? body.hazard.trim() : "";
  const measure = typeof body.measure === "string" ? body.measure.trim() : "";

  if (!siteId || !workDate) {
    return NextResponse.json({ error: "siteId, workDate 필수." }, { status: 400 });
  }

  const tenantId = getDefaultTenantId();
  const row = createWorklogManual(tenantId, {
    siteId,
    workDate,
    crew,
    workName,
    description,
    hazard,
    measure,
  });
  return NextResponse.json(row);
}
