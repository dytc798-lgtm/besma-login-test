// 상태 아이콘 컴포넌트

"use client";

import { CheckCircle2, Clock, AlertCircle, X } from "lucide-react";
import type { DocumentStatus } from "./safety-document-config";

/**
 * 문서 상태에 따른 아이콘 반환
 */
export function getStatusIcon(status: DocumentStatus) {
  switch (status) {
    case "submitted":
      return <CheckCircle2 className="w-4 h-4 text-green-600" />;
    case "pending":
      return <Clock className="w-4 h-4 text-yellow-600" />;
    case "overdue":
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    default:
      return <X className="w-4 h-4 text-gray-400" />;
  }
}
