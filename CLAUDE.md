# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Monorepo Management (run from root):**
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Run linting across all workspaces
- `pnpm test` - Run tests across all workspaces
- `pnpm codegen` - Generate API clients and database types
- `pnpm migrate:latest` - Run latest database migrations
- `pnpm fix` - Auto-fix Biome issues and run sherif

**Individual App Development:**
- Backend services (auth-service, admin-backend):
  - `pnpm dev` - Start server with file watching
  - `pnpm migrate:make` - Create new migration
  - `pnpm migrate:latest` - Run migrations and regenerate types
  - `pnpm codegen` - Regenerate database types and API specs
- Frontend app (admin-web-app):
  - `pnpm dev` - Start Vite dev server
  - `pnpm build` - TypeScript compile + Vite build
  - `pnpm storybook` - Start Storybook on port 6006

**Testing:**
- Root: `pnpm test` (runs all workspace tests)
- auth-service: `pnpm test` (Vitest)
- admin-web-app: `pnpm test` (Vitest with browser testing)

## Architecture Overview

**Monorepo Structure:**
- `apps/auth-service` - Authentication/authorization API (port 3000)
- `apps/admin-backend` - Admin management API (port 3001) 
- `apps/admin-web-app` - React admin dashboard
- `packages/ui` - Shared React components with Vanilla Extract styling
- `packages/api-client-auth` - Generated auth service client
- `packages/api-client-admin` - Generated admin service client

**Tech Stack:**
- **Backend:** Fastify, Better Auth, Kysely (PostgreSQL), Zod validation
- **Frontend:** React 19, React Router 7, React Query, Vite, Vanilla Extract
- **Tooling:** TurboRepo, PNPM workspaces, Biome (linting/formatting), Storybook
- **Testing:** Vitest, Testing Library, Playwright
- **Code Generation:** Orval (API clients), Kysely-codegen (DB types)

**Key Patterns:**
- All backend services use identical Fastify + Better Auth setup
- Database types are auto-generated from schema introspection
- API clients are generated from OpenAPI specs using Orval
- Public/authed route separation with preHandler middleware
- Shared UI components in packages/ui with atomic design principles

**Database Setup:**
- Two PostgreSQL databases: `webplatformauth`, `webplatformadmin`
- Kysely for query building and migrations
- Auto-generated TypeScript types from database schema

**Development Workflow:**
1. Run `pnpm codegen` after schema changes to regenerate types/clients
2. Use `pnpm migrate:latest` to apply migrations and update generated types
3. Biome auto-fixes on commit via lefthook pre-commit hooks
4. TurboRepo handles build dependencies and caching

**Port Configuration:**
- auth-service: 3000
- admin-backend: 3001  
- admin-web-app: dev server (typically 5173)
- Storybook: 6006

## Environment Setup

Copy `.env.example` files to `.env` in backend services before development. Both services require PostgreSQL database connections.