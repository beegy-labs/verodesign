# Pattern Spacing Contract

> CDD Layer 2 — Pattern spacing ownership and enforcement | **Last Updated**: 2026-05-23

## Decision

| Topic | Rule |
| ----- | ---- |
| Outer spacing owner | Consumer wrapper / layout primitive |
| Internal spacing owner | Pattern root and pattern internals |
| Forbidden in pattern CSS | `margin`, consumer-facing outer padding |
| Required containment | Wrap pattern CSS in `@scope` |

## Definitions

| Term | Meaning | Example |
| ---- | ------- | ------- |
| Outer spacing | Space that positions a pattern among siblings or page sections | `margin-block`, calendar wrapper bottom spacing |
| Internal spacing | Space that shapes content inside the pattern boundary | sheet body padding, tab chip inset, cell gap |
| Consumer wrapper | App-owned layout element around a pattern | `.girok-ledger-calendar-wrap` |
| Scoped pattern CSS | Pattern rules wrapped in `@scope (<root>)` with `:scope` for root styles | `@scope (.vds-pattern-girok-stats) { :scope { ... } .vds-pattern-girok-stats__cell { ... } }` |

## Rules

| ID | Rule | Enforcement |
| -- | ---- | ----------- |
| SC-1 | Pattern CSS emits `0` margin properties | `packages/design/scripts/audit-pattern-spacing.mjs` |
| SC-2 | Pattern CSS does not encode consumer-facing outer padding | audit + intake/promote gates |
| SC-3 | Internal padding is allowed when it defines pattern anatomy | manual review + audit exceptions |
| SC-4 | Consumer wrappers own inter-pattern spacing | CDD policy + consumer code review |
| SC-5 | Pattern CSS ships inside `@scope` blocks | source audit |

## Examples

| Case | Status | Reason |
| ---- | ------ | ------ |
| `.vds-pattern-girok-calendar { padding-bottom: ... }` | Forbidden | Adds page-level trailing space |
| `.girok-ledger-calendar-wrap { padding-bottom: ... }` | Allowed | Consumer controls section spacing |
| `.vds-pattern-bottomsheet__body { padding: 0 x y }` | Allowed | Sheet-internal content inset |
| `.vds-pattern-girok-tab-l1__scroll { padding-inline: ... }` | Allowed exception | Scroll viewport inset belongs to the pattern |

## Exceptions

| Selector | Exception type | Reason |
| -------- | -------------- | ------ |
| `.vds-pattern-bottomsheet__header` | Internal padding | Header anatomy |
| `.vds-pattern-bottomsheet__body` | Internal padding | Scrollable content inset |
| `.vds-pattern-bottomsheet__footer` | Internal padding | CTA/footer anatomy |
| `.vds-pattern-girok-tab-l1__scroll` | Internal inset | Scroll viewport breathing room |

## Enforcement

| Layer | Action |
| ----- | ------ |
| CDD | This document + `decisions.md` + `.ai/rules.md` |
| ADD | `pattern-intake.md`, `pattern-promote.md`, `pattern-spacing-audit.md` |
| Build | `packages/design/scripts/audit-pattern-spacing.mjs` |
| Source | `packages/design/src/build/emit-static.mjs` `@scope` wrapping |

## Browser Policy

| Item | Verified status |
| ---- | --------------- |
| `@scope` syntax | Supported in Chrome/Edge 118+, Safari/iOS 17.4+ |
| Firefox support | Supported in Firefox 146+ as verified 2026-05-23 |
| Baseline note | MDN marks `@scope` Baseline 2025, newly available since December 2025 |
| Fallback | Unsupported browsers degrade to unscoped selectors; no outer spacing accumulates because pattern CSS no longer emits it |

## Industry References

| Source | Relevance | URL |
| ------ | --------- | --- |
| EightShapes — Nathan Curtis, "Space in Design Systems" | Separates inset/stack/grid concepts from raw CSS properties | https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62 |
| Eric Bailey, "Where do you put spacing on design system components?" | Places positional spacing in system-level abstractions, not ad hoc component leakage | https://ericwbailey.design/published/where-do-you-put-spacing-on-design-system-components/ |
| Carbon Spacing | Explicitly separates component spacing from layout stacking utilities | https://carbondesignsystem.com/elements/spacing/overview/ |
| Adobe Spectrum Design Tokens | Treats spacing as tokenized component/layout decisions, not hardcoded per-consumer overrides | https://spectrum.adobe.com/page/design-tokens/ |
| MDN `@scope` | Canonical syntax and Baseline record | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@scope |
| Can I use `@scope` | Current browser-version verification | https://caniuse.com/mdn-css_at-rules_scope |
