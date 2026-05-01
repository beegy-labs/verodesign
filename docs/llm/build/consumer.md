# Consumer Integration

> CDD Layer 2 — How to use verodesign in consumer projects | **Last Updated**: 2026-04-30

Three consumption modes available; pick based on your stack and control needs.

## Mode A — CSS Variables (max control, CSS Modules friendly)

Best for: projects with existing CSS Modules, custom component styles, fine-grained control.

```css
/* globals.css */
@import "@verobee/design/css/reset.css";       /* optional */
@import "@verobee/design/css/core.css";
@import "@verobee/design/css/themes/veronex.css";
```

```css
/* Component.module.css */
.button {
  background: var(--vds-theme-primary);
  color: var(--vds-theme-primary-foreground);
  padding: var(--vds-spacing-3) var(--vds-spacing-4);
  border-radius: var(--vds-radius-md);
}
```

## Mode B — Utility classes (Tailwind-style ease)

Best for: rapid prototyping, marketing sites, projects coming from Tailwind.

```html
<link rel="stylesheet" href="@verobee/design/utilities/full.css">

<button class="vds-bg-primary vds-text-primary-fg vds-p-3 vds-rounded-md">
  Click
</button>
```

## Mode C — UnoCSS JIT (production performance)

Best for: production apps wanting JIT (only used utilities ship), Vite-based stacks.

```js
// uno.config.ts
import { defineConfig } from 'unocss'
import { presetVerodesign } from '@verobee/design/uno-preset'

export default defineConfig({
  presets: [presetVerodesign({ theme: 'veronex' })]
})
```

```html
<button class="vds-bg-primary vds-p-3 vds-rounded-md">Click</button>
```

JIT extracts only classes used in your code; resulting bundle is minimal.

## Mode D — Tailwind plugin (legacy migration)

Best for: existing Tailwind projects mid-migration.

```js
// tailwind.config.js
const verodesignPlugin = require('@verobee/design/tailwind-plugin')

module.exports = {
  plugins: [verodesignPlugin({ theme: 'veronex' })]
}
```

Plugin maps Tailwind utility names to verodesign tokens. Once Tailwind is fully removed, switch to Mode B or C.

## Theme switching at runtime

```html
<html data-theme="veronex">
  <head>
    <script src="@verobee/design/theme-init.js"></script>
    <link rel="stylesheet" href="@verobee/design/css/themes/veronex.css">
    <link rel="stylesheet" href="@verobee/design/css/themes/verobase.css">
  </head>
</html>
```

```js
// Programmatic switch
document.documentElement.setAttribute('data-theme', 'verobase');
localStorage.setItem('vds:theme', 'verobase');
```

## Mode switching (light/dark)

```html
<!-- Auto (follows prefers-color-scheme) -->
<html data-theme="veronex">

<!-- Explicit light -->
<html data-theme="veronex" data-mode="light">

<!-- Explicit dark -->
<html data-theme="veronex" data-mode="dark">
```

## Framework-specific examples

### Next.js (React)

```tsx
// app/layout.tsx
import "@verobee/design/css/reset.css"
import "@verobee/design/css/core.css"
import "@verobee/design/css/themes/veronex.css"
import "@verobee/design/utilities/full.css"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="veronex">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `(function(){var t=localStorage.getItem('vds:theme')||'veronex';document.documentElement.setAttribute('data-theme',t);})();`
        }} />
      </head>
      <body className="vds-bg-page vds-text-primary">{children}</body>
    </html>
  )
}
```

### SvelteKit

```html
<!-- src/app.html -->
<!doctype html>
<html lang="en" data-theme="default">
<head>
  <link rel="stylesheet" href="%paths.assets%/vendor/vds/core.css">
  <link rel="stylesheet" href="%paths.assets%/vendor/vds/themes/default.css">
  <link rel="stylesheet" href="%paths.assets%/vendor/vds/utilities/full.css">
</head>
<body><div data-sveltekit-preload-data="hover">%sveltekit.body%</div></body>
</html>
```

