---
name: orpc-routing-best-practices
description: This skill provides guidance and enforcement rules for defining oRPC routes with proper HTTP routing, path parameters, and input/output structure for OpenAPI spec generation.
---

# oRPC Routing & Input/Output Structure Guide

**Reference:** [Routing docs](https://orpc.dev/docs/openapi/routing) | [Input/Output Structure docs](https://orpc.dev/docs/openapi/input-output-structure)

These rules apply when using `OpenAPIHandler` to expose oRPC procedures as REST-style HTTP endpoints with auto-generated OpenAPI specs.

---

## Routing Basics

By default oRPC uses `POST`, builds paths from router keys separated by `/`, and returns status `200`. Override with `.route`:

```ts
os.route({ method: 'GET', path: '/planets', successStatus: 200 })
os.route({ method: 'POST', path: '/planets', successStatus: 201 })
```

`.route` can be called multiple times — each call spread-merges into the existing route config.

### Initial Configuration

Set defaults on the builder with `.$route`:

```ts
const base = os.$route({ method: 'GET' })
```

---

## Path Parameters

Path parameters are defined with `{param}` syntax and merge with query/body into a single input object (compact mode). Use `{+param}` to match slashes.

```ts
os.route({ path: '/planets/{id}' }).input(
  z.object({ id: z.string().describe('Planet ID') }),
)

os.route({ path: '/files/{+path}' }).input(
  z.object({ path: z.string().describe('File path including slashes') }),
)
```

---

## Route Prefixes

Use `.prefix` to prepend a path to all procedures in a router **that have an explicitly defined `path`**:

```ts
const router = os.prefix('/planets').router({
  list: listPlanet, // only gets prefix if it has .route({ path: ... })
  find: findPlanet,
  create: createPlanet,
})
```

### Lazy Router Requirement

When combining a lazy router with `OpenAPIHandler`, a prefix is **required** for lazy loading. Without it the router behaves as a regular (non-lazy) router.

```ts
const router = {
  planet: os.prefix('/planets').lazy(() => import('./planet')),
}
```

Do NOT use the `lazy` helper from `@orpc/server` here — it cannot apply route prefixes.

---

## Input Structure

The `inputStructure` option controls how request data is organized.

### Compact Mode (default)

Combines path params with query (GET) or body (POST/PUT/PATCH) into a single flat object:

```ts
os.route({ path: '/planets/{name}', method: 'POST' }).input(
  z.object({
    name: z.string().describe('Planet name from path'),
    description: z.string().optional().describe('Planet description in body'),
  }),
)
```

### Detailed Mode

Separates request data into distinct fields — `params`, `query`, `headers`, `body`:

```ts
os.route({
  path: '/planets/{name}',
  method: 'POST',
  inputStructure: 'detailed',
}).input(
  z.object({
    params: z.object({ name: z.string().describe('Planet name') }),
    query: z.object({ search: z.string().describe('Search term') }),
    body: z
      .object({ description: z.string().describe('Planet description') })
      .optional(),
    headers: z.object({
      'x-custom-header': z.string().describe('Custom header'),
    }),
  }),
)
```

Set as default with `.$route`:

```ts
const base = os.$route({ inputStructure: 'detailed' })
```

---

## Output Structure

The `outputStructure` option controls response format.

### Compact Mode (default)

Handler return value becomes the response body directly:

```ts
os.handler(async ({ input }) => {
  return { message: 'Hello, world!' }
})
```

### Detailed Mode

Handler returns an object with `status`, `headers`, and `body`:

```ts
os.route({ outputStructure: 'detailed' }).handler(async ({ input }) => {
  return {
    headers: { 'x-custom-header': 'value' },
    body: { message: 'Hello, world!' },
  }
})
```

Use with `.output` and `z.union` for multiple status codes in the OpenAPI spec:

```ts
os.route({ outputStructure: 'detailed' })
  .output(
    z.union([
      z.object({
        status: z.literal(201).describe('Record created'),
        body: z.string().describe('Created resource'),
      }),
      z.object({
        status: z.literal(200).describe('Record updated'),
        body: z.string().describe('Updated resource'),
      }),
    ]),
  )
  .handler(async ({ input }) => {
    if (shouldCreate) {
      return { status: 201, body: 'created' }
    }
    return { status: 200, body: 'updated' }
  })
```

---

## Enforcement Rules

When writing oRPC route handlers, you MUST follow these rules:

1. **ALWAYS use `.describe()` on ALL Zod schema properties.** These descriptions are exposed in the generated OpenAPI spec. Every field in `.input()` and `.output()` schemas must have a `.describe()` call.

2. **Choose the correct HTTP method.** Use `GET` for reads, `POST` for creates, `PUT`/`PATCH` for updates, `DELETE` for deletes. Set `successStatus: 201` for creation endpoints.

3. **Use path parameters for resource identifiers.** When a procedure operates on a specific resource, use `path: '/resource/{id}'` rather than putting the ID in the query or body.

4. **Prefer compact mode** unless you need explicit control over headers, query vs body separation, or multiple response status codes.

5. **Use `.prefix()` for grouped routers** to keep paths consistent and enable lazy loading with `OpenAPIHandler`.

6. **Set `successStatus` appropriately.** Use `201` for resource creation, `200` for reads and updates, `204` for deletes with no body.

7. **Structure routers hierarchically.** Group related procedures under nested objects and apply shared prefixes at the group level.
