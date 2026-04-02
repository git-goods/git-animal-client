# 모노레포에서 패키지 참조 방식: Compiled Packages vs Internal Packages

## 배경

모노레포에서 공유 UI 패키지를 만들 때, 앱(컨슈머)이 이 패키지를 어떻게 참조할지 결정해야 한다. 크게 두 가지 패턴이 있다.

- **Compiled Packages**: 패키지를 빌드한 결과물(`dist/`)을 참조
- **Internal Packages**: 패키지의 소스(`.ts`, `.tsx`)를 직접 참조하고, 컨슈머의 번들러가 트랜스파일

Turborepo 공식 문서에서도 이 두 패턴을 구분하여 소개하고 있다.

---

## 실제 사례: `@gitanimals/ui-tailwind`

GitAnimals 프로젝트의 `ui-tailwind` 패키지를 예시로 두 방식을 비교한다.

### 프로젝트 구조

```
packages/ui/tailwind/
├── src/
│   ├── components/
│   │   ├── ui/          # Button, Dialog 등 기본 UI 컴포넌트
│   │   ├── animation/   # SplitText 등 애니메이션
│   │   ├── card/        # GameCard, CardBack
│   │   ├── banner/      # Banner, LevelBanner
│   │   ├── common-dialog/
│   │   ├── search-bar/
│   │   └── index.ts
│   ├── theme/           # 디자인 토큰
│   ├── preset.ts        # Tailwind CSS 프리셋
│   ├── config.ts        # Tailwind 설정
│   ├── utils/           # cn() 등 유틸리티
│   └── index.ts
├── dist/                # tsup 빌드 결과물
├── tsup.config.ts
└── package.json
```

### 컨슈머

- `apps/web` — Next.js 14 (유일한 컨슈머)

---

## 1. Compiled Packages (변경 전)

### 개념

패키지 내부에서 `tsup`, `rollup`, `tsc` 등의 빌드 도구로 소스를 컴파일하고, 빌드 결과물(`dist/`)을 `package.json`의 `exports`로 내보낸다. 컨슈머는 이미 컴파일된 JavaScript를 가져다 쓴다.

### 구현

**tsup.config.ts** — 빌드 설정

```ts
import { defineConfig } from 'tsup';

export default defineConfig([
  // 컴포넌트: 'use client' 배너 포함
  {
    entry: {
      index: 'src/index.ts',
      'components/index': 'src/components/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    external: ['react', 'react-dom', 'tailwindcss'],
    sourcemap: true,
    banner: {
      js: '"use client";',
    },
  },
  // 서버 안전 모듈: 'use client' 없음
  {
    entry: {
      preset: 'src/preset.ts',
      config: 'src/config.ts',
      'theme/index': 'src/theme/index.ts',
      'utils/index': 'src/utils/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    clean: false,
    external: ['react', 'react-dom', 'tailwindcss'],
    sourcemap: true,
  },
]);
```

**package.json** — `dist/`를 가리키는 exports

```json
{
  "name": "@gitanimals/ui-tailwind",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./preset": {
      "types": "./dist/preset.d.ts",
      "import": "./dist/preset.mjs",
      "require": "./dist/preset.js"
    },
    "./config": {
      "types": "./dist/config.d.ts",
      "import": "./dist/config.mjs",
      "require": "./dist/config.js"
    },
    "./theme": {
      "types": "./dist/theme/index.d.ts",
      "import": "./dist/theme/index.mjs",
      "require": "./dist/theme/index.js"
    },
    "./components": {
      "types": "./dist/components/index.d.ts",
      "import": "./dist/components/index.mjs",
      "require": "./dist/components/index.js"
    },
    "./utils": {
      "types": "./dist/utils/index.d.ts",
      "import": "./dist/utils/index.mjs",
      "require": "./dist/utils/index.js"
    }
  }
}
```

### 장점

| 장점 | 설명 |
|------|------|
| **컨슈머 독립성** | 어떤 번들러/프레임워크든 `dist/`의 JS를 그대로 import하면 된다. Next.js, Remix, Vite, Storybook 등 별도 설정 불필요 |
| **빌드 속도** | 컨슈머 측에서 이미 컴파일된 JS를 가져오므로 트랜스파일 비용이 없다 |
| **명확한 API 경계** | `dist/`로 나오는 결과물이 곧 패키지의 공개 API. 의도치 않은 내부 모듈 참조를 방지 |
| **빌드 타임 처리 중앙화** | `"use client"` 배너처럼 빌드 시점에 필요한 처리를 패키지 빌드 설정 한 곳에서 관리 가능 |
| **npm 배포 가능** | 빌드 결과물이 있으므로 필요시 외부 배포도 바로 가능 |

