"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { hqMapSites, KOREA_BOUNDS, type HQMapSite } from "@/lib/hq-map-sites";

function toPercent(site: HQMapSite) {
  const { latMin, latMax, lngMin, lngMax } = KOREA_BOUNDS;
  const x = ((site.lng - lngMin) / (lngMax - lngMin)) * 100;
  const y = ((latMax - site.lat) / (latMax - latMin)) * 100;
  return { x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) };
}

export default function KoreaMapView() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="relative w-full h-full min-h-[380px] bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 rounded-lg overflow-hidden border-2 border-slate-300">
      {/* 남한 지도 배경 그리드 */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(30,58,138,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(30,58,138,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      {/* 제주·남해안 구역 표시 */}
      <div className="absolute bottom-[8%] left-[12%] right-[18%] h-[14%] rounded bg-blue-100/50 border border-blue-200/60" title="제주·남해" />
      <div className="absolute top-4 left-4 bg-safety-navy/90 text-white text-xs font-semibold px-2 py-1 rounded shadow">
        <MapPin className="w-3.5 h-3.5 inline mr-1" />
        남한 현장 지도 (제주 포함)
      </div>

      {/* 현장 30곳 핀 */}
      {hqMapSites.map((site) => {
        const { x, y } = toPercent(site);
        const isSelected = selectedId === site.id;
        return (
          <button
            key={site.id}
            type="button"
            onClick={() => setSelectedId(isSelected ? null : site.id)}
            className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 transition-all focus:outline-none focus:ring-2 focus:ring-safety-navy rounded-full"
            style={{ left: `${x}%`, top: `${y}%` }}
            title={site.name}
          >
            <div
              className={`w-3 h-3 rounded-full border-2 border-white shadow-md ${
                site.risk === "high" ? "bg-red-500" : site.risk === "medium" ? "bg-amber-500" : "bg-green-600"
              } ${isSelected ? "ring-2 ring-safety-navy scale-125" : ""}`}
            />
            {isSelected && (
              <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-safety-navy text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap max-w-[140px] truncate">
                {site.name}
              </div>
            )}
          </button>
        );
      })}

      {/* 범례 */}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 text-xs">
        <span className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded shadow">
          <span className="w-2 h-2 rounded-full bg-green-600" /> 정상
        </span>
        <span className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded shadow">
          <span className="w-2 h-2 rounded-full bg-amber-500" /> 주의
        </span>
        <span className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded shadow">
          <span className="w-2 h-2 rounded-full bg-red-500" /> 경보
        </span>
        <span className="bg-white/90 px-2 py-1 rounded shadow text-slate-600">현장 30곳</span>
      </div>
    </div>
  );
}
