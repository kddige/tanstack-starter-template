import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges conditional class names and resolves Tailwind conflicts', () => {
    const variants = { isHidden: false }

    expect(cn('px-2 text-sm', variants.isHidden && 'hidden', 'px-4')).toBe(
      'text-sm px-4',
    )
  })
})
