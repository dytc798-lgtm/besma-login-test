"use client";

import Link from "next/link";
import {
  ARCH_ROUTES,
  SITE_ADMIN_FUNCTIONS,
} from "@/lib/architecture-config";
import { FunctionSection, WireframeMock } from "../components/FunctionSection";

export default function ArchitectureSiteAdminPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">
          현장 관리자 (웹)
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          현장 현황 대시보드, 위험신고·시정조치, TBM·근로자·산안비·교육·건강정보 관리
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

      {/* 미니 구성도: 플랫폼 → 현장 관리자 */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">
          업무 흐름 (해당 영역)
        </h2>
        <svg viewBox="0 0 340 100" className="h-auto w-full max-w-md" aria-hidden>
          <defs>
            <marker id="sArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <path d="M0 0 L8 3 L0 6 z" fill="#64748b" />
            </marker>
          </defs>
          <rect x="20" y="10" width="100" height="80" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
          <text x="30" y="45" fontSize="11" fill="#334155">플랫폼</text>
          <line x1="120" y1="50" x2="170" y2="50" stroke="#64748b" strokeWidth="1" markerEnd="url(#sArrow)" />
          <text x="145" y="42" textAnchor="middle" fontSize="10" fill="#475569">현장 결과 공유</text>
          <rect x="180" y="10" width="140" height="80" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
          <text x="190" y="35" fontSize="12" fontWeight="600" fill="#0f172a">현장 관리자 (웹)</text>
          <text x="190" y="55" fontSize="10" fill="#64748b">대시보드 · 시정조치 · TBM · 근로자</text>
        </svg>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">기능별 상세</h2>
        {SITE_ADMIN_FUNCTIONS.map((fn, i) => (
          <FunctionSection key={fn} title={fn} defaultOpen={i === 0}>
            <WireframeMock title={`${fn} 화면 목업`}>
              <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
                <div className="h-8 rounded bg-gray-200" />
                <div className="h-8 rounded bg-gray-200" />
                <div className="h-8 rounded bg-gray-200" />
                <div className="col-span-3 h-24 rounded bg-gray-100" />
                <div className="col-span-2 h-16 rounded bg-gray-100" />
                <div className="h-16 rounded bg-gray-100" />
              </div>
            </WireframeMock>
          </FunctionSection>
        ))}
      </div>
    </div>
  );
}
