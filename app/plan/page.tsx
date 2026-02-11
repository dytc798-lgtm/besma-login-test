import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Home, CheckCircle2, AlertTriangle, FileText, GraduationCap, TrendingUp, Building2, Users, BarChart3, Clock, Calendar } from "lucide-react";
import Link from "next/link";

export default function PlanPage() {
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
            <Link href="/">
              <Button variant="outline" size="sm">
                <Home className="w-4 h-4 mr-2" />
                홈으로
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="sm">데모 체험하기</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-safety-navy mb-6">
              안전보건플랫폼 구축계획
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              단계별 구축 전략으로 체계적인 안전보건 관리 시스템을 구축합니다
            </p>
          </div>

          {/* 1단계 */}
          <div className="mb-12">
            <Card className="border-2 border-blue-500 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-6 h-6" />
                      <CardTitle className="text-2xl text-white">1단계: 법적 리스크 대응 중심 구축 (단기)</CardTitle>
                    </div>
                    <CardDescription className="text-blue-100 text-lg mt-2">
                      목표 기간: ~2026년 6월
                    </CardDescription>
                  </div>
                  <div className="bg-white/20 px-4 py-2 rounded-lg">
                    <Clock className="w-8 h-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">위험성 평가 관리</h3>
                      <p className="text-sm text-gray-600">위험요인 등록·조치·이력 관리</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">안전보건 점검·조치 관리</h3>
                      <p className="text-sm text-gray-600">정기 점검 및 조치 사항 추적</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">사고·아차사고(near miss) 보고 및 이력 관리</h3>
                      <p className="text-sm text-gray-600">사고 발생 시 즉시 보고 및 이력 추적</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">교육·훈련 이력 관리</h3>
                      <p className="text-sm text-gray-600">안전 교육 이수 현황 및 자격증 관리</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">법정 문서·기록 전산화 및 증빙 관리</h3>
                      <p className="text-sm text-gray-600">법적 요구사항 문서 자동 생성 및 보관</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">실시간 리스크 모니터링 및 경보 체계</h3>
                      <p className="text-sm text-gray-600">위험 상황 실시간 감지 및 알림</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 2단계 */}
          <div className="mb-12">
            <Card className="border-2 border-green-500 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="w-6 h-6" />
                      <CardTitle className="text-2xl text-white">2단계: 예방·경영 연계 고도화 (중장기)</CardTitle>
                    </div>
                    <CardDescription className="text-green-100 text-lg mt-2">
                      목표 기간: 2026년 12월~
                    </CardDescription>
                  </div>
                  <div className="bg-white/20 px-4 py-2 rounded-lg">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">실시간 리스크 모니터링 및 경보 체계 강화</h3>
                      <p className="text-sm text-gray-600">AI 기반 예측 분석 및 고도화된 경보 시스템</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="w-10 h-10 rounded-lg bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">경영층 대시보드</h3>
                      <p className="text-sm text-gray-600">핵심 위험·지표·추세 분석 및 의사결정 지원</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">모바일 기반 현장 점검 및 즉시 조치</h3>
                      <p className="text-sm text-gray-600">스마트폰을 활용한 실시간 현장 점검 및 조치</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">협력사 안전보건 관리 및 평가 연계</h3>
                      <p className="text-sm text-gray-600">협력사 안전보건 성과 평가 및 통합 관리</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200 md:col-span-2">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">ISO 45001 운영 성과 분석 및 지속 개선 기능</h3>
                      <p className="text-sm text-gray-600">국제 표준 기반 안전보건 관리체계 운영 및 성과 분석</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-safety-navy to-safety-navy-light text-white p-8 rounded-2xl shadow-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">안전보건플랫폼과 함께하세요</h2>
              <p className="text-lg mb-6 text-blue-100">
                단계별 구축 전략으로 체계적이고 안정적인 안전보건 관리 시스템을 구축할 수 있습니다
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Link href="/">
                  <Button size="lg" variant="outline" className="bg-white text-safety-navy hover:bg-gray-100">
                    <Home className="w-5 h-5 mr-2" />
                    홈으로 돌아가기
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" className="bg-industrial-yellow text-safety-navy hover:bg-yellow-500">
                    데모 체험하기
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2024 부현전기 안전보건플랫폼 BESMA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
