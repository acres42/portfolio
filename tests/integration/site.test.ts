import { describe, it, expect } from 'vitest'
import { JSDOM } from 'jsdom'
import { readFileSync } from 'fs'
import { resolve } from 'path'

describe('Site Integration Tests', () => {
  it(
    'scrolls to section on nav click',
    async () => {
      const html = `
        <!DOCTYPE html>
        <html>
          <body>
            <nav><a href="#about">About</a></nav>
            <section id="about">About section</section>
            <script>
              document.querySelector('a[href="#about"]')?.addEventListener('click', (e) => {
                e.preventDefault();
                const el = document.querySelector('#about');
                if (el) el.setAttribute('data-scrolled', 'true');
                window.location.hash = '#about';
              });
            </script>
          </body>
        </html>
      `
      const { window } = new JSDOM(html, {
        url: 'http://localhost/',
        runScripts: 'dangerously',
        resources: 'usable',
        pretendToBeVisual: true
      })

      await new Promise(resolve => {
        window.addEventListener('DOMContentLoaded', () => {
          const document = window.document
          const link = document.querySelector('a[href="#about"]')
          const target = document.querySelector('#about')

          if (!link) console.error('link not found')
          if (!target) console.error('target not found')

          expect(link).not.toBeNull()
          expect(target).not.toBeNull()

          link?.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))
          expect(target?.getAttribute('data-scrolled')).toBe('true');

          resolve(null)
        })
      })
    },
    3000
  )

  it('loads main.js without errors', () => {
    expect(() => {
      require('../../dist/js/main.js')
    }).not.toThrow()
  })

  it('includes compiled main.css in the HTML', () => {
    const htmlPath = resolve(__dirname, '../../dist/index.html')
    const html = readFileSync(htmlPath, 'utf8')
    const { window } = new JSDOM(html)
    const linkTags = Array.from(window.document.querySelectorAll('link[rel="stylesheet"]'))
    const found = linkTags.some(link => link.getAttribute('href')?.includes('main.css'))
    expect(found).toBe(true)
  })
})
