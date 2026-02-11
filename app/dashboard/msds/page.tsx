"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockMSDS } from "@/lib/mock-data";
import { Search, FileText, AlertTriangle, Shield } from "lucide-react";

export default function MSDSPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMSDS, setSelectedMSDS] = useState<number | null>(null);

  const filteredMSDS = mockMSDS.filter(
    (msds) =>
      msds.name.includes(searchTerm) ||
      msds.chemicalName.includes(searchTerm) ||
      msds.hazards.some((h) => h.includes(searchTerm))
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">MSDS 열람</h1>
        <p className="text-gray-600">물질안전보건자료 검색 및 열람</p>
      </div>

      {/* 검색 */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="물질명, 화학명, 위험요인으로 검색... (예: 락카)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* MSDS 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMSDS.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            검색 결과가 없습니다.
          </div>
        ) : (
          filteredMSDS.map((msds) => (
            <Card
              key={msds.id}
              className={`cursor-pointer hover:border-blue-500 transition-colors ${
                selectedMSDS === msds.id ? "border-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => setSelectedMSDS(selectedMSDS === msds.id ? null : msds.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-lg">{msds.name}</CardTitle>
                </div>
                <CardDescription>{msds.chemicalName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="text-sm font-semibold text-red-600 mb-1">위험요인</div>
                    <div className="flex flex-wrap gap-1">
                      {msds.hazards.map((hazard, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full"
                        >
                          {hazard}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* MSDS 상세 */}
      {selectedMSDS !== null && (
        <Card>
          <CardHeader>
            <CardTitle>MSDS 상세 정보</CardTitle>
            <CardDescription>{mockMSDS.find((m) => m.id === selectedMSDS)?.name}</CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const msds = mockMSDS.find((m) => m.id === selectedMSDS);
              if (!msds) return null;
              return (
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold mb-2">화학명</div>
                    <div className="text-gray-700">{msds.chemicalName}</div>
                  </div>
                  <div>
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      위험요인
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msds.hazards.map((hazard, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                        >
                          {hazard}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      취급 방법
                    </div>
                    <div className="text-gray-700">{msds.handling}</div>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">응급처치</div>
                    <div className="text-gray-700">{msds.firstAid}</div>
                  </div>
                  <div>
                    <div className="font-semibold mb-2">보관 방법</div>
                    <div className="text-gray-700">{msds.storage}</div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

