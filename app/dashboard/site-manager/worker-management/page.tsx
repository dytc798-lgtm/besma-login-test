"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Award, GraduationCap, Search, Plus, Minus } from "lucide-react";

export default function WorkerManagementPage() {
  const workers = [
    {
      id: "w1",
      name: "정민익",
      team: "1팀",
      points: 850,
      educationCount: 5,
    },
    {
      id: "w2",
      name: "김철수",
      team: "2팀",
      points: 720,
      educationCount: 3,
    },
  ];

  const handleAddPoints = (workerId: string, points: number) => {
    alert(`${points}점이 부여되었습니다.`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">기능인 관리</h1>
        <p className="text-gray-600">현장 상벌점(포인트) 부여 및 교육 이력 관리</p>
      </div>

      {/* 검색 */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="이름 또는 팀으로 검색..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* 기능인 목록 */}
      <div className="grid grid-cols-1 gap-4">
        {workers.map((worker) => (
          <Card key={worker.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                {worker.name}
              </CardTitle>
              <CardDescription>{worker.team}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span className="text-sm text-gray-600">포인트:</span>
                    <span className="text-lg font-bold text-amber-600">{worker.points}P</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddPoints(worker.id, 10)}
                      className="text-green-600 border-green-600"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      +10점
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddPoints(worker.id, -10)}
                      className="text-red-600 border-red-600"
                    >
                      <Minus className="w-4 h-4 mr-1" />
                      -10점
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <span className="text-sm text-gray-600">교육 이수: {worker.educationCount}회</span>
                  <Button size="sm" variant="outline" className="ml-auto">
                    이력 보기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
