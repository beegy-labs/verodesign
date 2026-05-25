# app-girok ↔ verodesign ledger migration audit

app-girok ledger redesign contains a bounded set of safe migration candidates, but several app-side styles are still local overrides or wrapper-only layout code and should not move as-is. The lowest-risk path is to migrate token-backed Girok patterns first, then add the two new toolbar/empty/search pattern families, then add React adapters. `DO NOT TOUCH` areas called out in the request should remain out of scope.

**Purpose**: quantify selector, token, component, and EAA/WCAG gaps between `app-girok` ledger redesign and `verodesign` Girok patterns before migration.
**Scope**: `app-girok/src/styles/{ledger.css,ledger-records.css,ledger-analysis.css,ledger-management.css,ledger-shared.css,ledger-add-modal.css,girok-overrides.css}`, `app-girok/src/shared/ui/*`, `verodesign/packages/design/src/patterns/girok/*.css`, `packages/design/tokens/experimental/girok/components/*.json`, `packages/design-react/src/components/*`.
**Effect**: this document isolates migration-safe deltas, flags policy blockers (`fallback` ban, raw literal ban in source CSS), and proposes a phased transfer order.

## 1. Pattern CSS diff matrix

Only selectors with observable app-side drift or verodesign absence are listed. Identical selectors/declarations were skipped.

