import { keys as db } from "@repo/db/keys";
import { createEnv, skipValidation, z } from "@repo/env";

export const env = createEnv({
  extends: [db()],
  server: {},
  client: {
    NEXT_PUBLIC_APP_URL: z.url(),
    NEXT_PUBLIC_DOCS_URL: z.url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL,
  },
  emptyStringAsUndefined: true,
  skipValidation,
});
