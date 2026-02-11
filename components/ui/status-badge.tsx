// 재사용 가능한 상태 배지 컴포넌트

import { getStatusLabel, getStatusColor } from "@/lib/status-utils";
import { getStatusIcon } from "@/lib/status-icons";
import type { DocumentStatus } from "@/lib/safety-document-config";

interface StatusBadgeProps {
  status: DocumentStatus;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatusBadge({ 
  status, 
  showIcon = true, 
  size = "md",
  className = "" 
}: StatusBadgeProps) {
  const sizeClasses = {
    sm: "text-[10px] px-1.5 py-0.5",
    md: "text-xs px-2 py-1",
    lg: "text-sm px-3 py-1.5",
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {showIcon && getStatusIcon(status)}
      <span className={`rounded-full ${getStatusColor(status)} ${sizeClasses[size]}`}>
        {getStatusLabel(status)}
      </span>
    </div>
  );
}
