# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **User Dashboard** admin panel application built with React, Vite, and TypeScript. It was originally generated from a Figma design (https://www.figma.com/design/WKoig9rtmv5UpkF1CZuE34/User-Dashboard) and serves as an admin interface for managing users and points.

The application features a Korean-language UI (한국어) for managing users, viewing dashboards, and handling points/rewards systems.

## Development Commands

### Package Management

- This project uses **pnpm** as the package manager (evidenced by `pnpm-lock.yaml`)
- Install dependencies: `pnpm install`

### Development

- Start development server: `pnpm dev`
  - Runs on http://localhost:3000 (configured in vite.config.ts)
  - Auto-opens browser on start

- Build for production: `pnpm build`
  - Output directory: `build/` (not the default `dist/`)
  - Target: `esnext`

### Code Quality

- Lint code: `pnpm lint`
- Auto-fix lint issues: `pnpm lint:fix`
- Format code: `pnpm format`
- Check formatting: `pnpm format:check`
- Type check: `pnpm type-check`

## Architecture & Project Structure

### Build System

- **Vite 6.3.5** with React SWC plugin for fast development and builds
- **Tailwind CSS v4** (using CSS layer architecture with custom properties)
- Custom path alias: `@/` maps to `./src/`

### API & Authentication System

**HTTP Client:**

- Uses **ky** (modern fetch wrapper) instead of axios
- Instance configured with base URL: `https://api.gitanimals.org`
- Timeout: 15 seconds
- Located in `src/lib/api/instance.ts`

**Interceptors:**

- Request interceptor: Adds `Authorization: Bearer {token}` header automatically
- Response interceptor: Handles 401 (logout) and 403 (forbidden) errors
- Set up via `setAllInterceptors()` after successful login

**Authentication Flow:**

1. User clicks "GitHub로 계속하기" on login page
2. Redirects to GitHub OAuth endpoint based on environment:
   - Production: `/logins/oauth/github/by-redirect-when-success/WEB_VIEW`
   - Development: `/logins/oauth/github/by-redirect-when-success/LOCAL`
3. GitHub redirects back with `?jwt=Bearer {token}` query parameter
4. App extracts token, saves to localStorage, sets up interceptors
5. Navigates to dashboard

**Token Management:**

- Stored in localStorage with key: `gitanimals_admin_token`
- Utilities in `src/lib/auth/index.ts`:
  - `getToken()` - Retrieve stored token
  - `setToken(token)` - Save token
  - `removeToken()` - Clear token (logout)
  - `isAuthenticated()` - Check if user is logged in

**Protected Routes:**

- App checks authentication status on mount
- Unauthenticated users see LoginPage
- Authenticated users see Dashboard with Sidebar

### Component Architecture

The application follows a **single-page application (SPA)** pattern with client-side routing using **React Router v7**:

```
App.tsx (router configuration)
├── BrowserRouter
│   ├── /login → LoginPage (public route)
│   └── ProtectedLayout (auth-protected routes)
│       ├── Sidebar (navigation with NavLink)
│       └── Outlet (page content)
│           ├── /dashboard → DashboardPage
│           ├── /points → PointsPage
│           ├── /users → ComingSoonPage
│           ├── /analytics → ComingSoonPage
│           ├── /reports → ComingSoonPage
│           └── /settings → ComingSoonPage
```

**Key architectural patterns:**

- URL-based routing with React Router (BrowserRouter)
- Protected routes using ProtectedLayout wrapper component
- NavLink for active route styling with automatic URL synchronization
- Currently implemented pages: `dashboard` and `points`
- Other menu items (users, analytics, reports, settings) render ComingSoonPage placeholder
- Fixed sidebar layout (256px width, `ml-64` offset for main content)
- Authentication check redirects to `/login` if not authenticated

### UI Component System

This project uses **shadcn/ui** component library patterns:

**Base UI components** (`src/components/ui/`):

- Built on Radix UI primitives with extensive collection of 50+ components
- Utility function: `cn()` in `src/components/ui/utils.ts` (combines `clsx` + `tailwind-merge`)
- Styled with Tailwind utility classes following shadcn/ui conventions

**Custom components** (`src/components/`):

- Business logic components that compose UI primitives
- Figma-generated components in `src/components/figma/`

### Styling System

**Tailwind CSS v4 architecture:**

- Uses CSS custom properties (CSS variables) for theming
- CSS layers: `@layer properties`, `@layer theme`, `@layer base`, `@layer utilities`
- Dark mode support with `.dark` class selector
- Custom color palette with OKLCH color space
- Design tokens defined in `index.css` starting at line 1265

**Color system:**

- Primary: Blue (`--primary-blue`, `--color-blue-*`)
- Accent: Cyan (`--accent-cyan`, `--color-cyan-*`)
- Surfaces: Slate (`--color-slate-*`)
- Custom CSS variables for consistent spacing and typography

### Data Management

**TanStack Query (React Query) v5:**

The application uses TanStack Query for server state management:

- **QueryClient** configured in `src/lib/query/client.ts`
  - staleTime: 1분 (데이터 신선도 유지 시간)
  - gcTime: 5분 (미사용 캐시 유지 시간)
  - refetchOnWindowFocus: false (윈도우 포커스 시 리페치 비활성화)
  - retry: 1 (실패 시 1번 재시도)