### 단점

| 단점 | 설명 |
|------|------|
| **DX 불편** | 패키지 수정 후 반드시 빌드(또는 `--watch`)를 돌려야 변경이 반영됨 |
| **빌드 누락 실수** | 빌드를 잊으면 이전 버전의 `dist/`가 참조되어 디버깅이 어려움 |
| **추가 빌드 도구 필요** | tsup 설정과 관리가 필요 |

---

## 2. Internal Packages (변경 후)

### 개념

패키지의 `exports`가 소스 파일(`.ts`, `.tsx`)을 직접 가리키고, 컨슈머(Next.js 등)의 번들러가 트랜스파일을 담당한다. 패키지 자체 빌드 단계가 없다.

### 구현

**package.json** — 소스를 직접 가리키는 exports

```json
{
  "name": "@gitanimals/ui-tailwind",
  "exports": {
    ".": "./src/index.ts",
    "./preset": "./src/preset.ts",
    "./config": "./src/config.ts",
    "./theme": "./src/theme/index.ts",
    "./components": "./src/components/index.ts",
    "./utils": "./src/utils/index.ts"
  }
}
```

> `main`, `module`, `types` 필드가 불필요해진다.

**next.config.mjs** — 컨슈머 측에 `transpilePackages` 추가

```js
const nextConfig = withNextIntl({
  reactStrictMode: true,
  transpilePackages: ['@gitanimals/ui-tailwind'],
  // ...
});
```

### 장점

| 장점 | 설명 |
|------|------|
| **즉시 반영** | 소스 수정 즉시 컨슈머에 반영. 빌드/watch 불필요 |
| **설정 단순화** | tsup, rollup 등 빌드 도구 설정 제거 가능 |
| **디버깅 용이** | 소스맵 없이도 원본 소스를 직접 참조하므로 디버깅이 편함 |

### 단점

| 단점 | 설명 |
|------|------|
| **컨슈머별 설정 필요** | Next.js는 `transpilePackages`, Vite는 별도 설정 등 각 컨슈머마다 대응 필요 |
| **컨슈머 빌드 속도 저하** | 매번 소스를 트랜스파일하므로 dev/build 모두 약간 느려질 수 있음 |
| **`"use client"` 분산 관리** | 빌드 설정에서 일괄 제어하던 것을 각 파일에서 개별 관리해야 함 |
| **외부 배포 불가** | 소스만 있으므로 npm에 배포하려면 별도 빌드 파이프라인 추가 필요 |

---

## 비교 요약

| | Compiled Packages | Internal Packages |
|---|---|---|
| exports 대상 | `dist/` (빌드 결과물) | `src/` (소스 파일) |
| 빌드 도구 | tsup 등 필요 | 불필요 |
| 컨슈머 설정 | 없음 | `transpilePackages` 등 필요 |
| 다양한 컨슈머 지원 | 쉬움 (JS만 import) | 컨슈머마다 개별 설정 |
| dev 시 변경 반영 | 빌드/watch 필요 | 즉시 반영 |
| 컨슈머 빌드 속도 | 빠름 (이미 컴파일됨) | 상대적으로 느림 |
| `"use client"` 관리 | 빌드 설정에서 일괄 | 각 소스 파일에 직접 |
| 외부 배포 | 바로 가능 | 별도 빌드 필요 |
| 디버깅 | 소스맵 필요 | 소스 직접 참조 |

---

## 어떤 상황에서 어떤 패턴을 선택할까

### Compiled Packages가 적합한 경우

- 컨슈머가 다양할 때 (Next.js + Remix + Vite + Storybook 등)
- 패키지를 외부(npm)에 배포할 가능성이 있을 때
- 빌드 타임에 특수 처리(`"use client"` 배너 등)가 필요할 때
- 패키지 변경 빈도가 낮을 때

### Internal Packages가 적합한 경우

- 컨슈머가 단일하거나 동일 번들러를 사용할 때
- 패키지를 활발히 개발 중이라 변경이 잦을 때
- DX(개발 경험)를 최우선으로 할 때
- 외부 배포 계획이 없을 때

