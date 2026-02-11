"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

interface Site {
  id: number;
  name: string;
  code: string;
  status: string;
  risk: string;
  lat: number;
  lng: number;
}

interface MapViewProps {
  sites: Site[];
}

export default function MapView({ sites }: MapViewProps) {
  const [selectedSite, setSelectedSite] = useState<number | null>(null);

  return (
    <div className="relative h-64 bg-gradient-to-br from-blue-900 via-blue-800 to-safety-navy rounded-lg overflow-hidden">
      {/* Map Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Site Pins */}
      {sites.map((site) => (
        <button
          key={site.id}
          onClick={() => setSelectedSite(selectedSite === site.id ? null : site.id)}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
            selectedSite === site.id ? "z-10 scale-125" : "z-0"
          }`}
          style={{
            left: `${20 + (site.lng % 60)}%`,
            top: `${20 + (site.lat % 40)}%`,
          }}
        >
          <div
            className={`w-4 h-4 rounded-full ${
              site.risk === "high"
                ? "bg-red-500"
                : site.risk === "medium"
                ? "bg-yellow-500"
                : "bg-green-500"
            } shadow-lg animate-pulse`}
          />
          {selectedSite === site.id && (
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-red-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              {site.name} - 위험도:{" "}
              {site.risk === "high" ? "높음" : site.risk === "medium" ? "보통" : "낮음"}
            </div>
          )}
        </button>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-col md:flex-row gap-2 text-xs text-white/80">
        <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>정상</span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span>주의</span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span>경보</span>
        </div>
      </div>

      {/* Map Label */}
      <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
        <MapPin className="w-3 h-3 inline mr-1" />
        pic1: GIS 지도 (실제 구현 시 지도 API 연동)
      </div>
    </div>
  );
}

