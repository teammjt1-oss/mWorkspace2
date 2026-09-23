import { describe, expect, it } from "vitest";
import { AXES, THEME_AXES } from "./axes";
import { themeStylesheet } from "./stylesheet";

const css = themeStylesheet();

describe("themeStylesheet", () => {
  it("모드를 뺀 모든 축의 모든 선택지에 규칙이 있다", () => {
    for (const axis of THEME_AXES.filter((a) => a !== "mode")) {
      for (const value of Object.keys(AXES[axis].options)) {
        expect(css).toContain(`[data-${axis}="${value}"]`);
      }
    }
  });

  it("기본값은 속성이 없는 :root에도 적용된다", () => {
    expect(css).toContain(':root, :root[data-primary="neutral"]{');
    expect(css).toContain(':root.dark, :root.dark[data-primary="neutral"]{');
    expect(css).toContain(':root, :root[data-radius="md"]{--radius:0.625rem}');
  });

  it("기본 그림자는 Tailwind 기본값과 같고, 평면은 그림자가 없다", () => {
    expect(css).toMatch(
      /:root, :root\[data-elevation="low"\]\{[^}]*--m-shadow-sm:0 1px 3px 0px rgb\(0 0 0 \/ 0\.1\), 0 1px 2px -1px rgb\(0 0 0 \/ 0\.1\)/,
    );
    expect(css).toMatch(/:root\[data-elevation="flat"\]\{--m-shadow-2xs:0 0 #0000;/);
  });

  it("다크 모드 강조색은 다크 전용 선택자로 나간다", () => {
    expect(css).toContain(':root.dark[data-primary="blue"]{--primary:oklch(0.623 0.214 259.815)');
  });
});
