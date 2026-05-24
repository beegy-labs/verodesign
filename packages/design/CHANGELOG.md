# @verobee/design

## [Unreleased]

- feat(design): add `exp.girok-redesign` progress, calendar, and settings-row token slots for composite patterns
- feat(design): add 16 `exp.girok-redesign` tokens for girok redesign radius, font-size, glow, pill, and toggle coverage
- breaking(design): rename `exp.girok-redesign` token paths `toggle.incomeActive`, `toggle.activeForeground`, and `nav.tabUnderlineGlow` to kebab-case canonical paths
- feat(design): ship 1-week deprecated alias tokens preserving legacy girok redesign CSS variable names `--vds-exp-girok-redesign-toggle-incomeactive`, `--vds-exp-girok-redesign-toggle-activeforeground`, and `--vds-exp-girok-redesign-nav-tabunderlineglow`
- feat(design): add primitive icon sizing and stroke-width tokens for `vds-icon`
- breaking(design): migrate semantic source naming to DTCG dot-path status/foreground tokens and emit CSS vars like `--vds-theme-status-success-foreground`; migration codemod: `migrate-naming-2026-05`
- breaking(design): rename `accent-2-fg` and `accent-3-fg` to nested foreground tokens and emit `--vds-theme-accent-2-foreground` / `--vds-theme-accent-3-foreground`
