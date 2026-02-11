"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockNotices } from "@/lib/mock-data";
import { Search, FileText, AlertCircle, Calendar, User } from "lucide-react";

export default function NoticePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNotice, setSelectedNotice] = useState<number | null>(null);

  const filteredNotices = mockNotices.filter(
    (notice) =>
      notice.title.includes(searchTerm) ||
      notice.content.includes(searchTerm) ||
      notice.category.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-safety-navy mb-2">공지사항</h1>
        <p className="text-gray-600">안전보건 관련 공지사항 및 지침</p>
      </div>

      {/* 검색 */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="제목, 내용, 카테고리로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* 공지사항 목록 */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-8 text-gray-500">검색 결과가 없습니다.</div>
        ) : (
          filteredNotices.map((notice) => (
            <Card
              key={notice.id}
              className={`cursor-pointer hover:border-blue-500 transition-colors ${
                selectedNotice === notice.id ? "border-blue-500 bg-blue-50" : ""
              }`}
              onClick={() => setSelectedNotice(selectedNotice === notice.id ? null : notice.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-lg">{notice.title}</CardTitle>
                      {notice.important && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                          중요
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {notice.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {notice.date}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 rounded-full">{notice.category}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              {selectedNotice === notice.id && (
                <CardContent>
                  <div className="border-t pt-4">
                    <div className="text-gray-700 whitespace-pre-line">{notice.content}</div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

