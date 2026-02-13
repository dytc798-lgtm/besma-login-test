"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { SafetyWorklogInput } from "@/lib/beta-safety-worklog";

type ColMap = {
  date: number;
  crew: number;
  workName: number;
  description: number;
  hazard: number;
  measure: number;
};

const PREVIEW_ROWS = 10;

async function parseSheet(file: File): Promise<string[][]> {
  const XLSX = await import("xlsx");
  const data = await file.arrayBuffer();
  const wb = XLSX.read(new Uint8Array(data), { type: "array" });
  const name = wb.SheetNames[0];
  const ws = wb.Sheets[name];
  const rows = XLSX.utils.sheet_to_json(ws, { header: 1 }) as string[][];
  return rows;
}

function toYMD(val: unknown): string {
  if (val == null) return "";
  const s = String(val).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  return s;
}

export default function BetaSafetyWorklogImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [dataRows, setDataRows] = useState<string[][]>([]);
  const [map, setMap] = useState<ColMap>({
    date: 0,
    crew: 1,
    workName: 2,
    description: 3,
    hazard: 4,
    measure: 5,
  });
  const [defaultSiteId, setDefaultSiteId] = useState("default");
  const [uploadError, setUploadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ count: number } | null>(null);

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      setResult(null);
      setUploadError("");
      if (!f) {
        setFile(null);
        setHeaders([]);
        setDataRows([]);
        return;
      }
      if (!f.name.endsWith(".xlsx") && !f.name.endsWith(".xls")) {
        setUploadError("xlsx 또는 xls 파일만 업로드 가능합니다.");
        setFile(null);
        setHeaders([]);
        setDataRows([]);
        return;
      }
      parseSheet(f)
        .then((rows) => {
          setFile(f);
          const h = (rows[0] ?? []).map((c) => String(c ?? "").trim());
          setHeaders(h);
          setDataRows(rows.slice(1));
          setMap({
            date: 0,
            crew: Math.min(1, h.length - 1),
            workName: Math.min(2, h.length - 1),
            description: Math.min(3, h.length - 1),
            hazard: Math.min(4, h.length - 1),
            measure: Math.min(5, h.length - 1),
          });
        })
        .catch(() => {
          setUploadError("파일 파싱에 실패했습니다.");
          setFile(null);
          setHeaders([]);
          setDataRows([]);
        });
    },
    []
  );

  const previewData = dataRows.slice(0, PREVIEW_ROWS).map((row) => ({
    workDate: toYMD(row[map.date]),
    crew: String(row[map.crew] ?? "").trim(),
    workName: String(row[map.workName] ?? "").trim(),
    description: String(row[map.description] ?? "").trim(),
    hazard: String(row[map.hazard] ?? "").trim(),
    measure: String(row[map.measure] ?? "").trim(),
  }));

  const buildPayload = useCallback((): SafetyWorklogInput[] => {
    return dataRows.map((row) => ({
      siteId: defaultSiteId.trim() || "default",
      workDate: toYMD(row[map.date]),
      crew: String(row[map.crew] ?? "").trim(),
      workName: String(row[map.workName] ?? "").trim(),
      description: String(row[map.description] ?? "").trim(),
      hazard: String(row[map.hazard] ?? "").trim(),
      measure: String(row[map.measure] ?? "").trim(),
    }));
  }, [dataRows, map, defaultSiteId]);

  const handleConfirm = async () => {
    if (!file || dataRows.length === 0) return;
    setSubmitting(true);
    setResult(null);
    try {
      const rows = buildPayload();
      const res = await fetch("/api/beta/safety/worklog/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ rows, fileRef: file.name }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResult({ count: 0 });
        return;
      }
      setResult({ count: data.count ?? rows.length });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/beta/safety/worklog" className="text-sm text-blue-600 hover:underline">
            ← 목록
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">엑셀 가져오기</h1>

        <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">xlsx 파일 선택</label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={onFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-safety-navy file:px-4 file:py-2 file:text-white file:hover:bg-safety-navy-light"
            />
            {uploadError && <p className="mt-1 text-sm text-red-600">{uploadError}</p>}
          </div>

          {headers.length > 0 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">현장(고정)</label>
                <input
                  type="text"
                  value={defaultSiteId}
                  onChange={(e) => setDefaultSiteId(e.target.value)}
                  className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm"
                  placeholder="default"
                />
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">컬럼 매핑</span>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {(["date", "crew", "workName", "description", "hazard", "measure"] as const).map((key) => (
                    <div key={key} className="flex items-center gap-2">
                      <label className="w-24 text-gray-600">
                        {key === "date" && "날짜"}
                        {key === "crew" && "팀/반"}
                        {key === "workName" && "작업명"}
                        {key === "description" && "내용"}
                        {key === "hazard" && "위험요인"}
                        {key === "measure" && "대책"}
                      </label>
                      <select
                        value={map[key]}
                        onChange={(e) => setMap((m) => ({ ...m, [key]: Number(e.target.value) }))}
                        className="rounded border border-gray-300 px-2 py-1"
                      >
                        {headers.map((h, i) => (
                          <option key={i} value={i}>
                            {i + 1}열 {h || `(빈 이름)`}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">미리보기 (상위 {PREVIEW_ROWS}행)</span>
                <div className="overflow-x-auto rounded border border-gray-200">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left font-medium text-gray-700">날짜</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-700">팀/반</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-700">작업명</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-700">내용</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-700">위험요인</th>
                        <th className="px-3 py-2 text-left font-medium text-gray-700">대책</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previewData.map((row, i) => (
                        <tr key={i} className="border-t border-gray-100">
                          <td className="px-3 py-2">{row.workDate}</td>
                          <td className="px-3 py-2">{row.crew}</td>
                          <td className="px-3 py-2">{row.workName}</td>
                          <td className="px-3 py-2 max-w-[200px] truncate">{row.description}</td>
                          <td className="px-3 py-2">{row.hazard}</td>
                          <td className="px-3 py-2">{row.measure}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-1 text-xs text-gray-500">총 {dataRows.length}행 (미리보기 {Math.min(PREVIEW_ROWS, dataRows.length)}행)</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleConfirm}
                  disabled={submitting}
                  className="bg-safety-navy hover:bg-safety-navy-light"
                >
                  {submitting ? "저장 중..." : "확정 후 저장"}
                </Button>
                <Link href="/beta/safety/worklog">
                  <Button type="button" variant="outline">목록으로</Button>
                </Link>
              </div>
            </>
          )}
        </div>

        {result !== null && (
          <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800">
            {result.count > 0
              ? `${result.count}건이 안전 작업일보로 저장되었습니다. (source=FILE_IMPORT)`
              : "저장에 실패했거나 0건 처리되었습니다."}
            <Link href="/beta/safety/worklog" className="ml-2 text-green-700 underline">
              목록 보기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
