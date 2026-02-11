"use client";

import Link from "next/link";
import { ARCH_ROUTES } from "@/lib/architecture-config";
import {
  PLATFORM_CORE_FEATURES,
  EXTERNAL_FEATURES,
} from "@/lib/architecture-features";
import { FeatureDetail } from "../components/FeatureDetail";

export default function ArchitecturePlatformOverviewPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-[20px] font-bold text-gray-900">
          부현전기 안전보건 플랫폼 개요
        </h1>
        <p className="mt-2 text-[14px] text-gray-600">
          위험성평가 엔진, 가변 위험요인 DB, MOC(작업 변경 감지), Health-Lock,
          OCR 처리, 알림 엔진을 중심으로 현장/본사/외부 연동을 통합 관리합니다.
        </p>
        <p className="mt-1 text-[13px] text-gray-500">
          외부 연동: ERP, OCR 엔진, 알림톡, 기상청 API, 기타 GPS/계정 시스템과
         의 연계를 포함합니다.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={ARCH_ROUTES.index}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-[14px] text-gray-700 hover:bg-gray-200"
          >
            ← 전체 흐름도로 돌아가기
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {PLATFORM_CORE_FEATURES.map((feature) => (
          <section
            key={feature.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <FeatureDetail feature={feature} />
          </section>
        ))}

        {EXTERNAL_FEATURES.map((feature) => (
          <section
            key={feature.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <FeatureDetail feature={feature} />
          </section>
        ))}
      </div>
    </div>
  );
}

