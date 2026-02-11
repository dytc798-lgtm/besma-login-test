"use client";

import { useState } from "react";

interface FunctionSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function FunctionSection({
  title,
  description,
  children,
  defaultOpen = false,
}: FunctionSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left font-medium text-gray-900 hover:bg-gray-50"
      >
        <span>{title}</span>
        <span className="text-gray-400">{open ? "▲" : "▼"}</span>
      </button>
      {description && (
        <p className="border-t border-gray-100 px-4 py-2 text-sm text-gray-500">
          {description}
        </p>
      )}
      {open && <div className="border-t border-gray-100 p-4">{children}</div>}
    </section>
  );
}

/**
 * 와이어프레임 형태의 UI 목업 (스크린샷 없을 때)
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
      <div className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
        {title}
      </div>
      <div className="min-h-[120px] rounded border border-gray-200 bg-white p-3">
        {children}
      </div>
    </div>
  );
}
