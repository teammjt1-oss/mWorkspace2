import "@repo/env/load-root";
import { defineConfig } from "drizzle-kit";
import { keys } from "./src/keys";

export default defineConfig({
  schema: "./src/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: keys().DATABASE_URL },
});
