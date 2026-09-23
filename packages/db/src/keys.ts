import { createEnv, skipValidation, z } from "@repo/env";

export const keys = (source: NodeJS.ProcessEnv = process.env) =>
  createEnv({
    server: {
      DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),
    },
    runtimeEnv: { DATABASE_URL: source.DATABASE_URL },
    emptyStringAsUndefined: true,
    skipValidation,
  });
