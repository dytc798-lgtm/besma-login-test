"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Archive, Download, FileText, Calendar } from "lucide-react";

export default function DocumentArchivePage() {
  const archives = [
    {
      id: "archive-2023",
      site: "인천1구역 주택재개발",
      completedDate: "2023-12-31",
      documentCount: 124,
      size: "2.3GB",
    },
    {
      id: "archive-2022",
      site: "영등포 주상복합",
      completedDate: "2022-11-30",
      documentCount: 98,
      size: "1.8GB",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">전사 문서 보관소</h1>
        <p className="text-gray-600">준공 현장 데이터 백업 및 관리</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {archives.map((archive) => (
          <Card key={archive.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="w-5 h-5 text-blue-600" />
                {archive.site}
              </CardTitle>
              <CardDescription>준공일: {archive.completedDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">문서 수</span>
                  <span className="font-medium flex items-center gap-1">
                    <FileText className="w-4 h-4" />
                    {archive.documentCount}개
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">용량</span>
                  <span className="font-medium">{archive.size}</span>
                </div>
                <Button variant="outline" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  전체 다운로드
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
