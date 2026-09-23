import { describe, expect, it } from "vitest";
import { formatKRW } from "./format";

describe("formatKRW", () => {
  it("원화 형식으로 표시한다", () => {
    expect(formatKRW(1500000)).toBe("₩1,500,000");
  });
});
