# Personal Dashboard — Project Steering

## Project Overview
A client-side personal dashboard web app built as part of RevoU CodingCamp assignment.
Features: greeting with live clock, 25-minute focus timer, to-do list, quick links, light/dark mode, and custom name greeting.

## Tech Stack
- **HTML** — structure only (`index.html`)
- **CSS** — styling only (`css/style.css`) — one file, no frameworks
- **JavaScript** — vanilla JS only (`js/app.js`) — one file, no frameworks (no React, Vue, etc.)
- **Storage** — Browser LocalStorage API, client-side only, no backend

## Folder Rules
- Only **1 CSS file** inside `css/` -> `css/style.css`
- Only **1 JS file** inside `js/` -> `js/app.js`
- No additional libraries or CDN imports unless explicitly approved

## Coding Standards
- Use `'use strict'` at the top of `app.js`
- Use `const`/`let`, never `var`
- Group related logic with clear section comments (e.g. `// --- TIMER ---`)
- All LocalStorage keys defined as constants at the top of `app.js`
- DOM references declared at the top, grouped by section
- Functions should be small and single-purpose
- Accessible markup: use `aria-label`, `aria-live`, semantic HTML elements

## Browser Compatibility
Must work in: Chrome, Firefox, Edge, Safari (modern versions)

## Non-Functional Requirements
- Fast load time — no external dependencies at runtime
- No visible lag on UI updates
- Clean, minimal, readable interface
- Light/Dark mode persisted via LocalStorage

## Challenge Features (implemented)
- Light / Dark mode toggle
- Custom name in greeting
- Prevent duplicate tasks (case-insensitive)

## Deployment
- Source hosted on GitHub
- Published via GitHub Pages
