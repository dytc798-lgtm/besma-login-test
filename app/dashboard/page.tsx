"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  GraduationCap,
  Heart,
  Settings,
  MapPin,
  Flame,
  Cloud,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  Users,
  Shield,
} from "lucide-react";
import {
  mockSites,
  mockAlerts,
  mockPTW,
  mockEquipment,
  mockWeather,
  mockEducation,
  mockTBM,
  mockFeedback,
  mockContractors,
  mockRiskAssessment,
} from "@/lib/mock-data";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import MapView from "./components/MapView";
import WeatherAlert from "./components/WeatherAlert";

const menuItems = [
  { id: "dashboard", label: "대시보드", icon: LayoutDashboard },
  { id: "work", label: "작업 관리", icon: ClipboardList },
  { id: "risk", label: "위험 관리", icon: AlertTriangle },
  { id: "education", label: "안전 교육", icon: GraduationCap },
  { id: "health", label: "보건 관리", icon: Heart },
  { id: "settings", label: "설정", icon: Settings },
];

export default function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const contractorColors = {
    S: "#22c55e",
    A: "#3b82f6",
    B: "#f59e0b",
    C: "#ef4444",
  };

  const contractorData = mockContractors.map((item) => ({
    name: `${item.grade}등급`,
    value: item.count,
    fill: contractorColors[item.grade as keyof typeof contractorColors],
  }));

  const equipmentData = mockEquipment.map((item) => ({
    name: item.name,
    status: item.check ? "제출" : "미제출",
    value: item.check ? 1 : 0,
  }));

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-safety-navy text-white flex-col">
        <div className="p-6 border-b border-safety-navy-light">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm">BESMA SAFETY</div>
              <div className="text-xs text-gray-400">안전보건 통합 플랫폼</div>
            </div>
          </div>
          <div className="text-xs bg-safety-navy-light px-2 py-1 rounded-full inline-block">Demo</div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeMenu === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-safety-navy-light"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-safety-navy-light text-xs text-gray-400">
          <div className="flex justify-between mb-2">
            <span>오늘 활동</span>
            <span className="px-2 py-0.5 bg-green-600 text-white rounded-full text-[10px]">LIVE</span>
          </div>
          <div className="flex gap-1">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i >= 3 ? "bg-orange-500" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b px-4 md:px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-lg md:text-xl font-bold text-safety-navy">본사 대시보드</h1>
            <p className="text-xs md:text-sm text-gray-500">전사 안전보건 현황 및 주요 알림을 한눈에 확인합니다.</p>
          </div>
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
            <select className="text-sm border rounded-md px-3 py-1.5 bg-white">
              <option>KR</option>
              <option>EN</option>
              <option>VN</option>
              <option>CH</option>
            </select>
            <div className="text-sm text-gray-600">
              오늘 무재해 <strong className="text-safety-navy">128</strong>일
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              B
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Left Column - Map and KPIs */}
            <div className="lg:col-span-2 space-y-6">
              {/* GIS Map */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>실시간 현장 현황 (GIS Map)</CardTitle>
                      <CardDescription>배경에 지도가 있고 현장 위치에 핀(Pin) 표시</CardDescription>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">실시간 관제</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <MapView sites={mockSites} />

                  {/* KPIs */}
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-safety-navy text-white p-4 rounded-lg">
                      <div className="text-xs text-gray-300 mb-1">무재해 달성률</div>
                      <div className="text-2xl font-bold mb-2">96.4%</div>
                      <div className="text-xs text-gray-300">목표 98% / 전일 대비 ▲0.8%</div>
                    </div>
                    <div className="bg-safety-navy text-white p-4 rounded-lg">
                      <div className="text-xs text-gray-300 mb-1">전국 현장 수</div>
                      <div className="text-2xl font-bold mb-2">124개소</div>
                      <div className="text-xs text-gray-300">신규 3개 · 준공 임박 5개</div>
                    </div>
                    <div className="bg-safety-navy text-white p-4 rounded-lg">
                      <div className="text-xs text-gray-300 mb-1">오늘 위험요인 신고</div>
                      <div className="text-2xl font-bold mb-2 text-orange-300">14건</div>
                      <div className="text-xs text-gray-300">조치 완료 9건 · 진행중 5건</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* PTW Approval */}
              <Card>
                <CardHeader>
                  <CardTitle>작업 허가(PTW) 승인 대기</CardTitle>
                  <CardDescription>화기/밀폐/고소 작업 등 승인이 필요한 건수</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockPTW.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Flame className="w-5 h-5 text-red-600" />
                          <span className="font-medium">{item.type}</span>
                        </div>
                        <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {item.count}건
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Equipment Status */}
              <Card>
                <CardHeader>
                  <CardTitle>오늘의 고위험 장비 현황</CardTitle>
                  <CardDescription>크레인, 지게차, 고소작업대 가동 현황 및 사전 점검표 제출 여부</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={equipmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {mockEquipment.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={item.check ? "text-green-600" : "text-red-600"}>
                            {item.check ? "제출" : "미제출"}
                          </span>
                          {!item.check && <AlertCircle className="w-4 h-4 text-red-600" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Weather & Health */}
              <Card>
                <CardHeader>
                  <CardTitle>근로자 건강 & 기상 모니터링</CardTitle>
                  <CardDescription>현재 날씨 및 건강 알림</CardDescription>
                </CardHeader>
                <CardContent>
                  <WeatherAlert
                    condition={mockWeather.condition}
                    temperature={mockWeather.temperature}
                    alert={mockWeather.alert}
                  />
                </CardContent>
              </Card>

              {/* Education & TBM */}
              <Card>
                <CardHeader>
                  <CardTitle>교육 및 TBM 이행률</CardTitle>
                  <CardDescription>오늘 예정된 교육 대비 참석 서명 완료율</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>안전 교육</span>
                        <span className="font-medium">{mockEducation.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full transition-all"
                          style={{ width: `${mockEducation.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {mockEducation.completed}/{mockEducation.scheduled} 완료
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>TBM 이행률</span>
                        <span className="font-medium">{mockTBM.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full transition-all"
                          style={{ width: `${mockTBM.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {mockTBM.completed}/{mockTBM.scheduled} 완료
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback Loop */}
              <Card>
                <CardHeader>
                  <CardTitle>안전 신문고</CardTitle>
                  <CardDescription>접수, 조치중, 조치완료 상태</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockFeedback.map((item) => (
                      <div key={item.id} className="p-3 border rounded-lg text-sm">
                        <div className="font-medium mb-1">{item.title}</div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{item.date}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              item.status === "조치완료"
                                ? "bg-green-100 text-green-700"
                                : item.status === "조치중"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contractor Evaluation */}
              <Card>
                <CardHeader>
                  <CardTitle>협력사 평가 현황</CardTitle>
                  <CardDescription>이번 달 S/A/B/C 등급 업체 비율</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={contractorData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {contractorData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  {mockContractors.find((c) => c.grade === "C") && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                      ⚠️ C등급 업체 진입 시 경고 모달 표시
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle>위험성 평가 현황</CardTitle>
                  <CardDescription>현장별 평가 진행률 및 조치율</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockRiskAssessment.map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.label}</span>
                          <span className="font-medium">{item.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              item.value >= 90
                                ? "bg-green-600"
                                : item.value >= 70
                                ? "bg-yellow-600"
                                : "bg-red-600"
                            }`}
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

