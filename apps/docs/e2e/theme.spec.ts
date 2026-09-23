import { expect, test } from "@playwright/test";

test("테마 축을 바꾸면 전역에 적용되고 새로고침 후에도 유지된다", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });

  await page.goto("/theme");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-primary", "neutral");
  await expect(html).not.toHaveClass(/dark/);

  await page.getByRole("group", { name: "모드" }).getByRole("button", { name: "다크" }).click();
  await page.getByRole("group", { name: "강조색" }).getByRole("button", { name: "파랑" }).click();
  await page.getByRole("group", { name: "라운드" }).getByRole("button", { name: "없음" }).click();

  await expect(html).toHaveClass(/dark/);
  await expect(html).toHaveAttribute("data-primary", "blue");
  const radius = () =>
    page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue("--radius"));
  expect(await radius()).toBe("0rem");

  await page.reload();
  await expect(html).toHaveClass(/dark/);
  await expect(html).toHaveAttribute("data-primary", "blue");
  await expect(
    page.getByRole("group", { name: "강조색" }).getByRole("button", { name: "파랑" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(await radius()).toBe("0rem");

  // 다른 페이지로 이동해도 같은 테마다.
  await page.goto("/");
  await expect(html).toHaveClass(/dark/);
  expect(errors).toEqual([]);
});