### Nuxt (Vue)

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: [
    '@verobee/design/css/reset.css',
    '@verobee/design/css/core.css',
    '@verobee/design/css/themes/default.css',
    '@verobee/design/utilities/full.css'
  ],
  app: { head: { htmlAttrs: { 'data-theme': 'default' } } }
})
```

### SolidStart

```tsx
// src/entry-server.tsx
import "@verobee/design/css/themes/default.css"
import "@verobee/design/utilities/full.css"
```

### Astro

```astro
---
import "@verobee/design/css/themes/default.css"
import "@verobee/design/utilities/full.css"
---
<html data-theme="default">
  <body>...</body>
</html>
```

### Tauri (any frontend)

Tauri uses a system webview. Whatever frontend framework you use (React, Vue, Svelte, ...), the CSS imports are identical. No Tauri-specific changes needed for verodesign tokens.

```tsx
import "@verobee/design/css/themes/veronex.css"
import "@verobee/design/utilities/full.css"

export function App() {
  return (
    <div data-theme="veronex" className="vds-bg-page">
      <header data-tauri-drag-region className="vds-bg-elevated vds-h-9">
        {/* custom Tauri titlebar */}
      </header>
      <main>...</main>
    </div>
  )
}
```

### Vanilla HTML / HTMX / static sites

```html
<!doctype html>
<html lang="en" data-theme="default">
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/.../verobee-design/css/themes/default.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/.../verobee-design/utilities/full.css">
</head>
<body class="vds-bg-page vds-text-primary"></body>
</html>
```

## Framework support matrix

| Framework | Mode A | Mode B | Mode C | Mode D |
| --------- | ------ | ------ | ------ | ------ |
| React / Next.js | Yes | Yes | Yes | Yes |
| Vue / Nuxt | Yes | Yes | Yes | Yes |
| Svelte / SvelteKit | Yes | Yes | Yes | Yes |
| Solid / SolidStart | Yes | Yes | Yes | Yes |
| Angular | Yes | Yes | (n/a, no UnoCSS) | Yes |
| Astro | Yes | Yes | Yes | Yes |
| Qwik / Qwik City | Yes | Yes | Yes | Yes |
| Remix | Yes | Yes | Yes | Yes |
| Lit / Web Components | Yes (via constructable stylesheets) | Yes | (n/a) | (n/a) |
| Preact | Yes | Yes | Yes | Yes |
| HTMX / vanilla HTML | Yes | Yes | (n/a) | (n/a) |
| Tauri Desktop | Yes (via above frameworks) | Yes | Yes | Yes |
| Tauri Mobile | Yes (via above frameworks) | Yes | Yes | Yes |
| Electron / Capacitor / PWA | Yes | Yes | Yes | Yes |

## Custom theme (external user)

External users build their own theme without forking the repo:

```bash
# 1. Copy template
cp node_modules/@verobee/design/tokens/themes/_template-light.json my-light.json
cp node_modules/@verobee/design/tokens/themes/_template-dark.json  my-dark.json

# 2. Edit OKLCH values

# 3. Build (validates DTCG, parity, WCAG)
npx vds build-theme \
  --light my-light.json \
  --dark my-dark.json \
  --name my-theme \
  --out ./public/my-theme.css

# 4. Use
# <link rel="stylesheet" href="/my-theme.css">
# <html data-theme="my-theme">
```

## Migration path from Tailwind

| Phase | Action |
| ----- | ------ |
| 1 | Install `@verobee/design`, add Mode D (Tailwind plugin) |
| 2 | Replace Tailwind config with verodesign plugin output |
| 3 | Migrate components from `bg-blue-500` style to `vds-bg-primary` style |
| 4 | Remove Tailwind dependency, switch Mode D → Mode B or C |

Plugin provides `bg-{vds-color}` class aliases during migration.
