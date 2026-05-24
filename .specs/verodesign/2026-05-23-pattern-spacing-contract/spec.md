# Pattern Spacing Contract — verodesign governance reset

> Date: 2026-05-23
> Owner: vero / Builder: Codex
> Scope: CDD + ADD + SDD + impl. Structural fix, not a patch.
> Driver: P15-P19 of `app-girok` exposed repeated "double padding accumulation" between verodesign patterns and consumer wrappers. Root cause is governance, not implementation.

## Problem

verodesign patterns (`.vds-pattern-*`) and consumer wrappers (e.g., `.girok-ledger-*`) both write `padding`/`margin` on their own classes. When a consumer wraps a pattern, paddings stack visually but neither side knows about the other. CSS cascade does not catch this — both classes apply cleanly to different DOM nodes. Result: every token tweak in P15-P19 broke something else.

This is a governance gap, not a CSS bug. The contract for "who owns spacing" is missing.

## Industry consensus (2026)

EightShapes (Nathan Curtis), Carbon Design System, Adobe Spectrum, Eric Bailey (Cloudscape), CSS-Tricks all converge:

| Owns | Property | Reason |
| ---- | -------- | ------ |
| Pattern (component) | `padding` (internal element relationships) | Component-internal layout is component's concern |
| Container (consumer / Layout primitive) | `margin`, outer `padding`, gap between siblings | Position in page is the page's concern |

Source URLs:
- https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62
- https://ericwbailey.website/published/where-do-you-put-spacing-on-design-system-components/
- https://carbondesignsystem.com/elements/spacing/overview/
- https://spectrum.adobe.com/page/design-tokens/
- https://css-tricks.com/component-spacing-design-system/

## Decision

Adopt the contract as a verodesign LOCKED DECISION. Apply to all patterns. Audit all existing patterns. Enforce via `@scope` (CSS 2026 Baseline) and pattern intake/promote gates.

## Deliverables

### A. CDD updates (policy / knowledge)

| File | Change |
| ---- | ------ |
| `docs/llm/decisions.md` | Add new "Pattern spacing contract" row under Architecture or new "Patterns" subsection |
| `.ai/rules.md` | Add to NEVER table: "Pattern emits margin or outer padding" → alternative "Internal padding only; consumer wrap owns outer spacing" |
| `.ai/rules.md` | Add to ALWAYS table: "Wrap pattern CSS in `@scope` block" |
| `docs/llm/patterns/spacing-contract.md` | New file. Full policy: definitions, examples, enforcement, exceptions |
| `PUBLIC_API.md` | Pattern API section gains spacing rule reference |
| `docs/llm/research/pattern-catalog.md` | Add column "spacing-audit" with status per pattern (clean / migrating / violating) |

### B. ADD updates (workflows)

| File | Change |
| ---- | ------ |
| `.add/pattern-intake.md` | Add acceptance gate: "Pattern CSS contains 0 `margin` properties and 0 outer `padding` shorthand. Inner-element padding OK." |
| `.add/pattern-promote.md` | Add promotion gate: "Spacing contract audit passes" |
| `.add/pattern-spacing-audit.md` | New workflow. Audit a pattern; report violations; remediation steps |
| `.add/codex-delegate.md` | Add to Codex prompt template: "Verify spacing contract before returning" |

### C. Implementation: girok patterns audit + fix

| Pattern | Violation | Remediation |
| ------- | --------- | ----------- |
| `vds-pattern-girok-calendar` | `padding: 0 0 var(--vds-spacing-6)` (bottom = outer) | Remove bottom padding; consumer `.girok-ledger-calendar-wrap` owns it |
| `vds-pattern-girok-tab-l1__scroll` | `padding: 0 var(--vds-spacing-4)` (left/right = outer scroll-inset) | Reclassify: this is internal scroll-viewport inset, KEEP. Document as exception |
| `vds-pattern-girok-bottomsheet__body` | `padding: 0 var(--vds-spacing-6) var(--vds-spacing-5)` | Reclassify: sheet-internal content padding, KEEP (sheet is the container) |
| `vds-pattern-girok-bottomsheet__footer` | `padding: var(--vds-spacing-3) var(--vds-spacing-6) var(--vds-spacing-6)` | Reclassify: sheet-internal footer padding, KEEP |
| `vds-pattern-girok-bottomsheet__header` | `padding: var(--vds-spacing-4) var(--vds-spacing-6)` | Reclassify: sheet-internal, KEEP |

