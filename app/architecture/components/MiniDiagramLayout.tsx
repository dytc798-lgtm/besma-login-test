"use client";

/**
 * 세부 프로세스 미니 구성도 공통 레이아웃 규칙
 * - 박스/화살표 24px 이격, 라벨 흰배경 4px 패딩
 * - viewBox = 콘텐츠 bbox + CANVAS_PADDING (잘림 방지)
 * - 컨테이너 overflow-x: auto, padding 16px
 */

export const MINI_CANVAS_PADDING = 24;
export const MINI_BOX_TO_ARROW = 24;
export const MINI_LABEL_PAD = 4;
export const MINI_LABEL_ABOVE = 8;
export const MINI_CONTAINER_SAFE = 16;
export const MINI_ARROW_MIN_LENGTH = 100;

export function miniGap() {
  return MINI_BOX_TO_ARROW + MINI_ARROW_MIN_LENGTH + MINI_BOX_TO_ARROW;
}

export function MiniDiagramWrapper({
  viewWidth,
  viewHeight,
  children,
}: {
  viewWidth: number;
  viewHeight: number;
  children: React.ReactNode;
}) {
  return (
    <div
      className="overflow-x-auto overflow-y-visible rounded-lg border border-gray-200 bg-gray-50/50"
      style={{ padding: MINI_CONTAINER_SAFE }}
    >
      <svg
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMinYMin meet"
        className="h-auto"
        style={{ minWidth: viewWidth }}
        aria-hidden
      >
        {children}
      </svg>
    </div>
  );
}
