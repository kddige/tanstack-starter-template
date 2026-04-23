# TanStack Start Template

An opinionated full-stack starter template built on [TanStack Start](https://tanstack.com/start) with authentication plumbing, database access, type-safe APIs, and UI components pre-configured.

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19, SSR, file-based routing)
- **API:** [oRPC](https://orpc.dev/) (type-safe RPC with TanStack Query integration)
- **Auth:** [Better Auth](https://www.better-auth.com/) (session/database wiring included; choose and enable your auth methods as needed)
- **Database:** [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL
- **Cache/infra:** Redis is included as an optional local service for future caching, queues, rate limiting, or Better Auth secondary storage
- **UI:** [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS v4](https://tailwindcss.com/)
- **Validation:** [Zod](https://zod.dev/) + [t3-env](https://env.t3.gg/) for type-safe env vars
- **Testing:** [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)
- **Tooling:** ESLint, Prettier, TypeScript

## Quick Start

### 1. Clone & install

```bash
bunx degit kddige/tanstack-starter-template my-app
cd my-app
bun install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

```bash
# Generate a strong Better Auth secret
bunx --bun @better-auth/cli secret

# Default local PostgreSQL URL for docker-compose.yml
DATABASE_URL="postgres://postgres:postgres@localhost:5432/postgres"
```

### 3. Start PostgreSQL and Redis

A `docker-compose.yml` is included with PostgreSQL and Redis services matching the default `.env.example` values.

```bash
docker compose up -d
```

Redis is optional infrastructure for common app needs such as caching, queues, rate limiting, or Better Auth secondary storage. If you do not need it, remove the Redis service from `docker-compose.yml`, the `redis` dependency, and `REDIS_URL` from `.env.example` and `src/env.ts`.

### 4. Set up database

```bash
bun run db:push    # Push schema directly to the database for local development
# or
bun run db:migrate # Run generated migrations for production-like environments
```

Use `db:push` only for local prototyping where data loss is acceptable. For production-bound schema changes, generate and review migrations with `bun run db:generate`, then apply them with `bun run db:migrate`.

### 5. Start developing

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                  | Description                            |
| ----------------------- | -------------------------------------- |
| `bun run dev`           | Start dev server on port 3000          |
| `bun run build`         | Production build                       |
| `bun run preview`       | Preview production build               |
| `bun run test`          | Run tests with Vitest                  |
| `bun run test:watch`    | Run tests in watch mode                |
| `bun run lint`          | Lint with ESLint                       |
| `bun run typecheck`     | Type-check with TypeScript             |
| `bun run format`        | Check formatting with Prettier         |
| `bun run check`         | Fix formatting + lint                  |
| `bun run verify`        | Run format, lint, typecheck, and tests |
| `bun run db:generate`   | Generate Drizzle migrations            |
| `bun run db:migrate`    | Run Drizzle migrations                 |
| `bun run db:push`       | Push schema directly to database       |
| `bun run db:studio`     | Open Drizzle Studio                    |
| `bun run auth:generate` | Regenerate Better Auth Drizzle schema  |

## Environment Variables

All env vars are validated at runtime through `src/env.ts` using `@t3-oss/env-core`. Add new variables there before using them.

```ts
import { env } from '#/env'

// Server-side
env.REDIS_URL
env.DATABASE_URL
env.BETTER_AUTH_SECRET
env.BETTER_AUTH_URL

// Client-side (must be prefixed with VITE_)
env.VITE_APP_TITLE
```

## Authentication

Better Auth is configured with Drizzle as the database adapter and TanStack Start cookie support. The auth server is in `src/server/lib/auth.ts` and the client is in `src/lib/auth-client.ts`.

No sign-in method is enabled by default. Enable the auth method your app needs, such as email/password, OAuth providers, passkeys, or 2FA, then regenerate the schema if the config changes database tables:

```bash
bun run auth:generate
```

See the [Better Auth docs](https://www.better-auth.com/) for adding email/password, OAuth providers, 2FA, and more.

## Database

Drizzle ORM is configured with PostgreSQL. Application schemas live in `src/server/lib/db/schemas/app-schema.ts`. Better Auth generated schemas live in `src/server/lib/db/schemas/auth-schema.ts`.

```bash
docker compose up -d  # Start PostgreSQL and Redis
bun run db:generate   # Generate migration files
bun run db:migrate    # Apply migrations
bun run db:studio     # Visual database browser
```

## Recommended Libraries

These aren't included in the template but are recommended for common needs:

- **[React Hook Form](https://react-hook-form.com/)** — Performant form handling with validation. Pairs well with Zod for schema-based validation via `@hookform/resolvers`.
- **[TanStack Pacer](https://tanstack.com/pacer/latest/docs/overview)** — Rate-limiting, throttling, and debouncing primitives. Useful for search inputs, API call protection, and preventing excessive user actions.

## Learn More

- [TanStack Start docs](https://tanstack.com/start)
- [oRPC docs](https://orpc.dev/)
- [Better Auth docs](https://www.better-auth.com/)
- [Drizzle ORM docs](https://orm.drizzle.team/)
- [shadcn/ui docs](https://ui.shadcn.com/)

## License

MIT
