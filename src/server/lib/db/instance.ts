import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schemas'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined')
}

export const db = drizzle(process.env.DATABASE_URL, {
  schema,
})
