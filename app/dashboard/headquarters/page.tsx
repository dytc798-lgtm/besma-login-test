"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MapPin, MessageSquare, BarChart3, Settings, CheckCircle2 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function HeadquartersPage() {
  const [feedbackScores, setFeedbackScores] = useState([
    { id: 1, title: "안전난간 보수 필요", site: "인천1구역", score1: null, score2: null },
    { id: 2, title: "작업장 조명 개선", site: "영등포", score1: 8, score2: null },
  ]);

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
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">본사 관리</h1>
        <p className="text-gray-600">전사 안전보건 관리 및 현장 통합 관리</p>
      </div>

      {/* 현장 개설 및 준공 관리 */}
      <Card>
        <CardHeader>
          <CardTitle>현장 개설 및 준공 관리</CardTitle>
          <CardDescription>현장 소장/안전관리자 계정 매칭 및 준공 데이터 이관</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <div className="font-semibold">인천1구역 주택재개발</div>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  소장: 홍길동 | 안전관리자: 김철수
                </div>
                <Button size="sm" variant="outline">계정 매칭</Button>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <div className="font-semibold">영등포 주상복합</div>
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  소장: 이영희 | 안전관리자: 박민수
                </div>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  준공 데이터 이관
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 인력/기능인 관리 */}
      <Card>
        <CardHeader>
          <CardTitle>인력/기능인 관리</CardTitle>
          <CardDescription>기능인 등급 S/A/B/C 관리</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {["S", "A", "B", "C"].map((grade) => (
              <div key={grade} className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold mb-1">{grade}등급</div>
                <div className="text-3xl font-bold text-blue-600">
                  {grade === "S" ? 15 : grade === "A" ? 25 : grade === "B" ? 8 : 2}명
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 의견청취 전사 관리대장 */}
      <Card>
        <CardHeader>
          <CardTitle>의견청취 전사 관리대장</CardTitle>
          <CardDescription>1차: 안전담당, 2차: 안전보건팀장/실장 점수 입력</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              {feedbackScores.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg">
                  <div className="font-semibold mb-2">{item.title}</div>
                  <div className="text-sm text-gray-600 mb-3">{item.site}</div>
                  <div className="flex items-center gap-4">
                    <div>
                      <label className="text-xs text-gray-600">1차 점수 (안전담당)</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={item.score1 || ""}
                        onChange={(e) =>
                          handleScoreInput(item.id, "score1", parseInt(e.target.value) || 0)
                        }
                        className="w-20 p-2 border rounded-lg mt-1"
                        placeholder="0-10"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600">2차 점수 (팀장/실장)</label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={item.score2 || ""}
                        onChange={(e) =>
                          handleScoreInput(item.id, "score2", parseInt(e.target.value) || 0)
                        }
                        className="w-20 p-2 border rounded-lg mt-1"
                        placeholder="0-10"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="font-semibold mb-4">현장별 신고 건수 및 처리율</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={feedbackData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="site" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" name="신고 건수" />
                  <Bar dataKey="rate" fill="#22c55e" name="처리율 (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 시정조치관리 */}
      <Card>
        <CardHeader>
          <CardTitle>시정조치관리</CardTitle>
          <CardDescription>본사 관리용 시정조치 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            시정조치관리 기능 (본사 전용)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

