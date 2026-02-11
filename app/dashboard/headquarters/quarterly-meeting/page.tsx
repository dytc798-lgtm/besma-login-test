"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Download, Users, AlertCircle } from "lucide-react";
import { getSignaturesForReport } from "@/lib/data-flow";

export default function QuarterlyMeetingPage() {
  const [signatures, setSignatures] = useState<any[]>([]);
  
  useEffect(() => {
    const sigs = getSignaturesForReport("quarterly");
    setSignatures(sigs);
  }, []);

  const meetings = [
    {
      id: "2024-Q1",
      quarter: "2024년 1분기",
      date: "2024-03-31",
      participants: 15,
      status: "완료",
    },
    {
      id: "2024-Q2",
      quarter: "2024년 2분기",
      date: "2024-06-30",
      participants: 0,
      status: "예정",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">분기 경영회의</h1>
        <p className="text-gray-600">분기별 데이터 자동 결산 및 회의록 관리</p>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meetings.map((meeting) => (
          <Card key={meeting.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                {meeting.quarter}
              </CardTitle>
              <CardDescription>회의일: {meeting.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">참석 인원</span>
                  <span className="font-medium flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {meeting.participants}명
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">상태</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    meeting.status === "완료" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {meeting.status}
                  </span>
                </div>
                {meeting.status === "완료" && (
                  <Button variant="outline" className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    회의록 다운로드
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
