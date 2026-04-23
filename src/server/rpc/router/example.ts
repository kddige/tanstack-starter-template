import z from 'zod'
import { publicProcedure } from '../procedures'

const messages: string[] = []

export const exampleRouter = publicProcedure.tag('Example').router({
  getMessages: publicProcedure
    .route({ method: 'GET', description: 'Returns posted messages' })
    .output(
      z.object({
        messages: z.array(z.string()).describe('The messages'),
        updated_at: z.date().describe('The time the messages were updated'),
      }),
    )
    .handler(() => {
      return {
        messages,
        updated_at: new Date(),
      }
    }),
  postMessage: publicProcedure
    .route({
      method: 'POST',
      description: 'Posts a message',
    })
    .input(
      z.object({
        message: z.string().describe('The message to post'),
      }),
    )
    .output(
      z.object({
        success: z.boolean().describe('Whether the message was posted'),
      }),
    )
    .handler(({ input }) => {
      messages.push(input.message)
      return {
        success: true,
      }
    }),
})
