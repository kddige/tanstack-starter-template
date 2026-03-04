import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import { z } from 'zod'

config({ path: ['.env.local', '.env'] })

/**
 * Drizzle-kit runs outside Vite, so we validate `process.env` directly
 * instead of importing `src/env.ts` (which relies on `import.meta.env`).
 */
const { DATABASE_URL } = z.object({ DATABASE_URL: z.url() }).parse(process.env)

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
})
