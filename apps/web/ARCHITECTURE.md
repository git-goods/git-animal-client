# apps/web 아키텍처 가이드

## 개요

apps/web은 **FSD-inspired 하이브리드 아키텍처**를 사용합니다.
Next.js App Router의 파일 기반 라우팅 + 코로케이션을 유지하면서, FSD(Feature-Sliced Design)의 레이어 원칙과 의존성 규칙을 적용합니다.

## 디렉토리 구조

```
src/
├── app/                        # 라우팅 + 페이지 조합 (FSD app+pages 역할)
│   ├── [locale]/               # 국제화 라우트
│   │   ├── page.tsx            # widgets/features/entities를 조합하여 페이지 구성
│   │   ├── layout.tsx          # locale shell (providers, i18n)
│   │   ├── mypage/             # 마이페이지 (라우트 그룹, _components 코로케이션)
│   │   ├── shop/               # 상점 (_auction, _background, _petGotcha)
│   │   ├── guild/              # 길드 (@modal 병렬 라우트, (subpage) 그룹)
│   │   ├── game/               # 게임/퀴즈
│   │   ├── laboratory/         # 실험실
│   │   ├── event/              # 이벤트 (halloween, christmas)
│   │   └── landing/            # 랜딩 섹션 컴포넌트 (라우트 아님)
│   │   ├── _components/        # 로케일 셸 (ClientProvider, Monitoring, GlobalOverlay 등)
│   ├── api/                    # Route Handlers (auth, oauth)
│   └── (noLocale)/             # locale 없는 라우트
│
├── widgets/                    # 독립적 대규모 UI 블록
│   └── gnb/                    # GNB (DesktopGNB, MobileGNB, Notification)
│
├── features/                   # 사용자 액션 단위 기능
│   ├── auction/                # 경매 등록 (useRegisterProduct)
│   ├── auth/                   # GitHub OAuth 인증
│   ├── change-persona-visible/ # 펫 표시/숨김 전환
│   ├── feedback/               # GitHub 이슈/피드백 (model/ui, 슬라이스 루트 barrel 없음)
│   ├── guild/                  # 길드 가입 등 액션
│   │   └── actions/            # Server Actions (`'use server'`)
│   └── laboratory-feedback/    # 실험실 피드백 (Supabase 기반)
│
├── entities/                   # 비즈니스 엔티티
│   ├── persona/                # 펫
│   │   ├── ui/                 # AnimalCard, PersonaItem, PersonaListToolbar
│   │   └── model/              # useGetAllPersona, usePersonaListFilter, useGetPersonaDropRate
│   ├── guild/                  # 길드
│   │   └── ui/                 # GuildMemberSlider
│   ├── user/                   # 사용자
│   │   └── model/              # useGetTotalRenderUserCount, useGetTotalIdentityUserCount
│   └── product/                # 상품
│       └── model/              # useGetTotalProductCount
│
├── shared/                     # 범용 기반 코드 (모든 레이어에서 import 가능)
│   ├── api/                    # HTTP client, interceptor, auth(NextAuth), QueryClientProvider
│   ├── config/                 # 상수, 환경변수, 라우트, animalTier
│   ├── hooks/                  # usePagination, useOutsideClick, useDeviceInfo 등
│   ├── i18n/                   # next-intl 설정 (routing, request, useToggleLocale)
│   ├── lib/                    # QueryClient, analytics, Supabase, devtools
│   ├── store/                  # Jotai atoms (snackBar, loading)
│   ├── styles/                 # 스타일 헬퍼
│   ├── ui/                     # Gitanimals 렌더링 컴포넌트
│   ├── utils/                  # 유틸리티 (animals, image, string, number 등)
│   ├── assets/                 # 정적 자산 (Lottie 등)
│   ├── exceptions/             # 에러 타입
│   └── schema/                 # 유효성 검증 스키마
│
└── middleware.ts               # next-intl + next-auth 미들웨어
```

## 의존성 규칙

**핵심 원칙: 상위 레이어는 하위 레이어만 import할 수 있다.**

```
app/ → widgets/ → features/ → entities/ → shared/
```

### 허용되는 import 방향

| From (소스) | To (대상) | 허용 |
|---|---|---|
| `app/` | `widgets/`, `features/`, `entities/`, `shared/` | O |
| `widgets/` | `features/`, `entities/`, `shared/` | O |
| `features/` | `entities/`, `shared/` | O |
| `entities/` | `shared/` | O |
| `shared/` | (없음, 외부 패키지만) | O |

