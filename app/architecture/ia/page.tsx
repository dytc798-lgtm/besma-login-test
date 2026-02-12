"use client";

import Link from "next/link";
import { IA_ITEMS, IA_ROOT, type IaItem } from "@/lib/ia-config";
import { IA_ENHANCEMENT_SECTIONS } from "@/lib/ia-enhancement";

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
          확정본 메뉴트리(Depth 1~3). 근로자 앱 · 관리자 앱 · 현장 관리자 웹 ·
          본사 관리자 웹. Role: WORKER / SITE_ADMIN / HQ_ADMIN.
        </p>
        <p className="mt-1 text-[13px] text-gray-500">
          각 항목을 클릭하면 해당 기능의 설명, 프로세스 다이어그램, 화면
          와이어프레임 목업을 확인할 수 있습니다.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-3 text-[16px] font-semibold text-gray-800">
          최종 메뉴트리 (확정본)
        </h2>
        {renderChildren(IA_ITEMS)}
      </div>

      <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-6 shadow-sm">
        <h2 className="mb-3 text-[16px] font-semibold text-amber-900">
          고도화 섹션 (기본 메뉴트리에 포함되지 않음)
        </h2>
        <p className="mb-4 text-[13px] text-amber-800">
          아래 항목은 별도 보관 목록이며, IA/화면 구성도에서는 고도화 섹션으로만
          분리 표기합니다.
        </p>
        <ul className="space-y-3">
          {IA_ENHANCEMENT_SECTIONS.map((sec) => (
            <li key={sec.id} className="list-none">
              <div className="font-medium text-amber-900">{sec.title}</div>
              <ul className="mt-1 list-inside list-disc text-[13px] text-amber-800">
                {sec.items.map((label, idx) => (
                  <li key={idx}>{label}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

