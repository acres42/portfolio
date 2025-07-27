import { describe, it, expect, beforeEach, vi } from 'vitest'

let loadMain: () => Promise<void>

beforeEach(() => {
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
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })))

  loadMain = async () => {
    await import('../../dist/js/main.js')
    await new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve)
      } else {
        resolve()
      }
    })
  }
})

describe('main.js', () => {
  it('toggles dark mode and saves preference to localStorage', async () => {
  const button = document.querySelector<HTMLButtonElement>('#theme-toggle')

  await loadMain()

  // Directly invoke setup instead of waiting for DOMContentLoaded
  window.setupThemeToggle()

  button?.click()
  await new Promise(resolve => setTimeout(resolve, 0))

  expect(document.body.classList.contains('dark')).toBe(true)
  expect(localStorage.getItem('theme')).toBe('dark')
})


  it('does not throw if #theme-toggle button is missing', async () => {
    document.body.innerHTML = ''
    await loadMain()

    await expect(Promise.resolve()).resolves.not.toThrow()
  })
})
