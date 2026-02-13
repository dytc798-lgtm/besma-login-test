import Link from "next/link";

export default function BetaErpPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/beta" className="text-sm text-blue-600 hover:underline">
            ← 베타 홈
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">ERP 영역</h1>
        <p className="text-gray-600">
          ERP_ONLY 또는 BUNDLE 패키지에서만 접근 가능합니다.
        </p>
      </div>
    </div>
  );
}
