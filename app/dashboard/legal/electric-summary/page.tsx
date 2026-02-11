"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, FileText, Zap } from "lucide-react";
import Link from "next/link";
import { getElectricRelatedArticles, LegalArticle } from "@/lib/legal-data";

export default function ElectricSummaryPage() {
  const [selectedArticle, setSelectedArticle] = useState<LegalArticle | null>(null);
  const articles = getElectricRelatedArticles();

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
          <h1 className="text-2xl font-bold text-safety-navy mb-2">전기공사 관련 법령요지</h1>
          <p className="text-gray-600">전기공사와 밀접한 관련이 있는 법령 조항 요약</p>
        </div>
      </div>

      {selectedArticle ? (
        <Card className="max-w-4xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{selectedArticle.documentId} {selectedArticle.articleNumber}</CardTitle>
                {selectedArticle.title && (
                  <CardDescription className="text-lg">{selectedArticle.title}</CardDescription>
                )}
              </div>
              <Button variant="outline" onClick={() => setSelectedArticle(null)}>
                목록으로
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-safety-navy">
                <div className="mb-3 text-xs text-gray-500">
                  원본 법조문 (출처: {selectedArticle.sourceFile || "법령 파일"})
                </div>
                <p className="text-gray-800 leading-relaxed text-base whitespace-pre-line">
                  {selectedArticle.originalText}
                </p>
              </div>
              {selectedArticle.keywords.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">관련 키워드</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedArticle.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500"
              onClick={() => setSelectedArticle(article)}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-bold text-safety-navy text-lg">
                        {article.documentId} {article.articleNumber}
                      </span>
                      {article.title && (
                        <span className="text-gray-600 font-medium">- {article.title}</span>
                      )}
                    </div>
                    <p className="text-gray-700 leading-relaxed line-clamp-2">
                      {article.originalText}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {article.keywords.slice(0, 3).map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                        >
                          {keyword}
                        </span>
                      ))}
                      {article.keywords.length > 3 && (
                        <span className="px-2 py-1 text-gray-500 text-xs">
                          +{article.keywords.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
