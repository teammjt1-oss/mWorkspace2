import { ThemeHead } from "@repo/ui/components/theme-head";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Company Starter",
  description: "Claude Code 기반 프로젝트 스타터",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ThemeHead />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
