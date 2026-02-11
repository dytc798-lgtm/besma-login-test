// Mock 데이터 정의

export const mockSites = [
  { id: 1, name: "인천1구역 주택재개발", code: "22031", status: "경보", risk: "high", lat: 37.456, lng: 126.705 },
  { id: 2, name: "영등포 주상복합 신축", code: "22079", status: "주의", risk: "medium", lat: 37.526, lng: 126.896 },
  { id: 3, name: "구리 인창C구역 재개발", code: "22052", status: "정상", risk: "low", lat: 37.594, lng: 127.143 },
  { id: 4, name: "부산 재개발 현장", code: "22015", status: "정상", risk: "low", lat: 35.179, lng: 129.075 },
];

export const mockAlerts = [
  {
    id: 1,
    type: "danger",
    title: "인천1구역 타워크레인 반경 내 위험 구역 접근 감지",
    description: "작업중지권 안내 발송",
    time: "2분 전",
    site: "현장 A",
  },
  {
    id: 2,
    type: "warning",
    title: "영남 물류센터 우천 · 고습도 감지, 감전 주의 알림 발송",
    description: "전기공사 위험등급 '주의'",
    time: "15분 전",
    site: "현장 B",
  },
  {
    id: 3,
    type: "success",
    title: "부산 재개발 현장 TBM(작업 전 회의) 자동 기록 완료",
    description: "STT 요약 저장",
    time: "45분 전",
    site: "현장 C",
  },
];

export const mockPTW = [
  { type: "화기 작업", count: 3, status: "pending" },
  { type: "밀폐 공간", count: 2, status: "pending" },
  { type: "고소 작업", count: 1, status: "pending" },
];

export const mockEquipment = [
  { name: "크레인", status: "가동중", check: true },
  { name: "지게차", status: "가동중", check: false },
  { name: "고소작업대", status: "정지", check: true },
];

export const mockWeather = {
  condition: "폭염 주의보",
  temperature: 35,
  alert: "폭염 주의보 발령: 고혈압/고령 근로자 12명에게 '휴식 알림'이 발송되었습니다",
};

export const mockEducation = {
  scheduled: 5,
  completed: 4,
  percentage: 80,
};

export const mockTBM = {
  scheduled: 10,
  completed: 9,
  percentage: 90,
};

export const mockFeedback = [
  { id: 1, title: "안전난간 보수 필요", status: "접수", date: "2024-01-15" },
  { id: 2, title: "안전모 착용 미준수", status: "조치중", date: "2024-01-14" },
  { id: 3, title: "작업장 조명 개선", status: "조치완료", date: "2024-01-13" },
];

export const mockContractors = [
  { grade: "S", count: 15, percentage: 30 },
  { grade: "A", count: 25, percentage: 50 },
  { grade: "B", count: 8, percentage: 16 },
  { grade: "C", count: 2, percentage: 4 },
];

export const mockRiskAssessment = [
  { label: "전사 평균", value: 88 },
  { label: "고위험 공종", value: 72 },
  { label: "시정조치 완료율", value: 93 },
];

// 작업일보 데이터
export const mockWorkLog = {
  date: "2024-01-20",
  site: "인천1구역 주택재개발",
  siteCode: "22031",
  tasks: [
    { id: 1, team: "전기 1팀", location: "102동 2코어", task: "동력간선 케이블 포설 작업", worker: "박성구" },
    { id: 2, team: "전기 2팀", location: "103동 3층", task: "조명 배선 작업", worker: "김철수" },
    { id: 3, team: "전기 3팀", location: "104동 지하1층", task: "전기실 입선 작업", worker: "이영희" },
  ],
  education: {
    place: "현장 회의실",
    time: "오전 08:00 ~ 08:30",
    attendees: 32,
    content: "오늘 작업 구간의 낙하·추락 위험요인과 감전 위험에 대해 교육 및 지시.",
  },
};

