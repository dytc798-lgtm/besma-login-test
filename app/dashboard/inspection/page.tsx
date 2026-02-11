"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockInspectionPlans, mockEducationPlans } from "@/lib/mock-data";
import type { InspectionPlan, EducationPlan } from "@/lib/mock-data";
import { Calendar, CheckCircle2, XCircle, Clock, Building2, AlertCircle, Search, X } from "lucide-react";

export default function InspectionPage() {
  const [viewMode, setViewMode] = useState<"yearly" | "monthly">("monthly");
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0, 1)); // 2024년 1월
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<InspectionPlan | null>(null);
  const [showEducationRequestModal, setShowEducationRequestModal] = useState(false);
  const [educationPlans, setEducationPlans] = useState(mockEducationPlans);

  // 현재 월의 점검 계획 필터링
  const currentMonthPlans = mockInspectionPlans.filter((plan) => {
    const planDate = new Date(plan.date);
    return (
      planDate.getFullYear() === currentMonth.getFullYear() &&
      planDate.getMonth() === currentMonth.getMonth()
    );
  });

  // 현재 월의 교육 계획도 함께 표시
  const currentMonthEducations = educationPlans.filter((plan) => {
    const planDate = new Date(plan.date);
    return (
      planDate.getFullYear() === currentMonth.getFullYear() &&
      planDate.getMonth() === currentMonth.getMonth()
    );
  });

  // 날짜별로 그룹화
  const plansByDate: { [key: string]: { inspections: InspectionPlan[]; educations: typeof mockEducationPlans } } = {};
  
  currentMonthPlans.forEach((item) => {
    const date = item.date;
    if (!plansByDate[date]) {
      plansByDate[date] = { inspections: [], educations: [] };
    }
    plansByDate[date].inspections.push(item);
  });

  currentMonthEducations.forEach((item) => {
    const date = item.date;
    if (!plansByDate[date]) {
      plansByDate[date] = { inspections: [], educations: [] };
    }
    plansByDate[date].educations.push(item);
  });

  // 캘린더 생성
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

  const handleDateClick = (day: number) => {
    if (!day) return;
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    
    // 22일 클릭 시 교육 요청 모달 표시
    if (day === 22) {
      setShowEducationRequestModal(true);
      return;
    }
    
    setSelectedDate(dateStr);
    
    const plan = currentMonthPlans.find((p) => p.date === dateStr);
    if (plan) {
      setSelectedPlan(plan);
    } else {
      setSelectedPlan(null);
    }
  };

  const handleApproveEducation = () => {
    // 22일의 교육 계획을 확정 상태로 변경하고 날짜를 25일로 변경
    const targetDate = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-22`;
    const newDate = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-25`;
    
    setEducationPlans(prev => prev.map(plan => 
      plan.date === targetDate 
        ? { ...plan, date: newDate, status: "확정" as const, siteManagerComment: null }
        : plan
    ));
    setShowEducationRequestModal(false);
    alert("교육 일정이 확정되었습니다. (2024-01-25로 변경)");
  };

  const handleRejectEducation = () => {
    setShowEducationRequestModal(false);
    alert("교육 요청이 반려되었습니다.");
  };

  const getDateStatus = (day: number): "normal" | "confirmed" | "rejected" => {
    if (!day) return "normal";
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const plan = currentMonthPlans.find((p) => p.date === dateStr);
    if (plan) {
      if (plan.status === "확정") return "confirmed";
      if (plan.status === "불가") return "rejected";
    }
    return "normal";
  };

  const getInspectionTypeColor = (type: string) => {
    switch (type) {
      case "본사안전점검":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "현장자체점검":
        return "bg-green-100 text-green-700 border-green-300";
      case "특별점검":
        return "bg-orange-100 text-orange-700 border-orange-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">점검계획</h1>
        <p className="text-gray-600">연간점검계획 및 월별 점검계획 관리</p>
      </div>

      {/* 뷰 모드 선택 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Button
              variant={viewMode === "yearly" ? "default" : "outline"}
              onClick={() => setViewMode("yearly")}
            >
              연간계획
            </Button>
            <Button
              variant={viewMode === "monthly" ? "default" : "outline"}
              onClick={() => setViewMode("monthly")}
            >
              월계획
            </Button>
          </div>
        </CardContent>
      </Card>

      {viewMode === "monthly" && (
        <>
          {/* 월 선택 */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
                  }}
                >
                  이전 달
                </Button>
                <div className="text-xl font-bold">
                  {currentMonth.getFullYear()}년 {monthNames[currentMonth.getMonth()]}
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
                  }}
                >
                  다음 달
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 캘린더 - 한 화면에 크게 표시 */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>점검 및 교육 계획 캘린더</CardTitle>
              <CardDescription>날짜를 클릭하여 상세 정보를 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                  <div key={day} className="text-center text-base font-semibold text-gray-700 py-3">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const dayPlans = plansByDate[dateStr];
                  const status = getDateStatus(day);
                  const isSelected = selectedDate === dateStr;
                  const isDay22 = day === 22;

                  return (
                    <div
                      key={day}
                      onClick={() => handleDateClick(day)}
                      className={`aspect-square border-2 rounded-lg p-2 cursor-pointer transition-all ${
                        isSelected
                          ? "ring-2 ring-blue-500 bg-blue-50"
                          : status === "rejected"
                          ? "border-red-300 bg-red-50"
                          : status === "confirmed"
                          ? "border-green-300 bg-green-50"
                          : isDay22
                          ? "border-orange-400 bg-orange-50 animate-pulse"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`text-sm font-medium mb-1 ${isDay22 ? "text-orange-700 font-bold" : ""}`}>
                        {day}
                      </div>
                      {dayPlans && (
                        <div className="space-y-1">
                          {dayPlans.inspections.slice(0, 2).map((plan) => (
                            <div
                              key={plan.id}
                              className={`text-[10px] px-1 py-0.5 rounded border ${getInspectionTypeColor(plan.type)}`}
                              title={plan.type}
                            >
                              {plan.type.substring(0, 4)}
                            </div>
                          ))}
                          {dayPlans.educations.slice(0, 1).map((education) => (
                            <div
                              key={education.id}
                              className="text-[10px] px-1 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-300"
                              title={education.type}
                            >
                              교육
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* 선택된 날짜 상세 정보 */}
          {selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate} 상세 정보
                  {selectedPlan?.status === "불가" && (
                    <span className="ml-2 text-sm text-red-600 font-normal">(불가능한 날짜)</span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPlan ? (
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold mb-2">점검 계획</div>
                      <div className={`p-3 rounded-lg border ${getInspectionTypeColor(selectedPlan.type)}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Search className="w-5 h-5" />
                          <div className="font-bold">{selectedPlan.type}</div>
                        </div>
                        <div className="text-sm mb-1">
                          <Building2 className="w-4 h-4 inline mr-1" />
                          현장: {selectedPlan.site}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {selectedPlan.status === "확정" && (
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle2 className="w-4 h-4" />
                              확정됨
                            </span>
                          )}
                          {selectedPlan.status === "계획" && (
                            <span className="flex items-center gap-1 text-yellow-600">
                              <Clock className="w-4 h-4" />
                              현장 확인 대기
                            </span>
                          )}
                          {selectedPlan.status === "불가" && (
                            <span className="flex items-center gap-1 text-red-600">
                              <XCircle className="w-4 h-4" />
                              불가능
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {selectedPlan.status === "불가" && selectedPlan.siteManagerComment && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          현장소장 코멘트
                        </div>
                        <div className="text-gray-700">{selectedPlan.siteManagerComment}</div>
                        {selectedPlan.alternativeDate && (
                          <div className="mt-2 text-sm text-blue-600">
                            제안 날짜: {selectedPlan.alternativeDate}
                          </div>
                        )}
                      </div>
                    )}

                    {selectedPlan.status === "계획" && (
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                        본사에서 계획한 날짜입니다. 현장 확인 후 확정됩니다.
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-4">
                    해당 날짜에 점검 계획이 없습니다.
                  </div>
                )}

                {/* 해당 날짜의 교육 계획도 표시 */}
                {plansByDate[selectedDate]?.educations.length > 0 && (
                  <div className="mt-4">
                    <div className="font-semibold mb-2">교육 계획</div>
                    {plansByDate[selectedDate].educations.map((education) => (
                      <div key={education.id} className="p-3 bg-purple-50 border border-purple-200 rounded-lg mb-2">
                        <div className="font-medium">{education.type}</div>
                        <div className="text-sm text-gray-600">현장: {education.site}</div>
                        <div className="text-sm">
                          {education.status === "확정" && (
                            <span className="text-green-600">확정됨</span>
                          )}
                          {education.status === "계획" && (
                            <span className="text-yellow-600">확정 대기</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {viewMode === "yearly" && (
        <Card>
          <CardHeader>
            <CardTitle>연간 점검 계획</CardTitle>
            <CardDescription>2024년 전체 점검 계획</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockInspectionPlans.map((plan) => (
                <div key={plan.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{plan.type}</div>
                      <div className="text-sm text-gray-600">
                        {plan.date} · {plan.site}
                      </div>
                    </div>
                    <div>
                      {plan.status === "확정" && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                          확정
                        </span>
                      )}
                      {plan.status === "계획" && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                          계획
                        </span>
                      )}
                      {plan.status === "불가" && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                          불가
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* 교육 요청 모달 (22일 클릭 시) */}
      {showEducationRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <Card className="w-full max-w-md mx-4 shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">교육 일정 요청</CardTitle>
                <button
                  onClick={() => setShowEducationRequestModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <CardDescription>현장에서 교육 일정 변경을 요청했습니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-semibold text-blue-900 mb-2">요청 내용</div>
                <div className="text-sm text-gray-700 space-y-2">
                  <div>
                    <span className="font-medium">현재 계획일:</span> 2024-01-22
                  </div>
                  <div>
                    <span className="font-medium">요청 일정:</span> 2024-01-25 (3일 후)
                  </div>
                  <div>
                    <span className="font-medium">요청 현장:</span> 인천1구역
                  </div>
                  <div>
                    <span className="font-medium">교육 유형:</span> 본사법정안전교육
                  </div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  현장 요청 사유
                </div>
                <div className="text-sm text-gray-700">
                  이 날은 고객사 회의가 하루종일 있어서 힘듭니다. 3일 뒤는 어떻습니까?
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleRejectEducation}
                  variant="outline"
                  className="flex-1 border-red-500 text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  반려
                </Button>
                <Button
                  onClick={handleApproveEducation}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  승인
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

