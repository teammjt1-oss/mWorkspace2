---
name: deploy-staging
description: 현재 main을 staging 환경에 배포한다. 사용자가 /deploy-staging으로 직접 실행할 때만 사용.
disable-model-invocation: true
---

# 스테이징 배포

스테이징은 `staging` 브랜치로 배포된다. 이 브랜치에 push하면 배포 플랫폼(Vercel 등)이 자동으로 배포한다.

1. `git status`로 작업 트리가 깨끗한지 확인한다. 변경 사항이 있으면 멈추고 알린다.
2. `git fetch origin` 후 `git switch main && git pull --ff-only`.
3. `pnpm install --frozen-lockfile && pnpm check && pnpm build`를 실행한다. 하나라도 실패하면 멈추고 원인을 보고한다.
4. 배포될 변경 목록을 보여준다: `git log --oneline origin/staging..main`
5. 사용자에게 배포를 진행할지 확인받는다.
6. 확인을 받으면 `git push origin main:staging`을 실행한다.
7. `gh run list --branch staging --limit 3`으로 배포 워크플로 상태를 보여준다.
