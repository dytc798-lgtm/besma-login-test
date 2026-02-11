// 데이터 연계 로직 관리 (LocalStorage 기반)

// 안전보건 방침 데이터
export interface SafetyPolicy {
  id: string;
  title: string;
  content: string;
  status: "draft" | "pending" | "approved";
  createdBy: string;
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
  gpsLocation?: { lat: number; lng: number };
  serverTimestamp?: string;
}

// TBM 및 위험성평가 데이터
export interface TBMData {
  id: string;
  workOrderId: string;
  siteId: string;
  workType: string; // 현재 공종 (예: "케이블 포설", "트레이 설치", "앙카링")
  startTime?: string; // 이벤트 기반 시작 시간 (관리자 버튼 클릭 시점)
  risks: string[]; // 위험성평가 DB에서 매핑된 위험요인
  measures: string[];
  signatures: Array<{
    workerId: string;
    workerName: string;
    signature: string;
    timestamp: string;
    gpsLocation: { lat: number; lng: number };
  }>;
  locationHistory: Array<{ // GPS 위치 히스토리
    lat: number;
    lng: number;
    timestamp: string;
    updatedBy: string;
  }>;
  changeHistory: Array<{ // 공종 변경 이력 (MOC)
    fromWorkType: string;
    toWorkType: string;
    timestamp: string;
    changedBy: string;
    newRisks: string[];
    newMeasures: string[];
  }>;
  changeSignatures: Array<{ // 변경 TBM 서명
    workerId: string;
    workerName: string;
    signature: string;
    timestamp: string;
    gpsLocation: { lat: number; lng: number };
    changeId: string; // changeHistory의 인덱스
  }>;
}

// 서명 데이터 (보고서 아카이빙용)
export interface SignatureData {
  id: string;
  type: "tbm" | "education" | "inspection" | "policy";
  workerId: string;
  workerName: string;
  signature: string;
  timestamp: string;
  gpsLocation: { lat: number; lng: number };
  relatedDocumentId: string;
}

// 포인트 및 등급 데이터
export interface WorkerPoints {
  workerId: string;
  workerName: string;
  points: number;
  grade: "S" | "A" | "B" | "C"; // 관리자 전용
  lastUpdated: string;
}

// LocalStorage 키
const STORAGE_KEYS = {
  SAFETY_POLICY: "besma_safety_policy",
  TBM_DATA: "besma_tbm_data",
  SIGNATURES: "besma_signatures",
  WORKER_POINTS: "besma_worker_points",
  RISK_ASSESSMENT_DB: "besma_risk_assessment_db",
};

// 안전보건 방침 저장 및 조회
export function saveSafetyPolicy(policy: SafetyPolicy) {
  if (typeof window === "undefined") return;
  
  // GPS 위치 및 서버 시간 강제 기록
  const enrichedPolicy = {
    ...policy,
    gpsLocation: policy.gpsLocation || getCurrentGPS(),
    serverTimestamp: policy.serverTimestamp || new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEYS.SAFETY_POLICY, JSON.stringify(enrichedPolicy));
}

export function getSafetyPolicy(): SafetyPolicy | null {
  if (typeof window === "undefined") return null;
  const data = localStorage.getItem(STORAGE_KEYS.SAFETY_POLICY);
  return data ? JSON.parse(data) : null;
}

// TBM 데이터 저장 (위험성평가 DB 연동)
export function saveTBMData(tbm: TBMData) {
  if (typeof window === "undefined") return;
  
  // 위험성평가 DB에서 위험요인 매핑
  const workType = tbm.workType || "케이블 포설";
  const riskData = getRisksByWorkType(workType);
  
  const enrichedTBM: TBMData = {
    ...tbm,
    workType: workType,
    risks: tbm.risks.length > 0 ? tbm.risks : riskData.risks,
    measures: tbm.measures.length > 0 ? tbm.measures : riskData.measures,
    locationHistory: tbm.locationHistory || [],
    changeHistory: tbm.changeHistory || [],
    changeSignatures: tbm.changeSignatures || [],
    signatures: tbm.signatures.map((sig) => ({
      ...sig,
      gpsLocation: sig.gpsLocation || getCurrentGPS(),
      timestamp: sig.timestamp || new Date().toISOString(),
    })),
  };
  
  const existing = getTBMDataList();
  const index = existing.findIndex((t) => t.id === tbm.id);
  
  if (index >= 0) {
    existing[index] = enrichedTBM;
  } else {
    existing.push(enrichedTBM);
  }
  
  localStorage.setItem(STORAGE_KEYS.TBM_DATA, JSON.stringify(existing));
}