// 작업지시서 데이터 (작업일보 기반 생성)
export const mockWorkOrders: Array<{
  id: number;
  date: string;
  workerId: number;
  workerName: string;
  team: string;
  location: string;
  task: string;
  risks: string[];
  measures: string[];
  status: "pending" | "agreed" | "completed";
  agreedAt: string | null;
  signature: string | null; // 서명 이미지 데이터 URL (base64)
  workCompleteSignature?: string | null; // 작업 완료 서명 이미지 데이터 URL
}> = [
  {
    id: 1,
    date: "2024-01-20",
    workerId: 1,
    workerName: "박성구",
    team: "전기 1팀",
    location: "102동 2코어",
    task: "동력간선 케이블 포설 작업",
    risks: [
      "중량물 운반 시 전도 위험",
      "케이블 절단 시 손베임 주의",
      "개구부 추락 주의 (안전고리 체결)",
    ],
    measures: [
      "릴·드럼 운반 시 2인 1조 작업, 손가락 끼임주의 구호 TBM 실시",
      "케이블 커터 전용 공구 사용, 절단 방향 통제 및 장갑 착용",
      "개구부 덮개 설치 및 안전난간 설치, 안전대 걸이 확보 후 작업",
    ],
    status: "pending",
    agreedAt: null,
    signature: null,
  },
  {
    id: 2,
    date: "2024-01-20",
    workerId: 2,
    workerName: "김철수",
    team: "전기 2팀",
    location: "103동 3층",
    task: "조명 배선 작업",
    risks: [
      "고소작업 시 추락 위험",
      "전기 감전 위험",
    ],
    measures: [
      "안전대 착용 필수, 안전고리 체결 확인",
      "작업 전 전원 차단 확인, 절연장갑 착용",
    ],
    status: "pending",
    agreedAt: null,
    signature: null,
  },
];

// TBM 일지 데이터
export const mockTBMLog = {
  date: "2024-01-20",
  site: "인천1구역 주택재개발",
  workOrders: [] as typeof mockWorkOrders,
  focusWork: {
    task: "동력간선 케이블 포설 작업",
    risks: ["중량물 운반 시 전도 위험", "개구부 추락 주의"],
    measures: ["2인 1조 작업", "안전대 걸이 확보"],
  },
  education: {
    place: "현장 회의실",
    time: "오전 08:00 ~ 08:30",
    attendees: 32,
    content: "오늘 작업 구간의 낙하·추락 위험요인과 감전 위험에 대해 교육 및 지시.",
  },
  signatures: [] as Array<{ workerName: string; signature: string; timestamp: string }>,
  generated: false,
};

// 무재해일지 데이터
export const mockSafeLog = {
  date: "2024-01-20",
  site: "인천1구역 주택재개발",
  workers: [] as Array<{
    workerId: number;
    workerName: string;
    workOrderId: number;
    task: string;
    location: string;
    endTime: string;
    gpsLocation: { lat: number; lng: number };
    signature: string; // 서명 이미지 데이터 URL (base64)
    hasIssue: boolean;
    issueNote?: string;
  }>,
  generated: false,
};

// MSDS 데이터
export const mockMSDS = [
  {
    id: 1,
    name: "락카",
    chemicalName: "아세톤",
    hazards: ["인화성", "휘발성"],
    handling: "통풍이 잘 되는 곳에서 사용, 화기 근처 금지",
    firstAid: "눈에 들어갔을 경우 즉시 세척",
    storage: "서늘하고 건조한 곳에 보관",
  },
  {
    id: 2,
    name: "접착제",
    chemicalName: "에폭시 수지",
    hazards: ["피부 자극", "알레르기 반응"],
    handling: "장갑 착용 필수, 피부 접촉 시 즉시 세척",
    firstAid: "피부 접촉 시 비누와 물로 세척",
    storage: "직사광선 피하고 밀폐 보관",
  },
  {
    id: 3,
    name: "용제",
    chemicalName: "톨루엔",
    hazards: ["휘발성", "중추신경계 영향"],
    handling: "호흡기 보호구 착용, 통풍 필수",
    firstAid: "호흡 곤란 시 신선한 공기로 이동",
    storage: "밀폐 용기에 보관, 화기 근처 금지",
  },
];

