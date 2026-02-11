"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Forklift, Truck, ArrowLeft, Construction } from "lucide-react";
import EquipmentForm from "@/components/work-plan/EquipmentForm";

export type EquipmentType = "forklift" | "crane" | "excavator" | null;

export default function WorkPlanPage() {
  const [selectedType, setSelectedType] = useState<EquipmentType>(null);

  if (selectedType) {
    return (
      <div className="p-6 space-y-6">
        <Button
          variant="outline"
          onClick={() => setSelectedType(null)}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          뒤로가기
        </Button>
        <EquipmentForm equipmentType={selectedType} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">스마트 작업계획서</h1>
        <p className="text-gray-600">작업 장비를 선택하여 작업계획서를 작성하세요</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        <Card 
          className="border-2 hover:border-industrial-yellow transition-all cursor-pointer hover:shadow-lg"
          onClick={() => setSelectedType("forklift")}
        >
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-orange-100 flex items-center justify-center">
              <Forklift className="w-12 h-12 text-orange-600" />
            </div>
            <CardTitle className="text-2xl">지게차 작업계획서</CardTitle>
            <CardDescription className="text-base mt-2">
              지게차 작업 시 필요한 안전계수 및 작업 반경 계산
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="lg">
              작성하기
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="border-2 hover:border-industrial-yellow transition-all cursor-pointer hover:shadow-lg"
          onClick={() => setSelectedType("crane")}
        >
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
              <Truck className="w-12 h-12 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">크레인 작업계획서</CardTitle>
            <CardDescription className="text-base mt-2">
              크레인 작업 시 필요한 안전계수 및 작업 반경 계산
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="lg">
              작성하기
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="border-2 hover:border-industrial-yellow transition-all cursor-pointer hover:shadow-lg"
          onClick={() => setSelectedType("excavator")}
        >
          <CardHeader className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
              <Construction className="w-12 h-12 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl">굴착기 작업계획서</CardTitle>
            <CardDescription className="text-base mt-2">
              굴착기 작업 시 전도 방지 계산 및 안전 조항 체크리스트
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" size="lg">
              작성하기
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