// TBM 데이터 업데이트 헬퍼 함수
function updateTBMInStorage(tbmId: string, updater: (tbm: TBMData) => TBMData): boolean {
  if (typeof window === "undefined") return false;
  
  const existing = getTBMDataList();
  const index = existing.findIndex((t) => t.id === tbmId);
  
  if (index < 0) return false;
  
  existing[index] = updater(existing[index]);
  localStorage.setItem(STORAGE_KEYS.TBM_DATA, JSON.stringify(existing));
  return true;
}

// TBM 개시 (이벤트 기반 시작 시간 기록)
export function startTBM(tbmId: string, managerName: string) {
  if (typeof window === "undefined") return;
  
  const startTime = new Date().toISOString();
  const gps = getCurrentGPS();
  
  updateTBMInStorage(tbmId, (tbm) => {
    tbm.startTime = startTime;
    if (tbm.locationHistory.length === 0) {
      tbm.locationHistory.push({
        lat: gps.lat,
        lng: gps.lng,
        timestamp: startTime,
        updatedBy: managerName,
      });
    }
    return tbm;
  });
}

// 공종 변경 (MOC - Management of Change)
export function changeWorkType(
  tbmId: string,
  newWorkType: string,
  changedBy: string
): { success: boolean; newRisks: string[]; newMeasures: string[] } {
  if (typeof window === "undefined") {
    return { success: false, newRisks: [], newMeasures: [] };
  }
  
  const existing = getTBMDataList();
  const tbm = existing.find((t) => t.id === tbmId);
  
  if (!tbm) {
    return { success: false, newRisks: [], newMeasures: [] };
  }
  
  const oldWorkType = tbm.workType;
  const riskData = getRisksByWorkType(newWorkType);
  
  // 변경 이력 기록
  const changeRecord = {
    fromWorkType: oldWorkType,
    toWorkType: newWorkType,
    timestamp: new Date().toISOString(),
    changedBy: changedBy,
    newRisks: riskData.risks,
    newMeasures: riskData.measures,
  };
  
  const success = updateTBMInStorage(tbmId, (tbm) => {
    tbm.workType = newWorkType;
    tbm.risks = riskData.risks;
    tbm.measures = riskData.measures;
    tbm.changeHistory = tbm.changeHistory || [];
    tbm.changeHistory.push(changeRecord);
    return tbm;
  });
  
  return {
    success,
    newRisks: riskData.risks,
    newMeasures: riskData.measures,
  };
}

// 위치 갱신
export function updateLocation(tbmId: string, updatedBy: string) {
  if (typeof window === "undefined") return;
  
  const gps = getCurrentGPS();
  const timestamp = new Date().toISOString();
  
  updateTBMInStorage(tbmId, (tbm) => {
    tbm.locationHistory = tbm.locationHistory || [];
    tbm.locationHistory.push({
      lat: gps.lat,
      lng: gps.lng,
      timestamp: timestamp,
      updatedBy: updatedBy,
    });
    return tbm;
  });
}

// 변경 TBM 서명 저장
export function saveChangeSignature(
  tbmId: string,
  changeId: string,
  workerId: string,
  workerName: string,
  signature: string
) {
  if (typeof window === "undefined") return;
  
  const gps = getCurrentGPS();
  const timestamp = new Date().toISOString();
  
  updateTBMInStorage(tbmId, (tbm) => {
    tbm.changeSignatures = tbm.changeSignatures || [];
    tbm.changeSignatures.push({
      workerId,
      workerName,
      signature,
      timestamp,
      gpsLocation: gps,
      changeId,
    });
    return tbm;
  });
}

export function getTBMDataList(): TBMData[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.TBM_DATA);
  return data ? JSON.parse(data) : [];
}