---

## 실제 전환 과정 기록

### 전환 동기

`@gitanimals/ui-tailwind` 패키지를 수정할 때마다 `tsup` 빌드(또는 `--watch`)를 실행해야 `apps/web`에서 변경이 반영되었다. 빌드를 잊으면 이전 `dist/`가 참조되어 "수정했는데 왜 안 바뀌지?"라는 상황이 반복됐다. 컨슈머가 `apps/web` 하나뿐이라 Internal Packages 전환의 단점이 크지 않았다.

### Step 1: 현황 조사

#### 컨슈머 파악

```bash
grep -r "ui-tailwind" **/package.json
```

결과: `apps/web`만 `@gitanimals/ui-tailwind`을 의존성으로 사용 중.

| 패키지 | 의존 여부 |
|--------|----------|
| apps/web | O (`workspace:*`) |
| apps/admin | X |
| apps/webview | X |

컨슈머가 1개(`apps/web`, Next.js 14)뿐이므로 `transpilePackages` 설정 하나로 충분하다고 판단.

#### Import 패턴 분석

web 앱에서 사용 중인 import 경로를 조사했다:

```
@gitanimals/ui-tailwind          → 메인 (컴포넌트, cn, theme 등)
@gitanimals/ui-tailwind/utils    → cn() 유틸리티
@gitanimals/ui-tailwind/config   → Tailwind 설정
```

이 3개 경로가 `package.json`의 `exports`에 정의되어 있으므로, exports만 소스로 변경하면 기존 import 문을 수정할 필요 없음.

#### `'use client'` 현황 분석

기존에는 tsup이 컴포넌트 빌드 시 파일 상단에 `"use client"` 배너를 자동 주입했다:

```ts
// tsup.config.ts
banner: {
  js: '"use client";',
},
```

Internal Packages로 전환하면 이 배너가 더 이상 동작하지 않으므로, **각 소스 파일에 직접 `'use client'`를 선언해야 한다.**

전체 컴포넌트 소스 파일의 `'use client'` 유무를 조사했다:

**이미 있는 파일 (13개):**
- `ui/accordion.tsx`, `ui/alert-dialog.tsx`, `ui/alert-dialog-v2.tsx`
- `ui/checkbox.tsx`, `ui/confirm-dialog.tsx`, `ui/confirm-dialog-v2.tsx`
- `ui/dialog.tsx`, `ui/dialog-v2.tsx`, `ui/dropdown-menu.tsx`
- `ui/flat-dialog.tsx`, `ui/scroll-area.tsx`, `ui/select.tsx`, `ui/tooltip.tsx`
- `animation/SplitText.tsx`, `card/GameCard.tsx`
- `banner/Banner.tsx`, `banner/BannerPetSelect.tsx`, `banner/LevelBanner.tsx`
- `common-dialog/CommonDialog.tsx`, `search-bar/SearchBar.tsx`

**누락된 파일 (6개):**
- `ui/button.tsx`, `ui/label.tsx`, `ui/skeleton.tsx`
- `ui/textarea.tsx`, `ui/textfield.tsx`
- `card/CardBack.tsx`

#### 고민: 누락 파일에 정말 `'use client'`가 필요한가?

이 6개 파일은 `useState`, `useEffect` 같은 React 훅을 사용하지 않는다. 순수하게 `React.forwardRef`로 HTML 요소를 래핑하는 컴포넌트들이다.

기술적으로는 `'use client'` 없이도 서버 컴포넌트에서 import 가능하다. 하지만:

1. **기존 동작 유지**: tsup 배너가 모든 컴포넌트에 `"use client"`를 붙이고 있었으므로, 전환 후에도 동일하게 동작해야 한다
2. **안전성**: `forwardRef` 컴포넌트는 대부분 클라이언트에서 사용되며, 나중에 `onClick` 등이 추가될 가능성이 높다
3. **일관성**: 일부 컴포넌트만 서버 컴포넌트로 두면 혼란스럽다

결론: **6개 파일 모두 `'use client'` 추가.**

### Step 2: 구현

#### 2-1. `'use client'` 추가 (6개 파일)

```diff
+ 'use client';
+
  import * as React from 'react';
  // ...
```

