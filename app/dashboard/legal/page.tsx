"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Scale, FileText, Search, ArrowRight } from "lucide-react";

export default function LegalPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">법령 정보</h1>
        <p className="text-gray-600">안전보건 관련 법령을 검색하고 확인할 수 있습니다</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        <Card className="border-2 hover:border-safety-navy transition-all">
          <CardHeader>
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-xl">전기공사 관련 법령요지</CardTitle>
            <CardDescription className="text-base mt-2">
              전기공사와 밀접한 관련이 있는 법령 조항들을 요약하여 제공합니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/legal/electric-summary">
              <Button className="w-full" size="lg">
                조회하기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-safety-navy transition-all">
          <CardHeader>
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-xl">법령 키워드 검색</CardTitle>
            <CardDescription className="text-base mt-2">
              키워드를 입력하여 관련 법령 조항을 검색할 수 있습니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/legal/search">
              <Button className="w-full" size="lg">
                검색하기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-red-500 transition-all border-l-4 border-l-red-500">
          <CardHeader>
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <Scale className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-xl">중처법 대응 현황</CardTitle>
            <CardDescription className="text-base mt-2">
              현재 구현 상태 및 보완 필요 사항을 확인할 수 있습니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/legal/compliance-report">
              <Button className="w-full border-red-500 text-red-600 hover:bg-red-50" size="lg" variant="outline">
                확인하기
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
