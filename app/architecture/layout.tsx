"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ARCH_ROUTES, type ArchitectureSection } from "@/lib/architecture-config";

const navItems: { key: ArchitectureSection; label: string; href: string }[] = [
  { key: "index", label: "전체 흐름", href: ARCH_ROUTES.index },
  { key: "mobile", label: "현장 근로자(모바일)", href: ARCH_ROUTES.mobile },
  { key: "siteAdmin", label: "현장 관리자(웹)", href: ARCH_ROUTES.siteAdmin },
  { key: "hqAdmin", label: "본사 관리자(웹)", href: ARCH_ROUTES.hqAdmin },
  { key: "platformCore", label: "플랫폼 개요", href: ARCH_ROUTES.platformCore },
  // IA 전체 메뉴 맵
  // @ts-expect-error: ia는 ArchitectureSection 타입에 포함되지 않지만 내비게이션용으로 확장
  { key: "ia", label: "IA(전체 메뉴맵)", href: "/architecture/ia" },
];

export default function ArchitectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto max-w-[1400px] px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link
              href={ARCH_ROUTES.index}
              className="text-lg font-semibold text-gray-900"
            >
              부현전기 안전보건 플랫폼 · 업무 흐름 구성도
            </Link>
            <nav className="flex flex-wrap gap-1">
              {navItems.map(({ href, label }) => {
                const isActive =
                  href === ARCH_ROUTES.index
                    ? pathname === href
                    : pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1400px] px-4 py-6">{children}</main>
    </div>
  );
}
