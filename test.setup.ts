import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  cleanup()
})

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean | undefined
}

// TanStack Router's testing docs recommend enabling the React act environment.
globalThis.IS_REACT_ACT_ENVIRONMENT = true
