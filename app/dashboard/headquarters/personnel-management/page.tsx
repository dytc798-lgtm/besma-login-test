"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, UserX, Shield, Search, Ban, CheckCircle2 } from "lucide-react";

interface Worker {
  id: string;
  name: string;
  maskedName: string;
  team: string;
  points: number;
  grade: "S" | "A" | "B" | "C";
  isBlocked: boolean;
}

export default function PersonnelManagementPage() {
  const [workers, setWorkers] = useState<Worker[]>([
    { id: "w1", name: "정민익", maskedName: "정*익", team: "1팀", points: 850, grade: "S", isBlocked: false },
    { id: "w2", name: "김철수", maskedName: "김*수", team: "2팀", points: 720, grade: "A", isBlocked: false },
    { id: "w3", name: "이영희", maskedName: "이*희", team: "1팀", points: 450, grade: "C", isBlocked: true },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleBlock = (workerId: string) => {
    if (confirm("이 인원을 영구 차단하시겠습니까?")) {
      setWorkers(
        workers.map((w) =>
          w.id === workerId ? { ...w, isBlocked: true } : w
        )
      );
      alert("영구 차단되었습니다. 로그인 시도 시 차단 알림이 표시됩니다.");
    }
  };

  const handleUnblock = (workerId: string) => {
    setWorkers(
      workers.map((w) =>
        w.id === workerId ? { ...w, isBlocked: false } : w
      )
    );
    alert("차단이 해제되었습니다.");
  };

  const filteredWorkers = workers.filter((w) =>
    w.maskedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.team.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "S":
        return "bg-green-100 text-green-700";
      case "A":
        return "bg-blue-100 text-blue-700";
      case "B":
        return "bg-yellow-100 text-yellow-700";
      case "C":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">인사 및 격리 관리</h1>
        <p className="text-gray-600">기능인 등급(관리자 전용), 영구 차단(블랙리스트) 관리</p>
      </div>

      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">관리자 전용 정보</p>
              <p>등급 정보는 관리자만 조회 가능하며, 근로자 화면에서는 포인트만 표시됩니다.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 검색 */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="이름 또는 팀으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* 기능인 목록 */}
      <div className="grid grid-cols-1 gap-4">
        {filteredWorkers.map((worker) => (
          <Card key={worker.id} className={worker.isBlocked ? "border-red-300 bg-red-50" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{worker.maskedName}</CardTitle>
                  <CardDescription>{worker.team}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(worker.grade)}`}>
                    {worker.grade}등급
                  </span>
                  {worker.isBlocked && (
                    <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 font-medium">
                      차단됨
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm text-gray-600">포인트: <span className="font-semibold text-safety-navy">{worker.points}P</span></div>
                  <div className="text-sm text-gray-600">등급: <span className="font-semibold">{worker.grade}등급</span> (관리자 전용)</div>
                </div>
                <div className="flex gap-2">
                  {worker.isBlocked ? (
                    <Button
                      variant="outline"
                      onClick={() => handleUnblock(worker.id)}
                      className="text-green-600 border-green-600 hover:bg-green-50"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      차단 해제
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => handleBlock(worker.id)}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <Ban className="w-4 h-4 mr-2" />
                      영구 차단
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
