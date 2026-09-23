import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import Link from "next/link";
import { docs } from "@/lib/nav";

export default function DocsHomePage() {
  return (
    <>
      <h1 className="text-3xl font-bold">문서</h1>
      <p className="mt-2 text-muted-foreground">
        새 문서는 <code>src/app/&lt;경로&gt;/page.mdx</code>로 추가하고 <code>src/lib/nav.ts</code>
        에 등록합니다.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {docs.map((doc) => (
          <Link key={doc.href} href={doc.href}>
            <Card className="h-full transition-colors hover:bg-accent">
              <CardHeader>
                <CardTitle>{doc.title}</CardTitle>
                <CardDescription>{doc.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
