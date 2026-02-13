import { NextRequest, NextResponse } from "next/server";
import {
  getDefaultTenantId,
  createWorklogsFromImport,
  type SafetyWorklogInput,
} from "@/lib/beta-safety-worklog";

const BETA_COOKIE_NAME = "besma_beta";

function requireBeta(request: NextRequest): NextResponse | null {
  if (request.cookies.get(BETA_COOKIE_NAME)?.value !== "1") {
    return NextResponse.json({ error: "Beta access required." }, { status: 403 });
  }
  return null;
}

export async function POST(request: NextRequest) {
  const err = requireBeta(request);
  if (err) return err;

  let body: { rows: SafetyWorklogInput[]; fileRef?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const rows = Array.isArray(body.rows) ? body.rows : [];
  const fileRef = typeof body.fileRef === "string" ? body.fileRef : "upload";

  const normalized: SafetyWorklogInput[] = rows.map((r) => ({
    siteId: String(r?.siteId ?? "").trim(),
    workDate: String(r?.workDate ?? "").trim(),
    crew: String(r?.crew ?? "").trim(),
    workName: String(r?.workName ?? "").trim(),
    description: String(r?.description ?? "").trim(),
    hazard: String(r?.hazard ?? "").trim(),
    measure: String(r?.measure ?? "").trim(),
  }));

  const tenantId = getDefaultTenantId();
  const created = createWorklogsFromImport(tenantId, normalized, fileRef);
  return NextResponse.json({ count: created.length, items: created });
}
