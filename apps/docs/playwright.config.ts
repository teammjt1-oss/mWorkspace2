import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: { baseURL: "http://localhost:3200" },
  webServer: {
    command: "pnpm build && pnpm start",
    url: "http://localhost:3200",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
