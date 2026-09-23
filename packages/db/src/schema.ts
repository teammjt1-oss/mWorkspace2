import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// 예시 테이블. 프로젝트마다 교체하세요.
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