- **Query Keys** managed in `src/lib/query/keys.ts`
  - Domain-based key factory pattern
  - Examples: `queryKeys.users.list()`, `queryKeys.points.detail(id)`

- **Custom Hooks** in `src/hooks/`
  - Queries: `src/hooks/queries/` (data fetching)
  - Mutations: `src/hooks/mutations/` (data updates)

- **DevTools** available in development mode
  - Press the TanStack logo in bottom-right corner
  - initialIsOpen: false (starts minimized)

**Static Mock Data:**

Currently some components use static mock data:

- `DataTable.tsx`: Project/task data with Korean labels (프로젝트, 클라이언트, etc.)
- `PointsManagement.tsx`: User points data and transaction history

**API Integration Pattern:**

Follow the established pattern in `src/lib/api/identity.ts` for all API development:

```typescript
// src/lib/api/domain.ts
import { queryOptions } from "@tanstack/react-query";
import { api } from "./instance";

// 1. Define TypeScript interfaces
export interface GetSomethingResponse {
  id: string;
  data: string;
}

export interface CreateSomethingRequest {
  name: string;
  value: number;
}

// 2. Create async API functions using arrow function syntax
export const getSomething = async (): Promise<GetSomethingResponse> => {
  return api.get<GetSomethingResponse>("endpoint");
};

export const createSomething = async (
  data: CreateSomethingRequest,
): Promise<GetSomethingResponse> => {
  return api.post<GetSomethingResponse>("endpoint", { json: data });
};

// 3. Export queryOptions for query-based endpoints (optional but recommended)
export const domainQueryOptions = {
  something: queryOptions({
    queryKey: ["something"],
    queryFn: () => getSomething(),
  }),
};
```

**Custom Hooks Pattern:**

```typescript
// src/hooks/queries/useSomething.ts (for queries)
import { useQuery } from "@tanstack/react-query";
import { domainQueryOptions } from "@/lib/api/domain";

export const useSomething = () => {
  return useQuery(domainQueryOptions.something);
};

// src/hooks/mutations/useCreateSomething.ts (for mutations)
import { useMutation } from "@tanstack/react-query";
import { createSomething, type CreateSomethingRequest } from "@/lib/api/domain";

export const useCreateSomething = () => {
  return useMutation({
    mutationFn: (data: CreateSomethingRequest) => createSomething(data),
  });
};
```

**Key Patterns:**

- ✅ Use **arrow function syntax** for all API functions and hooks
- ✅ Export interfaces for request/response types
- ✅ Use TypeScript generics for type-safe API responses: `api.get<ResponseType>()`
- ✅ Use `queryOptions` from TanStack Query for reusable query configurations
- ✅ Keep API functions simple and focused
- ✅ Authentication handled automatically via request interceptor
- ✅ Errors handled via response interceptor (401 → logout, 403 → log error)

### Vite Configuration Notes

The vite.config.ts contains extensive package version aliases (lines 11-49) that map versioned package names to their base names. This appears to be a workaround for module resolution, likely from the Figma code generation process.

## Important Development Considerations

### Language & Localization

- UI text is in **Korean (한국어)** throughout the application
- When adding new features, maintain Korean text for consistency
- Examples: "대시보드" (Dashboard), "포인트 관리" (Points Management), "사용자" (Users)

### Component Creation

- Follow shadcn/ui patterns for new UI components
- Use the `cn()` utility for className composition
- Maintain consistency with existing Tailwind class patterns
- Place reusable UI primitives in `src/components/ui/`
- Place business components in `src/components/`

### State Management

- Uses React Router v7 for URL-based navigation and routing
- No global state management - consider adding Zustand/Redux if complexity grows
- Mock data is component-local - consider extracting to separate data files

### TypeScript

- Project uses TypeScript with strict mode enabled
- Type definitions from `@types/node` version 20.19.25
- Interface definitions are colocated with components
- Path alias `@/*` configured for src imports

### ESLint & Prettier

- **ESLint configuration** based on reference from git-animal-client project
  - TypeScript ESLint with recommended rules
  - React and React Hooks plugins
  - Accessibility checks (jsx-a11y)
  - Import sorting (simple-import-sort)
  - Unused imports detection
  - All errors converted to warnings (only-warn plugin)

- **Import ordering** enforced by simple-import-sort:
  1. React and external packages
  2. @/ imports (project aliases)
  3. Parent directory imports
  4. Relative imports

- **Prettier** configured with:
  - 2-space indentation
  - Semicolons enabled
  - Double quotes
  - 100 character line width
  - Trailing commas
  - Auto end-of-line

### Styling Guidelines

- Use Tailwind utility classes (v4 syntax)
- Leverage CSS custom properties defined in index.css
- Maintain spacing consistency using `--spacing` multipliers
- Follow existing color palette (blues, cyans, slate grays)

### Navigation Extension

To add new pages to the sidebar navigation:

1. Create new page component in `src/pages/` directory (e.g., `UsersPage.tsx`)
2. Add menu item with `path` to `menuItems` array in `Sidebar.tsx`
3. Add new `<Route>` in `App.tsx` inside the `ProtectedLayout` element
4. The route will automatically be protected and URL will sync with navigation
