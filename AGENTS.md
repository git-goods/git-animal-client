# GitAnimals 작업 계약

이 파일은 저장소에서 항상 필요한 작업 조건만 담는다. 제품 설명과 마이그레이션 근거는
[`README.md`](README.md), [`CONTRIBUTING.md`](CONTRIBUTING.md),
[`TAILWIND_MIGRATION_DECISIONS.md`](TAILWIND_MIGRATION_DECISIONS.md),
[`TAILWIND_MIGRATION_HANDOFF.md`](TAILWIND_MIGRATION_HANDOFF.md)에 있다.

## 실행 환경과 확인 명령

- Node.js 18 이상, pnpm 9 이상(`package.json`의 `packageManager`와 `engines`가 기준)을 사용한다.
- 의존성 설치는 저장소 루트에서 `pnpm install`을 실행한다. 빌드·린트는 변경한 앱에 맞는
  Turbo 필터를 사용한다.
- `apps/web` 변경의 CI 확인 명령은 `pnpm lint --filter=@gitanimals/web`와
  `pnpm build:web`이다. 이 저장소의 `ci-web.yml`은 `apps/web` 또는 `packages` 변경에
  대해서만 실행된다.
- `apps/admin-main`은 별도 Vite 앱이다. 앱 계약과 명령은
  [`apps/admin-main/AGENTS.md`](apps/admin-main/AGENTS.md)를 먼저 읽는다.
- 테스트·타입 검사 스크립트가 없는 패키지에 명령을 추측해 추가하지 않는다. 실제
  `package.json`과 해당 CI가 제공하는 명령만 실행하고 결과를 기록한다.

## 변경할 때 지켜야 할 조건

- `apps/web`의 Tailwind 전환은 기존 Panda 토큰과 시각 결과를 기준으로 한다. 토큰을
  추정하거나 임의 값으로 대체하지 말고 위의 마이그레이션 결정 기록을 확인한다.
- 앱에서 Panda 인프라를 제거한 상태와 `packages/ui/panda`에 남은 호환·역사 자산을
  혼동하지 않는다. 패키지 삭제나 전역 스타일 변경은 별도 근거와 영향 확인 없이는 하지 않는다.
- Tailwind 클래스 탐색, `border-style`과 전역 reset, Dialog 모바일 풀스크린처럼 이미
  기록된 함정은 해당 결정 기록의 근거와 검증 절차를 따른다. 변경 범위를 넘어 일반적인
  기술 설명을 이 파일에 덧붙이지 않는다.
- 환경 변수와 토큰·관리자 비밀값은 `.env*`에만 두고 커밋·로그·문서에 넣지 않는다.

## Git과 작업 절차

- 기본 대상은 원격 `origin/main`이다. 이슈를 먼저 만들고 `feature/*` 브랜치에서 작업한 뒤
  PR을 만든다. 기존 [`CONTRIBUTING.md`](CONTRIBUTING.md)의 소문자 커밋 타입과 squash merge
  규칙을 따른다.
- Git 절차(브랜치 준비, rebase, PR, push, merge)는 Horbis `git-workflow`를 사용한다.
  push·PR·CI·merge·브랜치 정리는 사용자의 사전 승인을 받은 범위에서만 수행하며, push 전
  정확한 커밋 목록과 대상을 보고한다.
- 기존 사용자 변경을 되돌리거나 broad staging하지 않는다. AI 귀속 문구와
  `Co-Authored-By`를 커밋·PR·코드에 넣지 않는다.
