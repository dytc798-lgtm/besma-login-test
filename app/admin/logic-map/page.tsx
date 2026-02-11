"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  MapPin, 
  HardHat, 
  ArrowRight, 
  Info, 
  X,
  Target,
  LayoutDashboard,
  Calendar,
  FileCheck,
  UserX,
  Archive,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Smartphone,
  Award,
  Languages,
  Play,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

interface NodeInfo {
  id: string;
  label: string;
  path: string;
  icon: any;
  description: string;
  dbTables: string[];
  legalDocs: string[];
  role: "hq" | "site" | "worker";
}

const logicNodes: NodeInfo[] = [
  // 본사 관리자
  {
    id: "safety-policy",
    label: "안전보건 방침 및 목표",
    path: "/dashboard/headquarters/safety-policy?role=headquarters",
    icon: Target,
    description: "안전담당자 작성 → 대표이사 최종 승인",
    dbTables: ["safety_policy", "approval_workflow", "signatures"],
    legalDocs: ["안전보건 방침서", "중처법 제8조 대응"],
    role: "hq",
  },
  {
    id: "dashboard",
    label: "전사 통합 대시보드",
    path: "/dashboard?role=headquarters",
    icon: LayoutDashboard,
    description: "전 현장 실시간 모니터링",
    dbTables: ["sites", "workers", "alerts", "realtime_status"],
    legalDocs: ["경영회의록", "이행점검 보고서"],
    role: "hq",
  },
  {
    id: "quarterly-meeting",
    label: "분기 경영회의",
    path: "/dashboard/headquarters/quarterly-meeting?role=headquarters",
    icon: Calendar,
    description: "분기별 데이터 자동 결산 및 회의록",
    dbTables: ["quarterly_reports", "meeting_minutes", "signatures"],
    legalDocs: ["분기 경영회의록", "중처법 대응"],
    role: "hq",
  },
  {
    id: "biannual-report",
    label: "반기 이행점검 보고",
    path: "/dashboard/headquarters/biannual-report?role=headquarters",
    icon: FileCheck,
    description: "반기별 이행 점검 및 대표이사 최종 서명",
    dbTables: ["biannual_reports", "compliance_data", "signatures"],
    legalDocs: ["반기 이행점검 보고서", "중처법 핵심"],
    role: "hq",
  },
  {
    id: "personnel",
    label: "인사 및 격리 관리",
    path: "/dashboard/headquarters/personnel-management?role=headquarters",
    icon: UserX,
    description: "기능인 등급 관리, 블랙리스트 관리",
    dbTables: ["workers", "grades", "blacklist", "points"],
    legalDocs: ["인사 관리 기록"],
    role: "hq",
  },
  {
    id: "archive",
    label: "전사 문서 보관소",
    path: "/dashboard/headquarters/document-archive?role=headquarters",
    icon: Archive,
    description: "준공 현장 데이터 백업 및 관리",
    dbTables: ["document_archive", "completed_sites"],
    legalDocs: ["법정 문서 보관"],
    role: "hq",
  },
  // 현장 관리자
  {
    id: "tbm-work-order",
    label: "TBM 및 작업지시",
    path: "/dashboard/site-manager/tbm-work-order?role=site-manager",
    icon: ClipboardList,
    description: "ERP 연동 작업지시 + 위험성평가 DB 연동\n• 이벤트 기반 TBM 스케줄링 (관리자 버튼 클릭 시점 기록)\n• 실시간 작업 변경 관리 (MOC) - 공종 변경 시 위험요인 자동 갱신\n• 가변적 위치(GPS) 관리 - 위치 갱신 시 타임라인 누적 기록",
    dbTables: ["work_orders", "tbm_logs", "risk_assessment_db", "signatures", "tbm_change_history", "location_history"],
    legalDocs: ["TBM 일지", "작업지시서", "위험성평가표", "작업 변경 이력", "위치 기록"],
    role: "site",
  },
  {
    id: "high-risk-work",
    label: "고위험 작업 관리",
    path: "/dashboard/site-manager/high-risk-work?role=site-manager",
    icon: AlertTriangle,
    description: "작업허가제(PTW) 승인 및 MSDS 관리",
    dbTables: ["ptw_requests", "msds", "approvals"],
    legalDocs: ["작업허가서", "MSDS 열람 기록"],
    role: "site",
  },
  {
    id: "inspection",
    label: "현장 및 장비 점검",
    path: "/dashboard/inspection?role=site-manager",
    icon: CheckCircle2,
    description: "사용 전 점검표 작성 및 전자서명",
    dbTables: ["inspection_logs", "equipment_checks", "signatures"],
    legalDocs: ["점검표", "장비 점검 기록"],
    role: "site",
  },
  {
    id: "worker-management",
    label: "기능인 관리",
    path: "/dashboard/site-manager/worker-management?role=site-manager",
    icon: Shield,
    description: "현장 상벌점(포인트) 부여 및 교육 이력",
    dbTables: ["workers", "points", "education_history"],
    legalDocs: ["교육 이력", "상벌점 기록"],
    role: "site",
  },
  {
    id: "feedback-accident",
    label: "의견 및 사고 대응",
    path: "/dashboard/site-manager/feedback-accident?role=site-manager",
    icon: Shield,
    description: "안전 신문고 처리, 아차사고 보고",
    dbTables: ["feedback", "near_miss", "accidents"],
    legalDocs: ["안전 신문고 기록", "아차사고 보고서"],
    role: "site",
  },
  // 기능인
  {
    id: "safety-center",
    label: "안전 센터",
    path: "/dashboard/worker-app/safety-center?role=worker",
    icon: Shield,
    description: "작업중지권 및 위험 신고 버튼",
    dbTables: ["stop_work_logs", "risk_reports"],
    legalDocs: ["작업중지권 기록", "위험 신고서"],
    role: "worker",
  },
  {
    id: "today-tasks",
    label: "오늘의 할 일",
    path: "/dashboard/worker-app/today-tasks?role=worker",
    icon: ClipboardList,
    description: "TBM 확인, 교육 참석 및 전자서명",
    dbTables: ["tbm_logs", "education_logs", "signatures"],
    legalDocs: ["TBM 일지", "교육일지"],
    role: "worker",
  },
  {
    id: "mypage",
    label: "마이페이지",
    path: "/dashboard/worker-app/mypage?role=worker",
    icon: Award,
    description: "나의 포인트 확인 (등급 비공개)",
    dbTables: ["workers", "points"],
    legalDocs: ["포인트 기록"],
    role: "worker",
  },
  {
    id: "communication",
    label: "소통 창구",
    path: "/dashboard/worker-app/communication?role=worker",
    icon: Languages,
    description: "다국어 공지사항 확인",
    dbTables: ["notices", "translations"],
    legalDocs: ["공지사항"],
    role: "worker",
  },
];

