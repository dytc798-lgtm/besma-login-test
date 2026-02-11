"use client";

import Link from "next/link";
import {
  ARCH_ROUTES,
  ARROW_LABELS,
  MOBILE_FUNCTIONS,
  SITE_ADMIN_FUNCTIONS,
  HQ_ADMIN_FUNCTIONS,
  PLATFORM_CORE_FUNCTIONS,
  EXTERNAL_FUNCTIONS,
} from "@/lib/architecture-config";

// ========== [1] 레이아웃 규칙 상수 ==========
const CANVAS_PADDING = 48;
const CONTAINER_SAFE = 24;
const BOX_EDGE_TO_ARROW = 32;
const LABEL_ABOVE_ARROW = 12;
const LABEL_PAD = 6;
const LABEL_FONT_SIZE = 14;
const LABEL_RADIUS = 6;
// 라벨 길이 기준 최소 화살표: arrowLength >= labelWidth + 80
const LABEL_APPROX_PX_PER_CHAR = 10;
const MIN_ARROW_EXTRA = 80;
const MIN_ARROW_LENGTH = Math.max(
  180,
  ...Object.values(ARROW_LABELS).map(
    (t) => t.length * LABEL_APPROX_PX_PER_CHAR + MIN_ARROW_EXTRA
  )
);
const GAP = BOX_EDGE_TO_ARROW + MIN_ARROW_LENGTH + BOX_EDGE_TO_ARROW;

const BOX_W = 300;
const BOX_H_TOP = 240;
const BOX_H_ROW2 = 220;
const EXTERNAL_W = 260;
const ROW_GAP = 80;

// ========== [2] 박스 배치 (grid, safe padding) ==========
const ROW0_Y = CANVAS_PADDING;
const ROW1_Y = CANVAS_PADDING + BOX_H_TOP + ROW_GAP;

const BOX = {
  mobile: { x: CANVAS_PADDING, y: ROW0_Y, w: BOX_W, h: BOX_H_TOP },
  platform: {
    x: CANVAS_PADDING + BOX_W + GAP,
    y: ROW0_Y,
    w: BOX_W,
    h: BOX_H_TOP,
  },
  external: {
    x: CANVAS_PADDING + BOX_W + GAP + BOX_W + GAP,
    y: ROW0_Y,
    w: EXTERNAL_W,
    h: ROW1_Y + BOX_H_ROW2 - ROW0_Y,
  },
  siteAdmin: { x: CANVAS_PADDING, y: ROW1_Y, w: BOX_W, h: BOX_H_ROW2 },
  hqAdmin: {
    x: CANVAS_PADDING + BOX_W + GAP,
    y: ROW1_Y,
    w: BOX_W,
    h: BOX_H_ROW2,
  },
};

// ========== [3] 콘텐츠 bbox → 캔버스 크기 ==========
const CONTENT_MAX_X = BOX.external.x + BOX.external.w;
const CONTENT_MAX_Y = ROW1_Y + BOX_H_ROW2;
const VIEW_WIDTH = CONTENT_MAX_X + CANVAS_PADDING;
const VIEW_HEIGHT = CONTENT_MAX_Y + CANVAS_PADDING;

const BEND_Y = ROW1_Y - BOX_EDGE_TO_ARROW;

function boxRight(b: { x: number; y: number; w: number; h: number }) {
  return { x: b.x + b.w, y: b.y + b.h / 2 };
}
function boxLeft(b: { x: number; y: number; w: number; h: number }) {
  return { x: b.x, y: b.y + b.h / 2 };
}
function boxBottom(b: { x: number; y: number; w: number; h: number }) {
  return { x: b.x + b.w / 2, y: b.y + b.h };
}
function boxTop(b: { x: number; y: number; w: number; h: number }) {
  return { x: b.x + b.w / 2, y: b.y };
}

// 라벨 bbox (중앙 x,y 기준 반환된 width/height)
function getLabelSize(text: string) {
  const w =
    text.length * LABEL_APPROX_PX_PER_CHAR + LABEL_PAD * 2;
  const h = LABEL_FONT_SIZE + LABEL_PAD * 2;
  return { w, h };
}

