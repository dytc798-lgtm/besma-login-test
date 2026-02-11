"use client";

import { useState } from "react";
import type { Feature } from "@/lib/architecture-features";
import { FeatureDetail } from "./FeatureDetail";

interface FunctionSectionProps {
  feature: Feature;
  defaultOpen?: boolean;
}

export function FunctionSection({
  feature,
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
        <span className="text-[18px] font-semibold text-gray-900">
          {feature.title}
        </span>
        <span className="text-gray-400" aria-hidden>
          {open ? "▲" : "▼"}
        </span>
      </button>
      {feature.description && (
        <p className="border-t border-gray-100 px-4 py-2 text-sm text-gray-500">
          {feature.description}
        </p>
      )}
      {open && (
        <div className="border-t border-gray-100 p-4">
          <FeatureDetail key={feature.id} feature={feature} />
        </div>
      )}
    </section>
  );
}