All other girok patterns audited — internal-only padding (cell padding, item padding, gap). No violations.

Full audit table in implementation appendix.

### D. CSS @scope enforcement (2026 baseline)

Wrap each girok pattern in `@scope`:

```css
@scope (.vds-pattern-girok-stats) to (.vds-pattern-girok-stats *) {
  /* internal rules — consumer .girok-ledger-stats-wrap cannot reach inside */
}
```

Browser support: Chrome 118+, Safari 17.4+, Firefox 128+ — all qualify as Baseline Newly Available 2026. Tauri WebKit (iOS 17+) supports.

Fallback: when `@scope` unsupported, rules degrade to plain selectors with same behavior (no extra padding leak since pattern itself doesn't emit outer spacing after C).

### E. dreamstock removal (cleanup, separable)

| File | Action |
| ---- | ------ |
| `packages/design/tokens/experimental/dreamstock-simulator.json` | Delete |
| `.specs/verodesign/2026-05-10-pattern-dreamstock-simulator.md` | Delete |
| `docs/llm/research/pattern-catalog.md` row `dreamstock-simulator` | Delete row |
| Catalog rows with `source: internal:dreamstock` | Keep (historical record of where pattern came from; pattern itself promoted to girok already) |
| `dist/*` references | Auto-cleaned on rebuild |

### F. Build + verify

| Step | Command |
| ---- | ------- |
| Rebuild | `pnpm --filter "@verobee/*" build` |
| Verify dreamstock gone from dist | `rg dreamstock packages/design/dist/` returns 0 |
| Verify pattern audit | `pnpm -C packages/design exec node scripts/audit-pattern-spacing.mjs` (new script per workflow B.3) returns 0 violations |
| Showcase | If showcase consumes girok patterns, verify no regression |

## Out of scope

- Layout primitive (`vds-stack`, `vds-cluster`) — Carbon Stack equivalent. Future P21 if multiple apps demand. Today's spacing contract is sufficient without it.
- Promoting `vds-pattern-girok-*` from experimental → canonical. Stays experimental.
- `@scope` for all verodesign patterns (dreamstock-equivalent legacies). Scope = girok only this pass.
- Component-tier tokens layer (Tier 3 reserved). Today's `exp.girok-redesign.{component}.{property}` is sufficient.

## Acceptance

| Gate | Required |
| ---- | -------- |
| New CDD docs exist (A) | Yes |
| Updated ADD workflows mention spacing contract gate (B) | Yes |
| New `.add/pattern-spacing-audit.md` exists and runs | Yes |
| Girok pattern violations remediated per table (C) | Yes |
| `@scope` wrapping in girok pattern CSS (D) | Yes |
| dreamstock removed (E) | Yes |
| `pnpm build` passes (F) | Yes |
| `app-girok` rebuilt without regression (sibling SDD) | Yes |

## Response (≤500 tokens)

- Files changed (CDD/ADD/SDD/source/dist all categories)
- New decision rows added (decisions.md, rules.md, PUBLIC_API.md verbatim row)
- New ADD gates added (intake + promote, verbatim row)
- New `.add/pattern-spacing-audit.md` summary (workflow steps)
- Girok pattern remediation: which CSS rules removed/kept
- `@scope` wrapping syntax used (single example)
- dreamstock files deleted (count)
- Build result
- Edge cases / exceptions documented
