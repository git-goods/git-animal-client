# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitAnimals is a monorepo that allows users to raise virtual pets through GitHub activity. Built with Turborepo, pnpm workspace, and features multiple client applications.

## Architecture

**Monorepo Structure:**
- `apps/web` - Next.js 14 web application (main frontend)  
- `apps/admin` - Remix admin dashboard
- `apps/webview` - Vite + React Router webview for mobile integration
- `apps/webview-history` - Legacy Next.js webview (being migrated)
- `packages/ui/panda` - Component library using PandaCSS
- `packages/ui/icon` - Icon components  
- `packages/ui/token` - Design tokens
- `packages/api` - Shared API client with interceptors
- `packages/lib/*` - Shared libraries (react, react-query, dayjs)
- `packages/util/*` - Utility packages (common, typescript)

**Key Technologies:**
- **Styling:** Tailwind CSS (migrating from PandaCSS)
- **State Management:** Tanstack Query v5 (server state), Jotai (client state)
- **Authentication:** NextAuth.js (web), token-based auth (webview)
- **UI Components:** Radix UI primitives + `@gitanimals/ui-tailwind`
- **Package Manager:** pnpm v9.0+ with workspace configuration
- **Build System:** Turborepo for orchestration

**Web App Architecture (FSD-inspired Hybrid):**

apps/web은 FSD(Feature-Sliced Design) 기반 하이브리드 아키텍처를 사용합니다.
상세 가이드: [`apps/web/ARCHITECTURE.md`](apps/web/ARCHITECTURE.md)

```
src/
├── app/          # Next.js App Router (라우팅 + 조합; [locale]/_components 로케일 셸)
├── widgets/      # 독립적 대규모 UI 블록 (GNB 등)
├── features/     # 사용자 액션 (auth, feedback, guild/actions 등)
├── entities/     # 비즈니스 엔티티 (persona, guild, user, product)
├── shared/       # 범용 기반 코드 (api, config, hooks, i18n, lib, store, ui, utils)
└── middleware.ts
```

의존성 규칙: `app/ → widgets/ → features/ → entities/ → shared/`
상위 레이어는 하위 레이어만 import 가능. 같은 레이어 슬라이스 간 import 금지.

## Development Commands

**Root-level commands (run from project root):**
```bash
# Development servers
pnpm dev:web          # Start web app dev server (Next.js)
pnpm dev:admin        # Start admin app dev server (Remix)
pnpm dev:webview      # Start webview dev server (Vite)

# Build commands
pnpm build:web        # Build web application
pnpm build:admin      # Build admin application  
pnpm build:webview    # Build webview application

# Analysis & Quality
pnpm analyze:web      # Bundle analyzer for web app
pnpm lint             # Lint all workspaces
pnpm format           # Format code with Prettier

# UI Development
pnpm sb:panda         # Start Storybook for UI components
```

**Workspace-specific commands:**
```bash
# Web app (apps/web)
pnpm --filter @gitanimals/web prepare      # PandaCSS codegen
pnpm --filter @gitanimals/web type-check   # TypeScript validation
pnpm --filter @gitanimals/web lint:fix     # Fix ESLint issues

# Webview app (apps/webview) 
pnpm --filter @gitanimals/webview dev       # Vite dev server on port 3000
pnpm --filter @gitanimals/webview type-check # TypeScript validation

# UI components (packages/ui/panda)
pnpm --filter @gitanimals/ui-panda storybook # Start Storybook
```

## Code Patterns & Conventions

**Component Architecture (apps/web):**
- FSD 레이어 구조: `shared/ → entities/ → features/ → widgets/ → app/`
- 각 슬라이스는 `ui/`, `model/`, `api/` 세그먼트와 barrel `index.ts`로 구성
- 라우트 전용 UI는 `app/[locale]/*/_components/`에 코로케이션
- 도메인 무관 공유 UI는 `shared/ui/`
- 슬라이스 `index.ts`에는 외부에서 실제로 쓰는 public API만 export

