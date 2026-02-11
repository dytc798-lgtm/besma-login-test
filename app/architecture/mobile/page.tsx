"use client";

import Link from "next/link";
import { ARCH_ROUTES, MOBILE_FUNCTIONS } from "@/lib/architecture-config";
import { FunctionSection, WireframeMock } from "../components/FunctionSection";

const MINI_GAP = 40;
const MINI_ARROW_LEN = 120;

function MiniDiagramMobile() {
  const boxW = 140;
  const boxH = 64;
  const arrowStart = 20 + boxW + MINI_GAP;
  const arrowEnd = arrowStart + MINI_ARROW_LEN;
  const platformX = arrowEnd + MINI_GAP;
  const centerY = 20 + boxH / 2;
  return (
    <svg viewBox="0 0 420 100" className="h-auto w-full max-w-md" aria-hidden>
      <defs>
        <marker id="mArrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <path d="M0 0 L8 3 L0 6 z" fill="#64748b" />
        </marker>
      </defs>
      <rect x="20" y="20" width={boxW} height={boxH} rx="8" fill="#eef2ff" stroke="#6366f1" strokeWidth="1" />
      <text x="28" y="52" fontSize="12" fontWeight="600" fill="#1e1b4b">현장 근로자 (모바일)</text>
      <line x1={arrowStart} y1={centerY} x2={arrowEnd} y2={centerY} stroke="#64748b" strokeWidth="1" markerEnd="url(#mArrow)" />
      <rect x={arrowStart + (arrowEnd - arrowStart) / 2 - 42} y={centerY - 18} width="84" height="20" rx="4" fill="white" stroke="#e2e8f0" strokeWidth="1" />
      <text x={arrowStart + (arrowEnd - arrowStart) / 2} y={centerY - 5} textAnchor="middle" fontSize="11" fontWeight="700" fill="#334155">작업 결과 전송</text>
      <rect x={platformX} y="20" width="80" height={boxH} rx="8" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1" />
      <text x={platformX + 10} y="52" fontSize="11" fill="#334155">플랫폼</text>
    </svg>
  );
}