// 화살표 위 라벨: 중앙 상단 12px, 흰배경 padding 6px, border-radius 6px
function ArrowLabel({
  x,
  y,
  text,
  id,
}: {
  x: number;
  y: number;
  text: string;
  id: string;
}) {
  const { w, h } = getLabelSize(text);
  return (
    <g id={id}>
      <rect
        x={x - w / 2}
        y={y - LABEL_ABOVE_ARROW - h}
        width={w}
        height={h}
        rx={LABEL_RADIUS}
        ry={LABEL_RADIUS}
        fill="white"
        stroke="#e2e8f0"
        strokeWidth="1"
      />
      <text
        x={x}
        y={y - LABEL_ABOVE_ARROW - LABEL_PAD - LABEL_FONT_SIZE / 3}
        textAnchor="middle"
        fontSize={LABEL_FONT_SIZE}
        fontWeight="700"
        fill="#334155"
      >
        {text}
      </text>
    </g>
  );
}

// 공통 라벨 Y 좌표 계산
// 기본: 선에서 18px 위, 하단 공유 라인(l3/l4)은 +10px 내려서 살짝 아래 배치
function getLabelY(lineY: number, sharedBottomLine = false) {
  const base = lineY - 18;
  return sharedBottomLine ? base + 10 : base;
}

