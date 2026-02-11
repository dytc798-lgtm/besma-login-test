"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ClipboardList, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Play,
  RefreshCw,
  MapPin,
  ArrowRight,
  Edit
} from "lucide-react";
import { 
  saveTBMData, 
  getTBMDataList, 
  startTBM,
  changeWorkType,
  updateLocation,
  getRisksByWorkType,
  saveChangeSignature,
  type TBMData 
} from "@/lib/data-flow";
import SignaturePad from "@/components/SignaturePad";

export default function TBMWorkOrderPage() {
  const [tbmList, setTbmList] = useState<TBMData[]>([]);
  const [activeTBM, setActiveTBM] = useState<TBMData | null>(null);
  const [showWorkTypeChange, setShowWorkTypeChange] = useState(false);
  const [newWorkType, setNewWorkType] = useState("");
  const [showChangeSignature, setShowChangeSignature] = useState(false);
  const [pendingChangeId, setPendingChangeId] = useState("");

  // TBM 리스트 업데이트 헬퍼 함수
  const updateTBMList = useCallback(() => {
    const updated = getTBMDataList();
    setTbmList(updated);
    const active = updated.find((t) => t.startTime && !t.signatures.some((s) => s.workerName === "완료"));
    setActiveTBM(active || null);
    return { updated, active };
  }, []);

  useEffect(() => {
    updateTBMList();
  }, [updateTBMList]);

  const handleCreateTBM = useCallback(() => {
    const newTBM: TBMData = {
      id: `tbm-${Date.now()}`,
      workOrderId: "wo-001",
      siteId: "site-001",
      workType: "케이블 포설",
      risks: [], // 위험성평가 DB에서 자동 매핑됨
      measures: [],
      signatures: [],
      locationHistory: [],
      changeHistory: [],
      changeSignatures: [],
    };

    // 위험성평가 DB 연동 및 저장
    saveTBMData(newTBM);
    updateTBMList();
    alert("TBM 일지가 생성되었습니다.\n위험성평가 DB에서 위험요인이 자동 매핑되었습니다.\n[TBM 개시] 버튼을 눌러 작업을 시작하세요.");
  }, [updateTBMList]);

  const handleStartTBM = useCallback((tbmId: string) => {
    startTBM(tbmId, "현장 관리자");
    const { active } = updateTBMList();
    if (active?.id === tbmId) {
      setActiveTBM(active);
    }
    alert("TBM이 개시되었습니다.\n시작 시간이 서버 타임으로 기록되었습니다.");
  }, [updateTBMList]);

  const handleChangeWorkType = useCallback(() => {
    if (!activeTBM || !newWorkType) return;
    
    if (!activeTBM || !newWorkType) return;
    
    const result = changeWorkType(activeTBM.id, newWorkType, "현장 관리자");
    
    if (result.success) {
      const { active } = updateTBMList();
      setActiveTBM(active || null);
      setShowWorkTypeChange(false);
      
      // 변경 이력의 마지막 항목 ID 저장
      const changeId = active?.changeHistory?.[active.changeHistory.length - 1]?.timestamp || "";
      setPendingChangeId(changeId);
      setShowChangeSignature(true);
      
      alert(`공종이 변경되었습니다.\n새로운 위험요인과 대책이 적용되었습니다.\n근로자 재서명이 필요합니다.`);
    }
  }, [activeTBM, newWorkType, updateTBMList]);

  const handleUpdateLocation = useCallback(() => {
    if (!activeTBM) return;
    
    updateLocation(activeTBM.id, "현장 관리자");
    const { active } = updateTBMList();
    setActiveTBM(active || null);
    alert("위치가 갱신되었습니다.\n현재 GPS 좌표가 타임라인에 기록되었습니다.");
  }, [activeTBM, updateTBMList]);

  const handleChangeSignatureConfirm = useCallback((signature: string) => {
    if (!activeTBM || !pendingChangeId) return;
    
    if (!activeTBM || !pendingChangeId) return;
    
    // 변경 TBM 서명 저장
    saveChangeSignature(
      activeTBM.id,
      pendingChangeId,
      "worker-001",
      "김기능",
      signature
    );
    
    const { active } = updateTBMList();
    setActiveTBM(active || null);
    setShowChangeSignature(false);
    setPendingChangeId("");
    alert("변경 TBM 서명이 완료되었습니다.\n변경 이력이 타임라인에 기록되었습니다.");
  }, [activeTBM, pendingChangeId, updateTBMList]);

  // 위험요인 미리보기
  const previewRisks = useMemo(() => {
    if (!newWorkType) return { risks: [], measures: [] };
    return getRisksByWorkType(newWorkType);
  }, [newWorkType]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">TBM 및 작업지시</h1>
        <p className="text-gray-600">ERP 연동 작업지시 + 위험성평가 DB 연동</p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">위험성평가 DB 자동 연동</p>
              <p>TBM 작성 시 본사 표준 위험성평가 DB에서 공종별 위험요인을 API로 불러와 자동 매핑합니다.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-600" />
            오늘의 작업지시
          </CardTitle>
          <CardDescription>ERP에서 연동된 작업지시 목록</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">동력간선 케이블 포설 작업</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">진행중</span>
              </div>
              <div className="text-sm text-gray-600 mb-2">위치: 102동 2코어</div>
              <div className="text-sm text-gray-600 mb-3">
                <div className="font-medium mb-1">위험요인 (위험성평가 DB에서 자동 매핑):</div>
                <ul className="list-disc list-inside ml-2">
                  <li>중량물 운반 시 전도 위험</li>
                  <li>케이블 절단 시 손베임 주의</li>
                  <li>개구부 추락 주의</li>
                </ul>
              </div>
              <Button size="sm" variant="outline" className="gap-2" onClick={handleCreateTBM}>
                <FileText className="w-4 h-4" />
                TBM 일지 생성
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {tbmList.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>생성된 TBM 일지</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tbmList.map((tbm) => {
                const isActive = activeTBM?.id === tbm.id;
                return (
                  <div key={tbm.id} className={`p-4 border-2 rounded-lg ${isActive ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-lg mb-1">
                          TBM 일지 #{tbm.id.slice(-6)}
                          {isActive && <span className="ml-2 px-2 py-1 bg-green-500 text-white rounded-full text-xs">진행중</span>}
                        </div>
                        <div className="text-sm text-gray-600">
                          공종: <span className="font-medium">{tbm.workType}</span>
                        </div>
                        {tbm.startTime && (
                          <div className="text-xs text-gray-500 mt-1">
                            시작 시간: {new Date(tbm.startTime).toLocaleString("ko-KR")}
                          </div>
                        )}
                      </div>
                    </div>

                    {!tbm.startTime && (
                      <Button
                        size="sm"
                        className="gap-2 bg-green-600 hover:bg-green-700 mb-3"
                        onClick={() => handleStartTBM(tbm.id)}
                      >
                        <Play className="w-4 h-4" />
                        TBM 개시
                      </Button>
                    )}

                    {isActive && (
                      <div className="space-y-3 mt-3 pt-3 border-t">
                        <div>
                          <div className="font-medium text-sm mb-2">현재 위험요인:</div>
                          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                            {tbm.risks.map((risk, idx) => (
                              <li key={idx}>{risk}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2"
                            onClick={() => {
                              setNewWorkType("");
                              setShowWorkTypeChange(true);
                            }}
                          >
                            <RefreshCw className="w-4 h-4" />
                            공종 변경
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2"
                            onClick={handleUpdateLocation}
                          >
                            <MapPin className="w-4 h-4" />
                            위치 갱신
                          </Button>
                        </div>

                        {tbm.locationHistory.length > 0 && (
                          <div className="text-xs text-gray-600">
                            <div className="font-medium mb-1">위치 이력:</div>
                            {tbm.locationHistory.map((loc, idx) => (
                              <div key={idx} className="ml-2">
                                {new Date(loc.timestamp).toLocaleTimeString("ko-KR")} - 
                                좌표: {loc.lat.toFixed(6)}, {loc.lng.toFixed(6)}
                              </div>
                            ))}
                          </div>
                        )}

                        {tbm.changeHistory.length > 0 && (
                          <div className="text-xs text-gray-600">
                            <div className="font-medium mb-1">공종 변경 이력:</div>
                            {tbm.changeHistory.map((change, idx) => (
                              <div key={idx} className="ml-2 border-l-2 border-blue-300 pl-2 mb-2">
                                <div className="font-medium">
                                  {change.fromWorkType} <ArrowRight className="w-3 h-3 inline" /> {change.toWorkType}
                                </div>
                                <div className="text-gray-500">
                                  {new Date(change.timestamp).toLocaleString("ko-KR")} ({change.changedBy})
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 공종 변경 모달 */}
      {showWorkTypeChange && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>공종 변경 (MOC)</CardTitle>
              <CardDescription>작업 중 공종을 변경합니다. 새로운 위험요인이 자동으로 적용됩니다.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">새로운 공종 선택</label>
                <select
                  className="w-full border rounded-md px-3 py-2"
                  value={newWorkType}
                  onChange={(e) => setNewWorkType(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  <option value="케이블 포설">케이블 포설</option>
                  <option value="트레이 설치">트레이 설치</option>
                  <option value="앙카링">앙카링</option>
                  <option value="전기실 입선">전기실 입선</option>
                </select>
              </div>
              {newWorkType && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium mb-2">새로운 위험요인:</div>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    {previewRisks.risks.map((risk, idx) => (
                      <li key={idx}>{risk}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={handleChangeWorkType}
                  disabled={!newWorkType}
                >
                  변경 적용
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowWorkTypeChange(false);
                    setNewWorkType("");
                  }}
                >
                  취소
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 변경 TBM 서명 */}
      {showChangeSignature && (
        <SignaturePad
          isOpen={showChangeSignature}
          onClose={() => {
            setShowChangeSignature(false);
            setPendingChangeId("");
          }}
          onConfirm={handleChangeSignatureConfirm}
          workerName="김기능"
        />
      )}
    </div>
  );
}
