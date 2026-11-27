# app 작업 계약

이 앱은 `@gitanimals/app`이라는 Expo(expo-router) 모바일 앱이다. 제품 설명은 저장소
루트 문서에 두고, 이 파일에는 작업 시 필요한 조건만 둔다.

## 명령

```bash
pnpm --filter @gitanimals/app start
pnpm --filter @gitanimals/app test
pnpm --filter @gitanimals/app type-check
pnpm --filter @gitanimals/app lint
```

Expo 호환 네이티브 의존성은 `apps/app`에서 `npx expo install <pkg>`로 추가한다. 그 외
패키지 관리는 pnpm을 쓴다.

## 실제 작업 조건

- 라우트는 `app/`에 둔다(`src/app/` 아님). `(auth)`와 `(tabs)` 그룹은 루트 레이아웃의
  `Stack.Protected`로 보호하므로 새 최상위 라우트는 반드시 가드 안에서 선언한다.
- 이 앱만 React 19.3을 쓴다. 루트 `pnpm.overrides`로 맞추며 web은 React 18을 유지한다.
  `src/__tests__/workspace.test.ts`가 react·react-query 사본이 하나인지 확인하므로
  의존성을 바꾸면 이 테스트를 돌린다.
- 픽셀 규칙: 둥근 모서리, 블러 그림자, 그라데이션, 이모지, 이탤릭을 쓰지 않는다. 펫 PNG는
  `PixelSprite`로 정수배 nearest 스케일해 그린다. 색과 크기는 테마 토큰만 쓰고 새 hex를
  만들지 않는다.
- 인증 토큰은 `expo-secure-store`에만 저장하고 로그에 남기지 않는다. 개발용 토큰 로그인은
  `__DEV__`에서만 열고, Login-Secret·Image-Secret 같은 비밀값은 앱에 넣지 않는다.
- Git 절차와 push 승인은 루트 [`AGENTS.md`](../../AGENTS.md)를 따른다.
