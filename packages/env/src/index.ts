export { createEnv } from "@t3-oss/env-nextjs";
export { z } from "zod";

// lint나 Docker 이미지 빌드처럼 실제 환경변수가 없는 단계에서만 검증을 건너뛴다.
export const skipValidation =
  !!process.env.SKIP_ENV_VALIDATION || process.env.npm_lifecycle_event === "lint";
