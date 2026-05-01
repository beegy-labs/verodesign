# Workflow: Consumer Update

> ADD execution prompt | **Last Updated**: 2026-04-30

## Purpose

Update consumer projects (veronex, verobase) to use a new verodesign version.

## Pre-reads (required)

| File |
| ---- |
| `docs/llm/tokens/CHANGELOG.md` (target version section) |
| `docs/llm/build/consumer.md` |
| Target consumer's existing `tokens.css` or import statements |

## Inputs

| Field | Required |
| ----- | -------- |
| Consumer project path | Yes (e.g., `~/workspace/labs/veronex/web/`) |
| Target verodesign version | Yes (`v0.X.Y`) |
| Theme slug | Yes (`veronex`, `verobase`, `default`) |

## Steps

| # | Action | Output |
| - | ------ | ------ |
| 1 | Read CHANGELOG entry for target version — note any breaking changes | Awareness of required code changes |
| 2 | Update consumer's `package.json` dependency: `"@verobee/design": "github:beegy-labs/verodesign#vX.Y.Z"` | Pinned version |
| 3 | Run package manager install (`npm install` / `pnpm install` / etc.) | Updated lockfile |
| 4 | Replace consumer's existing `tokens.css` import with `@verobee/design/css/themes/{theme}.css` | Updated import |
| 5 | Add `@verobee/design/css/core.css` import (if not yet present) | Core imported |
| 6 | Add `@verobee/design/utilities/full.css` import (if utility classes used) | Utilities imported |
| 7 | Set `<html data-theme="{theme}">` on consumer's root element | Theme attribute |
| 8 | Add `theme-init.js` snippet for FOUC prevention | Script added |
| 9 | If breaking changes in CHANGELOG: search-and-replace renamed tokens in consumer code | Migration applied |
| 10 | If consumer was using Tailwind classes that conflict: switch to `vds-*` prefix or use Tailwind plugin | Alignment |
| 11 | Run consumer's build/dev — verify visual regression | No visual issues |
| 12 | Commit: `chore(deps): bump @verobee/design to vX.Y.Z` (in consumer repo) | Commit |

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| Consumer build passes | Yes |
| No visual regression (manual check on key pages) | Yes |
| All `var(--theme-*)` references migrated to `var(--vds-theme-*)` | Yes |
| All Tailwind utility classes (if removing Tailwind) replaced with `vds-*` | Yes (in scope) |
| Lockfile updated | Yes |

## Migration patterns

| Before (legacy) | After (verodesign) |
| --------------- | ------------------ |
| `@import './tokens.css'` | `@import "@verobee/design/css/themes/veronex.css"` |
| `var(--theme-bg-page)` | `var(--vds-theme-bg-page)` |
| `class="bg-blue-500"` (Tailwind) | `class="vds-bg-primary"` |
| `class="dark:bg-card"` (Tailwind dark) | `class="vds-bg-card"` (theme handles mode) |
| `<html class="dark">` | `<html data-theme="veronex" data-mode="dark">` |

## Per-consumer specifics

### veronex/web

```ts
// app/layout.tsx
import "@verobee/design/css/reset.css"
import "@verobee/design/css/core.css"
import "@verobee/design/css/themes/veronex.css"
import "@verobee/design/utilities/full.css"

// Root attribute
<html lang="en" data-theme="veronex">
```

Delete: `web/app/tokens.css` (legacy, replaced).

### verobase/web/{accounts,dashboard,docs}

Same pattern as veronex but theme = `verobase`. Delete each app's local `tokens.css`.

## Failure modes

| Symptom | Action |
| ------- | ------ |
| Build fails on missing CSS variable | Search for unmigrated `--theme-*` references → update to `--vds-theme-*` |
| Visual regression in dark mode | Verify `data-mode` attribute or `prefers-color-scheme` working |
| Tailwind class still present | Either replace with `vds-*` OR keep Tailwind plugin temporarily |
| Theme switching not working at runtime | Verify `theme-init.js` runs before hydration |
