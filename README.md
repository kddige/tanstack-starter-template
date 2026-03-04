# TanStack Start Template

An opinionated full-stack starter template built on [TanStack Start](https://tanstack.com/start) with authentication, database, type-safe API, and UI components pre-configured.

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start) (React 19, SSR, file-based routing)
- **API:** [oRPC](https://orpc.unnoq.com/) (type-safe RPC with TanStack Query integration)
- **Auth:** [Better Auth](https://www.better-auth.com/) (email/password, session management)
- **Database:** [Drizzle ORM](https://orm.drizzle.team/) + PostgreSQL
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
cp .env.example .env.local
```

Edit `.env.local` with your values:

```bash
# Generate auth secret
bunx --bun @better-auth/cli secret

# Set your database URL
DATABASE_URL="postgresql://username:password@localhost:5432/mydb"
```

### 3. Start PostgreSQL

A `docker-compose.yml` is included with a PostgreSQL instance matching the default `.env.example` connection string.

```bash
docker compose up -d
```

### 4. Set up database

```bash
bun run db:push    # Push schema to database (local dev)
# or
bun run db:migrate # Run migrations (production)
```

### 5. Start developing

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                  | Description                      |
| ----------------------- | -------------------------------- |
| `bun run dev`           | Start dev server on port 3000    |
| `bun run build`         | Production build                 |
| `bun run preview`       | Preview production build         |
| `bun run test`          | Run tests with Vitest            |
| `bun run lint`          | Lint with ESLint                 |
| `bun run format`        | Check formatting with Prettier   |
| `bun run check`         | Fix formatting + lint            |
| `bun run db:generate`   | Generate Drizzle migrations      |
| `bun run db:migrate`    | Run Drizzle migrations           |
| `bun run db:push`       | Push schema directly to database |
| `bun run db:studio`     | Open Drizzle Studio              |
| `bun run auth:generate` | Regenerate Better Auth schema    |

## Project Structure

```
src/
├── components/ui/     # shadcn/ui components
├── db/
│   ├── index.ts       # Drizzle client
│   ├── schema.ts      # Database schema
│   └── auth-schema.ts # Auto-generated auth tables
├── integrations/
│   ├── better-auth/   # Auth UI components
│   └── tanstack-query/ # Query provider + devtools
├── lib/
│   ├── auth.ts        # Better Auth server config
│   └── auth-client.ts # Better Auth client
├── routes/
│   ├── __root.tsx     # Root layout
│   ├── index.tsx      # Home page
│   └── auth/login.tsx # Login page
├── env.ts             # Type-safe env vars (t3-env)
└── styles.css         # Global styles (Tailwind)
```

## Environment Variables

All env vars are validated at runtime through `src/env.ts` using `@t3-oss/env-core`. Add new variables there before using them.

```ts
import { env } from '#/env'

// Server-side
env.DATABASE_URL
env.BETTER_AUTH_SECRET
env.BETTER_AUTH_URL

// Client-side (must be prefixed with VITE_)
env.VITE_APP_TITLE
```

## Authentication

Better Auth is configured with email/password authentication and Drizzle as the database adapter. The auth server is in `src/lib/auth.ts` and the client in `src/lib/auth-client.ts`.

After modifying auth config, regenerate the schema:

```bash
bun run auth:generate
```

See the [Better Auth docs](https://www.better-auth.com/) for adding OAuth providers, 2FA, and more.

## Database

Drizzle ORM is configured with PostgreSQL. Write schemas in `src/db/schema.ts`.

```bash
docker compose up -d  # Start PostgreSQL
bun run db:generate   # Generate migration files
bun run db:migrate    # Apply migrations
bun run db:studio     # Visual database browser
```

## Pre-commit Hook

A Husky pre-commit hook runs automatically on `git commit`:

1. **Type-check** — `tsc --noEmit` (fails fast on type errors)
2. **Lint** — `eslint --fix` on staged `*.ts(x)` files (blocks on unfixable errors)
3. **Format** — `prettier --write` on all staged files

Fixed files are automatically re-staged. Install hooks after cloning with `bun install` (runs `husky` via the `prepare` script).

## Recommended Libraries

These aren't included in the template but are recommended for common needs:

- **[React Hook Form](https://react-hook-form.com/)** — Performant form handling with validation. Pairs well with Zod for schema-based validation via `@hookform/resolvers`.
- **[TanStack Pacer](https://tanstack.com/pacer/latest/docs/overview)** — Rate-limiting, throttling, and debouncing primitives. Useful for search inputs, API call protection, and preventing excessive user actions.

## Learn More

- [TanStack Start docs](https://tanstack.com/start)
- [oRPC docs](https://orpc.unnoq.com/)
- [Better Auth docs](https://www.better-auth.com/)
- [Drizzle ORM docs](https://orm.drizzle.team/)
- [shadcn/ui docs](https://ui.shadcn.com/)

## License

MIT
