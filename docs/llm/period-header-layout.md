# Period Header Layout (CDD pattern — not yet a component)

> Status: documented layout pattern. Authored 2026-05-20.
> **Implementation lives in app-girok** (HouseholdLedger.tsx) — verodesign
> ships this as a pattern reference, not yet as a reusable component.
> Graduation to a verodesign component (e.g. `PeriodHeader`) requires
> ≥2 cross-brand consumers (per pattern-intake workflow).

## Problem

A "period view" surface (ledger, journal, transactions) commonly needs
four controls in its header: a period-range identity (the "what date"),
a filter (the "what unit": month/week/range), a view-mode toggle (the
"how to render": calendar/list), and a primary action (e.g. 등록/Add).
Stacking them naively produces stacked rows that either truncate
(too crowded one row) or waste vertical space (too sparse multiple rows).

## Pattern

Two rows, only when the period model is **non-canonical** (week/range):

- **Row 1 — Identity + action**
  - Center: the date-range chip (`M.D ~ M.D` same-year, `YYYY.M.D ~ YYYY.M.D`
    cross-year). Chip = single source of truth: in *range* mode the chip is
    the in-place editor (no duplicate inline editor below); in *week* mode
    the chip is a read-only label with compact `‹/›` nav adjacent.
  - Right: primary action (Add/등록), `Button` ghost+border (outline).
- **Row 2 — Filter + view-mode**
  - Left: period-unit tabs (월/주/범위) — `Tabs variant='underline'`.
  - Right: view-mode segmented pill (calendar/list icons) — `Tabs
    variant='segmented'`, 2-option, AppIcon glyphs.

When the period model is **canonical** (month), collapse to a single
row: `[view-mode pill, label, prev/next, action]`.

## Why this layout

2026 best practices converge on:

- Segmented controls 2-5 options, mobile top-nav placement is canonical
  (Mobbin; Anvil; designsystems.surf).
- Filters and view toggles **visibly connected** in one filter context
  (UXmatters date filters).
- Finance density "complete and calm": neither sparse-wasted nor
  cluttered (procreator finance 2026).
- Decision confidence: date identity prominent, primary action distinct
  from state controls.

Grouping `filter (월/주/범위)` with `view-mode (calendar/list)` on Row 2
makes filter+toggle a single visual cluster (data-shaping controls);
Row 1 then carries data identity (chip) + outward action (Add). The
two-row split is justified only when one row would truncate or stack
related controls awkwardly — i.e. only for week/range; month stays
single-row.

## Anti-patterns ruled out

- Two-row with viewMode on Row 1 + chip alone on Row 2 → empty middle
  space (whitespace waste; observed 2026-05-20).
- Chip + duplicate inline editor below → single-source-of-truth
  violation; the chip alone must own the editable identity.
- Calendar icons flanking the chip text → chip truncates (`5.18 ~ !`);
  the chip's rounded container is sufficient affordance.

## Graduation criteria → verodesign component

Promote to a verodesign `PeriodHeader` component if:
1. ≥2 cross-brand consumers want this pattern.
2. Slot composition stabilizes (chip / filter / viewMode / action slots).
3. Component contract verifiable: cross-brand zero diff, additive
   (per `.add/pattern-intake.md`).

Until then: this doc is the SSOT pattern reference. Cross-references:
[[typography-policy.md]] (vds-text-label/caption only),
[[dev-best-practices.md]] (additive · SSOT · no speculative
abstraction).

## Sources (2026)

- Muz.li — "What's changing in mobile app design 2026"
- Mobbin — Segmented Control glossary
- designsystems.surf — Segmented Control blueprints
- Procreator — Finance app design strategies 2026
- UXmatters — Date Filters successful patterns
