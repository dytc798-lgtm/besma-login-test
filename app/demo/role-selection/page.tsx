"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Building2, HardHat, ArrowLeft, CheckCircle2, Home } from "lucide-react";
import Link from "next/link";

type UserRole = "headquarters" | "site-manager" | "worker" | null;

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // 역할 선택 시 해당 역할의 대시보드로 이동
    if (role === "headquarters") {
      router.push("/dashboard/headquarters?role=headquarters");
    } else if (role === "site-manager") {
      router.push("/dashboard/site-manager?role=site-manager");
    } else if (role === "worker") {
      router.push("/dashboard/worker-app?role=worker");
    }
  };

  const roles = [
    {
      id: "headquarters" as UserRole,
      title: "본사 관리자 / 경영책임자",
      description: "전사 정책 수립 및 최종 승인 권한",
      icon: Building2,
      color: "from-blue-600 to-blue-800",
      hoverColor: "hover:from-blue-700 hover:to-blue-900",
      features: [
        "안전보건 방침 및 목표 승인",
        "전사 통합 대시보드",
        "분기 경영회의",
        "반기 이행점검 보고",
        "인사 및 격리 관리",
        "전사 문서 보관소",
      ],
    },
    {
      id: "site-manager" as UserRole,
      title: "현장 관리자 / 안전과장",
      description: "현장 실무 관리 및 데이터 입력 권한",
      icon: Shield,
      color: "from-green-600 to-green-800",
      hoverColor: "hover:from-green-700 hover:to-green-900",
      features: [
        "TBM 및 작업지시",
        "고위험 작업 관리 (PTW, MSDS)",
        "현장 및 장비 점검",
        "기능인 관리",
        "의견 및 사고 대응",
      ],
    },
    {
      id: "worker" as UserRole,
      title: "기능인 / 근로자",
      description: "안전 권리 행사, 포인트 및 개인 작업 관리",
      icon: HardHat,
      color: "from-amber-600 to-amber-800",
      hoverColor: "hover:from-amber-700 hover:to-amber-900",
      features: [
        "안전 센터 (작업중지권, 위험 신고)",
        "오늘의 할 일 (TBM, 교육, 서명)",
        "마이페이지 (포인트 확인)",
        "소통 창구 (다국어 공지사항)",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">🏠 홈으로 돌아가기</span>
              <span className="md:hidden">홈</span>
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-safety-navy to-safety-navy-light flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg text-safety-navy">BESMA</div>
              <div className="text-xs text-gray-500">부현전기 안전보건플랫폼</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-safety-navy mb-4">
              역할을 선택해주세요
            </h1>
            <p className="text-lg text-gray-600">
              데모 모드에서 각 역할의 권한과 기능을 체험할 수 있습니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selectedRole === role.id;

              return (
                <Card
                  key={role.id}
                  className={`relative overflow-hidden border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "border-safety-navy shadow-2xl scale-105"
                      : "border-gray-200 hover:border-safety-navy hover:shadow-xl"
                  }`}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}

                  <div className={`bg-gradient-to-br ${role.color} ${role.hoverColor} p-6 text-white`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-white mb-1">{role.title}</CardTitle>
                        <CardDescription className="text-white/90 text-sm">
                          {role.description}
                        </CardDescription>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-700 mb-3">주요 기능:</h4>
                      <ul className="space-y-2">
                        {role.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-safety-navy mt-2 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      className={`w-full mt-6 ${
                        isSelected
                          ? "bg-safety-navy hover:bg-safety-navy-light"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRoleSelect(role.id);
                      }}
                    >
                      {isSelected ? "선택됨" : "이 역할로 시작하기"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              데모 모드에서는 실제 데이터가 아닌 샘플 데이터를 사용합니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
