/**
 * 고도화(추가/확장) 섹션 — 기본 메뉴트리에 섞지 않음.
 * IA_ITEMS와 별도로 보관. 화면/구성도에서는 '고도화 섹션'으로만 분리 표기.
 */

export type EnhancementSection = {
  id: string;
  title: string;
  items: string[];
};

export const IA_ENHANCEMENT_SECTIONS: EnhancementSection[] = [
  {
    id: "enhancement-emergency",
    title: "고도화-비상 대응 플랫폼",
    items: [
      "비상대응조직도(역할/이름/직책) + 클릭 팝업(전화걸기)",
      "비상연락망(병원/소방/원청/소장/안전) + 전화걸기",
      "비상대응훈련/비상대응카드(추가 가능: PDF/이미지)",
      "비상사태 전원 경고 표시 + 집결지 도면(현장 도면 업로드 → 앱 전체화면)",
      "CPR 순서도 게시(자료 업로드/표출)",
    ],
  },
  {
    id: "enhancement-quality",
    title: "고도화-품질 점검(공사팀)",
    items: [
      "품질점검 체크리스트 수집/점수 집계",
      "부적합 시 자동 시정조치요구서 발송 → 개선조치보고서 등록",
      "승인: 품질=공사팀PM / 안전=안전보건실팀장",
      "월 보고 PDF 출력",
    ],
  },
  {
    id: "enhancement-eval",
    title: "고도화-평가/성과 연계",
    items: [
      "팀별/개인별 업무분장표 → 성과평가 → 안전관계자평가 연계(평가모델 정의 필요)",
    ],
  },
  {
    id: "enhancement-i18n",
    title: "고도화-다국어/알림/검색",
    items: [
      "Papago 번역(TBM 공지/긴급 알림)",
      "SENS(알림톡/SMS) 비상 상황에만",
      "검색 로그 분석: 검색 실패율(No Result), 인기 검색어, 재검색 비율",
    ],
  },
];
