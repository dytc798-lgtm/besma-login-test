"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockWorkOrders } from "@/lib/mock-data";
import { AlertTriangle, CheckCircle2, FileText, Search } from "lucide-react";

export default function RiskManagementPage() {
  const [workOrders] = useState(mockWorkOrders);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = workOrders.filter(
    (order) =>
      order.workerName.includes(searchTerm) ||
      order.task.includes(searchTerm) ||
      order.location.includes(searchTerm)
  );

  const handleAgree = (orderId: number) => {
    const order = workOrders.find((o) => o.id === orderId);
    if (!order) return;

    if (confirm(`${order.workerName}님의 위험성평가에 동의하시겠습니까?`)) {
      alert("동의가 완료되었습니다. TBM 일지 생성이 준비되었습니다.");
      // 실제로는 상태 업데이트 및 TBM 일지 생성 트리거
    }
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
                  className={`border rounded-lg p-4 ${
                    selectedOrder === order.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                  }`}
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
                      <div className="text-sm text-gray-600 mb-2">{order.location}</div>
                      <div className="font-medium mb-3">{order.task}</div>

                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-red-600 mb-1">
                            <AlertTriangle className="w-4 h-4" />
                            위험요인
                          </div>
                          <ul className="list-disc list-inside text-sm text-gray-700 ml-6">
                            {order.risks.map((risk, idx) => (
                              <li key={idx}>{risk}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-green-600 mb-1">
                            <CheckCircle2 className="w-4 h-4" />
                            안전대책
                          </div>
                          <ul className="list-disc list-inside text-sm text-gray-700 ml-6">
                            {order.measures.map((measure, idx) => (
                              <li key={idx}>{measure}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      {order.status === "pending" ? (
                        <Button
                          onClick={() => {
                            setSelectedOrder(order.id);
                            handleAgree(order.id);
                          }}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          동의
                        </Button>
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
    </div>
  );
}

