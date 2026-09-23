import type { Metadata } from "next";
import { env } from "@/env";
import "./globals.css";

export const metadata: Metadata = {
  title: "대시보드 | Company Starter",
  description: "로그인 후 사용하는 대시보드",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen">
        <header className="border-b">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
            <span className="font-semibold">대시보드</span>
            <a href={env.NEXT_PUBLIC_WEB_URL} className="text-sm text-muted-foreground">
              홈페이지로
            </a>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
