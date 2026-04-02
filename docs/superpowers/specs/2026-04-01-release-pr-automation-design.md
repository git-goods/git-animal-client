# Release PR 자동화 설계

## 개요

`dev` 브랜치에 변경사항이 push될 때마다, `dev → main` PR을 정해진 릴리즈 노트 형식으로 자동 생성/업데이트하는 GitHub Actions 워크플로우.

## 트리거

- **이벤트**: `dev` 브랜치에 `push`
- **조건**: `main..dev` 커밋 차이가 1개 이상일 때만 동작

```yaml
on:
  push:
    branches: [dev]
```

## 워크플로우 동작 흐름

1. `git log main..dev --oneline`으로 커밋 차이 수집
2. 커밋 메시지를 타입별로 분류
3. 현재 버전(`package.json`)에서 다음 버전 계산
4. PR 본문 생성
5. 기존 `dev → main` 열린 PR이 있으면 제목+본문 업데이트, 없으면 새로 생성

## 커밋 분류 규칙

| 커밋 prefix | 그룹명 |
|---|---|
| `feat:` | 기능 |
| `fix:` | 버그 수정 |
| `refactor:` | 리팩토링 |
| `style:` | 스타일 |
| `docs:` | 문서 |
| `chore:` 및 기타 | 기타 |

- Merge 커밋(`Merge branch`, `Merge remote-tracking`)은 제외
- 커밋 메시지에서 prefix를 제거한 나머지를 항목으로 사용
- PR 번호(`#123`)가 있으면 그대로 유지

## 버전 계산

- 현재 버전: 가장 최근 `[RELEASE] vX.X.X` 커밋 메시지에서 추출 (git log 기반)
- `feat:` 커밋이 1개 이상 → **minor** bump (`v2.9.5` → `v2.10.0`)
- `feat:` 없음 → **patch** bump (`v2.9.5` → `v2.9.6`)
- `feat!:` / `BREAKING CHANGE`가 있어도 **minor까지만** (major는 수동 판단)

## PR 형식

**제목**: `[RELEASE] v2.10.0`

**본문**:

```markdown
## [RELEASE] v2.10.0

### 기능
- Spring 2026 랜딩 페이지 업데이트 (#370)
- 퀴즈 관리 페이지 모바일 최적화 및 UI 개선 (#369)

### 리팩토링
- PandaCSS에서 Tailwind CSS로 스타일링 시스템 마이그레이션 (#356)

### 기타
- git ignore 추가
```

- 해당 타입의 커밋이 없으면 그 섹션은 생략
- 아이콘/이모지 사용하지 않음

## PR 생성/업데이트 로직

1. `gh pr list --base main --head dev --state open --json number`로 기존 PR 확인
2. **기존 PR 있음** → `gh pr edit <number> --title "..." --body "..."`
3. **기존 PR 없음** → `gh pr create --base main --head dev --title "..." --body "..."`
4. **커밋 차이 없음** → 아무것도 하지 않고 종료

## 파일 구조

```
.github/
  workflows/
    release-pr.yml    # 워크플로우 정의 + 쉘 스크립트 인라인
```

로직이 단순하므로 별도 스크립트 파일 없이 워크플로우 내 인라인 쉘 스크립트로 구현.

## 권한

```yaml
permissions:
  contents: read
  pull-requests: write
```

`GITHUB_TOKEN` 기본 권한으로 충분. 별도 시크릿 불필요.

## 범위 외 (Out of Scope)

- 라벨 자동 지정
- assignee / reviewer 자동 지정 (기존 `auto_assign.yml`에 위임)
- `package.json` 버전 자동 업데이트 (PR 본문에 버전 표시만)
- changelog 파일 생성
