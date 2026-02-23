"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, FileText, BarChart3, Settings, Send, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import KoreaMapView from "../components/KoreaMapView";
import { getSafetyPolicy } from "@/lib/data-flow";

export default function HeadquartersPage() {
  const [feedbackScores, setFeedbackScores] = useState([
    { id: 1, title: "안전난간 보수 필요", site: "인천1구역", score1: null as number | null, score2: null as number | null },
    { id: 2, title: "작업장 조명 개선", site: "영등포", score1: 8, score2: null as number | null },
  ]);
  const [safetyPolicy, setSafetyPolicy] = useState<{ title: string; approvedBy: string; approvedAt: string } | null>(null);

  useEffect(() => {
    const policy = getSafetyPolicy();
    if (policy && policy.status === "approved") setSafetyPolicy(policy);
    const handler = () => {
      const updated = getSafetyPolicy();
      if (updated && updated.status === "approved") setSafetyPolicy(updated);
    };
    window.addEventListener("storage", handler);
    const t = setInterval(handler, 1000);
    return () => {
      window.removeEventListener("storage", handler);
      clearInterval(t);
    };
  }, []);

  const handleScoreInput = (id: number, type: "score1" | "score2", value: number) => {
    setFeedbackScores(
      feedbackScores.map((item) =>
        item.id === id ? { ...item, [type]: value } : item
      )
    );
  };

  const feedbackData = [
    { site: "인천1구역", count: 15, rate: 95 },
    { site: "영등포", count: 12, rate: 88 },
    { site: "구리", count: 8, rate: 92 },
  ];

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-safety-navy">본사 관리자</h1>
        <p className="text-sm text-gray-600">전사 안전보건 및 현장 통합 관리</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* 왼쪽: 남한 지도 + 현장 30곳 */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="py-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                남한 현장 지도 (제주 포함)
              </CardTitle>
              <CardDescription className="text-xs">현장 30곳 위치</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <KoreaMapView />
            </CardContent>
          </Card>
        </div>

        {/* 오른쪽: 대시보드 메뉴 5종 */}
        <div className="lg:col-span-3 space-y-4">
          <Link href="/dashboard/safety-documents" className="block">
            <Card className="hover:border-safety-navy hover:shadow-md transition-all">
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-safety-navy" />
                    <CardTitle className="text-sm font-semibold">현장별 문서취합관리</CardTitle>
                  </div>
                  <span className="text-xs text-gray-500">바로가기</span>
                </div>
                <CardDescription className="text-xs">전현장 필수 안전 서류 제출 현황</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/headquarters/safety-policy" className="block">
            <Card className="hover:border-safety-navy hover:shadow-md transition-all">
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-safety-navy" />
                    <CardTitle className="text-sm font-semibold">안전보건경영시스템 관리</CardTitle>
                  </div>
                  <span className="text-xs text-gray-500">바로가기</span>
                </div>
                <CardDescription className="text-xs">안전보건 방침·목표 승인 및 관리</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/headquarters/biannual-report" className="block">
            <Card className="hover:border-safety-navy hover:shadow-md transition-all">
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-safety-navy" />
                    <CardTitle className="text-sm font-semibold">반기이행점검 보고</CardTitle>
                  </div>
                  <span className="text-xs text-gray-500">바로가기</span>
                </div>
                <CardDescription className="text-xs">중처법 반기 이행점검 보고서</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/headquarters/quarterly-meeting" className="block">
            <Card className="hover:border-safety-navy hover:shadow-md transition-all">
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-safety-navy" />
                    <CardTitle className="text-sm font-semibold">분기 점검보고</CardTitle>
                  </div>
                  <span className="text-xs text-gray-500">바로가기</span>
                </div>
                <CardDescription className="text-xs">분기 경영회의·점검 보고</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/dashboard/feedback" className="block">
            <Card className="hover:border-safety-navy hover:shadow-md transition-all">
              <CardHeader className="py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-safety-navy" />
                    <CardTitle className="text-sm font-semibold">일단위 현장 소통내용 보고</CardTitle>
                  </div>
                  <span className="text-xs text-gray-500">바로가기</span>
                </div>
                <CardDescription className="text-xs">위험요인 신고·작업중지권·의견청취 일별 보고</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>

      {/* 안전보건 방침 실시간 (본사 승인) */}
      {safetyPolicy && (
        <Card className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader className="py-3">
            <CardTitle className="text-sm font-semibold">안전보건 방침 및 목표 (본사 승인)</CardTitle>
            <CardDescription className="text-xs">현장에 실시간 반영</CardDescription>
          </CardHeader>
          <CardContent className="py-2 pt-0">
            <p className="text-sm font-medium text-safety-navy">{safetyPolicy.title}</p>
            <p className="text-xs text-gray-600 mt-1">승인자: {safetyPolicy.approvedBy} | 승인일: {safetyPolicy.approvedAt}</p>
          </CardContent>
        </Card>
      )}

      {/* 의견청취 전사 관리대장 (기존) */}
      <Card className="mt-6">
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-semibold">의견청취 전사 관리대장</CardTitle>
          <CardDescription className="text-xs">1차: 안전담당, 2차: 팀장/실장 점수 입력</CardDescription>
        </CardHeader>
        <CardContent className="py-2 pt-0">
          <div className="space-y-3">
            {feedbackScores.map((item) => (
              <div key={item.id} className="p-3 border rounded-lg text-sm">
                <div className="font-medium mb-1">{item.title}</div>
                <div className="text-gray-500 text-xs mb-2">{item.site}</div>
                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-xs text-gray-600">1차 점수</label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={item.score1 ?? ""}
                      onChange={(e) => handleScoreInput(item.id, "score1", parseInt(e.target.value, 10) || 0)}
                      className="w-16 p-1.5 border rounded text-sm ml-1"
                      placeholder="0-10"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">2차 점수</label>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={item.score2 ?? ""}
                      onChange={(e) => handleScoreInput(item.id, "score2", parseInt(e.target.value, 10) || 0)}
                      className="w-16 p-1.5 border rounded text-sm ml-1"
                      placeholder="0-10"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <div className="text-xs font-semibold mb-2">현장별 신고 건수 및 처리율</div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={feedbackData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="site" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" name="신고 건수" />
                <Bar dataKey="rate" fill="#22c55e" name="처리율 (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
