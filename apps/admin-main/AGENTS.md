# admin-main 작업 계약

이 앱은 `@gitanimals/admin-main`이라는 Vite·React 관리자 화면이다. 화면 구조와 API의
세부 설명은 코드와 [`README.md`](README.md)에 두고, 이 파일에는 작업 시 필요한 조건만 둔다.

## 명령

저장소 루트에서 다음처럼 실행하거나 이 디렉터리에서 같은 스크립트를 실행한다.

```bash
pnpm --filter @gitanimals/admin-main dev
pnpm --filter @gitanimals/admin-main build
pnpm --filter @gitanimals/admin-main lint
pnpm --filter @gitanimals/admin-main type-check
pnpm --filter @gitanimals/admin-main format:check
```

`dev`는 스크립트에서 포트 5173을 지정한다. 프로덕션 빌드는 Vite 설정에 따라 `build/`에
출력된다. 문서만 바꾼 경우를 포함해 존재하지 않는 테스트 명령을 만들거나 추측해 실행하지
않는다.

## 실제 작업 조건

- API 기본 주소와 관리자 인증 헤더는 `src/lib/api/` 코드가 정본이다. 토큰은
  `localStorage`의 `gitanimals_admin_token`을 사용하고, 관리자 비밀값은
  `VITE_APP_ADMIN_SECRET` 등 환경 변수로만 주입한다. 값을 소스·로그·문서에 넣지 않는다.
- `vite.config.mts`의 버전 접미사 패키지 alias는 생성된 화면 번들의 모듈 해석을 위한
  호환 설정이다. 사용처와 빌드를 확인하지 않고 일괄 삭제하지 않는다.
- UI는 Tailwind CSS v4와 현재 shadcn/Radix 컴포넌트 규칙을 따른다. Figma에서 생성된
  컴포넌트는 기존 경계를 유지하고, 공통 primitive와 업무 컴포넌트를 섞지 않는다.
- Git 절차와 push 승인은 루트 [`AGENTS.md`](../../AGENTS.md)와 Horbis
  `git-workflow`를 따른다.
