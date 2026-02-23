"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MobileView from "@/components/MobileView";
import { MapPin } from "lucide-react";
import { CheckCircle2, Mic, Calendar, FileText, Smartphone, Target, Ban, Shield, AlertCircle } from "lucide-react";
import { getSafetyPolicy, getSafetyReports } from "@/lib/data-flow";

type WorkOrderItem = { id: number; worker: string; task: string; hazard: string; measure: string; status: "pending" | "confirmed" };

const mockWorkers = [
  { id: 1, name: "홍길동", team: "전기 1팀", location: { lat: 37.456, lng: 126.705 }, status: "작업중" },
  { id: 2, name: "김철수", team: "전기 2팀", location: { lat: 37.457, lng: 126.706 }, status: "작업중" },
  { id: 3, name: "이영희", team: "전기 3팀", location: { lat: 37.458, lng: 126.707 }, status: "휴식" },
];

export default function SiteManagerPage() {
  const [showMobile, setShowMobile] = useState(false);
  const [safetyPolicy, setSafetyPolicy] = useState<any>(null);
  const [recentSafetyReports, setRecentSafetyReports] = useState<ReturnType<typeof getSafetyReports>>([]);
  const [workOrders, setWorkOrders] = useState<WorkOrderItem[]>([
    { id: 1, worker: "박성구", task: "동력간선 케이블 포설", hazard: "감전, 낙하", measure: "절연장갑, 안전모", status: "pending" },
    { id: 2, worker: "김철수", task: "조명 배선 작업", hazard: "감전", measure: "차단 확인 후 작업", status: "pending" },
  ]);

  useEffect(() => {
    const policy = getSafetyPolicy();
    if (policy && policy.status === "approved") {
      setSafetyPolicy(policy);
    }
    const handleStorageChange = () => {
      const updated = getSafetyPolicy();
      if (updated && updated.status === "approved") {
        setSafetyPolicy(updated);
      }
      setRecentSafetyReports(getSafetyReports());
    };
    setRecentSafetyReports(getSafetyReports());
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleConfirm = (id: number) => {
    setWorkOrders(workOrders.map((o) => (o.id === id ? { ...o, status: "confirmed" } : o)));
    alert("작업지시가 확정되어 각 근로자에게 전달되었습니다.");
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-safety-navy">현장관리자</h1>
        <p className="text-sm text-gray-600">작업지시 확정 및 현장 관리</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 왼쪽 40%: 현장 지도 */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="py-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                현장 지도
              </CardTitle>
              <CardDescription className="text-xs">근로자 실시간 위치</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="relative w-full h-64 lg:h-[420px] bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                  <div className="absolute top-10 left-10 w-24 h-24 bg-gray-400 rounded opacity-50" />
                  <div className="absolute top-16 right-12 w-20 h-20 bg-gray-400 rounded opacity-50" />
                  <div className="absolute bottom-16 left-1/3 w-20 h-20 bg-gray-400 rounded opacity-50" />
                  {mockWorkers.map((w) => (
                    <div
                      key={w.id}
                      className="absolute"
                      style={{
                        left: `${(w.location.lat - 37.454) * 10000}%`,
                        top: `${(w.location.lng - 126.703) * 10000}%`,
                      }}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 border-white ${w.status === "작업중" ? "bg-green-500" : "bg-yellow-500"}`} />
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                        {w.name}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-2 right-2 bg-white/90 p-2 rounded text-xs shadow">
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-500" /> 작업중</div>
                  <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-yellow-500" /> 휴식</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽 60%: 방침 + 작업지시/의견청취 + 점검일정 등 */}
        <div className="lg:col-span-3 space-y-4">
          {/* 안전보건 방침 및 목표 (본사 승인) */}
          {safetyPolicy && (
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardHeader className="py-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <CardTitle className="text-sm font-semibold">안전보건 방침 및 목표</CardTitle>
                </div>
                <CardDescription className="text-xs">본사 승인</CardDescription>
              </CardHeader>
              <CardContent className="py-2 pt-0">
                <p className="text-sm font-medium text-safety-navy">{safetyPolicy.title}</p>
                <p className="text-xs text-gray-600 mt-1">승인자: {safetyPolicy.approvedBy} | 승인일: {safetyPolicy.approvedAt}</p>
              </CardContent>
            </Card>
          )}

          {/* 현장방침 및 목표 (승인: 소장) */}
          <Card className="border-amber-200 bg-amber-50/50">
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-semibold">현장방침 및 목표</CardTitle>
              <CardDescription className="text-xs">승인: 소장</CardDescription>
            </CardHeader>
            <CardContent className="py-2 pt-0">
              <p className="text-sm text-gray-700">현장별 안전수칙 및 당해 연도 현장 목표. 소장 승인 후 현장에 공지합니다.</p>
            </CardContent>
          </Card>

          {/* 작업지시 목록 + 의견청취관리대장 한 화면 (글씨 축소) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-semibold">작업지시 목록</CardTitle>
                <CardDescription className="text-xs">소장 확정 시 근로자 전달</CardDescription>
              </CardHeader>
              <CardContent className="py-2 pt-0">
                <div className="space-y-2">
                  {workOrders.map((order) => (
                    <div key={order.id} className="py-2 px-3 border rounded text-sm space-y-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-gray-900">{order.worker}</span>
                          <span className="text-gray-500 ml-1">· {order.task}</span>
                        </div>
                        {order.status === "pending" ? (
                          <Button onClick={() => handleConfirm(order.id)} size="sm" className="text-xs h-7">
                            확정
                          </Button>
                        ) : (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> 확정완료
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-600 pl-0">
                        <span className="text-red-600">위험요인:</span> {order.hazard || "—"} · <span className="text-green-700">대책:</span> {order.measure || "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="py-2">
                <CardTitle className="text-sm font-semibold">의견청취관리대장</CardTitle>
                <CardDescription className="text-xs">근로자 신고·음성 텍스트 변환</CardDescription>
              </CardHeader>
              <CardContent className="py-2 pt-0">
                <Button
                  onClick={() => setShowMobile(true)}
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-xs"
                >
                  <Smartphone className="w-3.5 h-3.5 mr-1.5" />
                  근로자 앱 음성 신고
                </Button>
                <p className="text-xs text-gray-500 mt-2">Web Speech API 음성→텍스트 저장 (가상)</p>
              </CardContent>
            </Card>
          </div>

          {/* 최근 작업중지권/위험신고 (근로자앱에서 입력 시 여기 반영) */}
          <Card className="border-red-100">
            <CardHeader className="py-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-semibold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    최근 작업중지권 / 위험신고
                  </CardTitle>
                  <CardDescription className="text-xs">근로자 앱에서 신고 시 실시간 반영</CardDescription>
                </div>
                <Link href="/dashboard/feedback?role=site-manager" className="text-xs text-safety-navy font-medium hover:underline">
                  전체 보기 →
                </Link>
              </div>
            </CardHeader>
            <CardContent className="py-2 pt-0">
              {recentSafetyReports.length === 0 ? (
                <p className="text-xs text-gray-500 py-2">아직 신고 내역이 없습니다. 근로자 앱에서 작업중지권 또는 위험요인 신고를 하면 여기에 표시됩니다.</p>
              ) : (
                <ul className="space-y-2">
                  {recentSafetyReports.slice(0, 5).map((r) => (
                    <li key={r.id} className="flex items-start gap-2 py-1.5 px-2 rounded border border-gray-100 text-xs">
                      {r.type === "작업중지권" ? (
                        <Ban className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Shield className="w-3.5 h-3.5 text-orange-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="min-w-0">
                        <span className="font-medium text-gray-900">{r.reporter}</span>
                        <span className="text-gray-500 ml-1">· {r.datetime}</span>
                        <div className="text-gray-600 mt-0.5 truncate">{r.location} · {r.riskFactor}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* 점검일정: 캘린더 바로가기 */}
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm font-semibold">점검 일정</CardTitle>
              <CardDescription className="text-xs">본사 점검일정 캘린더</CardDescription>
            </CardHeader>
            <CardContent className="py-2 pt-0">
              <Link
                href="/dashboard/inspection"
                className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-800 hover:bg-blue-100"
              >
                <Calendar className="w-4 h-4" />
                캘린더 바로가기
              </Link>
            </CardContent>
          </Card>

          {/* 문서함 서류등록 */}
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm font-semibold">문서함 서류등록</CardTitle>
              <CardDescription className="text-xs">서류 등록 및 본사 송부</CardDescription>
            </CardHeader>
            <CardContent className="py-2 pt-0 text-sm">
              <ul className="space-y-2 text-gray-700">
                <li>
                  <span className="font-medium text-gray-900">기초안전교육이수증</span>
                  <ul className="ml-4 mt-0.5 space-y-0.5 text-xs text-gray-600">
                    <li>· OCR 작업</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium text-gray-900">TBM일지</span>
                  <ul className="ml-4 mt-0.5 space-y-0.5 text-xs text-gray-600">
                    <li>· 작성</li>
                    <li>· 본사 송부</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium text-gray-900">산업안전보건관리비</span>
                  <ul className="ml-4 mt-0.5 space-y-0.5 text-xs text-gray-600">
                    <li>· 영수증 (OCR)</li>
                    <li>· 내역 작성</li>
                    <li>· 본사 송부</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium text-gray-900">교육</span>
                  <ul className="ml-4 mt-0.5 space-y-0.5 text-xs text-gray-600">
                    <li>· 작성</li>
                    <li>· 본사 송부</li>
                  </ul>
                </li>
                <li>
                  <span className="font-medium text-gray-900">점검</span>
                  <ul className="ml-4 mt-0.5 space-y-0.5 text-xs text-gray-600">
                    <li>· 작성</li>
                    <li>· 본사 송부</li>
                  </ul>
                </li>
              </ul>
              <div className="mt-3 pt-3 border-t border-gray-200" />
            </CardContent>
          </Card>
        </div>
      </div>

      <MobileView isOpen={showMobile} onClose={() => setShowMobile(false)} title="의견청취 / 문서 촬영">
        <div className="p-4 space-y-4">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="font-semibold text-sm mb-2">음성 신고</div>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-sm">
              <Mic className="w-4 h-4 mr-2" />
              음성 녹음 시작
            </Button>
            <p className="text-xs text-gray-600 mt-2">Web Speech API 가상 처리</p>
          </div>
          <div className="border-t pt-4">
            <div className="font-semibold text-sm mb-2">문서 촬영</div>
            <Button className="w-full" variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              이수증/자격증 촬영
            </Button>
            <Button className="w-full mt-2" variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              영수증 촬영
            </Button>
          </div>
        </div>
      </MobileView>
    </div>
  );
}