export default function ArchitecturePage() {
  const mRight = boxRight(BOX.mobile);
  const pLeft = boxLeft(BOX.platform);
  const pRight = boxRight(BOX.platform);
  const eLeft = boxLeft(BOX.external);
  const pBottom = boxBottom(BOX.platform);
  const sTop = boxTop(BOX.siteAdmin);
  const hRight = boxRight(BOX.hqAdmin);
  const hCenterY = BOX.hqAdmin.y + BOX.hqAdmin.h / 2;

  // [4] 화살표 경로: 박스 border로부터 32px
  const arrowY1 = ROW0_Y + BOX_H_TOP / 2;
  const arrowX1Start = mRight.x + BOX_EDGE_TO_ARROW;
  const arrowX1End = pLeft.x - BOX_EDGE_TO_ARROW;
  const arrowX2Start = pRight.x + BOX_EDGE_TO_ARROW;
  const arrowX2End = eLeft.x - BOX_EDGE_TO_ARROW;
  const arrowX5Start = hRight.x + BOX_EDGE_TO_ARROW;
  const arrowX5End = eLeft.x - BOX_EDGE_TO_ARROW;


  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h1 className="text-[18px] font-bold text-gray-900">
          업무 흐름 구성도 (전체)
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          좌→우, 상→하 흐름 · 화살표/라벨 안전거리 32px · 잘림 없음(가로 스크롤)
        </p>
        <p className="mt-1 text-xs text-gray-400">
          보고용 · PPT 캡처 시 이 영역을 그대로 캡처하여 사용 가능
        </p>
      </div>

      {/* overflow-x: auto, overflow-y: visible, 컨테이너 경계 24px 이내 미접촉 */}
      <div
        className="overflow-x-auto overflow-y-visible rounded-xl border border-gray-200 bg-white shadow-sm"
        style={{ padding: CONTAINER_SAFE }}
      >
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          preserveAspectRatio="xMinYMin meet"
          className="block h-auto w-full"
          role="img"
          aria-label="부현전기 안전보건 플랫폼 업무 흐름 구성도"
        >
          <defs>
            <marker
              id="arrowHead"
              markerWidth="10"
              markerHeight="8"
              refX="9"
              refY="4"
              orient="auto"
            >
              <path d="M0 0 L10 4 L0 8 z" fill="#64748b" />
            </marker>
            <marker
              id="arrowHeadUp"
              markerWidth="8"
              markerHeight="10"
              refX="4"
              refY="9"
              orient="auto"
            >
              <path d="M0 0 L8 10 L16 0 z" fill="#64748b" />
            </marker>
          </defs>

          {/* 1. 현장 근로자 → 플랫폼 */}
          <line
            x1={arrowX1Start}
            y1={arrowY1}
            x2={arrowX1End}
            y2={arrowY1}
            stroke="#64748b"
            strokeWidth="1.5"
            markerEnd="url(#arrowHead)"
          />
          <ArrowLabel
            id="l1"
            x={(arrowX1Start + arrowX1End) / 2}
            y={getLabelY(arrowY1)}
            text={ARROW_LABELS.mobileToPlatform}
          />

          {/* 2. 플랫폼 → 외부 */}
          <line
            x1={arrowX2Start}
            y1={arrowY1}
            x2={arrowX2End}
            y2={arrowY1}
            stroke="#64748b"
            strokeWidth="1.5"
            markerEnd="url(#arrowHead)"
          />
          <ArrowLabel
            id="l2"
            x={(arrowX2Start + arrowX2End) / 2}
            y={getLabelY(arrowY1)}
            text={ARROW_LABELS.platformToExternal}
          />

          {/* 3. 플랫폼 → 현장 관리자 (L자) */}
          <path
            d={`M ${pBottom.x} ${pBottom.y} L ${pBottom.x} ${BEND_Y} L ${sTop.x} ${BEND_Y} L ${sTop.x} ${sTop.y}`}
            stroke="#64748b"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrowHeadUp)"
          />
          <ArrowLabel
            id="l3"
            x={(pBottom.x + sTop.x) / 2}
            y={getLabelY(BEND_Y, true)}
            text={ARROW_LABELS.platformToSiteAdmin}
          />

          {/* 4. 플랫폼 → 본사 관리자 */}
          <path
            d={`M ${pBottom.x} ${pBottom.y} L ${pBottom.x} ${BEND_Y} L ${BOX.hqAdmin.x + BOX.hqAdmin.w / 2} ${BEND_Y} L ${BOX.hqAdmin.x + BOX.hqAdmin.w / 2} ${BOX.hqAdmin.y}`}
            stroke="#64748b"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrowHeadUp)"
          />
          <ArrowLabel
            id="l4"
            x={pBottom.x - 90}
            y={getLabelY(BEND_Y, true)}
            text={ARROW_LABELS.platformToHqAdmin}
          />

          {/* 5. 본사 관리자 → 외부 */}
          <line
            x1={arrowX5Start}
            y1={hCenterY}
            x2={arrowX5End}
            y2={hCenterY}
            stroke="#64748b"
            strokeWidth="1.5"
            markerEnd="url(#arrowHead)"
          />
          <ArrowLabel
            id="l5"
            x={(arrowX5Start + arrowX5End) / 2}
            y={getLabelY(hCenterY)}
            text={ARROW_LABELS.hqToExternal}
          />

          {/* 박스 */}
          <Link href={ARCH_ROUTES.mobile}>
            <g className="cursor-pointer transition-opacity hover:opacity-90">
              <rect
                x={BOX.mobile.x}
                y={BOX.mobile.y}
                width={BOX.mobile.w}
                height={BOX.mobile.h}
                rx="12"
                ry="12"
                fill="#eef2ff"
                stroke="#6366f1"
                strokeWidth="1.5"
              />
              <text x={BOX.mobile.x + 16} y={BOX.mobile.y + 28} fontSize="16" fontWeight="700" fill="#1e1b4b">
                현장 근로자 (모바일 앱)
              </text>
              {MOBILE_FUNCTIONS.map((fn, i) => (
                <text
                  key={fn}
                  x={BOX.mobile.x + 16}
                  y={BOX.mobile.y + 54 + i * 22}
                  fontSize="14"
                  fill="#334155"
                >
                  · {fn}
                </text>
              ))}
            </g>
          </Link>

          <Link href={ARCH_ROUTES.platformCore}>
            <g className="cursor-pointer transition-opacity hover:opacity-90">
              <rect
                x={BOX.platform.x}
                y={BOX.platform.y}
                width={BOX.platform.w}
                height={BOX.platform.h}
                rx="12"
                ry="12"
                fill="#f8fafc"
                stroke="#64748b"
                strokeWidth="1.5"
              />
              <text x={BOX.platform.x + 16} y={BOX.platform.y + 28} fontSize="16" fontWeight="700" fill="#0f172a">
                부현전기 안전보건 플랫폼
              </text>
              <text x={BOX.platform.x + 16} y={BOX.platform.y + 50} fontSize="12" fill="#64748b">
                (업무 통합 관리)
              </text>
              {PLATFORM_CORE_FUNCTIONS.map((fn, i) => (
                <text
                  key={fn}
                  x={BOX.platform.x + 16}
                  y={BOX.platform.y + 74 + i * 22}
                  fontSize="14"
                  fill="#334155"
                >
                  · {fn}
                </text>
              ))}
            </g>
          </Link>

          <rect
            x={BOX.external.x}
            y={BOX.external.y}
            width={BOX.external.w}
            height={BOX.external.h}
            rx="12"
            ry="12"
            fill="#f1f5f9"
            stroke="#94a3b8"
            strokeWidth="1.5"
          />
          <text x={BOX.external.x + 16} y={BOX.external.y + 28} fontSize="16" fontWeight="700" fill="#0f172a">
            외부 연동 시스템
          </text>
          {EXTERNAL_FUNCTIONS.map((fn, i) => (
            <text
              key={fn}
              x={BOX.external.x + 16}
              y={BOX.external.y + 56 + i * 24}
              fontSize="14"
              fill="#334155"
            >
              · {fn}
            </text>
          ))}

          <Link href={ARCH_ROUTES.siteAdmin}>
            <g className="cursor-pointer transition-opacity hover:opacity-90">
              <rect
                x={BOX.siteAdmin.x}
                y={BOX.siteAdmin.y}
                width={BOX.siteAdmin.w}
                height={BOX.siteAdmin.h}
                rx="12"
                ry="12"
                fill="#f1f5f9"
                stroke="#475569"
                strokeWidth="1.5"
              />
              <text x={BOX.siteAdmin.x + 16} y={BOX.siteAdmin.y + 28} fontSize="16" fontWeight="700" fill="#0f172a">
                현장 관리자 (웹)
              </text>
              {SITE_ADMIN_FUNCTIONS.slice(0, 5).map((fn, i) => (
                <text
                  key={fn}
                  x={BOX.siteAdmin.x + 16}
                  y={BOX.siteAdmin.y + 54 + i * 22}
                  fontSize="14"
                  fill="#334155"
                >
                  · {fn}
                </text>
              ))}
              <text x={BOX.siteAdmin.x + 16} y={BOX.siteAdmin.y + 54 + 5 * 22} fontSize="12" fill="#64748b">
                · 외 {SITE_ADMIN_FUNCTIONS.length - 5}개
              </text>
            </g>
          </Link>

          <Link href={ARCH_ROUTES.hqAdmin}>
            <g className="cursor-pointer transition-opacity hover:opacity-90">
              <rect
                x={BOX.hqAdmin.x}
                y={BOX.hqAdmin.y}
                width={BOX.hqAdmin.w}
                height={BOX.hqAdmin.h}
                rx="12"
                ry="12"
                fill="#f1f5f9"
                stroke="#475569"
                strokeWidth="1.5"
              />
              <text x={BOX.hqAdmin.x + 16} y={BOX.hqAdmin.y + 28} fontSize="16" fontWeight="700" fill="#0f172a">
                본사 관리자 (웹)
              </text>
              {HQ_ADMIN_FUNCTIONS.map((fn, i) => (
                <text
                  key={fn}
                  x={BOX.hqAdmin.x + 16}
                  y={BOX.hqAdmin.y + 54 + i * 22}
                  fontSize="14"
                  fill="#334155"
                >
                  · {fn}
                </text>
              ))}
            </g>
          </Link>
        </svg>
      </div>
    </div>
  );
}
