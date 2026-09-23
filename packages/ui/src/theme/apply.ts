import { THEME_CONFIG, type ThemeConfig, type ThemeState } from "./axes";

/**
 * readTheme와 applyTheme는 인라인 스크립트에 toString()으로 그대로 들어간다.
 * 그래서 함수 밖의 값(import, 모듈 변수)을 참조하면 안 된다.
 */

/** 쿠키 문자열에서 테마를 읽는다. 없거나 허용되지 않은 값은 기본값으로 채운다. */
export function readTheme(cookieHeader: string, config: ThemeConfig): ThemeState {
  const state: Record<string, string> = { ...config.defaults };
  const allowed: Record<string, readonly string[]> = config.allowed;
  const prefix = config.cookie + "=";
  const entry = cookieHeader.split(/;\s*/).find((part) => part.startsWith(prefix));
  if (entry) {
    let raw = "";
    try {
      raw = decodeURIComponent(entry.slice(prefix.length));
    } catch {
      raw = "";
    }
    for (const pair of raw.split("&")) {
      const [key, value] = pair.split("=");
      if (key && value && allowed[key] && allowed[key].includes(value)) state[key] = value;
    }
  }
  return state as ThemeState;
}

/** 테마를 루트 요소에 반영한다. 축 값은 data-* 속성으로, 모드는 .dark 클래스로 나간다. */
export function applyTheme(root: ThemeRoot, state: ThemeState, prefersDark: boolean) {
  for (const [axis, value] of Object.entries(state)) root.dataset[axis] = value;
  const dark = state.mode === "dark" || (state.mode === "system" && prefersDark);
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

export type ThemeRoot = {
  dataset: Record<string, string | undefined>;
  classList: { toggle(token: string, force?: boolean): boolean };
  style: { colorScheme: string };
};

export function serializeTheme(state: ThemeState): string {
  return encodeURIComponent(
    Object.entries(state)
      .map(([axis, value]) => `${axis}=${value}`)
      .join("&"),
  );
}

/** 테마 쿠키를 1년간 저장한다. */
export function themeCookie(state: ThemeState): string {
  return `${THEME_CONFIG.cookie}=${serializeTheme(state)}; path=/; max-age=31536000; samesite=lax`;
}

/**
 * 첫 페인트 전에 실행되는 스크립트. 쿠키의 테마를 적용하고,
 * 모드가 system이면 OS 설정이 바뀔 때 다시 적용한다.
 */
export function themeInitScript(config: ThemeConfig = THEME_CONFIG): string {
  return `(function(){try{var c=${JSON.stringify(config)};var read=${readTheme.toString()};var apply=${applyTheme.toString()};var r=document.documentElement;var m=window.matchMedia("(prefers-color-scheme: dark)");apply(r,read(document.cookie,c),m.matches);m.addEventListener("change",function(e){if(r.dataset.mode==="system")apply(r,read(document.cookie,c),e.matches)})}catch(e){}})()`;
}
