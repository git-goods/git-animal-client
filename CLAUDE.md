# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitAnimals is a monorepo that allows users to raise virtual pets through GitHub activity. Built with Turborepo, pnpm workspace, and features multiple client applications.

## Architecture

**Monorepo Structure:**
- `apps/web` - Next.js 14 web application (main frontend)  
- `apps/admin-main` - Vite + React Router admin dashboard (Tailwind v4)
- `packages/ui/tailwind` - Tailwind preset + UI components (`@gitanimals/ui-tailwind`)
- `packages/ui/icon` - Icon components  
- `packages/ui/token` - Design tokens
- `packages/api` - Shared API client with interceptors
- `packages/lib/*` - Shared libraries (react, react-query, dayjs)
- `packages/util/*` - Utility packages (common, typescript)

**Key Technologies:**
- **Styling:** Tailwind CSS with `@gitanimals/ui-tailwind` preset (tokens from `packages/ui/token`)
- **State Management:** Tanstack Query v5 (server state), Jotai & Zustand (client state)  
- **Authentication:** NextAuth.js (web)
- **UI Components:** Radix UI primitives + components in `@gitanimals/ui-tailwind`
- **Package Manager:** pnpm v9.0+ with workspace configuration
- **Build System:** Turborepo for orchestration

## Development Commands

**Root-level commands (run from project root):**
```bash
# Development servers
pnpm dev:web          # Start web app dev server (Next.js)
pnpm dev:admin        # Start admin app dev server (Vite)

# Build commands
pnpm build:web        # Build web application
pnpm build:admin      # Build admin application  

# Analysis & Quality
pnpm analyze:web      # Bundle analyzer for web app
pnpm lint             # Lint all workspaces
pnpm format           # Format code with Prettier

# UI Development
pnpm sb:tailwind      # Start Storybook for UI components
```

**Workspace-specific commands:**
```bash
# Web app (apps/web)
pnpm --filter @gitanimals/web type-check   # TypeScript validation
pnpm --filter @gitanimals/web lint:fix     # Fix ESLint issues
```

## Code Patterns & Conventions

**Component Architecture:**
- UI components in `packages/ui/tailwind/src/components/`
- Each component has: `Component.tsx`, `Component.stories.tsx`, `index.ts`
- Tailwind classes with design tokens from `packages/ui/token`

**Import Patterns:**
- Workspace dependencies use `workspace:*` protocol
- UI components imported from `@gitanimals/ui-tailwind`
- Shared utilities from `@gitanimals/util-common`

**State Management:**
- Server state: Tanstack Query v5 with `queryOptions` pattern in `src/apis/`
- Client state: Jotai for atomic state, Zustand for stores
- Auth state managed through NextAuth.js

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
  import { userQueryOptions } from '@/apis/user/queries';

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
- Tailwind CSS via `createGitAnimalsConfig` in `packages/ui/tailwind`
- Design tokens centralized in `packages/ui/token`

## Testing & Quality

- **Web app:** Next.js built-in testing, Storybook for components
- **Mobile app:** Jest with jest-expo preset
- **Linting:** ESLint with custom configs per workspace
- **Type checking:** TypeScript with shared configs in `packages/typescript-config`

## Key Files to Understand

- `turbo.json` - Build pipeline configuration
- `pnpm-workspace.yaml` - Workspace definition
- `packages/ui/tailwind/src/theme/` - Tailwind theme built from tokens

## Build Pipeline Dependencies

The build system has specific dependency chains:
- Most builds depend on `^build`
- Admin uses different output patterns (dist/**) vs others (.next/**)

## Notes for Development

- UI component changes require Storybook restart
- Mobile app uses Expo SDK ~53.0.17 with React Native 0.79.5
- Web app uses Next.js App Router with internationalization (next-intl)