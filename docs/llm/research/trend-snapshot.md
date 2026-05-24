# Trend Snapshot

> CDD Layer 2 — Quarterly snapshot of design trends relevant to verodesign | **Last Updated**: 2026-04-30

## Format

Each snapshot is a dated section. Newest at top. Never edit past snapshots — append a new one each quarter.

## 2026 Q2 (May 21, 2026)

### Color & Tokens

| Trend | Status | Adopt? | Notes |
| ----- | ------ | ------ | ----- |
| W3C DTCG 2025.10 stable | Industry standard | YES | DTCG 선택 유지 |
| Style Dictionary v4 DTCG-first, v5 for fuller 2025.10 support | Mainstream | Evaluate | SD4 유지, v5 추적 |
| OKLCH-first token authoring | Mainstream | YES | 현 정책 선행 유지 |
| `light-dark()` color pairing | Mainstream | Evaluate | mode pair 단순화 가능 |

### Components

| Trend | Status | Adopt? | Notes |
| ----- | ------ | ------ | ----- |
| React 19 custom elements support | Industry standard | YES | CE 전략 리스크 감소 |
| Lit as CE authoring layer | Mainstream | YES | Lit 3 유지 가능 |
| CEM-backed component docs | Mainstream | Evaluate | 수기 문서 drift 축소 |
| Storybook 9 MDX docs | Mainstream | Evaluate | prose + examples 적합 |

### CSS Capabilities

| Trend | Status | Adopt? | Notes |
| ----- | ------ | ------ | ----- |
| Declarative Shadow DOM | Mainstream | YES | progressive enhancement로 사용 가능 |
| `color-mix()` alpha utilities | Mainstream | YES | 현 정책 부합 |
| CSS theme variables (`@theme`) | Mainstream | Evaluate | CSS-first output 강화 근거 |
| `@property` typed custom props | Mainstream | YES | 성능/타입 장점 유지 |

### Accessibility

| Trend | Status | Adopt? | Notes |
| ----- | ------ | ------ | ----- |
| WCAG 2.2 current baseline | Industry standard | YES | wording 갱신 필요 |
| WCAG 3 / APCA | Working draft | Defer | stable 전 도입 보류 유지 |
| APG as informative implementation guide | Industry standard | YES | normative 아님 명시 필요 |
| Form-associated custom elements | Mainstream | YES | FACE 유지 가능 |

### Tooling

| Trend | Status | Adopt? | Notes |
| ----- | ------ | ------ | ----- |
| Per-theme stable role names | Industry standard | YES | brand isolation 정책 정합 |
| Docs + manifest dual-source pipelines | Mainstream | Evaluate | component canon 보강 필요 |
| Workflow-specialized design system ops | Emerging mainstream | Evaluate | component workflow 부재가 현재 gap |
| Storybook AI manifests | Preview | Defer | React-only preview |

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
