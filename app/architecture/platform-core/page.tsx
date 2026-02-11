"use client";

import Link from "next/link";
import { ARCH_ROUTES, PLATFORM_CORE_FUNCTIONS } from "@/lib/architecture-config";
import { FunctionSection, WireframeMock } from "../components/FunctionSection";

function MiniDiagramPlatform() {
  const g = 36;
  const arrowLen = 80;
  const x1 = 20;
  const x2 = x1 + 70 + g + arrowLen + g;
  return (
    <svg viewBox={`0 0 ${x2 + 90} 80`} className="h-auto w-full max-w-md" aria-hidden>
      <defs>
        <marker id="pArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 z" fill="#64748b" />
        </marker>
      </defs>
      <rect x={x1} y="10" width="70" height="60" rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="1" />
      <text x={x1 + 8} y="42" fontSize="12" fill="#334155">모바일</text>
      <line x1={x1 + 70 + g} y1="40" x2={x1 + 70 + g + arrowLen} y2="40" stroke="#64748b" strokeWidth="1" markerEnd="url(#pArrow)" />
      <rect x={x1 + 70 + g + arrowLen / 2 - 42} y="23" width="84" height="16" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x={x1 + 70 + g + arrowLen / 2} y="35" textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">작업 결과 전송</text>
      <rect x={x2} y="10" width="90" height="60" rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
      <text x={x2 + 10} y="35" fontSize="12" fontWeight="600" fill="#0f172a">플랫폼 핵심</text>
      <text x={x2 + 10} y="50" fontSize="10" fill="#64748b">엔진 · DB · MOC · OCR</text>
    </svg>
  );
}

export default function ArchitecturePlatformCorePage() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h1 className="text-[18px] font-bold text-gray-900">플랫폼 핵심 영역</h1>
        <p className="mt-1 text-[14px] text-gray-500">
          위험성평가 엔진, 가변 위험요인 DB, MOC, Health-Lock, OCR, 알림 엔진
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={ARCH_ROUTES.index} className="rounded-lg bg-gray-100 px-3 py-1.5 text-[14px] font-medium text-gray-700 hover:bg-gray-200">
            ← 전체 흐름
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-[18px] font-semibold text-gray-900">업무 흐름 (플랫폼 중심)</h2>
        <MiniDiagramPlatform />
      </div>

      <div className="space-y-4">
        <h2 className="text-[18px] font-semibold text-gray-900">기능별 상세</h2>

        {PLATFORM_CORE_FUNCTIONS.map((fn, i) => (
          <FunctionSection key={fn} title={fn} defaultOpen={i === 0} miniDiagram={<MiniDiagramPlatform />}>
            <WireframeMock title={`${fn} 구성 목업`}>
              <div className="space-y-3 text-[14px]">
                <p className="font-semibold text-gray-900">{fn}</p>
                <div className="grid gap-2">
                  <div><span className="text-gray-500">입력</span> 작업/현장/날짜</div>
                  <div><span className="text-gray-500">처리</span> 규칙 엔진 · DB 조회 · 알림 발송</div>
                  <div><span className="text-gray-500">출력</span> 결과 · 이력 · 대시보드 연동</div>
                </div>
                <table className="w-full border-collapse text-[14px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-1 text-left font-medium">단계</th>
                      <th className="py-1 text-left font-medium">설명</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100"><td className="py-1">1</td><td>요청 수신</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-1">2</td><td>검증 및 처리</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-1">3</td><td>저장/알림</td></tr>
                  </tbody>
                </table>
                <button type="button" className="rounded bg-gray-800 px-3 py-1.5 text-[14px] text-white">실행</button>
              </div>
            </WireframeMock>
          </FunctionSection>
        ))}
      </div>
    </div>
  );
}
