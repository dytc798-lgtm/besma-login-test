"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MobileView from "@/components/MobileView";
import { mockWorkLog, mockWorkOrders } from "@/lib/mock-data";
import { FileText, CheckCircle2, Clock, MapPin, User, AlertTriangle, Smartphone } from "lucide-react";

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
    setWorkOrders(
      workOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: "agreed",
              agreedAt: new Date().toISOString(),
              signature: `서명_${order.workerName}_${Date.now()}`,
            }
          : order
      )
    );
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">교육 장소</div>
                <div className="font-medium">{mockWorkLog.education.place}</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">교육 시간</div>
                <div className="font-medium">{mockWorkLog.education.time}</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">참석 인원</div>
                <div className="font-medium">{mockWorkLog.education.attendees}명</div>
              </div>
            </div>

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

      {/* 작업 진행 현황 히스토리 */}
      <Card>
        <CardHeader>
          <CardTitle>작업 진행 현황</CardTitle>
          <CardDescription>이전 완료된 작업에 대한 히스토리</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="p-3 border rounded-lg bg-gray-50">
              <div className="font-semibold text-sm">2024-01-19 - 조명 배선 작업</div>
              <div className="text-xs text-gray-600">김철수 · 완료</div>
            </div>
            <div className="p-3 border rounded-lg bg-gray-50">
              <div className="font-semibold text-sm">2024-01-18 - 전기실 입선 작업</div>
              <div className="text-xs text-gray-600">이영희 · 완료</div>
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
                              ? "bg-green-100 text-green-700"
                              : order.status === "completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status === "agreed"
                            ? "동의 완료"
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
                      {order.status === "pending" && (
                        <>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              openMobileView(order.id);
                            }}
                            size="sm"
                            variant="outline"
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                          >
                            <Smartphone className="w-4 h-4 mr-1" />
                            앱에서 확인
                          </Button>
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
                        </>
                      )}
                      {order.status === "agreed" && (
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
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm font-semibold text-green-700">동의 완료</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {order.agreedAt && new Date(order.agreedAt).toLocaleString("ko-KR")}
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