### 금지되는 import

| From (소스) | To (대상) | 금지 이유 |
|---|---|---|
| `shared/` | `entities/`, `features/`, `widgets/` | 하위 → 상위 금지 |
| `entities/` | `features/`, `widgets/` | 하위 → 상위 금지 |
| `features/` | `widgets/` | 하위 → 상위 금지 |
| `entities/A` | `entities/B` | 같은 레이어 슬라이스 간 import 금지 |
| `features/A` | `features/B` | 같은 레이어 슬라이스 간 import 금지 |

### 예외: 모노레포 패키지

`@gitanimals/*` 패키지 (`@gitanimals/api`, `@gitanimals/react-query`, `@gitanimals/ui-tailwind` 등)는 **외부 shared 계층**으로 취급합니다. entities, features에서 직접 import 허용:

```typescript
// entities/persona/model/useGetAllPersona.ts — 허용
import { getAllPersona } from '@gitanimals/api';
```

## 레이어별 상세 가이드

### app/ (라우팅 + 조합)

- Next.js App Router의 `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` 컨벤션을 그대로 사용
- 페이지는 **widgets, features, entities를 조합**하는 역할
- 라우트 전용 UI는 `_components/` 폴더에 코로케이션 (App Router 컨벤션)
- `(route group)`, `@parallel` 라우트 등 Next.js 고급 패턴 활용

```typescript
// app/[locale]/mypage/page.tsx — 조합 역할
import GNB from '@/widgets/gnb/GNB';
import { PersonaList } from './PersonaList';          // 라우트 전용 (코로케이션)
import { MemoizedBannerPersonaItem } from '@/entities/persona';
```

**`_components/` 승격 규칙:** 라우트 전용 `_components/` 내 코드가 2개 이상의 라우트에서 재사용되면, `widgets/` 또는 `entities/*/ui/`로 승격합니다.

### widgets/ (독립 UI 블록)

- 여러 entities/features를 조합한 **독립적 대규모 UI 블록**
- 자체적인 비즈니스 로직을 포함할 수 있음
- 각 widget은 barrel `index.ts`를 통해 public API 노출

```
widgets/
└── gnb/
    ├── GNB.tsx            # 진입점 (Desktop/Mobile 분기)
    ├── DesktopGNB.tsx
    ├── MobileGNB.tsx
    ├── LanguageSelector.tsx
    ├── Notification/
    └── index.ts           # export { default as GNB } from './GNB';
```

### features/ (사용자 액션)

- **사용자에게 비즈니스 가치를 제공하는 기능 단위**
- 각 feature는 `api/`, `model/`, `ui/` 세그먼트로 구성
- barrel `index.ts`를 통해 public API만 노출

```
features/
└── auction/
    ├── model/
    │   └── useRegisterProduct.ts   # useMutation hook
    └── index.ts                    # public API
```

**새 feature 생성 시:**
```bash
mkdir -p src/features/{name}/{api,model,ui}
touch src/features/{name}/index.ts
```

### entities/ (비즈니스 엔티티)

- 프로젝트가 다루는 **비즈니스 도메인 엔티티**
- `ui/`: 엔티티 관련 UI 컴포넌트 (AnimalCard, PersonaItem 등)
- `model/`: 엔티티 관련 hooks, types, 비즈니스 로직
- barrel `index.ts`를 통해 public API 노출

```
entities/
└── persona/
    ├── ui/
    │   ├── AnimalCard.tsx
    │   ├── PersonaItem.tsx
    │   ├── PersonaListToolbar.tsx
    │   └── index.ts
    ├── model/
    │   ├── useGetAllPersona.ts
    │   ├── usePersonaListFilter.ts
    │   ├── useGetPersonaDropRate.ts
    │   └── index.ts
    └── index.ts                    # re-export ui + model
```

**entities 간 import 금지:** `entities/persona/`에서 `entities/guild/`를 import할 수 없습니다. 두 엔티티를 조합해야 하면 상위 레이어(features 또는 widgets)에서 수행합니다.

### shared/ (범용 기반)

- **모든 레이어에서 재사용**되는 코드
- 비즈니스 로직을 포함하지 않는 순수 유틸리티/인프라

