# Company Starter

Claude Code와 함께 쓰도록 만든 회사 표준 프로젝트 스타터입니다. 새 고객 프로젝트는 이 저장소를 복제해서 시작합니다.

## 구성

```
apps/web                공개 홈페이지 (http://localhost:3000)
apps/app                로그인 후 대시보드 (http://localhost:3100, 인증 미연결)
apps/docs               MDX 문서 사이트 (http://localhost:3200)
packages/db             Drizzle ORM + PostgreSQL 스키마와 클라이언트
packages/env            환경변수 검증 (@t3-oss/env-nextjs + zod)
packages/ui             shadcn/ui 기반 공용 컴포넌트와 디자인 토큰
packages/eslint-config  공통 ESLint 설정
packages/tsconfig       공통 TypeScript 설정
.claude/            Claude Code 팀 설정 (권한, hooks, skill)
.github/            CI, Claude PR 리뷰, @claude 호출, PR 템플릿
CLAUDE.md           Claude가 따르는 프로젝트 규칙
```

## 시작하기

```bash
pnpm install
cp .env.example .env
pnpm db:up        # Docker로 PostgreSQL 실행
pnpm db:push      # 스키마 반영
pnpm dev          # web, app, docs를 함께 실행
```

환경변수는 루트 `.env` 하나로 관리합니다. 각 앱은 시작·빌드할 때 `src/env.ts` 스키마로 검증하고, 값이 빠지면 바로 실패합니다. Docker 빌드처럼 검증을 건너뛰어야 할 때만 `SKIP_ENV_VALIDATION=1`을 씁니다.

처음 E2E를 실행하기 전에 브라우저를 설치합니다: `pnpm --filter web exec playwright install chromium`

## 주요 명령

| 명령               | 설명                                                  |
| ------------------ | ----------------------------------------------------- |
| `pnpm check`       | 포맷, 린트, 타입체크, 단위 테스트                     |
| `pnpm build`       | 프로덕션 빌드                                         |
| `pnpm e2e`         | 모든 앱의 Playwright E2E 테스트                       |
| `pnpm db:generate` | 스키마 변경으로 마이그레이션 생성 (`packages/db`에서) |
| `pnpm db:studio`   | DB 브라우저                                           |

## Claude Code 설정

**Skill** (Claude Code에서 `/이름`으로 실행)

- `/new-feature <설명 또는 이슈번호>`: 브랜치 생성부터 구현, 테스트, PR까지 표준 절차로 진행
- `/deploy-staging`: 검증 후 `staging` 브랜치로 배포 (사용자가 직접 실행할 때만 동작)
- `/client-report`: git과 PR 기록으로 고객용 주간 보고서 작성

**Hooks**

- 파일을 수정하면 자동으로 prettier 포맷
- `.env`, `pnpm-lock.yaml`, 마이그레이션 메타 파일은 Claude가 직접 수정하지 못하게 차단

**권한**: pnpm, 읽기 위주의 git·gh 명령은 확인 없이 실행하고, `.env` 읽기와 force push, main 직접 push는 차단합니다. 개인 설정은 `.claude/settings.local.json`에 둡니다 (git에 올라가지 않음).

## GitHub 설정

1. GitHub Organization에 저장소를 만들고 push합니다.
2. Claude Code에서 `/install-github-app`을 실행하거나, 저장소 Secrets에 `ANTHROPIC_API_KEY`를 등록합니다.
3. Settings → Branches에서 `main` 보호 규칙을 켜고 CI 통과와 리뷰 1건을 필수로 설정합니다.

설정이 끝나면 다음이 자동으로 동작합니다.

- PR마다 CI (check, build, e2e)
- PR마다 Claude의 1차 리뷰 코멘트
- 이슈나 PR 댓글에 `@claude`를 적으면 Claude가 답변하거나 수정 커밋

## 새 프로젝트 시작 체크리스트

- [ ] `package.json`의 `name`과 각 앱(`apps/web`, `apps/app`, `apps/docs`)의 메타데이터 수정
- [ ] 쓰지 않는 앱은 폴더째 삭제 (예: 문서 사이트가 필요 없으면 `apps/docs`)
- [ ] `packages/db/src/schema.ts` 예시 테이블 교체
- [ ] `packages/ui/src/styles/globals.css`의 색상 토큰을 고객사 브랜드에 맞게 수정
- [ ] 대시보드(`apps/app`)를 쓴다면 인증 연결
- [ ] CLAUDE.md에 고객사·도메인 특이사항 추가
- [ ] 배포 플랫폼(Vercel 등) 연결, `staging` 브랜치를 스테이징 환경으로 지정
