import type { Metadata } from "next";
import "./globals.css";

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

