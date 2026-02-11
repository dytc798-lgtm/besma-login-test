"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { mockComplianceData, mockLawAmendments } from "@/lib/mock-data";
import { Scale, TrendingUp, AlertCircle, CheckCircle2, Bell, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";

export default function CompliancePage() {
  const overallCompliance = Math.round(
    mockComplianceData.reduce((sum, item) => sum + item.complianceRate, 0) / mockComplianceData.length
  );

  const complianceChartData = mockComplianceData.map((item) => ({
    name: `${item.law} ${item.article}`,
    rate: item.complianceRate,
    status: item.status,
  }));

  const statusData = [
    { name: "준수", value: mockComplianceData.filter((item) => item.status === "compliant").length, color: "#22c55e" },
    { name: "주의", value: mockComplianceData.filter((item) => item.status === "warning").length, color: "#f59e0b" },
    { name: "미준수", value: mockComplianceData.filter((item) => item.status === "non-compliant").length, color: "#ef4444" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "#22c55e";
      case "warning":
        return "#f59e0b";
      case "non-compliant":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">컴플라이언스 대시보드</h1>
        <p className="text-gray-600">산안법/중처법 핵심 조항 준수율 및 법령 개정 예고</p>
      </div>

      {/* 전체 준수율 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">전체 준수율</div>
                <div className="text-3xl font-bold text-green-600">{overallCompliance}%</div>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">준수 항목</div>
                <div className="text-3xl font-bold text-blue-600">
                  {mockComplianceData.filter((item) => item.status === "compliant").length}개
                </div>
              </div>
              <Scale className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">주의 필요</div>
                <div className="text-3xl font-bold text-yellow-600">
                  {mockComplianceData.filter((item) => item.status === "warning").length}개
                </div>
              </div>
              <AlertCircle className="w-12 h-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 준수율 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>조항별 준수율</CardTitle>
            <CardDescription>산안법/중처법 핵심 조항 준수 현황</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complianceChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="rate">
                  {complianceChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>준수 상태 분포</CardTitle>
            <CardDescription>전체 조항의 준수 상태</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 조항별 상세 현황 */}
      <Card>
        <CardHeader>
          <CardTitle>조항별 상세 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockComplianceData.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg border-l-4 ${
                  item.status === "compliant"
                    ? "bg-green-50 border-l-green-500"
                    : item.status === "warning"
                    ? "bg-yellow-50 border-l-yellow-500"
                    : "bg-red-50 border-l-red-500"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-1">
                      {item.law} {item.article}
                    </div>
                    <div className="text-gray-700 mb-2">{item.description}</div>
                    <div className="text-sm text-gray-600">
                      최종 점검일: {item.lastChecked}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${
                      item.status === "compliant"
                        ? "text-green-600"
                        : item.status === "warning"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}>
                      {item.complianceRate}%
                    </div>
                    <div className={`text-sm font-semibold mt-1 ${
                      item.status === "compliant"
                        ? "text-green-700"
                        : item.status === "warning"
                        ? "text-yellow-700"
                        : "text-red-700"
                    }`}>
                      {item.status === "compliant" ? "준수" : item.status === "warning" ? "주의" : "미준수"}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 법령 개정 예고 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            AI 법령 개정 예고 (2주 단위)
          </CardTitle>
          <CardDescription>법령 개정 예정 사항을 미리 알려드립니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLawAmendments.map((amendment) => (
              <div
                key={amendment.id}
                className={`p-4 bg-white rounded-lg border-l-4 ${
                  amendment.impact === "high"
                    ? "border-l-red-500"
                    : amendment.impact === "medium"
                    ? "border-l-yellow-500"
                    : "border-l-blue-500"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-lg">
                        {amendment.law} {amendment.article}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        amendment.impact === "high"
                          ? "bg-red-100 text-red-700"
                          : amendment.impact === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {amendment.impact === "high" ? "높은 영향" : amendment.impact === "medium" ? "중간 영향" : "낮은 영향"}
                      </span>
                    </div>
                    <div className="text-gray-700 mb-2">{amendment.description}</div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>개정 예정일: {amendment.amendmentDate}</span>
                      <span className="flex items-center gap-1 text-orange-600">
                        <Clock className="w-4 h-4" />
                        {amendment.daysUntil}일 후
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
