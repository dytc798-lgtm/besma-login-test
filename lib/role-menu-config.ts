// 역할별 메뉴 구조 정의
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
  Target,
  Calendar,
  Archive,
  UserX,
  Ban,
} from "lucide-react";

export type UserRole = "headquarters" | "site-manager" | "worker";

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  title: string;
}

// 본사 관리자 / 경영책임자 메뉴
export const headquartersMenuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "전사 통합 대시보드",
    icon: LayoutDashboard,
    path: "/dashboard?role=headquarters",
    title: "전사 통합 대시보드",
  },
  {
    id: "safety-policy",
    label: "안전보건 방침 및 목표",
    icon: Target,
    path: "/dashboard/headquarters/safety-policy?role=headquarters",
    title: "안전보건 방침 및 목표",
  },
  {
    id: "quarterly-meeting",
    label: "분기 경영회의",
    icon: Calendar,
    path: "/dashboard/headquarters/quarterly-meeting?role=headquarters",
    title: "분기 경영회의",
  },
  {
    id: "biannual-report",
    label: "반기 이행점검 보고",
    icon: FileCheck,
    path: "/dashboard/headquarters/biannual-report?role=headquarters",
    title: "반기 이행점검 보고",
  },
  {
    id: "personnel-management",
    label: "인사 및 격리 관리",
    icon: UserX,
    path: "/dashboard/headquarters/personnel-management?role=headquarters",
    title: "인사 및 격리 관리",
  },
  {
    id: "document-archive",
    label: "전사 문서 보관소",
    icon: Archive,
    path: "/dashboard/headquarters/document-archive?role=headquarters",
    title: "전사 문서 보관소",
  },
  {
    id: "safety-documents",
    label: "문서취합관리",
    icon: FileText,
    path: "/dashboard/safety-documents?role=headquarters",
    title: "문서취합관리",
  },
];

// 현장 관리자 / 안전과장 메뉴
export const siteManagerMenuItems: MenuItem[] = [
  {
    id: "site-dashboard",
    label: "현장 대시보드",
    icon: LayoutDashboard,
    path: "/dashboard/site-manager?role=site-manager",
    title: "현장 대시보드",
  },
  {
    id: "tbm-work-order",
    label: "TBM 및 작업지시",
    icon: ClipboardList,
    path: "/dashboard/site-manager/tbm-work-order?role=site-manager",
    title: "TBM 및 작업지시",
  },
  {
    id: "high-risk-work",
    label: "고위험 작업 관리",
    icon: AlertTriangle,
    path: "/dashboard/site-manager/high-risk-work?role=site-manager",
    title: "고위험 작업 관리",
  },
  {
    id: "inspection",
    label: "현장 및 장비 점검",
    icon: CheckCircle2,
    path: "/dashboard/inspection?role=site-manager",
    title: "현장 및 장비 점검",
  },
  {
    id: "worker-management",
    label: "기능인 관리",
    icon: Users,
    path: "/dashboard/site-manager/worker-management?role=site-manager",
    title: "기능인 관리",
  },
  {
    id: "feedback-accident",
    label: "의견 및 사고 대응",
    icon: MessageSquare,
    path: "/dashboard/site-manager/feedback-accident?role=site-manager",
    title: "의견 및 사고 대응",
  },
];

// 기능인 / 근로자 메뉴
export const workerMenuItems: MenuItem[] = [
  {
    id: "safety-center",
    label: "안전 센터",
    icon: Shield,
    path: "/dashboard/worker-app/safety-center",
    title: "안전 센터",
  },
  {
    id: "today-tasks",
    label: "오늘의 할 일",
    icon: ClipboardList,
    path: "/dashboard/worker-app/today-tasks",
    title: "오늘의 할 일",
  },
  {
    id: "mypage",
    label: "마이페이지",
    icon: Smartphone,
    path: "/dashboard/worker-app/mypage",
    title: "마이페이지",
  },
  {
    id: "communication",
    label: "소통 창구",
    icon: Languages,
    path: "/dashboard/worker-app/communication",
    title: "소통 창구",
  },
];

// 역할별 메뉴 가져오기
export function getMenuItemsByRole(role: UserRole | null): MenuItem[] {
  switch (role) {
    case "headquarters":
      return headquartersMenuItems;
    case "site-manager":
      return siteManagerMenuItems;
    case "worker":
      return workerMenuItems;
    default:
      // 기본 메뉴 (모든 메뉴)
      return [
        ...headquartersMenuItems,
        ...siteManagerMenuItems,
        ...workerMenuItems,
      ];
  }
}
