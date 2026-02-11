"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, AlertCircle, CheckCircle2, Clock } from "lucide-react";

export default function FeedbackAccidentPage() {
  const feedbacks = [
    {
      id: "fb-001",
      type: "안전 신문고",
      title: "102동 2층 난간 손상 발견",
      reporter: "정민익",
      status: "조치중",
      reportedAt: "2024-01-20 10:30",
    },
    {
      id: "fb-002",
      type: "아차사고 보고",
      title: "도구 낙하 사고 (인명피해 없음)",
      reporter: "김철수",
      status: "조치완료",
      reportedAt: "2024-01-19 14:20",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">의견 및 사고 대응</h1>
        <p className="text-gray-600">안전 신문고 처리, 아차사고 보고</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {feedbacks.map((feedback) => (
          <Card key={feedback.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {feedback.type === "안전 신문고" ? (
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                  <CardTitle>{feedback.title}</CardTitle>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  feedback.status === "조치완료" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}>
                  {feedback.status}
                </span>
              </div>
              <CardDescription>
                {feedback.type} | 신고자: {feedback.reporter} | {feedback.reportedAt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {feedback.status === "조치중" && (
                <Button size="sm" className="bg-safety-navy hover:bg-safety-navy-light">
                  조치 완료 처리
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
