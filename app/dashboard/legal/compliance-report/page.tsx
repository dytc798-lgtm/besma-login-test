"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, FileText, Download } from "lucide-react";
import Link from "next/link";

export default function ComplianceReportPage() {
  const complianceItems = [
    {
      id: 1,
      category: "안전보건조치 의무",
      law: "중처법 제8조",
      status: "partial",
      description: "사업주가 안전보건조치를 하지 아니하여 중대산업재해가 발생한 경우 처벌",
      implemented: [
        "작업 관리: 작업지시 시 위험요인 및 안전대책 명시",
        "작업계획서: 장비별 안전계수 계산 및 한계 하중 확인",
        "위험 관리: 위험성 평가 및 관리",
        "점검계획: 정기 점검 일정 관리",
      ],
      missing: [
        "안전보건조치 이행 여부 추적 및 증빙 시스템",
        "조치 미이행 시 자동 알림 기능",
      ],
      priority: "high",
    },
    {
      id: 2,
      category: "위험성 평가",
      law: "산안법 제28조",
      status: "partial",
      description: "유해·위험요인을 파악하고 이를 제거하거나 최소화하기 위한 조치",
      implemented: [
        "위험 관리: 위험성 평가 기능",
        "작업 관리: 작업별 위험요인 등록",
        "안전 신문고: 위험요인 신고 및 피드백",
      ],
      missing: [
        "위험성 평가 결과의 정기적 재평가 시스템",
        "개선 조치 추적 및 검증 기능",
      ],
      priority: "medium",
    },
    {
      id: 3,
      category: "안전교육",
      law: "산안법 제29조",
      status: "complete",
      description: "근로자에 대한 안전보건교육 실시 및 이력 관리",
      implemented: [
        "안전 교육: 교육 계획 및 이력 관리",
        "근로자 앱: 교육 이수 확인",
        "Digital Edu Log: QR 태깅 및 전자서명으로 교육일지 PDF 자동 생성",
        "다국어 번역: 외국인 근로자 교육 지원",
      ],
      missing: [],
      priority: "none",
    },
    {
      id: 4,
      category: "작업 전 점검 및 TBM",
      law: "산안법 시행규칙",
      status: "complete",
      description: "작업 전 안전회의 실시 및 기록 보관",
      implemented: [
        "TBM 일지: 작업 전 회의 기록",
        "작업 관리: 작업지시 시 위험성평가 확인 및 서명",
        "근로자 앱: 작업지시 확인 및 서명 → TBM 일지 자동 연동",
      ],
      missing: [],
      priority: "none",
    },
    {
      id: 5,
      category: "작업 허가제(PTW)",
      law: "산안법 시행규칙",
      status: "partial",
      description: "화기작업, 밀폐공간 작업, 고소작업 등 위험작업 시 사전 허가",
      implemented: [
        "대시보드: PTW 승인 대기 현황 표시",
      ],
      missing: [
        "PTW 신청 및 승인 프로세스 상세 기능",
        "화기/밀폐/고소 작업별 세부 관리",
        "PTW 유효기간 관리 및 자동 만료 알림",
      ],
      priority: "high",
    },
    {
      id: 6,
      category: "사고 보고 및 기록 보관",
      law: "중처법 제2조",
      status: "partial",
      description: "중대산업재해 발생 시 즉시 보고 및 기록 보관",
      implemented: [
        "무재해일지: 일일 작업 완료 보고 및 기록",
        "SOS 긴급호출: 비상 상황 즉시 신고",
        "안전 신문고: 사고·아차사고(near miss) 보고",
      ],
      missing: [
        "중대재해 발생 시 법정 보고서 자동 생성 기능",
        "사고 보고서 양식 및 제출 프로세스",
      ],
      priority: "high",
    },
    {
      id: 7,
      category: "무재해일지 작성",
      law: "산안법 시행규칙",
      status: "complete",
      description: "일일 무재해일지 작성 및 보관",
      implemented: [
        "무재해일지: 일일 작업 완료 보고",
        "GPS 위치 추적 (30분 후 수신)",
        "작업 완료 서명",
        "특이사항 기록",
      ],
      missing: [],
      priority: "none",
    },
    {
      id: 8,
      category: "안전보건 관리체계 구축",
      law: "중처법 제8조",
      status: "complete",
      description: "안전보건 관리 조직 및 체계 구축",
      implemented: [
        "본사 관리: 전사 안전보건 현황 모니터링",
        "현장관리자: 현장별 안전보건 관리",
        "대시보드: 실시간 현장 현황 (GIS Map)",
      ],
      missing: [],
      priority: "none",
    },
    {
      id: 9,
      category: "협력업체 관리",
      law: "중처법 제8조",
      status: "partial",
      description: "협력업체의 안전보건 관리 및 평가",
      implemented: [
        "대시보드: 협력사 평가 현황 표시",
      ],
      missing: [
        "협력업체별 안전보건 평가 상세 기능",
        "협력업체 안전교육 이수 현황 관리",
        "협력업체 위험요인 관리",
      ],
      priority: "medium",
    },
    {
      id: 10,
      category: "법정 문서 보관",
      law: "산안법 시행규칙",
      status: "partial",
      description: "안전보건 관련 법정 문서 전산화 및 증빙 관리",
      implemented: [
        "작업계획서: 표준작업계획서 PDF 생성",
        "TBM 일지: PDF/엑셀 출력",
        "무재해일지: 기록 보관",
        "교육일지: PDF 자동 생성",
        "법령 정보: 법령 조항 검색 및 확인",
      ],
      missing: [
        "법정 문서 중앙 보관소 및 검색 기능",
        "문서 보관 기간 관리",
        "문서 버전 관리",
      ],
      priority: "medium",
    },
  ];

  const completeCount = complianceItems.filter((item) => item.status === "complete").length;
  const partialCount = complianceItems.filter((item) => item.status === "partial").length;
  const totalCount = complianceItems.length;
  const completionRate = Math.round((completeCount / totalCount) * 100);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/legal">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            뒤로가기
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-safety-navy mb-2">중처법 대응 현황 보고서</h1>
          <p className="text-gray-600">현재 구현 상태 및 보완 필요 사항</p>
        </div>
      </div>

      {/* 요약 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">완벽 대응</div>
                <div className="text-3xl font-bold text-green-600">{completeCount}개</div>
              </div>
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">보완 필요</div>
                <div className="text-3xl font-bold text-yellow-600">{partialCount}개</div>
              </div>
              <AlertTriangle className="w-12 h-12 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">대응률</div>
                <div className="text-3xl font-bold text-blue-600">{completionRate}%</div>
              </div>
              <FileText className="w-12 h-12 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">긴급 보완</div>
                <div className="text-3xl font-bold text-red-600">
                  {complianceItems.filter((item) => item.priority === "high" && item.status === "partial").length}개
                </div>
              </div>
              <XCircle className="w-12 h-12 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 상세 항목 */}
      <div className="space-y-4">
        {complianceItems.map((item) => (
          <Card
            key={item.id}
            className={`border-l-4 ${
              item.status === "complete"
                ? "border-l-green-500"
                : item.priority === "high"
                ? "border-l-red-500"
                : "border-l-yellow-500"
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-xl">{item.category}</CardTitle>
                    {item.status === "complete" ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        완벽 대응
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                        보완 필요
                      </span>
                    )}
                    {item.priority === "high" && item.status === "partial" && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        긴급
                      </span>
                    )}
                  </div>
                  <CardDescription className="text-base mb-2">
                    <strong>{item.law}</strong>: {item.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  구현 완료 항목
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                  {item.implemented.map((impl, idx) => (
                    <li key={idx}>{impl}</li>
                  ))}
                </ul>
              </div>

              {item.missing.length > 0 && (
                <div>
                  <h4 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    보완 필요 항목
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                    {item.missing.map((miss, idx) => (
                      <li key={idx}>{miss}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 권장 사항 */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl">즉시 구현 권장 사항</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-white rounded-lg border-l-4 border-red-500">
              <h4 className="font-bold text-red-700 mb-2">1. 작업 허가제(PTW) 상세 기능</h4>
              <p className="text-sm text-gray-700">
                화기/밀폐/고소 작업의 신청, 승인, 유효기간 관리 기능을 완성하여 중처법 제8조 위반 방지
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-red-500">
              <h4 className="font-bold text-red-700 mb-2">2. 안전보건조치 이행 추적 시스템</h4>
              <p className="text-sm text-gray-700">
                안전보건조치의 이행 여부를 추적하고 미이행 시 자동 알림하여 중처법 제8조 위반 방지
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border-l-4 border-red-500">
              <h4 className="font-bold text-red-700 mb-2">3. 중대재해 보고서 자동 생성</h4>
              <p className="text-sm text-gray-700">
                중대재해 발생 시 법정 보고서를 자동 생성하여 신속한 보고 및 기록 보관
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
