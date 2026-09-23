"use client";

import { useSyncExternalStore } from "react";
import { applyTheme, readTheme, themeCookie } from "../theme/apply";
import {
  AXES,
  THEME_AXES,
  THEME_CONFIG,
  optionEntries,
  type ThemeAxis,
  type ThemeState,
} from "../theme/axes";
import { Button } from "./button";

const CHANGE_EVENT = "m-theme-change";

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

const getSnapshot = () => document.cookie;
// 서버와 하이드레이션 첫 렌더는 기본값으로 그리고, 직후 쿠키 값으로 바뀐다.
const getServerSnapshot = () => "";

export function setTheme(next: ThemeState) {
  document.cookie = themeCookie(next);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(document.documentElement, next, prefersDark);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function useTheme(): ThemeState {
  const cookie = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return readTheme(cookie, THEME_CONFIG);
}

/** 축마다 선택지를 버튼으로 보여 주는 테마 조절 패널. */
export function ThemeCustomizer() {
  const theme = useTheme();

  function choose<K extends ThemeAxis>(axis: K, value: ThemeState[K]) {
    setTheme({ ...theme, [axis]: value });
  }

  return (
    <div className="space-y-5">
      {THEME_AXES.map((axis) => (
        <div key={axis} role="group" aria-label={AXES[axis].label} className="space-y-2">
          <div className="text-sm font-medium">{AXES[axis].label}</div>
          <div className="flex flex-wrap gap-2">
            {optionEntries(axis).map(([value, option]) => {
              const selected = theme[axis] === value;
              return (
                <Button
                  key={value}
                  size="sm"
                  variant={selected ? "default" : "outline"}
                  aria-pressed={selected}
                  onClick={() => choose(axis, value)}
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
