"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Ban, AlertTriangle } from "lucide-react";

export default function SafetyCenterPage() {
  const handleStopWork = () => {
    if (confirm("작업중지권을 사용하시겠습니까?")) {
      alert("작업중지권이 신고되었습니다. 안전신문고에 등록되었습니다.");
    }
  };

  const handleReportRisk = () => {
    alert("위험요인 신고 화면으로 이동합니다.");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">안전 센터</h1>
        <p className="text-gray-600">작업중지권 및 위험 신고 버튼 (최상단 고정)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 작업중지권 */}
        <Card className="border-2 border-red-300 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <Ban className="w-6 h-6" />
              작업중지권
            </CardTitle>
            <CardDescription className="text-red-600">
              안전상 위험하다고 판단되는 작업을 중지할 권리
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleStopWork}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold"
            >
              작업중지권 사용
            </Button>
          </CardContent>
        </Card>

        {/* 위험 신고 */}
        <Card className="border-2 border-orange-300 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <AlertTriangle className="w-6 h-6" />
              위험요인 신고
            </CardTitle>
            <CardDescription className="text-orange-600">
              발견한 위험요인을 신고하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleReportRisk}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-bold"
            >
              위험요인 신고하기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
