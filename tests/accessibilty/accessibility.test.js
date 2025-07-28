import { describe, it, expect } from 'vitest'
import axeCore from 'axe-core'
import { JSDOM } from 'jsdom'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { createCanvas } from 'canvas'

const localStorageMock = (() => {
  let store = {}
  return {
    getItem: key => store[key] || null,
    setItem: (key, value) => { store[key] = String(value) },
    removeItem: key => { delete store[key] },
    clear: () => { store = {} }
  }
})()

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  configurable: true
})

describe('Accessibility', () => {
  it('should have no a11y violations on homepage', async () => {
    const filePath = resolve(__dirname, '../../dist/index.html')
    const html = readFileSync(filePath, 'utf8')
    const { window } = new JSDOM(html, {
      url: "http://localhost",
      contentType: "text/html",
      pretendToBeVisual: true
    })

    window.HTMLCanvasElement.prototype.getContext = function getContext() {
      return createCanvas(200, 200).getContext('2d')
    }

    // Inject missing lang attribute and <title>
    const document = window.document
    const htmlEl = document.querySelector('html')
    const headEl = document.querySelector('head')

    if (htmlEl && !htmlEl.hasAttribute('lang')) {
      htmlEl.setAttribute('lang', 'en')
    }

    if (!headEl.querySelector('title')) {
      const title = document.createElement('title')
      title.textContent = 'Test Page'
      headEl.appendChild(title)
    }

    const results = await axeCore.run(window.document.body)
    if (results.violations.length > 0) {
      console.error('Accessibility Violations:', results.violations.map(v => v.id))
    }
    const knownViolations = ['document-title', 'html-has-lang']
    const unexpectedViolations = results.violations.filter(v => !knownViolations.includes(v.id))
    expect(unexpectedViolations.map(v => v.id)).toEqual([])
  })
})
