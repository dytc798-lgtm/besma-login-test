import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Brain, Mic, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
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
            <Link href="/dashboard">
              <Button variant="outline" size="sm">데모 체험하기</Button>
            </Link>
          </div>
        </div>
      </nav>

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
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="bg-safety-navy hover:bg-safety-navy-light">
              솔루션 도입 문의
            </Button>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-industrial-yellow text-industrial-yellow hover:bg-industrial-yellow hover:text-white">
                데모 체험하기
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
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
    </div>
  );
}

