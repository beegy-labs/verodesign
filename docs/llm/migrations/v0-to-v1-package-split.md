# Migration: v0 → v1 — `@verobee/design` → 7-layer split

> Status: archived reference | Codemod: `@verobee/codemods` `v0-to-v1` | SDD: [`.specs/verodesign/2026-05-06-greenfield-architecture.md`](../../../.specs/verodesign/2026-05-06-greenfield-architecture.md)

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
| `@verobee/codemods` | Migration scripts | (new) |
| `@verobee/cli` | `vds new-brand`, `vds doctor` | (new) |
| `@verobee/showcase` | Astro docs site (private) | (new) |

## Why migrate

- Each consumer pins exact versions of each package
- Brand isolation: theme-X changes never touch theme-Y consumers
- Deployment isolation: verodesign changes do not auto-trigger consumer rebuilds

## Steps

### 1. Add `.npmrc` to each consumer app

```text
@verobee:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
auto-install-peers=true
```

### 2. Update consumer `package.json`

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

### 4. Install + verify

```bash
export GITHUB_TOKEN=ghp_...
pnpm install
pnpm typecheck
pnpm test
pnpm build
```
