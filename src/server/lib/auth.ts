import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from './db/instance'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { env } from '#/env'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  plugins: [
    // make sure tanstackStartCookies is the last plugin in the array
    tanstackStartCookies(),
  ],
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
})
