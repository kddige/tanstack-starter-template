import { RPCLink } from '@orpc/client/fetch'
import { createIsomorphicFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import { createRouterClient } from '@orpc/server'
import type { RouterClient } from '@orpc/server'
import { router } from '#/server/rpc/router'
import { createORPCClient } from '@orpc/client'

const getORPCClient = createIsomorphicFn()
  .server(() =>
    createRouterClient(router, {
      /**
       * Provide initial context if needed.
       *
       * Because this client instance is shared across all requests,
       * only include context that's safe to reuse globally.
       * For per-request context, use middleware context or pass a function as the initial context.
       */
      context: async () => ({
        headers: getRequestHeaders(),
      }),
    }),
  )
  .client((): RouterClient<typeof router> => {
    const link = new RPCLink({
      url: `${window.location.origin}/api/rpc`,
    })

    return createORPCClient(link)
  })

export const client = getORPCClient()
export const orpc = createTanstackQueryUtils(client)
