# Component Reuse Audit — 7 pattern-intake

> Generated: 2026-05-20 | read-only audit of `2026-05-20-pattern-*/spec.md` ↔ design-elements existing components

## Summary
| pattern | verdict | rationale (≤ 50 chars) |
| --- | --- | --- |
| account-badge | REUSE_WITH_PROP_EXT | Badge 기반 가능, 원형/avatar tone 부족 |
| amount-hero | WRAPPER_COMPONENT | StatTile+Heading 조합은 되나 hero 래퍼 필요 |
| binary-pill-toggle | NEW_COMPONENT | Tabs a11y 가 form choice 와 불일치 |
| product-card | WRAPPER_COMPONENT | Card 조합 가능, clickable product wrapper 필요 |
| settings-row | NEW_COMPONENT | CompactRow 는 React-only, core/Lit 부재 |
| view-toggle | WRAPPER_COMPONENT | Tabs segmented 기반 가능, compact toolbar 래퍼 필요 |
| scrollbar-hide | NEW_COMPONENT | 컴포넌트가 아닌 web utility 신규 필요 |

## Per-pattern detail

### account-badge

**design.txt 원본 시각**:
- `assets-overview-cash.md` 외형 인벤토리: `w-8`/`h-8`, `rounded-full`, `shadow-sm`, `badge-style institution glyph`.
- `invest-positions.md` 외형 인벤토리: `w-10`/`h-10`, `rounded-full`, `shadow-inner`, `ticker initial avatar`, `profit color semantics reversal (up=rose, down=blue)`.
- 출처: `design.txt L505–529`, `design.txt L470–489`.

**기존 후보 컴포넌트** (Badge):
- Lit `vds-badge` props:
  - `@property({ type: String, reflect: true }) variant: Variant = 'soft';` `packages/design-elements/src/components/badge/vds-badge.ts:76`
  - `@property({ type: String, reflect: true }) tone: Tone = 'neutral';` `.../vds-badge.ts:77`
  - `@property({ type: String, reflect: true }) size: Size = 'md';` `.../vds-badge.ts:78`
  - tone set: `primary|accent|neutral|destructive|success|warning|info` `.../vds-badge.ts:6`
  - slot: default + `start` + `end` `.../vds-badge.ts:12-14`, render `.../vds-badge.ts:82-85`
- React `<Badge>` Props:
  - `interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> { variant?: BadgeVariant; tone?: BadgeTone; size?: BadgeSize; }` `packages/design-react/src/components/Badge.tsx:8-12`
  - tone set 동일 `.../Badge.tsx:4-6`

**Cross-check**:
| 축 | 기존 cover? | 갭 |
| --- | --- | --- |
| 시각 (color/gradient/shadow) | No | `size="sm|md"` 는 pill padding 기반이고 고정 `32/40px` 원형 avatar가 아님. `tone` 도 `market.up/down` 없음. `soft` 는 가능하지만 `shadow-inner`/avatar surface 는 없음. |
| 구조 (leading icon + symbol + market tone) | Partial | Lit 은 `start`/`end` slot 이 있지만 핵심 구조는 status badge 가 아니라 단일 중앙 glyph avatar다. default slot 으로 1~2자 표시는 가능하나 원형 고정 폭 구조가 없다. |
| a11y (ARIA role, keyboard) | Yes | 정적 식별 배지라 별도 role/keyboard 요구가 없다. `span` 기반으로 무해하다. |
| 확장 필요 | prop X / tone Y | `shape="circle"`, `size="sm|md"`의 avatar dimensions, `tone="brand|market-up|market-down"`, optional `selected`/`disabled` state 필요. |

**Verdict**: `REUSE_WITH_PROP_EXT`

필요 변경:
- `vds-badge`: pill padding 대신 fixed square/circle avatar mode 추가
- `vds-badge`: `tone` 에 `brand`, `market-up`, `market-down` 추가
- 선택 상태가 필요하면 `selected` 또는 `variant="selected"` 추가

### amount-hero

**design.txt 원본 시각**:
- `assets-overview-total.md` 외형 인벤토리: `text-center`, `space-y-1`, `text-xs`, `text-3xl`, `font-black`, `centered amount hero with support label`.
- `debt-summary.md` 외형 인벤토리: `linear-gradient(to bottom right, #1C1A14, #14120E)`, `rounded-3xl`, `shadow-lg`, `two-column metric layout`, summary strip.
- 출처: `design.txt L499–503`, `design.txt L576–592`.

