"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PACKAGE_TIER_LABEL, type PackageTier } from "@/lib/beta-license";

export default function BetaPage() {
  const [tier, setTier] = useState<PackageTier | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/beta/license/get", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setTier((data.package_tier as PackageTier) ?? "BUNDLE");
      })
      .catch(() => {
        if (!cancelled) setTier("BUNDLE");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const showErp = tier === "ERP_ONLY" || tier === "BUNDLE";
  const showSafety = tier === "SAFETY_ONLY" || tier === "BUNDLE";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">BESMA 베타</h1>
        <p className="text-gray-600 mb-4">
          내부 개발/검수용 베타 영역입니다.
        </p>
        {tier && (
          <p className="text-sm text-gray-500 mb-6">
            현재 패키지: <span className="font-medium text-gray-700">{PACKAGE_TIER_LABEL[tier]}</span>
          </p>
        )}

        <div className="space-y-3 mb-8">
          {showErp && (
            <div>
              <Link href="/beta/erp" className="text-blue-600 hover:underline font-medium">
                ERP 영역 →
              </Link>
            </div>
          )}
          {showSafety && (
            <>
              <div>
                <Link href="/beta/safety" className="text-blue-600 hover:underline font-medium">
                  안전보건 영역 →
                </Link>
              </div>
              <div>
                <Link href="/beta/site/workorder" className="text-blue-600 hover:underline font-medium">
                  현장관리자 · 작업지시 →
                </Link>
              </div>
              <div>
                <Link href="/beta/worker/workorder" className="text-blue-600 hover:underline font-medium">
                  근로자 · 작업지시 →
                </Link>
              </div>
            </>
          )}
          <div>
            <Link href="/beta/admin/license" className="text-blue-600 hover:underline font-medium">
              제품 패키지 라이선스 설정 →
            </Link>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-2">기타 참고 링크</p>
        <ul className="space-y-2">
          <li>
            <Link href="/architecture" className="text-blue-600 hover:underline">
              시스템 구성도 / IA
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-blue-600 hover:underline">
              대시보드
            </Link>
          </li>
          <li>
            <Link href="/admin/logic-map" className="text-blue-600 hover:underline">
              시스템 로직 맵
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
