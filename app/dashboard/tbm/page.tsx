"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockWorkOrders, mockTBMLog } from "@/lib/mock-data";
import { FileText, Download, CheckCircle2, Users, AlertTriangle, Edit } from "lucide-react";

export default function TBMPage() {
  const [tbmLog, setTbmLog] = useState(mockTBMLog);
  const [workOrders, setWorkOrders] = useState(mockWorkOrders);
  const [agreedOrders, setAgreedOrders] = useState(
    workOrders.filter((order) => order.status === "agreed")
  );
  const [riskAssessmentSignatures, setRiskAssessmentSignatures] = useState<{ [key: number]: string }>({});
  const [showEducationEdit, setShowEducationEdit] = useState(false);
  const [editedEducation, setEditedEducation] = useState(tbmLog.education || {
    place: "현장 회의실",
    time: "오전 08:00 ~ 08:30",
    attendees: 0,
    content: "오늘 작업 구간의 낙하·추락 위험요인과 감전 위험에 대해 교육 및 지시.",
  });

  // 작업지시서 상태 변경 감지
  useEffect(() => {
    const handleWorkOrderUpdate = (event: CustomEvent) => {
      // 작업지시서가 업데이트되면 상태 갱신
      const updatedOrders = mockWorkOrders.filter((order) => order.status === "agreed");
      setAgreedOrders(updatedOrders);
      setWorkOrders(mockWorkOrders);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("workOrderUpdate", handleWorkOrderUpdate as EventListener);
      return () => {
        window.removeEventListener("workOrderUpdate", handleWorkOrderUpdate as EventListener);
      };
    }
  }, []);

  // agreedOrders가 변경될 때마다 업데이트
  useEffect(() => {
    const updated = workOrders.filter((order) => order.status === "agreed");
    setAgreedOrders(updated);
  }, [workOrders]);

  // 동의 완료된 작업지시서를 TBM 일지에 반영
  useEffect(() => {
    if (agreedOrders.length > 0 && !tbmLog.generated) {
      // 작업일보의 교육 정보를 TBM 일지에 포함
      const educationData = {
        place: "현장 회의실",
        time: "오전 08:00 ~ 08:30",
        attendees: agreedOrders.length + 20, // 작업지시서 작성자 + 기타 참석자
        content: "오늘 작업 구간의 낙하·추락 위험요인과 감전 위험에 대해 교육 및 지시.",
      };

      setTbmLog((prev) => ({
        ...prev,
        workOrders: agreedOrders,
        education: educationData,
        signatures: agreedOrders.map((order) => ({
          workerName: order.workerName,
          signature: order.signature || `서명_${order.workerName}`,
          timestamp: order.agreedAt || new Date().toISOString(),
        })),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agreedOrders.length]);

  const generateTBM = () => {
    if (agreedOrders.length === 0) {
      alert("동의 완료된 작업지시서가 없습니다. 먼저 위험성평가에 동의해주세요.");
      return;
    }

    // 작업일보의 교육 정보를 TBM 일지에 포함
    const educationData = {
      place: "현장 회의실",
      time: "오전 08:00 ~ 08:30",
      attendees: agreedOrders.length + 20, // 작업지시서 작성자 + 기타 참석자
      content: "오늘 작업 구간의 낙하·추락 위험요인과 감전 위험에 대해 교육 및 지시.",
    };

    setTbmLog({
      ...tbmLog,
      workOrders: agreedOrders,
      education: educationData,
      signatures: agreedOrders.map((order) => ({
        workerName: order.workerName,
        signature: order.signature || `서명_${order.workerName}`,
        timestamp: order.agreedAt || new Date().toISOString(),
      })),
      generated: true,
    });

    alert("TBM 일지가 생성되었습니다. PDF 다운로드가 가능합니다.");
  };

  const downloadPDF = () => {
    if (!tbmLog.generated) {
      alert("먼저 TBM 일지를 생성해주세요.");
      return;
    }

    // PDF 생성 시뮬레이션
    const pdfContent = `
TBM 일지
날짜: ${tbmLog.date}
현장: ${tbmLog.site}

안전보건교육
${tbmLog.education ? `
- 교육 장소: ${tbmLog.education.place}
- 교육 시간: ${tbmLog.education.time}
- 참석 인원: ${tbmLog.education.attendees}명
- 교육 내용: ${tbmLog.education.content}
` : ''}

중점위험작업
- ${tbmLog.focusWork.task}
위험요인: ${tbmLog.focusWork.risks.join(", ")}
안전대책: ${tbmLog.focusWork.measures.join(", ")}

작업 목록:
${tbmLog.workOrders
  .map(
    (order) => `
${order.workerName} (${order.team})
- 위치: ${order.location}
- 작업: ${order.task}
- 위험요인: ${order.risks.join(", ")}
- 안전대책: ${order.measures.join(", ")}
`
  )
  .join("\n")}

서명:
${tbmLog.signatures
  .map((sig) => `${sig.workerName}: ${sig.signature} (${new Date(sig.timestamp).toLocaleString("ko-KR")})`)
  .join("\n")}
    `;

    const blob = new Blob([pdfContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TBM일지_${tbmLog.date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">TBM 일지</h1>
        <p className="text-gray-600">작업 전 회의(Tool Box Meeting) 일지 자동 생성</p>
      </div>

      {/* TBM 일지 생성 상태 */}
      <Card>
        <CardHeader>
          <CardTitle>TBM 일지 생성</CardTitle>
          <CardDescription>
            근로자 동의(서명)가 완료되면 TBM 일지가 자동으로 생성됩니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <div className="font-semibold mb-1">동의 완료된 작업지시서</div>
                <div className="text-sm text-gray-600">
                  {agreedOrders.length}건 / 총 {mockWorkOrders.length}건
                </div>
              </div>
              <div className="flex items-center gap-2">
                {agreedOrders.length > 0 ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                )}
              </div>
            </div>

            {!tbmLog.generated ? (
              <Button
                onClick={generateTBM}
                className="w-full bg-safety-navy hover:bg-safety-navy-light"
                disabled={agreedOrders.length === 0}
              >
                TBM 일지 생성
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-700">TBM 일지 생성 완료</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {tbmLog.workOrders.length}건의 작업이 포함되었습니다.
                  </div>
                </div>
                <Button
                  onClick={downloadPDF}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  PDF 다운로드
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* TBM 일지 미리보기 */}
      {tbmLog.generated && (
        <Card>
          <CardHeader>
            <CardTitle>TBM 일지 미리보기</CardTitle>
            <CardDescription>생성된 TBM 일지 내용</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 border rounded-lg p-6 bg-white relative">
              {/* 결재란 - 오른쪽 상단 */}
              <div className="absolute top-6 right-6">
                <div className="grid grid-cols-3 gap-2">
                  <div className="border-2 border-gray-300 rounded-lg p-3 text-center min-w-[80px]">
                    <div className="text-xs text-gray-600 mb-1">공사차장</div>
                    <div className="h-12 border-b-2 border-dashed border-gray-300 mb-1"></div>
                    <div className="text-[10px] text-gray-500">(인)</div>
                  </div>
                  <div className="border-2 border-gray-300 rounded-lg p-3 text-center min-w-[80px]">
                    <div className="text-xs text-gray-600 mb-1">안전과장</div>
                    <div className="h-12 border-b-2 border-dashed border-gray-300 mb-1"></div>
                    <div className="text-[10px] text-gray-500">(인)</div>
                  </div>
                  <div className="border-2 border-gray-300 rounded-lg p-3 text-center min-w-[80px]">
                    <div className="text-xs text-gray-600 mb-1">소장</div>
                    <div className="h-12 border-b-2 border-dashed border-gray-300 mb-1"></div>
                    <div className="text-[10px] text-gray-500">(인)</div>
                  </div>
                </div>
              </div>

              <div className="pr-[280px]">
                <div className="text-2xl font-bold mb-2">TBM 일지</div>
                <div className="text-sm text-gray-600">
                  날짜: {tbmLog.date} | 현장: {tbmLog.site}
                </div>
              </div>

              {/* 교육 정보 */}
              {tbmLog.education && (
                <div className="border-t pt-4">
                  <div className="font-semibold mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    안전보건교육
                  </div>
                  <div className="ml-7 space-y-2">
                    <div>
                      <span className="font-medium">교육 장소:</span> {tbmLog.education.place}
                    </div>
                    <div>
                      <span className="font-medium">교육 시간:</span> {tbmLog.education.time}
                    </div>
                    <div>
                      <span className="font-medium">참석 인원:</span> {tbmLog.education.attendees}명
                    </div>
                    <div>
                      <span className="font-medium">교육 내용:</span> {tbmLog.education.content}
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  중점위험작업
                </div>
                <div className="ml-7 space-y-2">
                  <div>
                    <span className="font-medium">작업:</span> {tbmLog.focusWork.task}
                  </div>
                  <div>
                    <span className="font-medium">위험요인:</span> {tbmLog.focusWork.risks.join(", ")}
                  </div>
                  <div>
                    <span className="font-medium">안전대책:</span> {tbmLog.focusWork.measures.join(", ")}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  작업 목록
                </div>
                <div className="space-y-4">
                  {tbmLog.workOrders.map((order) => (
                    <div key={order.id} className="ml-7 p-3 bg-gray-50 rounded">
                      <div className="font-medium mb-1">
                        {order.workerName} ({order.team})
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        위치: {order.location} | 작업: {order.task}
                      </div>
                      <div className="text-sm">
                        <div className="mb-1">
                          <span className="font-medium">위험요인:</span> {order.risks.join(", ")}
                        </div>
                        <div>
                          <span className="font-medium">안전대책:</span> {order.measures.join(", ")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 근로자 서명 */}
              <div className="border-t pt-4">
                <div className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  근로자 서명
                </div>
                <div className="ml-7 space-y-3">
                  {tbmLog.signatures.map((sig, idx) => {
                    const order = tbmLog.workOrders.find((o) => o.workerName === sig.workerName);
                    // 서명 이미지 우선순위: riskAssessmentSignatures > order.signature > sig.signature
                    const signatureImage = riskAssessmentSignatures[order?.id || 0] || order?.signature || 
                      (sig.signature && sig.signature.startsWith("data:image") ? sig.signature : null);
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="font-medium mb-1">{sig.workerName}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(sig.timestamp).toLocaleString("ko-KR")}
                          </div>
                        </div>
                        {signatureImage && (
                          <div className="border-2 border-gray-300 rounded p-1 bg-white flex-shrink-0" style={{ width: "120px", height: "50px" }}>
                            <Image 
                              src={signatureImage} 
                              alt={`${sig.workerName} 서명`}
                              width={120}
                              height={50}
                              className="w-full h-full object-contain"
                              unoptimized
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 출력 및 교육 내용 수정 버튼 */}
            <div className="flex gap-3 pt-4 border-t mt-6">
              <Button
                onClick={() => setShowEducationEdit(true)}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <Edit className="w-5 h-5 mr-2" />
                교육 내용 수정
              </Button>
              <Button
                onClick={downloadPDF}
                className="flex-1 bg-safety-navy hover:bg-safety-navy-light"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                출력
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 교육 내용 수정 모달 */}
      {showEducationEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader>
              <CardTitle>교육 내용 수정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">교육 장소</label>
                <input
                  type="text"
                  value={editedEducation.place}
                  onChange={(e) => setEditedEducation({ ...editedEducation, place: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">교육 시간</label>
                <input
                  type="text"
                  value={editedEducation.time}
                  onChange={(e) => setEditedEducation({ ...editedEducation, time: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">참석 인원</label>
                <input
                  type="number"
                  value={editedEducation.attendees}
                  onChange={(e) => setEditedEducation({ ...editedEducation, attendees: parseInt(e.target.value) || 0 })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">교육 내용</label>
                <textarea
                  value={editedEducation.content}
                  onChange={(e) => setEditedEducation({ ...editedEducation, content: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  rows={4}
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowEducationEdit(false)}
                  variant="outline"
                  className="flex-1"
                >
                  취소
                </Button>
                <Button
                  onClick={() => {
                    setTbmLog((prev) => ({ ...prev, education: editedEducation }));
                    setShowEducationEdit(false);
                    alert("교육 내용이 수정되었습니다.");
                  }}
                  className="flex-1 bg-safety-navy hover:bg-safety-navy-light"
                >
                  저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

