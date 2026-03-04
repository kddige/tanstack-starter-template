import { describe, expect, it } from 'vitest'

describe('template setup', () => {
  it('vitest runs correctly', () => {
    expect(1 + 1).toBe(2)
  })

  it('resolves tsconfig path aliases', async () => {
    const mod = await import('#/env')
    expect(mod).toBeDefined()
  })
})
