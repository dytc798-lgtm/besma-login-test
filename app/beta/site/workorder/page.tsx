"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Site = { id: string; name: string };
type Worker = { id: string; name: string; siteId: string | null };
type Worklog = { id: string; siteId: string; workDate: string; workName: string; crew: string };
type WorkOrder = {
  id: string;
  worklogId: string;
  status: string;
  assigneeId: string | null;
  assignee: Worker | null;
  site: Site | null;
};

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "초안",
  ISSUED: "배포됨",
  CONFIRMED: "확인서명완료",
  STARTED: "작업중",
  ENDED: "종료",
};

export default function BetaSiteWorkorderPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [worklogs, setWorklogs] = useState<Worklog[]>([]);
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [siteId, setSiteId] = useState("");
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [form, setForm] = useState({ worklogId: "", assigneeId: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/beta/site/sites", { credentials: "include" }).then((r) => r.json()),
      fetch("/api/beta/safety/worklog", { credentials: "include" }).then((r) => r.json()),
    ])
      .then(([sitesRes, worklogRes]) => {
        setSites(sitesRes.items ?? []);
        setWorklogs(worklogRes.items ?? []);
        if ((sitesRes.items?.length ?? 0) > 0 && !siteId) setSiteId(sitesRes.items[0].id);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!siteId) {
      setWorkers([]);
      setOrders([]);
      return;
    }
    setLoading(true);
    Promise.all([
      fetch(`/api/beta/site/workers?siteId=${encodeURIComponent(siteId)}`, { credentials: "include" }).then((r) => r.json()),
      fetch(`/api/beta/site/workorder?siteId=${encodeURIComponent(siteId)}`, { credentials: "include" }).then((r) => r.json()),
    ])
      .then(([wRes, oRes]) => {
        setWorkers(wRes.items ?? []);
        setOrders(oRes.items ?? []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [siteId]);

  const handleCreate = async () => {
    if (!siteId || !form.worklogId) {
      setError("작업일보를 선택하세요.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/beta/site/workorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          siteId,
          worklogId: form.worklogId,
          assigneeId: form.assigneeId || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "생성 실패");
        return;
      }
      setCreateOpen(false);
      setForm({ worklogId: "", assigneeId: "" });
      setOrders((prev) => [data, ...prev]);
    } finally {
      setSubmitting(false);
    }
  };

  const handleIssue = async (orderId: string) => {
    try {
      const res = await fetch(`/api/beta/site/workorder/${orderId}/issue`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error);
      setOrders((prev) => prev.map((o) => (o.id === orderId ? data : o)));
    } catch (e) {
      alert(e instanceof Error ? e.message : "배포 실패");
    }
  };

  if (loading && sites.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/beta" className="text-sm text-blue-600 hover:underline">
            ← 베타 홈
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">작업지시 (현장관리자)</h1>
        <p className="text-sm text-gray-500 mb-4">SITE_ADMIN만 생성/배포 가능합니다. 아래에서 현장관리자로 설정한 뒤 이용하세요.</p>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await fetch("/api/beta/set-role", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ role: "SITE_ADMIN" }),
              });
              window.location.reload();
            }}
          >
            현장관리자로 설정
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={async () => {
              await fetch("/api/beta/seed/worklog", { credentials: "include" });
              const r = await fetch("/api/beta/safety/worklog", { credentials: "include" });
              const d = await r.json();
              setWorklogs(d.items ?? []);
              alert("작업일보 샘플 3건을 불러왔습니다.");
            }}
          >
            작업일보 샘플 3건 불러오기
          </Button>
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <label className="text-sm font-medium text-gray-700">현장</label>
          <select
            value={siteId}
            onChange={(e) => setSiteId(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">선택</option>
            {sites.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <Button onClick={() => setCreateOpen(true)} className="bg-safety-navy hover:bg-safety-navy-light">
            작업지시 생성
          </Button>
        </div>

        {createOpen && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="font-medium text-gray-900 mb-2">작업일보 기반 작업지시 생성</h3>
            <div className="space-y-2 mb-3">
              <div>
                <label className="block text-sm text-gray-600">작업일보 *</label>
                <select
                  value={form.worklogId}
                  onChange={(e) => setForm((f) => ({ ...f, worklogId: e.target.value }))}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="">선택</option>
                  {worklogs.filter((w) => w.siteId === siteId).map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.workDate} {w.workName} {w.crew}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-600">배정 근로자</label>
                <select
                  value={form.assigneeId}
                  onChange={(e) => setForm((f) => ({ ...f, assigneeId: e.target.value }))}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="">미배정</option>
                  {workers.map((w) => (
                    <option key={w.id} value={w.id}>{w.name}</option>
                  ))}
                </select>
              </div>
            </div>
            {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
            <div className="flex gap-2">
              <Button onClick={handleCreate} disabled={submitting} className="bg-safety-navy hover:bg-safety-navy-light">
                {submitting ? "생성 중..." : "생성"}
              </Button>
              <Button variant="outline" onClick={() => { setCreateOpen(false); setError(""); }}>취소</Button>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-700">작업일보</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">배정</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">상태</th>
                <th className="px-4 py-2 text-left font-medium text-gray-700">동작</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-6 text-center text-gray-500">작업지시가 없습니다.</td></tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id} className="border-t border-gray-100">
                    <td className="px-4 py-2">{o.worklogId}</td>
                    <td className="px-4 py-2">{o.assignee?.name ?? "—"}</td>
                    <td className="px-4 py-2">
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-xs">{STATUS_LABEL[o.status] ?? o.status}</span>
                    </td>
                    <td className="px-4 py-2">
                      {o.status === "DRAFT" && (
                        <Button size="sm" onClick={() => handleIssue(o.id)} className="bg-safety-navy hover:bg-safety-navy-light">
                          배포
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
