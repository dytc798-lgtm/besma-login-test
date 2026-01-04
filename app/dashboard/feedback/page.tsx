"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockSafetyReports } from "@/lib/mock-data";
import { Search, FileText, AlertCircle, User, Calendar, CheckCircle2, Clock } from "lucide-react";

export default function FeedbackPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReport, setSelectedReport] = useState<number | null>(null);
  const [reports, setReports] = useState(mockSafetyReports);

  const filteredReports = reports.filter(
    (report) =>
      report.title.includes(searchTerm) ||
      report.content.includes(searchTerm) ||
      report.reporter.includes(searchTerm)
  );

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
        <p className="text-gray-600">근로자 의견 접수 및 개선 조치 현황</p>
      </div>

      {/* 검색 */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="제목, 내용, 신고자로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* 신고 목록 */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="text-center py-8 text-gray-500">검색 결과가 없습니다.</div>
        ) : (
          filteredReports.map((report) => {
            const StatusIcon = getStatusIcon(report.status);
            return (
              <Card
                key={report.id}
                className={`cursor-pointer hover:border-blue-500 transition-colors ${
                  selectedReport === report.id ? "border-blue-500 bg-blue-50" : ""
                }`}
                onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            report.status
                          )}`}
                        >
                          <StatusIcon className="w-3 h-3 inline mr-1" />
                          {report.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {report.reporter}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {report.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                {selectedReport === report.id && (
                  <CardContent>
                    <div className="border-t pt-4 space-y-3">
                      <div>
                        <div className="font-semibold mb-2">신고 내용</div>
                        <div className="text-gray-700">{report.content}</div>
                      </div>
                      {report.response && (
                        <div>
                          <div className="font-semibold mb-2">조치 내용</div>
                          <div className="text-gray-700 bg-green-50 p-3 rounded-lg">
                            {report.response}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

