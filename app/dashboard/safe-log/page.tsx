"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockWorkOrders, mockSafeLog } from "@/lib/mock-data";
import { FileText, Download, CheckCircle2, MapPin, Clock, AlertCircle } from "lucide-react";

export default function SafeLogPage() {
  const [safeLog, setSafeLog] = useState(mockSafeLog);
  const [completedOrders, setCompletedOrders] = useState(
    mockWorkOrders.filter((order) => order.status === "agreed")
  );
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [hasIssue, setHasIssue] = useState<{ [key: number]: boolean }>({});
  const [issueNotes, setIssueNotes] = useState<{ [key: number]: string }>({});

  const handleWorkComplete = (orderId: number) => {
    const order = completedOrders.find((o) => o.id === orderId);
    if (!order) return;

    // GPS 위치 시뮬레이션 (실제로는 GPS API 사용)
    const gpsLocation = {
      lat: 37.456 + Math.random() * 0.01,
      lng: 126.705 + Math.random() * 0.01,
    };

    const newEntry = {
      workerId: order.workerId,
      workerName: order.workerName,
      workOrderId: order.id,
      task: order.task,
      location: order.location,
      endTime: new Date().toISOString(),
      gpsLocation,
      signature: `서명_${order.workerName}_${Date.now()}`,
      hasIssue: hasIssue[orderId] || false,
      issueNote: issueNotes[orderId] || undefined,
    };

    setSafeLog({
      ...safeLog,
      workers: [...safeLog.workers, newEntry],
    });

    alert(`${order.workerName}님의 작업 종료가 기록되었습니다. 무재해일지에 자동 반영됩니다.`);
  };

  const generateSafeLog = () => {
    if (safeLog.workers.length === 0) {
      alert("작업 종료 기록이 없습니다.");
      return;
    }

    setSafeLog({
      ...safeLog,
      generated: true,
    });

    alert("무재해일지가 생성되었습니다. PDF 다운로드가 가능합니다.");
  };

  const downloadPDF = () => {
    if (!safeLog.generated) {
      alert("먼저 무재해일지를 생성해주세요.");
      return;
    }

    const pdfContent = `
무재해일지
날짜: ${safeLog.date}
현장: ${safeLog.site}

작업 종료 기록:
${safeLog.workers
  .map(
    (worker) => `
${worker.workerName}
- 작업: ${worker.task}
- 위치: ${worker.location}
- 종료 시간: ${new Date(worker.endTime).toLocaleString("ko-KR")}
- GPS 위치: ${worker.gpsLocation.lat.toFixed(6)}, ${worker.gpsLocation.lng.toFixed(6)}
${worker.hasIssue ? `- 특이사항: ${worker.issueNote}` : "- 특이사항: 없음"}
- 서명: ${worker.signature}
`
  )
  .join("\n")}

총 ${safeLog.workers.length}명의 근로자가 안전하게 작업을 완료했습니다.
    `;

    const blob = new Blob([pdfContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `무재해일지_${safeLog.date}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">무재해일지</h1>
        <p className="text-gray-600">작업 종료 시 자동 생성되는 무재해일지</p>
      </div>

      {/* 작업 종료 기록 */}
      <Card>
        <CardHeader>
          <CardTitle>작업 종료 기록</CardTitle>
          <CardDescription>근로자가 작업을 종료하면 위치/시간 데이터와 함께 무재해일지에 자동 반영됩니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                작업 종료 가능한 작업지시서가 없습니다.
              </div>
            ) : (
              completedOrders.map((order) => {
                const isCompleted = safeLog.workers.some((w) => w.workOrderId === order.id);
                return (
                  <div
                    key={order.id}
                    className={`border rounded-lg p-4 ${
                      isCompleted ? "bg-green-50 border-green-200" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold">{order.workerName}</span>
                          {isCompleted && (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          {order.location}
                        </div>
                        <div className="font-medium mb-3">{order.task}</div>

                        {!isCompleted && (
                          <div className="space-y-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={hasIssue[order.id] || false}
                                onChange={(e) => {
                                  setHasIssue({ ...hasIssue, [order.id]: e.target.checked });
                                  if (!e.target.checked) {
                                    setIssueNotes({ ...issueNotes, [order.id]: "" });
                                  }
                                }}
                                className="w-4 h-4"
                              />
                              <span className="text-sm">특이사항 있음</span>
                            </label>
                            {hasIssue[order.id] && (
                              <textarea
                                placeholder="특이사항을 입력하세요"
                                value={issueNotes[order.id] || ""}
                                onChange={(e) =>
                                  setIssueNotes({ ...issueNotes, [order.id]: e.target.value })
                                }
                                className="w-full p-2 border rounded-lg text-sm"
                                rows={2}
                              />
                            )}
                          </div>
                        )}

                        {isCompleted && (
                          <div className="text-sm text-gray-600">
                            <Clock className="w-4 h-4 inline mr-1" />
                            종료 시간:{" "}
                            {new Date(
                              safeLog.workers.find((w) => w.workOrderId === order.id)!.endTime
                            ).toLocaleString("ko-KR")}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        {!isCompleted ? (
                          <Button
                            onClick={() => handleWorkComplete(order.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            작업 종료
                          </Button>
                        ) : (
                          <div className="text-sm text-green-600 font-medium">완료</div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* 무재해일지 생성 */}
      {safeLog.workers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>무재해일지 생성</CardTitle>
            <CardDescription>작업 종료 기록을 바탕으로 무재해일지를 생성합니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <div className="font-semibold mb-1">작업 종료 기록</div>
                  <div className="text-sm text-gray-600">
                    {safeLog.workers.length}건의 작업 종료 기록이 있습니다.
                  </div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>

              {!safeLog.generated ? (
                <Button
                  onClick={generateSafeLog}
                  className="w-full bg-safety-navy hover:bg-safety-navy-light"
                >
                  무재해일지 생성
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-700">무재해일지 생성 완료</span>
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
      )}

      {/* 무재해일지 미리보기 */}
      {safeLog.generated && (
        <Card>
          <CardHeader>
            <CardTitle>무재해일지 미리보기</CardTitle>
            <CardDescription>생성된 무재해일지 내용</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 border rounded-lg p-6 bg-white">
              <div>
                <div className="text-2xl font-bold mb-2">무재해일지</div>
                <div className="text-sm text-gray-600">
                  날짜: {safeLog.date} | 현장: {safeLog.site}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="font-semibold mb-3">작업 종료 기록</div>
                <div className="space-y-3">
                  {safeLog.workers.map((worker, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded">
                      <div className="font-medium mb-1">{worker.workerName}</div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>작업: {worker.task}</div>
                        <div>위치: {worker.location}</div>
                        <div>
                          종료 시간: {new Date(worker.endTime).toLocaleString("ko-KR")}
                        </div>
                        <div>
                          GPS 위치: {worker.gpsLocation.lat.toFixed(6)},{" "}
                          {worker.gpsLocation.lng.toFixed(6)}
                        </div>
                        {worker.hasIssue && (
                          <div className="text-red-600">
                            <AlertCircle className="w-4 h-4 inline mr-1" />
                            특이사항: {worker.issueNote}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="text-center text-lg font-semibold text-green-600">
                  총 {safeLog.workers.length}명의 근로자가 안전하게 작업을 완료했습니다.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

