import { drizzle } from 'drizzle-orm/node-postgres'
import { authRelations } from './schemas'
import { env } from '#/env'

export const db = drizzle(env.DATABASE_URL, {
  relations: { ...authRelations },
})
