"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, FileText, GraduationCap, CheckCircle2, Clock } from "lucide-react";

export default function TodayTasksPage() {
  const tasks = [
    {
      id: "t1",
      type: "TBM 확인",
      title: "오늘의 TBM 일지 확인 및 서명",
      status: "완료",
      icon: FileText,
    },
    {
      id: "t2",
      type: "교육 참석",
      title: "안전보건교육 참석 (14:00)",
      status: "대기",
      icon: GraduationCap,
    },
    {
      id: "t3",
      type: "작업지시 확인",
      title: "동력간선 케이블 포설 작업 확인",
      status: "완료",
      icon: ClipboardList,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">오늘의 할 일</h1>
        <p className="text-gray-600">TBM 확인, 교육 참석 및 전자서명</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => {
          const Icon = task.icon;
          return (
            <Card key={task.id} className={task.status === "완료" ? "bg-green-50 border-green-200" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-blue-600" />
                    <div>
                      <CardTitle className="text-base">{task.title}</CardTitle>
                      <CardDescription>{task.type}</CardDescription>
                    </div>
                  </div>
                  {task.status === "완료" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-600" />
                  )}
                </div>
              </CardHeader>
              {task.status === "대기" && (
                <CardContent>
                  <Button size="sm" className="bg-safety-navy hover:bg-safety-navy-light">
                    확인하기
                  </Button>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
