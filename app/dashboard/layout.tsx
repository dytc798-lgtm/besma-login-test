"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getMenuItemsByRole, type UserRole } from "@/lib/role-menu-config";
import { Button } from "@/components/ui/button";
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
  Menu,
  X,
  Scale,
  Map,
  Beer,
  Ban,
  Home,
  ArrowLeft,
  Network,
} from "lucide-react";

const Campaign119Icon = () => (
  <div className="relative inline-flex items-center justify-center">
    <Beer className="w-5 h-5 text-amber-300" />
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <Ban className="w-4 h-4 text-red-500/80" />
    </span>
  </div>
);

// 기본 메뉴 (역할 선택 전 또는 전체 메뉴)
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

function DashboardContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fromLogicMap, setFromLogicMap] = useState(false);
  
  // LocalStorage에서 로직 맵 플래그 확인
  useEffect(() => {
    if (typeof window !== "undefined") {
      const flag = localStorage.getItem("fromLogicMap");
      setFromLogicMap(flag === "true");
    }
  }, [pathname]);
  
  // URL 쿼리 파라미터에서 역할 가져오기
  const role = searchParams.get("role") as UserRole | null;
  
  // 역할에 따른 메뉴 가져오기
  const roleMenuItems = getMenuItemsByRole(role);
  const menuItems = role ? roleMenuItems : defaultMenuItems;
  
  const activeMenu = menuItems.find((item) => item.path === pathname)?.id || "dashboard";
  const currentPage = menuItems.find((item) => item.path === pathname);
  const pageTitle = currentPage?.title || "대시보드";
  const pageDescription = currentPage?.id === "dashboard" 
    ? "전사 안전보건 현황 및 주요 알림을 한눈에 확인합니다."
    : currentPage?.label || "";
  
  // 역할 표시
  const roleLabel = role === "headquarters" 
    ? "본사 관리자" 
    : role === "site-manager" 
    ? "현장 관리자" 
    : role === "worker" 
    ? "기능인" 
    : null;
  
  const handleBackToLogicMap = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("fromLogicMap");
    }
    window.location.href = "/admin/logic-map";
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-safety-navy text-white flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:flex`}
      >
        <div className="p-6 border-b border-safety-navy-light">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-sm">BESMA SAFETY</div>
                <div className="text-xs text-gray-400">안전보건 통합 플랫폼</div>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden text-white hover:bg-safety-navy-light p-2 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-xs bg-safety-navy-light px-2 py-1 rounded-full inline-block">Demo</div>
            {roleLabel && (
              <div className="text-xs bg-blue-600 px-2 py-1 rounded-full inline-block text-white">
                {roleLabel}
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <Link
                key={item.id}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-safety-navy-light"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
          
          {/* 사이트맵 링크 */}
          <div className="mt-4 pt-4 border-t border-safety-navy-light">
            <Link
              href="/dashboard/sitemap"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-300 hover:bg-safety-navy-light"
            >
              <Map className="w-5 h-5" />
              <span className="text-sm font-medium">사이트맵 (전체 메뉴)</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-safety-navy-light text-xs text-gray-400">
          <div className="flex justify-between mb-2">
            <span>오늘 활동</span>
            <span className="px-2 py-0.5 bg-green-600 text-white rounded-full text-[10px]">LIVE</span>
          </div>
          <div className="flex gap-1">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i >= 3 ? "bg-orange-500" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b px-4 md:px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-6 h-6 text-safety-navy" />
            </button>
            {fromLogicMap && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleBackToLogicMap}
                className="gap-2 text-purple-600 border-purple-600 hover:bg-purple-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <Network className="w-4 h-4" />
                <span className="hidden md:inline">시스템 로직 맵으로</span>
                <span className="md:hidden">로직 맵</span>
              </Button>
            )}
            <Link
              href="/demo/role-selection"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-safety-navy"
              title="홈으로 돌아가기"
            >
              <Home className="w-5 h-5" />
              <span className="text-sm font-medium hidden md:inline">🏠 홈으로</span>
              <span className="text-sm font-medium md:hidden">홈</span>
            </Link>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-safety-navy">{pageTitle}</h1>
              <p className="text-xs md:text-sm text-gray-500">{pageDescription}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
            <select className="text-sm border rounded-md px-3 py-1.5 bg-white">
              <option>KR</option>
              <option>EN</option>
              <option>VN</option>
              <option>CH</option>
            </select>
            <div className="text-sm text-gray-600">
              오늘 무재해 <strong className="text-safety-navy">128</strong>일
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              B
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">로딩 중...</div>}>
      <DashboardContent>{children}</DashboardContent>
    </Suspense>
  );
}
