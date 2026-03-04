import { drizzle } from 'drizzle-orm/node-postgres'

import { env } from '@/env'

import * as schema from './schema.ts'
import * as authSchema from './auth-schema.ts'

/** Drizzle ORM database instance connected via validated `DATABASE_URL`. */
export const db = drizzle(env.DATABASE_URL, {
  schema: { ...schema, ...authSchema },
})