**기존 후보 컴포넌트** (StatTile + Heading):
- Lit `vds-stat-tile` props:
  - `label`, `value`, `delta`, `hint` `packages/design-elements/src/components/stat-tile/vds-stat-tile.ts:74-77`
  - `deltaTone` `.../vds-stat-tile.ts:78`
  - `tone: 'default'|'success'|'warning'|'error'` `.../vds-stat-tile.ts:79`, type `.../vds-stat-tile.ts:6`
  - slot: `icon` only `.../vds-stat-tile.ts:12`, render `.../vds-stat-tile.ts:83-90`
- React `<StatTile>` Props:
  - `label?: string; value?: string; delta?: string; hint?: string; deltaTone?: DeltaTone; tone?: StatTone;` `packages/design-react/src/components/StatTile.tsx:6-13`
- Lit `vds-heading` props:
  - `level` `packages/design-elements/src/components/heading/vds-heading.ts:41`
  - `as` `.../vds-heading.ts:44`
  - `tone: 'bright'|'default'|'muted'` `.../vds-heading.ts:46`
- React `<Heading>` Props:
  - `level?: Level; as?: AsTag; tone?: Tone;` `packages/design-react/src/components/Heading.tsx:6-10`

**Cross-check**:
| 축 | 기존 cover? | 갭 |
| --- | --- | --- |
| 시각 (color/gradient/shadow) | Partial | `StatTile` value emphasis와 tone coloring 은 가능하지만 hero gradient surface, `rounded-3xl`, summary strip, split two-column hierarchy는 기존 prop만으로 안 된다. |
| 구조 (leading icon + symbol + market tone) | Partial | single metric은 `label/value/hint` 로 되지만 paired metric, `align="center|start|split"`, caption strip 은 wrapper composition 필요. |
| a11y (ARIA role, keyboard) | Yes | 정적 정보 블록이라 특별한 interaction 없다. `Heading` 으로 semantic heading 조합 가능. |
| 확장 필요 | wrapper | 기존 핵심 primitives 는 충분하나 hero-specific layout/styling 묶는 thin wrapper 가 필요. |

**Verdict**: `WRAPPER_COMPONENT`

필요 변경:
- `AmountHero` 를 `Heading + StatTile + Box/Surface` 조합 wrapper 로 신설
- wrapper 에 `align`, `tone`, `secondaryLabel`, `secondaryValue`, `caption` 만 노출
- gradient/background 는 girok token class binding 으로 처리

### binary-pill-toggle

**design.txt 원본 시각**:
- `household-ledger-management-fixed-income-expense.md` 외형 인벤토리: `2-state type toggle`, `bg-rose-500`, `bg-emerald-500`, `rounded-xl`, `text-xs font-bold`.
- `modal-savings-add.md` 외형 인벤토리: `grid-cols-2 gap-2 bg-[#0E0D0A] p-1 rounded-xl`, selected `bg-emerald-500 text-white`.
- `modal-transaction-add.md` 외형 인벤토리: selected `bg-rose-500`/`bg-emerald-500`, `segmented type toggle`.
- 출처: `design.txt L324–356`, `L833–855`, `L784–808`.

**기존 후보 컴포넌트** (Tabs `variant=segmented`):
- Lit `vds-tabs` props:
  - `value` `packages/design-elements/src/components/tabs/vds-tabs.ts:53`
  - `orientation` `.../vds-tabs.ts:54`
  - `activation` `.../vds-tabs.ts:55`
  - `variant: 'underline'|'segmented'` `.../vds-tabs.ts:56`
  - ARIA/keyboard: `role="tablist"` render `.../vds-tabs.ts:174`, `setRole(...,'tab')` `.../vds-tabs.ts:235`, arrow/home/end/enter handlers `.../vds-tabs.ts:142-169`
  - `VdsTab` props: `value`, `disabled` `.../vds-tabs.ts:227-228`
