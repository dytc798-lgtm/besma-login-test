"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Shield } from "lucide-react";

export default function MyPage() {
  const points = 850;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">마이페이지</h1>
        <p className="text-gray-600">나의 포인트 확인 (※ 주의: &apos;등급&apos; 정보는 사용자에게 절대 노출 금지)</p>
      </div>

      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-600" />
            부현포인트
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-5xl font-bold text-amber-600 mb-2">{points}P</div>
            <div className="text-sm text-gray-600">포인트로 포상 가능</div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">등급 정보 보안</p>
              <p>등급 정보는 관리자만 조회 가능하며, 근로자 화면에서는 포인트만 표시됩니다.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>포인트 적립 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">안전 수칙 준수</div>
                <div className="text-xs text-gray-500">2024-01-20</div>
              </div>
              <div className="text-amber-600 font-bold">+50P</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-sm">의견청취 제안</div>
                <div className="text-xs text-gray-500">2024-01-19</div>
              </div>
              <div className="text-amber-600 font-bold">+30P</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
