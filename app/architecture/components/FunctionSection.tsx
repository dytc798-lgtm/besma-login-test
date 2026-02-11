"use client";

import { useState } from "react";

interface FunctionSectionProps {
  title: string;
  description?: string;
  miniDiagram?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function FunctionSection({
  title,
  description,
  miniDiagram,
  children,
  defaultOpen = false,
}: FunctionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
      >
        <span className="text-[18px] font-semibold text-gray-900">{title}</span>
        <span className="text-gray-400" aria-hidden>{open ? "▲" : "▼"}</span>
      </button>
      {description && (
        <p className="border-t border-gray-100 px-4 py-2 text-sm text-gray-500">
          {description}
        </p>
      )}
      {open && (
        <div className="border-t border-gray-100 space-y-4 p-4">
          {miniDiagram && (
            <div className="rounded-lg border border-gray-200 bg-gray-50/50 p-3">
              <p className="mb-2 text-[14px] font-medium text-gray-700">세부 프로세스</p>
              {miniDiagram}
            </div>
          )}
          <div>
            <p className="mb-2 text-[14px] font-medium text-gray-700">화면 와이어프레임</p>
            {children}
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * 와이어프레임 형태의 UI 목업 - 실제 라벨·버튼 텍스트 포함, 최소 14px
 */
export function WireframeMock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50/80 p-4">
      <div className="mb-3 text-[18px] font-semibold text-gray-800">
        {title}
      </div>
      <div className="min-h-[140px] rounded border border-gray-200 bg-white p-4 text-[14px] text-gray-700">
        {children}
      </div>
    </div>
  );
}
