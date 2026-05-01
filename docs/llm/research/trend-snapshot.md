# Trend Snapshot

> CDD Layer 2 — Quarterly snapshot of design trends relevant to verodesign | **Last Updated**: 2026-04-30

## Format

Each snapshot is a dated section. Newest at top. Never edit past snapshots — append a new one each quarter.

## 2026 Q2 (April 30, 2026)

### Color & Tokens

| Trend | Status | Adopt? | Notes |
| ----- | ------ | ------ | ----- |
| W3C DTCG stable spec adoption | Industry standard | YES (already adopted) | First stable shipped 2025-10 |
| oklch / color-mix() in tokens | Emerging mainstream | Evaluate | Better perceptual uniformity vs hex |
| Display-P3 wide gamut tokens | Emerging | Defer | Limited consumer benefit until P3 displays widespread |
| Multi-brand via token swap | Industry standard | YES (already adopted) | |

### Components

| Trend | Status | Adopt? | Notes |
| ----- | ------ | ------ | ----- |
| Headless UI + own styles | Industry standard | YES | Radix + CSS Modules path |
| Variant-driven component APIs (CVA) | Mainstream | Evaluate | When `@verobee/design-react` ships |
| `popover` HTML attribute | New native | Evaluate | Eliminates Dialog library deps in some cases |
| `<dialog>` element with form integration | Stable | Evaluate | Native modal alternative |

### CSS Capabilities

| Trend | Status | Adopt? | Notes |
| ----- | ------ | ------ | ----- |
| `@layer` cascade layers | Stable | YES | Use to isolate tokens vs overrides |
| `@scope` style scoping | Newer | Evaluate | Useful for component encapsulation |
| `@container` queries | Stable | Evaluate | Replaces some media-query patterns |
| `:has()` parent selector | Stable | YES | Eliminates many JS-driven class toggles |
| `@starting-style` for entry transitions | Newer | Evaluate | Cleaner enter/leave |

### Accessibility

| Trend | Status | Adopt? | Notes |
| ----- | ------ | ------ | ----- |
| WCAG 3 draft (APCA contrast) | Working draft | Defer | Stick with WCAG 2.1 until 3 stable |
| `prefers-reduced-motion` token-aware | Mainstream | Evaluate | Add motion tokens with reduced variants |
| `prefers-contrast: more` mode | Emerging | Evaluate | High-contrast theme as future brand variant |

### Tooling

| Trend | Status | Adopt? | Notes |
| ----- | ------ | ------ | ----- |
| Style Dictionary v4 DTCG native | Industry standard | YES (already adopted) | |
| Lightning CSS bundling | Mainstream | Evaluate | Faster than postcss for token output |
| Token Studio Figma sync | Mainstream | Defer | Adopt only when designer joins |

## How to Add a New Snapshot

1. Copy this template (same column structure)
2. Date it (YYYY Q{1-4})
3. Update the status/adopt columns
4. Compare to previous snapshot — items that moved categories deserve a SDD spec
5. Run `.add/pattern-research.md` to fill any blanks

## What to Capture per Trend

| Field | Required |
| ----- | -------- |
| Trend name | YES |
| Status (working draft / emerging / mainstream / industry standard) | YES |
| Adopt? (YES / Evaluate / Defer / NO) | YES |
| Notes (≤80 chars) | YES |
| Source URL | If `Adopt? === YES`, mandatory in the corresponding pattern-catalog entry |
