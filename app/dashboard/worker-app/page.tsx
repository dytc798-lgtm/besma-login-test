"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MobileView from "@/components/MobileView";
import SignaturePad from "@/components/SignaturePad";
import { Smartphone, Award, FileText, CheckCircle2, AlertTriangle, Ban, Shield, Target, MapPin } from "lucide-react";
import { getSafetyPolicy, addSafetyReport } from "@/lib/data-flow";

export default function WorkerAppPage() {
  const [phoneOpen, setPhoneOpen] = useState(true);
  const [safetyPolicy, setSafetyPolicy] = useState<any>(null);
  const [mobileView, setMobileView] = useState<"main" | "points" | "work" | "work-complete" | "stop-work" | "report-risk">("main");

  // 방침 실시간 표시
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
    };
    
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);
  const [stopWorkData, setStopWorkData] = useState({ location: "", riskFactor: "", countermeasure: "" });
  const [stopWorkNotificationSent, setStopWorkNotificationSent] = useState(false);
  const [reportRiskData, setReportRiskData] = useState({ location: "", riskFactor: "", countermeasure: "" });
  const [showSignaturePad, setShowSignaturePad] = useState(false);
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isSigned, setIsSigned] = useState(false);
  const [showWorkCompleteSignature, setShowWorkCompleteSignature] = useState(false);
  const [workCompleteSignature, setWorkCompleteSignature] = useState<string | null>(null);
  const [isWorkCompleteSigned, setIsWorkCompleteSigned] = useState(false);

  const handleStopWorkSubmit = () => {
    if (!stopWorkData.location || !stopWorkData.riskFactor || !stopWorkData.countermeasure) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    addSafetyReport({
      type: "작업중지권",
      reporter: "박성구",
      reporterTeam: "전기 1팀",
      datetime: new Date().toLocaleString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      location: stopWorkData.location,
      riskFactor: stopWorkData.riskFactor,
      countermeasure: stopWorkData.countermeasure,
    });
    setStopWorkNotificationSent(true);
    setStopWorkData({ location: "", riskFactor: "", countermeasure: "" });
  };

  const handleReportRiskSubmit = () => {
    if (!reportRiskData.location || !reportRiskData.riskFactor) {
      alert("위치와 위험요인을 입력해주세요.");
      return;
    }
    addSafetyReport({
      type: "위험요인신고",
      reporter: "박성구",
      reporterTeam: "전기 1팀",
      datetime: new Date().toLocaleString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      location: reportRiskData.location,
      riskFactor: reportRiskData.riskFactor,
      countermeasure: reportRiskData.countermeasure || "",
    });
    alert("위험요인이 신고되었습니다. 안전 신문고에 등록되었습니다.");
    setReportRiskData({ location: "", riskFactor: "", countermeasure: "" });
  };

  const handleSignatureConfirm = (signature: string) => {
    setSignatureData(signature);
    setIsSigned(true);
    
    // Mock 데이터에 서명 저장 (실제로는 서버로 전송)
    // 위험성평가 서명을 mockWorkOrders에 저장
    if (typeof window !== "undefined") {
      const workOrderId = 1; // 현재 작업지시 ID (실제로는 동적으로)
      const event = new CustomEvent("riskAssessmentSignature", {
        detail: { workOrderId, signature, workerName: "박성구" }
      });
      window.dispatchEvent(event);
    }
    
    alert("위험성평가 확인 및 서명이 완료되었습니다. TBM 일지로 자동 연동됩니다.");
  };

  const handleWorkCompleteSignatureConfirm = (signature: string) => {
    setWorkCompleteSignature(signature);
    setIsWorkCompleteSigned(true);
    
    // Mock 데이터에 서명 저장 (실제로는 서버로 전송)
    // 작업 완료 서명을 mockWorkOrders에 저장
    if (typeof window !== "undefined") {
      const workOrderId = 1; // 현재 작업지시 ID (실제로는 동적으로)
      const event = new CustomEvent("workCompleteSignature", {
        detail: { workOrderId, signature, workerName: "박성구" }
      });
      window.dispatchEvent(event);
    }
    
    alert("작업 완료 서명이 완료되었습니다. 무재해 확인서에 자동 연동됩니다.");
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-safety-navy">근로자 앱</h1>
        <p className="text-sm text-gray-600">현장 · 내 정보 및 앱 시연</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 왼쪽 40%: 현장 요약 · 내 위치 (site-manager와 동일 패턴) */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="py-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                현장 · 내 정보
              </CardTitle>
              <CardDescription className="text-xs">인천1구역</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 text-sm">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="font-semibold text-safety-navy">박성구</div>
                  <div className="text-gray-600">전기 1팀</div>
                </div>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                  <div className="text-xs text-amber-800 font-medium">부현포인트</div>
                  <div className="text-xl font-bold text-amber-600">850P</div>
                </div>
                <p className="text-xs text-gray-500">앱에서 작업중지권·위험신고·작업지시 확인을 할 수 있습니다.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽 60%: 방침 + 가상 핸드폰 */}
        <div className="lg:col-span-3 space-y-4">
          {safetyPolicy && (
            <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
              <CardHeader className="py-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-600" />
                  <CardTitle className="text-sm font-semibold">안전보건 방침 (본사 승인)</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="py-2 pt-0">
                <p className="text-sm text-safety-navy">{safetyPolicy.title}</p>
              </CardContent>
            </Card>
          )}

      {/* 가상 핸드폰: X 누르면 메인일 때는 폰 닫기, 그 외에는 이전 화면(메인)으로 */}
      <div className="flex justify-center">
        {!phoneOpen ? (
          <Card className="p-8 text-center max-w-sm">
            <p className="text-gray-600 mb-4">근로자 앱 시연</p>
            <Button onClick={() => setPhoneOpen(true)} className="bg-safety-navy hover:bg-safety-navy-light">
              <Smartphone className="w-4 h-4 mr-2" />
              앱 열기
            </Button>
          </Card>
        ) : (
        <MobileView
          isOpen={true}
          onClose={() => { if (mobileView !== "main") setMobileView("main"); else setPhoneOpen(false); }}
          title={
            mobileView === "main" ? "BESMA 근로자" : 
            mobileView === "points" ? "부현포인트" : 
            mobileView === "work" ? "작업지시" :
            mobileView === "work-complete" ? "작업 완료" :
            mobileView === "stop-work" ? "작업중지권" :
            "위험요인 신고"
          }
        >
        {mobileView === "main" && (
          <div className="p-4 space-y-4">
            {stopWorkNotificationSent && (
              <div className="p-4 rounded-xl border-2 border-green-300 bg-green-50 text-green-800">
                <div className="flex items-center gap-2 font-semibold mb-1">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  관리자에게 작업중지권 알림이 전송되었습니다.
                </div>
                <p className="text-sm text-green-700">X 버튼으로 닫은 후에도 이 화면에서 확인할 수 있습니다.</p>
              </div>
            )}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl">
              <div className="text-sm opacity-90 mb-1">안녕하세요</div>
              <div className="text-2xl font-bold mb-2">박성구님</div>
              <div className="text-sm opacity-90">전기 1팀 · 인천1구역 현장</div>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
              <Award className="w-6 h-6 text-orange-600 mb-2" />
              <div className="text-xs text-gray-600 mb-1">부현포인트</div>
              <div className="text-xl font-bold text-orange-600">850P</div>
            </div>

            {/* 작업중지 및 위험요인 신고 버튼 */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold"
                onClick={() => {
                  setMobileView("stop-work");
                }}
              >
                <Ban className="w-6 h-6 mr-2" />
                작업중지권
              </Button>
              <Button 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-bold"
                onClick={() => {
                  setMobileView("report-risk");
                }}
              >
                <Shield className="w-6 h-6 mr-2" />
                위험요인 신고
              </Button>
            </div>

            <div className="space-y-2 border-t pt-4">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => {
                  setMobileView("work");
                }}
              >
                <FileText className="w-5 h-5 mr-2" />
                작업지시 확인
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => {
                  setMobileView("points");
                }}
              >
                <Award className="w-5 h-5 mr-2" />
                부현포인트 확인
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => {
                  setMobileView("work-complete");
                }}
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                작업 완료 보고
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

                {!isSigned ? (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => setShowSignaturePad(true)}
                  >
                    위험성평가 확인 및 서명
                  </Button>
                ) : (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700">서명 완료</span>
                    </div>
                    {signatureData && (
                      <div className="mt-3 border-2 border-gray-300 rounded-lg p-2 bg-white">
                        <Image 
                          src={signatureData} 
                          alt="서명" 
                          width={300}
                          height={80}
                          className="w-full h-20 object-contain"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="text-xs text-gray-600 mt-2">
                      TBM 일지로 자동 연동되었습니다.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!isSigned && (
              <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
                서명 완료 시 TBM 일지로 자동 연동됩니다.
              </div>
            )}
          </div>
        )}

        {mobileView === "work-complete" && (
          <div className="p-4 space-y-4">
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="font-semibold mb-2">작업 완료 보고</div>
              <div className="text-sm text-gray-600">2024-01-20</div>
            </div>

            <div className="space-y-3">
              <div className="border rounded-xl p-4">
                <div className="font-semibold mb-2">동력간선 케이블 포설 작업</div>
                <div className="text-sm text-gray-600 mb-3">102동 2코어</div>
                
                <div className="mb-3">
                  <div className="text-xs font-semibold text-green-600 mb-1">작업 완료 확인</div>
                  <div className="text-xs text-gray-700">
                    작업이 안전하게 완료되었습니다. 무재해 확인서에 서명해주세요.
                  </div>
                </div>

                {!isWorkCompleteSigned ? (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => setShowWorkCompleteSignature(true)}
                  >
                    무재해 확인서 서명
                  </Button>
                ) : (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700">서명 완료</span>
                    </div>
                    {workCompleteSignature && (
                      <div className="mt-3 border-2 border-gray-300 rounded-lg p-2 bg-white">
                        <Image 
                          src={workCompleteSignature} 
                          alt="작업 완료 서명" 
                          width={300}
                          height={80}
                          className="w-full h-20 object-contain"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="text-xs text-gray-600 mt-2">
                      무재해 확인서에 자동 연동되었습니다.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {!isWorkCompleteSigned && (
              <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
                서명 완료 시 무재해 확인서에 자동 연동됩니다.
              </div>
            )}
          </div>
        )}

        {mobileView === "stop-work" && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-700 pb-2 border-b">
              <span>
                {now.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" })} {now.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
              </span>
              <span className="font-semibold text-safety-navy">김부현</span>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-center">
              <Ban className="w-12 h-12 text-red-600 mx-auto mb-3" />
              <div className="text-xl font-bold text-red-700 mb-2">작업중지권 사용</div>
              <div className="text-sm text-gray-600">안전상 위험하다고 판단되는 작업을 중지할 권리</div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold mb-2 block">위치</label>
                <input
                  type="text"
                  placeholder="작업 위치를 입력하세요"
                  value={stopWorkData.location}
                  onChange={(e) => setStopWorkData({ ...stopWorkData, location: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">위험요인</label>
                <textarea
                  placeholder="작업 중지가 필요한 위험요인을 입력하세요"
                  value={stopWorkData.riskFactor}
                  onChange={(e) => setStopWorkData({ ...stopWorkData, riskFactor: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">대책</label>
                <textarea
                  placeholder="필요한 안전 대책을 입력하세요"
                  value={stopWorkData.countermeasure}
                  onChange={(e) => setStopWorkData({ ...stopWorkData, countermeasure: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                />
              </div>
              <Button onClick={handleStopWorkSubmit} className="w-full bg-red-600 hover:bg-red-700">
                작업중지권 신고 (관리자 알림 전송)
              </Button>
            </div>

            {stopWorkNotificationSent && (
              <div className="p-4 rounded-xl border-2 border-green-300 bg-green-50 text-green-800">
                <div className="flex items-center gap-2 font-semibold mb-1">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  관리자에게 알림이 전송되었습니다.
                </div>
                <p className="text-sm text-green-700">X를 누르면 메인 화면에서도 전송 확인을 볼 수 있습니다.</p>
              </div>
            )}

            <div className="p-3 bg-yellow-50 rounded-lg text-xs text-yellow-700">
              작업중지권 신고 시 안전신문고에 자동 등록됩니다.
            </div>
          </div>
        )}

        {mobileView === "report-risk" && (
          <div className="p-4 space-y-4">
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 text-center">
              <Shield className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <div className="text-xl font-bold text-orange-700 mb-2">위험요인 신고</div>
              <div className="text-sm text-gray-600">발견한 위험요인을 신고하세요</div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold mb-2 block">위치</label>
                <input
                  type="text"
                  placeholder="위험요인 발견 위치를 입력하세요"
                  value={reportRiskData.location}
                  onChange={(e) => setReportRiskData({ ...reportRiskData, location: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">위험요인</label>
                <textarea
                  placeholder="발견한 위험요인을 상세히 입력하세요"
                  value={reportRiskData.riskFactor}
                  onChange={(e) => setReportRiskData({ ...reportRiskData, riskFactor: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">제안 대책</label>
                <textarea
                  placeholder="제안하는 안전 대책을 입력하세요 (선택사항)"
                  value={reportRiskData.countermeasure}
                  onChange={(e) => setReportRiskData({ ...reportRiskData, countermeasure: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  rows={3}
                />
              </div>
              <Button onClick={handleReportRiskSubmit} className="w-full bg-orange-600 hover:bg-orange-700">
                위험요인 신고
              </Button>
            </div>

            <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
              위험요인 신고 시 안전신문고에 자동 등록되며, 적절성과 참신성에 따라 점수가 부여됩니다.
            </div>
          </div>
        )}
        </MobileView>
        )}
      </div>
        </div>
      </div>

      {/* 위험성평가 서명 패드 */}
      <SignaturePad
        isOpen={showSignaturePad}
        onClose={() => setShowSignaturePad(false)}
        onConfirm={handleSignatureConfirm}
        workerName="박성구"
      />

      {/* 작업 완료 서명 패드 */}
      <SignaturePad
        isOpen={showWorkCompleteSignature}
        onClose={() => setShowWorkCompleteSignature(false)}
        onConfirm={handleWorkCompleteSignatureConfirm}
        workerName="박성구"
      />
    </div>
  );
}

