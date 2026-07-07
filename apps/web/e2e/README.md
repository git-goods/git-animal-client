# E2E (Playwright)

이 PR의 리팩토링 리스크 표면을 검증하는 최소 E2E입니다. 동작·UI 보존이 제1원칙이므로,
"페이지가 여전히 렌더되고 / 통계가 여전히 나오고 / 인증 리다이렉트·토큰 주입이 그대로"인지를 확인합니다.

## 실행

```bash
# 최초 1회: 브라우저 설치
pnpm --filter @gitanimals/web exec playwright install chromium

# 실행 (dev 서버 자동 기동, 이미 떠있으면 재사용)
pnpm --filter @gitanimals/web test:e2e
pnpm --filter @gitanimals/web test:e2e:ui   # 디버깅 UI
```

dev 서버 기동에는 앱의 `.env`(NEXTAUTH_SECRET 등)가 필요합니다. `E2E_BASE_URL`로 대상 URL을 바꿀 수 있습니다.

## 커버리지

| 파일 | 검증 대상 | 관련 변경 |
|---|---|---|
| `landing.spec.ts` | 랜딩 셸/Footer 렌더, 통계 카운트 표시 | 쿼리 팩토리 패키지 이전, Footer 공용화, 시즌 콘텐츠 복원 |
| `auth-redirect.spec.ts` | 미인증 시 `/guild` → 홈 리다이렉트, `/` 공개 접근 | getServerAuth 통일, 미들웨어 인증 |
| `interceptor.spec.ts` | 미인증 요청에 Authorization 미부착 (+ 인증 시 Bearer 주입은 skip) | 인터셉터 재작성(단일 등록, 요청 스코프) |

## stub 한계 (중요)

`utils/api-stub.ts`는 **브라우저(클라이언트) fetch만** 가로챕니다. Next SSR 단계의 서버 fetch는
노드에서 실행되어 `page.route`로 못 잡으므로, 랜딩의 서버 섹션(랭킹 등)은 실백엔드에 의존합니다.
그래서 랜딩 테스트는 ErrorBoundary 아래 서버 섹션이 실패해도 견고하도록 셸/Footer/클라이언트 통계에만
단언합니다. SSR까지 완전 hermetic하게 하려면 dev 서버를 목 서버 base URL로 띄우세요.

## 인증 플로우 확장

`interceptor.spec.ts`의 `authenticated: attaches Bearer token`는 `test.skip`입니다.
`utils/session.ts`의 `seedSession()`(NEXTAUTH_SECRET로 세션 쿠키 서명)에 유효한 테스트
accessToken을 넣고 `test.skip` → `test`로 바꾸면 클라이언트 토큰 주입이 검증됩니다.
