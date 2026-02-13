"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BetaSafetyWorklogNewPage() {
  const router = useRouter();
  const [siteId, setSiteId] = useState("");
  const [workDate, setWorkDate] = useState("");
  const [crew, setCrew] = useState("");
  const [workName, setWorkName] = useState("");
  const [description, setDescription] = useState("");
  const [hazard, setHazard] = useState("");
  const [measure, setMeasure] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!siteId.trim() || !workDate.trim()) {
      setError("현장, 작업일자를 입력하세요.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/beta/safety/worklog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          siteId: siteId.trim(),
          workDate: workDate.trim(),
          crew: crew.trim(),
          workName: workName.trim(),
          description: description.trim(),
          hazard: hazard.trim(),
          measure: measure.trim(),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "저장 실패");
        return;
      }
      router.push("/beta/safety/worklog");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <Link href="/beta/safety/worklog" className="text-sm text-blue-600 hover:underline">
            ← 목록
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">작업일보 수기 입력</h1>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">현장 *</label>
            <input
              type="text"
              value={siteId}
              onChange={(e) => setSiteId(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="예: A현장"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">작업일자 *</label>
            <input
              type="date"
              value={workDate}
              onChange={(e) => setWorkDate(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">팀/반</label>
            <input
              type="text"
              value={crew}
              onChange={(e) => setCrew(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="예: 1반"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">작업명/공종</label>
            <input
              type="text"
              value={workName}
              onChange={(e) => setWorkName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="예: 트레이 설치"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">작업내용</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="작업 내용"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">위험요인</label>
            <input
              type="text"
              value={hazard}
              onChange={(e) => setHazard(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="예: 감전, 낙하"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">대책</label>
            <input
              type="text"
              value={measure}
              onChange={(e) => setMeasure(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              placeholder="예: 절연장갑 착용"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit" disabled={saving} className="bg-safety-navy hover:bg-safety-navy-light">
              {saving ? "저장 중..." : "저장"}
            </Button>
            <Link href="/beta/safety/worklog">
              <Button type="button" variant="outline">취소</Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
