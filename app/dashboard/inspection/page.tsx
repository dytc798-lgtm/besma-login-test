"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockInspectionPlans, mockEducationPlans } from "@/lib/mock-data";
import type { InspectionPlan } from "@/lib/mock-data";
import { Calendar, CheckCircle2, XCircle, Clock, Building2, AlertCircle, Search } from "lucide-react";

export default function InspectionPage() {
  const [viewMode, setViewMode] = useState<"yearly" | "monthly">("monthly");
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 0, 1)); // 2024년 1월
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<InspectionPlan | null>(null);

  // 현재 월의 점검 계획 필터링
  const currentMonthPlans = mockInspectionPlans.filter((plan) => {
    const planDate = new Date(plan.date);
    return (
      planDate.getFullYear() === currentMonth.getFullYear() &&
      planDate.getMonth() === currentMonth.getMonth()
    );
  });

  // 현재 월의 교육 계획도 함께 표시
  const currentMonthEducations = mockEducationPlans.filter((plan) => {
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
    setSelectedDate(dateStr);
    
    const plan = currentMonthPlans.find((p) => p.date === dateStr);
    if (plan) {
      setSelectedPlan(plan);
    } else {
      setSelectedPlan(null);
    }
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

          {/* 캘린더 */}
          <Card>
            <CardHeader>
              <CardTitle>점검 및 교육 계획 캘린더</CardTitle>
              <CardDescription>날짜를 클릭하여 상세 정보를 확인하세요</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="aspect-square" />;
                  }

                  const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  const dayPlans = plansByDate[dateStr];
                  const status = getDateStatus(day);
                  const isSelected = selectedDate === dateStr;

                  return (
                    <div
                      key={day}
                      onClick={() => handleDateClick(day)}
                      className={`aspect-square border rounded-lg p-1 cursor-pointer transition-all ${
                        isSelected
                          ? "ring-2 ring-blue-500 bg-blue-50"
                          : status === "rejected"
                          ? "border-red-300 bg-red-50"
                          : status === "confirmed"
                          ? "border-green-300 bg-green-50"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <div className="text-xs font-medium mb-1">{day}</div>
                      {dayPlans && (
                        <div className="space-y-0.5">
                          {dayPlans.inspections.slice(0, 2).map((plan) => (
                            <div
                              key={plan.id}
                              className={`text-[8px] px-1 py-0.5 rounded border ${getInspectionTypeColor(plan.type)}`}
                              title={plan.type}
                            >
                              {plan.type.substring(0, 4)}
                            </div>
                          ))}
                          {dayPlans.educations.slice(0, 1).map((education) => (
                            <div
                              key={education.id}
                              className="text-[8px] px-1 py-0.5 rounded bg-purple-100 text-purple-700 border border-purple-300"
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
    </div>
  );
}

