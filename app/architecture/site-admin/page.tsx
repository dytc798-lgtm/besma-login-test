"use client";

import Link from "next/link";
import { ARCH_ROUTES, SITE_ADMIN_FUNCTIONS } from "@/lib/architecture-config";
import { FunctionSection, WireframeMock } from "../components/FunctionSection";
import {
  MINI_CANVAS_PADDING,
  MINI_BOX_TO_ARROW,
  MINI_LABEL_PAD,
  MINI_LABEL_ABOVE,
  MINI_ARROW_MIN_LENGTH,
  MiniDiagramWrapper,
} from "../components/MiniDiagramLayout";

function MiniDiagramSite() {
  const pad = MINI_CANVAS_PADDING;
  const box1W = 100;
  const box1H = 60;
  const x1 = pad;
  const arrowStart = x1 + box1W + MINI_BOX_TO_ARROW;
  const arrowEnd = arrowStart + MINI_ARROW_MIN_LENGTH;
  const x2 = arrowEnd + MINI_BOX_TO_ARROW;
  const box2W = 140;
  const centerY = pad + box1H / 2;
  const labelText = "현장 결과 공유";
  const labelW = labelText.length * 8 + MINI_LABEL_PAD * 2;
  const labelH = 12 + MINI_LABEL_PAD * 2;
  const viewWidth = x2 + box2W + pad;
  const viewHeight = pad + box1H + pad;
  return (
    <MiniDiagramWrapper viewWidth={viewWidth} viewHeight={viewHeight}>
      <defs>
        <marker id="sArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 z" fill="#64748b" />
        </marker>
      </defs>
      <rect x={x1} y={pad} width={box1W} height={box1H} rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
      <text x={x1 + 10} y={pad + box1H / 2 + 4} fontSize="12" fill="#334155">플랫폼</text>
      <line x1={arrowStart} y1={centerY} x2={arrowEnd} y2={centerY} stroke="#64748b" strokeWidth="1" markerEnd="url(#sArrow)" />
      <rect x={arrowStart + (arrowEnd - arrowStart) / 2 - labelW / 2} y={centerY - MINI_LABEL_ABOVE - labelH} width={labelW} height={labelH} rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x={arrowStart + (arrowEnd - arrowStart) / 2} y={centerY - MINI_LABEL_ABOVE - MINI_LABEL_PAD - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">{labelText}</text>
      <rect x={x2} y={pad} width={box2W} height={box1H} rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x={x2 + 10} y={pad + box1H / 2 + 4} fontSize="12" fontWeight="600" fill="#0f172a">현장 관리자 (웹)</text>
    </MiniDiagramWrapper>
  );
}

export default function ArchitectureSiteAdminPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h1 className="text-[18px] font-bold text-gray-900">현장 관리자 (웹)</h1>
        <p className="mt-1 text-[14px] text-gray-500">
          현장 현황 대시보드, 위험신고·시정조치, TBM·근로자·산안비·교육·건강정보 관리
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={ARCH_ROUTES.index} className="rounded-lg bg-gray-100 px-3 py-1.5 text-[14px] font-medium text-gray-700 hover:bg-gray-200">
            ← 전체 흐름
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm overflow-visible">
        <h2 className="mb-3 text-[18px] font-semibold text-gray-900">업무 흐름 (해당 영역)</h2>
        <div className="min-w-0">
          <MiniDiagramSite />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-[18px] font-semibold text-gray-900">기능별 상세</h2>

        {SITE_ADMIN_FUNCTIONS.map((fn, i) => (
          <FunctionSection key={fn} title={fn} defaultOpen={i === 0} miniDiagram={<MiniDiagramSite />}>
            <WireframeMock title={`${fn} 화면 목업`}>
              <div className="space-y-3 text-[14px]">
                <p className="font-semibold text-gray-900">{fn}</p>
                <div className="grid gap-2">
                  <div><span className="text-gray-500">검색/필터</span> 기간, 현장, 상태</div>
                  <table className="w-full border-collapse text-[14px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-1 text-left font-medium">항목</th>
                        <th className="py-1 text-left font-medium">상태</th>
                        <th className="py-1 text-left font-medium">작업</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-100"><td className="py-1">데이터 1</td><td>진행중</td><td><button type="button" className="text-gray-600 underline">상세</button></td></tr>
                      <tr className="border-b border-gray-100"><td className="py-1">데이터 2</td><td>완료</td><td><button type="button" className="text-gray-600 underline">상세</button></td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="rounded border border-gray-300 bg-white px-3 py-1.5 text-[14px]">취소</button>
                  <button type="button" className="rounded bg-gray-800 px-3 py-1.5 text-[14px] text-white">저장</button>
                </div>
              </div>
            </WireframeMock>
          </FunctionSection>
        ))}
      </div>
    </div>
  );
}
