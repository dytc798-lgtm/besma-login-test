"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileCheck, 
  ArrowLeft, 
  CheckCircle2, 
  X, 
  Clock,
  MapPin,
  Calendar,
  User,
  AlertTriangle,
  Download,
  Send,
  Edit
} from "lucide-react";
import Link from "next/link";

// Mock 작업허가서 데이터
type WorkPermitStatus = "draft" | "site-approved" | "submitted" | "headquarters-approved" | "rejected";

interface WorkPermit {
  id: number;
  workPlanId: number;
  workPlanType: "forklift" | "crane" | "excavator";
  workPlanModel: string;
  workLocation: string;
  workSection: string;
  workDate: string;
  workTime: string;
  operator: string;
  task: string;
  status: WorkPermitStatus;
  siteApprovals: {
    supervisor: { approved: boolean; name: string; date?: string };
    safetyManager: { approved: boolean; name: string; date?: string };
    siteManager: { approved: boolean; name: string; date?: string };
  };
  headquartersApproval?: {
    approved: boolean;
    name: string;
    date?: string;
  };
  submittedAt?: string;
  createdAt: string;
}

const mockWorkPermits: WorkPermit[] = [
  {
    id: 1,
    workPlanId: 1,
    workPlanType: "forklift",
    workPlanModel: "현대 50D-9",
    workLocation: "인천1구역 102동",
    workSection: "1층 ~ 3층",
    workDate: "2024-01-22",
    workTime: "09:00 ~ 17:00",
    operator: "홍길동",
    task: "자재 운반 작업",
    status: "site-approved",
    siteApprovals: {
      supervisor: { approved: true, name: "김관리", date: "2024-01-21 14:30" },
      safetyManager: { approved: true, name: "이안전", date: "2024-01-21 15:00" },
      siteManager: { approved: true, name: "박소장", date: "2024-01-21 16:00" },
    },
    submittedAt: "2024-01-21 16:00",
    createdAt: "2024-01-21 09:00",
  },
  {
    id: 2,
    workPlanId: 2,
    workPlanType: "crane",
    workPlanModel: "두산 DX300LC",
    workLocation: "인천1구역 103동",
    workSection: "지상 ~ 5층",
    workDate: "2024-01-22",
    workTime: "10:00 ~ 18:00",
    operator: "김철수",
    task: "구조물 양중 작업",
    status: "draft",
    siteApprovals: {
      supervisor: { approved: true, name: "김관리", date: "2024-01-21 14:00" },
      safetyManager: { approved: false, name: "이안전", date: undefined },
      siteManager: { approved: false, name: "박소장", date: undefined },
    },
    createdAt: "2024-01-21 10:00",
  },
  {
    id: 3,
    workPlanId: 3,
    workPlanType: "excavator",
    workPlanModel: "두산 DX140W",
    workLocation: "인천1구역 현장 외곽",
    workSection: "지하 굴착 구간",
    workDate: "2024-01-22",
    workTime: "08:00 ~ 16:00",
    operator: "이영희",
    task: "토사 굴착 작업",
    status: "headquarters-approved",
    siteApprovals: {
      supervisor: { approved: true, name: "김관리", date: "2024-01-20 10:00" },
      safetyManager: { approved: true, name: "이안전", date: "2024-01-20 11:00" },
      siteManager: { approved: true, name: "박소장", date: "2024-01-20 12:00" },
    },
    headquartersApproval: {
      approved: true,
      name: "본사 안전팀",
      date: "2024-01-20 15:00",
    },
    submittedAt: "2024-01-20 12:00",
    createdAt: "2024-01-20 08:00",
  },
];

