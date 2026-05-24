# Components — LLM Index

> CDD Layer 2 — Per-component canonical pages | **Last Updated**: 2026-05-01

LLM 이 컴포넌트 사양을 즉시 흡수할 수 있도록 표준화된 페이지. Canonical page 는 prose 를 유지하고, API 는 Custom Elements Manifest 기반으로 marker 주입한다.

## Capability Matrix

<!-- CAPABILITY:START -->
| Tag | Purpose | A11y Pattern | Form-associated | Sizes | Tones |
| --- | ------- | ------------ | --------------- | ----- | ----- |
| [`<vds-badge>`](badge.md) | Inline non-interactive status or count indicator. | none (decorative) | no | — | — |
| [`<vds-binary-pill-toggle>`](binary-pill-toggle.md) | Two-option segmented choice with form submission support. | Radio Group | yes | — | — |
| [`<vds-box>`](box.md) | Generic spacing and width wrapper bound to tokenized props. | none (layout primitive) | no | — | — |
| [`<vds-button>`](button.md) | Action trigger with FACE-backed submit and reset behavior. | Button | yes | — | — |
| [`<vds-card>`](card.md) | Surface container with structured header, body, and footer slots. | none (surface container) | no | — | — |
| [`<vds-checkbox>`](checkbox.md) | Tri-state checkbox with FACE integration. | Checkbox | yes | — | — |
| [`<vds-compact-row>`](compact-row.md) | Single-row entity item that can render as button or anchor. | list row / action row | no | — | — |
| [`<vds-dialog>`](dialog.md) | Modal dialog with focus trap, dismiss controls, and slot composition. | Dialog (Modal) | no | sm/md/lg/xl/2xl | — |
| [`<vds-empty-state>`](empty-state.md) | Reusable no-data or first-run placeholder with structured slots. | none (feedback container) | no | — | — |
| [`<vds-grid>`](grid.md) | Token-safe CSS grid layout primitive. | none (layout primitive) | no | — | — |
| [`<vds-heading>`](heading.md) | Token-bound heading primitive for system typography hierarchy. | none (typography primitive) | no | — | — |
| [`<vds-icon-button>`](icon-button.md) | Square icon-only button with required accessible naming. | Button | yes | — | — |
| [`<vds-label>`](label.md) | Accessible form-field label with required marker support. | label/for | no | — | — |
| [`<vds-menu>`](menu.md) | Action menu revealed from a trigger element. | Menu Button | no | — | default/destructive |
| [`<vds-page-header>`](page-header.md) | Page-level title row with optional leading and action regions. | none (page chrome) | no | — | — |
| [`<vds-select>`](select.md) | Select-only combobox with FACE submission and type-ahead. | Combobox + Listbox (select-only) | yes | — | — |
| [`<vds-separator>`](separator.md) | Visual divider with optional semantic exposure. | Separator | no | — | — |
| [`<vds-skeleton>`](skeleton.md) | Animated loading placeholder for shape-preserving skeleton states. | none (loading placeholder) | no | — | — |
| [`<vds-spacer>`](spacer.md) | Explicit empty space primitive bound to spacing tokens. | none (layout primitive) | no | — | — |
| [`<vds-stack>`](stack.md) | Vertical flex layout primitive with tokenized spacing and alignment. | none (layout primitive) | no | — | — |
| [`<vds-stat-tile>`](stat-tile.md) | Compact KPI tile with label, value, and optional delta. | none (data summary) | no | — | — |
| [`<vds-surface>`](surface.md) | Bordered container primitive for simple token-bound surfaces. | none (layout primitive) | no | — | — |
| [`<vds-switch>`](switch.md) | Immediate on/off control for settings and preferences. | Switch | yes | — | — |
| [`<vds-table>`](table.md) | Semantic table wrapper that standardizes table chrome. | native table wrapper | no | — | — |
| [`<vds-tabs>`](tabs.md) | Single-surface view switching using the APG tabs model. | Tabs | no | — | — |
| [`<vds-text>`](text.md) | Token-bound text primitive for body copy, labels, and metadata. | none (typography primitive) | no | — | — |
| [`<vds-text-area>`](text-area.md) | Multi-line FACE text input with helper and validation support. | native textarea | yes | — | — |
| [`<vds-text-field>`](text-field.md) | Single-line FACE text input with helper and validation support. | textbox | yes | — | — |
| [`<vds-th>`](th.md) | Token-bound table header cell wrapper that preserves real `<th>` semantics. | native table header cell | no | — | — |
| [`<vds-toast>`](toast.md) | Transient notification system with grouped live-region delivery. | Alert / Status | no | — | — |
| [`<vds-tooltip>`](tooltip.md) | Non-interactive descriptive tip shown on hover or focus. | Tooltip | no | — | — |
| [`<vds-cluster>`](cluster.md) | Horizontal wrapping layout primitive for controls, chips, and inline groups. | none (layout primitive) | no | — | — |
<!-- CAPABILITY:END -->

## Page Template

매 페이지는 다음 섹션 순서를 따른다:

```
# Component Name

> Tag · Imports · Pattern · Status

## Purpose
한 줄 설명.

## When to use / not to use
체크리스트 형식.

## Design rationale
컴포넌트 의도와 composition 경계.

## A11y narrative
패턴 선택 사유, 키보드, form-association, SR 경험.

## API
`<!-- CEM:START --> ... <!-- CEM:END -->` marker 안은 CEM build-time generator 가 갱신.

## Examples
HTML + React 두 가지.

## Related
Cross-link.
```

React-only composite or prose-only guide pages are the exception. `app-shell`, `bento-grid`, `entry-dialog`, `glass-surface`, and `theme-toggle` have no Custom Element Manifest declaration, so they keep a prose-only notice plus a hand-written API table instead of `<!-- CEM:START -->` markers.

## Lookup hints (LLM 친화)

`<vds-X>` 태그를 검색했을 때 LLM 이 즉시 파일명에 도달할 수 있도록 다음 키워드를 각 페이지가 명시:

- HTML tag name
- React component name (PascalCase)
- WAI-ARIA pattern name
- 동의어 (e.g. checkbox = check box, tickbox)

Custom Elements Manifest (`packages/design-elements/dist/custom-elements.json`) 는 IDE 인텔리센스와 canonical docs API section 의 단일 기계 소스다. Capability Matrix 역시 같은 CEM 입력에서 build-time 갱신한다.