| app-girok file | selector | verodesign match | app-girok value / behavior | verodesign value / behavior | recommendation |
|---|---|---|---|---|---|
| `ledger-records.css` | `.vds-pattern-girok-toolbar` | `patterns/girok/toolbar.css` | `min-height: 44px; padding: 8px 24px 0;` for records pane | tokenized padding only, no explicit 44 target | Migrate as `toolbar` token extension only if reused outside ledger records. Safe. |
| `ledger-records.css` | `.vds-pattern-girok-month-pill` | `month-pill.css` | tighter shell `padding: 4px 8px`; button `28x28`; label width `120px` | tokenized shell, no fixed button target in pattern | Partially migrate: add tokenized hit-target/min-size if month pill is shared. |
| `ledger-records.css` | `.vds-pattern-girok-register-chip` | `register-chip.css` | `min-height: 44px`, filled bg, `line-height: 1` | border-only chip, no explicit 44 target, token line-height `1.454545` | Migrate `min-height` only. Keep app-specific filled surface local unless required by spec. |
| `ledger-records.css` | `.vds-pattern-girok-view-toggle` / `__item` | `view-toggle.css` | active state adds `border: 2px solid`, glow, `28x28` item, expanded hit-area pseudo | active state only bg/text, item token size `26` equivalent, no explicit 44 target | Migrate EAA target-size support and optional active-border token. Visual glow can wait. |
| `ledger-records.css` | `.vds-pattern-girok-stats` / `__label` / `__value` | `stats.css` | shadowed card, label/value line-height `1.4`, literal border fallback alias | tokenized card, no shadow, value line-height `1.333333` | Migrate typography line-height only. Do not migrate fallback alias or shadow first. |
| `ledger-records.css` | `.vds-pattern-girok-ledger-swapper__weekday-row` / `__weekday` | `ledger-swapper.css` | explicit `height: 40px`, bottom border, weekday line-height reduced to `1`/`1.2` | tokenized min-height `32`, line-height `1.454545` | No immediate migration. App is denser, not obviously safer. |
| `ledger-records.css` | `.vds-pattern-girok-calendar__cell` / `__date` / `__dot` | `calendar.css` | cell `44px` min target, day hit-area via `::after`, selected day bright bg + dark text, dot margin-top | pattern already has `cell-min-height` token `48px`, selected state border/text only, no pseudo hit-area | Migrate only EAA-selected contrast rule if needed. Do not migrate local hit-area if `48px` token already satisfies target. |
| `ledger-records.css` | `.vds-pattern-girok-ledger-filter-tabs__btn` | `ledger-filter-tabs.css` | `font-size: var(--ledger-text-sm)`, active underline pinned to `bottom:0`, toolbar variant later shifts underline | token font-size currently 12, standard underline offset from container padding | Migrate font-size only if ledger uses larger tab text consistently. |
| `ledger-records.css` | `.vds-pattern-girok-ledger-date-range` / `__text` | `ledger-date-range.css` | surface moved to `bg-surface-1/2`, text secondary, icon brand, item gap `8` | surface toolbar token, text base, item padding tokenized | Migrate secondary text and surface only if date-range is ledger-specific. Low priority. |
| `girok-overrides.css` | `.vds-pattern-girok-tab-l1__item` | `tab-l1.css` | app active color uses literal `#fbbf24`; font-weight forced `700`; underline 5px | tokenized active color, inactive `600` / active `800` | Do not migrate app literal color. verodesign already stable. |
| `ledger-records.css` | `.vds-pattern-girok-tab-l2` / `.vds-pattern-girok-tab-l2__indicator` | `tab-l2.css` | local segmented background/border tuning; indicator-specific overrides | verodesign uses cell-active state, no separate indicator selector | No migration. verodesign pattern is already canonical/stable. |
| `ledger-analysis.css` | `.vds-pattern-girok-section-header*` | none | new analysis section heading atom with tone modifiers | no Girok pattern or design-react adapter | Add new pattern family. Safe and isolated. |
| `ledger-analysis.css` | `.vds-pattern-girok-trend-bar*` | `trend-bar.css` | card height `192`, track height `96`, current bar glow, labels `10px`, current text amber-light | tokenized track `6rem`, caption typography, no glow | Migrate typography contrast/current-state only. Keep glow and fixed heights local for now. |
| `ledger-analysis.css` | `.vds-pattern-girok-category-progress-list*` | `category-progress-list.css` | `gap: 16px`, row `gap: 6px`, track `6px`, head `12px/700`, percent muted | tokenized row gap, list title typography, track height tokenized | Mostly aligned. Migrate only if typography tokens still differ after ledger rollout. |
| `ledger-management.css` | `.vds-pattern-girok-management-category-form__type-toggle` and descendants | `management-category-form.css` | active expense/income text on bright bg uses `color: var(--bg-root)`; gap `6`, darker scrim shell | pattern already has active bg but text `text-primary`; no explicit 44 rule | Migrate active-text contrast token and target-size/min-height support. |
| `ledger-management.css` | `.vds-pattern-girok-management-fixed-card*` | `management-fixed-card.css` | `padding:12`, title `sm/700`, badge pill, amount `xs/1.4`, delete/toggle icons plain, add button filled dark | pattern similar structure but different token names/spacing; add button outlined/translated | Migrate amount/title line-height and active-text safety; keep card visual redesign for later phase. |
| `ledger-management.css` | `.vds-pattern-girok-management-category-chip*` | `management-category-chip.css` | chip list gap `6`, chip `padding: 4px 8px`, radius `6`, title `xs/700` | tokenized chip with slightly larger neutral card styling | Low-risk token migration candidate if management screens should visually match app. |
| `ledger-shared.css` | `.vds-pattern-girok-icon-button` and `--close/--ghost/--delete` | `icon-actions.css` plus generic `design-react/IconButton` | app adds 44x44 pseudo target, close button circular filled surface, ghost/delete padding `6` | pattern defines bare icon sizing only; design-react icon button is generic and not Girok-specific | Migrate hit-target support into Girok icon-actions or a new icon-button pattern. Safe from EAA standpoint. |
| `ledger-shared.css` | `.vds-pattern-girok-ledger-date-picker-sheet__date-box*` | `ledger-date-picker-sheet.css` | input-like date boxes, help text, full-width apply button | sheet pattern currently only shell chrome | Add missing subselectors/tokens if this sheet is meant to be first-class in verodesign. |
| `ledger-shared.css` | `.vds-pattern-girok-dual-toggle*` | none | reusable 2-option segmented control used in modal/form flows | no Girok source pattern; closest react primitive is `BinaryPillToggle` | Add new Girok pattern or react adapter; high reuse candidate. |
| `ledger-shared.css` | `.vds-pattern-girok-action-row*` | none | reusable primary/secondary action row with tone variants and disabled rule | no Girok pattern or react adapter | Add new pattern family. Safe and isolated. |
| `ledger-shared.css` | `.vds-pattern-girok-picker-button*` | none | ledger picker button styled as input/control shell with caret | no Girok source pattern or design-react component | Add new pattern family. Safe and reusable. |
| `ledger-shared.css` | `.vds-pattern-girok-transaction-row*` | no direct match; closest `ledger-transaction-card.css` | compact list row with avatar/copy/amount and income-expense-neutral aliases | verodesign has transaction card, not row variant | Add new pattern only if row/card duality is intentionally supported. Exclude 3-way alias behavior from migration per request. |
| `ledger-add-modal.css` | `.vds-pattern-girok-ledger-add-modal__header/__title/__form/__label/__input/__type-toggle/__btn-row/...` | `ledger-add-modal.css` | app defines full internal anatomy | verodesign pattern currently exposes only `__box` container | Add missing inner selectors and component tokens. High-value migration candidate. |

### Selector groups intentionally excluded from migration

