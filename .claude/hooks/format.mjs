// 편집 후에 실행: 수정된 파일을 prettier로 포맷한다. 실패해도 작업을 막지 않는다.
import { execFileSync } from "node:child_process";

let input = "";
for await (const chunk of process.stdin) input += chunk;
const filePath = JSON.parse(input).tool_input?.file_path;

if (filePath && /\.(ts|tsx|js|mjs|cjs|json|css|md|ya?ml)$/.test(filePath)) {
  try {
    execFileSync("pnpm", ["exec", "prettier", "--write", "--ignore-unknown", filePath], {
      cwd: process.env.CLAUDE_PROJECT_DIR,
      stdio: "ignore",
    });
  } catch {
    // prettier가 무시하는 경로이거나 설치 전이면 넘어간다.
  }
}
