## Agent rules
- Prefer using context7 or web-search tools to retrive up-to-date information about docs and libaries + best practices.
- when working with auth, always load relevant better-auth skills to ensure security is properly handled. When working with oRPC, always load the orpc-routing-best-practices skill to ensure proper routing and query management.
- 
## Tools

- bun: use bun, bunx, and bun add, etc. - for testing ALWAYS use "bun run test" or "bun x vitest ..."
- environment: node <- not yet bun runtime ready..

## Code Style

NEVER use `as` casting for types (except `as const`, which is allowed). Instead use type guards, type assertions, or other TypeScript features to ensure type safety without bypassing the type system. This promotes better code quality and maintainability.

Always write JSDoc comments for all exported functions, classes, and constants.
Include `@example` blocks with realistic usage, `{@link}` references to related symbols, and any relevant tags (`@param`, `@returns`, `@throws`).
JSDoc should be concise but informative — prioritize clarity over verbosity. Remember to update JSDoc comments when making changes to reflect any changes in functionality or behavior to keep documentation accurate and helpful for users and maintainers.

## Testing

Always write or update tests first, then implement the corresponding functionality. Use RED/GREEN/REFACTOR cycles to ensure that tests drive development and that code is well-structured and maintainable.
Tests should be comprehensive, covering edge cases and potential failure modes. Use descriptive test names that clearly indicate the behavior being tested. Aim for high code coverage, but prioritize meaningful tests over achieving 100

### Unit Tests

Unit tests are located in `src/**/*.test.ts` files and run with Vitest.

```bash
bun run test
```

# oRPC FRONTEND USAGE GUIDE

**Do NOT create custom hooks for queries.** Always use queries and mutations directly in components:

```tsx
// Queries
useQuery(orpc.example.list.queryOptions())
useQuery(orpc.example.get.queryOptions({ input: { id: exampleId } }))

// Mutations
useMutation(orpc.example.add.mutationOptions())

// Event streaming (real-time updates from main process)
useQuery(
  orpc.some.sse.rpc.experimental_streamedOptions({
    queryFnOptions: { refetchMode: 'replace' },
  }),
)
```

### oRPC query key helpers

oRPC generates type-safe query keys automatically. **Never use raw string arrays** like `{ queryKey: ['container'] }` — always use the `.key()` helpers from the `orpc` utils object.

```tsx
import { orpc } from '@/lib/orpc'

// .key() — broad "partial matching" key for invalidating an entire router/procedure family
orpc.example.key() // all example.* queries
orpc.system.key() // all system.* queries
orpc.example.key({ type: 'query' }) // only query-type (excludes mutations)

// .key() with input — narrow to a specific input
orpc.example.inspect.key({ input: { id: '123' } })

// .queryKey() — "full matching" key for a specific query (use with setQueryData)
orpc.example.inspect.queryKey({ input: { id: '123' } })

// .mutationKey() — full matching key for mutations
orpc.example.restart.mutationKey()
```

**Invalidation examples:**

```tsx
const queryClient = useQueryClient()

// After a mutation, invalidate related queries:
const restartMutation = useMutation({
  ...orpc.example.restart.mutationOptions(),
  onSuccess: () => {
    // Invalidate all example queries (list, inspect, logs, etc.)
    queryClient.invalidateQueries({ queryKey: orpc.example.key() })
  },
})

// Invalidate a specific procedure's queries:
queryClient.invalidateQueries({ queryKey: orpc.system.setupStatus.key() })

// Direct cache update (optimistic or post-mutation):
queryClient.setQueryData(
  orpc.example.inspect.queryKey({ input: { id: '123' } }),
  updatedData,
)
```
### oRPC routing
When working with oRPC routing ALWAYS use the [orpc-routing-best-practices] skill! MANDATORY for all oRPC routing work.

# Database setup
ORM is Drizzle. Write all schemas in `src/db/schema.ts`.

**After any schema change, always generate and use migrations** — never use `db:push` for production-bound changes. Migrations ensure data is transformed correctly when applied in production environments.

1. Modify `src/db/schema.ts`
2. Run `bun run db:generate` to create a migration file
3. Review the generated SQL in `drizzle/` for correctness (especially for column renames, type changes, or data-loss-prone operations)
4. Run `bun run db:migrate` to apply

Use `bun run db:push` only for rapid local prototyping where data loss is acceptable.

When changing auth options, or extending the better auth instance run `bun run auth:generate` to regenerate the better-auth auth-schema.ts

# Environment variables
All environment variables should be defined in `.env` files at the root of the project. Use the 'src/env.ts' to parse and export environment variables for use throughout the application. Uses t3-env under the hood. Ensures no credentials leaks into the client bundle <- but not guranteed. Always verify when working with sensitive enviroment data

# Security
Always ensure endpoints, routes and loaders are properly authenticated and authorized using better auth, or oRPC procedures. Loaders authentication is not considered a safe source for sensitive opreations. Should always be wrapped in a oRPC procedure with proper auth checks, as loaders do run both client and server side.

# Additional information
These aren't included in the template but should be surfaced when needed:

- **[React Hook Form](https://react-hook-form.com/)** — Performant form handling with validation. Pairs well with Zod for schema-based validation via `@hookform/resolvers`.
- **[TanStack Pacer](https://tanstack.com/pacer/latest/docs/overview)** — Rate-limiting, throttling, and debouncing primitives. Useful for search inputs, API call protection, and preventing excessive user actions.
