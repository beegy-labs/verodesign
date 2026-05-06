# SDD: Add `theme.bg.selected` semantic token

> Status: in progress | Driver: verobase shell unification | Reference: `docs/llm/decisions.md` § Token tier

## Why

verobase ships two parallel layout shells (`AppShell` for `/dashboard/*`, `AppSidebar` for `/admin/*`). Both render an identical 운영/서비스 segmented toggle and both reference the CSS classes `vds-bg-nav-active`, `vds-text-nav-active`, `vds-text-nav-inactive` for active-state styling. None of these classes exist in any verodesign output — the active segment renders with no visible background, making it impossible for users to tell which side is selected (reported via screenshot, 2026-05-06).

Root cause: there is no semantic slot for "selected/active surface" in `tokens/semantic/core.json`. The existing `bg.hover` slot is intended for transient pointer interaction, not a persistent selected state, and reusing it conflates two different UI states.

## Scope

Add ONE new semantic slot to the `bg` domain of `semantic/core.json`:

| Slot | Purpose |
| ---- | ------- |
| `theme.bg.selected` | Persistent surface highlight for selected/active items: segmented controls, selected list rows, active sidebar nav buttons. Must be visibly elevated above its immediate container (page/card) AND distinct from `bg.hover`. |

Active-state text reuses existing `theme.text.bright`. Inactive-state text reuses existing `theme.text.dim`. No new text slots needed.

## Out of scope

- New nav/segmented-control component primitive (deferred to verodesign component layer)
- Token renames or removals
- Theme palette restructuring

## Theme bindings

Each theme supplies a value such that the selected surface clearly reads as elevated above its container while staying distinct from hover.

| Theme | `bg.selected` value | Rationale |
| ----- | ------------------- | --------- |
| default-dark | `{color.slate.10}` | Brighter than card/hover ramp, AAA contrast for white text |
| verobase-dark | `oklch(35% 0.025 240)` | Clearly elevated above page (13%), card (17%), hover (28%) |
| verobase-light | `{color.white}` | Crisp white above slate.2 page background |
| veronex-dark | `{color.slate.10}` | Matches dark elevated convention |
| veronex-light | `{color.white}` | Matches light elevated convention |
| _template-dark | `{color.slate.10}` | Conservative default for new dark themes |
| _template-light | `{color.white}` | Conservative default for new light themes |

Default in `semantic/core.json`: `{color.white}` (matches default-light convention).

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| DTCG schema valid | Yes |
| References resolve | Yes |
| Slot parity across all `core` themes | Yes |
| WCAG contrast `text.bright` on `bg.selected` ≥ AA (4.5:1) | Yes |
| Build passes (`pnpm build`) | Yes |
| CHANGELOG `[Unreleased]` updated | Yes |

## Versioning impact

Patch — new semantic slot in existing group, no consumer break.

## Consumer migration (verobase)

After build + sync of `dist/css/utilities/full.css`, verobase replaces:

| Before | After |
| ------ | ----- |
| `vds-bg-nav-active vds-text-nav-active vds-shadow-sm` | `vds-bg-selected vds-text-bright vds-shadow-sm` |
| `vds-text-nav-inactive vds-hover:bg-hover vds-hover:text-fg` | `vds-text-dim vds-hover:bg-hover vds-hover:text-fg` |

The previously referenced `vds-bg-nav-active` / `vds-text-nav-active` / `vds-text-nav-inactive` classes are removed entirely from verobase source. They were never defined anywhere, so this is a fix, not a deprecation.
