"use client";

import Link from "next/link";
import { IA_ITEMS, IA_ROOT, type IaItem } from "@/lib/ia-config";

function renderChildren(items: IaItem[], level = 0) {
  return (
    <ul className={level === 0 ? "space-y-3" : "space-y-1 pl-4"}>
      {items.map((item) => (
        <li key={item.id}>
          <div className="flex flex-col gap-0.5">
            <Link
              href={item.path}
              className="text-[14px] font-medium text-blue-700 hover:underline"
            >
              {item.title}
            </Link>
            {item.description && (
              <p className="text-[12px] text-gray-500">
                {item.description}
              </p>
            )}
          </div>
          {item.children && renderChildren(item.children, level + 1)}
        </li>
      ))}
    </ul>
  );
}

export default function ArchitectureIaIndexPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="text-[20px] font-bold text-gray-900">
          BESMA 정보구조(IA) · 전체 메뉴 맵
        </h1>
        <p className="mt-2 text-[14px] text-gray-600">
          견적서/시방서에 정의된 기능 리스트를 기준으로, 현장 근로자 앱 ·
          현장관리자(App/Web) · 본사 관리자(Web) 메뉴 구조를 정리한
          화면입니다.
        </p>
        <p className="mt-1 text-[13px] text-gray-500">
          각 항목을 클릭하면 해당 기능의 설명, 프로세스 다이어그램, 화면
          와이어프레임 목업을 확인할 수 있습니다.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {renderChildren(IA_ITEMS)}
      </div>
    </div>
  );
}