// 서명 데이터 저장 (보고서 아카이빙용)
export function saveSignature(signature: SignatureData) {
  if (typeof window === "undefined") return;
  
  // GPS 위치 및 서버 시간 강제 기록
  const enrichedSignature = {
    ...signature,
    gpsLocation: signature.gpsLocation || getCurrentGPS(),
    timestamp: signature.timestamp || new Date().toISOString(),
  };
  
  const existing = getSignatures();
  existing.push(enrichedSignature);
  localStorage.setItem(STORAGE_KEYS.SIGNATURES, JSON.stringify(existing));
}

export function getSignatures(): SignatureData[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.SIGNATURES);
  return data ? JSON.parse(data) : [];
}

// 포인트 저장 및 등급 자동 계산
export function updateWorkerPoints(workerId: string, points: number, workerName: string) {
  if (typeof window === "undefined") return;
  
  const existing = getWorkerPoints();
  const existingWorker = existing.find((w) => w.workerId === workerId);
  
  const newPoints = existingWorker ? existingWorker.points + points : points;
  const grade = calculateGrade(newPoints);
  
  const updated: WorkerPoints = {
    workerId,
    workerName,
    points: newPoints,
    grade,
    lastUpdated: new Date().toISOString(),
  };
  
  const filtered = existing.filter((w) => w.workerId !== workerId);
  filtered.push(updated);
  
  localStorage.setItem(STORAGE_KEYS.WORKER_POINTS, JSON.stringify(filtered));
}

export function getWorkerPoints(): WorkerPoints[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEYS.WORKER_POINTS);
  return data ? JSON.parse(data) : [];
}

export function getWorkerPointsById(workerId: string): WorkerPoints | null {
  const all = getWorkerPoints();
  return all.find((w) => w.workerId === workerId) || null;
}

// 등급 계산 (관리자 전용)
function calculateGrade(points: number): "S" | "A" | "B" | "C" {
  if (points >= 800) return "S";
  if (points >= 600) return "A";
  if (points >= 400) return "B";
  return "C";
}

// 위험성평가 DB (시뮬레이션)
export function getRiskAssessmentDB(): Record<string, { risks: string[]; measures: string[] }> {
  return {
    "케이블 포설": {
      risks: [
        "중량물 운반 시 전도 위험",
        "케이블 절단 시 손베임 주의",
        "개구부 추락 주의",
      ],
      measures: ["2인 1조 작업", "안전대 걸이 확보", "장갑 착용", "작업 전 점검"],
    },
    "트레이 설치": {
      risks: [
        "고소작업 추락 위험",
        "공구 낙하 위험",
        "전기 감전 위험",
      ],
      measures: ["안전대 필수", "하네스 점검", "절연 장갑 착용", "작업 전 전원 차단"],
    },
    "앙카링": {
      risks: [
        "드릴 작업 시 먼지 흡입",
        "진동에 의한 손목 피로",
        "콘크리트 파편 비산",
      ],
      measures: ["마스크 착용", "보안경 착용", "진동 방지 장갑", "작업 후 청소"],
    },
    "전기실 입선": {
      risks: [
        "전기 감전 위험",
        "밀폐공간 질식 위험",
        "화재 위험",
      ],
      measures: ["절연 장갑", "환기 확인", "소화기 비치", "2인 이상 작업"],
    },
  };
}

// 공종별 위험요인 및 대책 조회
export function getRisksByWorkType(workType: string): { risks: string[]; measures: string[] } {
  const db = getRiskAssessmentDB();
  return db[workType] || { risks: [], measures: [] };
}

// GPS 위치 시뮬레이션
function getCurrentGPS(): { lat: number; lng: number } {
  // 실제로는 브라우저 Geolocation API 사용
  return {
    lat: 37.456 + Math.random() * 0.01,
    lng: 126.705 + Math.random() * 0.01,
  };
}

// 보고서에 서명 데이터 자동 아카이빙
export function getSignaturesForReport(reportType: "quarterly" | "biannual"): SignatureData[] {
  const allSignatures = getSignatures();
  // 분기/반기 보고서에 포함될 서명 필터링
  return allSignatures.filter((sig) => {
    const sigDate = new Date(sig.timestamp);
    const now = new Date();
    
    if (reportType === "quarterly") {
      // 최근 3개월
      const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      return sigDate >= threeMonthsAgo;
    } else {
      // 최근 6개월
      const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
      return sigDate >= sixMonthsAgo;
    }
  });
}
