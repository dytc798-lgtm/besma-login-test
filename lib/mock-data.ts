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

