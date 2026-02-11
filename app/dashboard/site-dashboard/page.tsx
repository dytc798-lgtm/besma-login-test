"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Users, 
  Cloud, 
  FileCheck, 
  CheckCircle2, 
  Clock,
  AlertCircle,
  Sun,
  CloudRain,
  Wind
} from "lucide-react";

// Mock 데이터
const mockWorkers = [
  { id: 1, name: "홍길동", team: "전기 1팀", location: { lat: 37.456, lng: 126.705 }, status: "작업중" },
  { id: 2, name: "김철수", team: "전기 2팀", location: { lat: 37.457, lng: 126.706 }, status: "작업중" },
  { id: 3, name: "이영희", team: "전기 3팀", location: { lat: 37.458, lng: 126.707 }, status: "휴식" },
  { id: 4, name: "박민수", team: "전기 1팀", location: { lat: 37.455, lng: 126.704 }, status: "작업중" },
];

const mockWorkOrders = [
  { id: 1, task: "전기 배선 작업", worker: "홍길동", status: "확인완료", time: "09:00" },
  { id: 2, task: "조명 설치", worker: "김철수", status: "확인완료", time: "09:15" },
  { id: 3, task: "전기 패널 점검", worker: "이영희", status: "대기중", time: "-" },
  { id: 4, task: "케이블 배선", worker: "박민수", status: "확인완료", time: "09:30" },
];

const mockWorkPermits = [
  { id: 1, type: "고소작업", location: "102동 3층", status: "승인완료", date: "2024-01-22" },
  { id: 2, type: "화기작업", location: "103동 지하1층", status: "승인대기", date: "2024-01-22" },
  { id: 3, type: "밀폐공간", location: "101동 지하2층", status: "상신완료", date: "2024-01-22" },
];

export default function SiteDashboardPage() {
  const [selectedSite] = useState("인천1구역");
  const todayWorkers = 1024; // 금일 현장 출역인원

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">현장 대시보드</h1>
        <p className="text-gray-600">현장 실시간 현황 및 작업 관리</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 왼쪽: 지도 및 근로자 위치 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 현장 지도 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                현장 지도 (GIS Map)
              </CardTitle>
              <CardDescription>근로자 실시간 위치 표시</CardDescription>
            </CardHeader>
            <CardContent>
              {/* 지도 영역 (Mock) */}
              <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300">
                {/* 배경 지도 이미지 또는 색상 */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
                  {/* 현장 건물 표시 */}
                  <div className="absolute top-10 left-10 w-32 h-32 bg-gray-400 rounded opacity-50"></div>
                  <div className="absolute top-20 right-20 w-24 h-24 bg-gray-400 rounded opacity-50"></div>
                  <div className="absolute bottom-20 left-1/3 w-28 h-28 bg-gray-400 rounded opacity-50"></div>
                  
                  {/* 근로자 위치 마커 */}
                  {mockWorkers.map((worker) => (
                    <div
                      key={worker.id}
                      className="absolute"
                      style={{
                        left: `${(worker.location.lat - 37.454) * 10000}%`,
                        top: `${(worker.location.lng - 126.703) * 10000}%`,
                      }}
                    >
                      <div className="relative">
                        <div className={`w-8 h-8 rounded-full border-2 border-white ${
                          worker.status === "작업중" ? "bg-green-500" : "bg-yellow-500"
                        } animate-pulse`}></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded">
                          {worker.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 범례 */}
                <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg">
                  <div className="text-xs font-semibold mb-2">범례</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <span>작업중</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                      <span>휴식</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 근로자 목록 */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {mockWorkers.map((worker) => (
                  <div key={worker.id} className="p-2 bg-gray-50 rounded-lg text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        worker.status === "작업중" ? "bg-green-500" : "bg-yellow-500"
                      }`}></div>
                      <span className="font-medium">{worker.name}</span>
                      <span className="text-gray-500 text-xs">({worker.team})</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 작업지시 확인 상황 */}
          <Card>
            <CardHeader>
              <CardTitle>작업지시 확인 상황</CardTitle>
              <CardDescription>오늘의 작업지시 확인 현황</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockWorkOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{order.task}</div>
                      <div className="text-sm text-gray-600">{order.worker}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      {order.status === "확인완료" ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="text-sm text-green-600 font-medium">{order.status}</span>
                          <span className="text-xs text-gray-500">{order.time}</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-5 h-5 text-yellow-600" />
                          <span className="text-sm text-yellow-600 font-medium">{order.status}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽: 날씨, 출역인원, 작업허가서 */}
        <div className="space-y-6">
          {/* 날씨 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="w-5 h-5" />
                날씨 정보
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sun className="w-8 h-8 text-yellow-500" />
                    <div>
                      <div className="text-2xl font-bold">15°C</div>
                      <div className="text-sm text-gray-600">맑음</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">습도</div>
                    <div className="font-semibold">65%</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">풍속</div>
                    <div className="font-semibold">3.2 m/s</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">강수확률</div>
                    <div className="font-semibold">10%</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded">
                    <div className="text-gray-600">체감온도</div>
                    <div className="font-semibold">13°C</div>
                  </div>
                </div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-xs text-blue-700">
                    ⚠️ 오후 3시 이후 강풍 예보 (작업 중단 권고)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 금일 현장 출역인원 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                금일 현장 출역인원
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-safety-navy mb-2">
                  {todayWorkers.toLocaleString()}명
                </div>
                <div className="text-sm text-gray-600">
                  {selectedSite} 기준
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>작업중</span>
                    <span className="font-semibold text-green-600">856명</span>
                  </div>
                  <div className="flex justify-between">
                    <span>휴식</span>
                    <span className="font-semibold text-yellow-600">128명</span>
                  </div>
                  <div className="flex justify-between">
                    <span>대기</span>
                    <span className="font-semibold text-gray-600">40명</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 작업허가서 현황 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="w-5 h-5" />
                작업허가서 현황
              </CardTitle>
              <CardDescription>오늘의 작업허가서 승인 현황</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockWorkPermits.map((permit) => (
                  <div key={permit.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{permit.type}</div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        permit.status === "승인완료" 
                          ? "bg-green-100 text-green-700"
                          : permit.status === "승인대기"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {permit.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{permit.location}</div>
                    <div className="text-xs text-gray-500 mt-1">{permit.date}</div>
                  </div>
                ))}
                <Button 
                  className="w-full mt-2" 
                  variant="outline"
                  onClick={() => window.location.href = "/dashboard/work-permit"}
                >
                  작업허가서 전체 보기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
