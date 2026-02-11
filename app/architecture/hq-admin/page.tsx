"use client";

import Link from "next/link";
import { ARCH_ROUTES, HQ_ADMIN_FUNCTIONS } from "@/lib/architecture-config";
import { FunctionSection, WireframeMock } from "../components/FunctionSection";
import {
  MINI_CANVAS_PADDING,
  MINI_BOX_TO_ARROW,
  MINI_LABEL_PAD,
  MINI_LABEL_ABOVE,
  MINI_ARROW_MIN_LENGTH,
  MiniDiagramWrapper,
} from "../components/MiniDiagramLayout";

function MiniDiagramHq() {
  const pad = MINI_CANVAS_PADDING;
  const box1W = 80;
  const box1H = 60;
  const x1 = pad;
  const arrow1Start = x1 + box1W + MINI_BOX_TO_ARROW;
  const arrow1End = arrow1Start + MINI_ARROW_MIN_LENGTH;
  const x2 = arrow1End + MINI_BOX_TO_ARROW;
  const box2W = 100;
  const arrow2Len = 50;
  const arrow2Start = x2 + box2W + MINI_BOX_TO_ARROW;
  const arrow2End = arrow2Start + arrow2Len;
  const x3 = arrow2End + MINI_BOX_TO_ARROW;
  const box3W = 50;
  const centerY = pad + box1H / 2;
  const label1Text = "관리 현황 공유";
  const label2Text = "알림 발송";
  const labelW1 = label1Text.length * 8 + MINI_LABEL_PAD * 2;
  const labelW2 = label2Text.length * 8 + MINI_LABEL_PAD * 2;
  const labelH = 12 + MINI_LABEL_PAD * 2;
  const viewWidth = x3 + box3W + pad;
  const viewHeight = pad + box1H + pad;
  return (
    <MiniDiagramWrapper viewWidth={viewWidth} viewHeight={viewHeight}>
      <defs>
        <marker id="hArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 z" fill="#64748b" />
        </marker>
      </defs>
      <rect x={x1} y={pad} width={box1W} height={box1H} rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
      <text x={x1 + 10} y={pad + box1H / 2 + 4} fontSize="12" fill="#334155">플랫폼</text>
      <line x1={arrow1Start} y1={centerY} x2={arrow1End} y2={centerY} stroke="#64748b" strokeWidth="1" markerEnd="url(#hArrow)" />
      <rect x={arrow1Start + (arrow1End - arrow1Start) / 2 - labelW1 / 2} y={centerY - MINI_LABEL_ABOVE - labelH} width={labelW1} height={labelH} rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x={arrow1Start + (arrow1End - arrow1Start) / 2} y={centerY - MINI_LABEL_ABOVE - MINI_LABEL_PAD - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">{label1Text}</text>
      <rect x={x2} y={pad} width={box2W} height={box1H} rx="8" fill="#f1f5f9" stroke="#475569" strokeWidth="1.5" />
      <text x={x2 + 10} y={pad + box1H / 2 + 4} fontSize="12" fontWeight="600" fill="#0f172a">본사 관리자</text>
      <line x1={arrow2Start} y1={centerY} x2={arrow2End} y2={centerY} stroke="#64748b" strokeWidth="1" markerEnd="url(#hArrow)" />
      <rect x={arrow2Start + arrow2Len / 2 - labelW2 / 2} y={centerY - MINI_LABEL_ABOVE - labelH} width={labelW2} height={labelH} rx="6" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x={arrow2Start + arrow2Len / 2} y={centerY - MINI_LABEL_ABOVE - MINI_LABEL_PAD - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">{label2Text}</text>
      <rect x={x3} y={pad} width={box3W} height={box1H} rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
      <text x={x3 + 10} y={pad + box1H / 2 + 4} fontSize="10" fill="#64748b">외부</text>
    </MiniDiagramWrapper>
  );
}

export default function ArchitectureHqAdminPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h1 className="text-[18px] font-bold text-gray-900">본사 관리자 (웹)</h1>
        <p className="mt-1 text-[14px] text-gray-500">
          표준 위험성평가 DB, 사고사례·KPI, 통합 관제, ERP 연동, 결재함
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
          <MiniDiagramHq />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-[18px] font-semibold text-gray-900">기능별 상세</h2>

        {HQ_ADMIN_FUNCTIONS.map((fn, i) => (
          <FunctionSection key={fn} title={fn} defaultOpen={i === 0} miniDiagram={<MiniDiagramHq />}>
            <WireframeMock title={`${fn} 화면 목업`}>
              <div className="space-y-3 text-[14px]">
                <p className="font-semibold text-gray-900">{fn}</p>
                <div className="grid gap-2">
                  <div><span className="text-gray-500">조건</span> 기간, 사업장, 키워드</div>
                  <div className="rounded border border-gray-200 p-2">목록/차트 영역</div>
                </div>
                <table className="w-full border-collapse text-[14px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-1 text-left font-medium">이름</th>
                      <th className="py-1 text-left font-medium">상태</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100"><td className="py-1">항목 A</td><td>승인대기</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-1">항목 B</td><td>완료</td></tr>
                  </tbody>
                </table>
                <div className="flex gap-2">
                  <button type="button" className="rounded border border-gray-300 bg-white px-3 py-1.5 text-[14px]">닫기</button>
                  <button type="button" className="rounded bg-gray-800 px-3 py-1.5 text-[14px] text-white">결재</button>
                </div>
              </div>
            </WireframeMock>
          </FunctionSection>
        ))}
      </div>
    </div>
  );
}
