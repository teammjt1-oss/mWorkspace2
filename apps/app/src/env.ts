import { keys as db } from "@repo/db/keys";
import { createEnv, skipValidation, z } from "@repo/env";

export const env = createEnv({
  extends: [db()],
  server: {},
  client: {
    NEXT_PUBLIC_WEB_URL: z.url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
  },
  emptyStringAsUndefined: true,
  skipValidation,
});
