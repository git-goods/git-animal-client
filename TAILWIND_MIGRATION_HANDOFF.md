# Tailwind 재포팅 Handoff (main 기준 새 출발)

> 작성: 2026-06-20 세션. 다음 세션은 이 문서를 출발점으로 본격 진행.

## 0. 한 줄 요약
기존 `dev` 브랜치(PandaCSS→Tailwind 전면 마이그레이션)는 **컴포넌트 변환 단계에서 PandaCSS semantic 토큰(`bg_black.black`, `white.white_75`, `glyph18.bold` 등)이 매핑 없이 누락**되어 시각적으로 부실함이 확인됨. 그래서 **`dev`를 버리고, 검증된 `main`에서 다시** Tailwind로 전환한다. embla(캐러셀)·DialogV2 전환도 이 과정에 동반한다. **단위별로 main에 incremental 머지**한다.

## 1. 왜 다시 시작하나 (근본 원인)
- `dev`는 big-bang 방식으로 전체를 한 번에 변환 → panda 토큰 매핑 규율 없이 즉흥 변환되어 스타일 누락이 전반에 흩어짐.
- 추가로 확인된 함정: **`next dev --turbo`(turbopack)가 별도 `*.style.ts` 파일의 Tailwind 클래스를 스캔하지 못함** → 그 파일에만 쓰인 `gap-[60px]`, `py-[120px]`, `max-w-[766px]` 등이 dev 모드 CSS에서 누락(랜딩/푸터 깨짐). (프로덕션 webpack 빌드 포함 여부는 미확인 — §6 참고)
- 즉 문제는 **앱 컴포넌트 변환 레이어**이지, 디자인 시스템 기반(`@gitanimals/ui-tailwind`)이 아님. 기반은 재사용한다.

## 2. 무엇을 재사용하고 무엇을 다시 하나
| 구분 | 처리 |
|---|---|
| `@gitanimals/ui-tailwind` 패키지 (theme/preset/config/components) | **재사용** (dev에서 cherry-pick/복사). 디자인 시스템의 핵심. |
| tailwind 설정 (preset, screens, glyph plugin, colors) | **재사용** |
| 앱 페이지/컴포넌트 panda→tailwind 변환 | **다시** (main 기준, 토큰 매핑표 준수) |
| FSD 레이어 구조 (`shared/entities/features/widgets/app`) | dev 결정 계승 (CLAUDE.md / `apps/web/ARCHITECTURE.md` 참고) |
| flicking → **embla** 전환 | 이번 마이그레이션에 동반 |
| Dialog v1 → **DialogV2** 전환 | 이번 마이그레이션에 동반 |
| PandaCSS(`styled-system`, `@gitanimals/ui-panda`) 제거 | **마지막 단계**에 일괄 제거 (그 전엔 공존) |

