# Effects Tokens (Elevation / Motion / Blur)

> CDD Layer 2 — Token usage guide | **Last Updated**: 2026-05-16

This page documents the **canonical, brand-agnostic** effects token families:

- `elevation.*` (semantic) → references `shadow.*` (primitive)
- `motion.duration.*` + `motion.easing.*` (semantic) → references `duration.*` + `easing.*` (primitive)
- `blur.*` (semantic) → references `blur.*` (primitive)

These tokens are intended to standardize **depth**, **motion timing**, and **glass blur** across all consumer apps without changing any brand colors.

Reference SDD: `verodesign/.specs/verodesign/2026-05-16-girok-modern-expression.md`.

## Elevation

### Scale

- `elevation.0` … `elevation.5`

### Meaning (rule of thumb)

- `elevation.0`: flat surfaces (most lists, dense record screens, default card rest)
- `elevation.1`: reserved subtle lift for interactive or floating surfaces only
- `elevation.2`: reserved raised separation (rare; not default card/list rest)
- `elevation.3`: floating (dropdowns, fixed bottom nav container when floating)
- `elevation.4`: popover (context menus, tooltips containers)
- `elevation.5`: modal (dialogs / sheets)

### Rules

- Base resting surfaces stay flat: cards, dense lists, tables, stat tiles, and record-heavy screens default to `elevation.0`.
- Interactive surfaces and floating surfaces may use subtle lift, but keep them at or below `elevation.1` unless they are overlays.
- Floating regions such as fixed bottom nav, sheets, popovers, menus, and dialogs should prefer the lowest usable tier.
- Do not stack multiple elevated layers without a clear interaction reason.

## Motion

### Duration scale

- `motion.duration.instant` / `fast` / `base` / `slow`

### Easing scale

- `motion.easing.linear` / `standard` / `decelerate` / `accelerate` / `spring`

### Rules

- Use `motion.duration.fast` for feedback such as press state or tab selection.
- Keep component motion to one tokenized transition family per interaction path.
- Respect `prefers-reduced-motion: reduce` by removing the transition entirely.
- Use `motion.duration.base` for standard UI transitions.
- Use `motion.duration.slow` only for large layout changes or onboarding.
- `motion.easing.spring` is **surgical** (small, playful touches only).

## Blur (Glass)

### Scale

- `blur.none` / `sm` / `md` / `lg`

### Rules (non-negotiable)

- Glass blur is allowed only on **floating layers** (tab bar, dialogs, bottom sheets).
- Glass blur is **not** allowed on dense, scroll-heavy content surfaces (records, wealth tables).
- Always pair blur with a clear separation mechanism (border or elevation) so text remains legible.
- Contrast policy: meet **WCAG 2.1 AA minimum** for text (4.5:1) on glass surfaces; higher is optional.
