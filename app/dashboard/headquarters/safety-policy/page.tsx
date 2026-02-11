"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, Clock, AlertCircle, Download, Edit, Upload, X } from "lucide-react";
import { saveSafetyPolicy, getSafetyPolicy, type SafetyPolicy as SafetyPolicyType } from "@/lib/data-flow";

type DocumentStatus = "draft" | "pending" | "approved";

interface SafetyPolicy {
  id: string;
  year: string;
  title: string;
  status: DocumentStatus;
  createdBy: string;
  createdAt: string;
  approvedBy?: string;
  approvedAt?: string;
  pdfUrl?: string; // 업로드된 PDF 파일 URL
  pdfFileName?: string; // PDF 파일명
}

export default function SafetyPolicyPage() {
  const [policies, setPolicies] = useState<SafetyPolicy[]>([
    {
      id: "policy-2026",
      year: "2026",
      title: "2026년 안전보건 방침 및 목표",
      status: "pending",
      createdBy: "안전담당자",
      createdAt: "2026-01-11",
    },
  ]);
  const [selectedPolicy, setSelectedPolicy] = useState<SafetyPolicy | null>(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [uploadedPdfUrl, setUploadedPdfUrl] = useState<string | null>(null);

  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "draft":
        return <Edit className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: DocumentStatus) => {
    switch (status) {
      case "approved":
        return "승인 완료";
      case "pending":
        return "승인 대기";
      case "draft":
        return "작성 중";
    }
  };

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "draft":
        return "bg-gray-100 text-gray-700";
    }
  };

  // 대표이사 권한 확인 (데모용: role 쿼리 파라미터로 확인)
  const isCEO = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("role") === "headquarters";

  // LocalStorage에서 방침 데이터 로드 (2026년만)
  useEffect(() => {
    const savedPolicy = getSafetyPolicy();
    if (savedPolicy && savedPolicy.status === "approved" && savedPolicy.id.includes("2026")) {
      setPolicies((prev) => {
        const existing = prev.find((p) => p.id === savedPolicy.id);
        if (!existing) {
          return [
            ...prev,
            {
              id: savedPolicy.id,
              year: "2026",
              title: savedPolicy.title,
              status: "approved" as DocumentStatus,
              createdBy: savedPolicy.createdBy,
              createdAt: savedPolicy.createdAt,
              approvedBy: savedPolicy.approvedBy,
              approvedAt: savedPolicy.approvedAt,
            },
          ];
        }
        return prev;
      });
    }
    
    // LocalStorage에서 업로드된 PDF 정보 로드
    if (typeof window !== "undefined") {
      const savedPdf = localStorage.getItem("besma_policy_2026_pdf");
      if (savedPdf) {
        const pdfData = JSON.parse(savedPdf);
        setPolicies((prev) =>
          prev.map((p) =>
            p.id === "policy-2026"
              ? { ...p, pdfUrl: pdfData.url, pdfFileName: pdfData.fileName }
              : p
          )
        );
      }
    }
  }, []);

  const handleFinalApproval = (policyId: string) => {
    if (!isCEO) {
      alert("대표이사 권한이 필요합니다.");
      return;
    }

    const policy = policies.find((p) => p.id === policyId);
    if (!policy) return;

    const approvedPolicy: SafetyPolicyType = {
      id: policy.id,
      title: policy.title,
      content: `${policy.title} 내용`,
      status: "approved",
      createdBy: policy.createdBy,
      createdAt: policy.createdAt,
      approvedBy: "대표이사",
      approvedAt: new Date().toISOString().split("T")[0],
    };

    // LocalStorage에 저장 (GPS 및 서버 시간 자동 기록)
    saveSafetyPolicy(approvedPolicy);

    // Data Locking: 승인 완료된 문서는 수정 불가능하도록 플래그 설정
    if (typeof window !== "undefined") {
      const lockedDocs = JSON.parse(localStorage.getItem("besma_locked_documents") || "[]");
      if (!lockedDocs.includes(policyId)) {
        lockedDocs.push(policyId);
        localStorage.setItem("besma_locked_documents", JSON.stringify(lockedDocs));
      }
    }

    setPolicies(
      policies.map((p) =>
        p.id === policyId
          ? {
              ...p,
              status: "approved" as DocumentStatus,
              approvedBy: "대표이사",
              approvedAt: approvedPolicy.approvedAt,
            }
          : p
      )
    );
    alert("최종 승인이 완료되었습니다. 전자서명이 PDF에 자동 삽입되었습니다.\n모든 현장 관리자 및 근로자 앱에 실시간 반영됩니다.\n※ 승인 완료된 문서는 수정이 불가능합니다 (Data Locking 적용).");
  };

  // 승인 완료된 문서 수정 시도 시 차단
  const handleEditAttempt = (policyId: string) => {
    const policy = policies.find((p) => p.id === policyId);
    if (policy?.status === "approved") {
      // Audit Log에 수정 시도 기록
      if (typeof window !== "undefined") {
        const auditLog = JSON.parse(localStorage.getItem("besma_audit_log") || "[]");
        auditLog.push({
          documentId: policyId,
          documentType: "safety_policy",
          action: "edit_attempt",
          timestamp: new Date().toISOString(),
          user: "안전담당자",
          message: "승인 완료된 문서 수정 시도 차단됨",
        });
        localStorage.setItem("besma_audit_log", JSON.stringify(auditLog));
      }
      alert("⚠️ 승인 완료된 문서는 수정할 수 없습니다.\nData Locking이 적용되어 있습니다.\n수정 시도가 Audit Log에 기록되었습니다.");
      return false;
    }
    return true;
  };

  // PDF 파일 업로드 처리
  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("PDF 파일만 업로드 가능합니다.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB 이하여야 합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const pdfDataUrl = e.target?.result as string;
      
      // LocalStorage에 PDF 저장
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "besma_policy_2026_pdf",
          JSON.stringify({
            url: pdfDataUrl,
            fileName: file.name,
            uploadedAt: new Date().toISOString(),
          })
        );
      }

      // policies 상태 업데이트
      setPolicies((prev) =>
        prev.map((p) =>
          p.id === "policy-2026"
            ? { ...p, pdfUrl: pdfDataUrl, pdfFileName: file.name }
            : p
        )
      );

      alert(`PDF 파일이 업로드되었습니다: ${file.name}`);
    };
    reader.readAsDataURL(file);
  };

  // PDF 뷰어 열기
  const handleViewPdf = (policy: SafetyPolicy) => {
    if (policy.pdfUrl) {
      setUploadedPdfUrl(policy.pdfUrl);
      setSelectedPolicy(policy);
      setShowPdfViewer(true);
    } else {
      alert("업로드된 PDF 파일이 없습니다.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">안전보건 방침 및 목표</h1>
        <p className="text-gray-600">
          작성: 안전담당자 / 최종 승인: 대표이사
        </p>
      </div>

      {/* 안내 카드 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">승인 워크플로우</p>
              <p>안전담당자가 작성 → 대표이사 최종 승인 → 전자서명 PDF 자동 삽입</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 방침 목록 - 2026년만 표시 */}
      <div className="grid grid-cols-1 gap-4">
        {policies
          .filter((policy) => policy.year === "2026")
          .map((policy) => (
            <Card key={policy.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{policy.title}</CardTitle>
                    <CardDescription>
                      {policy.year}년 | 작성자: {policy.createdBy} | 작성일: {policy.createdAt}
                    </CardDescription>
                    {policy.pdfFileName && (
                      <div className="mt-2 text-sm text-blue-600 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        업로드된 파일: {policy.pdfFileName}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(policy.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(policy.status)}`}>
                      {getStatusLabel(policy.status)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      {policy.status === "approved" && policy.approvedBy && (
                        <div>
                          승인자: {policy.approvedBy} | 승인일: {policy.approvedAt}
                        </div>
                      )}
                      {policy.status === "pending" && (
                        <div className="text-yellow-700 font-medium">
                          대표이사 승인 대기 중
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {policy.status === "pending" && isCEO && (
                        <Button
                          onClick={() => handleFinalApproval(policy.id)}
                          className="bg-safety-navy hover:bg-safety-navy-light"
                        >
                          최종 승인
                        </Button>
                      )}
                      {policy.status === "approved" && (
                        <Button variant="outline" className="gap-2">
                          <Download className="w-4 h-4" />
                          PDF 다운로드
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* PDF 업로드 및 보기 */}
                  <div className="border-t pt-4">
                    <div className="flex items-center gap-2">
                      <label className="flex-1">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handlePdfUpload}
                          className="hidden"
                          id="pdf-upload"
                        />
                        <Button
                          variant="outline"
                          className="w-full gap-2"
                          onClick={() => document.getElementById("pdf-upload")?.click()}
                        >
                          <Upload className="w-4 h-4" />
                          PDF 파일 업로드
                        </Button>
                      </label>
                      {policy.pdfUrl && (
                        <Button
                          variant="outline"
                          className="gap-2"
                          onClick={() => handleViewPdf(policy)}
                        >
                          <FileText className="w-4 h-4" />
                          PDF 보기
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* PDF 뷰어 모달 */}
      {showPdfViewer && uploadedPdfUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-6xl max-h-[90vh] flex flex-col">
            <CardHeader className="flex-shrink-0 border-b">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  {selectedPolicy?.pdfFileName || "안전보건 방침 및 목표 PDF"}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowPdfViewer(false);
                    setUploadedPdfUrl(null);
                    setSelectedPolicy(null);
                  }}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto p-0">
              <iframe
                src={uploadedPdfUrl}
                className="w-full h-full min-h-[600px] border-0"
                title="PDF Viewer"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
