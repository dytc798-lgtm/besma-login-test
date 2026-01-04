"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockSafetyReports } from "@/lib/mock-data";
import { Search, AlertCircle, User, Calendar, CheckCircle2, Clock, Ban, Shield, Star } from "lucide-react";

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [reports, setReports] = useState(mockSafetyReports);
  const [editingScore, setEditingScore] = useState<number | null>(null);
  const [scoreValues, setScoreValues] = useState<{ [key: number]: { appropriateness: number; novelty: number } }>({});

  // 시간 순서대로 정렬 (최신순)
  const sortedReports = [...reports].sort((a, b) => 
    new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  );

  const filteredReports = sortedReports.filter(
    (report) =>
      report.reporter.includes(searchTerm) ||
      report.riskFactor.includes(searchTerm) ||
      report.location.includes(searchTerm) ||
      report.type.includes(searchTerm)
  );

  const handleScoreSubmit = (reportId: number) => {
    const scores = scoreValues[reportId];
    if (!scores) return;

    const totalScore = scores.appropriateness + scores.novelty;
    setReports(
      reports.map((report) =>
        report.id === reportId
          ? {
              ...report,
              appropriatenessScore: scores.appropriateness,
              noveltyScore: scores.novelty,
              totalScore: totalScore,
            }
          : report
      )
    );
    setEditingScore(null);
    alert("점수가 저장되었습니다. 포상 평가에 반영됩니다.");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "조치완료":
        return "bg-green-100 text-green-700";
      case "조치중":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "조치완료":
        return CheckCircle2;
      case "조치중":
        return Clock;
      default:
        return AlertCircle;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">안전 신문고</h1>
        <p className="text-gray-600">위험요인 신고 및 작업중지권 사용 내역 (시간 순서대로 누적 관리)</p>
      </div>

      {/* 검색 */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="신고자, 위험요인, 위치로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* 표 형태로 표시 */}
      <Card>
        <CardHeader>
          <CardTitle>안전 신문고 관리대장</CardTitle>
          <CardDescription>위험요인 신고 및 작업중지권 사용 내역 (시간 순서대로 정렬)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-3 text-left text-xs font-semibold text-gray-700">시간</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-700">유형</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-700">신고자</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-700">위치</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-700">위험요인</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-700">대책</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-700">상태</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-700">적절성</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-700">참신성</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-700">총점</th>
                  <th className="p-3 text-left text-xs font-semibold text-gray-700">관리</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="p-8 text-center text-gray-500">
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report) => {
                    const StatusIcon = getStatusIcon(report.status);
                    return (
                      <tr key={report.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-sm">{report.datetime}</td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                              report.type === "작업중지권"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {report.type === "작업중지권" ? (
                              <Ban className="w-3 h-3" />
                            ) : (
                              <Shield className="w-3 h-3" />
                            )}
                            {report.type}
                          </span>
                        </td>
                        <td className="p-3 text-sm">
                          <div className="font-medium">{report.reporter}</div>
                          <div className="text-xs text-gray-500">{report.reporterTeam}</div>
                        </td>
                        <td className="p-3 text-sm">{report.location}</td>
                        <td className="p-3 text-sm max-w-xs">{report.riskFactor}</td>
                        <td className="p-3 text-sm max-w-xs">{report.countermeasure}</td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              report.status
                            )}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {report.status}
                          </span>
                        </td>
                        <td className="p-3">
                          {editingScore === report.id ? (
                            <input
                              type="number"
                              min="0"
                              max="10"
                              value={scoreValues[report.id]?.appropriateness || report.appropriatenessScore || ""}
                              onChange={(e) =>
                                setScoreValues({
                                  ...scoreValues,
                                  [report.id]: {
                                    ...scoreValues[report.id],
                                    appropriateness: parseInt(e.target.value) || 0,
                                    novelty: scoreValues[report.id]?.novelty || report.noveltyScore || 0,
                                  },
                                })
                              }
                              className="w-16 p-1 border rounded text-sm"
                            />
                          ) : (
                            <span className="text-sm font-medium">
                              {report.appropriatenessScore !== null ? report.appropriatenessScore : "-"}
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          {editingScore === report.id ? (
                            <input
                              type="number"
                              min="0"
                              max="10"
                              value={scoreValues[report.id]?.novelty || report.noveltyScore || ""}
                              onChange={(e) =>
                                setScoreValues({
                                  ...scoreValues,
                                  [report.id]: {
                                    ...scoreValues[report.id],
                                    appropriateness: scoreValues[report.id]?.appropriateness || report.appropriatenessScore || 0,
                                    novelty: parseInt(e.target.value) || 0,
                                  },
                                })
                              }
                              className="w-16 p-1 border rounded text-sm"
                            />
                          ) : (
                            <span className="text-sm font-medium">
                              {report.noveltyScore !== null ? report.noveltyScore : "-"}
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          {report.totalScore !== null ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">
                              <Star className="w-3 h-3" />
                              {report.totalScore}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-3">
                          {editingScore === report.id ? (
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                onClick={() => handleScoreSubmit(report.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                저장
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingScore(null);
                                  setScoreValues({});
                                }}
                              >
                                취소
                              </Button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingScore(report.id);
                                setScoreValues({
                                  [report.id]: {
                                    appropriateness: report.appropriatenessScore || 0,
                                    novelty: report.noveltyScore || 0,
                                  },
                                });
                              }}
                            >
                              점수 입력
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
            <div className="font-semibold mb-2">점수 평가 기준</div>
            <div className="text-gray-700 space-y-1">
              <div>• 적절성 (0-10점): 위험요인 파악의 정확성 및 대책의 적절성</div>
              <div>• 참신성 (0-10점): 새로운 위험요인 발견 또는 창의적인 대책 제안</div>
              <div>• 총점: 적절성 + 참신성 (포상 평가에 반영)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