- React `<Tabs>` Props:
  - `value?`, `activation?`, `orientation?`, `variant?`, `onChange?` `packages/design-react/src/components/Tabs.tsx:21-27`
  - `TabProps { value?: string; disabled?: boolean; }` `.../Tabs.tsx:29-32`

**Cross-check**:
| 축 | 기존 cover? | 갭 |
| --- | --- | --- |
| 시각 (color/gradient/shadow) | Partial | `variant="segmented"` rail과 active sub-surface는 있다. 하지만 selected state를 option별 `success/destructive/brand` surface 로 바꾸는 prop이 없다. |
| 구조 (leading icon + symbol + market tone) | Yes | 정확히 2개 item 은 조합 가능하다. label-only 2-column rail 구조는 `Tabs`/`Tab` children 으로 표현된다. |
| a11y (ARIA role, keyboard) | No | 현재는 APG Tabs pattern이다. spec 의도는 panel navigation보다 form choice/radio-like selection 이다. `role="tab"`/`tabpanel` 계약이 choice control 과 다르다. |
| 확장 필요 | new component | visual 확장보다 semantic gap 이 크다. radio/segmented-choice semantics 와 form integration 이 필요하다. |

**Verdict**: `NEW_COMPONENT`

필요 변경:
- `BinaryPillToggle` 는 `role="radiogroup"` 또는 2-button toggle pattern 으로 별도 구현
- `emphasis="neutral|success|destructive|brand"` 와 `size="sm|md"` 추가
- form value / disabled / keyboard 를 tabs 와 분리

### product-card

**design.txt 원본 시각**:
- `assets-overview-savings.md` 외형 인벤토리: `rounded-xl`, `left accent rail`, `product type badge`, `delete affordance on hover`.
- `debt-loans.md` 외형 인벤토리: `priority repayment pill semantics`, bordered surface, footer CTA cluster.
- 출처: `design.txt L531–549`, `design.txt L594–646`.

**기존 후보 컴포넌트** (Card + Badge + StatTile composition):
- Lit `vds-card` props:
  - `variant: 'surface'|'outline'|'ghost'` `packages/design-elements/src/components/card/vds-card.ts:63`
  - `elevation: '0'|'1'|'2'|'3'|'4'|'5'` `.../vds-card.ts:64`
  - slots: default, `header`, `footer` `.../vds-card.ts:11-13`, render `.../vds-card.ts:67-69`
- React `<Card>` Props:
  - `variant?: CardVariant; elevation?: CardElevation;` `packages/design-react/src/components/Card.tsx:6-9`
  - `slot="header"` / `slot="footer"` child partition `.../Card.tsx:16-28`
- Badge/StatTile inventory:
  - `<Badge>` props `variant|tone|size` `packages/design-react/src/components/Badge.tsx:8-12`
  - `<StatTile>` props `label|value|delta|hint|deltaTone|tone` `packages/design-react/src/components/StatTile.tsx:6-13`

**Cross-check**:
| 축 | 기존 cover? | 갭 |
| --- | --- | --- |
| 시각 (color/gradient/shadow) | Partial | bordered card, badge, metrics는 가능하다. 하지만 savings `left accent rail`, loan `priority` pill tone, hover affordance 는 prop만으로 고정되지 않는다. |
| 구조 (leading icon + symbol + market tone) | Yes | `Card` header/body/footer slots + nested `Badge`/metric stack 으로 title/meta/status/footer 구조는 조합 가능하다. |
| a11y (ARIA role, keyboard) | Partial | `Card` 는 `<section>` 이라 clickable product surface semantic이 없다. 카드 전체 클릭이면 wrapper 가 `button` 또는 `a` semantics 를 소유해야 한다. |
| 확장 필요 | wrapper | composition 자체는 충분하나 product-card 전용 clickable contract, variant surface, footer cluster 묶음이 필요하다. |

**Verdict**: `WRAPPER_COMPONENT`

필요 변경:
- `ProductCard` 는 `Card` 조합 wrapper 로 신설
- wrapper 가 `as="button|a|div"` 또는 `href/onClick/disabled` 를 소유
- `variant="savings|loan|neutral"` 에 따라 accent rail / badge preset / priority pill mapping 제공

### settings-row

