# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GitAnimals is a monorepo that allows users to raise virtual pets through GitHub activity. Built with Turborepo, pnpm workspace, and features multiple client applications.

## Architecture

**Monorepo Structure:**
- `apps/web` - Next.js 14 web application (main frontend)  
- `apps/admin` - Remix admin dashboard
- `apps/app` - React Native mobile app (Expo)
- `apps/webview` - Vite-based webview for mobile integration
- `packages/ui/panda` - Component library using PandaCSS
- `packages/ui/icon` - Icon components
- `packages/ui/token` - Design tokens
- `packages/lib/*` - Shared libraries and utilities

**Key Technologies:**
- **Styling:** PandaCSS with Shadow Panda preset for component styling
- **State Management:** Tanstack Query v5 (server state), Jotai & Zustand (client state)  
- **Authentication:** NextAuth.js
- **UI Components:** Radix UI primitives + custom PandaCSS components
- **Package Manager:** pnpm with workspace configuration
- **Build System:** Turborepo for orchestration

## Development Commands

**Root-level commands (run from project root):**
```bash
# Development servers
pnpm dev:web          # Start web app dev server
pnpm dev:admin        # Start admin app dev server  
pnpm dev:webview      # Start webview dev server

# Build commands
pnpm build:web        # Build web application
pnpm build:admin      # Build admin application
pnpm build:webview    # Build webview application

# Analysis
pnpm analyze:web      # Bundle analyzer for web app

# Linting and formatting
pnpm lint             # Lint all workspaces
pnpm format           # Format code with Prettier

# UI Development  
pnpm sb:panda         # Start Storybook for UI components
```

**App-specific commands:**
- Web app: `prepare` (PandaCSS codegen), `type-check`, `lint:fix`
- Admin app: `typecheck`, Remix-specific build/dev commands
- Mobile app: `test` (Jest), `android`, `ios`, `reset-project`

## Code Patterns & Conventions

**Component Architecture:**
- UI components in `packages/ui/panda/src/components/`
- Each component has: `Component.tsx`, `Component.stories.tsx`, `index.ts`
- PandaCSS styling with design tokens from `packages/ui/token`

**Import Patterns:**
- Workspace dependencies use `workspace:*` protocol
- UI components imported from `@gitanimals/ui-panda`
- Shared utilities from `@gitanimals/util-common`

**State Management:**
- Server state: Tanstack Query with custom hooks in `src/apis/`
- Client state: Jotai for atomic state, Zustand for stores
- Auth state managed through NextAuth.js

**Styling Approach:**
- PandaCSS with `styled-system` generation
- Shadow Panda preset for enhanced component styling
- Responsive design using PandaCSS conditions (mobile/desktop)
- Design tokens centralized in `packages/ui/token`

## Testing & Quality

- **Web app:** Next.js built-in testing, Storybook for components
- **Mobile app:** Jest with jest-expo preset
- **Linting:** ESLint with custom configs per workspace
- **Type checking:** TypeScript with shared configs in `packages/typescript-config`

## Key Files to Understand

- `turbo.json` - Build pipeline configuration
- `pnpm-workspace.yaml` - Workspace definition
- `apps/*/panda.config.ts` - PandaCSS configuration per app
- `packages/ui/panda/src/theme/` - Design system tokens and styles

## Build Pipeline Dependencies

The build system has specific dependency chains:
- Most builds depend on `^build` and `^prepare` 
- `prepare` tasks generate PandaCSS styled-system
- Admin uses different output patterns (dist/**) vs others (.next/**)

## Notes for Development

- Always run `panda codegen` after theme changes
- UI component changes require Storybook restart
- Mobile app uses Expo SDK ~53.0.17 with React Native 0.79.5
- Web app uses Next.js App Router with internationalization (next-intl)