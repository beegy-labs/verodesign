# Components — LLM Index

> CDD Layer 2 — Per-component canonical pages | **Last Updated**: 2026-05-01

LLM 이 컴포넌트 사양을 즉시 흡수할 수 있도록 표준화된 페이지. 페이지 1개 = 컴포넌트 1개. 각 페이지는 `purpose / props / slots / events / a11y / tokens / examples` 로 구조화.

## Capability Matrix

| Tag | Purpose | A11y Pattern | Form-associated | Sizes | Tones |
| --- | ------- | ------------ | --------------- | ----- | ----- |
| [`<vds-badge>`](badge.md) | Status / count indicator | none (decorative) | no | sm/md | primary/accent/neutral/destructive/success/warning/info |
| [`<vds-button>`](button.md) | Action trigger | Button | yes | sm/md/lg | primary/accent/neutral/destructive |
| [`<vds-card>`](card.md) | Content container | none | no | — | — |
| [`<vds-checkbox>`](checkbox.md) | Tri-state checkbox | Checkbox | yes | sm/md/lg | primary |
| [`<vds-dialog>`](dialog.md) | Modal dialog | Dialog (Modal) | no | — | — |
| [`<vds-label>`](label.md) | Form field label | label/for | no | sm/md/lg | — |
| [`<vds-menu>`](menu.md) | Action menu | Menu | no | — | — |
| [`<vds-select>`](select.md) | Combobox (select-only) | Combobox + Listbox | yes | — | — |
| [`<vds-separator>`](separator.md) | Visual / semantic divider | Separator | no | — | — |
| [`<vds-switch>`](switch.md) | Toggle switch | Switch | yes | sm/md/lg | primary |
| [`<vds-table>`](table.md) | Semantic table wrapper | none (uses `<table>`) | no | — | — |
| [`<vds-tabs>`](tabs.md) | Tab navigation | Tabs | no | — | — |
| [`<vds-text-area>`](text-area.md) | Multi-line input | textarea | yes | sm/md/lg | — |
| [`<vds-text-field>`](text-field.md) | Single-line input | textbox | yes | sm/md/lg | — |
| [`<vds-toast>`](toast.md) | Transient notification | Alert | no | — | success/warning/error/info |
| [`<vds-tooltip>`](tooltip.md) | Hover/focus tip | Tooltip | no | — | — |

## Page Template

매 페이지는 다음 섹션 순서를 따른다:

```
# Component Name

> Tag · Imports · Pattern · Status

## Purpose
한 줄 설명.

## When to use / not to use
체크리스트 형식.

## Anatomy
ASCII / 슬롯 다이어그램.

## Props (attributes)
Name · Type · Default · Description 표.

## Slots
Name · Description 표.

## Events
Name · detail · Description 표.

## A11y (WAI-ARIA AP 1.2)
Pattern · Keyboard · ARIA roles/states.

## Tokens consumed
컴포넌트가 의존하는 CSS variable 리스트.

## Examples
HTML + React 두 가지.

## Related
Cross-link.
```

## Lookup hints (LLM 친화)

`<vds-X>` 태그를 검색했을 때 LLM 이 즉시 파일명에 도달할 수 있도록 다음 키워드를 각 페이지가 명시:

- HTML tag name
- React component name (PascalCase)
- WAI-ARIA pattern name
- 동의어 (e.g. checkbox = check box, tickbox)

Custom Elements Manifest (`packages/design-elements/dist/custom-elements.json`) 도 자동으로 IDE 인텔리센스용으로 emit. 이 docs 와 manifest 를 함께 참조하면 LLM 이 컴포넌트의 정적 사양 (props/slots/events) 과 의도 (purpose/a11y) 를 모두 알 수 있음.