**design.txt 원본 시각**:
- `settings-system-links.md` 외형 인벤토리: `grouped row`, `chevron affordance`, `bg-indigo-500/10`, `bg-emerald-500/10`, `bg-amber-500/10`.
- `settings-data-log.md` 외형 인벤토리: `bg-rose-500/10`, `bg-zinc-800`, grouped button rows, trailing chevron.
- 출처: `design.txt L656–690`, `L692–720`.

**기존 후보 컴포넌트** (CompactRow + Badge):
- Lit candidate:
  - 없음. `packages/design-elements/src/components` 에 `compact-row` 미존재.
- React `<CompactRow>` Props:
  - `leading?: React.ReactNode; label: React.ReactNode; meta?: React.ReactNode; trailing?: React.ReactNode; onClick?: () => void; selected?: boolean; className?: string;` `packages/design-react/src/components/CompactRow.tsx:3-10`
  - DOM: `onClick` 있으면 `button`, 아니면 `div` `.../CompactRow.tsx:22-27`
- React `<Badge>` Props:
  - `variant|tone|size` only `packages/design-react/src/components/Badge.tsx:8-12`

**Cross-check**:
| 축 | 기존 cover? | 갭 |
| --- | --- | --- |
| 시각 (color/gradient/shadow) | No | leading tinted icon tile (`indigo/emerald/amber/rose`) 와 grouped divider rhythm, hover chevron emphasis 가 고정 API에 없다. |
| 구조 (leading icon + symbol + market tone) | Partial | `CompactRow` 의 `leading/label/meta/trailing` 은 맞지만 grouped container/divider, link semantics, showChevron preset 이 없다. |
| a11y (ARIA role, keyboard) | Partial | React helper 는 `button` 까지는 되지만 `href` 링크 row, core Lit parity, focus-visible contract 가 없다. |
| 확장 필요 | new component | design-elements core 부재가 가장 크다. React helper 재활용만으로는 system component 로 보기 어렵다. |

**Verdict**: `NEW_COMPONENT`

필요 변경:
- Lit `vds-settings-row` + React adapter 신규 필요
- `tone="neutral|info|success|warning|danger"`, `icon`, `description`, `href`, `showChevron`, grouped divider 옵션 필요
- 내부적으로 tinted icon tile 을 preset 으로 고정

### view-toggle

**design.txt 원본 시각**:
- `household-ledger-records-toolbar.md` 외형 인벤토리: compact `flex bg-[#1A1813] rounded-lg p-1 border`, selected `bg-[#2E281C] text-amber-400`, icon-only 2-state toggle.
- `invest-quick-actions.md` 외형 인벤토리: amber emphasis gradient language; spec note 는 same compact two-state affordance 응용 가능성.
- 출처: `design.txt L208–233`, `L457–468`.

**기존 후보 컴포넌트** (Tabs `variant=segmented`, icon-only):
- Lit `vds-tabs` / `vds-tab` props:
  - `value|orientation|activation|variant` `packages/design-elements/src/components/tabs/vds-tabs.ts:53-56`
  - `VdsTab` `value|disabled` `.../vds-tabs.ts:227-228`
  - segmented visuals `.../vds-tabs.ts:31-35`, active tab `.../vds-tabs.ts:216-218`
- React `<Tabs>/<Tab>` Props:
  - `TabsProps` `packages/design-react/src/components/Tabs.tsx:21-27`
  - `TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement>` `.../Tabs.tsx:29-32`
  - icon-only accessible label 가능: `aria-label` pass-through via button props `.../Tabs.tsx:181-195`

**Cross-check**:
| 축 | 기존 cover? | 갭 |
| --- | --- | --- |
| 시각 (color/gradient/shadow) | Partial | segmented rail과 selected sub-surface는 있다. 하지만 toolbar의 very-compact `p-1.5`, warm active chip `#2E281C`, optional accent glow 는 preset 없음. |
| 구조 (leading icon + symbol + market tone) | Yes | icon-only 2-item rail은 `Tab` children 으로 표현 가능하고, React `TabProps` 가 button attrs 를 상속하므로 `aria-label` 부여 가능하다. |
| a11y (ARIA role, keyboard) | Partial | 실제 view 전환이 대응 panel 을 토글한다면 tabs semantics 사용 가능하다. toolbar mode switch 로만 쓰면 semantics 가 약간 과하다. |
| 확장 필요 | wrapper | 새 primitive까지는 아니고, `Tabs segmented` 위에 compact sizing/label contract 를 얹는 wrapper 가 적절하다. |

