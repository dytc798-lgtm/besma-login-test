"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MobileView from "@/components/MobileView";
import { mockWorkOrders } from "@/lib/mock-data";
import { AlertTriangle, CheckCircle2, FileText, Search, Smartphone, MapPin } from "lucide-react";

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

export default function RiskManagementPage() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(mockWorkOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobile, setShowMobile] = useState(false);
  const [selectedWorkOrderId, setSelectedWorkOrderId] = useState<number | null>(null);

  const filteredOrders = workOrders.filter(
    (order) =>
      order.workerName.includes(searchTerm) ||
      order.task.includes(searchTerm) ||
      order.location.includes(searchTerm)
  );

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
        <h1 className="text-2xl font-bold text-safety-navy mb-2">위험 관리</h1>
        <p className="text-gray-600">근로자 위험성평가 확인 및 동의 관리</p>
      </div>

      {/* 검색 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="근로자명, 작업명, 위치로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 위험성평가 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>근로자 위험성평가 확인 대기</CardTitle>
          <CardDescription>작업 내용 및 위험요인을 확인하고 동의해주세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                확인 대기 중인 위험성평가가 없습니다.
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold">{order.workerName}</span>
                        <span className="text-sm text-gray-500">({order.team})</span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "agreed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status === "agreed" ? "동의 완료" : "대기중"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        {order.location}
                      </div>
                      <div className="font-medium mb-3">{order.task}</div>
                    </div>
                    <div className="ml-4 flex flex-col gap-2">
                      {order.status === "pending" ? (
                        <>
                          <Button
                            onClick={() => openMobileView(order.id)}
                            variant="outline"
                            className="border-blue-500 text-blue-600 hover:bg-blue-50"
                          >
                            <Smartphone className="w-4 h-4 mr-1" />
                            앱에서 확인
                          </Button>
                          <Button
                            onClick={() => handleAgree(order.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            동의
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="text-sm">동의 완료</span>
                        </div>
                      )}
                    </div>
                  </div>
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
        title="위험성평가 확인"
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

