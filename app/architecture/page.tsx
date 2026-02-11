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

// 박스 간 최소 간격 120px, 화살표-박스 간격 40px, 화살표 최소 길이(텍스트+24*2) 확보
const BOX_W = 300;
const BOX_H_TOP = 240;
const BOX_H_ROW2 = 220;
const GAP_BOX_ARROW = 40;
const ARROW_MIN_LENGTH = 160;
const GAP = GAP_BOX_ARROW + ARROW_MIN_LENGTH + GAP_BOX_ARROW; // 240
const ROW0_Y = 40;
const ROW1_Y = 40 + BOX_H_TOP + 80; // 360
const EXTERNAL_W = 260;

const BOX = {
  mobile: { x: 40, y: ROW0_Y, w: BOX_W, h: BOX_H_TOP },
  platform: { x: 40 + BOX_W + GAP, y: ROW0_Y, w: BOX_W, h: BOX_H_TOP },
  external: { x: 40 + BOX_W + GAP + BOX_W + GAP, y: ROW0_Y, w: EXTERNAL_W, h: ROW1_Y + BOX_H_ROW2 - ROW0_Y },
  siteAdmin: { x: 40, y: ROW1_Y, w: BOX_W, h: BOX_H_ROW2 },
  hqAdmin: { x: 40 + BOX_W + GAP, y: ROW1_Y, w: BOX_W, h: BOX_H_ROW2 },
};

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

const VIEW_WIDTH = BOX.external.x + BOX.external.w + 40;
const VIEW_HEIGHT = ROW1_Y + BOX_H_ROW2 + 40;
const BEND_Y = ROW1_Y - GAP_BOX_ARROW;

// 화살표 위 텍스트: 중앙 상단, 흰 배경 패딩 4px, 13~14px bold
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
  const pad = 4;
  const fontSize = 14;
  const approxWidth = text.length * (fontSize * 0.9);
  const w = approxWidth + pad * 2;
  const h = fontSize + pad * 2;
  return (
    <g id={id}>
      <rect
        x={x - w / 2}
        y={y - h}
        width={w}
        height={h}
        rx="4"
        fill="white"
        stroke="#e2e8f0"
        strokeWidth="1"
      />
      <text
        x={x}
        y={y - pad - fontSize / 3}
        textAnchor="middle"
        fontSize={fontSize}
        fontWeight="700"
        fill="#334155"
      >
        {text}
      </text>
    </g>
  );
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

  const arrowY1 = ROW0_Y + BOX_H_TOP / 2;
  const arrowX1Start = mRight.x + GAP_BOX_ARROW;
  const arrowX1End = pLeft.x - GAP_BOX_ARROW;
  const arrowX2Start = pRight.x + GAP_BOX_ARROW;
  const arrowX2End = eLeft.x - GAP_BOX_ARROW;
  const arrowX5Start = hRight.x + GAP_BOX_ARROW;
  const arrowX5End = eLeft.x - GAP_BOX_ARROW;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h1 className="text-[18px] font-bold text-gray-900">
          업무 흐름 구성도 (전체)
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          좌→우, 상→하 흐름 · 화살표와 텍스트 겹침 없음 · 클릭 시 해당 영역 상세로 이동
        </p>
        <p className="mt-1 text-xs text-gray-400">
          보고용 · PPT 캡처 시 이 영역을 그대로 캡처하여 사용 가능
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <svg
          viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
          className="h-auto w-full min-w-[900px]"
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

          {/* 화살표: 직선만, 박스와 40px 이격 */}
          {/* 1. 현장 근로자 → 플랫폼 (가로) */}
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
            y={arrowY1 - 14}
            text={ARROW_LABELS.mobileToPlatform}
          />

          {/* 2. 플랫폼 → 외부 (가로) */}
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
            y={arrowY1 - 14}
            text={ARROW_LABELS.platformToExternal}
          />

          {/* 3. 플랫폼 → 현장 관리자 (L자): 라벨은 가로 구간 중앙 상단에 배치 */}
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
            y={BEND_Y - 14}
            text={ARROW_LABELS.platformToSiteAdmin}
          />

          {/* 4. 플랫폼 → 본사 관리자 (세로): 라벨은 세로 구간 옆에 배치(박스와 겹치지 않음) */}
          <path
            d={`M ${pBottom.x} ${pBottom.y} L ${pBottom.x} ${BEND_Y} L ${BOX.hqAdmin.x + BOX.hqAdmin.w / 2} ${BEND_Y} L ${BOX.hqAdmin.x + BOX.hqAdmin.w / 2} ${BOX.hqAdmin.y}`}
            stroke="#64748b"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrowHeadUp)"
          />
          <ArrowLabel
            id="l4"
            x={pBottom.x - 70}
            y={(pBottom.y + BEND_Y) / 2}
            text={ARROW_LABELS.platformToHqAdmin}
          />

          {/* 5. 본사 관리자 → 외부 (가로) */}
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
            y={hCenterY - 14}
            text={ARROW_LABELS.hqToExternal}
          />

          {/* 박스: 그리기 순서를 화살표 뒤로 해서 박스가 위에 보이도록 */}
          {/* 현장 근로자 (모바일) */}
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

          {/* 플랫폼 핵심 */}
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

          {/* 외부 연동 */}
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

          {/* 현장 관리자 (웹) */}
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

          {/* 본사 관리자 (웹) */}
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
