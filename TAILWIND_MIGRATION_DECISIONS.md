# Tailwind 마이그레이션 — 결정 기록 (ADR) & 토큰 감사

> 이 문서는 PandaCSS → TailwindCSS 마이그레이션의 **의사결정 근거**와 **검수 데이터**를 남기는 단일 출처다.
> GitAnimals는 다수 사용자가 쓰는 프로덕션 서비스이므로, 모든 결정에 "기준과 배경"을 기록해
> 협업자가 *왜* 이렇게 했는지 추적할 수 있게 한다.
>
> 관련 문서: [`TAILWIND_MIGRATION_HANDOFF.md`](./TAILWIND_MIGRATION_HANDOFF.md) (진행 계획/상태의 마스터 문서)
>
> 표기: ✅ 정확 / ❌ 오류(교정 필요) / ⚠️ 부분 불일치

---

## 1. 의사결정 기록 (ADR)

### ADR-001 — `main`에서 재시작, `dev`는 "초안 참고용"으로만
- **배경:** 기존 `dev` 브랜치는 big-bang 방식으로 PandaCSS→Tailwind 전체를 한 번에 변환했고, panda 토큰 매핑 규율 없이 즉흥 변환되어 스타일 누락이 광범위했다. 또 `main`에는 `dev` 이후 신규 기능 8개(#384~#391)가 들어와 있어 역포팅이 비효율적이다.
- **결정:** 검증된 `main`을 기준으로 슬라이스 단위 incremental 전환. `dev`는 폐기하지 않되 **참고 초안**으로만 쓰고, 코드를 그대로 신뢰/복사하지 않는다.
- **근거:** `main`은 현재 동작 + 최신 기능 보유. dev 변환물은 lossy하므로 "정답"이 아니라 "초안".

### ADR-002 — PandaCSS와 Tailwind를 공존시키고, Tailwind preflight는 비활성화
- **배경:** 슬라이스를 하나씩 전환하는 동안 나머지는 panda로 동작해야 하므로 두 시스템이 한 빌드에서 공존해야 한다. `apps/web/panda.config.ts`는 `preflight: true`(`@shadow-panda/preset`)라 panda가 전역 reset을 이미 책임진다.
- **결정:** `apps/web/tailwind.config.ts`에서 `corePlugins.preflight = false`로 Tailwind preflight를 끈다. PostCSS 순서는 `tailwindcss → @pandacss/dev/postcss → autoprefixer`.
- **근거:** Tailwind preflight를 켜면 panda reset과 **이중 reset** 충돌이 발생한다. PandaCSS의 reset은 본래 Tailwind preflight를 포팅한 것이라 시그니처(`-webkit-text-size-adjust`, `border-style:solid`, emoji 폰트 스택)가 동일하다.
- **검증:** PR0 프로덕션 빌드 CSS에서 모든 reset 시그니처가 panda `@layer reset` 소속임을 확인(값에 `var(--colors-...)` 사용이 결정적). Tailwind 유틸리티·panda 토큰 62개 정상 공존 생성.
- **후속:** PandaCSS 제거(PR final) 시 preflight를 **재활성화**해야 한다.

### ADR-003 — PR0 범위 = "토큰 기반 + 배선"만, 컴포넌트 0개
- **배경:** 최초 PR0(@62c1fbfe)는 `git checkout dev -- packages/ui/tailwind`로 패키지 68개 파일을 **통째로** 가져왔다. 그 안에는 디자인 토큰 기반뿐 아니라 dev가 변환한 **미검증 도메인 컴포넌트**(banner, card, common-dialog, search-bar, animation)가 "기반"인 척 섞여 있었다.
- **결정:** PR0는 **theme(교정본) + preset + config + glyph plugin + cn 유틸 + apps/web 배선**까지만 포함한다. `components/*`(shadcn primitives 포함) 전부 제외.
- **근거:** 컴포넌트는 슬라이스 전환 시 panda 원본과 **1:1 시각 대조**하며 도입해야 lossy 오염을 막을 수 있다. 검증되지 않은 변환물을 공유 기반에 두면 전체가 오염된다.
- **후속:** 각 슬라이스 PR에서 그 슬라이스가 쓰는 컴포넌트를 panda 원본 대조 후 ui-tailwind에 추가한다(필요 deps도 그때 추가).

### ADR-004 — glyph 타이포는 size+weight "완전체" 유틸로 표현하고, `GLYPH` 토큰을 직접 소비
- **배경:** panda는 glyph를 `glyph16.bold` / `glyph16.regular`처럼 **(size, weight) 조합 단위의 완전한 textStyle**로 정의한다(`@gitanimals/ui-token`의 `GLYPH` → panda `textStyles.ts`가 그대로 소비). 같은 사이즈라도 weight에 따라 line-height가 다르다(예: `glyph16` regular=150%, bold=120%).
- **결정:** Tailwind 쪽도 `GLYPH`를 **직접 import**해 plugin으로 `.glyph16-bold` / `.glyph16-regular` 같은 완전체 유틸(font-family·size·weight·line-height·letter-spacing 포함)을 생성한다. Tailwind의 `fontSize` 토큰 방식(`text-glyph-16` + `font-bold`)은 폐기.
- **근거:** Tailwind `fontSize`는 사이즈당 line-height를 **하나만** 가질 수 있어 (size,weight)별 line-height를 표현할 수 없다. dev는 이를 무시하고 사이즈당 line-height를 임의 고정해 **bold variant의 line-height가 전부 어긋났다**(아래 §2.3). 완전체 유틸은 panda textStyle과 1:1이라 변환이 기계적이고 drift가 원천 불가능하다.
- **변환 매핑:** panda `textStyle: 'glyph16.bold'` ↔ tailwind `className="glyph16-bold"`.

### ADR-005 — theme 토큰은 `dev`에서 복사하지 않고 `@gitanimals/ui-token` single source에서 생성·검증
- **배경:** §2 토큰 감사에서 dev의 theme조차 부분적으로 lossy함이 드러났다(typography 하드코딩, screens 오역, brand 기본값 오류, keyframes 이름 drift). handoff의 "ui-tailwind 기반은 검증됨, 그대로 재사용" 전제가 부분적으로 틀렸다.
- **결정:** 색/타이포/keyframes 등은 가능한 한 `@gitanimals/ui-token`(`COLORS`, `GLYPH`, `BLACK/WHITE/BRAND/GRAY`)을 **직접 import**해 생성한다. 손으로 베낀 하드코딩 값을 금지한다. panda와 tailwind가 **같은 single source**를 보게 해 정의상 1:1을 보장한다.
- **근거:** panda의 `tokens.ts`/`semanticTokens.ts`/`textStyles.ts`가 모두 ui-token을 소비하므로, tailwind도 동일 소스를 소비하면 값 drift가 구조적으로 불가능해진다.

### ADR-006 — ui-tailwind는 source-first(`transpilePackages`)로 소비, dev의 pre-compiled 문서는 제거
- **배경:** dev 잔재 문서(`packages/ui/tailwind/README.md`, `docs/ARCHITECTURE_DECISION.md`)는 "pre-compiled 방식: 앱은 `src`가 아니라 빌드 산출물 `dist`를 참조한다"고 명시했다. 그러나 실제 `package.json`의 `exports`는 `./src/*.ts`를 직접 가리키고, `apps/web`은 `transpilePackages: ['@gitanimals/ui-tailwind']`로 src TS를 직접 트랜스파일한다(= source-first). 즉 문서와 구현이 정면 모순.
- **결정:** `apps/web`에서는 **source-first**로 소비한다. `dist` 빌드 산출물에 의존하지 않는다. 모순된 dev 문서 2개는 제거한다(정확한 패키지 README는 컴포넌트 도입 시 작성).
- **근거:** ① `@gitanimals/ui-panda`도 `"main": "src/index.ts"`로 source-first — **모노레포 표준**이다. ② Tailwind v3는 jiti로 TS config 및 그 import를 해석하므로 `tailwind.config.ts`가 `@gitanimals/ui-tailwind/config`(=src TS)를 import해도 동작한다(PR0 `build:web` 통과로 실증). ③ 별도 빌드 단계가 없어 DX가 단순하고, 잘못된 문서를 남기는 것은 협업자를 오도한다.

### ADR-007 — 슬라이스 컴포넌트는 panda 원본 기준으로 작성, dev 변환본은 폐기 (PR1)
- **배경:** PR1(auth)의 claude-code 페이지가 ui-panda `TextField` 를 쓴다. ADR-003 대로 ui-tailwind 에 컴포넌트를 추가해야 하는데, dev 의 `textfield.tsx` 가 있으나 ① 폐기한 `text-glyph-16` fontSize 방식, ② opacity 모디파이어(`white/25`) 사용, ③ panda 원본에 없는 `bg-transparent`/`focus` 임의 추가 등 lossy 했다.
- **결정:** `@gitanimals/ui-panda` 원본 스펙을 기준으로 직접 작성한다. glyph 완전체 유틸(`glyph16-regular`), 색은 토큰 키(`white-25`/`white-50`/`brand-coral`). 배경/포커스는 panda 전역 reset 이 담당하므로 미지정. dev 변환본은 참고만 한다.
- **근거:** dev 맹신 금지(작업 방침). 시각 1:1 의 기준은 panda 원본이다. 컴포넌트는 슬라이스에서 하나씩 이렇게 추가한다.

### ADR-008 — panda nested selector / 공유 스타일 전환 규칙 (PR2)
- **배경:** PR2(GNB)의 panda `css()` 에 `& .child`, `& > *`, `&:last-child`, `& div` 같은 nested selector 와, 슬라이스 밖 공유 스타일(`customScrollStyle`)이 섞여 있었다.
- **결정:**
  1. 자식이 같은 컴포넌트 JSX 안에 있으면 그 자식 요소에 **직접 className** 을 부여한다(가독성 우선). 예: `& .profile-image {…}` → 해당 `<div>` 에 직접.
  2. 직접 부여가 어려운 구조적 selector 는 **arbitrary variant** 로 옮긴다: `& > * → [&>*]:`, `& li → [&_li]:`, `&:last-child → last:`.
  3. 슬라이스 밖 **공유 panda 스타일**(예: `@/styles/scrollStyle` 의 `customScrollStyle`)은 그 스타일을 소유한 슬라이스가 전환되기 전까지 `cn()` 으로 tailwind 클래스와 합쳐 **panda 채로 유지**한다(공존).
- **근거:** 시각 1:1 + 가독성. 공유 스타일은 중복 전환을 피하고 소유 슬라이스에서 한 번에 전환한다.

### ADR-009 — flicking → embla 전환, Perspective/Fade 는 scroll-progress 커스텀으로 재현 (PR3c)
- **배경:** landing 슬라이더가 `@egjs/react-flicking` 기반이었다(마이그레이션 동반 목표). `MainSlider` 는 이미 embla. 실제 flicking 사용은 공유 컴포넌트 `PerspectiveCenterSlider`(landing+**event** 사용, Perspective+Fade+Arrow)와 `AnimalSliderContainerMobile`(Perspective+Fade)뿐이고, `AnimalSliderContainer` 는 **dead code** 였다.
- **결정:** 둘을 embla 로 전환하고 dead code 는 삭제. flicking `Perspective({rotate:0.5, scale:0.2})` + `Fade()` 를 `useEmblaCarousel` + `usePerspectiveTween` 훅으로 재현한다 — embla `scrollProgress`/`scrollSnapList` 의 diff 로 `rotateY`(=-diff·90·rotate)·`scale`(=1-|diff|·scale)·`opacity`(=1-|diff|·fade) 를 계산해 transform. `embla-carousel-fade` 는 쓰지 않는다(opacity 를 tween 에 포함). 화살표는 `scrollPrev/Next`, 컨테이너/화살표 시각 스타일(panda)은 PR3d 로 미룬다(embla 구조 클래스만 tailwind).
- **⚠️ 검증 필요(미해결):** Perspective 공식이 flicking 내부와 미묘히 다를 수 있어 **브라우저 시각 검증**으로 rotate/scale 튜닝이 필요하다. `PerspectiveCenterSlider` 는 공유 컴포넌트라 **event 슬라이스도 함께 영향**받으므로 event 도 검증 대상. → 2026-06-21 브라우저 검증 완료(OK).

### ADR-010 — `.style.ts` 정책 명확화(§5 보완) + ui-panda SplitText 잔존 (PR3d)
- **배경:** §5 는 별도 `*.style.ts` 지양(turbopack 함정)을 권했다. PR3d 에서 landing 9개 `.style.ts` 를 컴포넌트 `.tsx` 로 인라인/코로케이션했다. 단 `MainSection/MainSlider.style.ts` 의 `sliderContainer` 는 `AnimalSliderContainerMobile` 이 cross-import 하는 공유 상수다.
- **결정/검증(§6-1 결론):** turbopack 함정은 panda `css()`(빌드타임 추출 매크로)에 국한이고, **plain 문자열 className 상수는 별도 `.ts` 에 있어도 Tailwind content 스캔 대상**(`content` glob 에 `.ts` 포함)이다. PR3d 프로덕션 빌드에서 `MainSlider.style.ts` 의 `w-[1120px]` 가 정상 생성됨을 확인 → §5 의 우려(별도 파일 클래스 누락)는 **css() 호출에만 해당**. 따라서 원칙은 코로케이션이되, cross-import 공유 상수는 `.ts` 문자열 상수로 유지 허용.
- **SplitText(미해결 TODO):** `MainSection/TopBanner` 가 `@gitanimals/ui-panda/src/animation/SplitText` 를 deep-import 한다. ui-tailwind 에 대응이 없어 공존 유지. **PandaCSS 제거(PR final) 전 ui-tailwind 로 이식** 필요.
- **불필요 spacer 제거:** `(spring)`/`(christmas)` 의 `<div className="h-[60px]" />` 는 panda 프로젝트에 tailwind 문법으로 잘못 있던 무효(height 0) 요소였는데 Tailwind 도입으로 60px 여백이 실렌더됨 → 제거. (GNB 의 h-[60px] 는 fixed 헤더 보정용이라 유지)

### ADR-011 — 사용부는 통합 PR, 설계는 분리 PR (2026-06-21, 사용자 방침 전환)
- **배경:** PR1(auth)/PR2(GNB)/PR3(landing)을 도메인별 브랜치로 나눴으나, 사용처(사용부) 전환은 §4 매핑을 **기계적으로 적용**하는 작업이라 도메인마다 PR 을 쪼개면 리뷰어가 같은 종류의 diff 를 여러 PR 에서 반복해서 본다.
- **결정:** 사용부(도메인 panda→tailwind 치환)는 **도메인 = 커밋**으로 단일 브랜치(`feat/tailwind-usage-migration`)에 누적 → **통합 사용부 PR 1개**. 설계(ui-tailwind 컴포넌트 추가, Dialog→DialogV2, flicking→embla, 토큰 교정)는 **별도 작은 PR**. 커밋 메시지로 `feat: ui-tailwind X 추가`(설계) vs `feat: X 도메인 전환`(사용부)를 구분해 cherry-pick 분류. 기존 auth/GNB/landing 사용부 커밋도 통합 PR 에 합류.
- **근거:** 리뷰는 커밋 단위로 충분하고, PR 개수 폭발 방지·머지 관리 단순. 설계만 깊게 본다.

### ADR-012 — Dialog 전역 공존, DialogV2 전환은 별도 전역 PR (PR4)
- **배경:** shop 5곳이 panda `Dialog`(compound API: `Dialog.Content`/`Dialog.Title`)를 쓴다. Dialog 는 mypage/guild 등도 쓰는 전역 컴포넌트이고, dev 의 `dialog-v2` 는 shadcn(named export) API 라 사용처 마이그레이션이 필요하다.
- **결정:** shop 사용부 전환 시 `Dialog` 는 **panda import 그대로 유지(공존)**, 주변 css() 스타일만 Tailwind 로. `Dialog→DialogV2` 는 **전역(shop/mypage/guild...) 일괄 별도 PR** 로 한 번에 마이그레이션한다.
- **근거:** shop 에서만 V2 로 바꾸면 다른 슬라이스와 API 가 갈린다(공존 혼란). 사용부 흐름을 막지 않고 Dialog 결정을 분리.

### ADR-013 — recipe 기반 컴포넌트는 "빌드 CSS 실측값"으로 이식, shadow-panda semantic 토큰은 활성 :root 값으로 해석 (PR5 mypage)
- **배경:** mypage 가 ui-panda `Checkbox`/`Label`/`ScrollArea` 를 쓴다. 이 셋은 shadow-panda preset 의 **slot recipe**(`checkbox`/`scrollArea`) 또는 recipe(`label`) 기반이고, base 스타일이 shadow-panda 자체 semantic 토큰(`primary`/`border`/`ring`/`background`/`radii.sm` 등)을 참조한다. 이 토큰들은 GitAnimals 디자인 토큰(ui-token)이 아니라 shadcn 계열 기본값이며, ui-tailwind theme(ADR-005: ui-token single source)에는 존재하지 않는다. dev 변환본(`checkbox.tsx`/`label.tsx`/`scroll-area.tsx`)은 lossy 했다(rounded-sm 오인, ring 색 임의 `white/25`, radix-label 불필요 추가).
- **결정:** 추정·근사 금지. `pnpm build:web` 으로 **panda 가 실제로 출력한 CSS**(`.next/static/css`)에서 해당 recipe 클래스(`.checkbox__root`/`.scrollArea__*`/`.label`)와 그 토큰 변수(`--radii-sm`, `--borders-primary`, `--colors-ring` …)의 최종 해석값을 추출해 그대로 재현한다. ui-tailwind 에는 GitAnimals 토큰만 두는 원칙(ADR-005)을 지키되, recipe 가 끌어쓴 shadcn 토큰의 **결과값**은 리터럴(예 `#fafafa`, `#a1a1aa`, `#e4e4e7`, `rounded-[4px]`)로 박는다.
- **light/dark 교훈(중요):** shadow-panda semantic 토큰은 `:root`(기본/라이트)와 `.dark` 두 값으로 정의된다. GitAnimals 앱은 html 에 `.dark` 를 **부여하지 않으므로 항상 `:root`(라이트) 값이 활성**이다. 토큰감사 초기에 light/dark 를 혼동해 checkbox focus ring 을 `grayscale-300`(zinc-300 #d4d4d8, `.dark` 값)으로 잡았다가, 빌드 CSS 의 활성 `:root` = `--colors-ring: grayscale-400`(zinc-400 #a1a1aa) 를 확인하고 교정했다. → recipe 토큰은 반드시 **활성 :root 블록**에서 값을 읽을 것.
  - 해석 결과(활성 :root): `radii.sm`=calc(0.5rem−4px)=**4px**, `border`=grayscale-200=**#e4e4e7**, `ring`=grayscale-400=**#a1a1aa**, `background`=grayscale-0=**white**, `primary`=grayscale-900(단 checkbox 는 checkboxLightStyle 로 #fafafa override).
- **API 보존:** panda `ScrollArea` 는 `styled()` 라 `height="160px"` styled prop 을 받는다 → ui-tailwind ScrollArea 도 `height` prop 을 받아 root inline style 로 적용(사용처 변경 최소화, calc arbitrary 회피). panda `Skeleton` 의 styled prop(width/height/borderRadius)은 ui-tailwind 가 className API 라 사용처에서 className 으로 치환.

### ADR-014 — `border` 유틸은 항상 `border-solid` 동반 (전역 `button{border:transparent}` 함정, PR5 mypage)
- **배경:** mypage 판매 다이얼로그의 ui-tailwind `Checkbox` 테두리가 **프로덕션에서도** 안 보였다(`Button` 의 Sell/Merge 테두리도 사라짐). 원인 추적 결과 앱 전역 스타일에 `button { border: transparent }` 가 있는데, 이 `border` shorthand 가 **`border-style` 을 `none`** 으로 만든다(특이도 `button` = 0,0,1). Tailwind 의 `border` 유틸은 **border-width 만** 지정하고 border-style 은 저특이도 reset `*{border-style:solid}`(0,0,0)에 의존하는데, `button{border:transparent}`(0,0,1)가 이를 이겨 **border-style:none → 테두리 미렌더**. checkbox 는 그림자도 없어 완전 비표시, Button 은 inset box-shadow 덕에 테두리처럼 보였을 뿐 실제 border 는 사라진 상태였다.
- **결정:** preflight OFF(ADR-002) 환경에서 ui-tailwind 컴포넌트는 `border` 를 쓸 때 **반드시 `border-solid` 를 동반**한다(`border border-solid border-<color>`). `border-solid`(특이도 0,1,0)가 `button{}`(0,0,1)을 이겨 border-style:solid 를 강제한다. panda 원본은 `border:1px solid` **shorthand**(style 포함)라 영향이 없었다 — 즉 Tailwind 의 width/color 분리 유틸 특유의 함정.
- **적용:** `Checkbox`/`Button`/`TextField` 에 `border-solid` 추가(기존 Button/TextField 의 잠재 버그도 동시 해결). 이후 추가하는 모든 bordered 컴포넌트·사용부에도 동일 규칙 적용.
- **교훈(검증 방식):** "빌드 CSS 에 클래스가 생성됐다"(`.border`/`.border-[#fafafa]` 존재)만으로는 부족하다. **cascade(특이도·layer) 까지** 따져야 실제 렌더를 보장한다. 전역 element 셀렉터(`button{}`)가 utility 의 일부 속성을 덮을 수 있다.

### ADR-015 — compound radix 컴포넌트는 visible 스타일만 1:1, 애니메이션은 표준 shadcn(tailwindcss-animate) (PR6 guild)
- **배경:** guild 가 ui-panda `Tooltip`/`DropdownMenu`/`CombineChip`(=radix-select) 을 쓴다. 이들은 shadow-panda preset 의 **slot recipe** 기반이고, recipe base 가 shadow-panda 의 **enter/exit 애니메이션 시스템**(`--shadow-panda-enter-*` / `exit` 오케스트레이션)과 shadcn semantic 토큰(`popover`/`accent`/`shadows-md`/`durations-fast`)에 의존한다. 그러나 GitAnimals 는 각 컴포넌트의 **visible 스타일을 css() override 로 완전히 덮는다**(Tooltip=#404148/blur, DropdownMenu=rgba(0,0,0,.5)/blur, CombineChip=black-75/cva small·medium). 즉 shadcn 토큰은 실제 렌더에 거의 안 쓰이고, recipe 는 **구조(z-index/min-width/overflow/positioning) + 애니메이션**만 기여한다.
- **결정(사용자 방침):** ① visible 스타일(색/패딩/radius/border)은 GitAnimals override 값으로 **1:1 이식**. ② shadow-panda 의 enter/exit 애니메이션 오케스트레이션을 그대로 재현하지 않고 **표준 shadcn 애니메이션 = `tailwindcss-animate` 플러그인**(`animate-in/out`, `fade-in-0`/`fade-out-0`, `zoom-in-95`/`zoom-out-95`, `slide-in-from-{side}-2`)으로 대체한다. zoom-95=scale 0.95, slide-from-2=8px 로 shadow-panda 값과 **시각적으로 동등**하다. ③ shadcn semantic 토큰(popover/accent 등)은 ui-tailwind 에 들이지 않고(ADR-005 유지), recipe 가 끌어쓰던 구조값(min-w 8rem, z-50, overflow-hidden, shadow-md)만 리터럴로 재현.
- **인프라:** `tailwindcss-animate` 를 ui-tailwind preset/config 의 plugins 에 추가(`@radix-ui/react-select`·`react-tooltip`·`react-dropdown-menu` 의존성도). createGitAnimalsConfig 가 jiti 로 이 plugin(CJS)을 해석함을 `build:web` 으로 실증.
- **범위:** DropdownMenu 는 guild 가 쓰는 Root/Trigger/Content/Item + 흔한 Group/Label/Separator/Portal 만 포팅(Sub/Checkbox/Radio 는 사용처 생길 때 추가). Dialog 는 여전히 panda 공존(ADR-012) — DropdownMenu/Tooltip/Select 는 애니메이션이 단순(fade/zoom)해 표준 대체가 안전했지만, Dialog(+오버레이/포커스 트랩)는 별도 DialogV2 PR 유지.
- **검증:** 빌드 CSS 에서 override 값(#404148/rgba(0,0,0,.5)/black-75/rounded-10) + `tailwindcss-animate` 유틸 + `@keyframes enter/exit` 생성 확인. border 는 `border-solid` 동반(ADR-014).

---

## 2. 토큰 감사 (dev `ui-tailwind/theme/*` vs panda single source, 2026-06-20)

검수 기준 원본: `packages/ui/token/src/{color,font/glyph}.ts`,
`packages/ui/panda/src/theme/{tokens,semanticTokens,textStyles,media,keyframes}.ts`.

| theme 파일 | 판정 | 요약 |
|---|---|---|
| `colors.ts` (raw 스케일) | ✅ | `COLORS` 직접 import → 값 동일 |
| `colors.ts` `brand.DEFAULT` | ❌ | panda semantic = `BRAND.sky`, dev = `green` |
| `colors.ts` `gray.DEFAULT` | ⚠️ | panda = `gray_000`, dev엔 DEFAULT 없음 |
| `zIndex.ts` | ✅ | panda zIndex 토큰 전부 포함, 값 일치 |
| `typography.ts` | ❌ | `GLYPH` 미사용·하드코딩, bold variant line-height 어긋남 |
| `screens.ts` | ❌ | panda `media`를 범위형으로 오역 + desktop 1px drift |
| `keyframes.ts` | ⚠️ | `slideFromRight/Left` 누락, `move_5/animateSpin` 이름 drift |

### 2.1 colors — ✅ 값 정확 / ❌ brand.DEFAULT
- raw 스케일(`black_*`, `white_*`, `gray_*`, brand 색)은 `COLORS`를 직접 import하므로 panda(`tokens.ts`)와 값 동일. **안전.**
- panda `semanticTokens.ts`: `brand.DEFAULT = BRAND.sky`. dev `colors.ts`: `brand.DEFAULT = COLORS.green` → **`bg-brand` 기본값이 panda와 다른 색.** 교정 필요.
- panda `gray.DEFAULT = gray_000`. dev엔 `gray.DEFAULT` 없음 → `bg-gray`(default) 미동작. 보완.

### 2.2 zIndex — ✅
panda `tokens.ts`의 zIndex(hide~loading) 키·값 모두 dev에 존재하고 일치. dev가 추가한 `10/20/30/40/50`(Tailwind 숫자)는 무해.

### 2.3 typography — ❌ (핵심 오류)
panda `GLYPH` 원본의 (size, weight)별 line-height:

| glyph | regular LH | bold LH | dev `text-glyph-N` 고정 LH | 결과 |
|---|---|---|---|---|
| 12/14 | 150% | — | 150% | ✅ |
| 15 | 150% | 150% | 150% | ✅ |
| 16 | 150% | **120%** | 150% | ❌ bold 깨짐 |
| 18 | 150% | **120%** | 150% | ❌ bold 깨짐 |
| 20 | 150% | **120%** | 150% | ❌ bold 깨짐 |
| 22 | 150% | — | 150% | ✅ |
| 24 | **150%** | 120% | 120% | ❌ regular 깨짐 |
| 28~48 | — | 120% | 120% | ✅ |
| 82 | — | 120% (ls -1px) | 120% (ls -1px) | ✅ |

→ ADR-004대로 완전체 유틸로 재작성하면 전부 해소.

### 2.4 screens — ❌ (의미 오역)
panda `media.ts`:
```
mobile  = @media (max-width: 768px)
tablet  = @media (max-width: 1024px)
pc      = @media (max-width: 1440px)
desktop = @media (min-width: 768px)
```
dev `screens.ts`: `desktop = min-width:769px`(1px drift), `tablet = 769~1024(범위)`, `pc = 1025~1440(범위)`로 **단순 상/하한을 범위형으로 오역**. 또 Tailwind 기본 `sm/md/lg/xl/2xl`(min-width)와 임의 `max-1400/1200/950/900/600/400`을 추가해 panda에 없는 의미를 끌어들였다.
- **교정:** panda 4개 conditions(`mobile`/`tablet`/`pc`/`desktop`)와 1:1로만 정의. 임의 breakpoint는 변환 시 arbitrary variant(`[@media(max-width:900px)]:`)로 개별 처리.
- **변환 매핑:** panda `_mobile` ↔ tailwind `mobile:`(max768), `_tablet`↔`tablet:`(max1024), `_pc`↔`pc:`(max1440), `_desktop`↔`desktop:`(min768).

### 2.5 keyframes — ⚠️ (부분 불일치)
panda(11): `fadeIn, fadeInUp, jump, bounce, move, move_5, slide, slideFromRight, slideFromLeft, skeletonLoading, animateSpin`.
dev(13): 위 중 `slideFromRight/slideFromLeft` **누락**, `move_5`→`move5`·`animateSpin`→`spin`으로 **이름 변경**, 그리고 globals.css 유래(`fadeInDown, pulse, heartbeat, gradientMove`) 추가.
- **교정:** panda 원본 이름·정의를 보존(`slideFromRight/Left` 복원, `move_5`/`animateSpin` 이름 유지). globals.css 유래 추가분은 실제 사용처 확인 후 유지.

---

### 2.6 white_70 / white_80 — 원본 코드의 미정의 토큰 참조 (PR1에서 발견)
auth 의 claude-code/desktop 원본이 `color: 'white.white_70'` / `'white.white_80'` 을 참조한다. 그러나 ui-token `WHITE` 스케일에는 `100/90/75/50/25/10/5` 만 있고 **70/80 은 없다**(panda semanticTokens 도 동일).
- panda 빌드 CSS 확인: panda 가 토큰을 못 찾아 `color:white.white_70` 을 **literal 로 출력** → 무효 CSS → color 미적용 → 부모 흰색 상속. 즉 원본 의도(흐린 흰색)와 무관하게 실제로는 **흰색**으로 렌더됐다.
- **결정:** 전환 시 현재 동작(흰색)을 재현해 `text-white` 로 둔다. 디자이너 의도가 `white_75`/`white_90` 이었을 가능성은 있으나 추정하지 않는다(§4 원칙). 의도 복원은 디자인 확인 후 별도 작업.

## 3. 변경 이력
- 2026-06-20: 문서 신설. ADR-001~006 기록, dev theme 토큰 감사 결과 정리(typography/screens 오류, brand.DEFAULT 오류, keyframes drift 발견). dev의 pre-compiled 문서가 source-first 구현과 모순되어 제거(ADR-006).
- 2026-06-20 (PR1): auth 슬라이스 전환. ADR-007(슬라이스 컴포넌트는 panda 원본 기준, TextField 추가) + §2.6(white_70/80 원본 버그 → text-white 재현) 기록.
- 2026-06-20 (PR2): GNB 슬라이스 전환(5파일, 순수 스타일·컴포넌트 추가 없음). ADR-008(nested selector → 자식 직접 className/arbitrary variant, 공유 panda 스타일은 cn 으로 공존) 기록.
- 2026-06-20 (PR3a~c): landing 설계 부분 분리 PR. ADR-007 적용으로 Button/AnchorButton(panda cva 1:1)·Skeleton(gray gradient 1:1, animation easing linear 교정) 추가. ADR-009(flicking→embla, Perspective/Fade 를 usePerspectiveTween 으로 재현, dead code AnimalSliderContainer 삭제, 브라우저 검증 필요) 기록.
- 2026-06-21 (PR3d): landing 전 섹션 스타일 사용부 전환(36파일, 9개 .style.ts 인라인화). 병렬 서브에이전트 7개로 전환 후 빌드·grep 검수. ADR-010(.style.ts 정책 §6-1 결론·SplitText 잔존·spacer 제거) 기록. embla 브라우저 검증 완료.
- 2026-06-21 (방침 전환 + PR4): ADR-011(사용부 통합 PR/설계 분리 PR — 통합 브랜치 feat/tailwind-usage-migration). shop 설계분 ui-tailwind Banner/GameCard 추가(panda 1:1, dev % 누락 버그 수정). shop 사용부 전환(21파일, 병렬 에이전트 3개+빌드/grep+브라우저 검수). ADR-012(Dialog 전역 공존, V2 별도 PR) 기록.
- 2026-06-21 (PR6 guild): 설계분 ui-tailwind 컴포넌트 5종 추가 — TextArea/SearchBar(리프) + Tooltip/DropdownMenu/CombineChip(radix compound). ADR-015(compound 는 visible 1:1 + 표준 shadcn 애니메이션 tailwindcss-animate, shadcn 토큰 미도입). guild 사용부 30파일 전환(병렬 에이전트 3개 + Button 스타일 prop→className 교정). Dialog/dialogTitleStyle panda 유지(ADR-012). 슬라이더는 이미 embla. type-check·build 통과, 브라우저 검증.
- 2026-06-21 (PR5 mypage): 설계분 ui-tailwind Checkbox/Label/ScrollArea 추가(ADR-013 — 빌드 CSS 실측값으로 이식, shadow-panda semantic 토큰은 활성 :root 값. checkbox ring #d4d4d8→#a1a1aa 교정). mypage 사용부 20파일 전환(병렬 에이전트 3개 + SelectedPetTable 직접 + 빌드/grep 검수). Dialog/CommonDialog panda 유지(ADR-012). ADR-014(전역 `button{border:transparent}` 함정 → Checkbox/Button/TextField 에 `border-solid` 명시) 기록. **브라우저 시각 검증 완료**(프로덕션 `next start`, 체크박스·버튼 테두리 정상).
