import { Button } from "@repo/ui/components/button";
import { env } from "@/env";
import { formatKRW } from "@/lib/format";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-bold">Company Starter</h1>
      <p className="mt-4 text-muted-foreground">
        Next.js, TypeScript, Tailwind, shadcn/ui, Drizzle, Vitest, Playwright 기본 세팅입니다.
      </p>
      <p className="mt-2 text-sm text-muted-foreground">예시 금액 표시: {formatKRW(1500000)}</p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <a href={env.NEXT_PUBLIC_APP_URL}>대시보드</a>
        </Button>
        <Button asChild variant="outline">
          <a href={env.NEXT_PUBLIC_DOCS_URL}>문서</a>
        </Button>
      </div>
    </main>
  );
}
