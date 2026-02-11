"use client";

import Link from "next/link";
import {
  ARCH_ROUTES,
  HQ_ADMIN_FUNCTIONS,
} from "@/lib/architecture-config";
import { FunctionSection, WireframeMock } from "../components/FunctionSection";

export default function ArchitectureHqAdminPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900">
          본사 관리자 (웹)
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          표준 위험성평가 DB, 사고사례·KPI, 통합 관제, ERP 연동, 결재함
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

      {/* 미니 구성도: 플랫폼 → 본사 → 외부 */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">
          업무 흐름 (해당 영역)
        </h2>
        <svg viewBox="0 0 380 90" className="h-auto w-full max-w-lg" aria-hidden>
          <defs>
            <marker id="hArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <path d="M0 0 L8 3 L0 6 z" fill="#64748b" />
            </marker>
          </defs>
          <rect x="10" y="15" width="80" height="60" rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
          <text x="20" y="48" fontSize="10" fill="#334155">플랫폼</text>
          <line x1="90" y1="45" x2="140" y2="45" stroke="#64748b" strokeWidth="1" markerEnd="url(#hArrow)" />
          <text x="115" y="37" textAnchor="middle" fontSize="10" fill="#475569">관리 현황 공유</text>
          <rect x="150" y="15" width="120" height="60" rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
          <text x="160" y="38" fontSize="11" fontWeight="600" fill="#0f172a">본사 관리자 (웹)</text>
          <line x1="270" y1="45" x2="320" y2="45" stroke="#64748b" strokeWidth="1" markerEnd="url(#hArrow)" />
          <text x="295" y="37" textAnchor="middle" fontSize="10" fill="#475569">알림 발송</text>
          <rect x="330" y="15" width="40" height="60" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
          <text x="335" y="48" fontSize="9" fill="#64748b">외부</text>
        </svg>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">기능별 상세</h2>
        {HQ_ADMIN_FUNCTIONS.map((fn, i) => (
          <FunctionSection key={fn} title={fn} defaultOpen={i === 0}>
            <WireframeMock title={`${fn} 화면 목업`}>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex gap-2">
                  <div className="h-7 w-24 rounded bg-gray-200" />
                  <div className="h-7 w-32 rounded bg-gray-200" />
                </div>
                <div className="h-32 w-full rounded bg-gray-100" />
                <div className="flex gap-2">
                  <div className="h-10 flex-1 rounded bg-gray-100" />
                  <div className="h-10 w-20 rounded bg-gray-200" />
                </div>
              </div>
            </WireframeMock>
          </FunctionSection>
        ))}
      </div>
    </div>
  );
}