// 공지사항 데이터
export const mockNotices = [
  {
    id: 1,
    title: "2024년 1월 안전보건 교육 일정 안내",
    content: "2024년 1월 안전보건 교육이 1월 25일 오전 9시에 진행됩니다. 모든 근로자는 필수 참석 바랍니다.",
    author: "안전보건팀",
    date: "2024-01-15",
    category: "교육",
    important: true,
  },
  {
    id: 2,
    title: "겨울철 안전 수칙 준수 안내",
    content: "겨울철 한파 대비 안전 수칙을 준수해 주시기 바랍니다. 특히 미끄럼 방지 조치와 보온 장비 착용을 철저히 해주세요.",
    author: "안전보건팀",
    date: "2024-01-10",
    category: "안전",
    important: true,
  },
  {
    id: 3,
    title: "신규 근로자 등록 절차 안내",
    content: "신규 근로자 등록 시 기초안전보건교육 이수증과 자격증을 제출해 주시기 바랍니다.",
    author: "인사팀",
    date: "2024-01-05",
    category: "인사",
    important: false,
  },
];

// 안전 신문고 데이터 (표 형태로 관리)
export const mockSafetyReports: Array<{
  id: number;
  type: "위험요인신고" | "작업중지권";
  reporter: string;
  reporterTeam: string;
  datetime: string;
  location: string;
  riskFactor: string;
  countermeasure: string;
  status: "접수" | "조치중" | "조치완료";
  manager: string | null;
  response: string | null;
  appropriatenessScore: number | null; // 적절성 점수 (0-10)
  noveltyScore: number | null; // 참신성 점수 (0-10)
  totalScore: number | null; // 총점 (포상용)
}> = [
  {
    id: 1,
    type: "위험요인신고",
    reporter: "박성구",
    reporterTeam: "전기 1팀",
    datetime: "2024-01-20 14:30",
    location: "102동 3층",
    riskFactor: "안전난간이 느슨해져 있어 추락 위험",
    countermeasure: "안전난간 보수 작업 필요",
    status: "조치완료",
    manager: "김철수",
    response: "안전난간 보수 완료",
    appropriatenessScore: 9,
    noveltyScore: 7,
    totalScore: 16,
  },
  {
    id: 2,
    type: "작업중지권",
    reporter: "김민수",
    reporterTeam: "전기 2팀",
    datetime: "2024-01-20 13:15",
    location: "103동 지하1층",
    riskFactor: "작업장 조명 부족으로 작업 위험",
    countermeasure: "작업 중지 및 조명 개선 후 재개",
    status: "조치중",
    manager: "이영희",
    response: "추가 조명 설치 진행 중",
    appropriatenessScore: 8,
    noveltyScore: 6,
    totalScore: 14,
  },
  {
    id: 3,
    type: "위험요인신고",
    reporter: "이영희",
    reporterTeam: "전기 3팀",
    datetime: "2024-01-20 11:45",
    location: "104동 5층",
    riskFactor: "안전모 착용 미준수 근로자 발견",
    countermeasure: "안전모 착용 교육 실시",
    status: "접수",
    manager: null,
    response: null,
    appropriatenessScore: null,
    noveltyScore: null,
    totalScore: null,
  },
  {
    id: 4,
    type: "작업중지권",
    reporter: "최동현",
    reporterTeam: "전기 1팀",
    datetime: "2024-01-19 16:20",
    location: "102동 2코어",
    riskFactor: "크레인 작업 중 접근 금지 구역 침범",
    countermeasure: "작업 중지 및 안전 구역 재설정",
    status: "조치완료",
    manager: "홍길동",
    response: "안전 구역 재설정 완료",
    appropriatenessScore: 10,
    noveltyScore: 8,
    totalScore: 18,
  },
];

