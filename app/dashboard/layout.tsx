"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "대시보드", icon: LayoutDashboard, path: "/dashboard" },
  { id: "work", label: "작업 관리", icon: ClipboardList, path: "/dashboard/work" },
  { id: "risk", label: "위험 관리", icon: AlertTriangle, path: "/dashboard/risk" },
  { id: "tbm", label: "TBM 일지", icon: FileText, path: "/dashboard/tbm" },
  { id: "safe-log", label: "무재해일지", icon: CheckCircle2, path: "/dashboard/safe-log" },
  { id: "msds", label: "MSDS 열람", icon: Shield, path: "/dashboard/msds" },
  { id: "notice", label: "공지사항", icon: Bell, path: "/dashboard/notice" },
  { id: "feedback", label: "안전 신문고", icon: MessageSquare, path: "/dashboard/feedback" },
  { id: "education", label: "안전 교육", icon: GraduationCap, path: "/dashboard/education" },
  { id: "health", label: "보건 관리", icon: Heart, path: "/dashboard/health" },
  { id: "settings", label: "설정", icon: Settings, path: "/dashboard/settings" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeMenu = menuItems.find((item) => item.path === pathname)?.id || "dashboard";

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-safety-navy text-white flex-col">
        <div className="p-6 border-b border-safety-navy-light">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm">BESMA SAFETY</div>
              <div className="text-xs text-gray-400">안전보건 통합 플랫폼</div>
            </div>
          </div>
          <div className="text-xs bg-safety-navy-light px-2 py-1 rounded-full inline-block">Demo</div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <Link
                key={item.id}
                href={item.path}
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
          <div>
            <h1 className="text-lg md:text-xl font-bold text-safety-navy">본사 대시보드</h1>
            <p className="text-xs md:text-sm text-gray-500">전사 안전보건 현황 및 주요 알림을 한눈에 확인합니다.</p>
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

