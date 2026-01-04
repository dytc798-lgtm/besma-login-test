"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">설정</h1>
        <p className="text-gray-600">시스템 설정 및 환경 구성</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>시스템 설정</CardTitle>
          <CardDescription>플랫폼 설정 및 환경 구성</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            설정 기능은 추후 구현 예정입니다.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

