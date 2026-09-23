import { expect, test } from "@playwright/test";

test("테마 버튼으로 패널을 열어 테마를 바꾸고 Esc로 닫는다", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const trigger = page.getByRole("button", { name: "테마", exact: true });
  const panel = page.getByRole("dialog", { name: "테마 설정" });

  await expect(panel).toBeHidden();
  await trigger.click();
  await expect(panel).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");

  await panel.getByRole("group", { name: "모드" }).getByRole("button", { name: "다크" }).click();
  await expect(html).toHaveClass(/dark/);
  // 패널은 모달이 아니어서 열린 채로 페이지를 계속 쓸 수 있다.
  await expect(page.getByRole("heading", { name: "Company Starter" })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();

  await page.reload();
  await expect(html).toHaveClass(/dark/);
});
