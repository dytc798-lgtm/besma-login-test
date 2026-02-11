"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MobileView from "@/components/MobileView";
import { AlertTriangle, MapPin, Phone, MessageSquare } from "lucide-react";

export default function SOSPage() {
  const [showMobile, setShowMobile] = useState(false);
  const [sosActive, setSosActive] = useState(false);

  const handleSOS = () => {
    setSosActive(true);
    setShowMobile(true);
    alert("SOS 신호가 발송되었습니다! 현장소장과 안전관리자에게 카카오알림톡이 전송되었습니다. (가상 처리)");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">SOS 긴급호출</h1>
        <p className="text-gray-600">비상 상황 시 즉시 신고 (SENS 알림톡 가상 처리)</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SOS 기능</CardTitle>
          <CardDescription>
            근로자가 SOS 버튼을 누르면 지도에 빨간 점이 표시되고 카카오알림톡이 발송됩니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={handleSOS}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-6"
            >
              <AlertTriangle className="w-6 h-6 mr-2" />
              SOS 긴급호출
            </Button>
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm">
              <div className="font-semibold mb-2">SENS 알림톡 발송 (가상 처리)</div>
              <div className="text-gray-700">
                • 현장소장에게 즉시 알림톡 발송<br />
                • 안전관리자에게 즉시 알림톡 발송<br />
                • 지도에 빨간 점으로 위치 표시<br />
                <span className="text-xs text-gray-500">(실제 구현 시 카카오알림톡 API 연동)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {sosActive && (
        <Card className="border-red-500 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">SOS 신호 수신</CardTitle>
            <CardDescription>긴급 상황이 감지되었습니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <span className="font-semibold">위치: 인천1구역 102동 2코어</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-red-600" />
                <span>신고자: 박성구 (010-1234-5678)</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-red-600" />
                <span>알림톡 발송 완료 (가상)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <MobileView
        isOpen={showMobile}
        onClose={() => {
          setShowMobile(false);
          setSosActive(false);
        }}
        title="SOS 긴급호출"
      >
        <div className="p-4 space-y-4">
          <div className="bg-red-600 text-white p-6 rounded-2xl text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-3" />
            <div className="text-2xl font-bold mb-2">SOS 신호 발송</div>
            <div className="text-sm opacity-90">
              현장소장과 안전관리자에게<br />
              즉시 알림이 전송되었습니다
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">현재 위치</div>
              <div className="font-semibold">인천1구역 102동 2코어</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">신고 시간</div>
              <div className="font-semibold">{new Date().toLocaleString("ko-KR")}</div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
            <div className="font-semibold mb-1">알림톡 발송 완료</div>
            <div className="text-gray-700 text-xs">
              • 현장소장: 홍길동 (010-1111-2222)<br />
              • 안전관리자: 김철수 (010-3333-4444)
            </div>
          </div>
        </div>
      </MobileView>
    </div>
  );
}

