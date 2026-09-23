import { ThemeHead } from "@repo/ui/components/theme-head";
import { ThemePanel } from "@repo/ui/components/theme-panel";
import type { Metadata } from "next";
import Link from "next/link";
import { docs } from "@/lib/nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "문서 | Company Starter",
  description: "프로젝트 문서",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ThemeHead />
      </head>
      <body className="min-h-screen">
        <div className="mx-auto flex max-w-5xl gap-10 px-4 py-10">
          <nav className="w-48 shrink-0">
            <Link href="/" className="font-semibold">
              문서
            </Link>
            <ul className="mt-4 space-y-2 text-sm">
              {docs.map((doc) => (
                <li key={doc.href}>
                  <Link href={doc.href} className="text-muted-foreground hover:text-foreground">
                    {doc.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
        <ThemePanel />
      </body>
    </html>
  );
}
