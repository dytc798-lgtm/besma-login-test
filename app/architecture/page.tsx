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

const BOX = {
  mobile: { x: 40, y: 40, w: 300, h: 240 },
  platform: { x: 380, y: 40, w: 300, h: 240 },
  external: { x: 720, y: 40, w: 280, h: 480 },
  siteAdmin: { x: 40, y: 320, w: 300, h: 220 },
  hqAdmin: { x: 380, y: 320, w: 300, h: 220 },
};

function boxCenter(b: { x: number; y: number; w: number; h: number }) {
  return { x: b.x + b.w / 2, y: b.y + b.h / 2 };
}

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

const VIEW_WIDTH = 1020;
const VIEW_HEIGHT = 560;

export default function ArchitecturePage() {
  const mRight = boxRight(BOX.mobile);
  const pLeft = boxLeft(BOX.platform);
  const pRight = boxRight(BOX.platform);
  const eLeft = boxLeft(BOX.external);
  const pBottom = boxBottom(BOX.platform);
  const sTop = boxTop(BOX.siteAdmin);
  const hRight = boxRight(BOX.hqAdmin);
  const sCenterY = BOX.siteAdmin.y + BOX.siteAdmin.h / 2;
  const hCenterY = BOX.hqAdmin.y + BOX.hqAdmin.h / 2;
  const bendY = 430;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">
          업무 흐름 구성도 (전체)
        </h1>
        <p className="text-sm text-gray-500">
          좌→우, 상→하 흐름 · 클릭 시 해당 영역 상세로 이동
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
              id="arrowHeadDown"
              markerWidth="8"
              markerHeight="10"
              refX="4"
              refY="1"
              orient="auto"
            >
              <path d="M0 10 L8 0 L16 10 z" fill="#64748b" />
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

          {/* 화살표: 직선만, 교차 없음 */}
          {/* 1. 현장 근로자 → 플랫폼 (가로) */}
          <line
            x1={mRight.x}
            y1={mRight.y}
            x2={pLeft.x}
            y2={pLeft.y}
            stroke="#64748b"
            strokeWidth="1.5"
            markerEnd="url(#arrowHead)"
          />
          <text
            x={(mRight.x + pLeft.x) / 2}
            y={mRight.y - 12}
            textAnchor="middle"
            className="fill-gray-600 text-xs font-medium"
            fontSize="12"
            fill="#475569"
          >
            {ARROW_LABELS.mobileToPlatform}
          </text>

          {/* 2. 플랫폼 → 외부 (가로) */}
          <line
            x1={pRight.x}
            y1={pRight.y}
            x2={eLeft.x}
            y2={eLeft.y}
            stroke="#64748b"
            strokeWidth="1.5"
            markerEnd="url(#arrowHead)"
          />
          <text
            x={(pRight.x + eLeft.x) / 2}
            y={pRight.y - 12}
            textAnchor="middle"
            fontSize="12"
            fill="#475569"
          >
            {ARROW_LABELS.platformToExternal}
          </text>

          {/* 3. 플랫폼 → 현장 관리자 (세로 후 가로, L자) */}
          <path
            d={`M ${pBottom.x} ${pBottom.y} L ${pBottom.x} ${bendY} L ${sTop.x + BOX.siteAdmin.w / 2} ${bendY} L ${sTop.x + BOX.siteAdmin.w / 2} ${sTop.y}`}
            stroke="#64748b"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrowHeadUp)"
          />
          <text
            x={pBottom.x + 18}
            y={(pBottom.y + bendY) / 2}
            textAnchor="start"
            fontSize="12"
            fill="#475569"
          >
            {ARROW_LABELS.platformToSiteAdmin}
          </text>

          {/* 4. 플랫폼 → 본사 관리자 (세로 후 가로, L자) */}
          <path
            d={`M ${pBottom.x} ${pBottom.y} L ${pBottom.x} ${bendY} L ${hRight.x} ${bendY} L ${hRight.x} ${BOX.hqAdmin.y} L ${BOX.hqAdmin.x + BOX.hqAdmin.w / 2} ${BOX.hqAdmin.y}`}
            stroke="#64748b"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrowHead)"
          />
          <text
            x={pBottom.x + 18}
            y={(pBottom.y + bendY) / 2 - 14}
            textAnchor="start"
            fontSize="12"
            fill="#475569"
          >
            {ARROW_LABELS.platformToHqAdmin}
          </text>

          {/* 5. 본사 관리자 → 외부 (가로) */}
          <line
            x1={hRight.x}
            y1={hCenterY}
            x2={eLeft.x}
            y2={hCenterY}
            stroke="#64748b"
            strokeWidth="1.5"
            markerEnd="url(#arrowHead)"
          />
          <text
            x={(hRight.x + eLeft.x) / 2}
            y={hCenterY - 12}
            textAnchor="middle"
            fontSize="12"
            fill="#475569"
          >
            {ARROW_LABELS.hqToExternal}
          </text>

          {/* 박스: 둥근 모서리, 역할별 색상 */}
          {/* 현장 근로자 (모바일) - 모바일 구분색 */}
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
              <text
                x={BOX.mobile.x + 16}
                y={BOX.mobile.y + 28}
                fontSize="15"
                fontWeight="700"
                fill="#1e1b4b"
              >
                현장 근로자 (모바일 앱)
              </text>
              {MOBILE_FUNCTIONS.map((fn, i) => (
                <text
                  key={fn}
                  x={BOX.mobile.x + 16}
                  y={BOX.mobile.y + 52 + i * 22}
                  fontSize="12"
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
              <text
                x={BOX.platform.x + 16}
                y={BOX.platform.y + 28}
                fontSize="15"
                fontWeight="700"
                fill="#0f172a"
              >
                부현전기 안전보건 플랫폼
              </text>
              <text
                x={BOX.platform.x + 16}
                y={BOX.platform.y + 48}
                fontSize="11"
                fill="#64748b"
              >
                (업무 통합 관리)
              </text>
              {PLATFORM_CORE_FUNCTIONS.map((fn, i) => (
                <text
                  key={fn}
                  x={BOX.platform.x + 16}
                  y={BOX.platform.y + 72 + i * 22}
                  fontSize="12"
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
          <text
            x={BOX.external.x + 16}
            y={BOX.external.y + 28}
            fontSize="15"
            fontWeight="700"
            fill="#0f172a"
          >
            외부 연동 시스템
          </text>
          {EXTERNAL_FUNCTIONS.map((fn, i) => (
            <text
              key={fn}
              x={BOX.external.x + 16}
              y={BOX.external.y + 56 + i * 24}
              fontSize="12"
              fill="#334155"
            >
              · {fn}
            </text>
          ))}

          {/* 현장 관리자 (웹) - 웹 구분색 */}
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
              <text
                x={BOX.siteAdmin.x + 16}
                y={BOX.siteAdmin.y + 28}
                fontSize="15"
                fontWeight="700"
                fill="#0f172a"
              >
                현장 관리자 (웹)
              </text>
              {SITE_ADMIN_FUNCTIONS.slice(0, 5).map((fn, i) => (
                <text
                  key={fn}
                  x={BOX.siteAdmin.x + 16}
                  y={BOX.siteAdmin.y + 52 + i * 22}
                  fontSize="12"
                  fill="#334155"
                >
                  · {fn}
                </text>
              ))}
              <text
                x={BOX.siteAdmin.x + 16}
                y={BOX.siteAdmin.y + 52 + 5 * 22}
                fontSize="11"
                fill="#64748b"
              >
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
              <text
                x={BOX.hqAdmin.x + 16}
                y={BOX.hqAdmin.y + 28}
                fontSize="15"
                fontWeight="700"
                fill="#0f172a"
              >
                본사 관리자 (웹)
              </text>
              {HQ_ADMIN_FUNCTIONS.map((fn, i) => (
                <text
                  key={fn}
                  x={BOX.hqAdmin.x + 16}
                  y={BOX.hqAdmin.y + 52 + i * 22}
                  fontSize="12"
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
