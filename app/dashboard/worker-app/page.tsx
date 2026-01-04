"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MobileView from "@/components/MobileView";
import { Smartphone, Award, Star, TrendingUp, User, FileText, CheckCircle2, AlertTriangle } from "lucide-react";

export default function WorkerAppPage() {
  const [showMobile, setShowMobile] = useState(false);
  const [mobileView, setMobileView] = useState<"main" | "points" | "grade" | "work">("main");

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">근로자 앱</h1>
        <p className="text-gray-600">근로자 모바일 앱 화면 시뮬레이션</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>근로자 앱 기능</CardTitle>
          <CardDescription>핸드폰 앱 화면을 시뮬레이션하여 확인할 수 있습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={() => {
                setMobileView("main");
                setShowMobile(true);
              }}
              className="h-auto flex-col gap-2 p-6"
            >
              <Smartphone className="w-8 h-8" />
              <span>앱 메인 화면</span>
            </Button>
            <Button
              onClick={() => {
                setMobileView("points");
                setShowMobile(true);
              }}
              className="h-auto flex-col gap-2 p-6"
            >
              <Award className="w-8 h-8" />
              <span>부현포인트</span>
            </Button>
            <Button
              onClick={() => {
                setMobileView("grade");
                setShowMobile(true);
              }}
              className="h-auto flex-col gap-2 p-6"
            >
              <Star className="w-8 h-8" />
              <span>기능인 등급제</span>
            </Button>
            <Button
              onClick={() => {
                setMobileView("work");
                setShowMobile(true);
              }}
              className="h-auto flex-col gap-2 p-6"
            >
              <FileText className="w-8 h-8" />
              <span>작업지시 확인</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 가상 핸드폰 화면 */}
      <MobileView
        isOpen={showMobile}
        onClose={() => setShowMobile(false)}
        title={mobileView === "main" ? "BESMA 근로자" : mobileView === "points" ? "부현포인트" : mobileView === "grade" ? "기능인 등급" : "작업지시"}
      >
        {mobileView === "main" && (
          <div className="p-4 space-y-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
              <div className="text-sm opacity-90 mb-1">안녕하세요</div>
              <div className="text-2xl font-bold mb-2">박성구님</div>
              <div className="text-sm opacity-90">전기 1팀 · 인천1구역 현장</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                <Award className="w-6 h-6 text-orange-600 mb-2" />
                <div className="text-xs text-gray-600 mb-1">부현포인트</div>
                <div className="text-xl font-bold text-orange-600">850P</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <Star className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-xs text-gray-600 mb-1">기능인 등급</div>
                <div className="text-xl font-bold text-blue-600">A등급</div>
              </div>
            </div>

            <div className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-5 h-5 mr-2" />
                작업지시 확인
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                작업 완료 보고
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertTriangle className="w-5 h-5 mr-2" />
                위험신고
              </Button>
            </div>
          </div>
        )}

        {mobileView === "points" && (
          <div className="p-4 space-y-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl text-center">
              <div className="text-sm opacity-90 mb-2">현재 포인트</div>
              <div className="text-4xl font-bold mb-2">850P</div>
              <div className="text-sm opacity-90">포인트로 포상 가능</div>
            </div>

            <div>
              <div className="font-semibold mb-3">포인트 적립 내역</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">안전 수칙 준수</div>
                    <div className="text-xs text-gray-500">2024-01-20</div>
                  </div>
                  <div className="text-orange-600 font-bold">+50P</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">의견청취 제안</div>
                    <div className="text-xs text-gray-500">2024-01-19</div>
                  </div>
                  <div className="text-orange-600 font-bold">+30P</div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">작업지시 확인</div>
                    <div className="text-xs text-gray-500">2024-01-18</div>
                  </div>
                  <div className="text-orange-600 font-bold">+20P</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-sm font-semibold text-blue-900 mb-1">등급인정제 가점</div>
              <div className="text-xs text-blue-700">
                부현포인트 상승에 따른 가점이 등급인정제의 가점으로도 적용됩니다.
              </div>
            </div>
          </div>
        )}

        {mobileView === "grade" && (
          <div className="p-4 space-y-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl text-center">
              <div className="text-sm opacity-90 mb-2">기능인 등급</div>
              <div className="text-4xl font-bold mb-2">A등급</div>
              <div className="text-sm opacity-90">안전분야</div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="font-semibold mb-2">안전분야 등급</div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">현재 등급</span>
                    <span className="text-lg font-bold text-green-600">A등급</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">다음 등급까지 15%</div>
                </div>
              </div>

              <div>
                <div className="font-semibold mb-2">품질분야 등급</div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">현재 등급</span>
                    <span className="text-lg font-bold text-blue-600">B등급</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                  <div className="text-xs text-gray-600 mt-2">다음 등급까지 30%</div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-xs font-semibold text-yellow-900 mb-1">감점 사항</div>
                <div className="text-xs text-yellow-700">
                  작업지시 미확인: -5점<br />
                  종결 미확인: -3점
                </div>
              </div>
            </div>
          </div>
        )}

        {mobileView === "work" && (
          <div className="p-4 space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <div className="font-semibold mb-2">오늘의 작업지시</div>
              <div className="text-sm text-gray-600">2024-01-20</div>
            </div>

            <div className="space-y-3">
              <div className="border rounded-xl p-4">
                <div className="font-semibold mb-2">동력간선 케이블 포설 작업</div>
                <div className="text-sm text-gray-600 mb-3">102동 2코어</div>
                
                <div className="mb-3">
                  <div className="text-xs font-semibold text-red-600 mb-1">위험요인</div>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• 중량물 운반 시 전도 위험</li>
                    <li>• 케이블 절단 시 손베임 주의</li>
                    <li>• 개구부 추락 주의</li>
                  </ul>
                </div>

                <div className="mb-3">
                  <div className="text-xs font-semibold text-green-600 mb-1">안전대책</div>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• 2인 1조 작업</li>
                    <li>• 안전대 걸이 확보</li>
                    <li>• 장갑 착용</li>
                  </ul>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  위험성평가 확인 및 서명
                </Button>
              </div>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
              서명 완료 시 TBM 일지로 자동 연동됩니다.
            </div>
          </div>
        )}
      </MobileView>
    </div>
  );
}

