import { themeInitScript } from "../theme/apply";
import { themeStylesheet } from "../theme/stylesheet";

/**
 * 루트 레이아웃의 <head>에 넣는다. 모든 테마 선택지의 CSS와,
 * 첫 페인트 전에 쿠키의 테마를 <html>에 적용하는 스크립트를 함께 렌더링한다.
 * <html>에는 suppressHydrationWarning이 필요하다.
 */
export function ThemeHead() {
  return (
    <>
      <style id="m-theme" dangerouslySetInnerHTML={{ __html: themeStylesheet() }} />
      <script id="m-theme-init" dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
    </>
  );
}