- `daily sheet 65vh` overrides in `ledger-shared.css`
- `AnalysisView 1219-1341`-equivalent local layout effects
- `TransactionRow` 3-way alias behavior (`income/expense/neutral`)
- toast item-pill styling in `girok-overrides.css`
- general wrapper/layout helpers such as `.girok-ledger-page`, `.girok-ledger-pane`, `.girok-ledger-analysis-section`, `.girok-ledger-manage-stack`

## 2. New pattern list

Patterns present in app-girok ledger area but absent as Girok source patterns in verodesign:

| pattern / selector family | source | purpose | recommendation |
|---|---|---|---|
| `girok-ledger-list-toolbar*` | `ledger-records.css` | horizontal toolbar combining inline tabs, chips, search | Add as new pattern. High reuse across ledger list screens. |
| `girok-ledger-list-chip` | `ledger-records.css` | pill filter chip hosting picker button label | Add as subpattern or variant under list toolbar. |
| `girok-ledger-list-controls__search*` | `ledger-shared.css` | expanding search field shell/toggle/input/close | Add as new pattern backed by tokens; do not move raw literals directly. |
| `girok-empty-state*` | `ledger-shared.css` | Girok-specific empty state with icon bubble | Add as Girok pattern or map to `design-react/EmptyState` plus Girok skin tokens. |
| `.vds-pattern-girok-section-header*` | `ledger-analysis.css` | section title row with icon tone variants | Add as small shared Girok pattern. |
| `.vds-pattern-girok-picker-button*` | `ledger-shared.css` | generic ledger picker/control trigger | Add as reusable pattern. |
| `.vds-pattern-girok-dual-toggle*` | `ledger-shared.css` | 2-choice segmented control used in add/manage flows | Add as new pattern or explicit Girok wrapper over `BinaryPillToggle`. |
| `.vds-pattern-girok-action-row*` | `ledger-shared.css` | two-button action footer row | Add as shared Girok pattern. |
| `.girok-ledger-manage-toolbar*` | `ledger-management.css` | management page header with title + toggle slot | Add only if more than one management screen needs it. |
| `.vds-pattern-girok-transaction-row*` | `ledger-shared.css` | compact record row distinct from transaction card | Add only if row/card split is a design-system requirement. |

## 3. Token diff

App-side values that imply missing or outdated Girok component tokens in verodesign. Values below should be promoted into component JSON first, then consumed from pattern CSS. Do not migrate any raw `var(--token, fallback)` or source CSS literals.

| area | app-girok evidence | verodesign current state | token action |
|---|---|---|---|
| target size | repeated `min-height: 44px` on chips, toolbar, search toggle, tab cells, inputs | some patterns still rely on visual size only; calendar already `48px` | Add/normalize `min-height` or hit-target tokens for `register-chip`, `view-toggle`, `picker-button`, `search-field`, management toggles. |
| active contrast | active bright surfaces use dark text `var(--bg-root)` in toggles and selected calendar date | some patterns use `text-primary` or accent text without explicit contrast token | Add active-text tokens for toggles and selected states where bright amber/green/red surfaces are used. |
| typography line-height | Sprint E values show `1.4` replacing tighter `1`/`1.2` in labels, values, helper text | `stats.value`, `month-pill`, `ledger-swapper`, parts of management still use tighter line-heights | Update component tokens where readable multi-script text benefits from `1.4`: `stats`, `management-fixed-card`, `management-category-form`, possibly `tab` labels. |
| rem/type scale | app mentions Sprint E rem conversion, but app source still uses semantic CSS vars (`--ledger-text-*`) | some component JSON still use explicit `px`/`rem` formulas and older generated names like `font-size-6` | No direct UI migration item, but token cleanup is needed: move to stable semantic keys and keep consumer CSS token-only. |
| date range text tone | app uses secondary text in date range and list chips | verodesign uses stronger base text | Add text-tone tokens if ledger wants subdued controls by default. |
| daily CTA padding | request notes `18 -> 14` | verodesign daily sheet footer token already uses `14/12` style values; app daily 65vh area is out-of-scope | No migration; treat as already stable / excluded. |
| contrast uplift | request notes `zinc-500 -> zinc-400` | verodesign uses mixed `text-muted`, `text-secondary`, `text-disabled`; some mappings likely still too dim | Audit and update semantic color tokens, not selector-local literals. |

### Concrete component-token candidates

- `toolbar`: add optional `min-height`
- `register-chip`: add `min-height`
- `view-toggle`: add `item-hit-target` or `item-min-size`, optional active border/glow tokens
- `stats`: update `value-line-height` to `1.4` if ledger typography is canonical
- `management-category-form`: active text tokens on colored toggle buttons
- `management-fixed-card`: amount/title line-height tokens, button style tokens if adopted
- `ledger-add-modal`: full anatomy tokens for title/label/input/button/close control
- new components required: `section-header`, `picker-button`, `dual-toggle`, `action-row`, `ledger-list-toolbar`, `search-field`, `empty-state`, maybe `transaction-row`

