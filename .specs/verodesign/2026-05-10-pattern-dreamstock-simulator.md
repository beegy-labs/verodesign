# SDD: Intake — `dreamstock-simulator` pattern

> Status: experimental | Driver: dreamstock PoC consumer | Source: `internal:dreamstock` | Date: 2026-05-10

## Why

`dreamstock` is a new internal consumer — a personal-finance simulator that projects compounding 10% trade gains from 1000만원 to 100억, layered with leverage (마이너스 통장 vs 일반 대출, with profit-share repayment and 17-cycle term maturity) and dividend reinvestment milestones. The PoC is being built as a Vite + React + Tauri 2 app shipping to web + iOS, and it must consume verodesign exclusively (no Tailwind, no shadcn).

While building the first screens against verodesign's existing semantic slots (`primary`, `success`, `warning`, `info`, `destructive`, `bg.card`, `bg.selected`), three repeated visual roles surfaced that don't have first-class names:

1. **Trajectory chart accents** — dedicated meanings for "trajectory line", "target line", and four kinds of cycle-milestone markers (repay-start, dividend-start, target-reached, loan-matured). Today consumers reach for raw `theme.primary/success/warning/info/destructive` and have to remember the mapping.
2. **Net-worth hero treatment** — large hero figure with positive/negative tone plus a progress-bar track + gradient fill, used to communicate "실 재산" (capital − loan) and "목표 진행률".
3. **Trade-journal pnl pill + note rule** — a realised-pnl background tint (success/destructive ~12% alpha) and a rationale note with a left-border rule.

These don't justify *new theme primitives* — they're all references to existing slots — but they justify named **experimental aliases** so future consumers (verobase finance modules, future veronex dashboards) reach for the same names.

## Scope

Add one experimental DTCG file at `packages/design/tokens/experimental/dreamstock-simulator.json` defining four alias namespaces — all values reference existing canonical theme slots, so no new primitives or theme bindings are introduced.

| Namespace | Aliases | Maps to (canonical) |
| --------- | ------- | ------------------- |
| `exp.dreamstock.growth.*` | trajectory-line, target-line, milestone-{repay,dividend,target,loan-matured} | primary, success, warning, info, success, destructive |
| `exp.dreamstock.leverage.*` | balance-line, interest-accent, type-overdraft-bg, type-term-bg | warning, warning, bg.card, bg.selected |
| `exp.dreamstock.dividend.*` | pool-line, income-accent | info, info |
| `exp.dreamstock.networth.*` | positive, negative, progress-track, progress-fill-{start,end} | primary, destructive, bg.card, primary, success |
| `exp.dreamstock.journal.*` | buy-tone, sell-tone, pnl-{positive,negative}-bg, note-rule | info, primary, success, destructive, primary |

Output: CSS variables `--vds-exp-dreamstock-{namespace}-{slot}` per existing experimental token build pipeline.

## Out of scope

- New theme primitives or new canonical slots — every value is an alias.
- New custom element tags. The patterns in dreamstock today are CSS-token + utility-class compositions. A `vds-progress` and `vds-stat-card` component proposal will land separately if these compositions repeat across consumers.
- Migration of consumer code — the dreamstock app currently inlines `var(--vds-theme-*)` references; a follow-up refactor will swap in `var(--vds-exp-dreamstock-*)` once these aliases are built and shipped.

## Acceptance gates

| Gate | Required |
| ---- | -------- |
| DTCG schema valid | Yes |
| Every `$value` resolves to an existing canonical slot in `tokens/semantic/core.json` | Yes |
| Token build emits `--vds-exp-dreamstock-*` variables | Yes |
| Pattern catalog row appended | Yes |
| WCAG contrast on text used over each `bg.*` alias ≥ AA | Inherited (aliases only) |

## Promotion plan

| From → To | Trigger |
| --------- | ------- |
| experimental → candidate | dreamstock app ships beyond PoC AND a second consumer (likely verobase finance module) cites at least the `growth.*` and `networth.*` namespaces |
| candidate → canonical | 8-week soak with no semantic changes; promotion would land these as a new `tokens/semantic/finance.json` group with `--vds-theme-finance-*` variables, deprecating the `--vds-exp-dreamstock-*` names with a codemod |
| reject path | If only dreamstock ever consumes them after 12 weeks, fold the file into a dreamstock-app-local stylesheet and remove from verodesign |

## Pattern catalog entry

```markdown
| dreamstock-simulator | experimental | internal:dreamstock | 2026-05-10 | trajectory + leverage + dividend + networth + journal aliases |
```