// 교육 계획 타입
export type EducationPlan = {
  id: number;
  date: string; // YYYY-MM-DD
  type: "본사법정안전교육" | "산업안전보건교육" | "특별안전보건교육" | "안전보건관리책임자교육" | "관리감독자교육" | "기타추가안전보건교육";
  site: string; // 현장명
  status: "계획" | "확정" | "불가"; // 본사 계획 → 현장 확인 → 확정/불가
  siteManagerComment: string | null; // 현장소장 코멘트 (불가능한 경우)
  alternativeDate: string | null; // 대안 날짜
  isHeadquartersVisit: boolean; // 본사 방문 교육 여부
};

// 점검 계획 타입
export type InspectionPlan = {
  id: number;
  date: string; // YYYY-MM-DD
  type: "본사안전점검" | "현장자체점검" | "특별점검";
  site: string; // 현장명
  status: "계획" | "확정" | "불가";
  siteManagerComment: string | null;
  alternativeDate: string | null;
};

// 교육 계획 데이터 (월에 10건 정도)
export const mockEducationPlans: EducationPlan[] = [
  {
    id: 1,
    date: "2024-01-05",
    type: "본사법정안전교육",
    site: "인천1구역",
    status: "확정",
    siteManagerComment: null,
    alternativeDate: null,
    isHeadquartersVisit: true,
  },
  {
    id: 2,
    date: "2024-01-08",
    type: "산업안전보건교육",
    site: "서울2구역",
    status: "확정",
    siteManagerComment: null,
    alternativeDate: null,
    isHeadquartersVisit: false,
  },
  {
    id: 3,
    date: "2024-01-12",
    type: "특별안전보건교육",
    site: "부산3구역",
    status: "확정",
    siteManagerComment: null,
    alternativeDate: null,
    isHeadquartersVisit: true,
  },
  {
    id: 4,
    date: "2024-01-15",
    type: "안전보건관리책임자교육",
    site: "인천1구역",
    status: "확정",
    siteManagerComment: null,
    alternativeDate: null,
    isHeadquartersVisit: true,
  },
  {
    id: 5,
    date: "2024-01-18",
    type: "관리감독자교육",
    site: "서울2구역",
    status: "확정",
    siteManagerComment: null,
    alternativeDate: null,
    isHeadquartersVisit: false,
  },
  {
    id: 6,
    date: "2024-01-22",
    type: "본사법정안전교육",
    site: "부산3구역",
    status: "불가",
    siteManagerComment: "이 날은 고객사 회의가 하루종일 있어서 힘듭니다. 3일 뒤는 어떻습니까?",
    alternativeDate: "2024-01-25",
    isHeadquartersVisit: true,
  },
  {
    id: 7,
    date: "2024-01-25",
    type: "기타추가안전보건교육",
    site: "인천1구역",
    status: "계획",
    siteManagerComment: null,
    alternativeDate: null,
    isHeadquartersVisit: false,
  },
  {
    id: 8,
    date: "2024-01-28",
    type: "산업안전보건교육",
    site: "서울2구역",
    status: "확정",
    siteManagerComment: null,
    alternativeDate: null,
    isHeadquartersVisit: true,
  },
  {
    id: 9,
    date: "2024-01-30",
    type: "특별안전보건교육",
    site: "부산3구역",
    status: "계획",
    siteManagerComment: null,
    alternativeDate: null,
    isHeadquartersVisit: false,
  },
  {
    id: 10,
    date: "2024-01-31",
    type: "관리감독자교육",
    site: "인천1구역",
    status: "확정",
    siteManagerComment: null,
    alternativeDate: null,
    isHeadquartersVisit: true,
  },
];

