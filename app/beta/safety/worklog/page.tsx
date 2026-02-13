"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { SafetyWorklog } from "@/lib/beta-safety-worklog";

export default function BetaSafetyWorklogPage() {
  const [items, setItems] = useState<SafetyWorklog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/beta/safety/worklog", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/beta/safety" className="text-sm text-blue-600 hover:underline">
            ← 안전보건 영역
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">안전 작업일보</h1>
        <div className="mb-4 flex gap-2">
          <Link
            href="/beta/safety/worklog/new"
            className="inline-flex items-center rounded-md bg-safety-navy px-4 py-2 text-sm text-white hover:bg-safety-navy-light"
          >
            수기 입력
          </Link>
          <Link
            href="/beta/safety/worklog/import"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            엑셀 가져오기
          </Link>
        </div>

        {loading ? (
          <p className="text-gray-500">로딩 중...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">등록된 작업일보가 없습니다.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">현장</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">작업일자</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">팀/반</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">작업명</th>
                  <th className="px-4 py-2 text-left font-medium text-gray-700">출력</th>
                </tr>
              </thead>
              <tbody>
                {items.map((w) => (
                  <tr key={w.id} className="border-t border-gray-100">
                    <td className="px-4 py-2">{w.siteId}</td>
                    <td className="px-4 py-2">{w.workDate}</td>
                    <td className="px-4 py-2">{w.crew}</td>
                    <td className="px-4 py-2">{w.workName}</td>
                    <td className="px-4 py-2">
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                        {w.source}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
