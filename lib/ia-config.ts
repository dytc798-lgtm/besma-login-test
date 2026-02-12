import type { RoleCategory } from "./architecture-features";

export type IaItem = {
  id: string;
  title: string;
  description?: string;
  roleCategory: RoleCategory;
  path: string;
  featureId?: string;
  children?: IaItem[];
};

export const IA_ROOT = "/architecture/ia";

/**
 * 최종 메뉴트리 확정본 (Depth 1~3).
 * 병합/분리/추가/삭제/명칭변경 금지.
 * Role: 문서/화면은 HQ_ADMIN | SITE_ADMIN | WORKER. roleCategory는 hq-admin | site-admin | mobile.
 */
export const IA_ITEMS: IaItem[] = [
  // ==================== A. 근로자 앱 (WORKER APP) ====================
  {
    id: "app-worker",
    title: "근로자 앱 (WORKER APP)",
    description: "근로자용 모바일 앱. 홈에 ‘작업중지’·‘위험요인신고’ 별도 버튼(고정 스펙).",
    roleCategory: "mobile",
    path: `${IA_ROOT}/app/worker`,
    children: [
      {
        id: "app-worker-home",
        title: "홈",
        description:
          "작업중지(SOS) 버튼·위험요인신고 버튼 홈 즉시 노출. 오늘 작업요약(금일 작업지시 상태).",
        roleCategory: "mobile",
        path: `${IA_ROOT}/app/worker/home`,
      },
      {
        id: "app-worker-work",
        title: "작업",
        roleCategory: "mobile",
        path: `${IA_ROOT}/app/worker/work`,
        children: [
          {
            id: "app-worker-work-today",
            title: "금일 작업지시",
            roleCategory: "mobile",
            path: `${IA_ROOT}/app/worker/work/today`,
            children: [
              {
                id: "app-worker-work-today-detail",
                title: "작업지시 상세(위험요인/대책 확인 + 서명)",
                roleCategory: "mobile",
                path: `${IA_ROOT}/app/worker/work/today/detail`,
                featureId: "mobile-work-order",
              },
              {
                id: "app-worker-work-today-start",
                title: "작업 시작(증빙용)",
                roleCategory: "mobile",
                path: `${IA_ROOT}/app/worker/work/today/start`,
              },
              {
                id: "app-worker-work-today-end",
                title: "작업 종료(서명 + 사진 업로드)",
                roleCategory: "mobile",
                path: `${IA_ROOT}/app/worker/work/today/end`,
              },
            ],
          },
          {
            id: "app-worker-work-history",
            title: "작업이력",
            description: "일자별 작업지시/서명/사진 기록.",
            roleCategory: "mobile",
            path: `${IA_ROOT}/app/worker/work/history`,
          },
        ],
      },
      {
        id: "app-worker-safety",
        title: "안전활동",
        roleCategory: "mobile",
        path: `${IA_ROOT}/app/worker/safety`,
        children: [
          {
            id: "app-worker-safety-report",
            title: "위험요인 신고",
            roleCategory: "mobile",
            path: `${IA_ROOT}/app/worker/safety/report`,
            children: [
              {
                id: "app-worker-safety-report-input",
                title: "입력(음성/촬영 + 텍스트)",
                roleCategory: "mobile",
                path: `${IA_ROOT}/app/worker/safety/report/input`,
                featureId: "mobile-danger-report",
              },
              {
                id: "app-worker-safety-report-nearmiss",
                title: "아차사고 전환(체크박스)",
                roleCategory: "mobile",
                path: `${IA_ROOT}/app/worker/safety/report/nearmiss`,
              },
              {
                id: "app-worker-safety-report-history",
                title: "신고이력",
                roleCategory: "mobile",
                path: `${IA_ROOT}/app/worker/safety/report/history`,
              },
            ],
          },
          {
            id: "app-worker-safety-tbm",
            title: "TBM(자동생성/서명연동)",
            roleCategory: "mobile",
            path: `${IA_ROOT}/app/worker/safety/tbm`,
            children: [
              {
                id: "app-worker-safety-tbm-today",
                title: "금일 TBM 확인",
                roleCategory: "mobile",
                path: `${IA_ROOT}/app/worker/safety/tbm/today`,
              },
              {
                id: "app-worker-safety-tbm-history",
                title: "서명 이력",
                roleCategory: "mobile",
                path: `${IA_ROOT}/app/worker/safety/tbm/history`,
              },
            ],
          },
        ],
      },
      {
        id: "app-worker-evidence",
        title: "증빙/내정보",
        roleCategory: "mobile",
        path: `${IA_ROOT}/app/worker/evidence`,
        children: [
          {
            id: "app-worker-evidence-cert",
            title: "이수증/자격",
            description: "이수증 등록/조회(기본). QR은 옵션(기본 메뉴에 QR 배치 금지).",
            roleCategory: "mobile",
            path: `${IA_ROOT}/app/worker/evidence/cert`,
          },
          {
            id: "app-worker-evidence-location",
            title: "내 위치기록(조회)",
            description: "최근 3개월 조회(기본). GPS 가변 주기·3개월 일반/5년 압축 보관.",
            roleCategory: "mobile",
            path: `${IA_ROOT}/app/worker/evidence/location`,
          },
        ],
      },
      {
        id: "app-worker-settings",
        title: "설정",
        roleCategory: "mobile",
        path: `${IA_ROOT}/app/worker/settings`,
        children: [
          {
            id: "app-worker-settings-notify",
            title: "알림/권한",
            roleCategory: "mobile",
            path: `${IA_ROOT}/app/worker/settings/notify`,
          },
          {
            id: "app-worker-settings-logout",
            title: "로그아웃",
            roleCategory: "mobile",
            path: `${IA_ROOT}/app/worker/settings/logout`,
          },
        ],
      },
    ],
  },

  // ==================== B. 관리자 앱 (ADMIN APP) ====================
  {
    id: "app-admin",
    title: "관리자 앱 (ADMIN APP)",
    description:
      "현장/본사 공용 관리자용 모바일. 위험요인신고/작업중지권은 홈 직접 노출 없음, 메뉴 진입 후 사용.",
    roleCategory: "site-admin",
    path: `${IA_ROOT}/app/admin`,
    children: [
      {
        id: "app-admin-home",
        title: "홈(관리업무 중심)",
        description:
          "현장 선택(권한 범위 내). 오늘 현장 요약(진행률/알림 배지). 빠른메뉴(작업관리/안전관리/문서/예산).",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/admin/home`,
      },
      {
        id: "app-admin-work",
        title: "작업관리",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/admin/work`,
        children: [
          {
            id: "app-admin-work-order",
            title: "작업지시(관리자용)",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/app/admin/work/order`,
            children: [
              {
                id: "app-admin-work-order-create",
                title: "작업지시 생성/배포(권한별)",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/app/admin/work/order/create`,
              },
              {
                id: "app-admin-work-order-status",
                title: "작업지시 현황(미확인/진행/종료)",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/app/admin/work/order/status`,
              },
              {
                id: "app-admin-work-order-sign",
                title: "개인별 서명 확인",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/app/admin/work/order/sign`,
              },
            ],
          },
          {
            id: "app-admin-work-daily",
            title: "작업일보(명일)",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/app/admin/work/daily`,
            children: [
              {
                id: "app-admin-work-daily-write",
                title: "작성(공무/작업팀장)",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/app/admin/work/daily/write`,
              },
              {
                id: "app-admin-work-daily-submit",
                title: "제출/공유",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/app/admin/work/daily/submit`,
              },
            ],
          },
        ],
      },
      {
        id: "app-admin-safety",
        title: "안전관리",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/admin/safety`,
        children: [
          {
            id: "app-admin-safety-opinion",
            title: "의견청취관리대장(=위험신고처리)",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/app/admin/safety/opinion`,
            children: [
              {
                id: "app-admin-safety-opinion-list",
                title: "신고 목록/상태",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/app/admin/safety/opinion/list`,
              },
              {
                id: "app-admin-safety-opinion-score",
                title: "1차/2차 점수 입력(권한별)",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/app/admin/safety/opinion/score`,
              },
            ],
          },
          {
            id: "app-admin-safety-sos",
            title: "작업중지권(SOS) 목록",
            description: "접수/조치상태 기록.",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/app/admin/safety/sos`,
            featureId: "mobile-stop-right",
          },
          {
            id: "app-admin-safety-inspection",
            title: "점검/시정조치",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/app/admin/safety/inspection`,
            children: [
              {
                id: "app-admin-safety-inspection-upload",
                title: "점검표 업로드/조회",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/app/admin/safety/inspection/upload`,
              },
              {
                id: "app-admin-safety-inspection-report",
                title: "시정조치보고서(PDF 출력/저장/열람)",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/app/admin/safety/inspection/report`,
              },
            ],
          },
        ],
      },
      {
        id: "app-admin-docs",
        title: "문서함",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/admin/docs`,
        children: [
          {
            id: "app-admin-docs-legal",
            title: "법정서류 업로드/조회",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/app/admin/docs/legal`,
          },
          {
            id: "app-admin-docs-ocr",
            title: "OCR 입력(옵션: 사진 확인 후 호출)",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/app/admin/docs/ocr`,
            featureId: "core-ocr",
          },
        ],
      },
      {
        id: "app-admin-budget",
        title: "예산(현장 입력 범위)",
        description: "예산은 본사 편성/통제. 현장은 사용실적 입력·조회만.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/admin/budget`,
        children: [
          {
            id: "app-admin-budget-input",
            title: "사용실적 입력",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/app/admin/budget/input`,
          },
          {
            id: "app-admin-budget-view",
            title: "사용현황 조회",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/app/admin/budget/view`,
          },
        ],
      },
      {
        id: "app-admin-emergency",
        title: "연락/비상",
        description: "고도화 분리 가능. 포함 시 여기 배치.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/admin/emergency`,
        children: [
          {
            id: "app-admin-emergency-contact",
            title: "비상연락망(전화걸기)",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/app/admin/emergency/contact`,
          },
          {
            id: "app-admin-emergency-card",
            title: "비상대응카드(열람)",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/app/admin/emergency/card`,
          },
        ],
      },
      {
        id: "app-admin-settings",
        title: "설정",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/app/admin/settings`,
        children: [
          {
            id: "app-admin-settings-notify",
            title: "알림/권한",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/app/admin/settings/notify`,
          },
          {
            id: "app-admin-settings-logout",
            title: "로그아웃",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/app/admin/settings/logout`,
          },
        ],
      },
    ],
  },

  // ==================== C. 현장 관리자 웹 (SITE WEB) ====================
  {
    id: "web-site",
    title: "현장 관리자 웹 (SITE WEB)",
    description: "SITE_ADMIN. 예산은 당 현장 사용실적 입력·조회만. 작업 완료 사진 승인/반려·작업관리 승인/반려 버튼 표시 금지.",
    roleCategory: "site-admin",
    path: `${IA_ROOT}/web/site`,
    children: [
      {
        id: "web-site-dashboard",
        title: "대시보드",
        description:
          "오늘 작업 진행률(공정표 표출 연계). 미확인/미서명/지연 알림.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site/dashboard`,
        featureId: "site-dashboard",
      },
      {
        id: "web-site-work",
        title: "작업관리",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site/work`,
        children: [
          {
            id: "web-site-work-daily",
            title: "작업일보(명일)",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/work/daily`,
            children: [
              {
                id: "web-site-work-daily-write",
                title: "작성/제출/승인(소장 승인 포함)",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/web/site/work/daily/write`,
              },
            ],
          },
          {
            id: "web-site-work-order",
            title: "작업지시",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/work/order`,
            children: [
              {
                id: "web-site-work-order-list",
                title: "목록/상세",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/web/site/work/order/list`,
              },
              {
                id: "web-site-work-order-sign",
                title: "개인별 확인(서명) 상태",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/web/site/work/order/sign`,
              },
              {
                id: "web-site-work-order-end",
                title: "종료(서명+사진) 상태 조회",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/web/site/work/order/end`,
              },
            ],
          },
          {
            id: "web-site-work-history",
            title: "작업이력",
            description: "기간/인원 필터 조회.",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/work/history`,
          },
        ],
      },
      {
        id: "web-site-safety",
        title: "안전관리",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site/safety`,
        children: [
          {
            id: "web-site-safety-risk",
            title: "위험성평가",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/safety/risk`,
            children: [
              {
                id: "web-site-safety-risk-write",
                title: "현장 위험성평가 작성/조회",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/web/site/safety/risk/write`,
                featureId: "core-risk-engine",
              },
              {
                id: "web-site-safety-risk-std",
                title: "표준 항목 참조(본사 표준DB 기반)",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/web/site/safety/risk/std`,
              },
            ],
          },
          {
            id: "web-site-safety-tbm",
            title: "TBM",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/safety/tbm`,
            children: [
              {
                id: "web-site-safety-tbm-journal",
                title: "TBM 일지(작업지시/서명 자동연동)",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/web/site/safety/tbm/journal`,
              },
              {
                id: "web-site-safety-tbm-focus",
                title: "중점위험 교육 항목 포함",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/web/site/safety/tbm/focus`,
              },
              {
                id: "web-site-safety-tbm-export",
                title: "출력(PDF/엑셀)",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/web/site/safety/tbm/export`,
              },
            ],
          },
          {
            id: "web-site-safety-opinion",
            title: "의견청취관리대장",
            description: "신고 목록/처리(현장 1차). 음성 입력은 로컬 STT 텍스트만 저장(권장).",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/safety/opinion`,
          },
          {
            id: "web-site-safety-inspection",
            title: "점검",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/safety/inspection`,
            children: [
              {
                id: "web-site-safety-inspection-patrol",
                title: "순회점검표 업로드/조회",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/web/site/safety/inspection/patrol`,
              },
              {
                id: "web-site-safety-inspection-supervisor",
                title: "관리감독자 점검표 업로드/조회(자동 생성 기반 포함)",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/web/site/safety/inspection/supervisor`,
              },
            ],
          },
          {
            id: "web-site-safety-correction",
            title: "시정조치보고서",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/safety/correction`,
            children: [
              {
                id: "web-site-safety-correction-register",
                title: "등록/열람",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/web/site/safety/correction/register`,
              },
              {
                id: "web-site-safety-correction-pdf",
                title: "PDF 출력/서버 저장",
                roleCategory: "site-admin",
                path: `${IA_ROOT}/web/site/safety/correction/pdf`,
              },
            ],
          },
        ],
      },
      {
        id: "web-site-docs",
        title: "문서함",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site/docs`,
        children: [
          {
            id: "web-site-docs-legal",
            title: "법정서류 업로드/조회",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/docs/legal`,
          },
          {
            id: "web-site-docs-edu",
            title: "교육/자격 서류 관리(OCR 옵션)",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/docs/edu`,
          },
        ],
      },
      {
        id: "web-site-budget",
        title: "예산(현장 범위)",
        description: "본사 편성/통제. 현장은 사용실적 입력·조회만.",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site/budget`,
        children: [
          {
            id: "web-site-budget-input",
            title: "사용실적 입력",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/budget/input`,
          },
          {
            id: "web-site-budget-view",
            title: "사용현황 조회",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/budget/view`,
          },
        ],
      },
      {
        id: "web-site-org",
        title: "인력/조직",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site/org`,
        children: [
          {
            id: "web-site-org-user",
            title: "사용자/권한(현장 내)",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/org/user`,
          },
          {
            id: "web-site-org-team",
            title: "팀/작업자 현황",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/org/team`,
          },
        ],
      },
      {
        id: "web-site-settings",
        title: "설정",
        roleCategory: "site-admin",
        path: `${IA_ROOT}/web/site/settings`,
        children: [
          {
            id: "web-site-settings-site",
            title: "현장정보",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/settings/site`,
          },
          {
            id: "web-site-settings-notify",
            title: "알림 설정",
            roleCategory: "site-admin",
            path: `${IA_ROOT}/web/site/settings/notify`,
          },
        ],
      },
    ],
  },

  // ==================== D. 본사 관리자 웹 (HQ WEB) ====================
  {
    id: "web-hq",
    title: "본사 관리자 웹 (HQ WEB)",
    description:
      "HQ_ADMIN. 통합관제, KPI, 표준DB, 결재, 통계, 시스템(본사 Feature 6개 확정). 예산 편성/통제·네이버웍스 품의(메일 Subject 수집만).",
    roleCategory: "hq-admin",
    path: `${IA_ROOT}/web/hq`,
    children: [
      {
        id: "web-hq-monitoring",
        title: "통합관제",
        roleCategory: "hq-admin",
        path: `${IA_ROOT}/web/hq/monitoring`,
        featureId: "hq-integrated-monitoring",
        children: [
          {
            id: "web-hq-monitoring-map",
            title: "전국 현장 지도(핀 상태)",
            description:
              "현장 클릭: 기본 정보 + 카카오지도 연계. SOS/긴급 이벤트 강조(깜빡임).",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/monitoring/map`,
          },
          {
            id: "web-hq-monitoring-list",
            title: "현장 목록",
            description:
              "현장 상태(서류/TBM/점검/사고). 담당자 지정현황(소장/공무/안전/관리감독자).",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/monitoring/list`,
          },
        ],
      },
      {
        id: "web-hq-kpi",
        title: "KPI",
        roleCategory: "hq-admin",
        path: `${IA_ROOT}/web/hq/kpi`,
        featureId: "hq-kpi",
        children: [
          {
            id: "web-hq-kpi-dashboard",
            title: "현장 KPI 대시보드",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/kpi/dashboard`,
          },
          {
            id: "web-hq-kpi-grade",
            title: "등급/점수 집계(연동 항목 포함)",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/kpi/grade`,
          },
        ],
      },
      {
        id: "web-hq-stddb",
        title: "표준 위험성평가 DB",
        roleCategory: "hq-admin",
        path: `${IA_ROOT}/web/hq/stddb`,
        featureId: "hq-standard-db",
        children: [
          {
            id: "web-hq-stddb-manage",
            title: "표준 공종/위험요인/대책 관리",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/stddb/manage`,
          },
          {
            id: "web-hq-stddb-template",
            title: "현장 적용 템플릿 관리",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/stddb/template`,
          },
        ],
      },
      {
        id: "web-hq-approval",
        title: "결재/승인",
        roleCategory: "hq-admin",
        path: `${IA_ROOT}/web/hq/approval`,
        featureId: "hq-approval",
        children: [
          {
            id: "web-hq-approval-doc",
            title: "문서 승인/반려(권한별)",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/approval/doc`,
          },
          {
            id: "web-hq-approval-accident",
            title: "사고보고서 결재(권한별)",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/approval/accident`,
          },
          {
            id: "web-hq-approval-draft",
            title: "기안/보고 결재(권한별)",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/approval/draft`,
          },
        ],
      },
      {
        id: "web-hq-statistics",
        title: "통계",
        roleCategory: "hq-admin",
        path: `${IA_ROOT}/web/hq/statistics`,
        featureId: "hq-statistics",
        children: [
          {
            id: "web-hq-statistics-opinion",
            title: "의견청취(신고 건수/처리율/현장별)",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/statistics/opinion`,
          },
          {
            id: "web-hq-statistics-inspection",
            title: "점검/시정조치 통계",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/statistics/inspection`,
          },
          {
            id: "web-hq-statistics-order",
            title: "작업지시/서명 준수율",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/statistics/order`,
          },
        ],
      },
      {
        id: "web-hq-system",
        title: "시스템 관리",
        roleCategory: "hq-admin",
        path: `${IA_ROOT}/web/hq/system`,
        featureId: "hq-system-admin",
        children: [
          {
            id: "web-hq-system-account",
            title: "계정/권한(RBAC) 관리",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/system/account`,
          },
          {
            id: "web-hq-system-site",
            title: "현장 개설/준공/데이터 이관",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/system/site`,
          },
          {
            id: "web-hq-system-notify",
            title: "알림/푸시 정책",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/system/notify`,
          },
        ],
      },
      {
        id: "web-hq-budget",
        title: "예산(본사 고유)",
        description: "본사 편성/통제. 네이버웍스 품의 목록은 메일 Subject 수집만.",
        roleCategory: "hq-admin",
        path: `${IA_ROOT}/web/hq/budget`,
        children: [
          {
            id: "web-hq-budget-plan",
            title: "예산 편성/통제",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/budget/plan`,
          },
          {
            id: "web-hq-budget-exec",
            title: "예산 집행 현황(현장 입력 취합)",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/budget/exec`,
          },
          {
            id: "web-hq-budget-naver",
            title: "네이버웍스 품의 목록(메일 Subject 수집 기반)",
            roleCategory: "hq-admin",
            path: `${IA_ROOT}/web/hq/budget/naver`,
          },
        ],
      },
    ],
  },
];

/** 평탄화된 IA 목록 (path로 검색·generateStaticParams용) */
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
