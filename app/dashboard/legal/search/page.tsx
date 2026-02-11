"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, FileText, X } from "lucide-react";
import Link from "next/link";
import { searchLegalArticles, LegalArticle } from "@/lib/legal-data";

export default function LegalSearchPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<LegalArticle | null>(null);
  
  const searchResults = useMemo(() => {
    if (!searchKeyword.trim()) return [];
    return searchLegalArticles(searchKeyword);
  }, [searchKeyword]);

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
          <h1 className="text-2xl font-bold text-safety-navy mb-2">법령 키워드 검색</h1>
          <p className="text-gray-600">키워드를 입력하여 관련 법령 조항을 검색하세요</p>
        </div>
      </div>

      {/* 검색 입력 */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="검색할 키워드를 입력하세요 (예: 전기, 활선, 절연, 감전 등)"
              className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none"
            />
            {searchKeyword && (
              <button
                onClick={() => setSearchKeyword("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 검색 결과 */}
      {selectedArticle ? (
        <Card className="max-w-4xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">
                  {selectedArticle.documentId} {selectedArticle.articleNumber}
                </CardTitle>
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
                        className={`px-3 py-1 rounded-full text-sm ${
                          keyword.toLowerCase().includes(searchKeyword.toLowerCase())
                            ? "bg-blue-500 text-white"
                            : "bg-blue-100 text-blue-700"
                        }`}
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
        <>
          {searchKeyword && (
            <div className="text-sm text-gray-600">
              검색 결과: <strong>{searchResults.length}건</strong>
            </div>
          )}
          
          {searchResults.length === 0 && searchKeyword ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  &quot;{searchKeyword}&quot;에 대한 검색 결과가 없습니다.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  다른 키워드로 검색해보세요.
                </p>
              </CardContent>
            </Card>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((article) => (
                <Card
                  key={article.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500"
                  onClick={() => setSelectedArticle(article)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-6 h-6 text-green-600" />
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
                          {article.keywords.slice(0, 5).map((keyword, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-1 rounded text-xs ${
                                keyword.toLowerCase().includes(searchKeyword.toLowerCase())
                                  ? "bg-green-500 text-white"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {keyword}
                            </span>
                          ))}
                          {article.keywords.length > 5 && (
                            <span className="px-2 py-1 text-gray-500 text-xs">
                              +{article.keywords.length - 5}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowLeft className="w-5 h-5 text-gray-400 flex-shrink-0 rotate-180" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  검색할 키워드를 입력하세요
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  예: 전기, 활선, 가공전선, 절연, 감전, 안전조치 등
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
