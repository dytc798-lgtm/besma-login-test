"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockWorkOrders, mockTBMLog } from "@/lib/mock-data";
import { FileText, Download, CheckCircle2, Users, AlertTriangle } from "lucide-react";

export default function TBMPage() {
  const [tbmLog, setTbmLog] = useState(mockTBMLog);
  const [agreedOrders, setAgreedOrders] = useState(
    mockWorkOrders.filter((order) => order.status === "agreed")
  );

  // 동의 완료된 작업지시서를 TBM 일지에 반영
  useEffect(() => {
    if (agreedOrders.length > 0 && !tbmLog.generated) {
      setTbmLog((prev) => ({
        ...prev,
        workOrders: agreedOrders,
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

    setTbmLog({
      ...tbmLog,
      workOrders: agreedOrders,
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

중점위험작업 (교육)
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
            <div className="space-y-6 border rounded-lg p-6 bg-white">
              <div>
                <div className="text-2xl font-bold mb-2">TBM 일지</div>
                <div className="text-sm text-gray-600">
                  날짜: {tbmLog.date} | 현장: {tbmLog.site}
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="font-semibold mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  중점위험작업 (교육)
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

              <div className="border-t pt-4">
                <div className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  서명
                </div>
                <div className="ml-7 space-y-2">
                  {tbmLog.signatures.map((sig, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="font-medium">{sig.workerName}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(sig.timestamp).toLocaleString("ko-KR")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

