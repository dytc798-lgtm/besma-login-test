// 공통 상태 유틸리티 함수

import type { DocumentStatus } from "./safety-document-config";

/**
 * 문서 상태에 따른 라벨 반환
 */
export function getStatusLabel(status: DocumentStatus): string {
  switch (status) {
    case "submitted":
      return "제출완료";
    case "pending":
      return "제출대기";
    case "overdue":
      return "제출지연";
    default:
      return "미제출";
  }
}

/**
 * 문서 상태에 따른 색상 클래스 반환
 */
export function getStatusColor(status: DocumentStatus): string {
  switch (status) {
    case "submitted":
      return "bg-green-100 text-green-700";
    case "pending":
      return "bg-yellow-100 text-yellow-700";
    case "overdue":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

/**
 * 팀 번호 추출 (예: "1.대우건설" -> "1팀")
 */
export function extractTeamNumber(team: string): string | null {
  const match = team.match(/^(\d+)\./);
  return match ? `${match[1]}팀` : null;
}

/**
 * 팀 표시명 반환 (팀 번호가 있으면 "1팀", 없으면 원본)
 */
export function getDisplayTeam(team: string): string {
  return extractTeamNumber(team) || team;
}
