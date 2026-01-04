"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Calendar, CheckCircle2 } from "lucide-react";
import { mockEducation } from "@/lib/mock-data";

export default function EducationPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">안전 교육</h1>
        <p className="text-gray-600">안전보건 교육 일정 및 이수 현황</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>오늘의 안전 교육</CardTitle>
          <CardDescription>교육 일정 및 참석 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div className="text-sm text-gray-600">예정</div>
                </div>
                <div className="text-2xl font-bold">{mockEducation.scheduled}건</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <div className="text-sm text-gray-600">완료</div>
                </div>
                <div className="text-2xl font-bold">{mockEducation.completed}건</div>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  <div className="text-sm text-gray-600">이수률</div>
                </div>
                <div className="text-2xl font-bold">{mockEducation.percentage}%</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all"
                style={{ width: `${mockEducation.percentage}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

