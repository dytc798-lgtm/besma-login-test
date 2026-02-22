import type { Metadata } from "next";
import "./globals.css";

// 배포(Vercel 등)에서 홈/페이지가 오래 캐시되면 수정이 안 보일 수 있음 → 매 요청 시 최신 반영
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "BESMA - 부현전기 안전보건플랫폼",
  description: "중대재해처벌법 완벽 대응, 부현전기 안전보건플랫폼 BESMA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

