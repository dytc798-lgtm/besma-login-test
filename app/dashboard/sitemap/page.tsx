"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { headquartersMenuItems, siteManagerMenuItems, workerMenuItems } from "@/lib/role-menu-config";
import {
  LayoutDashboard,
  ClipboardList,
  AlertTriangle,
  GraduationCap,
  Heart,
  Settings,
  FileText,
  MessageSquare,
  Bell,
  CheckCircle2,
  Shield,
  Smartphone,
  Building2,
  Users,
  AlertCircle,
  Languages,
  FileCheck,
  Scale,
  Map,
  Beer,
  Ban,
} from "lucide-react";

const Campaign119Icon = () => (
  <div className="relative inline-flex items-center justify-center">
    <Beer className="w-5 h-5 text-amber-300" />
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <Ban className="w-4 h-4 text-red-500/80" />
    </span>
  </div>
);

// 기본 메뉴 (전체 메뉴)
const defaultMenuItems = [
  { id: "dashboard", label: "대시보드", icon: LayoutDashboard, path: "/dashboard", title: "본사 대시보드" },
  { id: "site-dashboard", label: "현장 대시보드", icon: Map, path: "/dashboard/site-dashboard", title: "현장 대시보드" },
  { id: "work", label: "작업 관리", icon: ClipboardList, path: "/dashboard/work", title: "작업 관리" },
  { id: "work-plan", label: "작업계획서", icon: FileCheck, path: "/dashboard/work-plan", title: "작업계획서" },
  { id: "work-permit", label: "작업허가서", icon: FileCheck, path: "/dashboard/work-permit", title: "작업허가서" },
  { id: "safety-documents", label: "안전문서 취합", icon: FileText, path: "/dashboard/safety-documents", title: "안전문서 취합" },
  { id: "risk", label: "위험 관리", icon: AlertTriangle, path: "/dashboard/risk", title: "위험 관리" },
  { id: "tbm", label: "TBM 일지", icon: FileText, path: "/dashboard/tbm", title: "TBM 일지" },
  { id: "safe-log", label: "무재해일지", icon: CheckCircle2, path: "/dashboard/safe-log", title: "무재해일지" },
  { id: "msds", label: "MSDS 열람", icon: Shield, path: "/dashboard/msds", title: "MSDS 열람" },
  { id: "notice", label: "공지사항", icon: Bell, path: "/dashboard/notice", title: "공지사항" },
  { id: "feedback", label: "안전 신문고", icon: MessageSquare, path: "/dashboard/feedback", title: "안전 신문고" },
  { id: "education", label: "안전 교육", icon: GraduationCap, path: "/dashboard/education", title: "안전 교육" },
  { id: "inspection", label: "점검계획", icon: CheckCircle2, path: "/dashboard/inspection", title: "점검계획" },
  { id: "health", label: "보건 관리", icon: Heart, path: "/dashboard/health", title: "보건 관리" },
  { id: "legal", label: "법령 정보", icon: Scale, path: "/dashboard/legal", title: "법령 정보" },
  { id: "workforce", label: "인력 관리", icon: Users, path: "/dashboard/workforce", title: "인력 관리" },
  { id: "near-miss", label: "아차사고 보고", icon: AlertCircle, path: "/dashboard/near-miss", title: "아차사고 보고" },
  { id: "compliance", label: "컴플라이언스", icon: CheckCircle2, path: "/dashboard/compliance", title: "컴플라이언스" },
  { id: "worker-app", label: "근로자 앱", icon: Smartphone, path: "/dashboard/worker-app", title: "근로자 앱" },
  { id: "site-manager", label: "현장관리자", icon: Building2, path: "/dashboard/site-manager", title: "현장관리자" },
  { id: "headquarters", label: "본사 관리", icon: Users, path: "/dashboard/headquarters", title: "본사 관리" },
  { id: "sos", label: "SOS 긴급호출", icon: AlertCircle, path: "/dashboard/sos", title: "SOS 긴급호출" },
  { id: "translation", label: "다국어 번역", icon: Languages, path: "/dashboard/translation", title: "다국어 번역" },
  { id: "settings", label: "설정", icon: Settings, path: "/dashboard/settings", title: "설정" },
  {
    id: "campaign-119",
    label: "119 캠페인",
    icon: Campaign119Icon as unknown as typeof LayoutDashboard,
    path: "/dashboard/campaign/119",
    title: "119 캠페인",
  },
];

// 모든 메뉴를 가나다순으로 정렬
const allMenuItems: Array<{ id: string; label: string; icon: any; path: string; title: string }> = [
  ...defaultMenuItems,
  ...headquartersMenuItems,
  ...siteManagerMenuItems,
  ...workerMenuItems,
];

// 중복 제거 및 가나다순 정렬
const seenIds = new Set<string>();
const uniqueMenuItems = allMenuItems
  .filter((item) => {
    if (seenIds.has(item.id)) {
      return false;
    }
    seenIds.add(item.id);
    return true;
  })
  .sort((a, b) => a.label.localeCompare(b.label, "ko"));

export default function SitemapPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = uniqueMenuItems.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 가나다순으로 그룹화
  const groupedItems = filteredItems.reduce((acc, item) => {
    const firstChar = item.label.charAt(0);
    const group = acc[firstChar] || [];
    group.push(item);
    acc[firstChar] = group;
    return acc;
  }, {} as Record<string, typeof filteredItems>);

  const sortedGroups = Object.keys(groupedItems).sort((a, b) => a.localeCompare(b, "ko"));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">사이트맵</h1>
        <p className="text-gray-600">전체 메뉴를 가나다순으로 확인할 수 있습니다</p>
      </div>

      {/* 검색 */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="메뉴 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* 가나다순 그룹별 표시 */}
      <div className="space-y-6">
        {sortedGroups.map((group) => {
          const items = groupedItems[group];
          return (
            <Card key={group}>
              <CardHeader>
                <CardTitle className="text-2xl text-safety-navy">{group}</CardTitle>
                <CardDescription>{items.length}개 메뉴</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.id}
                        href={item.path}
                        className="flex items-center gap-3 p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm text-gray-900 truncate">
                            {item.label}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {item.title}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            검색 결과가 없습니다.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
