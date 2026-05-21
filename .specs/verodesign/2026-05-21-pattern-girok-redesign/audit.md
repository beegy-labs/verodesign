# girok-redesign audit

[knowledge-gap-check] Read llm-knowledge-gaps.md. Topics in scope: W3C DTCG, Style Dictionary 4.x, CSS color spaces, WCAG 2.2. Web search required: no.

## Section summary

| Section | Colors | Spacing | Radius | Shadow | Reuse | Gap |
| ------- | ------ | ------- | ------ | ------ | ----- | --- |
| 00-global-shell-state.tsx | 30 | 11 | 5 | 2 | 3 | 13 |
| 01a-tab-ledger-segments-bar.tsx | 9 | 4 | 2 | 1 | 1 | 6 |
| 01b-ledger-records.tsx | 26 | 26 | 5 | 1 | 3 | 12 |
| 01c-ledger-analysis.tsx | 21 | 7 | 3 | 2 | 3 | 9 |
| 01d-ledger-management.tsx | 28 | 23 | 5 | 1 | 2 | 12 |
| 02-tab-invest.tsx | 52 | 23 | 6 | 5 | 7 | 21 |
| 03-tab-assets.tsx | 35 | 21 | 5 | 1 | 2 | 15 |
| 04-tab-debt.tsx | 34 | 20 | 5 | 1 | 1 | 15 |
| 05-tab-settings.tsx | 28 | 12 | 2 | 3 | 5 | 12 |
| 06-bottom-nav.tsx | 6 | 4 | 0 | 1 | 1 | 3 |
| 90-modal-daily-sheet.tsx | 29 | 16 | 3 | 1 | 2 | 9 |
| 91-modal-add-transaction.tsx | 17 | 9 | 3 | 1 | 1 | 7 |
| 92-modal-scalp-calc.tsx | 15 | 9 | 2 | 1 | 2 | 6 |
| 93-modal-savings-add.tsx | 17 | 11 | 4 | 2 | 2 | 7 |
| 99-animations.tsx | 0 | 0 | 0 | 0 | 0 | 0 |

## New slots

- `exp.girok-redesign.shell.frame-surface`
- `exp.girok-redesign.shell.content-surface`
- `exp.girok-redesign.surface.card`
- `exp.girok-redesign.surface.toolbar`
- `exp.girok-redesign.surface.card-subtle`
- `exp.girok-redesign.border.card-subtle`
- `exp.girok-redesign.border.control`
- `exp.girok-redesign.border.modal-strong`
- `exp.girok-redesign.border.active`
- `exp.girok-redesign.nav.tab-active`
- `exp.girok-redesign.nav.bottom-active`
- `exp.girok-redesign.nav.bottom-inactive`
- `exp.girok-redesign.nav.tabUnderlineGlow`
- `exp.girok-redesign.stats.income-text`
- `exp.girok-redesign.stats.expense-text`
- `exp.girok-redesign.chart.top-rank-fill`
- `exp.girok-redesign.chart.rank-4-fill`
- `exp.girok-redesign.chart.rank-5-fill`
- `exp.girok-redesign.toggle.expense-active`
- `exp.girok-redesign.toggle.incomeActive`
- `exp.girok-redesign.toggle.activeForeground`
- `exp.girok-redesign.calendar.weekend-sat`
- `exp.girok-redesign.icon.info-strong`

## Contrast

| Pair | Ratio | Required | Pass |
| ---- | ----- | -------- | ---- |
| nav.tab-active | 11.64:1 | AA 4.5:1 | Yes |
| nav.bottom-active | 9.05:1 | AA 4.5:1 | Yes |
| nav.bottom-inactive | 7.58:1 | AA 4.5:1 | Yes |
| stats.income-text | 7.37:1 | AA 4.5:1 | Yes |
| stats.expense-text | 6.95:1 | AA 4.5:1 | Yes |
| surface.card-subtle text | 17.02:1 | AA 4.5:1 | Yes |
| calendar.weekend-sat | 7.69:1 | AA 4.5:1 | Yes |
| toggle.active-foreground on expense | 5.29:1 | AA 4.5:1 | Yes |
| toggle.active-foreground on income | 7.66:1 | AA 4.5:1 | Yes |
| icon.info-strong | 5.83:1 | AA 4.5:1 | Yes |

## Reuse reference

- `exp.girok.surface.hero.start`
- `exp.girok.surface.hero.end`
- `exp.girok.surface.hero.border`
- `exp.girok.bg.segmented-active`
- `exp.girok.market.up`
- `exp.girok.market.down`
- `exp.girok.finance.up`
- `exp.girok.finance.down`
- `exp.girok.finance.flat`
- `exp.girok.progress.goal-fill-start`
- `exp.girok.progress.goal-fill-end`
- `exp.girok.icon-tile.info`
- `exp.girok.icon-tile.success`
- `exp.girok.icon-tile.warning`
- `exp.girok.icon-tile.danger`

