"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield, Flame, CheckCircle2, Clock } from "lucide-react";

export default function HighRiskWorkPage() {
  const ptwRequests = [
    {
      id: "ptw-001",
      type: "화기작업",
      location: "102동 지하 1층",
      requester: "김철수",
      status: "승인 대기",
      requestedAt: "2024-01-20 09:00",
    },
    {
      id: "ptw-002",
      type: "고소작업",
      location: "103동 옥상",
      requester: "이영희",
      status: "승인 완료",
      requestedAt: "2024-01-20 08:30",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">고위험 작업 관리</h1>
        <p className="text-gray-600">작업허가제(PTW) 승인 및 MSDS 관리</p>
      </div>

      {/* PTW 승인 대기 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-red-600" />
            작업허가제(PTW) 승인 대기
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {ptwRequests.map((ptw) => (
              <div key={ptw.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold">{ptw.type}</span>
                    <span className="ml-2 text-sm text-gray-600">{ptw.location}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    ptw.status === "승인 완료" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {ptw.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  신청자: {ptw.requester} | 신청시간: {ptw.requestedAt}
                </div>
                {ptw.status === "승인 대기" && (
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      승인
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                      거부
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* MSDS 관리 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            MSDS 관리
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 mb-4">
            화학물질 안전보건자료(MSDS) 열람 및 관리
          </div>
          <Button variant="outline" className="gap-2">
            <Shield className="w-4 h-4" />
            MSDS 열람
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
