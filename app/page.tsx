"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Brain, Mic, FileText, CheckCircle2, ArrowRight, Info, X, Network, AlertCircle } from "lucide-react";
import Link from "next/link";

const STRUCTURE_ACCESS_PASSWORD = "1234";

export default function LandingPage() {
  const router = useRouter();
  const [showRequirements, setShowRequirements] = useState(false);
  const [showImplementationStatus, setShowImplementationStatus] = useState(false);
  const [showStructurePassword, setShowStructurePassword] = useState(false);
  const [structurePasswordInput, setStructurePasswordInput] = useState("");
  const [structurePasswordError, setStructurePasswordError] = useState("");

  const handleStructurePasswordSubmit = () => {
    if (structurePasswordInput === STRUCTURE_ACCESS_PASSWORD) {
      setShowStructurePassword(false);
      setStructurePasswordInput("");
      setStructurePasswordError("");
      router.push("/architecture");
    } else {
      setStructurePasswordError("비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-safety-navy to-safety-navy-light flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg text-safety-navy">BESMA</div>
              <div className="text-xs text-gray-500">부현전기 안전보건플랫폼</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select className="text-sm border rounded-md px-3 py-1.5 bg-white">
              <option>KR</option>
              <option>EN</option>
              <option>VN</option>
              <option>CH</option>
            </select>
          </div>
        </div>
      </nav>

      {/* 변경된 구조 진입: 녹색 버튼 + 비밀번호 1234 */}
      <div className="container mx-auto px-4 pt-6">
        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-full px-8 py-6 text-lg shadow-lg"
            onClick={() => {
              setShowStructurePassword(true);
              setStructurePasswordInput("");
              setStructurePasswordError("");
            }}
          >
            변경된 구조 보기
          </Button>
        </div>
      </div>

      {/* 비밀번호 팝업: 1234 입력 시 /architecture 진입 */}
      {showStructurePassword && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4">
            <p className="text-center text-gray-700 mb-4">
              비밀번호 8자리를 누르세요.
            </p>
            <input
              type="password"
              inputMode="numeric"
              maxLength={8}
              placeholder="비밀번호 입력"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-lg tracking-widest"
              value={structurePasswordInput}
              onChange={(e) => {
                setStructurePasswordInput(e.target.value.replace(/\D/g, "").slice(0, 8));
                setStructurePasswordError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleStructurePasswordSubmit()}
              autoFocus
            />
            {structurePasswordError && (
              <p className="text-red-600 text-sm mt-2 text-center">{structurePasswordError}</p>
            )}
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowStructurePassword(false);
                  setStructurePasswordInput("");
                  setStructurePasswordError("");
                }}
              >
                취소
              </Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleStructurePasswordSubmit}>
                확인
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-safety-navy mb-6">
            중대재해처벌법 완벽 대응
            <br />
            <span className="text-industrial-yellow">부현전기 안전보건플랫폼 BESMA</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            실시간 현장 모니터링부터 법적 서류 자동화까지.
            <br />
            안전 관리는 선택이 아닌 필수입니다.
          </p>
          <div className="flex gap-4 justify-center flex-wrap mb-4">
            <Link href="/demo/role-selection">
              <Button size="lg" className="bg-safety-navy hover:bg-safety-navy-light text-white px-8 py-6 text-lg">
                플랫폼 데모 시작
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/admin/logic-map">
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-6 text-lg">
                시스템 로직 맵
                <Network className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-industrial-yellow text-industrial-yellow hover:bg-industrial-yellow hover:text-white px-8 py-6 text-lg"
              onClick={() => setShowRequirements(true)}
            >
              🛠️ 스마일소프트 구현요청
              <Info className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-6 text-lg"
              onClick={() => setShowImplementationStatus(true)}
            >
              🛠️ 신규 구현 요청 내역
              <CheckCircle2 className="ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            <Link href="/plan" className="hover:text-safety-navy underline">
              안전보건플랫폼 구축계획 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="border-2 hover:border-industrial-yellow transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">AI 위험성평가</CardTitle>
              <CardDescription>
                작업 공종(예: 트레이 설치)만 입력하면 DB에서 위험요인 자동 매칭
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-industrial-yellow transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <Mic className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">스마트 TBM</CardTitle>
              <CardDescription>
                음성 녹음 자동 텍스트 변환 및 서명 디지털화
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-industrial-yellow transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">작업 허가제(PTW)</CardTitle>
              <CardDescription>
                화기/밀폐/고소 작업 모바일 승인 시스템
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-2 hover:border-industrial-yellow transition-colors">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-xl">Digital Edu Log</CardTitle>
              <CardDescription>
                교육 입실 시 QR 태깅 및 전자서명으로 교육일지 PDF 자동 생성
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-safety-navy text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xl mb-8">
            이미 <span className="text-industrial-yellow font-bold">00개</span>의 공공기관 현장이 BESMA와 함께하고 있습니다.
          </p>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-60">
            <div className="px-8 py-4 bg-white/10 rounded-lg backdrop-blur-sm">로고 1</div>
            <div className="px-8 py-4 bg-white/10 rounded-lg backdrop-blur-sm">로고 2</div>
            <div className="px-8 py-4 bg-white/10 rounded-lg rounded-lg backdrop-blur-sm">로고 3</div>
            <div className="px-8 py-4 bg-white/10 rounded-lg backdrop-blur-sm">로고 4</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2024 부현전기 안전보건플랫폼 BESMA. All rights reserved.</p>
        </div>
      </footer>

      {/* 구현요청 내역 모달 */}
      {showRequirements && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
            <CardHeader className="sticky top-0 bg-white border-b z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">구현요청 내역</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowRequirements(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-safety-navy">1단계: 진입점 및 데모 모드 구현</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-3">
                  <li>홈 화면: 중앙에 [플랫폼 데모 시작] 및 [구현요청 내역 확인] 버튼</li>
                  <li>롤 선택 화면: 본사 관리자/경영책임자, 현장 관리자/안전과장, 기능인/근로자 3가지 카드 선택</li>
                  <li>역할별 렌더링: 선택한 역할에 따라 메뉴 구조 즉시 적용</li>
                </ul>
                <div className="mt-3">
                  <Link href="/demo/role-selection">
                    <Button variant="outline" size="sm" className="text-xs">
                      <ArrowRight className="w-3 h-3 mr-1" />
                      롤 선택 화면 참고
                    </Button>
                  </Link>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-safety-navy">2단계: 역할별 메뉴 구조 재배치</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">[본사 관리자 / 경영책임자]</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                      <li>안전보건 방침 및 목표 (작성: 안전담당자 / 최종 승인: 대표이사)</li>
                      <li>전사 통합 대시보드</li>
                      <li>분기 경영회의</li>
                      <li>반기 이행점검 보고 (중처법 핵심)</li>
                      <li>인사 및 격리 관리</li>
                      <li>전사 문서 보관소</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">[현장 관리자]</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                      <li>TBM 및 작업지시</li>
                      <li>고위험 작업 관리 (PTW, MSDS)</li>
                      <li>현장 및 장비 점검</li>
                      <li>기능인 관리</li>
                      <li>의견 및 사고 대응</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">[기능인 앱]</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-4">
                      <li>안전 센터 (작업중지권, 위험 신고)</li>
                      <li>오늘의 할 일 (TBM, 교육, 서명)</li>
                      <li>마이페이지 (포인트만 표시, 등급 비공개)</li>
                      <li>소통 창구 (다국어 공지사항)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-safety-navy">3단계: 핵심 비즈니스 로직 및 보안</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>승인 워크플로우: 작성 중 → 승인 대기 → 승인 완료</li>
                  <li>대표이사 권한만 최종 승인 버튼 활성화, 서명 이미지 PDF 자동 삽입</li>
                  <li>포인트 시스템: 근로자는 포인트만 조회, 등급은 관리자 전용</li>
                  <li>ERP 연동: 아이디/비번 연동, 퇴사자 즉시 차단 및 마스킹 처리</li>
                  <li>블랙리스트: 영구 차단 DB 등록 시 로그인 차단 및 관리자 알림</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-safety-navy">4단계: 데이터 무결성</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>메타데이터: 모든 서명 및 점검표 제출 시 GPS 위치와 서버 시간 강제 기록</li>
                  <li>잠금(Locking): 승인 완료된 문서는 수정 불가, 수정 시 Audit_Log에 이력 저장</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 핵심 전략 로직 구현 상태 모달 */}
      {showImplementationStatus && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <Card className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
            <CardHeader className="sticky top-0 bg-white border-b z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                  핵심 전략 로직 구현 상태
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowImplementationStatus(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <CardDescription className="mt-2">
                부현전기 전용 핵심 전략 로직의 구현 상태를 확인합니다. (법적 방어력 결정 요소)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* CEO 최종 승인 */}
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-800 mb-1">
                      [NEW] CEO 최종 승인
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      모든 법정 서류는 &apos;안전담당자 작성 → 대표이사 승인&apos; 결재 라인을 타야 하며, 승인 시 전자서명이 자동 날인됩니다.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">안전보건 방침 및 목표: CEO 승인 및 전자서명 자동 날인</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">반기 이행점검 보고: CEO 최종 승인 버튼 및 서명 삽입</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">분기 경영회의: 승인 워크플로우</span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Link href="/dashboard/headquarters/safety-policy?role=headquarters">
                        <Button variant="outline" size="sm" className="text-xs">
                          <ArrowRight className="w-3 h-3 mr-1" />
                          안전보건 방침 참고
                        </Button>
                      </Link>
                      <Link href="/dashboard/headquarters/biannual-report?role=headquarters">
                        <Button variant="outline" size="sm" className="text-xs">
                          <ArrowRight className="w-3 h-3 mr-1" />
                          반기 이행점검 보고 참고
                        </Button>
                      </Link>
                      <Link href="/dashboard/headquarters/quarterly-meeting?role=headquarters">
                        <Button variant="outline" size="sm" className="text-xs">
                          <ArrowRight className="w-3 h-3 mr-1" />
                          분기 경영회의 참고
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 실시간 작업 변경 (MOC) */}
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-800 mb-1">
                      [NEW] 실시간 작업 변경 (MOC)
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      작업 중 공종이나 장소가 바뀔 때 [작업 변경] 버튼을 통해 즉시 새로운 위험요인을 고지하고 재서명받는 유연한 TBM 로직입니다.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">이벤트 기반 TBM 스케줄링: 관리자 버튼 클릭 시점을 시작 시간으로 기록</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">공종 변경 기능: [공종 변경] 버튼으로 즉시 위험요인 갱신 및 재서명</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">가변적 위치(GPS) 관리: [위치 갱신] 버튼으로 GPS 좌표 누적 기록</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">변경 이력 타임라인: 모든 변경 사항이 타임라인에 누적 기록</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Link href="/dashboard/site-manager/tbm-work-order?role=site-manager">
                        <Button variant="outline" size="sm" className="text-xs">
                          <ArrowRight className="w-3 h-3 mr-1" />
                          TBM 및 작업지시 참고
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 데이터 무결성 */}
              <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                      [NEW] 데이터 무결성
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      모든 기록에 서버 타임스탬프를 박고, 대표 승인 후에는 수정이 절대 불가능하도록 Data Locking 처리합니다.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">서버 타임스탬프: 모든 서명 및 점검표 제출 시 자동 기록</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">GPS 위치 기록: 모든 데이터에 GPS 좌표 강제 태깅</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-gray-700">Data Locking: 승인 완료된 문서 수정 불가 처리</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-gray-700">Audit Log: 수정 시도 시 이력 저장</span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Link href="/dashboard/headquarters/safety-policy?role=headquarters">
                        <Button variant="outline" size="sm" className="text-xs">
                          <ArrowRight className="w-3 h-3 mr-1" />
                          승인 페이지 참고
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 등급 보안 */}
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-800 mb-1">
                      [NEW] 등급 보안
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      등급 정보는 관리자 웹에서만 조회 가능하며, 기능인 앱에서는 절대 노출되지 않도록 권한 필터링을 적용합니다.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">기능인 앱: 포인트만 표시, 등급 정보 완전 차단</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">관리자 웹: 등급 조회 가능</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">자동 등급 계산: 포인트 기반 A~D 등급 자동 산정</span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Link href="/dashboard/worker-app/mypage?role=worker">
                        <Button variant="outline" size="sm" className="text-xs">
                          <ArrowRight className="w-3 h-3 mr-1" />
                          기능인 앱 참고
                        </Button>
                      </Link>
                      <Link href="/dashboard/headquarters/personnel-management?role=headquarters">
                        <Button variant="outline" size="sm" className="text-xs">
                          <ArrowRight className="w-3 h-3 mr-1" />
                          인사 관리 참고
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 시스템 로직 맵 */}
              <div className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-green-800 mb-1">
                      [NEW] 시스템 로직 맵
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      전체 데이터 흐름을 시각화하고, 각 노드에서 실제 페이지로 이동하는 네비게이션 맵입니다.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">본사/현장/기능인 3개 섹션으로 구분된 Flowchart</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">각 노드에서 실제 화면으로 이동 기능</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">연동 DB 테이블 및 법적 서류 반영 정보 표시</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">작업 변경(MOC) 흐름 시각화</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Link href="/admin/logic-map">
                        <Button variant="outline" size="sm" className="text-xs">
                          <ArrowRight className="w-3 h-3 mr-1" />
                          시스템 로직 맵 참고
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* 로드맵 기본 사양 */}
              <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-800 mb-1">
                      로드맵 기본 사양 (구현 대상)
                    </h3>
                    <p className="text-sm text-gray-700 mb-3">
                      향후 구현될 로드맵 기본 사양입니다.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-gray-700">GPS 기반 위치 관리: 가변 전송 로직(이동/위험구역) 구현 예정</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-gray-700">기능인 등급 산정: 포인트 및 평가 기반 자동 등급(A~D) 계산 엔진 구축</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-gray-700">ERP 연동: 사번/계정 정보를 ERP와 동기화하는 인증 모듈 구현 예정</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <span className="text-gray-700">다국어 지원: STT 및 번역 API 연동을 위한 UI 구조 확보 예정</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