// 점검 계획 데이터
export const mockInspectionPlans: InspectionPlan[] = [
  {
    id: 1,
    date: "2024-01-10",
    type: "본사안전점검",
    site: "인천1구역",
    status: "확정",
    siteManagerComment: null,
    alternativeDate: null,
  },
  {
    id: 2,
    date: "2024-01-15",
    type: "현장자체점검",
    site: "서울2구역",
    status: "확정",
    siteManagerComment: null,
    alternativeDate: null,
  },
  {
    id: 3,
    date: "2024-01-20",
    type: "본사안전점검",
    site: "부산3구역",
    status: "확정",
    siteManagerComment: null,
    alternativeDate: null,
  },
  {
    id: 4,
    date: "2024-01-25",
    type: "특별점검",
    site: "인천1구역",
    status: "계획",
    siteManagerComment: null,
    alternativeDate: null,
  },
  {
    id: 5,
    date: "2024-01-28",
    type: "현장자체점검",
    site: "서울2구역",
    status: "확정",
    siteManagerComment: null,
    alternativeDate: null,
  },
];

// 작업계획서 장비 제원 데이터
export type EquipmentSpec = {
  model: string;
  selfWeight: number; // 자체중량 (kg 또는 ton)
  ratedLoad?: number; // 정격하중 (kg) - 지게차/크레인용
  vehicleWidth: number; // 차량너비 (mm)
  vehicleLength: number; // 차량길이 (mm)
  maxLiftingHeight?: number; // 최대양각높이 (mm) - 크레인용
  maxRadius?: number; // 최대작업반경 (m) - 크레인용
  // 굴착기 전용
  bucketCapacity?: number; // 버킷 용량 (m³) - 굴착기용
  maxExcavationRadius?: number; // 최대 굴착 반경 (m) - 굴착기용
  maxExcavationDepth?: number; // 최대 굴착 깊이 (m) - 굴착기용
};

// 지게차 제원 데이터
export const mockForkliftSpecs: EquipmentSpec[] = [
  {
    model: "현대 50D-9",
    selfWeight: 8500,
    ratedLoad: 5000,
    vehicleWidth: 1220,
    vehicleLength: 3650,
  },
  {
    model: "현대 30D-7",
    selfWeight: 5200,
    ratedLoad: 3000,
    vehicleWidth: 1150,
    vehicleLength: 3200,
  },
  {
    model: "도요타 8FD50",
    selfWeight: 8200,
    ratedLoad: 5000,
    vehicleWidth: 1200,
    vehicleLength: 3600,
  },
  {
    model: "도요타 8FD30",
    selfWeight: 5100,
    ratedLoad: 3000,
    vehicleWidth: 1140,
    vehicleLength: 3180,
  },
];

// 크레인 제원 데이터
export const mockCraneSpecs: EquipmentSpec[] = [
  {
    model: "카토 NK-500E",
    selfWeight: 45000,
    ratedLoad: 50000,
    vehicleWidth: 3000,
    vehicleLength: 14000,
    maxLiftingHeight: 50000,
    maxRadius: 50,
  },
  {
    model: "카토 NK-300E",
    selfWeight: 32000,
    ratedLoad: 30000,
    vehicleWidth: 2800,
    vehicleLength: 12000,
    maxLiftingHeight: 40000,
    maxRadius: 40,
  },
  {
    model: "타다노 ATF-400G-5",
    selfWeight: 42000,
    ratedLoad: 40000,
    vehicleWidth: 2900,
    vehicleLength: 13500,
    maxLiftingHeight: 48000,
    maxRadius: 45,
  },
  {
    model: "타다노 ATF-250G-5",
    selfWeight: 28000,
    ratedLoad: 25000,
    vehicleWidth: 2700,
    vehicleLength: 11500,
    maxLiftingHeight: 35000,
    maxRadius: 35,
  },
];

