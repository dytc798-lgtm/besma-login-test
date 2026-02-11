"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Languages, MessageSquare, Bell } from "lucide-react";

export default function TranslationPage() {
  const [originalText, setOriginalText] = useState("금일 크레인 작업 중 접근 금지");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = (targetLang: string) => {
    // 가상 번역 처리
    const translations: { [key: string]: string } = {
      zh: "今日起重机作业期间禁止接近",
      vi: "Cấm tiếp cận trong quá trình làm việc của cần cẩu hôm nay",
      th: "ห้ามเข้าใกล้ระหว่างการทำงานของเครนวันนี้",
    };
    setTranslatedText(translations[targetLang] || "번역 결과 (가상 처리)");
    alert(`${targetLang === "zh" ? "중국어" : targetLang === "vi" ? "베트남어" : "태국어"}로 번역되었습니다. (Papago API 가상 처리)`);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">다국어 번역</h1>
        <p className="text-gray-600">외국인 근로자를 위한 TBM 공지 및 긴급 알림 번역 (Papago 가상 처리)</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>TBM 공지 번역</CardTitle>
          <CardDescription>소장님이 한국어로 작성한 TBM 일지가 자동으로 번역되어 외국인 근로자 앱에 표시됩니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">원문 (한국어)</label>
              <textarea
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                className="w-full p-3 border rounded-lg"
                rows={3}
                placeholder="번역할 텍스트를 입력하세요"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={() => handleTranslate("zh")} variant="outline">
                중국어로 번역
              </Button>
              <Button onClick={() => handleTranslate("vi")} variant="outline">
                베트남어로 번역
              </Button>
              <Button onClick={() => handleTranslate("th")} variant="outline">
                태국어로 번역
              </Button>
            </div>

            {translatedText && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm font-semibold mb-2">번역 결과</div>
                <div className="text-gray-700">{translatedText}</div>
              </div>
            )}

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-sm">
              <div className="font-semibold mb-2">Papago 번역 (가상 처리)</div>
              <div className="text-gray-700">
                • TBM 공지: 하루 1회 공지사항만 번역 (비용 절감)<br />
                • 긴급 알림: &ldquo;비상 대피!&rdquo; 등 긴급 메시지 다국어 동시 발송<br />
                • 중대재해처벌법 대응: 외국인 근로자 안전 교육 증빙 수단<br />
                <span className="text-xs text-gray-500">(실제 구현 시 Papago Translation API 연동)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>긴급 알림 번역</CardTitle>
          <CardDescription>비상 상황 시 다국어로 동시 발송</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button className="w-full bg-red-600 hover:bg-red-700">
              <Bell className="w-4 h-4 mr-2" />
              긴급 알림 다국어 발송
            </Button>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
              <div className="font-semibold mb-2">발송 언어</div>
              <div className="text-gray-700">
                한국어, 중국어, 베트남어, 태국어로 동시 발송 (가상 처리)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

