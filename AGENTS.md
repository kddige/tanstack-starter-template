## Agent rules

- Prefer web-search tools, when available, to retrieve up-to-date documentation, library guidance, and best practices.
- When working with auth, always load the relevant Better Auth skills to ensure security is handled properly.
- When working with oRPC routing, always load the `orpc-routing-best-practices` skill to ensure proper routing and query management.

## Tools

- Package manager/runtime: use Bun commands (`bun`, `bunx`, `bun add`, etc.).
- Test commands: always use `bun run test` or `bun x vitest ...`.
- Runtime target: Node.js. Do not assume the app is ready for Bun runtime deployment.

## Code Style

Avoid `as` casting in application code, except `as const`, which is allowed. Prefer type guards, assertions through validated schemas, or other TypeScript features that preserve type safety. Generated or vendor-style shadcn/ui components may contain casts; avoid adding new casts there unless there is no safer alternative.

Add JSDoc comments for exported application-level utilities, server procedures, public APIs, classes, and constants. Generated UI components and route definitions do not require exhaustive JSDoc. Include concise `@example` blocks, useful `{@link}` references, and relevant tags (`@param`, `@returns`, `@throws`) when they improve clarity. Update JSDoc when behavior changes.

## Testing

Write or update tests first, then implement the corresponding functionality. Use RED/GREEN/REFACTOR cycles where practical. Tests should cover edge cases and likely failure modes. Use descriptive test names and prioritize meaningful coverage over chasing 100% coverage.

### Unit Tests

Unit tests are located in `src/**/*.test.ts` files and run with Vitest.

```bash
bun run test
```

# oRPC Frontend Usage Guide

**Do not create custom hooks for queries.** Always use queries and mutations directly in components:

```tsx
// Queries
useQuery(orpc.example.list.queryOptions())
useQuery(orpc.example.get.queryOptions({ input: { id: exampleId } }))

// Mutations
useMutation(orpc.example.add.mutationOptions())

// Event streaming (real-time updates from the server)
useQuery(
  orpc.some.sse.rpc.experimental_streamedOptions({
    queryFnOptions: { refetchMode: 'replace' },
  }),
)
```

### oRPC query key helpers

oRPC generates type-safe query keys automatically. **Never use raw string arrays** like `{ queryKey: ['container'] }`. Always use the `.key()` helpers from the `orpc` utils object.

```tsx
import { orpc } from '#/lib/rpc'

// .key() — broad partial-matching key for invalidating an entire router/procedure family
orpc.example.key() // all example.* queries
orpc.example.key({ type: 'query' }) // only query-type entries, excluding mutations

// .key() with input — narrow to a specific input
orpc.example.get.key({ input: { id: '123' } })

// .queryKey() — full matching key for a specific query; useful with setQueryData
orpc.example.get.queryKey({ input: { id: '123' } })

// .mutationKey() — full matching key for mutations
orpc.example.add.mutationKey()
```

**Invalidation examples:**

```tsx
const queryClient = useQueryClient()

const addMutation = useMutation({
  ...orpc.example.add.mutationOptions(),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: orpc.example.key() })
  },
})

queryClient.invalidateQueries({ queryKey: orpc.example.key({ type: 'query' }) })

queryClient.setQueryData(
  orpc.example.get.queryKey({ input: { id: '123' } }),
  updatedData,
)
```

### oRPC routing

When working with oRPC routing, always use the `orpc-routing-best-practices` skill. This is mandatory for all oRPC routing work.

# Database setup

ORM is Drizzle. Write application schemas in `src/server/lib/db/schemas/app-schema.ts`. Better Auth generated schemas live in `src/server/lib/db/schemas/auth-schema.ts`.

**After any production-bound schema change, always generate and use migrations** — never use `db:push` for production-bound changes. Migrations ensure data is transformed correctly when applied in production environments.

1. Modify `src/server/lib/db/schemas/app-schema.ts`.
2. Run `bun run db:generate` to create a migration file.
3. Review the generated SQL in `drizzle/` for correctness, especially for column renames, type changes, or data-loss-prone operations.
4. Run `bun run db:migrate` to apply the migration.

Use `bun run db:push` only for rapid local prototyping where data loss is acceptable.

When changing auth options or extending the Better Auth instance, run `bun run auth:generate` to regenerate `src/server/lib/db/schemas/auth-schema.ts`.

# Environment variables

All environment variables should be defined in root `.env` files. Use `src/env.ts` to parse and export environment variables throughout the application. This project uses `@t3-oss/env-core` to prevent accidental client-side access to server-only variables, but always verify sensitive environment data is not exposed to the client bundle.

# Security

Ensure endpoints, routes, and loaders are properly authenticated and authorized using Better Auth or oRPC procedures. Loader authentication is not a safe source for sensitive operations. Sensitive operations should always be wrapped in an oRPC procedure with proper auth checks because loaders may run on both client and server.

# Client vs Server

TanStack Start automatically prevents server files from being bundled into the client when using `.server.ts`, files in a `server` folder, or configured import protection. Use `.client.ts` only for files that must be client-only.

For files that can exist on both client and server, do not include a suffix.

# Additional information

These aren't included in the template but should be surfaced when needed:

- **[React Hook Form](https://react-hook-form.com/)** — Performant form handling with validation. Pairs well with Zod for schema-based validation via `@hookform/resolvers`.
- **[TanStack Pacer](https://tanstack.com/pacer/latest/docs/overview)** — Rate-limiting, throttling, and debouncing primitives. Useful for search inputs, API call protection, and preventing excessive user actions.
