import { handler } from '#/server/rpc/handlers'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/api/rpc/$')({
  server: {
    handlers: {
      ANY: async ({ request }) => {
        const { response } = await handler.handle(request, {
          prefix: '/api/rpc',
          context: {
            headers: request.headers,
          }, // Provide initial context if needed
        })

        return response ?? new Response('Not Found', { status: 404 })
      },
    },
  },
})
