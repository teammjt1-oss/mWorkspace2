import { expect, test } from "@playwright/test";

test("대시보드가 렌더링된다", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "대시보드" })).toBeVisible();
  await expect(page.getByText("사용자", { exact: true })).toBeVisible();
});
