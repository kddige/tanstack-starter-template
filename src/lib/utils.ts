import { clsx } from 'clsx'
import type { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges class names with `clsx` and resolves Tailwind CSS conflicts.
 *
 * @param inputs - Class values to combine.
 * @returns A single class name string with conflicting Tailwind classes merged.
 * @example
 * ```ts
 * cn('px-2 text-sm', condition && 'px-4')
 * ```
 * @see {@link clsx}
 * @see {@link twMerge}
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