대상 파일:
- `packages/ui/tailwind/src/components/ui/button.tsx`
- `packages/ui/tailwind/src/components/ui/label.tsx`
- `packages/ui/tailwind/src/components/ui/skeleton.tsx`
- `packages/ui/tailwind/src/components/ui/textarea.tsx`
- `packages/ui/tailwind/src/components/ui/textfield.tsx`
- `packages/ui/tailwind/src/components/card/CardBack.tsx`

#### 2-2. `package.json` exports 변경

**Before:**
```json
{
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./preset": { ... },
    "./config": { ... },
    "./theme": { ... },
    "./components": { ... },
    "./utils": { ... }
  }
}
```

**After:**
```json
{
  "exports": {
    ".": "./src/index.ts",
    "./preset": "./src/preset.ts",
    "./config": "./src/config.ts",
    "./theme": "./src/theme/index.ts",
    "./components": "./src/components/index.ts",
    "./utils": "./src/utils/index.ts"
  }
}
```

변경 포인트:
- `main`, `module`, `types` 필드 제거
- 각 export의 conditional exports (`types`/`import`/`require`) → 단일 소스 경로로 단순화

#### 고민: `build` 스크립트는 제거할까?

tsup 빌드 스크립트와 설정 파일(`tsup.config.ts`)을 그대로 남겨두기로 결정했다. 이유:

1. **Storybook**: `packages/ui/tailwind`에 Storybook이 설정되어 있는데, Storybook은 자체 번들러(Vite)를 사용하므로 `transpilePackages`의 영향을 받지 않는다. Storybook이 빌드 결과물을 참조할 가능성이 있다.
2. **점진적 전환**: 문제가 생기면 `main`/`module`/`types`를 복원하고 `dist/`를 참조하도록 빠르게 롤백 가능
3. **향후 npm 배포**: 패키지를 외부에 배포할 일이 생기면 빌드 인프라가 필요

#### 2-3. `next.config.mjs`에 `transpilePackages` 추가

```diff
  const nextConfig = withNextIntl({
    reactStrictMode: true,
+   transpilePackages: ['@gitanimals/ui-tailwind'],
    compiler: {
      styledComponents: true,
    },
```

`transpilePackages`는 Next.js 13.1+에서 도입된 설정으로, 지정된 패키지의 소스를 Next.js 번들러(SWC)가 직접 트랜스파일한다. 이전의 `next-transpile-modules` 외부 패키지를 대체하는 공식 기능.

### Step 3: 검증

#### 빌드 테스트

ui-tailwind를 **빌드하지 않은 상태에서** web 앱 빌드를 실행했다:

```bash
pnpm --filter @gitanimals/web build
```

결과:
- **컴파일 단계**: 성공. 모든 `@gitanimals/ui-tailwind` import가 소스 파일에서 정상 resolve됨
- **ESLint 검사**: ui-tailwind 관련 에러 없음
- **`_document` 에러**: 발생했으나 이건 기존부터 있던 Next.js App Router 관련 이슈로, 우리 변경과 무관

#### 타입 체크

```bash
pnpm --filter @gitanimals/web type-check
```

결과: 통과 (exit code 0). TypeScript가 소스 `.ts` 파일에서 직접 타입 정보를 읽어오므로 `.d.ts` 파일 생성이 불필요해졌다.

### 변경 파일 요약

| 파일 | 변경 내용 |
|------|----------|
| `packages/ui/tailwind/package.json` | `main`/`module`/`types` 제거, exports를 소스 경로로 변경 |
| `apps/web/next.config.mjs` | `transpilePackages` 추가 |
| `packages/ui/tailwind/src/components/ui/button.tsx` | `'use client'` 추가 |
| `packages/ui/tailwind/src/components/ui/label.tsx` | `'use client'` 추가 |
| `packages/ui/tailwind/src/components/ui/skeleton.tsx` | `'use client'` 추가 |
| `packages/ui/tailwind/src/components/ui/textarea.tsx` | `'use client'` 추가 |
| `packages/ui/tailwind/src/components/ui/textfield.tsx` | `'use client'` 추가 |
| `packages/ui/tailwind/src/components/card/CardBack.tsx` | `'use client'` 추가 |

---

## 참고

- [Turborepo - Internal Packages](https://turbo.build/repo/docs/core-concepts/internal-packages)
- [Next.js - transpilePackages](https://nextjs.org/docs/app/api-reference/config/next-config-js/transpilePackages)
