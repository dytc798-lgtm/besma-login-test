import Link from "next/link";
import {
  IA_ROOT,
  flattenIaItems,
  type IaItem,
} from "@/lib/ia-config";
import {
  MOBILE_FEATURES,
  SITE_ADMIN_FEATURES,
  HQ_ADMIN_FEATURES,
  PLATFORM_CORE_FEATURES,
  EXTERNAL_FEATURES,
  type Feature,
} from "@/lib/architecture-features";
import { FeatureDetail } from "../../components/FeatureDetail";

const ALL_FEATURES: Feature[] = [
  ...MOBILE_FEATURES,
  ...SITE_ADMIN_FEATURES,
  ...HQ_ADMIN_FEATURES,
  ...PLATFORM_CORE_FEATURES,
  ...EXTERNAL_FEATURES,
];

export const dynamicParams = false;

export function generateStaticParams() {
  const items = flattenIaItems().filter((i) => i.path !== IA_ROOT);
  return items.map((item) => {
    const withoutRoot = item.path.replace(IA_ROOT, "");
    const parts = withoutRoot.split("/").filter(Boolean);
    return { slug: parts };
  });
}

function findFeatureById(id: string | undefined): Feature | undefined {
  if (!id) return undefined;
  return ALL_FEATURES.find((f) => f.id === id);
}

function createSyntheticFeature(item: IaItem): Feature {
  const roleLabel =
    item.roleCategory === "mobile"
      ? "근로자"
      : item.roleCategory === "site-admin"
      ? "현장 관리자"
      : item.roleCategory === "hq-admin"
      ? "본사 관리자"
      : item.roleCategory === "external"
      ? "외부 시스템"
      : "플랫폼";

  return {
    id: item.id,
    title: item.title,
    roleCategory: item.roleCategory,
    description: item.description,
    processDiagram: {
      nodes: [
        { id: "actor", label: roleLabel, type: "actor" },
        { id: "page", label: item.title, type: "process" },
      ],
      edges: [
        {
          from: "actor",
          to: "page",
          label: "메뉴 진입",
        },
      ],
    },
    uiMock: {
      title: item.title,
      sections: [
        {
          heading: "기능 개요",
          fields: [
            {
              label: "설명",
              value:
                item.description ||
                "해당 메뉴에 대한 상세 설명이 시방서 기준으로 정의됩니다.",
            },
          ],
        },
      ],
    },
  };
}

export default function IaDetailPage({
  params,
}: {
  params: { slug?: string[] };
}) {
  const slug = params.slug ?? [];
  const path =
    slug.length === 0
      ? IA_ROOT
      : `${IA_ROOT}/${slug.join("/")}`;

  const items = flattenIaItems();
  const current =
    items.find((i) => i.path === path) ??
    items.find((i) => i.path === IA_ROOT) ??
    items[0];

  const featureFromConfig = findFeatureById(current.featureId);
  const feature = featureFromConfig ?? createSyntheticFeature(current);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1 className="text-[20px] font-bold text-gray-900">
            {current.title}
          </h1>
          {current.description && (
            <p className="mt-1 text-[14px] text-gray-600">
              {current.description}
            </p>
          )}
        </div>
        <Link
          href={IA_ROOT}
          className="rounded-lg bg-gray-100 px-3 py-1.5 text-[13px] text-gray-700 hover:bg-gray-200"
        >
          전체 IA 보기
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <FeatureDetail feature={feature} />
      </div>
    </div>
  );
}

