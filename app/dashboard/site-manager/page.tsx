"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MobileView from "@/components/MobileView";
import { CheckCircle2, Mic, Calendar, FileText, Smartphone } from "lucide-react";

export default function SiteManagerPage() {
  const [showMobile, setShowMobile] = useState(false);
  const [workOrders, setWorkOrders] = useState([
    { id: 1, worker: "박성구", task: "동력간선 케이블 포설", status: "pending" },
    { id: 2, worker: "김철수", task: "조명 배선 작업", status: "pending" },
  ]);

  const handleConfirm = (id: number) => {
    setWorkOrders(workOrders.map((o) => (o.id === id ? { ...o, status: "confirmed" } : o)));
    alert("작업지시가 확정되어 각 근로자에게 전달되었습니다.");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">현장관리자</h1>
        <p className="text-gray-600">작업지시 확정 및 현장 관리</p>
      </div>

      {/* 작업지시 확정 */}
      <Card>
        <CardHeader>
          <CardTitle>작업지시 목록</CardTitle>
          <CardDescription>소장이 작업지시 확정을 누르면 각 근로자에게 전달됩니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {workOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-semibold">{order.worker}</div>
                  <div className="text-sm text-gray-600">{order.task}</div>
                </div>
                {order.status === "pending" ? (
                  <Button onClick={() => handleConfirm(order.id)} size="sm">
                    확정
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm">확정 완료</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 의견청취 음성인식 */}
      <Card>
        <CardHeader>
          <CardTitle>의견청취관리대장</CardTitle>
          <CardDescription>근로자 신고내역 - 음성은 자동 텍스트 변환 (Web Speech API 가상 처리)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={() => setShowMobile(true)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              근로자 앱에서 음성 신고하기
            </Button>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
              <div className="font-semibold mb-2">음성 인식 처리 방식</div>
              <div className="text-gray-700">
                • 핸드폰 내부의 Web Speech API 사용<br />
                • 음성이 텍스트로 변환되어 저장<br />
                • 서버로는 텍스트만 전송 (가상 처리)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 점검 일정 */}
      <Card>
        <CardHeader>
          <CardTitle>점검 일정</CardTitle>
          <CardDescription>본사 점검일정을 통합하여 캘린더에 표시</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div className="font-semibold">본사 안전점검</div>
              </div>
              <div className="text-sm text-gray-600 mb-3">2024-01-25 (목)</div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="bg-green-50">
                  확인
                </Button>
                <Button size="sm" variant="outline" className="bg-red-50">
                  불가
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 문서함 서류등록 */}
      <Card>
        <CardHeader>
          <CardTitle>문서함 서류등록</CardTitle>
          <CardDescription>CLOVA OCR 가상 처리 - 기초안전보건교육 이수증/자격증 스캔</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={() => setShowMobile(true)}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Smartphone className="w-4 h-4 mr-2" />
              앱에서 문서 촬영하기
            </Button>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-sm">
              <div className="font-semibold mb-2">OCR 처리 (가상)</div>
              <div className="text-gray-700">
                • 기초안전보건교육 이수증: 이름/생년월일/이수번호 자동 입력<br />
                • 자격증: 자격증 정보 자동 입력<br />
                • 영수증: 날짜/금액 자동 입력<br />
                <span className="text-xs text-gray-500">(실제 구현 시 CLOVA OCR API 연동)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 가상 핸드폰 화면 */}
      <MobileView
        isOpen={showMobile}
        onClose={() => setShowMobile(false)}
        title="의견청취 / 문서 촬영"
      >
        <div className="p-4 space-y-4">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="font-semibold mb-2">음성 신고</div>
            <Button className="w-full bg-red-600 hover:bg-red-700 mb-2">
              <Mic className="w-4 h-4 mr-2" />
              음성 녹음 시작
            </Button>
            <div className="text-xs text-gray-600">
              Web Speech API로 음성이 텍스트로 변환됩니다 (가상 처리)
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="font-semibold mb-2">문서 촬영</div>
            <div className="space-y-2">
              <Button className="w-full" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                이수증/자격증 촬영
              </Button>
              <Button className="w-full" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                영수증 촬영
              </Button>
            </div>
            <div className="text-xs text-gray-600 mt-2">
              CLOVA OCR로 자동 인식됩니다 (가상 처리)
            </div>
          </div>
        </div>
      </MobileView>
    </div>
  );
}

