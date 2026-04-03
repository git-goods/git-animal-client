# PandaCSS → Tailwind CSS 마이그레이션 진행 상황

**마지막 업데이트**: 2026-04-03

> 본 문서는 **PandaCSS → Tailwind** 전환 진행률과, 이후 **`src/components/` 제거·FSD 배치**로 바뀐 **현재 파일 경로**를 함께 기록합니다. 상세 아키텍처는 [`ARCHITECTURE.md`](./ARCHITECTURE.md)를 참고하세요.

## 진행률 요약

- **시작 시점**: 162개 파일 (PandaCSS 임포트)
- **현재 남은 파일**: 0개 파일
- **완료율**: **100%** ✅

---

## 완료된 섹션

### ✅ Landing 섹션 (3개 파일 완료)

| 파일                                                                   | 상태    |
| ---------------------------------------------------------------------- | ------- |
| `src/app/[locale]/landing/MainSection/MainSection.tsx`                 | ✅ 완료 |
| `src/app/[locale]/landing/ChoosePetSection/ChoosePetSection.tsx`       | ✅ 완료 |
| `src/app/[locale]/landing/AvailablePetSection/AvailablePetSection.tsx` | ✅ 완료 |

### ✅ 당시 `src/components/` 기준 Tailwind 마이그레이션 (이후 경로 이동됨)

Panda 제거 작업 당시 경로 기준으로 완료 처리되었으며, 아래 **현재 경로**로 재배치되었습니다.

| Tailwind 마이그레이션 시점 경로                         | 현재 경로 (FSD·앱 코로케이션) |
| ------------------------------------------------------- | ----------------------------- |
| `src/components/AnimalCard/AnimalCard.tsx`              | `src/entities/persona/ui/AnimalCard.tsx` |
| `src/components/SortSelect/SortDirectionSelect.tsx` 등  | `src/app/[locale]/shop/_auction/_components/SortSelect/` |
| `src/components/MediaQuery/MediaQuery.tsx`              | `src/shared/ui/MediaQuery/` |

### ✅ Guild 페이지 (7개 파일 완료)

| 파일                                                                  | 상태    |
| --------------------------------------------------------------------- | ------- |
| `src/app/[locale]/guild/_components/SortSelect.tsx`                   | ✅ 완료 |
| `src/app/[locale]/guild/_components/GuildPetSelectDialog.tsx`       | ✅ 완료 |
| `src/app/[locale]/guild/(subpage)/detail/[id]/page.tsx`               | ✅ 완료 |
| `src/app/[locale]/guild/(subpage)/create/GuildCreate.tsx`             | ✅ 완료 |
| `src/app/[locale]/guild/(subpage)/[id]/setting/member/MemberCard.tsx` | ✅ 완료 |
| `src/app/[locale]/guild/(subpage)/[id]/MoreMenu.tsx`                  | ✅ 완료 |
| `src/app/[locale]/guild/(subpage)/[id]/CopyGuildImgButton.tsx`        | ✅ 완료 |

### ✅ Dev 페이지 및 Laboratory (6개 파일 완료)

| 파일                                                     | 상태    | 비고             |
| -------------------------------------------------------- | ------- | ---------------- |
| `src/app/[locale]/dev/page.tsx`                          | ✅ 완료 | dev 페이지       |
| `src/app/[locale]/dev/Client.tsx`                        | ✅ 완료 | dev 클라이언트   |
| `src/app/[locale]/dev/token/token.style.ts`              | ✅ 완료 | 토큰 스타일      |
| `src/app/[locale]/dev/token/page.tsx`                    | ✅ 완료 | 토큰 페이지      |
| `src/app/[locale]/dev/component/page.tsx`                | ✅ 완료 | 컴포넌트 페이지  |
| `src/app/[locale]/laboratory/_component/AlertDialog.tsx` | ✅ 완료 | Alert 다이얼로그 |

---

## `src/components/` 제거 및 FSD 배치 (2026-04)

레거시 `apps/web/src/components/` 디렉터리는 제거되었습니다. 주요 이동 요약:

| 역할 | 현재 경로 |
| ---- | --------- |
| 범용 UI (Error, Portal, Pagination, MediaQuery, Responsive, AdaptiveLink, EmblaCarousel, Slider, Trigger 등) | `src/shared/ui/` |
| 인증 버튼 | `src/features/auth/ui/` |
| 피드백 폼 + 폼용 Select/TextArea | `src/features/feedback/ui/` |
| 길드 가입 Server Action | `src/features/guild/actions/joinGuild.ts` (`'use server'`) |
| 길드 라우트/페이지 모달 | `src/app/[locale]/guild/_components/` (`RouteModal`, `PageModal` 등) |
| 경매 정렬 UI | `src/app/[locale]/shop/_auction/_components/SortSelect/` |
| 펫뽑기 카드 UI | `src/app/[locale]/shop/_petGotcha/_components/FanDrawingGame/` |
| 퀴즈 탭 UI | `src/app/[locale]/game/quiz/_components/Tabs/` |
| Dev 모드 래퍼 | `src/app/[locale]/dev/_components/DevModePage.tsx` |
| 실험실 멀티머지 DragSelect | `src/app/[locale]/laboratory/multi-merge/_components/DragSelect/` |
| 로케일 셸 (ClientProvider, Monitoring, SessionLoader, GlobalOverlay) | `src/app/[locale]/_components/` |
| 전역 확인/알럿 다이얼로그 훅 | `src/shared/hooks/useDialog.tsx` |

