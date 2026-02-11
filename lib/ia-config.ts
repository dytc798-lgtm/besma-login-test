import type { RoleCategory } from "./architecture-features";

export type IaItem = {
  id: string;
  title: string;
  description?: string;
  roleCategory: RoleCategory;
  path: string; // 절대 경로 (/architecture/ia/...)
  featureId?: string; // Feature.id 연결 (선택)
  children?: IaItem[];
};

export const IA_ROOT = "/architecture/ia";

export const IA_ITEMS: IaItem[] = [
  {
    id: "app-mobile",
    title: "[App] 현장근로자",
    description:
      "현장 근로자가 사용하는 모바일 앱 메뉴 구조 (대시보드, 작업지시, 위험신고, 작업중지권 등)",
    roleCategory: "mobile",
    path: `${IA_ROOT}/app/mobile`,
    children: [
      {
        id: "app-mobile-home",
        title: "홈 (대시보드/알림센터/기상정보)",
        description:
          "현장 근로자용 홈 화면으로, 작업 일정, 알림, 기상정보를 한눈에 보여줍니다.",
        roleCategory: "mobile",
        path: `${IA_ROOT}/app/mobile/home`,
      },
      {
        id: "app-mobile-smart-work-order",
        title: "스마트작업지시 (서명/완료확인)",
        description:
          "모바일에서 작업지시를 수신·확인하고, 동의 문구 및 전자서명으로 완료 여부를 기록합니다.",
        roleCategory: "mobile",
        path: `${IA_ROOT}/app/mobile/smart-work-order`,
        featureId: "mobile-work-order",
      },
      {
        id: "app-mobile-danger-report",
        title: "위험신고",
        description:
          "사진/음성/텍스트를 활용해 현장의 위험 상황을 즉시 신고합니다.",
        roleCategory: "mobile",
        path: `${IA_ROOT}/app/mobile/danger-report`,
        featureId: "mobile-danger-report",
      },
      {
        id: "app-mobile-stop-right",
        title: "작업중지권",
        description:
          "위험 상황에서 근로자가 자율적으로 작업을 중지하고 본사까지 보고하는 기능입니다.",
        roleCategory: "mobile",
        path: `${IA_ROOT}/app/mobile/stop-right`,
        featureId: "mobile-stop-right",
      },
      {
        id: "app-mobile-correction",
        title: "지적사항 (개선조치)",
        description:
          "순찰/점검에서 발생한 지적사항을 근로자 관점에서 확인하고 개선조치 결과를 조회합니다.",
        roleCategory: "mobile",
        path: `${IA_ROOT}/app/mobile/correction`,
      },
      {
        id: "app-mobile-mypage",
        title: "마이페이지 (내정보/포인트/건강검진/활동이력)",
        description:
          "근로자의 기본정보, 안전포인트, 건강검진 이력, 교육·TBM 참여 이력을 조회합니다.",
        roleCategory: "mobile",
        path: `${IA_ROOT}/app/mobile/mypage`,
      },
      {
        id: "app-mobile-settings",
        title: "설정/동의",
        description:
          "푸시 알림, 위치/GPS, 개인정보 활용 및 Health-Lock 연계 동의 화면입니다.",
        roleCategory: "mobile",
        path: `${IA_ROOT}/app/mobile/settings`,
      },
    ],
  },
  {
    id: "app-site-manager",
    title: "[App] 현장관리자",
    description:
      "현장관리자가 사용하는 관리자용 모바일/웹 앱 메뉴 구조입니다.",
    roleCategory: "site-admin",
    path: `${IA_ROOT}/app/site-manager`,
    children: [
      {
        id: "app-site-dashboard",
        title: "대시보드 (현장현황/미결알림)",
        description:
          "현장의 작업 현황, 미결 알림, 위험신고 현황을 실시간으로 보여주는 현장 대시보드입니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/site-manager/dashboard`,
        featureId: "site-dashboard",
      },
      {
        id: "app-site-work-orders",
        title: "작업지시 확인/미확인자 알림",
        description:
          "현장관리자가 발행한 작업지시의 확인 여부를 관리하고, 미확인자에게 알림을 전송합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/site-manager/work-orders`,
      },
      {
        id: "app-site-sign-photos",
        title: "작업종료 사진/서명현황",
        description:
          "작업 종료 시 촬영된 사진과 작업완료 서명 현황을 조회합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/site-manager/sign-photos`,
      },
      {
        id: "app-site-patrol",
        title: "순찰 지적/개선지시 · 시정조치 피드백",
        description:
          "순찰 중 발견된 지적사항을 등록하고, 개선지시 및 피드백을 관리합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/site-manager/patrol-correction`,
        featureId: "site-risk-report",
      },
      {
        id: "app-site-risk-stop",
        title: "위험요인·작업중지 신고 수신/평가",
        description:
          "근로자의 위험신고와 작업중지권 발동 내용을 수신·평가하고, 조치 상태를 관리합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/site-manager/risk-stop`,
      },
      {
        id: "app-site-budget-photo",
        title: "산안비 영수증 촬영",
        description:
          "모바일로 산안비 영수증을 촬영해 OCR 및 본사 집행 관리에 연계합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/site-manager/budget-photo`,
        featureId: "core-ocr",
      },
      {
        id: "app-site-doc-quick-check",
        title: "법적서류 간이확인",
        description:
          "현장에서 즉시 필요한 법적서류(작업허가서, 안전교육 이수 등)를 간단히 확인합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/site-manager/doc-quick-check`,
      },
    ],
  },
  {
    id: "web-site-manager",
    title: "[Web] 현장관리자",
    description:
      "현장관리자용 웹 포털 메뉴로, 일지/TBM/위험성평가/문서/산안비/사고보고 등을 통합 관리합니다.",
    roleCategory: "site-admin",
    path: `${IA_ROOT}/web/site-manager`,
    children: [
      {
        id: "web-site-daily",
        title: "작업일보 연동 (일지관리/TBM출력)",
        description:
          "작업일보와 TBM 기록을 연동해 일지 관리 및 출력 기능을 제공합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site-manager/daily-report`,
      },
      {
        id: "web-site-complete-cert",
        title: "완료확인 (무재해확인서)",
        description:
          "작업 완료 후 무재해 확인서 등 완료증빙 문서를 관리·출력합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site-manager/complete-cert`,
      },
      {
        id: "web-site-risk-db",
        title: "위험성평가 조회",
        description:
          "현장의 작업별 위험성평가 결과를 조회하고 이력을 관리합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site-manager/risk-assessment`,
        featureId: "core-risk-engine",
      },
      {
        id: "web-site-stop-log",
        title: "의견청취/중지 관리대장",
        description:
          "작업중지 및 의견청취 이력을 관리대장 형태로 기록·조회합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site-manager/stop-ledger`,
      },
      {
        id: "web-site-inspection",
        title: "점검/시정 출력",
        description:
          "점검 결과 및 시정조치 현황을 레포트 형태로 출력합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site-manager/inspection-report`,
      },
      {
        id: "web-site-docs",
        title: "문서업로드/준공서류",
        description:
          "현장 준공 서류 및 각종 안전문서를 업로드·보관합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site-manager/docs`,
      },
      {
        id: "web-site-budget",
        title: "산안비/예산 출력",
        description:
          "산업안전보건비 집행 및 예산 사용 현황을 집계·출력합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site-manager/budget`,
      },
      {
        id: "web-site-accident",
        title: "사고보고 (초도/중간/종결)",
        description:
          "사고 발생 시 초도보고, 중간보고, 종결보고를 단계별로 관리합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site-manager/accident-report`,
      },
      {
        id: "web-site-grade",
        title: "등급평가 / 부정로그 / 자료·공지",
        description:
          "현장 등급평가, 부정행위 로그, 자료실 및 공지사항을 관리합니다.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site-manager/grade-log`,
      },
    ],
  },
  {
    id: "web-hq",
    title: "[Web] 본사관리자",
    description:
      "본사 관리자용 통합 포털로, 통합관제/KPI/결재함/표준DB/통계/시스템관리를 수행합니다.",
    roleCategory: "hq-admin",
    path: `${IA_ROOT}/web/hq`,
    children: [
      {
        id: "web-hq-monitoring",
        title: "통합관제 (현황판/지도/리스크티커/퇴출·경고)",
        description:
          "전사 현황판, 지도 기반 모니터링, 리스크 티커, 퇴출·경고 대상 관리를 수행합니다.",
        roleCategory: "hq-admin",
        path: `${IA_ROOT}/web/hq/monitoring`,
      },
      {
        id: "web-hq-kpi",
        title: "KPI/문서취합/점수",
        description:
          "현장별 KPI와 문서 이행 현황을 취합하고 점수를 산정합니다.",
        roleCategory: "hq-admin",
        path: `${IA_ROOT}/web/hq/kpi`,
        featureId: "hq-standard-db",
      },
      {
        id: "web-hq-approval",
        title: "결재함 (미결재/승인반려이력/산안비현황)",
        description:
          "미결재 문서와 승인/반려 이력, 산안비 결재 현황을 관리합니다.",
        roleCategory: "hq-admin",
        path: `${IA_ROOT}/web/hq/approval`,
      },
      {
        id: "web-hq-standard-db",
        title:
          "표준DB (위험성평가 승격/개정결재, 사고사례 자동축적, 스마트자료실)",
        description:
          "표준 위험성평가 DB 승격/개정, 사고사례 축적, 자료실을 관리합니다.",
        roleCategory: "hq-admin",
        path: `${IA_ROOT}/web/hq/standard-db`,
        featureId: "hq-standard-db",
      },
      {
        id: "web-hq-stat",
        title: "통계/평가 (등급관리)",
        description:
          "현장별 등급 및 안전보건 성과를 통계적으로 분석합니다.",
        roleCategory: "hq-admin",
        path: `${IA_ROOT}/web/hq/stat-grade`,
      },
      {
        id: "web-hq-system",
        title:
          "시스템관리 (계정권한/알림관리/API모니터링/아카이브)",
        description:
          "계정·권한, 알림 정책, 외부 연동 API 모니터링, 데이터 아카이브를 관리합니다.",
        roleCategory: "hq-admin",
        path: `${IA_ROOT}/web/hq/system`,
      },
    ],
  },
];

// 평탄화된 IA 목록 (path로 검색용)
export function flattenIaItems(items: IaItem[] = IA_ITEMS): IaItem[] {
  const result: IaItem[] = [];
  const walk = (nodes: IaItem[]) => {
    for (const n of nodes) {
      result.push(n);
      if (n.children) walk(n.children);
    }
  };
  walk(items);
  return result;
}