// 굴착기 제원 데이터
export const mockExcavatorSpecs: EquipmentSpec[] = [
  {
    model: "두산 DX140W",
    selfWeight: 14.0, // ton
    vehicleWidth: 2490,
    vehicleLength: 7500,
    bucketCapacity: 0.6,
    maxExcavationRadius: 8.5,
    maxExcavationDepth: 5.8,
  },
  {
    model: "현대 HX210",
    selfWeight: 21.0, // ton
    vehicleWidth: 2800,
    vehicleLength: 9000,
    bucketCapacity: 1.0,
    maxExcavationRadius: 10.2,
    maxExcavationDepth: 6.8,
  },
  {
    model: "두산 DX300LC",
    selfWeight: 30.0, // ton
    vehicleWidth: 3200,
    vehicleLength: 10500,
    bucketCapacity: 1.4,
    maxExcavationRadius: 11.5,
    maxExcavationDepth: 7.5,
  },
  {
    model: "현대 HX300L",
    selfWeight: 30.5, // ton
    vehicleWidth: 3200,
    vehicleLength: 10600,
    bucketCapacity: 1.5,
    maxExcavationRadius: 11.8,
    maxExcavationDepth: 7.8,
  },
];

// 인력 관리 데이터
export type WorkerInfo = {
  id: number;
  name: string;
  team: string;
  site: string;
  safetyGrade: "S" | "A" | "B" | "C"; // 안전분야 등급
  qualityGrade: "S" | "A" | "B" | "C"; // 품질분야 등급
  licenses: Array<{
    type: string; // 예: "지게차 운전", "크레인 운전", "굴착기 운전"
    number: string;
    issueDate: string;
    expiryDate: string;
    isValid: boolean;
  }>;
  educationHistory: Array<{
    type: string;
    date: string;
    status: "이수" | "미이수";
  }>;
};

export const mockWorkers: WorkerInfo[] = [
  {
    id: 1,
    name: "박성구",
    team: "전기 1팀",
    site: "인천1구역",
    safetyGrade: "A",
    qualityGrade: "B",
    licenses: [
      {
        type: "지게차 운전",
        number: "FL-2023-001",
        issueDate: "2023-01-15",
        expiryDate: "2026-01-14",
        isValid: true,
      },
      {
        type: "크레인 운전",
        number: "CR-2022-045",
        issueDate: "2022-06-20",
        expiryDate: "2025-06-19",
        isValid: true,
      },
    ],
    educationHistory: [
      { type: "본사법정안전교육", date: "2024-01-05", status: "이수" },
      { type: "산업안전보건교육", date: "2024-01-10", status: "이수" },
      { type: "특별안전보건교육", date: "2024-01-15", status: "이수" },
    ],
  },
  {
    id: 2,
    name: "김철수",
    team: "전기 2팀",
    site: "인천1구역",
    safetyGrade: "B",
    qualityGrade: "A",
    licenses: [
      {
        type: "굴착기 운전",
        number: "EX-2023-078",
        issueDate: "2023-03-10",
        expiryDate: "2026-03-09",
        isValid: true,
      },
    ],
    educationHistory: [
      { type: "본사법정안전교육", date: "2024-01-05", status: "이수" },
      { type: "산업안전보건교육", date: "2024-01-10", status: "이수" },
    ],
  },
  {
    id: 3,
    name: "이영희",
    team: "전기 3팀",
    site: "인천1구역",
    safetyGrade: "A",
    qualityGrade: "A",
    licenses: [
      {
        type: "지게차 운전",
        number: "FL-2022-089",
        issueDate: "2022-11-20",
        expiryDate: "2025-11-19",
        isValid: true,
      },
    ],
    educationHistory: [
      { type: "본사법정안전교육", date: "2024-01-05", status: "이수" },
      { type: "산업안전보건교육", date: "2024-01-10", status: "이수" },
      { type: "특별안전보건교육", date: "2024-01-15", status: "이수" },
    ],
  },
];

// 아차사고 보고 데이터
export type NearMissReport = {
  id: number;
  reporter: string;
  reporterTeam: string;
  date: string;
  location: string;
  description: string;
  photos?: string[]; // 사진 URL (Mock)
  riskLevel: "high" | "medium" | "low";
  status: "접수" | "조치중" | "조치완료";
  includedInTBM: boolean; // TBM 가이드 포함 여부
  tbmDate?: string; // TBM 가이드에 포함된 날짜
};

