---
name: new-feature
description: 새 기능을 요구사항 정리부터 PR 생성까지 회사 표준 절차로 구현한다. 사용자가 새 기능, 화면, API 구현을 요청할 때 사용.
---

# 새 기능 구현 절차

인자로 받은 기능 설명(또는 GitHub 이슈 번호)을 기준으로 아래 순서를 지킨다.

1. **요구사항 확인**
   - 이슈 번호가 있으면 `gh issue view <번호>`로 내용을 읽는다.
   - 모호한 점(권한, 예외 상황, 화면 문구)이 있으면 구현 전에 질문한다.
2. **브랜치 생성**: `git switch -c feat/<짧은-영문-이름>`
3. **설계 메모**: 바꿀 파일, 새 파일, DB 스키마 변경 여부를 3~6줄로 먼저 보여준다.
4. **구현**
   - DB 변경이 있으면 `packages/db/src/schema.ts`를 수정하고 `pnpm db:generate`로 마이그레이션을 만든다.
   - 로직에는 단위 테스트를, 화면 흐름에는 해당 앱의 `apps/<앱>/e2e`에 E2E 테스트를 추가한다.
5. **검증**: `pnpm check`가 통과할 때까지 수정한다. UI나 API를 바꿨으면 `pnpm e2e`도 실행한다.
6. **커밋과 PR**
   - Conventional Commits 형식으로 커밋한다.
   - `git push -u origin HEAD` 후 `gh pr create`로 PR을 만든다. 본문은 `.github/pull_request_template.md` 양식을 채운다.
7. 마지막에 PR 링크와 사람이 직접 확인해야 할 부분을 짧게 알려준다.
