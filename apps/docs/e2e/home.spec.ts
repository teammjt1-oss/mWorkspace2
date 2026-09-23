import { expect, test } from "@playwright/test";

test("문서 목록에서 MDX 문서로 이동한다", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "문서", level: 1 })).toBeVisible();
  await page
    .getByRole("main")
    .getByRole("link", { name: /시작하기/ })
    .click();
  await expect(page.getByRole("heading", { name: "시작하기", level: 1 })).toBeVisible();
});
