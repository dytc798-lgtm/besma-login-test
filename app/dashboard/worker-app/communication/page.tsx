"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Languages, Globe } from "lucide-react";

export default function CommunicationPage() {
  const notices = [
    {
      id: "n1",
      title: "2024년 1월 안전보건교육 일정 안내",
      date: "2024-01-15",
      languages: ["한국어", "영어", "베트남어", "중국어"],
    },
    {
      id: "n2",
      title: "작업중지권 사용 안내",
      date: "2024-01-10",
      languages: ["한국어", "영어"],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">소통 창구</h1>
        <p className="text-gray-600">다국어 공지사항 확인 (번역 기능 포함)</p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">다국어 지원</p>
              <p>파파고 API 연동으로 자동 번역 기능을 제공합니다.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {notices.map((notice) => (
          <Card key={notice.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-blue-600" />
                {notice.title}
              </CardTitle>
              <CardDescription>{notice.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {notice.languages.map((lang) => (
                  <span
                    key={lang}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
