"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MobileView from "@/components/MobileView";
import { mockWorkLog, mockWorkOrders } from "@/lib/mock-data";
import { FileText, CheckCircle2, Clock, MapPin, User, AlertTriangle, Smartphone, Navigation } from "lucide-react";

type WorkOrder = {
  id: number;
  date: string;
  workerId: number;
  workerName: string;
  team: string;
  location: string;
  task: string;
  risks: string[];
  measures: string[];
  status: "pending" | "agreed" | "completed";
  agreedAt: string | null;
  signature: string | null;
};

export default function WorkManagementPage() {
  const [selectedDate] = useState("2024-01-20");
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(mockWorkOrders);
  const [showWorkOrderDetail, setShowWorkOrderDetail] = useState<number | null>(null);
  const [showMobile, setShowMobile] = useState(false);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState<number | null>(null);

  // 작업일보에서 개인별 작업지시서 생성
  const generateWorkOrder = (taskId: number) => {
    const task = mockWorkLog.tasks.find((t) => t.id === taskId);
    if (!task) return;

    const newWorkOrder = {
      id: workOrders.length + 1,
      date: selectedDate,
      workerId: task.id,
      workerName: task.worker,
      team: task.team,
      location: task.location,
      task: task.task,
      risks: ["작업 환경에 따른 위험요인 자동 매칭"],
      measures: ["표준 안전 수칙 준수"],
      status: "pending" as const,
      agreedAt: null,
      signature: null,
    };

    setWorkOrders([...workOrders, newWorkOrder]);
    alert(`${task.worker}님의 작업지시서가 생성되었습니다.`);
  };

  const handleAgree = (orderId: number) => {
    const updatedOrders = workOrders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: "agreed" as const,
            agreedAt: new Date().toISOString(),
            signature: `서명_${order.workerName}_${Date.now()}`,
          }
        : order
    );
    setWorkOrders(updatedOrders);
    
    // TBM 페이지에 업데이트 알림
    if (typeof window !== "undefined") {
      const event = new CustomEvent("workOrderUpdate", {
        detail: { orderId, status: "agreed" }
      });
      window.dispatchEvent(event);
    }
    
    setShowMobile(false);
    setSelectedWorkOrderId(null);
    alert("위험성평가에 동의하셨습니다. TBM 일지 생성이 준비되었습니다.");
  };

  const openMobileView = (orderId: number) => {
    setSelectedWorkOrderId(orderId);
    setShowMobile(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">작업 관리</h1>
        <p className="text-gray-600">작업일보 기반 작업지시서 생성 및 관리</p>
      </div>

      {/* 작업일보 섹션 */}
      <Card>
        <CardHeader>
          <CardTitle>작업일보 - {selectedDate}</CardTitle>
          <CardDescription>{mockWorkLog.site} ({mockWorkLog.siteCode})</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">금일 작업 목록</h3>
              <div className="space-y-3">
                {mockWorkLog.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{task.worker}</span>
                        <span className="text-sm text-gray-500">({task.team})</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{task.location}</span>
                      </div>
                      <div className="mt-1 text-sm font-medium">{task.task}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => generateWorkOrder(task.id)}
                        size="sm"
                        className="bg-safety-navy hover:bg-safety-navy-light"
                      >
                        작업지시서 생성
                      </Button>
                      {workOrders.find((o) => o.workerId === task.id && o.status === "pending") && (
                        <Button
                          onClick={() => {
                            const order = workOrders.find((o) => o.workerId === task.id);
                            if (order) openMobileView(order.id);
                          }}
                          size="sm"
                          variant="outline"
                          className="border-blue-500 text-blue-600 hover:bg-blue-50"
                        >
                          <Smartphone className="w-4 h-4 mr-1" />
                          앱에서 확인
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 작업 진행 현황 */}
      <Card>
        <CardHeader>
          <CardTitle>작업 진행 현황</CardTitle>
          <CardDescription>현재 진행 중인 작업 및 완료된 작업 히스토리</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* 진행 중인 작업 */}
            {workOrders.filter((o) => o.status === "agreed").length > 0 && (
              <div>
                <div className="text-sm font-semibold text-blue-600 mb-2">진행 중인 작업</div>
                <div className="space-y-2">
                  {workOrders
                    .filter((o) => o.status === "agreed")
                    .map((order) => (
                      <div key={order.id} className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{order.task}</div>
                            <div className="text-xs text-gray-600 mt-1">
                              {order.workerName} · {order.location}
                            </div>
                            <div className="text-xs text-blue-600 mt-1">
                              서명 시간: {order.agreedAt && new Date(order.agreedAt).toLocaleString("ko-KR")}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => {
                                const mockLocation = {
                                  lat: 37.456 + Math.random() * 0.01,
                                  lng: 126.705 + Math.random() * 0.01,
                                  timestamp: new Date().toLocaleString("ko-KR"),
                                };
                                alert(
                                  `실시간 위치 확인\n\n` +
                                  `근로자: ${order.workerName}\n` +
                                  `작업: ${order.task}\n` +
                                  `위치: ${mockLocation.lat.toFixed(6)}, ${mockLocation.lng.toFixed(6)}\n` +
                                  `확인 시간: ${mockLocation.timestamp}\n\n` +
                                  `(시연용 가상 위치 데이터)`
                                );
                              }}
                              size="sm"
                              variant="outline"
                              className="border-blue-500 text-blue-600 hover:bg-blue-50"
                            >
                              <Navigation className="w-4 h-4 mr-1" />
                              실시간 위치 확인
                            </Button>
                            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                              진행중...
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 완료된 작업 히스토리 */}
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-2">완료된 작업</div>
              <div className="space-y-2">
                {workOrders.filter((o) => o.status === "completed").length > 0 ? (
                  workOrders
                    .filter((o) => o.status === "completed")
                    .map((order) => (
                      <div key={order.id} className="p-3 border rounded-lg bg-gray-50">
                        <div className="font-semibold text-sm">{order.task}</div>
                        <div className="text-xs text-gray-600">{order.workerName} · 완료</div>
                      </div>
                    ))
                ) : (
                  <>
                    <div className="p-3 border rounded-lg bg-gray-50">
                      <div className="font-semibold text-sm">2024-01-19 - 조명 배선 작업</div>
                      <div className="text-xs text-gray-600">김철수 · 완료</div>
                    </div>
                    <div className="p-3 border rounded-lg bg-gray-50">
                      <div className="font-semibold text-sm">2024-01-18 - 전기실 입선 작업</div>
                      <div className="text-xs text-gray-600">이영희 · 완료</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 개인별 작업지시서 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>금일 개인별 작업지시서</CardTitle>
          <CardDescription>생성된 작업지시서 목록 및 확인 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                아직 생성된 작업지시서가 없습니다. 위 작업일보에서 작업지시서를 생성해주세요.
              </div>
            ) : (
              workOrders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setShowWorkOrderDetail(showWorkOrderDetail === order.id ? null : order.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold">{order.workerName}</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "agreed"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status === "agreed"
                            ? "진행중..."
                            : order.status === "completed"
                            ? "작업 완료"
                            : "대기중"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        {order.location}
                      </div>
                      <div className="font-medium">{order.task}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          openMobileView(order.id);
                        }}
                        size="sm"
                        variant="outline"
                        className="border-blue-500 text-blue-600 hover:bg-blue-50"
                        disabled={order.status === "completed"}
                      >
                        <Smartphone className="w-4 h-4 mr-1" />
                        앱에서 확인
                      </Button>
                      {order.status === "pending" && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAgree(order.id);
                          }}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          위험성평가 확인
                        </Button>
                      )}
                      {order.status === "agreed" && (
                        <>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              // 실시간 위치 확인 기능 (시연용)
                              const mockLocation = {
                                lat: 37.456 + Math.random() * 0.01,
                                lng: 126.705 + Math.random() * 0.01,
                                timestamp: new Date().toLocaleString("ko-KR"),
                              };
                              alert(
                                `실시간 위치 확인\n\n` +
                                `근로자: ${order.workerName}\n` +
                                `위치: ${mockLocation.lat.toFixed(6)}, ${mockLocation.lng.toFixed(6)}\n` +
                                `확인 시간: ${mockLocation.timestamp}\n\n` +
                                `(시연용 가상 위치 데이터)`
                              );
                            }}
                            size="sm"
                            variant="outline"
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                          >
                            <Navigation className="w-4 h-4 mr-1" />
                            실시간 위치 확인
                          </Button>
                          <CheckCircle2 className="w-5 h-5 text-blue-600" />
                        </>
                      )}
                      {order.status === "completed" && (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </div>

                  {showWorkOrderDetail === order.id && (
                    <div className="mt-4 pt-4 border-t space-y-3">
                      <div>
                        <div className="font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          위험요인
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {order.risks.map((risk, idx) => (
                            <li key={idx}>{risk}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="font-semibold mb-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          안전대책
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {order.measures.map((measure, idx) => (
                            <li key={idx}>{measure}</li>
                          ))}
                        </ul>
                      </div>
                      {order.signature && (
                        <div className="text-xs text-gray-500">
                          서명 완료: {new Date(order.agreedAt!).toLocaleString("ko-KR")}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* 가상 핸드폰 화면 - 개인별 작업지시서 위험성평가 확인 */}
      <MobileView
        isOpen={showMobile}
        onClose={() => {
          setShowMobile(false);
          setSelectedWorkOrderId(null);
        }}
        title="작업지시서 확인"
      >
        {selectedWorkOrderId && (() => {
          const order = workOrders.find((o) => o.id === selectedWorkOrderId);
          if (!order) return null;

          return (
            <div className="p-4 space-y-4">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                <div className="font-semibold mb-2">개인별 작업지시서</div>
                <div className="text-sm text-gray-600 mb-1">{order.date}</div>
                <div className="text-sm font-medium">{order.workerName} ({order.team})</div>
              </div>

              <div className="border rounded-xl p-4">
                <div className="font-semibold mb-2">{order.task}</div>
                <div className="text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  {order.location}
                </div>

                <div className="mb-4">
                  <div className="text-xs font-semibold text-red-600 mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    위험요인
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1 ml-5">
                    {order.risks.map((risk, idx) => (
                      <li key={idx} className="list-disc">{risk}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <div className="text-xs font-semibold text-green-600 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    안전대책
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1 ml-5">
                    {order.measures.map((measure, idx) => (
                      <li key={idx} className="list-disc">{measure}</li>
                    ))}
                  </ul>
                </div>

                {order.status === "pending" && (
                  <Button
                    onClick={() => handleAgree(order.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    위험성평가 확인 및 서명
                  </Button>
                )}

                {order.status === "agreed" && (
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <div className="text-sm font-semibold text-green-700">동의 완료</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {order.agreedAt && new Date(order.agreedAt).toLocaleString("ko-KR")}
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700 text-center">
                      작업 종료는 근로자 앱에서 진행하세요
                    </div>
                  </div>
                )}

                <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
                  서명 완료 시 TBM 일지로 자동 연동됩니다.
                </div>
              </div>
            </div>
          );
        })()}
      </MobileView>
    </div>
  );
}

