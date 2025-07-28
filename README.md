# 💼 AC Roselee – Portfolio Site

This is the static portfolio site for AC Roselee, built with vanilla HTML, SCSS, and JavaScript. It showcases work experience, skills, and projects with responsive styling and simple interactions. The site is tested using Vitest and Playwright to ensure accessibility, performance, and UI consistency.

---

## 🚀 Quick Start

### 🧩 Prerequisites

- Node.js (v18 or later recommended)
- npm (v9 or later)
- Optional: `sass` (CLI) installed globally for SCSS live-reloading

### 📦 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
npm install
```

---

## 💻 Development

### 🔁 SCSS Watch Mode

Compile SCSS into `dist/css/` with live file watching:

```bash
npm run sass
```

Make your edits in `scss/`, and styles will auto-compile into `dist/css/`.

---

## 🧪 Testing

### ✅ Unit & Integration Tests

Run all unit and integration tests using [Vitest](https://vitest.dev/):

```bash
npm run test
```

Run tests with coverage:

```bash
npm run coverage
```

> ✅ Coverage reports use native V8 instrumentation.

### 🧭 E2E Tests

Run end-to-end tests using [Playwright](https://playwright.dev/):

```bash
npm run e2e
```

To run both unit and E2E tests in sequence:

```bash
npm run test:all
```

---

## 📁 Folder Structure

```
.
├── dist/              # Compiled JS/CSS files (served to browser)
├── scss/              # Source styles
├── js/                # Vanilla JS modules (e.g. theme toggler)
├── tests/             # Vitest + Playwright test files
├── index.html         # Main entry point
├── about.html         # About section
└── ...
```

---

## 🛠 Scripts Summary

| Script         | Description                          |
|----------------|--------------------------------------|
| `npm run sass` | Watch and compile SCSS               |
| `npm run test` | Run all Vitest unit/integration tests |
| `npm run e2e`  | Run all Playwright E2E tests         |
| `npm run coverage` | Generate test coverage via Vitest |
| `npm run test:all` | Run unit + E2E tests sequentially |

---

## 📫 Contact

Built and maintained by [AC Roselee](https://https://acres42.github.io/portfolio)
✨ Designed to be elegant, performant, and fully accessible.
