/**
 * 작업일보 샘플 3건을 in-memory 저장소에 추가.
 * (작업일보는 DB가 아니라 메모리 저장이므로, 서버 기동 후 이 API를 한 번 호출하면 됨)
 */
import { NextRequest, NextResponse } from "next/server";
import { createWorklogManual, listWorklogs, getDefaultTenantId } from "@/lib/beta-safety-worklog";

const BETA_COOKIE = "besma_beta";

export async function GET(request: NextRequest) {
  if (request.cookies.get(BETA_COOKIE)?.value !== "1") {
    return NextResponse.json({ error: "Beta access required." }, { status: 403 });
  }
  const tenantId = getDefaultTenantId();
  const existing = listWorklogs(tenantId, { siteId: "seed-site-1" });
  if (existing.length >= 3) {
    return NextResponse.json({ message: "Already seeded.", items: existing.slice(0, 3) });
  }
  const siteId = "seed-site-1";
  const today = new Date().toISOString().slice(0, 10);
  const created = [
    createWorklogManual(tenantId, {
      siteId,
      workDate: today,
      crew: "1반",
      workName: "트레이 설치",
      description: "전선 트레이 설치 작업",
      hazard: "감전, 낙하",
      measure: "절연장갑, 안전모",
    }),
    createWorklogManual(tenantId, {
      siteId,
      workDate: today,
      crew: "2반",
      workName: "배관 용접",
      description: "배관 접합 용접",
      hazard: "화재, 착화",
      measure: "소화기 비치, 용접장갑",
    }),
    createWorklogManual(tenantId, {
      siteId,
      workDate: today,
      crew: "1반",
      workName: "타설 작업",
      description: "콘크리트 타설",
      hazard: "낙하, 미끄러움",
      measure: "안전화, 보호구",
    }),
  ];
  return NextResponse.json({ message: "Seeded 3 worklogs.", items: created });
}
