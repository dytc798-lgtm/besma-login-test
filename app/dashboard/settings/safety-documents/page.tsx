"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2,
  ArrowLeft,
  Save,
  X
} from "lucide-react";
import { defaultSafetyDocuments, type SafetyDocument, type DocumentCycle, type DocumentCategory } from "@/lib/safety-document-config";
import Link from "next/link";

export default function SafetyDocumentsSettingsPage() {
  const [documents, setDocuments] = useState<SafetyDocument[]>(defaultSafetyDocuments);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingDoc, setEditingDoc] = useState<SafetyDocument | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDoc, setNewDoc] = useState<Partial<SafetyDocument>>({
    name: "",
    cycle: "monthly",
    category: undefined,
    order: documents.length + 1,
    isActive: true,
  });

  const handleEdit = (doc: SafetyDocument) => {
    setEditingId(doc.id);
    setEditingDoc({ ...doc });
  };

  const handleSave = () => {
    if (editingDoc) {
      setDocuments(documents.map(doc => 
        doc.id === editingDoc.id 
          ? { ...editingDoc, updatedAt: new Date().toISOString().split("T")[0] }
          : doc
      ));
      setEditingId(null);
      setEditingDoc(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingDoc(null);
  };

  const handleAdd = () => {
    if (newDoc.name) {
      const doc: SafetyDocument = {
        id: `doc-${Date.now()}`,
        name: newDoc.name,
        cycle: newDoc.cycle || "monthly",
        category: newDoc.category,
        order: newDoc.order || documents.length + 1,
        isActive: newDoc.isActive ?? true,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setDocuments([...documents, doc].sort((a, b) => a.order - b.order));
      setNewDoc({
        name: "",
        cycle: "monthly",
        category: undefined,
        order: documents.length + 2,
        isActive: true,
      });
      setShowAddForm(false);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("이 서류를 삭제하시겠습니까?")) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleToggleActive = (id: string) => {
    setDocuments(documents.map(doc => 
      doc.id === id 
        ? { ...doc, isActive: !doc.isActive, updatedAt: new Date().toISOString().split("T")[0] }
        : doc
    ));
  };

  const categories: DocumentCategory[] = [
    "노동부 일반 대응",
    "노동부 안전 대응",
    "중처법 대응",
    "사규",
  ];

  // 주기별로 그룹화
  const monthlyDocs = documents.filter(d => d.cycle === "monthly");
  const biannualDocs = documents.filter(d => d.cycle === "biannual");

  // 반기 서류를 카테고리별로 그룹화
  const biannualByCategory = categories.reduce((acc, cat) => {
    acc[cat] = biannualDocs.filter(d => d.category === cat);
    return acc;
  }, {} as Record<DocumentCategory, SafetyDocument[]>);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/safety-documents">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            목록으로
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-safety-navy mb-2">안전문서 설정</h1>
          <p className="text-gray-600">필수 안전 서류 종류 및 주기를 관리합니다</p>
        </div>
      </div>

      {/* 추가 버튼 */}
      <div className="flex justify-end">
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="w-4 h-4 mr-2" />
          서류 추가
        </Button>
      </div>

      {/* 추가 폼 */}
      {showAddForm && (
        <Card className="border-2 border-blue-500">
          <CardHeader>
            <CardTitle>새 서류 추가</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">서류명</label>
              <Input
                value={newDoc.name || ""}
                onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                placeholder="서류명을 입력하세요"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">주기</label>
                <select
                  value={newDoc.cycle || "monthly"}
                  onChange={(e) => setNewDoc({ ...newDoc, cycle: e.target.value as DocumentCycle })}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="monthly">월간 (매월 1회)</option>
                  <option value="biannual">반기 (6개월 1회)</option>
                </select>
              </div>
              {newDoc.cycle === "biannual" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">카테고리</label>
                  <select
                    value={newDoc.category || ""}
                    onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value as DocumentCategory || undefined })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="">카테고리 없음</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                추가
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                <X className="w-4 h-4 mr-2" />
                취소
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 월간 서류 */}
      <Card>
        <CardHeader>
          <CardTitle>월간 서류 (매월 1회)</CardTitle>
          <CardDescription>매월 제출이 필요한 서류</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {monthlyDocs.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                {editingId === doc.id ? (
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <Input
                      value={editingDoc?.name || ""}
                      onChange={(e) => setEditingDoc(editingDoc ? { ...editingDoc, name: e.target.value } : null)}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSave}>
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancel}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="w-5 h-5 text-safety-navy" />
                      <span className={doc.isActive ? "" : "text-gray-400 line-through"}>
                        {doc.name}
                      </span>
                      {!doc.isActive && (
                        <span className="text-xs text-gray-500">(비활성화)</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleActive(doc.id)}
                      >
                        {doc.isActive ? "비활성화" : "활성화"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(doc)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 반기 서류 - 카테고리별 */}
      {categories.map(category => {
        const docs = biannualByCategory[category];
        if (docs.length === 0) return null;
        
        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle>반기 서류 (6개월 1회) - {category}</CardTitle>
              <CardDescription>{category} 관련 서류</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {docs.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    {editingId === doc.id ? (
                      <div className="flex-1 grid grid-cols-3 gap-4">
                        <Input
                          value={editingDoc?.name || ""}
                          onChange={(e) => setEditingDoc(editingDoc ? { ...editingDoc, name: e.target.value } : null)}
                        />
                        <select
                          value={editingDoc?.category || ""}
                          onChange={(e) => setEditingDoc(editingDoc ? { ...editingDoc, category: e.target.value as DocumentCategory || undefined } : null)}
                          className="p-2 border rounded-lg"
                        >
                          <option value="">카테고리 없음</option>
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleSave}>
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3 flex-1">
                          <FileText className="w-5 h-5 text-safety-navy" />
                          <span className={doc.isActive ? "" : "text-gray-400 line-through"}>
                            {doc.name}
                          </span>
                          {!doc.isActive && (
                            <span className="text-xs text-gray-500">(비활성화)</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleActive(doc.id)}
                          >
                            {doc.isActive ? "비활성화" : "활성화"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(doc)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(doc.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
