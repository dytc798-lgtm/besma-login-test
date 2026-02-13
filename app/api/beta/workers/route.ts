/** 베타 역할 설정용: 근로자 목록 (쿠키 설정 시 사용) */
import { NextRequest, NextResponse } from "next/server";
import { listWorkers } from "@/lib/beta-workorder";

const BETA_COOKIE = "besma_beta";

export async function GET(request: NextRequest) {
  if (request.cookies.get(BETA_COOKIE)?.value !== "1") {
    return NextResponse.json({ error: "Beta access required." }, { status: 403 });
  }
  const list = await listWorkers();
  return NextResponse.json({ items: list });
}