**Verdict**: `WRAPPER_COMPONENT`

**구현 가이드**:
```tsx
<Tabs value={view} variant="segmented" onChange={handleChange} className="view-toggle">
  <Tab value="calendar" aria-label="달력 보기"><CalendarIcon /></Tab>
  <Tab value="list" aria-label="목록 보기"><ListIcon /></Tab>
</Tabs>
```

필요 변경:
- `ViewToggle` wrapper 가 compact sizing, warm active surface, optional `icon+label` preset 제공
- panels 를 실제로 갖지 않는 사용처면 a11y note 를 명시하거나 전용 toggle semantics 로 재검토

### scrollbar-hide

**design.txt 원본 시각**:
- `global-main-routing.md` 외형 인벤토리: `overflow-y-auto`, `scrollbar-hide`, shell background.
- `tab-assets.md`, `tab-debt.md`, `tab-invest.md`, `tab-settings.md` 외형 인벤토리: 공통적으로 `overflow-y-auto` + `scrollbar-hide`.
- 출처: `design.txt L183–191`, `L495–498`, `L572–575`, `L387–390`, `L647–655`.

**기존 후보 컴포넌트**:
- 없음.
- 관련 existing utility only:
  - repo decisions 에 overflow utility 는 in-scope 이지만 scrollbar chrome hide 는 명시적 existing export 없음.

**Cross-check**:
| 축 | 기존 cover? | 갭 |
| --- | --- | --- |
| 시각 (color/gradient/shadow) | No | `overflow-y-auto` 는 스크롤 유지까지만 cover 한다. 브라우저 scrollbar chrome hide 는 전혀 cover 하지 않는다. |
| 구조 (leading icon + symbol + market tone) | N/A | layout utility 이므로 slot/composition 대상이 아니다. |
| a11y (ARIA role, keyboard) | Partial | 스크롤은 유지되므로 기능적 a11y는 가능하지만 scrollbar 시각 제거는 discoverability 리스크가 있어 utility contract 차원 검토가 필요하다. |
| 확장 필요 | new component | 실질적으로 component 가 아니라 web-only CSS utility 신규 추가가 필요하다. |

**Verdict**: `NEW_COMPONENT`

필요 변경:
- 실제 범주는 `NEW_UTILITY`
- 예: `.vds-scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; } .vds-scrollbar-hide::-webkit-scrollbar { display:none; }`
- axis variant 가 필요하면 `x|y|both` 는 후속 SDD 에서 분리

## 종합 권고

| verdict count | components |
| --- | --- |
| REUSE_AS_IS | 0: - |
| REUSE_WITH_PROP_EXT | 1: account-badge |
| WRAPPER_COMPONENT | 3: amount-hero, product-card, view-toggle |
| NEW_COMPONENT | 3: binary-pill-toggle, settings-row, scrollbar-hide |

다음 단계:
- REUSE_AS_IS 그룹 → 없음
- REUSE_WITH_PROP_EXT 그룹 → `Badge` 확장 SDD 1건으로 묶는 편이 합리적
- WRAPPER_COMPONENT 그룹 → app-girok 조합을 표준화하는 thin wrapper SDD 3건
- NEW_COMPONENT 그룹 → `BinaryPillToggle`, `SettingsRow`, `scrollbar-hide utility` 는 별도 SDD 필요

## verodesign decisions 정합 메모
- `additive, don't duplicate` 관점에서 `AmountHero`, `ProductCard`, `ViewToggle` 는 기존 primitive 위 thin wrapper 가 맞다.
- `Naming is policy, not implementation` 관점에서 `loan.priority`, `market.up/down`, `icon-tile.*` 같은 의미 분리는 유지해야 한다.
- component core 는 `@verobee/design-elements` Lit 기준이다. `CompactRow` 처럼 React-only helper 는 system reusable core 근거로 약하다.
- v0.2.0-alpha first set 밖의 영역이라도, a11y semantic mismatch 가 크면 무리한 재사용보다 신규 primitive 가 낫다. 이번 audit 에서 `BinaryPillToggle` 이 그 케이스다.
