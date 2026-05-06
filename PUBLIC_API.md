# Verodesign — Public API Contract

> Last updated: 2026-05-06 | Architecture SDD: [`.specs/verodesign/2026-05-06-greenfield-architecture.md`](./.specs/verodesign/2026-05-06-greenfield-architecture.md)

This file defines what consumers of `@verobee/*` packages may rely on,
what is experimental, and what is internal. SemVer rules apply only to
the **Frozen** surface.

## ✅ Frozen — semver-protected

A breaking change to anything below requires a **major version bump** of the
owning package and ships with a corresponding codemod in `@verobee/codemods`.

### CSS variables

| Pattern | Owned by | Examples |
| ------- | -------- | -------- |
| `--vds-theme-bg-*` | `@verobee/spec` (slot names) + `@verobee/theme-*` (values) | `--vds-theme-bg-page`, `--vds-theme-bg-card`, `--vds-theme-bg-selected` |
| `--vds-theme-text-*` | same | `--vds-theme-text-primary`, `--vds-theme-text-dim` |
| `--vds-theme-border-*` | same | `--vds-theme-border-default` |
| `--vds-theme-{primary,accent,destructive,success,warning,error,info,neutral}[-fg|-ring]` | same | `--vds-theme-primary` |
| `--vds-theme-chart-{1..5}` | same | — |
| `--vds-spacing-{0..96, 0.5, 1.5, 2.5, 3.5, px}` | `@verobee/primitive` | `--vds-spacing-4` |
| `--vds-radius-{none,xs,sm,md,lg,xl,2xl,full}` | `@verobee/primitive` | `--vds-radius-md` |
| `--vds-color-{hue}-{1..12}` | `@verobee/primitive` | `--vds-color-slate-7` |

### Utility classes

| Pattern | Owned by | Notes |
| ------- | -------- | ----- |
| `vds-bg-*`, `vds-text-*`, `vds-border-*` | `@verobee/utilities` | One per semantic slot |
| `vds-{p,m,gap,space-y,space-x}-{step}` | `@verobee/utilities` | spacing scale |
| `vds-{flex,grid,block,inline,hidden,...}` | `@verobee/utilities` | display/layout primitives |
| `vds-text-{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl}` | `@verobee/utilities` | type scale |
| `vds-font-{normal,medium,semibold,bold,mono}` | `@verobee/utilities` | weight + family |
| `vds-rounded-{sm,md,lg,xl,2xl,full}` | `@verobee/utilities` | radius scale |
| `vds-{hover,focus,disabled,placeholder,last,first,group-hover,active,focus-visible}:*` | `@verobee/utilities` | state variants |
| `vds-{sm,md,lg,xl,2xl}:*` | `@verobee/utilities` | responsive (viewport-based) |
| `vds-bg-{name}/{N}` (alpha) | `@verobee/utilities` | `vds-bg-primary/10` |

### Custom Element tags

| Tag | Owned by | Frozen since |
| --- | -------- | ------------ |
| `vds-button` | `@verobee/design-elements` | v0.2.0 |
| `vds-card` | same | v0.2.0 |
| `vds-dialog` | same | v0.2.0 |
| `vds-tabs`, `vds-tab`, `vds-tab-panel` | same | v0.2.0 |
| `vds-text-field` | same | v0.2.0 |
| `vds-text-area` | same | v0.2.0 |
| `vds-menu`, `vds-menu-item` | same | v0.2.0 |
| `vds-toast`, `vds-toast-group` | same | v0.2.0 |
| `vds-checkbox` | same | v0.2.0 |
| `vds-switch` | same | v0.2.0 |
| `vds-select`, `vds-option` | same | v0.2.0 |
| `vds-badge` | same | v0.2.0 |
| `vds-table` | same | v0.2.0 |
| `vds-tooltip` | same | v0.2.0 |
| `vds-separator` | same | v0.2.0 |
| `vds-label` | same | v0.2.0 |

The component **props/attributes** and **events** for each tag are also
Frozen — see each component's `Custom Elements Manifest` entry at
`@verobee/design-elements/dist/custom-elements.json`.

### Cascade layers

`@layer reset, base, vds-tokens, vds-utilities, components, overrides;`

This layer order is part of the public contract. Consumers may add their
own `overrides` layer; do not redefine the lower layers.

### Theme switching contract

| HTML attribute | Values | Effect |
| -------------- | ------ | ------ |
| `data-theme` | `verobase`, `veronex`, `default` | Selects active theme bindings |
| `data-mode` | `light`, `dark` | Selects light/dark mode within active theme |

## ⚠️ Experimental — may change without major bump

Use at your own risk. These exist to evolve patterns before promoting.

| Surface | Notes |
| ------- | ----- |
| `--vds-domain-*` (verobase-specific domain colors) | App-level token; will move to a verobase-specific package eventually |
| `data-experimental-*` HTML attributes | Marked components subject to API churn |
| Slot-projection (CSS `::slotted()`) selectors not documented in CEM | Internal styling hooks, not for consumer override |

## ❌ Internal — do not use

Subject to change at any time, no deprecation notice.

| Pattern | Why off-limits |
| ------- | -------------- |
| Tokens or class names beginning with `--_vds-*` or `vds-internal-*` | Implementation details |
| Custom element tags `<vds-x-*>` | Internal building blocks |
| Anything in a package's `dist/_internal/` | Subject to change |
| TypeScript exports marked `@internal` JSDoc | Compiler-only |

## Versioning policy

### When does each kind of change require what bump?

| Change | Bump | Codemod required? |
| ------ | ---- | ----------------- |
| Add new semantic slot (in `@verobee/spec`) | minor | No |
| Rename or remove semantic slot | **major** | Yes |
| Add new value to a theme | patch | No |
| Visually significant color shift (≥ ΔE 5) in a theme | minor | No |
| Add new utility class | minor | No |
| Rename utility class | **major** | Yes |
| Add new component tag | minor | No |
| Change component prop default | minor | No |
| Rename component prop or breaking event payload change | **major** | Yes |
| Change cascade layer order | **major** | Yes |
| Add new brand theme package | new package at `1.0.0`, no bump elsewhere | No |

### Deprecation cycle

When deprecating any Frozen surface:

1. Mark with `@deprecated` JSDoc + emit `console.warn` in dev builds.
2. Maintain working behavior for **at least 6 months**.
3. Provide codemod in `@verobee/codemods`.
4. Remove only at next major bump.

## Channels

- `latest` (npm dist-tag) — production-ready, semver-disciplined.
- `next` (npm dist-tag) — experimental, may break.

Apps should pin to specific `latest` versions. Use `next` only for opt-in
testing of upcoming breaking changes.

## See also

- [SDD: Greenfield architecture](./.specs/verodesign/2026-05-06-greenfield-architecture.md)
- [Token CHANGELOG](./docs/llm/tokens/CHANGELOG.md)
- [Per-package CHANGELOGs](./packages/*/CHANGELOG.md)
- [Migration guide v0→v1](./docs/llm/migrations/v0-to-v1.md)
