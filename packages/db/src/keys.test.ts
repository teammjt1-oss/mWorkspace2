import { describe, expect, it } from "vitest";
import { keys } from "./keys";

describe("db keys", () => {
  it("올바른 PostgreSQL URL을 통과시킨다", () => {
    const url = "postgres://app:app@localhost:5432/app";
    expect(keys({ DATABASE_URL: url }).DATABASE_URL).toBe(url);
  });

  it("DATABASE_URL이 없으면 에러를 던진다", () => {
    expect(() => keys({})).toThrow();
  });

  it("빈 문자열은 누락으로 취급한다", () => {
    expect(() => keys({ DATABASE_URL: "" })).toThrow();
  });

  it("PostgreSQL이 아닌 URL은 거부한다", () => {
    expect(() => keys({ DATABASE_URL: "mysql://app:app@localhost:3306/app" })).toThrow();
  });
});
