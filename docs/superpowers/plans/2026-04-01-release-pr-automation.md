# Release PR 자동화 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** dev 브랜치에 push될 때 릴리즈 노트 형식의 dev → main PR을 자동 생성/업데이트하는 GitHub Actions 워크플로우 구현

**Architecture:** 단일 GitHub Actions 워크플로우 파일 내 인라인 쉘 스크립트. 커밋 로그 파싱 → 타입별 분류 → semver 계산 → gh CLI로 PR 생성/업데이트.

**Tech Stack:** GitHub Actions, Bash, gh CLI

---

## 파일 구조

- **Create:** `.github/workflows/release-pr.yml` — 워크플로우 정의 및 전체 로직

---

### Task 1: 워크플로우 기본 구조 작성

**Files:**
- Create: `.github/workflows/release-pr.yml`

- [ ] **Step 1: 워크플로우 트리거 및 권한 정의**

```yaml
name: Release PR

on:
  push:
    branches: [dev]

permissions:
  contents: read
  pull-requests: write

jobs:
  release-pr:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
```

`fetch-depth: 0`은 `main..dev` 커밋 비교를 위해 전체 히스토리 필요.

- [ ] **Step 2: 커밋 차이 확인 step 추가**

checkout 이후에 추가:

```yaml
      - name: Check for changes
        id: check
        run: |
          COMMIT_COUNT=$(git rev-list --count origin/main..origin/dev 2>/dev/null || echo "0")
          echo "commit_count=$COMMIT_COUNT" >> "$GITHUB_OUTPUT"
          if [ "$COMMIT_COUNT" -eq 0 ]; then
            echo "No commits between main and dev. Skipping."
          fi
```

이후 모든 step에 조건 추가: `if: steps.check.outputs.commit_count != '0'`

- [ ] **Step 3: 커밋**

```bash
git add .github/workflows/release-pr.yml
git commit -m "feat: Release PR 자동화 워크플로우 기본 구조 추가"
```

---

### Task 2: 커밋 파싱 및 분류 로직

**Files:**
- Modify: `.github/workflows/release-pr.yml`

- [ ] **Step 1: 커밋 파싱 step 추가**

check step 이후에 추가:

```yaml
      - name: Parse commits and generate body
        if: steps.check.outputs.commit_count != '0'
        id: generate
        run: |
          # 커밋 로그 수집 (Merge 커밋 제외)
          COMMITS=$(git log origin/main..origin/dev --oneline --no-merges --format="%s")

          # 타입별 분류
          FEAT=""
          FIX=""
          REFACTOR=""
          STYLE=""
          DOCS=""
          CHORE=""

          while IFS= read -r line; do
            [ -z "$line" ] && continue
            case "$line" in
              feat:*|feat\(*) FEAT="$FEAT
          - ${line#feat: }" ;;
              fix:*|fix\(*)   FIX="$FIX
          - ${line#fix: }" ;;
              refactor:*|refactor\(*) REFACTOR="$REFACTOR
          - ${line#refactor: }" ;;
              style:*|style\(*) STYLE="$STYLE
          - ${line#style: }" ;;
              docs:*|docs\(*)  DOCS="$DOCS
          - ${line#docs: }" ;;
              *)               CHORE="$CHORE
          - ${line#chore: }" ;;
            esac
          done <<< "$COMMITS"

          # 버전 계산: 최근 RELEASE 커밋에서 현재 버전 추출
          CURRENT_VERSION=$(git log --all --oneline --grep="\[RELEASE\]" --format="%s" | head -1 | sed 's/.*v\([0-9]*\.[0-9]*\.[0-9]*\).*/\1/')
          if [ -z "$CURRENT_VERSION" ]; then
            CURRENT_VERSION="0.0.0"
          fi

          IFS='.' read -r MAJOR MINOR PATCH <<< "$CURRENT_VERSION"

          if [ -n "$FEAT" ]; then
            MINOR=$((MINOR + 1))
            PATCH=0
          else
            PATCH=$((PATCH + 1))
          fi

          NEXT_VERSION="v${MAJOR}.${MINOR}.${PATCH}"
          echo "next_version=$NEXT_VERSION" >> "$GITHUB_OUTPUT"

          # PR 본문 생성
          BODY="## [RELEASE] $NEXT_VERSION"

          if [ -n "$FEAT" ]; then
            BODY="$BODY

          ### 기능
          $FEAT"
          fi

          if [ -n "$FIX" ]; then
            BODY="$BODY

          ### 버그 수정
          $FIX"
          fi

          if [ -n "$REFACTOR" ]; then
            BODY="$BODY

          ### 리팩토링
          $REFACTOR"
          fi

          if [ -n "$STYLE" ]; then
            BODY="$BODY

          ### 스타일
          $STYLE"
          fi

          if [ -n "$DOCS" ]; then
            BODY="$BODY

          ### 문서
          $DOCS"
          fi

          if [ -n "$CHORE" ]; then
            BODY="$BODY

          ### 기타
          $CHORE"
          fi

          # multiline output
          {
            echo "body<<BODY_EOF"
            echo "$BODY"
            echo "BODY_EOF"
          } >> "$GITHUB_OUTPUT"
```

- [ ] **Step 2: 커밋**

```bash
git add .github/workflows/release-pr.yml
git commit -m "feat: 커밋 파싱, 타입별 분류 및 버전 계산 로직 추가"
```

---

### Task 3: PR 생성/업데이트 로직

**Files:**
- Modify: `.github/workflows/release-pr.yml`

- [ ] **Step 1: PR 생성/업데이트 step 추가**

generate step 이후에 추가:

```yaml
      - name: Create or update PR
        if: steps.check.outputs.commit_count != '0'
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          NEXT_VERSION="${{ steps.generate.outputs.next_version }}"
          TITLE="[RELEASE] $NEXT_VERSION"
          BODY="${{ steps.generate.outputs.body }}"

          # 기존 열린 PR 확인
          EXISTING_PR=$(gh pr list --base main --head dev --state open --json number --jq '.[0].number // empty')

          if [ -n "$EXISTING_PR" ]; then
            echo "Updating existing PR #$EXISTING_PR"
            gh pr edit "$EXISTING_PR" --title "$TITLE" --body "$BODY"
          else
            echo "Creating new PR"
            gh pr create --base main --head dev --title "$TITLE" --body "$BODY"
          fi
```

- [ ] **Step 2: 커밋**

```bash
git add .github/workflows/release-pr.yml
git commit -m "feat: PR 자동 생성/업데이트 로직 추가"
```

---

### Task 4: 최종 검증 및 통합 커밋

**Files:**
- Verify: `.github/workflows/release-pr.yml`

- [ ] **Step 1: YAML 문법 검증**

```bash
# yamllint이 없으면 간단히 파싱 테스트
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/release-pr.yml'))" && echo "YAML valid"
```

- [ ] **Step 2: 워크플로우 전체 파일 리뷰**

완성된 `.github/workflows/release-pr.yml` 전체를 읽고 다음을 확인:
- 들여쓰기가 올바른지
- step 간 output 참조가 일치하는지 (`steps.check.outputs.commit_count`, `steps.generate.outputs.next_version`, `steps.generate.outputs.body`)
- `if` 조건이 모든 후속 step에 적용되었는지

- [ ] **Step 3: 최종 커밋 (필요 시)**

문제가 발견되어 수정한 경우:

```bash
git add .github/workflows/release-pr.yml
git commit -m "fix: Release PR 워크플로우 수정"
```
