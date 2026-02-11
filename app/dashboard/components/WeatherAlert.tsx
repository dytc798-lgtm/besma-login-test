"use client";

import { Cloud, AlertTriangle } from "lucide-react";

interface WeatherAlertProps {
  condition: string;
  temperature: number;
  alert: string;
}

export default function WeatherAlert({ condition, temperature, alert }: WeatherAlertProps) {
  return (
    <>
      <div className="flex items-center gap-3 mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
        <Cloud className="w-5 h-5 text-orange-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-orange-900">{condition}</div>
          <div className="text-sm text-orange-700">{temperature}°C</div>
        </div>
      </div>
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm flex items-start gap-2">
        <AlertTriangle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <span className="text-blue-900">{alert}</span>
      </div>
    </>
  );
}