function WorkPermitPageContent() {
  const searchParams = useSearchParams();
  const [permits, setPermits] = useState<WorkPermit[]>(mockWorkPermits);
  const [selectedPermit, setSelectedPermit] = useState<WorkPermit | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 작업계획서에서 작업허가서 생성 시
  useEffect(() => {
    const fromWorkPlan = searchParams.get("from");
    if (fromWorkPlan === "work-plan") {
      const type = searchParams.get("type");
      const model = searchParams.get("model");
      const operator = searchParams.get("operator");
      const date = searchParams.get("date");
      const time = searchParams.get("time");

      if (type && model && operator && date) {
        const newPermit: WorkPermit = {
          id: permits.length + 1,
          workPlanId: permits.length + 1,
          workPlanType: type as "forklift" | "crane" | "excavator",
          workPlanModel: model || "",
          workLocation: "인천1구역", // 기본값, 실제로는 작업계획서에서 가져옴
          workSection: "작업 구간", // 기본값
          workDate: date,
          workTime: time || "09:00 ~ 17:00",
          operator: operator,
          task: `${type === "forklift" ? "지게차" : type === "crane" ? "크레인" : "굴착기"} 작업`,
          status: "draft",
          siteApprovals: {
            supervisor: { approved: false, name: "김관리" },
            safetyManager: { approved: false, name: "이안전" },
            siteManager: { approved: false, name: "박소장" },
          },
          createdAt: new Date().toISOString(),
        };
        setPermits((prev) => [newPermit, ...prev]);
        setSelectedPermit(newPermit);
        // URL 파라미터 제거
        window.history.replaceState({}, "", "/dashboard/work-permit");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleApprove = (permitId: number, approvalType: "supervisor" | "safetyManager" | "siteManager") => {
    setPermits(permits.map(permit => {
      if (permit.id === permitId) {
        const updated = { ...permit };
        updated.siteApprovals[approvalType].approved = true;
        updated.siteApprovals[approvalType].date = new Date().toISOString();
        
        // 모든 현장 승인이 완료되면 상신 가능 상태로 변경
        const allApproved = 
          updated.siteApprovals.supervisor.approved &&
          updated.siteApprovals.safetyManager.approved &&
          updated.siteApprovals.siteManager.approved;
        
        if (allApproved && updated.status === "draft") {
          updated.status = "site-approved";
        }
        
        return updated;
      }
      return permit;
    }));
  };

  const handleSubmit = (permitId: number) => {
    setPermits(permits.map(permit => {
      if (permit.id === permitId && permit.status === "site-approved") {
        return {
          ...permit,
          status: "submitted",
          submittedAt: new Date().toISOString(),
        };
      }
      return permit;
    }));
    alert("본사로 작업허가서가 상신되었습니다.");
  };

  const handleHeadquartersApprove = (permitId: number) => {
    setPermits(permits.map(permit => {
      if (permit.id === permitId && permit.status === "submitted") {
        return {
          ...permit,
          status: "headquarters-approved",
          headquartersApproval: {
            approved: true,
            name: "본사 안전팀",
            date: new Date().toISOString(),
          },
        };
      }
      return permit;
    }));
    alert("작업허가서가 승인되었습니다.");
  };

  const getStatusLabel = (status: WorkPermitStatus) => {
    switch (status) {
      case "draft":
        return "작성중";
      case "site-approved":
        return "현장 승인 완료";
      case "submitted":
        return "본사 상신 완료";
      case "headquarters-approved":
        return "본사 승인 완료";
      case "rejected":
        return "반려";
      default:
        return status;
    }
  };

  const getStatusColor = (status: WorkPermitStatus) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-700";
      case "site-approved":
        return "bg-blue-100 text-blue-700";
      case "submitted":
        return "bg-yellow-100 text-yellow-700";
      case "headquarters-approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (selectedPermit) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => setSelectedPermit(null)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-safety-navy">작업허가서 상세</h1>
            <p className="text-gray-600">작업허가서 내용 및 승인 현황</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>작업허가서</CardTitle>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedPermit.status)}`}>
                {getStatusLabel(selectedPermit.status)}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 결재란 */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="text-sm font-semibold mb-4">결재</div>
              <div className="grid grid-cols-3 gap-4">
                {/* 현장 결재 */}
                <div className="space-y-2">
                  <div className="text-xs text-gray-600 mb-2">현장 결재</div>
                  <div className="border-2 border-gray-300 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600 mb-2">관리감독자</div>
                    <div className="h-12 border-b-2 border-dashed border-gray-300 mb-2"></div>
                    <div className="text-xs text-gray-500">
                      {selectedPermit.siteApprovals.supervisor.approved ? (
                        <div className="text-green-600">
                          <CheckCircle2 className="w-4 h-4 inline mr-1" />
                          {selectedPermit.siteApprovals.supervisor.name}
                          <div className="text-xs mt-1">{selectedPermit.siteApprovals.supervisor.date?.split("T")[0]}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">미승인</span>
                      )}
                    </div>
                  </div>
                  <div className="border-2 border-gray-300 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600 mb-2">안전담당(관리)자</div>
                    <div className="h-12 border-b-2 border-dashed border-gray-300 mb-2"></div>
                    <div className="text-xs text-gray-500">
                      {selectedPermit.siteApprovals.safetyManager.approved ? (
                        <div className="text-green-600">
                          <CheckCircle2 className="w-4 h-4 inline mr-1" />
                          {selectedPermit.siteApprovals.safetyManager.name}
                          <div className="text-xs mt-1">{selectedPermit.siteApprovals.safetyManager.date?.split("T")[0]}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">미승인</span>
                      )}
                    </div>
                  </div>
                  <div className="border-2 border-gray-300 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600 mb-2">현장소장</div>
                    <div className="h-12 border-b-2 border-dashed border-gray-300 mb-2"></div>
                    <div className="text-xs text-gray-500">
                      {selectedPermit.siteApprovals.siteManager.approved ? (
                        <div className="text-green-600">
                          <CheckCircle2 className="w-4 h-4 inline mr-1" />
                          {selectedPermit.siteApprovals.siteManager.name}
                          <div className="text-xs mt-1">{selectedPermit.siteApprovals.siteManager.date?.split("T")[0]}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">미승인</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* 본사 결재 */}
                <div className="col-span-2 space-y-2">
                  <div className="text-xs text-gray-600 mb-2">본사 결재</div>
                  <div className="border-2 border-gray-300 rounded-lg p-3 text-center">
                    <div className="text-xs text-gray-600 mb-2">본사 안전팀</div>
                    <div className="h-12 border-b-2 border-dashed border-gray-300 mb-2"></div>
                    <div className="text-xs text-gray-500">
                      {selectedPermit.headquartersApproval?.approved ? (
                        <div className="text-green-600">
                          <CheckCircle2 className="w-4 h-4 inline mr-1" />
                          {selectedPermit.headquartersApproval.name}
                          <div className="text-xs mt-1">{selectedPermit.headquartersApproval.date?.split("T")[0]}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">대기중</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 작업 정보 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">작업 장소</label>
                <div className="font-semibold mt-1">{selectedPermit.workLocation}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">작업 구간</label>
                <div className="font-semibold mt-1">{selectedPermit.workSection}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">작업 일자</label>
                <div className="font-semibold mt-1">{selectedPermit.workDate}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">작업 시간</label>
                <div className="font-semibold mt-1">{selectedPermit.workTime}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">작업 내용</label>
                <div className="font-semibold mt-1">{selectedPermit.task}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">운전원</label>
                <div className="font-semibold mt-1">{selectedPermit.operator}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">장비 종류</label>
                <div className="font-semibold mt-1">
                  {selectedPermit.workPlanType === "forklift" ? "지게차" : 
                   selectedPermit.workPlanType === "crane" ? "크레인" : "굴착기"}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">장비 모델</label>
                <div className="font-semibold mt-1">{selectedPermit.workPlanModel}</div>
              </div>
            </div>

            {/* 작업계획서 링크 */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm font-semibold mb-2">연동된 작업계획서</div>
              <Link 
                href={`/dashboard/work-plan`}
                className="text-blue-600 hover:underline text-sm"
              >
                작업계획서 #{selectedPermit.workPlanId} 보기 →
              </Link>
            </div>

            {/* 액션 버튼 */}
            <div className="flex gap-3 pt-4 border-t">
              {selectedPermit.status === "draft" && (
                <>
                  {!selectedPermit.siteApprovals.supervisor.approved && (
                    <Button
                      onClick={() => handleApprove(selectedPermit.id, "supervisor")}
                      className="flex-1"
                    >
                      관리감독자 승인
                    </Button>
                  )}
                  {selectedPermit.siteApprovals.supervisor.approved && !selectedPermit.siteApprovals.safetyManager.approved && (
                    <Button
                      onClick={() => handleApprove(selectedPermit.id, "safetyManager")}
                      className="flex-1"
                    >
                      안전담당(관리)자 승인
                    </Button>
                  )}
                  {selectedPermit.siteApprovals.supervisor.approved && 
                   selectedPermit.siteApprovals.safetyManager.approved && 
                   !selectedPermit.siteApprovals.siteManager.approved && (
                    <Button
                      onClick={() => handleApprove(selectedPermit.id, "siteManager")}
                      className="flex-1"
                    >
                      현장소장 승인
                    </Button>
                  )}
                </>
              )}
              {selectedPermit.status === "site-approved" && (
                <Button
                  onClick={() => handleSubmit(selectedPermit.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4 mr-2" />
                  본사로 상신
                </Button>
              )}
              {selectedPermit.status === "submitted" && (
                <Button
                  onClick={() => handleHeadquartersApprove(selectedPermit.id)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  본사 승인
                </Button>
              )}
              {selectedPermit.status === "headquarters-approved" && (
                <Button
                  className="flex-1 bg-safety-navy hover:bg-safety-navy-light"
                >
                  <Download className="w-4 h-4 mr-2" />
                  출력
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">작업허가서</h1>
        <p className="text-gray-600">작업계획서 기반 작업허가서 관리</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>작업허가서 목록</CardTitle>
          <CardDescription>현장 승인 → 본사 승인 플로우</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {permits.map((permit) => (
              <div
                key={permit.id}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedPermit(permit)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileCheck className="w-5 h-5 text-safety-navy" />
                      <div className="font-semibold">
                        {permit.workPlanType === "forklift" ? "지게차" : 
                         permit.workPlanType === "crane" ? "크레인" : "굴착기"} 작업허가서
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(permit.status)}`}>
                        {getStatusLabel(permit.status)}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="text-gray-500">작업장소:</span> {permit.workLocation}
                      </div>
                      <div>
                        <span className="text-gray-500">작업구간:</span> {permit.workSection}
                      </div>
                      <div>
                        <span className="text-gray-500">작업일자:</span> {permit.workDate}
                      </div>
                      <div>
                        <span className="text-gray-500">운전원:</span> {permit.operator}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPermit(permit);
                      }}
                    >
                      상세보기
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Link href="/dashboard/work-plan">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            작업계획서에서 생성
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function WorkPermitPage() {
  return (
    <Suspense fallback={<div className="p-6">로딩 중...</div>}>
      <WorkPermitPageContent />
    </Suspense>
  );
}