export const mockNearMissReports: NearMissReport[] = [
  {
    id: 1,
    reporter: "박성구",
    reporterTeam: "전기 1팀",
    date: "2024-01-19",
    location: "102동 3층",
    description: "작업 중 안전난간이 느슨해져 있어 추락 위험이 있었으나 다행히 사고로 이어지지 않음",
    riskLevel: "high",
    status: "조치완료",
    includedInTBM: true,
    tbmDate: "2024-01-20",
  },
  {
    id: 2,
    reporter: "김철수",
    reporterTeam: "전기 2팀",
    date: "2024-01-18",
    location: "103동 지하1층",
    description: "전선 작업 중 절연장갑이 손상되어 교체함. 감전 위험을 사전에 방지",
    riskLevel: "medium",
    status: "조치완료",
    includedInTBM: true,
    tbmDate: "2024-01-19",
  },
];

// 컴플라이언스 준수율 데이터
export type ComplianceItem = {
  id: string;
  law: string;
  article: string;
  description: string;
  complianceRate: number; // 0-100
  lastChecked: string;
  status: "compliant" | "warning" | "non-compliant";
};

export const mockComplianceData: ComplianceItem[] = [
  {
    id: "comp-1",
    law: "산안법",
    article: "제23조",
    description: "전기·기계·기구 등의 위험 방지",
    complianceRate: 95,
    lastChecked: "2024-01-20",
    status: "compliant",
  },
  {
    id: "comp-2",
    law: "산안법",
    article: "제26조",
    description: "활선작업의 금지",
    complianceRate: 100,
    lastChecked: "2024-01-20",
    status: "compliant",
  },
  {
    id: "comp-3",
    law: "산안법",
    article: "제29조",
    description: "안전보건교육 실시",
    complianceRate: 88,
    lastChecked: "2024-01-19",
    status: "warning",
  },
  {
    id: "comp-4",
    law: "중처법",
    article: "제8조",
    description: "안전보건조치 의무",
    complianceRate: 92,
    lastChecked: "2024-01-20",
    status: "compliant",
  },
];

// 법령 개정 예고 데이터
export type LawAmendmentNotice = {
  id: number;
  law: string;
  article: string;
  amendmentDate: string; // 개정 예정일
  description: string;
  impact: "high" | "medium" | "low";
  daysUntil: number; // 개정일까지 남은 일수
};

export const mockLawAmendments: LawAmendmentNotice[] = [
  {
    id: 1,
    law: "산안법 시행규칙",
    article: "제123조",
    amendmentDate: "2024-02-15",
    description: "전기작업 시 절연장갑 착용 의무 강화",
    impact: "high",
    daysUntil: 26,
  },
  {
    id: 2,
    law: "산안법",
    article: "제25조",
    amendmentDate: "2024-03-01",
    description: "가공전선로 접근 시 안전거리 기준 변경",
    impact: "medium",
    daysUntil: 41,
  },
];

// 굴착기 안전 조항 체크리스트 (산안법/시행규칙 기반)
export const excavatorSafetyChecklist = [
  {
    id: "excavator-1",
    item: "신호수 배치 여부",
    law: "산안법 시행규칙 제123조",
    required: true,
  },
  {
    id: "excavator-2",
    item: "후방 감지기 설치 및 작동 확인",
    law: "산안법 시행규칙 제124조",
    required: true,
  },
  {
    id: "excavator-3",
    item: "작업 반경 내 접근 금지 구역 설정",
    law: "산안법 제25조",
    required: true,
  },
  {
    id: "excavator-4",
    item: "지반 상태 점검 (약지반, 지하매설물 확인)",
    law: "산안법 시행규칙 제125조",
    required: true,
  },
  {
    id: "excavator-5",
    item: "굴착 깊이에 따른 사면 안정성 확인",
    law: "산안법 시행규칙 제126조",
    required: true,
  },
  {
    id: "excavator-6",
    item: "전도 방지용 지지대 설치 (필요시)",
    law: "산안법 제23조",
    required: false,
  },
];
