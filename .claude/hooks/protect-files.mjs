// 편집 전에 실행: 보호 파일 수정을 막는다. exit 2이면 Claude에게 stderr가 전달되고 작업이 차단된다.
import { basename } from "node:path";

let input = "";
for await (const chunk of process.stdin) input += chunk;
const filePath = JSON.parse(input).tool_input?.file_path ?? "";
const name = basename(filePath);

const blocked =
  (name.startsWith(".env") && name !== ".env.example") ||
  name === "pnpm-lock.yaml" ||
  filePath.includes("/drizzle/meta/");

if (blocked) {
  console.error(
    `${name}은(는) 직접 수정할 수 없습니다. 환경변수는 사람이 관리하고, lockfile과 마이그레이션 메타는 pnpm·drizzle-kit 명령으로만 변경하세요.`,
  );
  process.exit(2);
}
