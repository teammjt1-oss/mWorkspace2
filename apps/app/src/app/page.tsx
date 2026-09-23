import { Card, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";

const placeholders = [
  { title: "사용자", description: "packages/db의 users 테이블을 연결하세요." },
  { title: "최근 활동", description: "프로젝트에 맞는 지표로 교체하세요." },
  { title: "설정", description: "계정·조직 설정 화면을 추가하세요." },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">대시보드</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        인증이 아직 연결되지 않았습니다. 로그인 기능을 붙이기 전까지 누구나 이 화면에 접근할 수
        있습니다.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {placeholders.map((item) => (
          <Card key={item.title}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  );
}
