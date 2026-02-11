"use client";

import Link from "next/link";
import {
  ARCH_ROUTES,
  PLATFORM_CORE_FUNCTIONS,
} from "@/lib/architecture-config";
import { FunctionSection, WireframeMock } from "../components/FunctionSection";

export default function ArchitecturePlatformCorePage() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">
          플랫폼 핵심 영역
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          위험성평가 엔진, 가변 위험요인 DB, MOC, Health-Lock, OCR, 알림 엔진
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

      {/* 미니 구성도: 모바일·플랫폼·외부 */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">
          업무 흐름 (플랫폼 중심)
        </h2>
        <svg viewBox="0 0 360 80" className="h-auto w-full max-w-md" aria-hidden>
          <defs>
            <marker id="pArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <path d="M0 0 L8 3 L0 6 z" fill="#64748b" />
            </marker>
          </defs>
          <rect x="10" y="10" width="70" height="60" rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="1" />
          <text x="18" y="42" fontSize="10" fill="#334155">모바일</text>
          <line x1="80" y1="40" x2="125" y2="40" stroke="#64748b" strokeWidth="1" markerEnd="url(#pArrow)" />
          <rect x="135" y="10" width="90" height="60" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
          <text x="145" y="35" fontSize="11" fontWeight="600" fill="#0f172a">플랫폼 핵심</text>
          <text x="145" y="50" fontSize="9" fill="#64748b">엔진 · DB · MOC · OCR</text>
          <line x1="225" y1="40" x2="270" y2="40" stroke="#64748b" strokeWidth="1" markerEnd="url(#pArrow)" />
          <rect x="280" y="10" width="70" height="60" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
          <text x="290" y="42" fontSize="10" fill="#64748b">외부</text>
        </svg>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">기능별 상세</h2>
        {PLATFORM_CORE_FUNCTIONS.map((fn, i) => (
          <FunctionSection key={fn} title={fn} defaultOpen={i === 0}>
            <WireframeMock title={`${fn} 구성 목업`}>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="h-5 w-2/3 rounded bg-gray-200" />
                <div className="grid grid-cols-2 gap-2">
                  <div className="h-12 rounded bg-gray-100" />
                  <div className="h-12 rounded bg-gray-100" />
                </div>
                <div className="h-8 w-full rounded bg-gray-100" />
              </div>
            </WireframeMock>
          </FunctionSection>
        ))}
      </div>
    </div>
  );
}
