---
name: client-report
description: 고객사에 보낼 주간 진행 보고서를 git 기록과 PR, 이슈에서 작성한다. 사용자가 주간 보고, 진행 보고, 고객 보고서를 요청할 때 사용.
---

# 고객 주간 보고서

기간 인자가 없으면 최근 7일을 기준으로 한다.

1. 자료 수집
   - `git log --since="7 days ago" --no-merges --pretty="%h %s"`
   - `gh pr list --state merged --search "merged:>=YYYY-MM-DD" --json number,title,body`
   - `gh issue list --state open --json number,title,labels`
2. 아래 양식으로 작성한다. **고객은 개발자가 아니다.** 커밋 해시, 파일명, 기술 용어 대신 고객이 체감하는 기능과 화면 기준으로 쓴다.

```
# [프로젝트명] 주간 진행 보고 (YYYY.MM.DD ~ MM.DD)

## 이번 주 완료
- (기능 단위로, 고객 관점의 한 줄 설명)

## 진행 중
- (항목, 예상 완료일)

## 다음 주 계획
-

## 확인 요청 사항
- (고객의 결정이나 자료가 필요한 항목. 없으면 "없음")

## 이슈 및 리스크
- (일정이나 범위에 영향을 주는 것. 없으면 "없음")
```

3. 작성한 보고서를 `docs/reports/YYYY-MM-DD.md`에 저장하고, 과장되거나 확인되지 않은 내용이 없는지 사용자에게 검토를 요청한다.
