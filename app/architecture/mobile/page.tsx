"use client";

import Link from "next/link";
import {
  ARCH_ROUTES,
  MOBILE_FUNCTIONS,
} from "@/lib/architecture-config";
import { FunctionSection, WireframeMock } from "../components/FunctionSection";

const MINI_BOX = { x: 20, y: 20, w: 160, h: 80 };

export default function ArchitectureMobilePage() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">
          현장 근로자 (모바일 앱)
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          작업지시 확인, 위험성평가·TBM 서명, 위험 신고, 작업중지권, MSDS 조회 등
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={ARCH_ROUTES.index}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            ← 전체 흐름
          </Link>
        </div>
      </div>

      {/* 미니 구성도: 모바일 → 플랫폼 */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">
          업무 흐름 (해당 영역)
        </h2>
        <svg
          viewBox="0 0 340 120"
          className="h-auto w-full max-w-md"
          aria-hidden
        >
          <defs>
            <marker
              id="mArrow"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <path d="M0 0 L8 3 L0 6 z" fill="#64748b" />
            </marker>
          </defs>
          <rect
            x={MINI_BOX.x}
            y={MINI_BOX.y}
            width={MINI_BOX.w}
            height={MINI_BOX.h}
            rx="8"
            fill="#eef2ff"
            stroke="#6366f1"
            strokeWidth="1"
          />
          <text x={MINI_BOX.x + 12} y={MINI_BOX.y + 28} fontSize="12" fontWeight="600" fill="#1e1b4b">
            현장 근로자 (모바일)
          </text>
          <line
            x1={MINI_BOX.x + MINI_BOX.w}
            y1={MINI_BOX.y + MINI_BOX.h / 2}
            x2={220}
            y2={MINI_BOX.y + MINI_BOX.h / 2}
            stroke="#64748b"
            strokeWidth="1"
            markerEnd="url(#mArrow)"
          />
          <text x={170} y={MINI_BOX.y + MINI_BOX.h / 2 - 8} textAnchor="middle" fontSize="10" fill="#475569">
            작업 결과 전송
          </text>
          <rect x={230} y={20} width={90} height={80} rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
          <text x={240} y={55} fontSize="11" fill="#334155">플랫폼</text>
        </svg>
      </div>

      {/* 기능별 상세 */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">기능별 상세</h2>
        {MOBILE_FUNCTIONS.map((fn, i) => (
          <FunctionSection key={fn} title={fn} defaultOpen={i === 0}>
            <WireframeMock title={`${fn} 화면 목업`}>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="h-6 w-3/4 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-5/6 rounded bg-gray-100" />
                <div className="mt-3 flex gap-2">
                  <div className="h-8 w-20 rounded bg-gray-200" />
                  <div className="h-8 w-20 rounded bg-gray-200" />
                </div>
              </div>
            </WireframeMock>
          </FunctionSection>
        ))}
      </div>
    </div>
  );
}
