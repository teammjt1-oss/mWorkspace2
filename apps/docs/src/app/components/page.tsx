import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "컴포넌트 | Company Starter" };

const BUTTON_VARIANTS = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
] as const;
const BUTTON_SIZES = ["sm", "default", "lg"] as const;

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="border-b pb-2 text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function ComponentsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">컴포넌트</h1>
      <p className="mt-2 text-muted-foreground">
        <code>packages/ui</code>의 컴포넌트를 실제로 렌더링해 미리 봅니다. 새 variant를 추가하면 이
        페이지에도 함께 추가해주세요.
      </p>

      <Section title="Button" description="variant × size 조합과 loading 상태입니다.">
        <div className="space-y-4">
          {BUTTON_SIZES.map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-3">
              <span className="w-16 shrink-0 text-xs text-muted-foreground">{size}</span>
              {BUTTON_VARIANTS.map((variant) => (
                <Button key={variant} variant={variant} size={size}>
                  버튼
                </Button>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <p className="mb-3 text-xs text-muted-foreground">loading (disabled + 스피너)</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button loading>저장 중</Button>
            <Button variant="secondary" loading>
              저장 중
            </Button>
            <Button variant="outline" loading>
              저장 중
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Card" description="제목, 설명, 본문, 하단 액션으로 구성됩니다.">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>카드 제목</CardTitle>
            <CardDescription>카드에 대한 짧은 설명입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">카드 본문 내용이 여기에 들어갑니다.</p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button size="sm">확인</Button>
            <Button size="sm" variant="outline">
              취소
            </Button>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Input / Label" description="폼 필드는 Label과 Input을 함께 씁니다.">
        <div className="max-w-sm space-y-4">
          <div className="space-y-2">
            <Label htmlFor="components-demo-email">이메일</Label>
            <Input id="components-demo-email" type="email" placeholder="you@example.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="components-demo-disabled">비활성 필드</Label>
            <Input id="components-demo-disabled" disabled placeholder="입력할 수 없음" />
          </div>
        </div>
      </Section>
    </>
  );
}
