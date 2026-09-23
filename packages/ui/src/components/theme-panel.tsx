"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "./button";
import { ThemeCustomizer } from "./theme-customizer";

/**
 * 화면 오른쪽 아래의 "테마" 버튼과 그 버튼이 여닫는 조절 패널.
 * 바꾼 결과를 바로 보면서 조절하도록 모달로 막지 않고, 바깥을 눌러도 닫히지 않는다.
 */
export function ThemePanel() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label="테마 설정"
          tabIndex={-1}
          className="fixed right-4 bottom-16 z-50 max-h-[calc(100vh-6rem)] w-80 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl border bg-popover p-5 text-popover-foreground shadow-xl outline-none"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="font-semibold">테마 설정</span>
            <Button size="sm" variant="ghost" onClick={close}>
              닫기
            </Button>
          </div>
          <ThemeCustomizer />
        </div>
      )}
      <Button
        ref={triggerRef}
        variant="outline"
        size="sm"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => (open ? close() : setOpen(true))}
        className="fixed right-4 bottom-4 z-50 shadow-md"
      >
        테마
      </Button>
    </>
  );
}
