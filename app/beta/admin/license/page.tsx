"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  PACKAGE_TIERS,
  PACKAGE_TIER_LABEL,
  type PackageTier,
} from "@/lib/beta-license";

export default function BetaAdminLicensePage() {
  const [tier, setTier] = useState<PackageTier | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selected, setSelected] = useState<PackageTier | null>(null);
  const [message, setMessage] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/beta/license/get", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const t = (data.package_tier as PackageTier) ?? "BUNDLE";
        setTier(t);
        setSelected(t);
      })
      .catch(() => {
        if (!cancelled) setTier("BUNDLE");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async () => {
    if (selected == null) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/beta/license/set", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ package_tier: selected }),
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setTier(selected);
        setMessage({ type: "ok", text: "저장되었습니다. 메뉴/라우트 접근에 즉시 반영됩니다." });
      } else {
        setMessage({ type: "error", text: data?.error || "저장 실패" });
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-lg mx-auto">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <Link
            href="/beta"
            className="text-sm text-blue-600 hover:underline"
          >
            ← 베타 홈
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">제품 패키지 라이선스</h1>
        <p className="text-gray-600 text-sm mb-6">
          tenant 1개 기준. 변경 시 즉시 /beta 메뉴·라우트 접근에 반영됩니다.
        </p>

        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
          <p className="text-sm font-medium text-gray-700">현재 패키지</p>
          <p className="text-lg font-semibold text-gray-900">
            {tier ? PACKAGE_TIER_LABEL[tier] : "-"}
          </p>

          <p className="text-sm font-medium text-gray-700 mt-4">패키지 변경</p>
          <div className="space-y-2">
            {PACKAGE_TIERS.map((t) => (
              <label
                key={t}
                className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="tier"
                  checked={selected === t}
                  onChange={() => setSelected(t)}
                  className="w-4 h-4"
                />
                <span>{PACKAGE_TIER_LABEL[t]}</span>
              </label>
            ))}
          </div>

          {message && (
            <p
              className={`text-sm ${
                message.type === "ok" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}

          <Button
            className="w-full mt-4 bg-safety-navy hover:bg-safety-navy-light"
            disabled={saving || selected === tier}
            onClick={handleSave}
          >
            {saving ? "저장 중..." : "저장 후 적용"}
          </Button>
        </div>
      </div>
    </div>
  );
}