`main`은 이미 최신 동작 상태 + 신규 기능 8개(#384~#391: i18n BCP-47, GitHub 가이드 모달, 데스크톱 로그인 핸드오프, Claude Code 연동, Mixpanel)를 포함 → **역포팅 불필요, 앞으로만 전환**.

## 3. dev 브랜치를 "초안"으로 활용 (속도 ↑, 품질 ↑)
dev의 변환물은 lossy하지만 **유용한 초안**이다. 각 파일 전환 시:
```bash
git show dev:<경로>                      # dev의 tailwind 변환 초안
git show <merge-base>:<경로>             # panda 원본 (정답 스타일)  ※ merge-base = 7f16f4a1
git show main:<경로>                     # main 현재 panda 버전 (최신 기능 포함)
```
→ dev 초안을 베이스로, **panda 원본의 토큰을 §4 매핑표로 복원**하며 검수. (참고: dev 분기점 merge-base = `7f16f4a1`, 2026-03-30)

## 4. PandaCSS → Tailwind 토큰 매핑 (핵심 규율)
**원칙: 변환 전에 매핑표를 고정하고, 추정/근사(opacity 모디파이어 임의 사용) 금지. 값은 `@gitanimals/ui-token`과 `packages/ui/tailwind/src/theme/*.ts`에서 검증.**

`@gitanimals/ui-tailwind` 테마에 토큰이 **이미 정의되어 있음**(아래). dev는 이걸 안 쓰고 빠뜨린 게 문제였음.

- **컬러** (`packages/ui/tailwind/src/theme/colors.ts`)
  - `black.black_NN` → `black` 스케일 키 존재: `{DEFAULT,100,90,75,50,25,10,5}` → 예 `bg-black-75`, `text-black-90`
  - `white.white_NN` → 동일 스케일 → `text-white-75` 등 (⚠️ `text-white/75`(opacity)와 값이 다를 수 있음 — 토큰 키 값으로 검증)
  - `gray.gray_NNN` → `gray` 스케일 `{000..900}` → `text-gray-500`, `bg-gray-400`
  - `brand.green`/green → `bg-brand`(DEFAULT=green) 또는 `bg-green`; 기타 brand 색은 `*-brand-<name>`
- **타이포** (`theme/typography.ts` + `plugins/glyphFont.ts`): 사용 가능 사이즈 `glyph-12,14,15,16,18,20,22,24,28,32,36,40,48,82`
  - panda `glyphNN.bold` → `text-glyph-NN font-bold` / `glyphNN.regular` → `text-glyph-NN`
  - `text-glyph-NN`이 size+line-height 포함, glyphFont 플러그인이 `font-family: Product Sans` 부여
- **반응형** (`theme/screens.ts`): `mobile/tablet/pc`(범위형) + `max-mobile/max-tablet/...`
  - panda `_mobile`(≤768) → `max-mobile:`  / `_tablet`,`_pc`는 screens.ts 범위 정의 확인 후 매핑
- **z-index** (`theme/zIndex.ts`): 예 `z-floating`
- **`cn()`**: `@gitanimals/ui-tailwind` 또는 `@gitanimals/ui-tailwind/utils`

> 권장: 변환 시작 전, 실제 코드에서 쓰인 panda 토큰을 전수 추출해 매핑표를 한 번 더 검증.
> `grep -rohE "(black|white|gray|brand)\.[a-z_0-9]+|glyph[0-9]+\.(bold|regular)|textStyle:" <panda 소스>` 류로 빈도 집계 후 표 완성.

## 5. ⚠️ `.style.ts` 분리 패턴 지양 (turbopack 함정)
- 별도 `X.style.ts` 파일에만 존재하는 클래스가 `next dev --turbo`에서 누락됨(이번에 랜딩 깨짐의 직접 원인).
- **권장**: 스타일은 컴포넌트 파일 내 인라인 `className` 또는 코로케이션된 `cva`로. 별도 style 파일이 꼭 필요하면 (a) 프로덕션 빌드에서 클래스 생성 확인, (b) tailwind `content`에 명시적으로 포함, (c) 가능하면 turbo 없이 dev 구동.

## 6. 미해결/확인 필요 (다음 세션 초반에 결론낼 것)
1. **turbopack `.style.ts` 누락이 프로덕션(webpack `next build`)에도 영향?** → `pnpm build:web` 후 `.next/static/css`에서 `gap-[60px]`/`py-[120px]` 존재 확인. (이번 세션은 dev:web의 `rm -rf .next` 때문에 미확인.) 영향 없으면 "dev 전용 버그"로 격하 가능하지만, §5 방침은 그대로 유지 권장.
2. **panda↔tailwind 공존 시 CSS reset/preflight 충돌** 여부 (PR0에서 검증).

## 7. Incremental 마이그레이션 계획 (main 기준, 단위별 PR)
**핵심 제약: main은 panda. 슬라이스를 하나씩 tailwind로 바꿔 main에 머지하는 동안 나머지는 panda로 동작해야 함 → panda + tailwind 공존이 전제.**

- **PR 0 — 기반(공존 셋업, 컴포넌트 변경 없음)**
  - `@gitanimals/ui-tailwind` 패키지 도입(dev에서 가져옴), `apps/web`에 tailwind config/postcss/globals(@tailwind 지시문) 추가, `@gitanimals/ui-tailwind` 의존성 추가.
  - **PandaCSS는 그대로 둠** → 두 시스템 동시 빌드/렌더 확인. preflight 충돌 점검(§6-2).
  - 산출물: tailwind 클래스가 적용되는 빈 테스트 컴포넌트 1개로 동작 증명.
- **PR 1..N — 슬라이스별 전환** (도메인/라우트 단위 권장: 예 `auth` → `GNB/widgets` → `landing` → `shop` → `mypage` → `guild` → `quiz`)
  - 각 PR: 해당 슬라이스 panda→tailwind 변환(§4 매핑표 준수) + 필요 시 flicking→embla, Dialog→DialogV2 동반.
  - **변환 즉시 시각 비교**(panda 원본 vs tailwind) — 토큰 누락 차단.
  - FSD 배치 준수(필요 슬라이스만 점진적으로).
  - 각 PR 독립적으로 main 머지(나머지는 계속 panda).
- **PR final — PandaCSS 제거**
  - 모든 슬라이스 전환 완료 후 `styled-system` 코드젠/`@gitanimals/ui-panda`/panda config 제거, 잔존 `grep -rE "_panda|styled-system|ui-panda"` 0 확인.

순서 원칙: **공통/리프(shared UI, GNB) 먼저 → 도메인 페이지 → panda 제거 마지막.** 캐러셀 있는 슬라이스(landing, mypage 펫 리스트, shop)에서 embla, 다이얼로그 있는 슬라이스에서 DialogV2 동반.

## 8. 슬라이스 단위 작업 체크리스트 (토큰 누락 방지)
1. 대상 파일의 panda 원본 확인(`git show main:<경로>`), 쓰인 토큰 추출.
2. dev 초안 참고(`git show dev:<경로>`)하되 맹신 금지.
3. §4 매핑표대로 변환, 인라인 className/cva 사용(§5).
4. flicking→embla / Dialog→DialogV2 필요 시 동반.
5. 시각 비교(panda vs tailwind), `type-check` + `lint` + `build:web` 통과.
6. FSD 의존성 규칙 점검 후 PR.

## 9. ui-tailwind 자산 인벤토리 (재사용 대상)
- theme: `colors.ts, screens.ts, typography.ts, zIndex.ts, keyframes.ts`
- 컴포넌트(`components/ui/`): `button(+AnchorButton), textfield, textarea, label, checkbox, select, accordion, dropdown-menu, scroll-area, skeleton, tooltip`, 다이얼로그 계열 `dialog, dialog-v2, alert-dialog, alert-dialog-v2, confirm-dialog, confirm-dialog-v2, flat-dialog`
- 진입점 `packages/ui/tailwind/src/index.ts` (theme/cn/preset/components export). Storybook: `pnpm sb:tailwind`.

## 10. 현재 저장소 상태 / 정리
- 이번 세션의 머지 결과 `fix/tailwind-sync-main`(@94e0d827)와 `backup/dev-pre-merge`(@46ea3aba)는 **로컬에만 존재, push 안 됨** → 폐기 예정. 삭제: `git branch -D fix/tailwind-sync-main backup/dev-pre-merge`
- `dev` 브랜치(@46ea3aba)는 **초안 참고용으로 당분간 보존** 권장(§3).
- 임시 worktree/dev 서버는 정리 완료.
- **다음 세션 시작점: `main`** 에서 새 브랜치 생성 (예 `git switch main && git switch -c feat/tailwind-foundation`).

## 11. 진행 상황 / 다음 액션

> 모든 결정 근거·토큰 검수 데이터는 [`TAILWIND_MIGRATION_DECISIONS.md`](./TAILWIND_MIGRATION_DECISIONS.md)(ADR)에 정리.

### ✅ PR 0 완료 (2026-06-20, 브랜치 `feat/tailwind-pr0-coexistence`, **미push**)
공존 기반 셋업 완료. **컴포넌트 0개**(토큰 기반만). 검증: type-check(web+ui-tailwind)·lint(에러0)·`build:web` 통과.

- **방침 전환(중요):** dev를 그대로 신뢰하지 않는다. `dev`의 `ui-tailwind` 패키지를 통째 가져오려다 검수해 보니 **theme조차 부분적으로 lossy**함을 확인(typography 하드코딩·line-height drift, screens 범위형 오역, brand.DEFAULT 오류, keyframes 이름 drift — 토큰감사는 DECISIONS §2). 따라서 PR0를 **"토큰 기반 + 배선"으로 축소**하고, 모든 컴포넌트를 제외했다(ADR-003).
- **ui-tailwind 패키지(토큰 전용):** `@gitanimals/ui-token`(`COLORS`/`GLYPH`/`BRAND`) single source를 직접 소비하도록 theme 교정. glyph는 `fontSize` 토큰이 아니라 plugin이 `.glyph16-bold`/`.glyph16-regular` 완전체 유틸로 생성(ADR-004). screens는 panda `media.ts`와 1:1. `components/*` 및 컴포넌트 전용 deps(radix/cva/lucide/react-spring) 제거.
- **apps/web 배선:** `tailwind.config.ts`(createGitAnimalsConfig + `corePlugins.preflight=false`) / `postcss.config.cjs`(`tailwindcss → @pandacss/dev/postcss → autoprefixer`) / `globals.css` `@tailwind` 지시문 / `next.config.mjs` transpilePackages / deps.
- **§6-2 결론(preflight 충돌):** 충돌 없음. panda(`preflight:true`)가 reset 단독 책임, tailwind preflight off. 빌드 CSS에서 reset 시그니처가 전부 panda `@layer reset` 소속 확인(ADR-002). ⚠️ panda 제거(PR final) 때 preflight 재활성화 필요.
- **빌드 CSS 검증:** `.glyph16-bold`=16px/700/**120%**, `.glyph16-regular`=16px/400/**150%**, `.glyph24-regular`=24px/400/**150%**(dev에서 깨졌던 값 교정), `bg-brand`=sky(#C4F2F7), `mobile:`=max768·`desktop:`=min768. panda 토큰 공존 정상.

### ✅ PR 1 완료 (auth 슬라이스, 브랜치 `feat/tailwind-pr1-auth` — PR0 위에 쌓음, 미push)
- **전환:** `auth/{page, signOut/page, claude-code/page, desktop/page}` 4파일 panda→tailwind. `LoginButton`/`layout`은 스타일이 없어 제외.
- **컴포넌트:** ui-tailwind 에 `TextField` 추가(panda 원본과 1:1, ADR-007). dev 변환본(text-glyph-N/opacity 모디파이어)은 폐기. components 인프라(배럴/exports/tsup 'use client') 복원.
- **발견:** `white_70`/`white_80` 은 원본의 미정의 토큰 참조 버그 → panda 에서도 흰색이라 `text-white` 로 동작 재현(DECISIONS §2.6).
- **§5 준수:** 별도 `.style.ts` 없이 동일 파일 내 상수/인라인 className 사용(turbopack 함정 회피).
- **검증:** type-check(web+ui-tailwind)·`build:web` 통과. 빌드 CSS 에서 `mobile:glyph24-bold`=120% / `bg-white-10` / gradient / TextField 클래스 정확 생성.

### ✅ PR 2 완료 (GNB 슬라이스, 브랜치 `feat/tailwind-pr2-gnb` — PR1 위, 미push)
- **전환:** `components/GNB/{DesktopGNB, MobileGNB, LanguageSelector, Notification/Notification, Notification/InboxList}` 5파일. `GNB.tsx`/`menu.constants`/`notification.contants`는 스타일 없어 제외.
- **컴포넌트 추가 없음:** GNB 는 ui-panda 컴포넌트·flicking·Dialog 를 쓰지 않아 순수 `css()`→className 전환만.
- **nested selector(ADR-008):** `& .child`→자식 직접 className, `& > *`/`& li`/`&:last-child`→arbitrary variant(`[&>*]:`/`[&_li]:`/`last:`). 공유 `customScrollStyle`(panda)은 `cn()`으로 합쳐 유지.
- **검증:** type-check·`build:web` 통과. z-header/drawer/popover/dropdown, glyphN-weight, white-25/black-10 등 토큰 + mobile: variant + arbitrary 전부 정확 생성.

### 🔄 PR 3 진행 중 (landing 슬라이스 — 설계 부분은 작은 PR로 분리, 사용부는 한 PR)
PR 분리 원칙: 설계·깊은 리뷰 필요분(컴포넌트 추가, 라이브러리 교체)은 작게, 단순 사용/치환은 한 PR.
- ✅ **PR3a** `feat/tailwind-pr3a-button`: ui-tailwind Button/AnchorButton (panda cva 1:1, dev 폐기)
- ✅ **PR3b** `feat/tailwind-pr3b-skeleton`: ui-tailwind Skeleton (gray gradient 1:1, animation easing linear 교정)
- ✅ **PR3c** `feat/tailwind-pr3c-embla`: 슬라이더 flicking→embla. 공유 `PerspectiveCenterSlider`+`AnimalSliderContainerMobile`, `usePerspectiveTween` 훅으로 Perspective/Fade 재현, dead code `AnimalSliderContainer` 삭제. ⚠️ **브라우저 시각 검증 필요**(Perspective rotate/scale 튜닝, 공유라 event 슬라이스도 영향)
- ✅ **PR3d** `feat/tailwind-pr3d-landing-styles`: landing 전 섹션 **스타일 사용부 전환**(36파일). 9개 `.style.ts` 인라인/코로케이션화(`MainSlider.style.ts` 만 cross-import 공유 상수로 유지). 병렬 서브에이전트 7개 전환 후 빌드·grep 검수. `(spring)`/`(christmas)` 불필요 `h-[60px]` spacer 제거. embla **브라우저 시각 검증 완료**.

### ✅ §6-1 결론 (turbopack `.style.ts` 함정)
turbopack 함정은 panda `css()`(빌드타임 추출)에 **국한**. plain 문자열 className 상수는 별도 `.ts` 여도 Tailwind content 스캔 정상(PR3d 프로덕션 빌드에서 `MainSlider.style.ts` 의 `w-[1120px]` 생성 확인). → §6-1 해소(ADR-010).

### 🔄 방침 전환 (ADR-011) — 사용부 통합 / 설계 분리
이제부터 **사용부**(도메인 panda→tailwind 치환)는 도메인=커밋으로 **단일 브랜치 `feat/tailwind-usage-migration`** 에 누적 → **통합 사용부 PR 1개**. **설계**(컴포넌트 추가·Dialog/embla 전환·토큰 교정)는 별도 작은 PR. 커밋 메시지로 구분(cherry-pick 분류). 기존 auth/GNB/landing 사용부 커밋도 통합 PR 합류.

### ✅ PR 4 (shop)
- **설계:** ui-tailwind `Banner`/`GameCard` 추가(panda cva 1:1, dev `%` 누락 버그 수정). `lucide-react` 의존성 추가.
- **사용부:** shop 도메인 전환(21파일, _petGotcha/_auction/_common/_background). 병렬 에이전트 3개+빌드/grep+**브라우저 검증 완료**.
- **Dialog 공존(ADR-012):** shop 5곳 panda `Dialog` import 유지, 주변 스타일만 전환.

### ✅ PR 5 (mypage)
- **설계:** ui-tailwind `Checkbox`/`Label`/`ScrollArea` 추가(ADR-013). shadow-panda recipe 기반이라 **빌드 CSS 실측값**으로 이식(추정 금지). dev 초안 폐기(rounded-sm 오인·ring 색 임의·radix-label 불필요). **light/dark 교훈:** 앱이 `.dark` 미적용→활성 `:root` 값. checkbox focus ring 을 처음 `#d4d4d8`(.dark)로 잡았다 `#a1a1aa`(:root grayscale-400)로 교정. `@radix-ui/react-checkbox`·`react-scroll-area` deps 추가.
- **사용부:** mypage 20파일 전환(병렬 에이전트 3개[root/github-custom/my-pet] + 가장 복잡한 `SelectedPetTable` 직접). Dialog/CommonDialog 5곳 panda 유지(ADR-012). `customScrollStyle` 공존(cn). `Skeleton` styled prop→className. `ScrollArea` height prop 유지. fadeIn 등 keyframe 은 arbitrary(`animate-[fadeIn_...]`)로 1:1, `@keyframes fadeIn` 방출 빌드 확인.
- **검증:** type-check·`build:web` 통과, 잔존(_panda/styled-system) 0, 빌드 CSS 실측 일치(checkbox 4px/#fafafa/#a1a1aa, scrollArea thumb #e4e4e7, Label 14px, glyph 완전체, `[&_.heading]` arbitrary variant). ⚠️ **브라우저 시각 검증 미완**(mypage auth-gated — 후속 로그인 후 확인 필요).

### 다음 액션
1. **mypage 브라우저 시각 검증**(로그인 필요): 펫 리스트(ScrollArea), 판매 다이얼로그(Checkbox/Label), 탭/프로필, github-custom(Farm/Line) 시각 비교.
2. **사용부 계속**(통합 브랜치): `guild → quiz`(§7). 도메인=커밋.
3. **Dialog→DialogV2 전역 별도 PR**(ADR-012): shop/mypage/guild 등 Dialog 사용처 일괄 마이그레이션.
4. **push 전략(미해결):** 전체 포팅 후 cherry-pick/rebase 로 설계 PR들 + 사용부 PR 로 분리해 merge(사용자 결정).
5. **잔여 TODO:** ① `TopBanner` 의 ui-panda `SplitText` → ui-tailwind 이식(ADR-010). ② PR final: PandaCSS 완전 제거 + tailwind preflight 재활성화(ADR-002).
