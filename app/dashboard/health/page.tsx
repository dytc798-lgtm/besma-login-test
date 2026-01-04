"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Cloud, AlertTriangle } from "lucide-react";
import { mockWeather } from "@/lib/mock-data";
import WeatherAlert from "../components/WeatherAlert";

export default function HealthPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">보건 관리</h1>
        <p className="text-gray-600">근로자 건강 및 기상 모니터링</p>
      </div>

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
    </div>
  );
}

