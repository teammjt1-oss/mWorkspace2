import { expect, test } from "@playwright/test";

test("홈페이지가 렌더링된다", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Company Starter" })).toBeVisible();
});

test("헬스체크 API가 응답한다", async ({ request }) => {
  const res = await request.get("/api/health");
  expect(await res.json()).toEqual({ status: "ok" });
});
