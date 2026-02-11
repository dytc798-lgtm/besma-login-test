"use client";

import Link from "next/link";
import { ARCH_ROUTES } from "@/lib/architecture-config";
import { MOBILE_FEATURES } from "@/lib/architecture-features";
import { FunctionSection } from "../components/FunctionSection";

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

      <div className="space-y-4">
        <h2 className="text-[18px] font-semibold text-gray-900">
          기능별 상세
        </h2>
        {MOBILE_FEATURES.map((feature, index) => (
          <FunctionSection
            key={feature.id}
            feature={feature}
            defaultOpen={index === 0}
          />
        ))}
      </div>
    </div>
  );
}