**Import Patterns:**
- Workspace dependencies use `workspace:*` protocol
- UI components imported from `@gitanimals/ui-tailwind`
- Shared utilities from `@gitanimals/util-common`
- Web app 내부는 `@/` alias 사용 (→ `src/`)
- FSD 의존성 규칙 준수: `@/shared/`, `@/entities/`, `@/features/`, `@/widgets/`

**State Management:**
- Server state: Tanstack Query v5 in `entities/*/model/` 및 `features/*/model/`
- Client state: Jotai atoms in `shared/store/`
- Auth state managed through NextAuth.js (`shared/api/auth.ts`)

**Tanstack Query v5 Best Practices:**
- Always use `queryOptions` factory pattern for reusable query definitions
- Group related queryOptions into a single exported object
- Use `useQuery` directly with queryOptions in components (no custom hooks needed)
- Example pattern:
  ```typescript
  // src/apis/user/queries.ts
  import { queryOptions } from '@tanstack/react-query';

  export const USER_QUERY_KEYS = {
    all: ['user'] as const,
    detail: (userId: string) => ['user', userId] as const,
    list: () => ['user', 'list'] as const,
  };

  // Define queryOptions factories
  const getUserOptions = (userId: string) =>
    queryOptions({
      queryKey: USER_QUERY_KEYS.detail(userId),
      queryFn: () => fetchUser(userId),
      enabled: !!userId,
    });

  const getUserListOptions = () =>
    queryOptions({
      queryKey: USER_QUERY_KEYS.list(),
      queryFn: fetchUserList,
    });

  // Export grouped queryOptions
  export const userQueryOptions = {
    getUser: getUserOptions,
    getUserList: getUserListOptions,
  };

  // Usage in component
  import { useQuery } from '@tanstack/react-query';
  import { userQueryOptions } from '@/entities/user/model/queries';

  function UserProfile({ userId }: { userId: string }) {
    const { data: user } = useQuery(userQueryOptions.getUser(userId));
    const { data: users } = useQuery(userQueryOptions.getUserList());
    // ...
  }

  // Usage in Server Components (prefetching)
  await queryClient.prefetchQuery(userQueryOptions.getUser('123'));
  ```
- Benefits:
  - Type safety with auto-completion
  - Reusability in components, prefetching, SSR
  - Easier testing and mocking
  - Centralized query key management
  - No need for custom hooks unless adding extra logic

**Styling Approach:**
- Tailwind CSS (migrating from PandaCSS)
- `@gitanimals/ui-tailwind` 디자인 시스템 컴포넌트
- Responsive design using Tailwind breakpoints
- `cn()` utility for conditional class merging

## Testing & Quality

- **Web app:** Next.js built-in testing, Storybook for components
- **Mobile app:** Jest with jest-expo preset
- **Linting:** ESLint with custom configs per workspace
- **Type checking:** TypeScript with shared configs in `packages/typescript-config`

## Key Files to Understand

- `turbo.json` - Build pipeline configuration
- `pnpm-workspace.yaml` - Workspace definition
- `apps/web/ARCHITECTURE.md` - **FSD 아키텍처 상세 가이드 (필독)**
- `packages/ui/panda/src/theme/` - Design system tokens and styles

## Build Pipeline Dependencies

The build system has specific dependency chains:
- Most builds depend on `^build` and `^prepare` 
- `prepare` tasks generate PandaCSS styled-system
- Admin uses different output patterns (dist/**) vs others (.next/**)

## Notes for Development

- UI component changes require Storybook restart
- Mobile app uses Expo SDK ~53.0.17 with React Native 0.79.5
- Web app uses Next.js App Router with internationalization (next-intl)
- **apps/web 작업 시 반드시 FSD 의존성 규칙을 따를 것** (상세: `apps/web/ARCHITECTURE.md`)
- 새 코드는 반드시 `shared/`, `entities/`, `features/`, `widgets/` 중 적절한 레이어에 배치
- 레거시 `src/components/`는 제거됨 — 새 코드는 `shared/ui/`, `features/*/`, `app/.../_components/` 등에 배치