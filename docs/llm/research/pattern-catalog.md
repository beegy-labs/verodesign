# Pattern Catalog

> CDD Layer 2 — Discovered patterns and their lifecycle status | **Last Updated**: 2026-04-30

## Status Definitions

| Status | Meaning | DTCG `$extensions.verobee.status` |
| ------ | ------- | --------------------------------- |
| researched | Identified, not yet ingested | (no token files) |
| experimental | DTCG file present in `tokens/experimental/`, build-isolated | `experimental` |
| candidate | Proposed for promotion, soak period started | `candidate` |
| canonical | In `tokens/{primitive,semantic,brand}/`, fully integrated | `canonical` |
| deprecated | Marked for removal in next major | `deprecated` |
| rejected | Considered, declined; documented for future awareness | (no token files) |

## Catalog (initial — empty)

| Pattern | Status | Source | First seen | Spacing audit | Notes |
| ------- | ------ | ------ | ---------- | ------------- | ----- |
| girok-theme | canonical | internal:dreamstock | 2026-05-15 | clean | warm-neutral + brass theme (light/dark), contrast-audited |
| bento-grid | experimental | external:trends-2026 | 2026-05-16 | — | design-react component present (BentoGrid/BentoItem) |
| glass-surface | experimental | external:trends-2026 | 2026-05-16 | — | DTCG tokens present (tokens/experimental/glass-surface.json) |
| motion-tokens | experimental | external:trends-2026 | 2026-05-16 | — | DTCG tokens present (tokens/experimental/motion-tokens.json) |
| theme-toggle | canonical | internal:dreamstock | 2026-05-13 | — | auto/light/dark segmented |
| entry-dialog | canonical | internal:dreamstock | 2026-05-13 | — | row entity add/edit dialog |
| compact-row | canonical | internal:dreamstock | 2026-05-13 | — | compact list item row |
| touch-safe-target | canonical | internal:app-girok | 2026-05-16 | clean | coarse pointer hit-area preserves compact visuals with 44px target |
| account-badge | experimental | internal:app-girok/docs/design/units/assets-overview-cash.md,invest-positions.md | 2026-05-20 | clean | Phase A girok status + Phase B exp.girok.* token 참조 (재작성 2026-05-20) |
| amount-hero | experimental | internal:app-girok/docs/design/units/assets-overview-total.md,debt-summary.md | 2026-05-20 | clean | Phase A girok status + Phase B exp.girok.* token 참조 (재작성 2026-05-20) |
| binary-pill-toggle | experimental | internal:app-girok/docs/design/units/household-ledger-management-fixed-income-expense.md,modal-savings-add.md,modal-transaction-add.md | 2026-05-20 | clean | Phase A girok status + Phase B exp.girok.* token 참조 (재작성 2026-05-20) |
| product-card | experimental | internal:app-girok/docs/design/units/assets-overview-savings.md,debt-loans.md | 2026-05-20 | clean | Phase A girok status + Phase B exp.girok.* token 참조 (재작성 2026-05-20) |
| settings-row | experimental | internal:app-girok/docs/design/units/settings-system-links.md,settings-data-log.md | 2026-05-20 | clean | Phase A girok status + Phase B exp.girok.* token 참조 (재작성 2026-05-20) |
| view-toggle | experimental | internal:app-girok/docs/design/units/household-ledger-records-toolbar.md,invest-quick-actions.md | 2026-05-20 | clean | Phase A girok status + Phase B exp.girok.* token 참조 (재작성 2026-05-20) |
| scrollbar-hide | experimental | internal:app-girok/docs/design/units/global-main-routing.md,tab-assets.md,tab-debt.md,tab-invest.md,tab-settings.md | 2026-05-20 | clean | token-free web utility, Phase A/B 의존 없음 (재작성 2026-05-20) |
| girok-surfaces | experimental | internal:app-girok/docs/design/units/invest-snowball-hero.md,debt-summary.md,assets-overview-total.md,household-ledger-records-toolbar.md,tab-household-ledger.md | 2026-05-20 | clean | exp.girok hero surface and segmented active background tokens |
| girok-icon-tile | experimental | internal:app-girok/docs/design/units/settings-system-links.md,settings-data-log.md,invest-quick-actions.md | 2026-05-20 | clean | exp.girok alpha-tinted status icon tile surfaces |
| icon | experimental | internal:app-girok | 2026-05-22 | clean | single WC registry + React named adapters for 35 Lucide icons |
| progress | experimental | internal:app-girok redesign mock | 2026-05-22 | clean | linear progress WC + React adapter with girok hero gradient |
| date-grid | experimental | internal:app-girok redesign mock | 2026-05-22 | clean | body-only ARIA grid month calendar with dynamic 5/6 rows |
| tabs-slide | experimental | internal:app-girok redesign mock | 2026-05-22 | clean | segmented tabs slide indicator extension on canonical Tabs |
| settings-row | experimental | internal:app-girok redesign mock | 2026-05-22 | clean | WC-first tappable settings row with tone-mapped icon tile |
| girok-finance | experimental | internal:app-girok/docs/design/units/invest-positions.md,debt-loans.md,invest-snowball-hero.md | 2026-05-20 | clean | exp.girok market, loan priority, and goal progress tokens |
| girok-glow | experimental | internal:app-girok/docs/design/units/global-depth-tabs.md,settings-data-log.md,modal-scalp-calculator.md | 2026-05-20 | clean | exp.girok accent and warning glow shadows |
| girok-redesign | experimental | internal:redesing.txt + .specs/verodesign/2026-05-21-pattern-girok-redesign/sections/*.tsx | 2026-05-21 | clean | girok app shell + 5 tabs + 4 modals 종합 시안 (23 new slots — nav / surface / stats / chart / toggle / calendar / icon) |
| token-audit-girok | experimental | internal:app-girok | 2026-05-22 | clean | girok redesign mock literal to VDS token audit and alias soak |
| girok-page-toolbar | experimental | internal:app-girok/target.html | 2026-05-23 | clean | sticky sub-tabs rail with trailing actions for invest page |
| girok-currency-toggle | experimental | internal:app-girok/target.html | 2026-05-23 | clean | dual-currency segmented toggle with KRW zinc and USD blue active states |
| girok-snowball-hero | experimental | internal:app-girok/target.html | 2026-05-23 | clean | gradient challenge hero with progress stack, target card, and two-up action grid |
| girok-position-card | experimental | internal:app-girok/target.html | 2026-05-23 | clean | ticker avatar row with price stack and sell chip affordance |
| girok-fx-summary-card | experimental | internal:app-girok/target.html | 2026-05-23 | clean | live USD/KRW summary card with bordered balance rows |
| girok-fx-history-card | experimental | internal:app-girok/target.html | 2026-05-23 | clean | compact exchange history row with profit trailing stack |
| girok-category-progress-list | experimental | internal:app-girok/target.html | 2026-05-23 | clean | four-tone category spend progress list for ledger analysis |
| girok-select-card | experimental | internal:app-girok/target.html | 2026-05-23 | clean | settings card pairing a section label with a single themed select |
| girok-ledger-swapper | experimental | internal:app-girok/target.html | 2026-05-23 | clean | fixed-height row that swaps weekday grid and period filter tabs |

## Entry Template

When adding a pattern via `.add/pattern-intake.md`, append a row using this template:

```markdown
| {pattern-slug} | experimental | {source-url} | {YYYY-MM-DD} | {clean\|migrating\|violating} | {one-line note} |
```

## Required Fields per Entry

| Field | Format | Example |
| ----- | ------ | ------- |
| Pattern slug | `kebab-case` | `glassmorphism-card` |
| Status | enum from above | `experimental` |
| Source | URL or doc reference | `https://linear.app/blog/...` |
| First seen | `YYYY-MM-DD` | `2026-04-30` |
| Spacing audit | `clean`, `migrating`, `violating` | `clean` |
| Notes | <80 chars | `frosted bg with backdrop-filter` |

## Promotion Criteria

| From | To | Required gates |
| ---- | -- | -------------- |
| researched | experimental | `pattern-intake` workflow completed; DTCG file written |
| experimental | candidate | 4-week soak passed; cited in ≥1 SDD spec |
| candidate | canonical | 2 consumer apps using it without issue OR 8-week soak |
| canonical | deprecated | No consumer reference for 3 months OR explicit replacement |

## Deprecation Criteria

| Trigger | Action |
| ------- | ------ |
| `usageCount === 0` for 90 days | Auto-flag; `.add/pattern-deprecate.md` workflow |
| Token replaced by canonical equivalent | Manual flag with replacement reference |
| Brand removed | Cascade deprecate brand-specific tokens |

## Audit Frequency

| Action | Cadence |
| ------ | ------- |
| Re-scan trends | Quarterly |
| Validate experimental sources still live | Quarterly |
| Promotion review | Monthly |
| Deprecation sweep | Monthly |
