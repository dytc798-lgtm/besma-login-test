"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, CheckCircle2, Clock, Download, AlertCircle } from "lucide-react";
import { getSignaturesForReport } from "@/lib/data-flow";

type ReportStatus = "draft" | "pending" | "approved";

interface BiannualReport {
  id: string;
  period: string;
  title: string;
  status: ReportStatus;
  submittedAt?: string;
  approvedBy?: string;
  approvedAt?: string;
}

export default function BiannualReportPage() {
  const [signatures, setSignatures] = useState<any[]>([]);
  
  useEffect(() => {
    const sigs = getSignaturesForReport("biannual");
    setSignatures(sigs);
  }, []);

  const [reports, setReports] = useState<BiannualReport[]>([
    {
      id: "2024-1H",
      period: "2024년 상반기",
      title: "2024년 상반기 안전보건 이행점검 보고서",
      status: "pending",
      submittedAt: "2024-06-30",
    },
    {
      id: "2023-2H",
      period: "2023년 하반기",
      title: "2023년 하반기 안전보건 이행점검 보고서",
      status: "approved",
      submittedAt: "2023-12-31",
      approvedBy: "대표이사",
      approvedAt: "2024-01-05",
    },
  ]);

  const isCEO = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("role") === "headquarters";

  const handleFinalApproval = (reportId: string) => {
    if (!isCEO) {
      alert("대표이사 권한이 필요합니다.");
      return;
    }

    setReports(
      reports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              status: "approved" as ReportStatus,
              approvedBy: "대표이사",
              approvedAt: new Date().toISOString().split("T")[0],
            }
          : report
      )
    );
    alert("최종 승인이 완료되었습니다. 전자서명이 PDF에 자동 삽입되었습니다.");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">반기 이행점검 보고</h1>
        <p className="text-gray-600">중처법 핵심: 반기별 이행 점검 및 대표이사 최종 서명</p>
      </div>

      <Card className="bg-red-50 border-red-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="text-sm text-red-800">
              <p className="font-semibold mb-1">중처법 필수 문서</p>
              <p>반기별 안전보건 이행점검 보고서는 대표이사 최종 승인 필수입니다.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 서명 데이터 자동 아카이빙 */}
      {signatures.length > 0 && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
              <div className="text-sm text-purple-800">
                <p className="font-semibold mb-1">서명 데이터 자동 아카이빙</p>
                <p>근로자의 모든 전자서명이 증빙 데이터로 자동 수집되었습니다.</p>
                <p className="mt-2 text-xs">수집된 서명: {signatures.length}건</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{report.title}</CardTitle>
                  <CardDescription>{report.period}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {report.status === "approved" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-600" />
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    report.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {report.status === "approved" ? "승인 완료" : "승인 대기"}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {report.submittedAt && <div>제출일: {report.submittedAt}</div>}
                  {report.approvedBy && <div>승인자: {report.approvedBy} | 승인일: {report.approvedAt}</div>}
                </div>
                <div className="flex gap-2">
                  {report.status === "pending" && isCEO && (
                    <Button
                      onClick={() => handleFinalApproval(report.id)}
                      className="bg-safety-navy hover:bg-safety-navy-light"
                    >
                      최종 승인
                    </Button>
                  )}
                  {report.status === "approved" && (
                    <Button variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      PDF 다운로드
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
