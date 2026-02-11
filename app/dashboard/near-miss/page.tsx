"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockNearMissReports, NearMissReport } from "@/lib/mock-data";
import { AlertTriangle, Camera, FileText, CheckCircle2, Clock, Plus } from "lucide-react";

export default function NearMissPage() {
  const [reports, setReports] = useState<NearMissReport[]>(mockNearMissReports);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    description: "",
    riskLevel: "medium" as "high" | "medium" | "low",
  });

  const handleSubmit = () => {
    if (!formData.location || !formData.description) {
      alert("위치와 위험 내용을 입력해주세요.");
      return;
    }

    const newReport: NearMissReport = {
      id: reports.length + 1,
      reporter: "현재 사용자", // 실제로는 로그인한 사용자 정보
      reporterTeam: "현재 팀",
      date: new Date().toISOString().split("T")[0],
      location: formData.location,
      description: formData.description,
      riskLevel: formData.riskLevel,
      status: "접수",
      includedInTBM: false,
    };

    setReports([newReport, ...reports]);
    setFormData({ location: "", description: "", riskLevel: "medium" });
    setShowForm(false);
    alert("아차사고 보고가 접수되었습니다. 내일 TBM 가이드에 자동으로 포함됩니다.");
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-safety-navy mb-2">아차사고 보고</h1>
          <p className="text-gray-600">아차사고를 보고하면 내일 TBM 가이드에 자동으로 포함됩니다</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} size="lg">
          <Plus className="w-5 h-5 mr-2" />
          신규 보고
        </Button>
      </div>

      {/* 신규 보고 폼 */}
      {showForm && (
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <CardTitle>아차사고 신규 보고</CardTitle>
            <CardDescription>사진 업로드 및 위험 내용을 입력하세요</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-lg font-semibold mb-3 text-gray-700">
                발생 위치 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="아차사고가 발생한 위치를 입력하세요"
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3 text-gray-700">
                위험 내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="아차사고 상황과 위험 내용을 상세히 입력하세요"
                rows={5}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3 text-gray-700">
                위험 수준 <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.riskLevel}
                onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value as "high" | "medium" | "low" })}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none bg-white"
              >
                <option value="high">높음</option>
                <option value="medium">보통</option>
                <option value="low">낮음</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3 text-gray-700">
                사진 업로드
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">사진을 업로드하세요 (최대 5장)</p>
                <p className="text-sm text-gray-500 mt-2">시연용: 실제 업로드 기능은 추후 구현</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSubmit} size="lg" className="flex-1">
                보고 제출
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline" size="lg">
                취소
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 보고 목록 */}
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className={`border-l-4 ${
            report.riskLevel === "high" ? "border-l-red-500" :
            report.riskLevel === "medium" ? "border-l-yellow-500" :
            "border-l-blue-500"
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <AlertTriangle className="w-6 h-6 text-orange-600" />
                    <div>
                      <div className="font-bold text-lg">{report.reporter}</div>
                      <div className="text-sm text-gray-600">{report.reporterTeam} · {report.location}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">{report.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>보고일: {report.date}</span>
                    {report.includedInTBM && report.tbmDate && (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 className="w-4 h-4" />
                        TBM 가이드 포함됨 ({report.tbmDate})
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(report.riskLevel)}`}>
                    {report.riskLevel === "high" ? "높음" : report.riskLevel === "medium" ? "보통" : "낮음"}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    report.status === "조치완료" ? "bg-green-100 text-green-700" :
                    report.status === "조치중" ? "bg-yellow-100 text-yellow-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {report.status}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 안내 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-blue-600 mt-1" />
            <div>
              <div className="font-semibold text-blue-900 mb-1">TBM 가이드 자동 연동</div>
              <div className="text-sm text-blue-700">
                오늘 보고된 아차사고는 내일 TBM 가이드에 자동으로 포함되어 작업 전 안전회의에서 다루게 됩니다.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