- **`src/serverActions/`** 제거: 길드 액션은 `features/guild/actions/`로 통합, 미사용 `gotcha` 액션 삭제.
- **public API**: 슬라이스 `index.ts`에는 외부에서 실제로 import하는 심볼만 유지 ([`ARCHITECTURE.md`](./ARCHITECTURE.md) 참고).

---

## 완료된 작업

### 백그라운드 에이전트 작업 결과

| 작업 ID | 내용                         | 상태               |
| ------- | ---------------------------- | ------------------ |
| ab99674 | Landing styles (6개 파일)    | ✅ 완료            |
| a988b66 | Landing components           | ✅ 완료            |
| abdd937 | Guild page files (8개 파일)  | ✅ 완료            |
| aeebca2 | Event page files (12개 파일) | ✅ 완료            |
| a6a13a4 | Mypage files                 | ⚠️ Rate limit 중단 |
| a49d6dc | Ranking section              | ⚠️ Rate limit 중단 |
| af69c09 | Quiz game files              | ⚠️ Rate limit 중단 |
| a8ee052 | Guild subpage files          | ⚠️ Rate limit 중단 |
| a1f8080 | Component files              | ⚠️ Rate limit 중단 |

### 수동 마이그레이션 완료 파일 (경로 갱신)

- `src/app/[locale]/error.tsx`
- `src/app/[locale]/auth/page.tsx`
- `src/app/[locale]/auth/signOut/page.tsx`
- `src/shared/ui/Pagination/PaginationServer.tsx` (구 `src/components/Pagination/PaginationServer.tsx`)
- `src/shared/hooks/useDialog.tsx` (구 `src/components/Global/useDialog.tsx`)
- `src/features/feedback/ui/FeedbackForm.tsx` (구 `src/components/Global/FeedbackForm.tsx`)

---

## 마이그레이션 패턴 참조

### 임포트 변환

```typescript
// Before
import { css, cx } from '_panda/css';
import { flex, center, grid } from '_panda/patterns';
import { Flex, Box } from '_panda/jsx';
import { Button, Dialog } from '@gitanimals/ui-panda';

// After
import { cn, Button, Dialog } from '@gitanimals/ui-tailwind';
```

### 스타일 변환 예시

```typescript
// Before (PandaCSS)
const style = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  textStyle: 'glyph16.regular',
  color: 'white.white_75',
  _mobile: { padding: '8px' },
});

// After (Tailwind)
const style = cn('flex items-center gap-2', 'font-product text-glyph-16 text-white/75', 'max-mobile:p-2');
```

### 색상 토큰 매핑

| PandaCSS         | Tailwind         |
| ---------------- | ---------------- |
| `brand.canary`   | `brand-canary`   |
| `gray.gray_150`  | `gray-150`       |
| `white.white_75` | `white-white/75` |
| `black.black_50` | `black/50`       |

### 반응형 프리픽스

| PandaCSS       | Tailwind      |
| -------------- | ------------- |
| `_mobile: {}`  | `max-mobile:` |
| `_desktop: {}` | `desktop:`    |

---

## ui-tailwind 구조적 개선 (2026-01-14)

### 문제점

- `@gitanimals/ui-tailwind`의 index.ts에 'use client' 배너가 있어서 서버 컴포넌트에서 `cn` 유틸리티 사용 시 빌드 에러 발생

### 해결책

1. **tsup 설정 분리**:

   - `index.ts`, `components/index.ts`: 'use client' 배너 포함 (클라이언트 컴포넌트용)
   - `utils/index.ts`: 'use client' 배너 없음 (서버 컴포넌트용)

2. **새로운 import 패턴**:

   ```typescript
   // 클라이언트 컴포넌트에서 (기존과 동일)
   import { cn, Button, Dialog } from '@gitanimals/ui-tailwind';

   // 서버 컴포넌트에서 cn만 필요한 경우
   import { cn } from '@gitanimals/ui-tailwind/utils';
   ```

3. **추가된 컴포넌트** (ui-tailwind):
   - `Banner`, `BannerSkeleton`, `BannerSkeletonList`
   - `LevelBanner`
   - `BannerPetSelectMedium`
   - `CommonDialog`
   - `SearchBar`

### 수정된 서버 컴포넌트 파일 (70+ 파일)

- 모든 서버 컴포넌트에서 `cn` import를 `/utils` 경로로 변경
- 누락된 'use client' 지시문 추가

---

## 최종 단계 (마이그레이션 완료 후)

- [x] 모든 파일 마이그레이션 완료
- [x] `pnpm build:web` 빌드 성공 확인 ✅
- [x] 레거시 `src/components/` 제거 및 FSD·앱 코로케이션 배치 (2026-04)
- [ ] 시각적 회귀 테스트
- [ ] PandaCSS 의존성 제거
  - `panda.config.ts` 삭제
  - `styled-system/` 디렉토리 삭제
  - `package.json`에서 PandaCSS 관련 의존성 제거
  - `tsconfig.json`에서 `_panda` 경로 제거
