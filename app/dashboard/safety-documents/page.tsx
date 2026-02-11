"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { defaultSafetyDocuments, type SafetyDocument, type Site, type DocumentStatus } from "@/lib/safety-document-config";
import { getMockSites } from "@/lib/sites-data";
import { extractTeamNumber, getDisplayTeam } from "@/lib/status-utils";
import { StatusBadge } from "@/components/ui/status-badge";
import { FilterPanel } from "@/components/ui/filter-panel";
import Link from "next/link";

// Mock 현장별 서류 제출 현황
const mockSiteDocumentStatus: Record<string, Record<string, DocumentStatus>> = {
  "site-001": {
    "doc-001": "submitted",
    "doc-002": "submitted",
    "doc-003": "pending",
    "doc-004": "submitted",
    "doc-005": "overdue",
  },
  "site-002": {
    "doc-001": "submitted",
    "doc-002": "pending",
    "doc-003": "submitted",
  },
};

export default function SafetyDocumentsPage() {
  const [selectedTeam, setSelectedTeam] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCycle, setSelectedCycle] = useState<"all" | "monthly" | "biannual">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // 현장 리스트 lazy loading (빌드 시 부하 없음)
  const mockSites = useMemo(() => getMockSites(), []);

  // 팀/발주처 목록 추출 (팀 번호로 그룹화)
  const teams = useMemo(() => {
    const teamSet = new Set(mockSites.map(site => getDisplayTeam(site.team)));
    return Array.from(teamSet).sort();
  }, [mockSites]);

  // 필터링된 현장 목록 (팀별로 그룹화)
  const filteredSites = useMemo(() => {
    const filtered = mockSites.filter(site => {
      const displayTeam = getDisplayTeam(site.team);
      const matchesTeam = selectedTeam === "all" || displayTeam === selectedTeam;
      const matchesSearch = searchQuery === "" || 
        site.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTeam && matchesSearch;
    });
    
    // 팀별로 그룹화하여 정렬
    return filtered.sort((a, b) => {
      const teamA = getDisplayTeam(a.team);
      const teamB = getDisplayTeam(b.team);
      return teamA.localeCompare(teamB);
    });
  }, [selectedTeam, searchQuery, mockSites]);

  // 필터링된 서류 목록
  const filteredDocuments = useMemo(() => {
    return defaultSafetyDocuments.filter(doc => {
      const matchesCycle = selectedCycle === "all" || doc.cycle === selectedCycle;
      const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
      return matchesCycle && matchesCategory && doc.isActive;
    });
  }, [selectedCycle, selectedCategory]);

  // 현장별 서류 제출 현황 계산
  const getDocumentStatus = useCallback((siteId: string, docId: string): DocumentStatus => {
    return mockSiteDocumentStatus[siteId]?.[docId] || "pending";
  }, []);

  // 카테고리 목록
  const categories = useMemo(() => {
    const catSet = new Set(defaultSafetyDocuments.map(doc => doc.category).filter(Boolean));
    return Array.from(catSet) as string[];
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">전현장 안전문서 취합 및 관제</h1>
        <p className="text-gray-600">현장별 필수 안전 서류 제출 현황을 확인하고 관리합니다</p>
      </div>

      {/* 필터 및 검색 */}
      <FilterPanel
        filters={[
          {
            label: "팀/발주처",
            value: selectedTeam,
            onChange: setSelectedTeam,
            options: [
              { value: "all", label: "전체" },
              ...teams.map(team => ({ value: team, label: team }))
            ],
          },
          {
            label: "현장 검색",
            value: searchQuery,
            onChange: setSearchQuery,
            type: "search",
            placeholder: "현장명 검색...",
          },
          {
            label: "주기",
            value: selectedCycle,
            onChange: (value) => setSelectedCycle(value as "all" | "monthly" | "biannual"),
            options: [
              { value: "all", label: "전체" },
              { value: "monthly", label: "월간" },
              { value: "biannual", label: "반기" },
            ],
          },
          {
            label: "카테고리",
            value: selectedCategory,
            onChange: setSelectedCategory,
            options: [
              { value: "all", label: "전체" },
              ...categories.map(cat => ({ value: cat, label: cat }))
            ],
          },
        ]}
      />

      {/* 현장별 서류 현황 테이블 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>현장별 서류 제출 현황</CardTitle>
              <CardDescription>
                {filteredSites.length}개 현장, {filteredDocuments.length}개 서류
              </CardDescription>
            </div>
            <Link href="/dashboard/settings/safety-documents">
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                서류 설정 관리
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-2 text-left text-xs font-semibold text-gray-700 sticky left-0 bg-gray-50 z-10 min-w-[180px] max-w-[180px]">
                    현장명
                  </th>
                  {filteredDocuments.map(doc => (
                    <th key={doc.id} className="p-1.5 text-center text-[10px] font-semibold text-gray-700 min-w-[80px]">
                      <div className="flex flex-col">
                        <span className="leading-tight">{doc.name}</span>
                        <span className="text-[9px] text-gray-500 mt-0.5">
                          {doc.cycle === "monthly" ? "월간" : "반기"}
                        </span>
                        {doc.category && (
                          <span 
                            className="text-[8px] text-gray-400 mt-0.5"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 1,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              textOverflow: "ellipsis"
                            }}
                          >
                            {doc.category}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredSites.map(site => {
                  const displayTeam = getDisplayTeam(site.team);
                  
                  return (
                  <tr key={site.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 sticky left-0 bg-white z-10 min-w-[180px] max-w-[180px]">
                      <div 
                        className="text-xs font-medium leading-tight" 
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                        title={site.fullName}
                      >
                        {site.fullName}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{displayTeam}</div>
                    </td>
                    {filteredDocuments.map(doc => {
                      const status = getDocumentStatus(site.id, doc.id);
                      return (
                        <td key={doc.id} className="p-1.5 text-center min-w-[80px]">
                          <div className="flex flex-col items-center gap-0.5">
                            <StatusBadge status={status} size="sm" />
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 요약 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">전체 현장</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-safety-navy">{mockSites.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">제출 완료율</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">85.2%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">제출 대기</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">142건</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">제출 지연</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">23건</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
