import { AXES, DEFAULT_THEME, SHADOW_STEPS, type ThemeAxis } from "./axes";

type Vars = Record<string, string>;

/** 다크 배경에서는 같은 그림자가 잘 보이지 않아 농도를 올린다. */
const DARK_SHADOW_ALPHA = 3;

function shadowVars(scale: number, alphaBoost: number): Vars {
  const vars: Vars = {};
  for (const [step, layers] of Object.entries(SHADOW_STEPS)) {
    vars[`--m-shadow-${step}`] =
      scale === 0
        ? "0 0 #0000"
        : layers
            .map(([y, blur, spread, alpha]) => {
              const a = Math.min(alpha * scale * alphaBoost, 0.6);
              return `0 ${y * scale}px ${blur * scale}px ${spread}px rgb(0 0 0 / ${+a.toFixed(3)})`;
            })
            .join(", ");
  }
  return vars;
}

function selector(axis: ThemeAxis, value: string, dark: boolean) {
  const own = `:root${dark ? ".dark" : ""}[data-${axis}="${value}"]`;
  // 기본값은 스크립트가 돌기 전(또는 JS가 꺼진 상태)에도 적용되도록 속성 없는 :root에도 건다.
  if (DEFAULT_THEME[axis] !== value) return own;
  return `:root${dark ? ".dark" : ""}, ${own}`;
}

function rule(sel: string, vars: Vars) {
  return `${sel}{${Object.entries(vars)
    .map(([name, value]) => `${name}:${value}`)
    .join(";")}}`;
}

/**
 * 모든 축과 선택지의 CSS를 한 번에 만든다. 사용자와 무관하게 항상 같은 문자열이라
 * 정적 렌더링을 해치지 않고, 어떤 값을 쓸지는 <html>의 data-* 속성이 고른다.
 *
 * 선택자 우선순위: globals.css의 :root(0,1,0), .dark(0,1,0)보다
 * :root[data-*](0,2,0), :root.dark[data-*](0,3,0)이 높아 순서와 무관하게 이긴다.
 */
export function themeStylesheet(): string {
  const rules: string[] = [];

  for (const [value, option] of Object.entries(AXES.primary.options)) {
    for (const dark of [false, true]) {
      const [color, foreground] = dark ? option.dark : option.light;
      rules.push(
        rule(selector("primary", value, dark), {
          "--primary": color,
          "--primary-foreground": foreground,
          "--ring": color,
        }),
      );
    }
  }

  for (const [value, option] of Object.entries(AXES.radius.options)) {
    rules.push(rule(selector("radius", value, false), { "--radius": `${option.rem}rem` }));
  }

  for (const [value, option] of Object.entries(AXES.elevation.options)) {
    rules.push(rule(selector("elevation", value, false), shadowVars(option.scale, 1)));
    rules.push(
      rule(selector("elevation", value, true), shadowVars(option.scale, DARK_SHADOW_ALPHA)),
    );
  }

  for (const [value, option] of Object.entries(AXES.font.options)) {
    rules.push(rule(selector("font", value, false), { "--font-sans": option.stack }));
  }

  return rules.join("\n");
}