| 세그먼트 | 역할 | 예시 |
|---|---|---|
| `api/` | HTTP 클라이언트, 인터셉터, 인증 | auth.ts, interceptor.ts, QueryClientProvider |
| `config/` | 상수, 환경변수, 설정 | env.ts, route.ts, animalTier.ts |
| `hooks/` | 범용 React hooks | usePagination, useOutsideClick |
| `i18n/` | 국제화 설정 | routing.ts, request.ts |
| `lib/` | 외부 라이브러리 설정 | queryClient.ts, analytics.ts, supabase/ |
| `store/` | 전역 클라이언트 상태 | snackBar.ts (Jotai), loading.ts |
| `styles/` | 스타일 헬퍼/토큰 | scrollStyle.ts |
| `ui/` | 범용 UI 컴포넌트 | Gitanimals.tsx |
| `utils/` | 유틸리티 함수 | animals.ts, image.ts, string.ts |

## import 규칙

### 경로 alias

```json
// tsconfig.json
{ "paths": { "@/*": ["./src/*"] } }
```

### import 스타일

```typescript
// 1. 외부 패키지
import { useQuery } from '@tanstack/react-query';
import { getAllPersona } from '@gitanimals/api';

// 2. FSD 레이어 (절대경로 @/ 사용)
import GNB from '@/widgets/gnb/GNB';
import { useRegisterProduct } from '@/features/auction/model/useRegisterProduct';
import { AnimalCard } from '@/entities/persona';
import { getPersonaImage } from '@/shared/utils/image';

// 3. 같은 슬라이스 내부 (상대경로 허용)
import { useGetAllPersona } from './useGetAllPersona';  // 같은 model/ 내
```

### barrel export (index.ts)

각 슬라이스는 `index.ts`를 통해 public API를 노출합니다:

```typescript
// entities/persona/index.ts
export * from './ui';
export * from './model';
```

**외부에서는 barrel을 통해 import하는 것을 권장합니다:**

```typescript
// 권장: barrel import
import { AnimalCard, usePersonaListFilter } from '@/entities/persona';

// 허용: 직접 import (barrel이 너무 많은 것을 노출할 때)
import { usePersonaListFilter } from '@/entities/persona/model/usePersonaListFilter';
```

**public API(barrel) 원칙:** `index.ts`에는 **슬라이스 밖에서 실제로 쓰는 심볼만**보냅니다. 슬라이스 내부 전용 훅·헬퍼·서버 액션은 상대 경로 또는 세그먼트 경로로 직접 import합니다. Server Action은 `features/{slice}/actions/*.ts`에 두고, 루트 barrel에 올리지 않아도 됩니다.

## 새 코드 작성 가이드

### 새 페이지 추가

1. `app/[locale]/{route}/page.tsx` 생성
2. 페이지 전용 UI는 `_components/`에 코로케이션
3. 재사용 가능한 로직은 적절한 레이어로 분리

### 새 feature 추가

1. `features/{name}/` 디렉토리 생성
2. 필요한 세그먼트만 배치: `api/`, `actions/` (Server Actions, `'use server'`), `model/`, `ui/` 등
3. 외부에 노출할 심볼이 있을 때만 `index.ts` barrel 작성 (내부 전용만이면 생략 가능)
4. 의존성 규칙 확인: entities와 shared만 import

### 새 entity 추가

1. `entities/{name}/` 디렉토리 생성
2. `ui/` (표현 컴포넌트), `model/` (hooks, types) 세그먼트 배치
3. `index.ts` barrel export 작성
4. 의존성 규칙 확인: shared만 import, 다른 entity import 금지

## Tanstack Query 패턴

### entities 내 쿼리 정의

```typescript
// entities/persona/model/useGetAllPersona.ts
import { getAllPersona } from '@gitanimals/api';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetAllPersona = () =>
  useSuspenseQuery({
    queryKey: ['persona', 'info', 'all'],
    queryFn: () => getAllPersona(),
  });
```

### features 내 mutation 정의

```typescript
// features/auction/model/useRegisterProduct.ts
import { useMutation } from '@tanstack/react-query';

export const useRegisterProduct = (options?) =>
  useMutation({
    mutationFn: registerProduct,
    ...options,
  });
```

## 점진적 마이그레이션 전략

이 아키텍처는 한 번에 완성할 필요 없이, **점진적으로 개선**합니다:

1. **새 코드**는 반드시 FSD 레이어 구조를 따릅니다
2. **기존 코드 수정 시** 해당 코드를 적절한 레이어로 이전합니다
3. Server Action은 `features/{slice}/actions/`에 두고 `'use server'`를 명시합니다
