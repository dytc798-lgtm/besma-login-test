"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockWorkers, WorkerInfo } from "@/lib/mock-data";
import { Users, GraduationCap, Award, FileText, CheckCircle2, XCircle, Search } from "lucide-react";

export default function WorkforcePage() {
  const [selectedWorker, setSelectedWorker] = useState<WorkerInfo | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWorkers = mockWorkers.filter(
    (worker) =>
      worker.name.includes(searchTerm) ||
      worker.team.includes(searchTerm) ||
      worker.site.includes(searchTerm)
  );

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "S":
        return "bg-purple-100 text-purple-700";
      case "A":
        return "bg-green-100 text-green-700";
      case "B":
        return "bg-blue-100 text-blue-700";
      case "C":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const checkLicenseValidity = (licenseType: string, worker: WorkerInfo): boolean => {
    const license = worker.licenses.find((l) => l.type.includes(licenseType));
    return license ? license.isValid : false;
  };

  if (selectedWorker) {
    return (
      <div className="p-6 space-y-6">
        <Button variant="outline" onClick={() => setSelectedWorker(null)}>
          목록으로
        </Button>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{selectedWorker.name}님 상세 정보</CardTitle>
            <CardDescription>{selectedWorker.team} · {selectedWorker.site}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 기능인 등급 */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                기능인 등급
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600 mb-2">안전분야 등급</div>
                    <div className={`text-3xl font-bold inline-block px-4 py-2 rounded-lg ${getGradeColor(selectedWorker.safetyGrade)}`}>
                      {selectedWorker.safetyGrade}등급
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-600 mb-2">품질분야 등급</div>
                    <div className={`text-3xl font-bold inline-block px-4 py-2 rounded-lg ${getGradeColor(selectedWorker.qualityGrade)}`}>
                      {selectedWorker.qualityGrade}등급
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 자격증 현황 */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                자격증 현황
              </h3>
              <div className="space-y-3">
                {selectedWorker.licenses.map((license, idx) => (
                  <Card key={idx} className={license.isValid ? "border-green-200" : "border-red-200"}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-lg">{license.type}</div>
                          <div className="text-sm text-gray-600">자격증 번호: {license.number}</div>
                          <div className="text-sm text-gray-600">
                            유효기간: {license.issueDate} ~ {license.expiryDate}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {license.isValid ? (
                            <>
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                              <span className="text-green-600 font-semibold">유효</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-6 h-6 text-red-600" />
                              <span className="text-red-600 font-semibold">만료</span>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 안전 교육 이력 */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                안전 교육 이력
              </h3>
              <div className="space-y-2">
                {selectedWorker.educationHistory.map((edu, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{edu.type}</div>
                      <div className="text-sm text-gray-600">{edu.date}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      edu.status === "이수" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {edu.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">인력 관리</h1>
        <p className="text-gray-600">근로자별 기능인 등급 및 안전 교육 이력 조회</p>
      </div>

      {/* 검색 */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="이름, 팀, 현장으로 검색..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* 근로자 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWorkers.map((worker) => (
          <Card
            key={worker.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedWorker(worker)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{worker.name}</CardTitle>
                  <CardDescription>{worker.team} · {worker.site}</CardDescription>
                </div>
                <Users className="w-8 h-8 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">안전분야:</span>
                  <span className={`px-2 py-1 rounded text-sm font-semibold ${getGradeColor(worker.safetyGrade)}`}>
                    {worker.safetyGrade}등급
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">품질분야:</span>
                  <span className={`px-2 py-1 rounded text-sm font-semibold ${getGradeColor(worker.qualityGrade)}`}>
                    {worker.qualityGrade}등급
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  자격증: {worker.licenses.length}개
                </div>
                <div className="text-sm text-gray-600">
                  교육 이수: {worker.educationHistory.filter((e) => e.status === "이수").length}건
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
