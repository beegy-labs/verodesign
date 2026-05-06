# Migration: v0 → v1 — `@verobee/design` → 7-layer split

> Status: ready | Codemod: `@verobee/codemods` `v0-to-v1` | SDD: [`.specs/verodesign/2026-05-06-greenfield-architecture.md`](../../../.specs/verodesign/2026-05-06-greenfield-architecture.md)

## What changed

Pre-v1: a single monolithic `@verobee/design` package contained the spec,
primitives, themes, utility CSS generator, and build pipeline.

v1+: split into 7 packages with independent versioning:

| New package | Responsibility | Replaces (in `@verobee/design`) |
| ----------- | -------------- | ------------------------------- |
| `@verobee/spec` | DTCG schema (semantic slots) | `tokens/semantic/*` |
| `@verobee/primitive` | Raw color ramps, spacing, etc. | `tokens/primitive/*`, `dist/css/core.css` |
| `@verobee/theme-verobase` | Verobase brand values | `tokens/themes/verobase-*.json`, `dist/css/themes/verobase.css` |
| `@verobee/theme-veronex` | Veronex brand values | `tokens/themes/veronex-*.json`, `dist/css/themes/veronex.css` |
| `@verobee/theme-default` | Reference theme | `tokens/themes/default-*.json` |
| `@verobee/utilities` | `vds-*` utility CSS | `dist/utilities/full.css` etc. |
| `@verobee/codemods` | Migration scripts (this codemod lives here) | (new) |
| `@verobee/cli` | `vds new-brand`, `vds doctor` | (new) |
| `@verobee/showcase` | Astro docs site (private) | (new) |

The existing `@verobee/design-elements` (Lit components) and
`@verobee/design-react` (adapters) packages are unchanged in scope but
gain an exported Custom Elements Manifest at
`@verobee/design-elements/dist/custom-elements.json`.

## Why migrate

Before:

- A change to verodesign affects all consumers immediately
- veronex theme work could break verobase
- No way to pin specific verodesign versions per app

After:

- Each consumer pins exact versions of each package
- Brand isolation: theme-X changes never touch theme-Y consumers
- Deployment isolation: verodesign changes do not auto-trigger consumer rebuilds

## Steps

### 1. Add `.npmrc` to each consumer app

```
@verobee:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
auto-install-peers=true
```

### 2. Update consumer `package.json`

Replace the single `@verobee/design` dependency with pinned packages:

```diff
 {
   "dependencies": {
-    "@verobee/design": "0.x.x",
+    "@verobee/spec":            "1.0.0",
+    "@verobee/primitive":       "1.0.0",
+    "@verobee/theme-verobase":  "1.0.0",
+    "@verobee/utilities":       "1.0.0",
+    "@verobee/design-elements": "0.2.0",
+    "@verobee/design-react":    "0.2.0"
   }
 }
```

### 3. Run the codemod

```bash
npx @verobee/codemods v0-to-v1 ./web/dashboard
```

Rewrites:

- CSS `@import "../styles/verodesign/*.css"` → `@import "@verobee/{primitive|theme-X|utilities}/css/*.css"`
- JS imports referencing `@verobee/design/css/*` → corresponding `@verobee/utilities/css/*` paths

### 4. Install + verify

```bash
export GITHUB_TOKEN=ghp_...   # PAT with read:packages
pnpm install
pnpm typecheck
pnpm test
pnpm build
```

### 5. Delete vendored CSS (if applicable)

If your app vendored verodesign CSS via a sync script:

```bash
rm -rf styles/verodesign/
rm scripts/sync-verodesign.sh
```

## Rollback

If the migration breaks anything:

```bash
git revert HEAD       # revert the migration commit(s)
pnpm install          # restore lockfile
```

Or restore from the pre-migration snapshot at
`/Users/vero/workspace/beegy/.snapshots/dashboard-pre-optimize-20260506-102350`.

## After migration

Each app now controls its verodesign upgrade cadence:

```bash
# Bump one package
pnpm update @verobee/theme-verobase@latest

# Bump all
pnpm update '@verobee/*'
```

A change to `@verobee/theme-veronex` produces zero diff in your app's
build output until you opt to install it.
