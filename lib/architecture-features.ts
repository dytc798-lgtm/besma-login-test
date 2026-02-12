import type { RoleCategory as BaseRoleCategory } from "./roles";

// 기능 그룹용 확장 (역할 외 플랫폼/외부 연동)
export type RoleCategory =
  | BaseRoleCategory
  | "platform-core"
  | "external";

export type DiagramNode = {
  id: string;
  label: string;
  type?: "actor" | "process" | "system" | "external";
};

export type DiagramEdge = {
  from: string;
  to: string;
  label: string;
};

export type ProcessDiagram = {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

export type UiMockFieldType =
  | "text"
  | "select"
  | "table"
  | "signature"
  | "image";

export type UiMockField = {
  label: string;
  value?: string;
  placeholder?: string;
  type?: UiMockFieldType;
};

export type UiMockActionVariant = "primary" | "secondary" | "danger";

export type UiMockAction = {
  label: string;
  variant?: UiMockActionVariant;
};

export type UiMockSection = {
  heading: string;
  fields?: UiMockField[];
  actions?: UiMockAction[];
};

export type UiMock = {
  title: string;
  sections: UiMockSection[];
};

export type Feature = {
  id: string;
  title: string;
  roleCategory: RoleCategory;
  description?: string;
  processDiagram: ProcessDiagram;
  uiMock: UiMock;
};

// 공통 유틸: 간단한 헬퍼로 노드/엣지 배열 생성
const node = (
  id: string,
  label: string,
  type: DiagramNode["type"] = "process",
): DiagramNode => ({ id, label, type });

const edge = (from: string, to: string, label: string): DiagramEdge => ({
  from,
  to,
  label,
});

// =============== 모바일 기능 ===============

export const MOBILE_FEATURES: Feature[] = [
  {
    id: "mobile-work-order",
    title: "작업지시 확인",
    roleCategory: "mobile",
    description:
      "모바일에서 작업지시를 수신·확인하고, 동의 문구 확인 후 서명으로 TBM/작업 가능 여부를 결정",
    processDiagram: {
      nodes: [
        node("worker", "현장 근로자(모바일)", "actor"),
        node("inbox", "작업지시 수신"),
        node("list", "작업지시 목록"),
        node("detail", "작업지시 상세 확인"),
        node("consent", "동의 문구 확인"),
        node("sign", "작업지시 서명(GPS)", "process"),
        node("health", "Health-Lock/건강정보 확인", "system"),
        node("platform", "플랫폼 저장 · 작업가능 표시", "system"),
      ],
      edges: [
        edge("worker", "inbox", "로그인 / 알림 수신"),
        edge("inbox", "list", "목록 조회"),
        edge("list", "detail", "작업 선택"),
        edge("detail", "consent", "지시 사항 확인"),
        edge("consent", "sign", "동의 문구 확인 후 서명"),
        edge("sign", "health", "GPS·건강정보 검증"),
        edge("health", "platform", "상태 '작업가능' 반영"),
      ],
    },
    uiMock: {
      title: "작업지시 상세",
      sections: [
        {
          heading: "기본 정보",
          fields: [
            { label: "작업명", value: "전기설비 점검" },
            { label: "작업일자", value: "2025-02-11" },
            { label: "작업장소", value: "A동 1층 변전실" },
            { label: "위험요인 요약", value: "감전, 낙하" },
          ],
        },
        {
          heading: "동의 및 서명",
          fields: [
            {
              label: "동의 문구",
              value:
                "본인은 현재 건강상태에 이상이 없으며, 작업지시 및 안전수칙을 숙지하고 이에 동의합니다.",
            },
            {
              label: "서명 영역",
              type: "signature",
            },
            {
              label: "GPS 상태",
              value: "현장 반경 50m 이내",
            },
            {
              label: "Health-Lock 연계",
              value: "최근 건강정보/주의표시 확인 후 작업가능 여부 표시",
            },
          ],
          actions: [
            { label: "서명 완료", variant: "primary" },
            { label: "작업지시 거부", variant: "danger" },
          ],
        },
      ],
    },
  },
  {
    id: "mobile-risk-assessment",
    title: "위험성평가 작성",
    roleCategory: "mobile",
    description: "작업 선택 후 모바일에서 간편 위험성평가 작성",
    processDiagram: {
      nodes: [
        node("worker", "현장 근로자", "actor"),
        node("select", "작업 선택"),
        node("suggest", "위험요인 자동 추천", "system"),
        node("rate", "위험도 선택"),
        node("measure", "대책 입력"),
        node("save", "평가 저장", "system"),
      ],
      edges: [
        edge("worker", "select", "작업 선택"),
        edge("select", "suggest", "표준 DB 조회"),
        edge("suggest", "rate", "후보 확인"),
        edge("rate", "measure", "상세 대책 작성"),
        edge("measure", "save", "저장 / 재평가"),
      ],
    },
    uiMock: {
      title: "위험성평가 작성",
      sections: [
        {
          heading: "작업 선택",
          fields: [
            { label: "작업", placeholder: "전기설비 점검 선택", type: "select" },
          ],
        },
        {
          heading: "위험요인 및 위험도",
          fields: [
            { label: "자동 추천 위험요인", value: "감전, 낙하, 협착" },
            { label: "위험도", placeholder: "상 / 중 / 하", type: "select" },
            {
              label: "대책",
              placeholder: "보호구 착용, LOTO, TBM 사전 교육",
              type: "text",
            },
          ],
          actions: [{ label: "저장", variant: "primary" }],
        },
      ],
    },
  },
  {
    id: "mobile-tbm-sign",
    title: "TBM 서명",
    roleCategory: "mobile",
    description: "TBM 참석자 확인 및 전자서명(GPS 검증)",
    processDiagram: {
      nodes: [
        node("worker", "현장 근로자", "actor"),
        node("tbm-start", "TBM 안내 화면"),
        node("attendee", "참석자 확인"),
        node("sign", "전자서명(GPS)", "process"),
        node("platform", "플랫폼 TBM 저장", "system"),
        node("manager", "현장 관리자 확인", "actor"),
      ],
      edges: [
        edge("worker", "tbm-start", "TBM 시작"),
        edge("tbm-start", "attendee", "참석자 목록 확인"),
        edge("attendee", "sign", "서명 입력"),
        edge("sign", "platform", "GPS 반경 검증 · 저장"),
        edge("platform", "manager", "TBM 완료 알림"),
      ],
    },
    uiMock: {
      title: "TBM 참석 및 서명",
      sections: [
        {
          heading: "참석자 목록",
          fields: [
            { label: "참석자", value: "김○○, 이○○, 박○○", type: "table" },
          ],
        },
        {
          heading: "전자서명",
          fields: [
            { label: "서명 영역", type: "signature" },
            { label: "GPS 상태", value: "현장 반경 50m 이내", type: "text" },
          ],
          actions: [{ label: "완료", variant: "primary" }],
        },
      ],
    },
  },
  {
    id: "mobile-danger-report",
    title: "위험 신고 (사진/음성/텍스트)",
    roleCategory: "mobile",
    description: "모바일로 사진·음성·텍스트 기반 위험 신고",
    processDiagram: {
      nodes: [
        node("worker", "현장 근로자", "actor"),
        node("compose", "신고 작성"),
        node("upload", "사진/음성 업로드", "process"),
        node("platform", "플랫폼 접수", "system"),
        node("site-manager", "현장 관리자 검토", "actor"),
      ],
      edges: [
        edge("worker", "compose", "신고 유형 선택"),
        edge("compose", "upload", "사진/음성 첨부"),
        edge("upload", "platform", "신고 전송"),
        edge("platform", "site-manager", "알림 발송"),
      ],
    },
    uiMock: {
      title: "위험 신고",
      sections: [
        {
          heading: "신고 기본 정보",
          fields: [
            { label: "신고 유형", placeholder: "위험요인 발견", type: "select" },
            { label: "내용", placeholder: "위험 상황을 입력하세요", type: "text" },
          ],
        },
        {
          heading: "첨부",
          fields: [
            { label: "사진", type: "image" },
            { label: "음성 메모", type: "image" },
          ],
          actions: [{ label: "제출", variant: "primary" }],
        },
      ],
    },
  },
  {
    id: "mobile-stop-right",
    title: "작업중지권 발동",
    roleCategory: "mobile",
    description: "위험 시 작업중지권 발동 및 본사 연계",
    processDiagram: {
      nodes: [
        node("worker", "현장 근로자", "actor"),
        node("request", "중지 요청"),
        node("platform", "플랫폼 기록", "system"),
        node("managers", "현장/본사 관리자 알림", "process"),
        node("action", "조치 등록"),
        node("resume", "재개 승인", "process"),
      ],
      edges: [
        edge("worker", "request", "중지 사유 입력"),
        edge("request", "platform", "즉시 전송"),
        edge("platform", "managers", "푸시/알림톡"),
        edge("managers", "action", "조치 내용 입력"),
        edge("action", "resume", "재개 여부 결정"),
      ],
    },
    uiMock: {
      title: "작업중지권 발동",
      sections: [
        {
          heading: "중지 요청",
          fields: [
            { label: "현장", value: "A동 변전실" },
            { label: "중지 사유", placeholder: "사유를 입력하세요", type: "text" },
          ],
        },
        {
          heading: "처리 상태",
          fields: [{ label: "현장/본사 상태", value: "검토중" }],
          actions: [{ label: "작업중지권 발동", variant: "danger" }],
        },
      ],
    },
  },
  {
    id: "mobile-msds",
    title: "MSDS 조회",
    roleCategory: "mobile",
    description: "모바일에서 화학물질 MSDS 조회",
    processDiagram: {
      nodes: [
        node("worker", "현장 근로자", "actor"),
        node("search", "물질 검색"),
        node("db", "MSDS DB 조회", "system"),
        node("result", "검색 결과"),
        node("detail", "상세 MSDS 보기"),
      ],
      edges: [
        edge("worker", "search", "물질명/CAS 검색"),
        edge("search", "db", "쿼리 전송"),
        edge("db", "result", "목록 응답"),
        edge("result", "detail", "상세 선택"),
      ],
    },
    uiMock: {
      title: "MSDS 열람",
      sections: [
        {
          heading: "검색",
          fields: [
            { label: "검색어", placeholder: "물질명 또는 CAS No.", type: "text" },
          ],
        },
        {
          heading: "검색 결과",
          fields: [{ label: "목록", type: "table" }],
          actions: [{ label: "상세 보기", variant: "secondary" }],
        },
      ],
    },
  },
];

// =============== 현장 관리자 기능 (간략화된 예시) ===============

export const SITE_ADMIN_FEATURES: Feature[] = [
  {
    id: "site-dashboard",
    title: "현장 현황 대시보드",
    roleCategory: "site-admin",
    processDiagram: {
      nodes: [
        node("platform", "플랫폼 집계", "system"),
        node("dashboard", "현장 대시보드"),
        node("manager", "현장 관리자", "actor"),
      ],
      edges: [
        edge("platform", "dashboard", "현장별 데이터 수집"),
        edge("dashboard", "manager", "대시보드 조회"),
      ],
    },
    uiMock: {
      title: "현장 현황 대시보드",
      sections: [
        {
          heading: "요약 카드",
          fields: [
            { label: "진행 중 작업", value: "5건" },
            { label: "위험 신고", value: "2건" },
          ],
        },
        {
          heading: "그래프/테이블",
          fields: [{ label: "지표", type: "table" }],
        },
      ],
    },
  },
  {
    id: "site-risk-report",
    title: "위험신고 관리",
    roleCategory: "site-admin",
    processDiagram: {
      nodes: [
        node("platform", "위험신고 접수", "system"),
        node("list", "신고 목록"),
        node("detail", "신고 상세"),
        node("action", "시정조치 등록"),
      ],
      edges: [
        edge("platform", "list", "현장 기준 필터"),
        edge("list", "detail", "신고 선택"),
        edge("detail", "action", "조치 작성"),
      ],
    },
    uiMock: {
      title: "위험신고 관리",
      sections: [
        {
          heading: "필터",
          fields: [
            { label: "상태", type: "select", placeholder: "전체/미처리/완료" },
          ],
        },
        {
          heading: "신고 목록",
          fields: [{ label: "목록", type: "table" }],
        },
      ],
    },
  },
];

// =============== 본사 관리자 기능 (견적서 기준 6개) ===============

export const HQ_ADMIN_FEATURES: Feature[] = [
  {
    id: "hq-integrated-monitoring",
    title: "통합관제",
    roleCategory: "hq-admin",
    description:
      "전사 현장/계정/데이터 흐름을 실시간으로 모니터링하고 이상 징후를 탐지/대응합니다.",
    processDiagram: {
      nodes: [
        node("hq-admin", "본사관리자(웹)", "actor"),
        node("sites", "현장 데이터"),
        node("rules", "이상징후 룰", "system"),
        node("alerts", "알림/티켓"),
        node("integrations", "연동 상태", "system"),
        node("audit", "감사 로그", "system"),
      ],
      edges: [
        edge("sites", "rules", "수집/집계"),
        edge("rules", "alerts", "탐지/발행"),
        edge("hq-admin", "alerts", "조치/배정"),
        edge("integrations", "alerts", "장애 알림"),
        edge("hq-admin", "audit", "조회"),
      ],
    },
    uiMock: {
      title: "통합관제",
      sections: [
        {
          heading: "관제 대시보드",
          fields: [
            { label: "전사 현장 상태 KPI", value: "금일/주간/월간 요약" },
            { label: "이상징후 룰", value: "미입력·급증·지연·오류 감지" },
          ],
        },
        {
          heading: "알림/티켓",
          fields: [{ label: "담당자 배정/상태/코멘트", type: "table" }],
          actions: [
            { label: "알림 조회", variant: "secondary" },
            { label: "티켓 처리", variant: "primary" },
          ],
        },
      ],
    },
  },
  {
    id: "hq-kpi",
    title: "KPI",
    roleCategory: "hq-admin",
    description:
      "전사/조직/현장별 안전보건 KPI를 설계하고 목표·실적·추이를 관리합니다.",
    processDiagram: {
      nodes: [
        node("hq-admin", "본사관리자(웹)", "actor"),
        node("metrics", "지표 정의"),
        node("targets", "목표"),
        node("data", "집계 데이터", "system"),
        node("reports", "리포트"),
      ],
      edges: [
        edge("metrics", "targets", "지표 기준 목표 설정"),
        edge("data", "reports", "집계/시각화"),
        edge("hq-admin", "metrics", "정의/관리"),
        edge("hq-admin", "reports", "조회/배포"),
      ],
    },
    uiMock: {
      title: "KPI",
      sections: [
        {
          heading: "KPI 대시보드",
          fields: [
            { label: "지표 카탈로그", value: "정의·산식·데이터 소스·측정 주기" },
            { label: "조직/현장 목표", value: "월/분기/연 설정" },
          ],
        },
        {
          heading: "실적/추이",
          fields: [{ label: "실적 자동 집계·수동 보정", type: "table" }],
          actions: [
            { label: "리포트 생성", variant: "primary" },
            { label: "내보내기(PDF/엑셀)", variant: "secondary" },
          ],
        },
      ],
    },
  },
  {
    id: "hq-approval",
    title: "결재함",
    roleCategory: "hq-admin",
    description:
      "전사 결재 문서의 상신/검토/승인/반려 및 결재선/규정을 관리합니다.",
    processDiagram: {
      nodes: [
        node("requester", "상신자", "actor"),
        node("reviewer", "검토자", "actor"),
        node("approver", "승인자", "actor"),
        node("doc", "결재 문서"),
        node("rules", "결재 규정/결재선", "system"),
      ],
      edges: [
        edge("requester", "doc", "상신"),
        edge("rules", "doc", "결재선 적용"),
        edge("doc", "reviewer", "검토 요청"),
        edge("doc", "approver", "승인 요청"),
      ],
    },
    uiMock: {
      title: "결재함",
      sections: [
        {
          heading: "결재함(수신)",
          fields: [
            { label: "문서 유형별 결재 프로세스", value: "검토-승인-전결 등" },
            { label: "결재선 템플릿", value: "조직/금액/리스크/문서유형 조건부" },
          ],
        },
        {
          heading: "문서 목록",
          fields: [{ label: "미결재/승인반려 이력", type: "table" }],
          actions: [
            { label: "결재함", variant: "primary" },
            { label: "상신함", variant: "secondary" },
          ],
        },
      ],
    },
  },
  {
    id: "hq-standard-db",
    title: "표준 위험성평가 DB 관리",
    roleCategory: "hq-admin",
    description:
      "표준 공정/유해위험요인/대책/평가 기준을 관리하고 현장에 배포합니다.",
    processDiagram: {
      nodes: [
        node("hq-admin", "본사관리자(웹)", "actor"),
        node("std-db", "표준DB"),
        node("version", "버전/승인"),
        node("sites", "현장 적용"),
      ],
      edges: [
        edge("hq-admin", "std-db", "등록/수정"),
        edge("std-db", "version", "승인/배포 준비"),
        edge("version", "sites", "배포"),
      ],
    },
    uiMock: {
      title: "표준 위험성평가 DB 관리",
      sections: [
        {
          heading: "표준DB 목록",
          fields: [{ label: "표준 평가표", type: "table" }],
          actions: [
            { label: "새 평가표 추가", variant: "primary" },
            { label: "엑셀 업로드", variant: "secondary" },
            { label: "현장 배포", variant: "secondary" },
          ],
        },
        {
          heading: "버전/변경이력",
          fields: [{ label: "버전 관리(초안/승인/배포)", type: "table" }],
        },
      ],
    },
  },
  {
    id: "hq-statistics",
    title: "통계",
    roleCategory: "hq-admin",
    description:
      "사고/교육/점검/위험성평가 등 주요 운영 데이터를 다차원 통계로 분석합니다.",
    processDiagram: {
      nodes: [
        node("events", "운영 이벤트(사고/점검/교육)", "system"),
        node("warehouse", "집계 저장소", "system"),
        node("stats", "통계/분석"),
        node("hq-admin", "본사관리자(웹)", "actor"),
      ],
      edges: [
        edge("events", "warehouse", "수집/정제"),
        edge("warehouse", "stats", "집계"),
        edge("hq-admin", "stats", "조회/분석"),
      ],
    },
    uiMock: {
      title: "통계",
      sections: [
        {
          heading: "통계 개요",
          fields: [
            { label: "기간/조직/현장/공종 다차원 필터", value: "사고·아차사고·위험성평가·점검·교육" },
            { label: "Top N 위험요인/반복 이슈", value: "분석 결과" },
          ],
        },
        {
          heading: "분석 결과",
          fields: [{ label: "커스텀 피벗/필터", type: "table" }],
          actions: [
            { label: "리포트 생성", variant: "primary" },
            { label: "내보내기(엑셀/이미지)", variant: "secondary" },
          ],
        },
      ],
    },
  },
  {
    id: "hq-system-admin",
    title: "시스템관리",
    roleCategory: "hq-admin",
    description:
      "조직/권한/계정/정책/코드/연동 등 플랫폼 운영을 위한 백오피스 기능을 관리합니다.",
    processDiagram: {
      nodes: [
        node("hq-admin", "시스템관리자(웹)", "actor"),
        node("iam", "IAM(RBAC/SSO)", "system"),
        node("policy", "보안/운영 정책"),
        node("integration", "외부 연동"),
        node("logs", "감사/시스템 로그", "system"),
      ],
      edges: [
        edge("hq-admin", "iam", "계정/권한 관리"),
        edge("hq-admin", "policy", "정책 설정"),
        edge("hq-admin", "integration", "키/웹훅 관리"),
        edge("hq-admin", "logs", "조회"),
      ],
    },
    uiMock: {
      title: "시스템관리",
      sections: [
        {
          heading: "조직/현장 관리",
          fields: [
            { label: "조직/현장 온보딩", value: "상태·계약·플랜·사용량" },
            { label: "사용자 라이프사이클", value: "초대/잠금/탈퇴·SSO 매핑" },
          ],
        },
        {
          heading: "권한/역할(RBAC)",
          fields: [
            { label: "역할-권한-리소스", value: "메뉴 노출 제어(IA 연동)" },
            { label: "보안정책", value: "비밀번호/세션/2FA/접속 IP 제한" },
          ],
          actions: [
            { label: "조직 관리", variant: "primary" },
            { label: "사용자/계정", variant: "secondary" },
            { label: "권한/역할", variant: "secondary" },
            { label: "연동/키 관리", variant: "secondary" },
          ],
        },
      ],
    },
  },
];

// =============== 플랫폼 코어 기능 (OCR 포함) ===============

export const PLATFORM_CORE_FEATURES: Feature[] = [
  {
    id: "core-risk-engine",
    title: "위험성평가 엔진",
    roleCategory: "platform-core",
    processDiagram: {
      nodes: [
        node("input", "작업/위험요인 입력"),
        node("engine", "위험성평가 엔진", "system"),
        node("score", "위험도 산출"),
        node("store", "결과 저장", "system"),
      ],
      edges: [
        edge("input", "engine", "입력 데이터 전송"),
        edge("engine", "score", "위험도 계산"),
        edge("score", "store", "DB 저장"),
      ],
    },
    uiMock: {
      title: "위험성평가 엔진 설정",
      sections: [
        {
          heading: "평가 규칙",
          fields: [{ label: "규칙 목록", type: "table" }],
          actions: [{ label: "규칙 추가", variant: "primary" }],
        },
      ],
    },
  },
  {
    id: "core-ocr",
    title: "OCR 처리",
    roleCategory: "platform-core",
    description: "모바일 촬영 데이터를 OCR 엔진과 연동하여 자동 인식",
    processDiagram: {
      nodes: [
        node("mobile", "모바일 촬영", "actor"),
        node("upload", "이미지 업로드"),
        node("ocr-engine", "OCR 엔진", "external"),
        node("mapping", "대책/품목 매핑", "process"),
        node("store", "결과 저장", "system"),
        node("notify", "알림 발송", "process"),
      ],
      edges: [
        edge("mobile", "upload", "영수증/사진 촬영"),
        edge("upload", "ocr-engine", "이미지 전송"),
        edge("ocr-engine", "mapping", "텍스트 추출"),
        edge("mapping", "store", "대책/품목 매칭"),
        edge("store", "notify", "검증 결과 기반 알림톡"),
      ],
    },
    uiMock: {
      title: "OCR 처리 현황",
      sections: [
        {
          heading: "업로드 목록",
          fields: [{ label: "이미지 리스트", type: "table" }],
        },
        {
          heading: "매핑 결과",
          fields: [
            { label: "인식된 품목", type: "table" },
            { label: "매핑 상태", value: "완료/확인필요" },
          ],
        },
      ],
    },
  },
];

// =============== 외부 연동 기능 (간단 예시) ===============

export const EXTERNAL_FEATURES: Feature[] = [
  {
    id: "external-erp",
    title: "ERP 연동",
    roleCategory: "external",
    processDiagram: {
      nodes: [
        node("platform", "플랫폼", "system"),
        node("erp", "ERP 시스템", "external"),
      ],
      edges: [edge("platform", "erp", "작업지시/원가 연동")],
    },
    uiMock: {
      title: "ERP 연동 상태",
      sections: [
        {
          heading: "연동 로그",
          fields: [{ label: "최근 연동 이력", type: "table" }],
        },
      ],
    },
  },
];

