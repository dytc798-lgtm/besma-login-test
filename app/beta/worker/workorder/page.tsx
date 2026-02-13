"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type WorkOrder = {
  id: string;
  worklogId: string;
  status: string;
  assigneeId: string | null;
  site: { id: string; name: string } | null;
};
type Worker = { id: string; name: string };

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "초안",
  ISSUED: "확인 대기",
  CONFIRMED: "확인완료",
  STARTED: "작업중",
  ENDED: "종료",
};

export default function BetaWorkerWorkorderPage() {
  const [items, setItems] = useState<WorkOrder[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [selectedWorkerId, setSelectedWorkerId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/beta/workers", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setWorkers(data.items ?? []))
      .catch(() => setWorkers([]));
  }, []);

  useEffect(() => {
    fetch("/api/beta/worker/workorder", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setItems(data.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [selectedWorkerId]);

  const setRoleWorker = async () => {
    if (!selectedWorkerId) return;
    const res = await fetch("/api/beta/set-role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ role: "WORKER", workerId: selectedWorkerId }),
    });
    if (res.ok) window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/beta" className="text-sm text-blue-600 hover:underline">
            ← 베타 홈
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">작업지시 (근로자)</h1>
        <p className="text-sm text-gray-500 mb-4">본인에게 배정된 작업만 서명할 수 있습니다. 아래에서 나를 선택한 뒤 목록을 확인하세요.</p>

        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-white p-3">
          <label className="text-sm font-medium text-gray-700">나 (근로자)</label>
          <select
            value={selectedWorkerId}
            onChange={(e) => setSelectedWorkerId(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">선택</option>
            {workers.map((w) => (
              <option key={w.id} value={w.id}>{w.name}</option>
            ))}
          </select>
          <Button size="sm" onClick={setRoleWorker} disabled={!selectedWorkerId}>설정</Button>
        </div>

        {loading ? (
          <p className="text-gray-500">로딩 중...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-500">배정된 작업지시가 없습니다.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((o) => (
              <li key={o.id} className="rounded-lg border border-gray-200 bg-white p-4 flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">작업지시 {o.worklogId}</span>
                  <span className="ml-2 text-sm text-gray-500">{o.site?.name}</span>
                  <span className="ml-2 rounded bg-gray-100 px-2 py-0.5 text-xs">{STATUS_LABEL[o.status] ?? o.status}</span>
                </div>
                <Link href={`/beta/worker/workorder/${o.id}`}>
                  <Button size="sm" variant="outline">상세</Button>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
