"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const SignaturePad = dynamic(() => import("@/components/SignaturePad"), { ssr: false });

type WorkOrder = {
  id: string;
  worklogId: string;
  status: string;
  assigneeId: string | null;
  confirmSignedAt: string | null;
  startedAt: string | null;
  endSignedAt: string | null;
  endPhotoUrl: string | null;
  assignee: { id: string; name: string } | null;
  site: { id: string; name: string } | null;
};
type Worklog = {
  id: string;
  workDate: string;
  workName: string;
  crew: string;
  description: string;
  hazard: string;
  measure: string;
} | null;

const STATUS_LABEL: Record<string, string> = {
  DRAFT: "초안",
  ISSUED: "확인 대기",
  CONFIRMED: "확인완료",
  STARTED: "작업중",
  ENDED: "종료",
};

export default function BetaWorkerWorkorderDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [order, setOrder] = useState<WorkOrder | null>(null);
  const [worklog, setWorklog] = useState<Worklog>(null);
  const [loading, setLoading] = useState(true);
  const [signMode, setSignMode] = useState<"confirm" | "end" | null>(null);
  const [endPhoto, setEndPhoto] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/beta/worker/workorder/${id}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        setOrder(data.order);
        setWorklog(data.worklog);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const handleConfirmSignature = async (signatureData: string) => {
    setSignMode(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/beta/worker/workorder/${id}/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ signatureData }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error);
      setOrder(data);
    } catch (e) {
      alert(e instanceof Error ? e.message : "확인 서명 실패");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStart = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/beta/worker/workorder/${id}/start`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error);
      setOrder(data);
    } catch (e) {
      alert(e instanceof Error ? e.message : "시작 실패");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEndSignature = async (signatureData: string) => {
    setSignMode(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/beta/worker/workorder/${id}/end`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ signatureData, photoUrl: endPhoto ?? undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error);
      setOrder(data);
      setEndPhoto(null);
    } catch (e) {
      alert(e instanceof Error ? e.message : "종료 서명 실패");
    } finally {
      setSubmitting(false);
    }
  };

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setEndPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  if (loading || !order) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <p className="text-gray-500">{loading ? "로딩 중..." : "없는 작업입니다."}</p>
        <Link href="/beta/worker/workorder" className="text-sm text-blue-600 hover:underline mt-2 inline-block">← 목록</Link>
      </div>
    );
  }

  const workerName = order.assignee?.name ?? "근로자";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <Link href="/beta/worker/workorder" className="text-sm text-blue-600 hover:underline">
            ← 목록
          </Link>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">작업지시 상세</h1>
        <div className="rounded-lg border border-gray-200 bg-white p-4 mb-4">
          <p className="text-sm text-gray-500">상태</p>
          <p className="font-medium text-gray-900">{STATUS_LABEL[order.status] ?? order.status}</p>
          {worklog && (
            <>
              <p className="text-sm text-gray-500 mt-2">작업일자</p>
              <p>{worklog.workDate}</p>
              <p className="text-sm text-gray-500 mt-2">작업명/공종</p>
              <p>{worklog.workName}</p>
              <p className="text-sm text-gray-500 mt-2">팀/반</p>
              <p>{worklog.crew}</p>
              <p className="text-sm text-gray-500 mt-2">작업내용</p>
              <p className="text-sm">{worklog.description || "—"}</p>
              <p className="text-sm text-gray-500 mt-2">위험요인 / 대책</p>
              <p className="text-sm">{worklog.hazard || "—"} / {worklog.measure || "—"}</p>
            </>
          )}
        </div>

        <div className="space-y-2">
          {order.status === "ISSUED" && (
            <Button
              onClick={() => setSignMode("confirm")}
              disabled={submitting}
              className="w-full bg-safety-navy hover:bg-safety-navy-light"
            >
              확인 서명
            </Button>
          )}
          {order.status === "CONFIRMED" && (
            <Button
              onClick={handleStart}
              disabled={submitting}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              작업 시작
            </Button>
          )}
          {order.status === "STARTED" && (
            <>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">종료 증빙 사진 (선택)</label>
                <input type="file" accept="image/*" onChange={onPhotoChange} className="block w-full text-sm text-gray-500 file:mr-2 file:rounded file:border-0 file:bg-gray-100 file:px-3 file:py-1.5" />
                {endPhoto && <p className="text-xs text-green-600 mt-1">첨부됨</p>}
              </div>
              <Button
                onClick={() => setSignMode("end")}
                disabled={submitting}
                className="w-full bg-safety-navy hover:bg-safety-navy-light"
              >
                종료 서명
              </Button>
            </>
          )}
        </div>

        {signMode === "confirm" && (
          <SignaturePad
            isOpen
            onClose={() => setSignMode(null)}
            onConfirm={handleConfirmSignature}
            workerName={workerName}
          />
        )}
        {signMode === "end" && (
          <SignaturePad
            isOpen
            onClose={() => setSignMode(null)}
            onConfirm={handleEndSignature}
            workerName={workerName}
          />
        )}
      </div>
    </div>
  );
}
