# CLAUDE.md

이 저장소는 회사 표준 스타터입니다. 모든 프로젝트는 이 규칙을 따릅니다.

## 스택

- pnpm 워크스페이스 + Turborepo 모노레포, Node 22
- 앱 (모두 Next.js App Router, React, TypeScript, Tailwind CSS v4)
  - `apps/web` (3000): 공개 홈페이지
  - `apps/app` (3100): 로그인 후 대시보드 (인증은 아직 없음)
  - `apps/docs` (3200): 문서 사이트, `@next/mdx`로 `page.mdx` 작성
- `packages/db`: Drizzle ORM + PostgreSQL (`@repo/db`로 import)
- `packages/env`: 환경변수 검증 (`@t3-oss/env-nextjs` + zod)
- `packages/ui`: shadcn/ui 기반 공용 컴포넌트와 디자인 토큰 (`@repo/ui/components/*`)
- `packages/eslint-config`, `packages/tsconfig`: 공통 린트·TypeScript 설정
- 테스트: Vitest (단위, `*.test.ts`를 소스 옆에 둠), Playwright (E2E, `apps/*/e2e`)

## 명령어

- `pnpm dev`: 개발 서버
- `pnpm check`: 포맷, 린트, 타입체크, 단위 테스트 전체. **작업을 끝내기 전에 반드시 실행하고 통과시킬 것**
- `pnpm e2e`: E2E 테스트 (UI나 API를 바꿨을 때)
- `pnpm db:up` → `pnpm db:push`: 로컬 DB 기동과 스키마 반영

## 코드 규칙

- 경로 별칭 `@/*`는 각 앱의 `src/*`를 가리킨다.
- 환경변수는 `process.env`를 직접 읽지 말고 앱의 `src/env.ts`(`env`)를 통해 쓴다. 새 변수는 스키마와 `.env.example`에 함께 추가한다. 패키지 전용 변수는 그 패키지의 `keys()`에 정의하고 앱에서 `extends`로 합친다.
- 공용 UI는 `packages/ui`에 둔다. 새 컴포넌트는 `packages/ui`에서 `pnpm dlx shadcn@latest add <이름>`으로 추가한다.
- 기본은 서버 컴포넌트. 상호작용이 필요할 때만 `"use client"`를 붙인다.
- DB 접근은 서버 코드(서버 컴포넌트, route handler, server action)에서만 한다.
- `any` 금지. 외부 입력(폼, API 요청 본문)은 경계에서 검증한다.
- 새 로직에는 단위 테스트를 함께 작성한다.
- 사용자에게 보이는 문구는 한국어로 작성한다.
- 의존성 추가는 꼭 필요할 때만 하고, 추가 이유를 PR 설명에 적는다.

## 금지 사항

- `.env` 파일 읽기와 수정, 비밀값을 코드나 로그에 넣기
- `main` 브랜치에 직접 push, force push
- 테스트를 삭제하거나 skip 처리해서 통과시키기

## 버전 고정 사유

- TypeScript 6: typescript-eslint가 아직 TS 7을 지원하지 않음
- ESLint 9: eslint-plugin-react가 아직 ESLint 10을 지원하지 않음

## Git

- 브랜치: `feat/…`, `fix/…`, `chore/…`
- 커밋 메시지: Conventional Commits (`feat: 로그인 페이지 추가`)
- 모든 변경은 PR로 병합하고, CI 통과가 필수다.