export default function ArchitectureMobilePage() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h1 className="text-[18px] font-bold text-gray-900">
          현장 근로자 (모바일 앱)
        </h1>
        <p className="mt-1 text-[14px] text-gray-500">
          작업지시 확인, 위험성평가·TBM 서명, 위험 신고, 작업중지권, MSDS 조회 등
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={ARCH_ROUTES.index}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-[14px] font-medium text-gray-700 hover:bg-gray-200"
          >
            ← 전체 흐름
          </Link>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-[18px] font-semibold text-gray-900">
          업무 흐름 (해당 영역)
        </h2>
        <MiniDiagramMobile />
      </div>

      <div className="space-y-4">
        <h2 className="text-[18px] font-semibold text-gray-900">기능별 상세</h2>

        <FunctionSection
          title="작업지시 확인"
          defaultOpen={true}
          miniDiagram={<MiniDiagramMobile />}
        >
          <WireframeMock title="작업지시 상세">
            <div className="space-y-3 text-[14px]">
              <p className="font-semibold text-gray-900">작업지시 상세</p>
              <div className="grid gap-2">
                <div><span className="text-gray-500">작업명</span> 전기설비 점검</div>
                <div><span className="text-gray-500">작업일자</span> 2025-02-11</div>
                <div><span className="text-gray-500">작업장소</span> A동 1층 변전실</div>
                <div><span className="text-gray-500">위험요인 요약</span> 감전, 낙하</div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" className="rounded border border-gray-300 bg-white px-3 py-1.5 text-[14px]">확인</button>
                <button type="button" className="rounded bg-gray-800 px-3 py-1.5 text-[14px] text-white">TBM 시작</button>
              </div>
            </div>
          </WireframeMock>
        </FunctionSection>

        <FunctionSection
          title="위험성평가 작성"
          miniDiagram={<MiniDiagramMobile />}
        >
          <WireframeMock title="위험성평가 작성">
            <div className="space-y-3 text-[14px]">
              <div>
                <label className="block text-gray-500">작업 선택</label>
                <div className="mt-1 rounded border border-gray-300 bg-gray-50 px-2 py-1.5">전기설비 점검 ▼</div>
              </div>
              <div>
                <label className="block text-gray-500">위험요인 자동 추천</label>
                <ul className="mt-1 list-inside list-disc text-gray-700">감전, 낙하, 협착</ul>
              </div>
              <div>
                <label className="block text-gray-500">위험도</label>
                <div className="mt-1 flex gap-2">[상] [중] [하]</div>
              </div>
              <div>
                <label className="block text-gray-500">대책 입력</label>
                <div className="mt-1 rounded border border-gray-300 bg-white p-2 min-h-[60px]">안전장비 착용, 작업전 LOTO</div>
              </div>
              <button type="button" className="rounded bg-gray-800 px-3 py-1.5 text-[14px] text-white">저장</button>
            </div>
          </WireframeMock>
        </FunctionSection>

        <FunctionSection
          title="TBM 서명"
          miniDiagram={<MiniDiagramMobile />}
        >
          <WireframeMock title="TBM 참석 및 서명">
            <div className="space-y-3 text-[14px]">
              <p className="font-semibold text-gray-900">참석자 목록</p>
              <ul className="list-inside list-disc text-gray-700">김○○, 이○○, 박○○</ul>
              <div>
                <label className="block text-gray-500">서명 영역</label>
                <div className="mt-1 rounded border-2 border-dashed border-gray-300 bg-gray-50 p-4 text-center text-gray-400">서명란</div>
              </div>
              <button type="button" className="rounded bg-gray-800 px-3 py-1.5 text-[14px] text-white">완료</button>
            </div>
          </WireframeMock>
        </FunctionSection>

        <FunctionSection
          title="위험 신고 (사진/음성/텍스트)"
          miniDiagram={<MiniDiagramMobile />}
        >
          <WireframeMock title="위험 신고">
            <div className="space-y-3 text-[14px]">
              <div>
                <label className="block text-gray-500">신고 유형</label>
                <div className="mt-1 rounded border border-gray-300 bg-gray-50 px-2 py-1.5">위험요인 발견</div>
              </div>
              <div>
                <label className="block text-gray-500">내용</label>
                <div className="mt-1 rounded border border-gray-300 bg-white p-2 min-h-[50px]">설명 입력</div>
              </div>
              <div>
                <label className="block text-gray-500">첨부</label>
                <p className="mt-1 text-gray-600">사진 · 음성 · 텍스트 첨부 가능</p>
              </div>
              <button type="button" className="rounded bg-gray-800 px-3 py-1.5 text-[14px] text-white">제출</button>
            </div>
          </WireframeMock>
        </FunctionSection>

        <FunctionSection
          title="작업중지권 발동"
          miniDiagram={<MiniDiagramMobile />}
        >
          <WireframeMock title="작업중지권 발동">
            <div className="space-y-3 text-[14px]">
              <div>
                <label className="block text-gray-500">사유</label>
                <div className="mt-1 rounded border border-gray-300 bg-white p-2 min-h-[50px]">발동 사유 입력</div>
              </div>
              <p className="text-gray-600">위험 시 작업중지권을 발동할 수 있습니다.</p>
              <button type="button" className="rounded bg-red-600 px-3 py-1.5 text-[14px] text-white">작업중지권 발동</button>
            </div>
          </WireframeMock>
        </FunctionSection>

        <FunctionSection
          title="MSDS 조회"
          miniDiagram={<MiniDiagramMobile />}
        >
          <WireframeMock title="MSDS 열람">
            <div className="space-y-3 text-[14px]">
              <div>
                <label className="block text-gray-500">검색</label>
                <div className="mt-1 rounded border border-gray-300 bg-white px-2 py-1.5">물질명 또는 CAS No.</div>
              </div>
              <p className="font-semibold text-gray-900">검색 결과</p>
              <table className="w-full border-collapse text-[14px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-1 text-left font-medium">물질명</th>
                    <th className="py-1 text-left font-medium">CAS No.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100"><td className="py-1">에틸알코올</td><td>64-17-5</td></tr>
                  <tr className="border-b border-gray-100"><td className="py-1">아세톤</td><td>67-64-1</td></tr>
                </tbody>
              </table>
              <button type="button" className="rounded border border-gray-300 bg-white px-3 py-1.5 text-[14px]">상세 보기</button>
            </div>
          </WireframeMock>
        </FunctionSection>
      </div>
    </div>
  );
}