export default function LogicMapPage() {
  const router = useRouter();
  const [selectedNode, setSelectedNode] = useState<NodeInfo | null>(null);
  const [isScenarioRunning, setIsScenarioRunning] = useState(false);

  const hqNodes = logicNodes.filter((n) => n.role === "hq");
  const siteNodes = logicNodes.filter((n) => n.role === "site");
  const workerNodes = logicNodes.filter((n) => n.role === "worker");

  const handleNodeClick = (node: NodeInfo) => {
    setSelectedNode(node);
  };

  const handleNavigate = (path: string) => {
    // LocalStorage에 로직 맵에서 왔다는 플래그 저장
    if (typeof window !== "undefined") {
      localStorage.setItem("fromLogicMap", "true");
    }
    router.push(path);
  };

  const handleScenarioDemo = () => {
    setIsScenarioRunning(true);
    
    // 시나리오 시각화 애니메이션
    const steps = [
      { step: 1, title: "근로자 앱에서 위험제보 발생", role: "worker", path: "/dashboard/worker-app/safety-center?role=worker" },
      { step: 2, title: "현장 관리자에게 푸시 알림 및 조치 입력", role: "site-manager", path: "/dashboard/site-manager/feedback-accident?role=site-manager" },
      { step: 3, title: "본사 경영진 보고서에 실시간 통계 반영", role: "headquarters", path: "/dashboard/headquarters/quarterly-meeting?role=headquarters" },
    ];

    let currentStep = 0;
    const showStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        const message = `[시나리오 ${step.step}/3]\n\n${step.title}\n\n해당 화면으로 이동하시겠습니까?`;
        
        if (confirm(message)) {
          handleNavigate(step.path);
        }
        
        currentStep++;
        if (currentStep < steps.length) {
          setTimeout(showStep, 2000);
        } else {
          setIsScenarioRunning(false);
          alert("시나리오 시연이 완료되었습니다!\n\n데이터 흐름:\n1. 근로자 위험제보 → LocalStorage 저장\n2. 현장 관리자 조치 → 데이터 업데이트\n3. 본사 보고서 → 자동 아카이빙");
        }
      }
    };
    
    setTimeout(showStep, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-safety-navy mb-2">시스템 로직 맵</h1>
            <p className="text-gray-600">BESMA 플랫폼의 유기적 연결 구조를 시각화합니다</p>
          </div>
          <div className="flex gap-3">
            <Link href="/demo/role-selection">
              <Button variant="outline" className="gap-2">
                <ArrowRight className="w-4 h-4" />
                역할 선택으로
              </Button>
            </Link>
            <Button
              onClick={handleScenarioDemo}
              className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
              disabled={isScenarioRunning}
            >
              <Play className="w-4 h-4" />
              시나리오 시연
            </Button>
          </div>
        </div>
      </div>

      {/* Flowchart */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* 본사 관리자 섹션 */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-safety-navy">본사 관리자 / 경영책임자</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hqNodes.map((node) => {
              const Icon = node.icon;
              return (
                <Card
                  key={node.id}
                  className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-blue-500"
                  onClick={() => handleNodeClick(node)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <CardTitle className="text-base">{node.label}</CardTitle>
                    </div>
                    <CardDescription className="text-xs">{node.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      size="sm"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(node.path);
                      }}
                    >
                      실제 화면으로 이동 <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 화살표 */}
        <div className="flex justify-center">
          <div className="w-1 h-16 bg-gradient-to-b from-blue-500 to-green-500 rounded-full"></div>
        </div>

        {/* 현장 관리자 섹션 */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-safety-navy">현장 관리자 / 안전과장</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {siteNodes.map((node) => {
              const Icon = node.icon;
              return (
                <Card
                  key={node.id}
                  className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-green-500"
                  onClick={() => handleNodeClick(node)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-green-600" />
                      </div>
                      <CardTitle className="text-base">{node.label}</CardTitle>
                    </div>
                    <CardDescription className="text-xs">{node.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      size="sm"
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(node.path);
                      }}
                    >
                      실제 화면으로 이동 <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 화살표 */}
        <div className="flex justify-center">
          <div className="w-1 h-16 bg-gradient-to-b from-green-500 to-amber-500 rounded-full"></div>
        </div>

        {/* 기능인 섹션 */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <HardHat className="w-6 h-6 text-amber-600" />
            <h2 className="text-2xl font-bold text-safety-navy">기능인 / 근로자</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {workerNodes.map((node) => {
              const Icon = node.icon;
              return (
                <Card
                  key={node.id}
                  className="cursor-pointer hover:shadow-lg transition-all border-2 hover:border-amber-500"
                  onClick={() => handleNodeClick(node)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-amber-600" />
                      </div>
                      <CardTitle className="text-base">{node.label}</CardTitle>
                    </div>
                    <CardDescription className="text-xs">{node.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      size="sm"
                      className="w-full bg-amber-600 hover:bg-amber-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate(node.path);
                      }}
                    >
                      실제 화면으로 이동 <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* 연동 정보 팝업 */}
      {selectedNode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" />
                  {selectedNode.label} 연동 정보
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedNode(null)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-safety-navy">연동 DB 테이블</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.dbTables.map((table) => (
                    <span
                      key={table}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {table}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-safety-navy">법적 서류 반영</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {selectedNode.legalDocs.map((doc) => (
                    <li key={doc}>{doc}</li>
                  ))}
                </ul>
              </div>
              {selectedNode.id === "tbm-work-order" && (
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h4 className="font-semibold mb-3 text-orange-700 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    작업 변경 (MOC) 흐름
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        1
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">작업 변경 발생</div>
                        <div className="text-gray-600 text-xs">관리자가 [공종 변경] 버튼 클릭</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-orange-500">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        2
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">DB 재조회</div>
                        <div className="text-gray-600 text-xs">본사 표준 위험성평가 DB에서 새로운 공종의 위험요인 즉시 조회</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center text-orange-500">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                        3
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">근로자 재교육/서명</div>
                        <div className="text-gray-600 text-xs">변경된 위험요인에 대한 즉석 확인 및 전자서명 (변경 TBM)</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="pt-4 border-t">
                <Button
                  className="w-full bg-safety-navy hover:bg-safety-navy-light"
                  onClick={() => {
                    handleNavigate(selectedNode.path);
                    setSelectedNode(null);
                  }}
                >
                  실제 화면으로 이동 <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 데이터 흐름 안내 */}
      <div className="max-w-7xl mx-auto mt-12">
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle>데이터 연계 흐름</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-white rounded-lg">
                <div className="font-semibold text-blue-600 mb-1">방침 → 현장</div>
                <div className="text-gray-600">
                  본사에서 승인된 안전보건 방침이 모든 현장 관리자 대시보드 및 근로자 앱에 실시간 출력
                </div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="font-semibold text-green-600 mb-1">TBM → 위험성평가</div>
                <div className="text-gray-600">
                  TBM 작성 시 본사 표준 위험성평가 DB에서 공종별 위험요인을 API로 불러와 매핑
                </div>
              </div>
              <div className="p-3 bg-white rounded-lg border-2 border-orange-300">
                <div className="font-semibold text-orange-600 mb-1">작업 변경 (MOC) 흐름</div>
                <div className="text-gray-600 space-y-1">
                  <div>1. [공종 변경] 버튼 클릭</div>
                  <div>2. 본사 DB에서 새로운 공종의 위험요인 즉시 조회</div>
                  <div>3. 화면에 위험요인 및 대책 자동 갱신</div>
                  <div>4. 근로자 즉석 확인 서명 (변경 TBM)</div>
                  <div className="text-xs text-gray-500 mt-2">※ 모든 변경 이력은 타임라인에 누적 기록</div>
                </div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="font-semibold text-purple-600 mb-1">서명 → 보고서</div>
                <div className="text-gray-600">
                  근로자의 모든 전자서명이 분기 경영회의록 및 반기 이행점검 보고서에 증빙 데이터로 자동 아카이빙
                </div>
              </div>
              <div className="p-3 bg-white rounded-lg">
                <div className="font-semibold text-amber-600 mb-1">포인트 → 등급</div>
                <div className="text-gray-600">
                  현장에서 부여된 상벌점이 본사 인사 DB로 전송되어 안전/품질 등급을 자동 갱신 (등급은 관리자 전용)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
