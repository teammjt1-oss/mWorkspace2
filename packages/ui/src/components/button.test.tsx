import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("기본 상태에서는 스피너 없이 children만 렌더링한다", () => {
    const html = renderToStaticMarkup(<Button>저장</Button>);
    expect(html).toContain("저장");
    expect(html).not.toContain("button-spinner");
    expect(html).not.toContain('disabled=""');
  });

  it("loading이면 disabled와 aria-busy가 붙고 스피너가 렌더링된다", () => {
    const html = renderToStaticMarkup(<Button loading>저장</Button>);
    expect(html).toContain("저장");
    expect(html).toContain("button-spinner");
    expect(html).toContain('disabled=""');
    expect(html).toContain('aria-busy="true"');
  });

  it("loading이 아니어도 disabled prop은 그대로 유지된다", () => {
    const html = renderToStaticMarkup(<Button disabled>저장</Button>);
    expect(html).toContain('disabled=""');
    expect(html).not.toContain("button-spinner");
  });

  it("asChild와 함께 loading을 써도 스피너는 렌더링하지 않는다 (Slot은 단일 자식만 허용)", () => {
    const html = renderToStaticMarkup(
      <Button asChild loading>
        <a href="/next">다음</a>
      </Button>,
    );
    expect(html).toContain("다음");
    expect(html).not.toContain("button-spinner");
  });
});
