import { describe, expect, it } from "vitest";
import { applyTheme, readTheme, serializeTheme, themeCookie, themeInitScript } from "./apply";
import { DEFAULT_THEME, THEME_CONFIG, type ThemeState } from "./axes";

function fakeRoot() {
  const classes = new Set<string>();
  return {
    dataset: {} as Record<string, string | undefined>,
    classList: {
      toggle(token: string, force?: boolean) {
        const on = force ?? !classes.has(token);
        if (on) classes.add(token);
        else classes.delete(token);
        return on;
      },
    },
    style: { colorScheme: "" },
    classes,
  };
}

const custom: ThemeState = {
  mode: "dark",
  primary: "blue",
  radius: "lg",
  elevation: "high",
  font: "serif",
};

describe("readTheme", () => {
  it("쿠키가 없으면 기본값을 돌려준다", () => {
    expect(readTheme("", THEME_CONFIG)).toEqual(DEFAULT_THEME);
    expect(readTheme("other=1", THEME_CONFIG)).toEqual(DEFAULT_THEME);
  });

  it("serializeTheme으로 쓴 값을 그대로 읽는다", () => {
    const cookie = `a=1; ${THEME_CONFIG.cookie}=${serializeTheme(custom)}; b=2`;
    expect(readTheme(cookie, THEME_CONFIG)).toEqual(custom);
  });

  it("허용되지 않은 축과 값은 무시하고 기본값을 쓴다", () => {
    const raw = encodeURIComponent("primary=hotpink&radius=lg&evil=1&mode");
    expect(readTheme(`${THEME_CONFIG.cookie}=${raw}`, THEME_CONFIG)).toEqual({
      ...DEFAULT_THEME,
      radius: "lg",
    });
  });

  it("깨진 인코딩이면 기본값을 돌려준다", () => {
    expect(readTheme(`${THEME_CONFIG.cookie}=%E0%A4%A`, THEME_CONFIG)).toEqual(DEFAULT_THEME);
  });
});

describe("applyTheme", () => {
  it("축 값을 data 속성으로 쓰고 다크 모드면 .dark를 붙인다", () => {
    const root = fakeRoot();
    applyTheme(root, custom, false);
    expect(root.dataset).toEqual(custom);
    expect(root.classes.has("dark")).toBe(true);
    expect(root.style.colorScheme).toBe("dark");
  });

  it("system 모드는 OS 설정을 따른다", () => {
    const root = fakeRoot();
    applyTheme(root, { ...DEFAULT_THEME, mode: "system" }, true);
    expect(root.classes.has("dark")).toBe(true);
    applyTheme(root, { ...DEFAULT_THEME, mode: "system" }, false);
    expect(root.classes.has("dark")).toBe(false);
    expect(root.style.colorScheme).toBe("light");
  });
});

describe("themeCookie", () => {
  it("경로 전체에 1년간 저장한다", () => {
    expect(themeCookie(custom)).toMatch(/^m_theme=.+; path=\/; max-age=31536000; samesite=lax$/);
  });
});

describe("themeInitScript", () => {
  it("브라우저에서 실행하면 쿠키의 테마를 <html>에 적용하고 system 모드 변경을 따라간다", () => {
    const root = fakeRoot();
    let listener: ((e: { matches: boolean }) => void) | undefined;
    const document = {
      documentElement: root,
      cookie: `${THEME_CONFIG.cookie}=${serializeTheme({ ...custom, mode: "system" })}`,
    };
    const window = {
      matchMedia: () => ({
        matches: false,
        addEventListener: (_: string, fn: (e: { matches: boolean }) => void) => {
          listener = fn;
        },
      }),
    };

    new Function("document", "window", themeInitScript())(document, window);

    expect(root.dataset).toEqual({ ...custom, mode: "system" });
    expect(root.classes.has("dark")).toBe(false);
    listener?.({ matches: true });
    expect(root.classes.has("dark")).toBe(true);
  });
});
