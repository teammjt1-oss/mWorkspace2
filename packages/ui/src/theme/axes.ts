/**
 * 테마 축 정의. 축과 선택지는 여기 한 곳에서만 정의하고,
 * CSS(stylesheet.ts)와 적용 스크립트(apply.ts)는 이 값에서 만들어진다.
 */

type Option = { label: string; [key: string]: unknown };

/** Tailwind 기본 그림자를 [y, blur, spread, alpha] 층으로 옮긴 값. 그림자 축이 이 값을 비율로 조절한다. */
export const SHADOW_STEPS = {
  "2xs": [[1, 0, 0, 0.05]],
  xs: [[1, 2, 0, 0.05]],
  sm: [
    [1, 3, 0, 0.1],
    [1, 2, -1, 0.1],
  ],
  md: [
    [4, 6, -1, 0.1],
    [2, 4, -2, 0.1],
  ],
  lg: [
    [10, 15, -3, 0.1],
    [4, 6, -4, 0.1],
  ],
  xl: [
    [20, 25, -5, 0.1],
    [8, 10, -6, 0.1],
  ],
  "2xl": [[25, 50, -12, 0.25]],
} as const satisfies Record<string, readonly (readonly [number, number, number, number])[]>;

export const AXES = {
  mode: {
    label: "모드",
    options: {
      light: { label: "라이트" },
      dark: { label: "다크" },
      system: { label: "시스템" },
    },
  },
  primary: {
    label: "강조색",
    options: {
      neutral: {
        label: "무채색",
        light: ["oklch(0.205 0 0)", "oklch(0.985 0 0)"],
        dark: ["oklch(0.922 0 0)", "oklch(0.205 0 0)"],
      },
      blue: {
        label: "파랑",
        light: ["oklch(0.546 0.245 262.881)", "oklch(0.985 0 0)"],
        dark: ["oklch(0.623 0.214 259.815)", "oklch(0.985 0 0)"],
      },
      violet: {
        label: "보라",
        light: ["oklch(0.541 0.281 293.009)", "oklch(0.985 0 0)"],
        dark: ["oklch(0.606 0.25 292.717)", "oklch(0.985 0 0)"],
      },
      emerald: {
        label: "초록",
        light: ["oklch(0.596 0.145 163.225)", "oklch(0.985 0 0)"],
        dark: ["oklch(0.696 0.17 162.48)", "oklch(0.205 0 0)"],
      },
      orange: {
        label: "주황",
        light: ["oklch(0.646 0.222 41.116)", "oklch(0.985 0 0)"],
        dark: ["oklch(0.705 0.213 47.604)", "oklch(0.205 0 0)"],
      },
      rose: {
        label: "장미",
        light: ["oklch(0.586 0.253 17.585)", "oklch(0.985 0 0)"],
        dark: ["oklch(0.645 0.246 16.439)", "oklch(0.985 0 0)"],
      },
    },
  },
  radius: {
    label: "라운드",
    options: {
      none: { label: "없음", rem: 0 },
      sm: { label: "작게", rem: 0.375 },
      md: { label: "보통", rem: 0.625 },
      lg: { label: "크게", rem: 1 },
    },
  },
  elevation: {
    label: "그림자",
    options: {
      flat: { label: "평면", scale: 0 },
      low: { label: "낮게", scale: 1 },
      high: { label: "높게", scale: 2 },
    },
  },
  font: {
    label: "글꼴",
    options: {
      sans: {
        label: "고딕",
        stack:
          'ui-sans-serif, system-ui, -apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
      },
      serif: {
        label: "명조",
        stack: '"Noto Serif KR", "Nanum Myeongjo", "AppleMyungjo", ui-serif, Georgia, serif',
      },
      mono: {
        label: "고정폭",
        stack: 'ui-monospace, SFMono-Regular, "D2Coding", Menlo, Consolas, monospace',
      },
    },
  },
} as const satisfies Record<string, { label: string; options: Record<string, Option> }>;

export type ThemeAxis = keyof typeof AXES;

export type ThemeState = { [K in ThemeAxis]: keyof (typeof AXES)[K]["options"] & string };

export const THEME_AXES = Object.keys(AXES) as ThemeAxis[];

export const DEFAULT_THEME: ThemeState = {
  mode: "light",
  primary: "neutral",
  radius: "md",
  elevation: "low",
  font: "sans",
};

function optionKeys<K extends ThemeAxis>(axis: K) {
  return Object.keys(AXES[axis].options) as ThemeState[K][];
}

export const THEME_COOKIE = "m_theme";

/** 적용 스크립트에 넘기는 설정. 함수 밖 값에 기대지 않도록 필요한 값을 모두 담는다. */
export const THEME_CONFIG = {
  cookie: THEME_COOKIE,
  defaults: DEFAULT_THEME,
  allowed: {
    mode: optionKeys("mode"),
    primary: optionKeys("primary"),
    radius: optionKeys("radius"),
    elevation: optionKeys("elevation"),
    font: optionKeys("font"),
  },
};

export type ThemeConfig = typeof THEME_CONFIG;

export function optionEntries<K extends ThemeAxis>(axis: K) {
  return Object.entries(AXES[axis].options) as [ThemeState[K], Option][];
}
