import { existsSync } from "node:fs";
import { dirname, join } from "node:path";

// Next.js와 drizzle-kit은 각 패키지 폴더의 .env만 읽으므로, 모노레포 루트의 .env를 직접 불러온다.
// 이미 설정된 값은 덮어쓰지 않는다.
function findWorkspaceRoot(start: string): string | undefined {
  let dir = start;
  while (!existsSync(join(dir, "pnpm-workspace.yaml"))) {
    const parent = dirname(dir);
    if (parent === dir) return undefined;
    dir = parent;
  }
  return dir;
}

const root = findWorkspaceRoot(process.cwd());
if (root) {
  for (const file of [".env.local", ".env"]) {
    const path = join(root, file);
    if (existsSync(path)) process.loadEnvFile(path);
  }
}
