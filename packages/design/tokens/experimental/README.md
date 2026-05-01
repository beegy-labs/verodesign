# Experimental Tokens

> Isolated zone for unconfirmed tokens | **Last Updated**: 2026-04-30

## Purpose

Tokens that have been ingested via [`.add/pattern-intake.md`](../../.add/pattern-intake.md) live here until they pass the soak period and are promoted to canonical, OR are deprecated as unused/superseded.

## Rules

| Rule | Detail |
| ---- | ------ |
| Naming prefix | DTCG path uses `exp.*` namespace |
| CSS output prefix | `--vds-exp-*` (e.g., `--vds-exp-glass-bg`) |
| Required `$extensions.verobee.status` | `experimental` |
| Required `$extensions.verobee.source` | URL or rationale (must be non-empty) |
| Required `$extensions.verobee.since` | Version when ingested |
| Build behavior | Emits with prefix; consumer can opt-in by referencing `--vds-exp-*` |
| Promotion path | After soak period: see [`pattern-promote.md`](../../.add/pattern-promote.md) |
| Deprecation path | If unused 90 days: see [`pattern-deprecate.md`](../../.add/pattern-deprecate.md) |

## File pattern

```
tokens/experimental/
├── README.md                          this file
├── {pattern-slug}.json                one file per pattern
└── {another-pattern}.json
```

## Token file structure

```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
  "$extensions": {
    "verobee": {
      "status": "experimental",
      "since": "v0.X.Y",
      "source": "https://example.com/pattern-page",
      "implements": ["{slot-group}"]
    }
  },
  "exp": {
    "{pattern-domain}": {
      "{slot}": {
        "$value": "...",
        "$type": "color"
      }
    }
  }
}
```

## Build emission

Experimental tokens emit to `dist/css/themes/{theme}.css` alongside canonical tokens, but with `--vds-exp-*` prefix:

```css
:root, [data-theme="default"]:not([data-mode]),
[data-theme="default"][data-mode="light"] {
  /* canonical tokens */
  --vds-theme-bg-page: oklch(98% 0 0);

  /* experimental tokens */
  --vds-exp-glass-bg: oklch(95% 0.005 250 / 0.6);
}
```

Consumer references via `var(--vds-exp-*)` knowingly. Linter rule (when added) warns on `--vds-exp-*` usage in production code.

## Lifecycle

```
[1] pattern-research          (.add/pattern-research.md)
        │
        ▼
[2] pattern-intake            → tokens/experimental/{slug}.json
                              status: experimental
        │
        ▼ (2-week soak + 1 SDD spec + manual approval)
        ▼
[3] pattern-promote           → moves to tokens/{primitive,semantic}/
                              status: canonical
                              prefix changes: --vds-exp-* → --vds-*
        │
        OR
        ▼ (90 days unused)
        ▼
[3'] pattern-deprecate        → status: deprecated → removed in next release
```

## Catalog

All experimental patterns also tracked in [`docs/llm/research/pattern-catalog.md`](../../docs/llm/research/pattern-catalog.md) with lifecycle status.

## Currently empty

No experimental tokens at v0.0.1. Catalog: [`docs/llm/research/pattern-catalog.md`](../../docs/llm/research/pattern-catalog.md).
