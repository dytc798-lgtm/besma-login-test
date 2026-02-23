/**
 * 본사 대시보드용 남한 현장 30곳 (제주 포함) - 지도 핀 표시용
 * 좌표: 남한 위경도 범위 내 (lat 33.1~38.6, lng 124.6~131.9)
 */
export interface HQMapSite {
  id: number;
  name: string;
  code: string;
  lat: number;
  lng: number;
  risk: "low" | "medium" | "high";
}

export const hqMapSites: HQMapSite[] = [
  { id: 1, name: "구리 인창C구역", code: "22052", lat: 37.594, lng: 127.143, risk: "low" },
  { id: 2, name: "감삼 신축", code: "22001", lat: 35.158, lng: 129.062, risk: "low" },
  { id: 3, name: "청석 거주자우선주차장", code: "22002", lat: 37.285, lng: 127.012, risk: "medium" },
  { id: 4, name: "상도동 주상복합", code: "22003", lat: 37.498, lng: 126.928, risk: "low" },
  { id: 5, name: "청주 테크노폴리스", code: "22004", lat: 36.635, lng: 127.491, risk: "low" },
  { id: 6, name: "송림3구역", code: "22005", lat: 37.461, lng: 126.652, risk: "low" },
  { id: 7, name: "인천 건강관리협회", code: "22006", lat: 37.448, lng: 126.652, risk: "low" },
  { id: 8, name: "검단신도시 101역세권", code: "22007", lat: 37.612, lng: 126.675, risk: "medium" },
  { id: 9, name: "평택 통복동", code: "22008", lat: 36.992, lng: 127.085, risk: "low" },
  { id: 10, name: "평택 가재지구 1블럭", code: "22009", lat: 36.985, lng: 127.092, risk: "low" },
  { id: 11, name: "고잔연립9구역", code: "22010", lat: 37.318, lng: 126.832, risk: "low" },
  { id: 12, name: "전도관구역", code: "22011", lat: 35.821, lng: 128.541, risk: "low" },
  { id: 13, name: "대웅제약 마곡", code: "22012", lat: 37.562, lng: 126.825, risk: "low" },
  { id: 14, name: "영종-청라 연결도로", code: "22013", lat: 37.492, lng: 126.489, risk: "medium" },
  { id: 15, name: "양주회천 A12", code: "22014", lat: 37.802, lng: 127.062, risk: "low" },
  { id: 16, name: "청라C18BL", code: "22015", lat: 37.532, lng: 126.644, risk: "low" },
  { id: 17, name: "강원 국도터널", code: "22016", lat: 37.885, lng: 127.732, risk: "medium" },
  { id: 18, name: "검단신도시 AA29BL", code: "22017", lat: 37.608, lng: 126.668, risk: "low" },
  { id: 19, name: "장위6구역", code: "22018", lat: 37.612, lng: 127.048, risk: "low" },
  { id: 20, name: "검단지구 AB20-2BL", code: "22019", lat: 37.605, lng: 126.672, risk: "low" },
  { id: 21, name: "인천 효성지구 3BL", code: "22020", lat: 37.442, lng: 126.701, risk: "low" },
  { id: 22, name: "The-K 제주호텔", code: "22021", lat: 33.499, lng: 126.531, risk: "low" },
  { id: 23, name: "평택화양센트럴", code: "22022", lat: 36.978, lng: 127.102, risk: "low" },
  { id: 24, name: "고양장항 B-3BL", code: "22023", lat: 37.658, lng: 126.812, risk: "low" },
  { id: 25, name: "검단중학교", code: "22024", lat: 37.618, lng: 126.662, risk: "low" },
  { id: 26, name: "스타필드 청라", code: "22025", lat: 37.528, lng: 126.638, risk: "low" },
  { id: 27, name: "양주 삼숭", code: "22026", lat: 37.782, lng: 127.045, risk: "low" },
  { id: 28, name: "평택 브레인시티", code: "22027", lat: 36.972, lng: 127.088, risk: "low" },
  { id: 29, name: "인천 신흥동3가", code: "22028", lat: 37.438, lng: 126.658, risk: "low" },
  { id: 30, name: "롯데백화점 노원", code: "22029", lat: 37.654, lng: 127.061, risk: "medium" },
];

/** 남한 위경도 범위 (제주 포함) */
export const KOREA_BOUNDS = {
  latMin: 33.11,
  latMax: 38.61,
  lngMin: 124.61,
  lngMax: 131.87,
};
