// 안전문서 설정 데이터 구조

export type DocumentCycle = "monthly" | "biannual";

export type DocumentCategory = 
  | "노동부 일반 대응"
  | "노동부 안전 대응"
  | "중처법 대응"
  | "사규";

export interface SafetyDocument {
  id: string;
  name: string;
  cycle: DocumentCycle;
  category?: DocumentCategory;
  order: number; // 표시 순서
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 기본 설정값
export const defaultSafetyDocuments: SafetyDocument[] = [
  // 월간 (매월 1회)
  { id: "doc-001", name: "위험성평가표", cycle: "monthly", order: 1, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-002", name: "TBM일지", cycle: "monthly", order: 2, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-003", name: "산업안전보건관리비 사용내역", cycle: "monthly", order: 3, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  
  // 반기 (6개월 1회) - 노동부 일반 대응
  { id: "doc-004", name: "현장 조직도", cycle: "biannual", category: "노동부 일반 대응", order: 1, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-005", name: "근로계약서", cycle: "biannual", category: "노동부 일반 대응", order: 2, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-006", name: "근로자 명부", cycle: "biannual", category: "노동부 일반 대응", order: 3, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-007", name: "법령요지 게시 사진", cycle: "biannual", category: "노동부 일반 대응", order: 4, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-008", name: "법령요지 게시 사진 (추가 1)", cycle: "biannual", category: "노동부 일반 대응", order: 5, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-009", name: "법령요지 게시 사진 (추가 2)", cycle: "biannual", category: "노동부 일반 대응", order: 6, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-010", name: "법령요지 게시 사진 (추가 3)", cycle: "biannual", category: "노동부 일반 대응", order: 7, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  
  // 반기 (6개월 1회) - 노동부 안전 대응
  { id: "doc-011", name: "신규채용자 면담일지", cycle: "biannual", category: "노동부 안전 대응", order: 8, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-012", name: "정기 안전보건교육 일지", cycle: "biannual", category: "노동부 안전 대응", order: 9, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-013", name: "특별 안전보건교육 일지", cycle: "biannual", category: "노동부 안전 대응", order: 10, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-014", name: "MSDS 교육 일지", cycle: "biannual", category: "노동부 안전 대응", order: 11, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-015", name: "관리감독자 교육 일지", cycle: "biannual", category: "노동부 안전 대응", order: 12, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-016", name: "건강검진 결과표", cycle: "biannual", category: "노동부 안전 대응", order: 13, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-017", name: "작업계획서", cycle: "biannual", category: "노동부 안전 대응", order: 14, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-018", name: "작업계획서 (추가 1)", cycle: "biannual", category: "노동부 안전 대응", order: 15, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-019", name: "작업계획서 (추가 2)", cycle: "biannual", category: "노동부 안전 대응", order: 16, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-020", name: "작업계획서 (추가 3)", cycle: "biannual", category: "노동부 안전 대응", order: 17, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-021", name: "작업계획서 (추가 4)", cycle: "biannual", category: "노동부 안전 대응", order: 18, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  
  // 반기 (6개월 1회) - 중처법 대응
  { id: "doc-022", name: "안전보건방침", cycle: "biannual", category: "중처법 대응", order: 19, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-023", name: "위험성평가 회의록", cycle: "biannual", category: "중처법 대응", order: 20, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-024", name: "점검표", cycle: "biannual", category: "중처법 대응", order: 21, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-025", name: "근로자 청취 보고서", cycle: "biannual", category: "중처법 대응", order: 22, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-026", name: "중처법 대응 서류 (추가 1)", cycle: "biannual", category: "중처법 대응", order: 23, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-027", name: "중처법 대응 서류 (추가 2)", cycle: "biannual", category: "중처법 대응", order: 24, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-028", name: "중처법 대응 서류 (추가 3)", cycle: "biannual", category: "중처법 대응", order: 25, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-029", name: "중처법 대응 서류 (추가 4)", cycle: "biannual", category: "중처법 대응", order: 26, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-030", name: "중처법 대응 서류 (추가 5)", cycle: "biannual", category: "중처법 대응", order: 27, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-031", name: "중처법 대응 서류 (추가 6)", cycle: "biannual", category: "중처법 대응", order: 28, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-032", name: "중처법 대응 서류 (추가 7)", cycle: "biannual", category: "중처법 대응", order: 29, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  
  // 반기 (6개월 1회) - 사규
  { id: "doc-033", name: "안전보건게시판 사진", cycle: "biannual", category: "사규", order: 30, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-034", name: "사인물 사진", cycle: "biannual", category: "사규", order: 31, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
  { id: "doc-035", name: "오후 TBM 일지", cycle: "biannual", category: "사규", order: 32, isActive: true, createdAt: "2024-01-01", updatedAt: "2024-01-01" },
];

// 현장 리스트 인터페이스
export interface Site {
  id: string;
  name: string;
  team: string; // 대괄호 안의 팀/발주처 정보
  fullName: string; // 전체 현장명
}

// 현장 리스트는 별도 파일에서 lazy loading (빌드 시 부하 없음)
// app/dashboard/safety-documents/page.tsx에서 getMockSites()를 사용

// 현장별 서류 제출 현황
export type DocumentStatus = "submitted" | "pending" | "overdue" | "not-required";

export interface SiteDocumentStatus {
  siteId: string;
  documentId: string;
  status: DocumentStatus;
  submittedDate?: string;
  submittedBy?: string;
  dueDate: string;
  cycle: DocumentCycle;
  period: string; // "2024-01" (월간) 또는 "2024-1H" (반기)
}
