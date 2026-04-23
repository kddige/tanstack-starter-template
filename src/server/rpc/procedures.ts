import { os, ORPCError } from '@orpc/server'
import { auth } from '../lib/auth'

const base = os.$context<{ headers: Headers }>()

/**
 * Adds `session` to context if it exists.
 * Does not require auth.
 */
export const withSessionMiddleware = base.middleware(
  async ({ context, next }) => {
    const session = await auth.api.getSession({
      headers: context.headers,
    })

    return next({
      context: {
        session,
      },
    })
  },
)

type Session = Awaited<ReturnType<typeof auth.api.getSession>>

/**
 * Requires that `session` already exists in context.
 * This means it must run after `withSession`.
 */
export const requireSessionMiddleware = os
  .$context<{
    session: Session
  }>()
  .middleware(async ({ context, next }) => {
    if (!context.session) {
      throw new ORPCError('UNAUTHORIZED')
    }

    return next({
      context: {
        session: context.session,
      },
    })
  })

export const publicProcedure = base.use(withSessionMiddleware)
export const protectedProcedure = base
  .use(withSessionMiddleware)
  .use(requireSessionMiddleware)
