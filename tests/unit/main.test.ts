import { describe, it, expect, beforeEach, vi } from 'vitest'

beforeEach(() => {
  require('../../dist/js/main.js')
  document.body.innerHTML = `<button id="theme-toggle">Toggle</button>`

  const store: Record<string, string> = {}
  vi.stubGlobal('localStorage', {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value }),
    removeItem: (key: string) => { delete store[key] },
    clear: () => { Object.keys(store).forEach(k => delete store[k]) }
  })

  vi.stubGlobal('matchMedia', vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })))
})

describe('main.js', () => {
  it('toggles dark mode and saves preference to localStorage', async () => {
    const button = document.querySelector<HTMLButtonElement>('#theme-toggle')

    window.setupThemeToggle() // manually invoke setup since DOMContentLoaded won't fire in tests
    button?.click()
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(document.body.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('does not throw if #theme-toggle button is missing', () => {
    document.body.innerHTML = ''
    expect(() => window.setupThemeToggle()).not.toThrow()
  })
})