## 4. New React component list

`design-react` has generic `EmptyState`, `IconButton`, `TextField`, `BinaryPillToggle`, but not the Girok-specific ledger atoms below.

| app-girok component | in design-react? | nearest existing primitive | recommendation |
|---|---|---|---|
| `SearchField` | no | `TextField` + `IconButton` | Add Girok adapter/composite after pattern exists. |
| `SectionHeader` | no | none | Add lightweight Girok component. |
| `PickerButton` | no | `Button` is too generic | Add Girok component tied to new pattern. |
| `TransactionRow` | no | none; closest concept is pattern-only `ledger-transaction-card` | Add only if row/card distinction is needed across products. |
| `DualToggle` | no | `BinaryPillToggle` | Prefer adapter over brand-new logic component. |
| `ActionRow` | no | `Button` primitives only | Add composite Girok component. |
| `EmptyState` | generic exists | `EmptyState` | Either extend generic component with Girok slots/skin or add Girok wrapper. |
| `IconButton` | generic exists | `IconButton` | No new logic component required; Girok-specific skin/hit-target layer still missing. |

## 5. WCAG / EAA gap

Gaps where app-girok ledger redesign is stricter than current verodesign Girok patterns:

| gap | app-girok evidence | verodesign status | migration note |
|---|---|---|---|
| contrast uplift on dim text | request cites `zinc-500 -> zinc-400`; app uses lighter secondary/muted text in several ledger controls | not consistently verifiable from component tokens alone; some patterns still use subdued tokens that may be too dim | Re-audit semantic Girok text tokens before shipping ledger migration. |
| 44x44 target size | app adds `min-height: 44px` and pseudo-hit-targets for icon/search/view controls | only some patterns encode sufficient target size; icon-actions does not | Migrate first. Low visual risk, high accessibility value. |
| rem/type-scale normalization | app redesign intent is rem/semantic scale | verodesign source CSS is token-only, but several component token JSONs still carry old literal formulas/numeric placeholder names | Clean token definitions during migration; no direct selector porting. |
| active toggle text on bright surfaces | app sets dark text on active expense/income buttons and selected day | current management patterns may rely on `text-primary` without explicit contrast guarantee | Add explicit active-text tokens. |
| search close/toggle hit area | app uses pseudo-element expansion around `32px/20px` visuals | no Girok search pattern exists | Include in new search-field pattern. |

## 6. Migration phase recommendation

Risk rule: move “no visual change” and EAA-safe infrastructure first, then selector-complete missing patterns, then optional visual parity refinements.

### Phase 1. Safe token/EAA uplift

- add `44x44` target-size or hit-target tokens to shared controls
- add active-text contrast tokens for bright toggles/selected states
- update line-height tokens where ledger readability gains are clear
- keep source pattern CSS compliant with `girok-token-governance.md`

### Phase 2. Complete existing partial patterns

- expand `ledger-add-modal` from container-only to full internal anatomy
- expand `ledger-date-picker-sheet` with date-box/help/apply subselectors if it is intended as first-class pattern
- optionally normalize `management-category-form` and `management-fixed-card` tokens to app-validated values

### Phase 3. Add new small shared patterns

- `section-header`
- `picker-button`
- `dual-toggle`
- `action-row`
- Girok skin layer for `icon-button`

### Phase 4. Add new ledger list patterns

- `ledger-list-toolbar`
- `ledger-list-chip`
- `search-field`
- `empty-state`

### Phase 5. React adapters/composites

- `SearchField`
- `SectionHeader`
- `PickerButton`
- `DualToggle` adapter over `BinaryPillToggle`
- `ActionRow`
- Girok `EmptyState` wrapper

### Phase 6. Optional visual parity pass

- stats shadow/glow and non-essential polish
- management card visual parity
- transaction row vs transaction card split, only if product scope proves reuse

## Counts

- Pattern migration candidates: `18`
- New pattern families to add: `10`
- Token update candidates: `8`
- New React component/adapters: `6` strong candidates, `2` wrapper/reuse candidates
- WCAG/EAA gap categories: `5`
- Recommended migration phases: `6`

## Risk

Priority should stay on low-risk, visually neutral transfers: target-size tokens, active-text contrast, and missing internal anatomy for already-existing patterns. Medium risk starts when migrating ledger-specific toolbar/search shells and compact row/card visual variants. High-risk or explicitly excluded items are the `65vh` daily-sheet behavior, analysis local layout tweaks, transaction-row alias semantics, and toast styling.
