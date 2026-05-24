# SDD: girok components — Phase E (3 작업)

> Authored: 2026-05-20 | Workflow: 일반 SDD spec + `.add/codex-delegate.md` 위임 + `.add/skills/brand-isolation.md` + `.add/skills/token-ssot.md`
> Retroactive workflow alignment: 2026-05-21 부 `.add/component-add.md` 신설 후 본 SDD 가 신 워크플로우 기준 통과 확인.
> 선행: Phase A (girok status binding), Phase B (`exp.girok.*` tokens), Phase C (7 pattern-intake spec 재작성), L3 audit (`bnriu4vhz`, `by3nhd2ac`)

## Why

7 pattern-intake spec 의 L3 8-axis audit + brand-isolation 정합 종합 결과:
- 3 pattern (amount-hero / product-card / view-toggle) = REUSE_AS_IS — consumer composition 만으로 verodesign 변경 0
- 1 pattern (account-badge) = consumer 의 의미적 매핑 (`tone="destructive"` 한국 상승 / `tone="info"` 하락) — verodesign 변경 0
- 3 pattern (binary-pill-toggle / settings-row / scrollbar-hide) = verodesign 신설 필요

본 SDD scope = **3 신설 작업 + brand-isolation 강제**.

## Scope

### 1. `BinaryPillToggle` 신설 (Lit element + React adapter)

**source unit**: `app-girok/docs/design/units/{household-ledger-management-fixed-income-expense,modal-savings-add,modal-transaction-add}.md`

**Why new**: APG Tabs (`role="tablist"/tab/tabpanel"`) 와 의미 다름. form choice = APG Radio Group 또는 Toggle Button group. Tabs 의 `variant="segmented"` 위에 새 role 모드 추가는 `tabpanel` 계약 끊는 즉시 새 primitive 와 등가 (L3 audit 결론).

**파일**:
- `packages/design-elements/src/components/binary-pill-toggle/vds-binary-pill-toggle.ts` (Lit element)
- `packages/design-elements/src/components/binary-pill-toggle/index.ts` (export)
- `packages/design-react/src/components/BinaryPillToggle.tsx` (React adapter via `@lit/react`)
- 기존 `packages/design-elements/src/index.ts` + `packages/design-react/src/index.ts` 에 export 추가

**API (drafted)**:
```ts
// vds-binary-pill-toggle
@property({ type: String, reflect: true }) value: string = '';
@property({ type: String, reflect: true }) emphasis: 'neutral' | 'success' | 'destructive' | 'brand' = 'neutral';
@property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
@property({ type: Boolean, reflect: true }) disabled = false;
@property({ type: String, attribute: 'aria-label' }) ariaLabel: string | null = null;

// slot 'option' x2 (정확히 2개 자식)
// 각 vds-binary-pill-toggle-option: @property value, @property disabled

// React Props
type BinaryPillToggleProps<T extends string> = {
  value: T;
  options: [{ value: T; label: ReactNode; disabled?: boolean }, { value: T; label: ReactNode; disabled?: boolean }];
  emphasis?: 'neutral' | 'success' | 'destructive' | 'brand';
  size?: 'sm' | 'md';
  disabled?: boolean;
  'aria-label': string;
  onValueChange?: (v: T) => void;
};
```

**a11y (WAI-ARIA APG)**:
- Lit element: `role="radiogroup"` (APG Radio Group https://www.w3.org/WAI/ARIA/apg/patterns/radio/)
- 각 option: `role="radio"` + `aria-checked` + `tabindex` (roving)
- Keyboard: Arrow Up/Down/Left/Right → 토글 선택 이동 (single-axis), Home/End → 첫/마지막, Space → 선택 (Enter는 폼 submit 트리거 안 함)
- ElementInternals + FACE (form-associated): `formAssociated=true`, `setFormValue()`
- focus-visible

**토큰 — brand-isolation 정합**:
- ✅ `var(--vds-theme-bg-card)`, `var(--vds-theme-bg-selected)`, `var(--vds-theme-text-primary)`, `var(--vds-theme-text-secondary)`, `var(--vds-theme-border-default)`, `var(--vds-theme-success)`, `var(--vds-theme-success-fg)`, `var(--vds-theme-destructive)`, `var(--vds-theme-destructive-fg)`, `var(--vds-theme-state-selected)`
- ❌ `--vds-exp-girok-*` 직접 참조 금지 (brand-isolation 검출 4)
- ❌ raw hex / rgba / oklch 금지 (검출 3)
- ❌ raw size primitive (`--vds-font-size-xs`) 직접 사용 금지, role token 만 (token-ssot 검출 1)
- ❌ 치수 하드코딩 금지 (`min-height: 32px` ✗, `var(--vds-spacing-*)` 만, token-ssot 검출 2)

**모션**: emphasis 변경 시 background-color/color transition `var(--vds-motion-transition-fast)` (canonical motion token. 없으면 별 token-add 선행)

### 2. `CompactRow` Lit promote + state/href 확장

**source unit**: `app-girok/docs/design/units/{settings-system-links,settings-data-log}.md`

**Why promote**: React-only export 가 Lit 측 core parity 미달. Lit element 신설 + React adapter 갱신 + `href` / `tone` / `hover state` / `focus-visible` / `disabled` 확장. Lit promote 가 새 컴포넌트 신설보다 정공법 (L3 audit 결론).

**파일**:
- `packages/design-elements/src/components/compact-row/vds-compact-row.ts` (Lit element 신설)
- `packages/design-elements/src/components/compact-row/index.ts`
- `packages/design-react/src/components/CompactRow.tsx` (Lit-backed 으로 갱신 — `@lit/react`)
- 기존 React-only `CompactRow.tsx` 의 API 보존 (backward-compat, breaking 없음)

**API (drafted)**:
```ts
// vds-compact-row
@property({ type: String, reflect: true }) as: 'button' | 'link' | 'div' = 'button';
@property({ type: String }) href: string | null = null;  // as='link' 일 때만
@property({ type: String, reflect: true }) tone: 'neutral' | 'info' | 'success' | 'warning' | 'danger' = 'neutral';
@property({ type: Boolean, reflect: true }) selected = false;
@property({ type: Boolean, reflect: true }) disabled = false;
@property({ type: Boolean, reflect: true, attribute: 'show-chevron' }) showChevron = false;

// slot leading / default(label) / meta / trailing

// React Props (기존 + 확장)
type CompactRowProps = {
  leading?: ReactNode;
  label: ReactNode;
  meta?: ReactNode;
  trailing?: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  // 신규
  as?: 'button' | 'link' | 'div';
  href?: string;
  tone?: 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  showChevron?: boolean;
};
```

**alpha tint 제외 (brand-isolation 정합)**: `bg-indigo-500/10`, `bg-emerald-500/10` 등 alpha-tinted leading icon tile 은 컴포넌트가 표현 안 함. `leading` slot 에 어떤 ReactNode/element 가 들어와도 되고, alpha tint 적용은 **consumer (app-girok) 책임** — `<div style={{ background: 'var(--vds-exp-girok-icon-tile-info)' }}>icon</div>` 같이 inline 또는 styled.

**a11y**:
- `as='button'`: native `<button>`, native keyboard (Space/Enter), focus-visible
- `as='link'`: native `<a href>`, native keyboard (Enter), focus-visible
- `as='div'`: 정보 표시 only, interactive 아님
- `disabled` → `aria-disabled` + pointer-events: none
- `selected` → `aria-current="true"` (interactive 일 때)

**토큰 — brand-isolation 정합**:
- ✅ canonical only (`var(--vds-theme-*)`)
- ❌ `--vds-exp-girok-icon-tile-*` 등 컴포넌트 내부 참조 금지
- tone variant 는 canonical (`theme.info/success/warning/destructive`) 의 색을 hover/focus 강조에 사용

### 3. `scrollbar-hide` web utility 신설

**source unit**: `app-girok/docs/design/units/{global-main-routing,tab-assets,tab-debt,tab-invest,tab-settings}.md`

**Why new**: `web` slot group utility. 컴포넌트 아님. WebKit/Firefox/Chromium 별 scrollbar-hidden CSS rule 통합.

**파일**:
- `packages/utilities/src/scrollbar.css` (또는 등가 위치) — 아래 CSS rule:

```css
@layer vds-utilities {
  .vds-scrollbar-hide {
    -ms-overflow-style: none;        /* IE/Edge */
    scrollbar-width: none;            /* Firefox */
  }
  .vds-scrollbar-hide::-webkit-scrollbar {
    display: none;                    /* WebKit/Chromium */
  }
}
```

- `packages/utilities/src/index.css` 또는 등가 entry 에 import 추가
- `packages/utilities/dist/css/full.css` 빌드 산출에 포함 확인

**a11y**: scroll 자체는 유지 (overflow:hidden 아님), 키보드/wheel/touch 모두 작동. utility 사용 가이드에 "app-shell-like surface 에만 적용" 권고.

**brand-isolation**: web utility = canonical CSS rule, brand 무관. 정합 자동.

## Acceptance gates

| Gate | 요구 | 검출 |
|------|------|------|
| `pnpm --filter @verobee/* build` 통과 | Yes | build script |
| brand-isolation 검출 1 (다른 brand theme 변경 0) | Yes | `git diff packages/design/tokens/themes/` 결과 = 0 (Phase A/B 변경 외) |
| brand-isolation 검출 3 (컴포넌트 raw color/hex/rgba/oklch 0) | Yes | `rg '#[0-9a-fA-F]{3,8}\|rgba?\(\|oklch\(' packages/design-elements/src/components/{binary-pill-toggle,compact-row}/` = 0 |
| brand-isolation 검출 4 (컴포넌트 brand prefix 직접 참조 0) | Yes | `rg -- '--vds-(verobase\|veronex\|girok\|default)-' packages/design-elements/src/components/{binary-pill-toggle,compact-row}/` = 0 |
| token-ssot 검출 1 (raw font-size primitive 0) | Yes | `rg -- '--vds-font-size-(xs\|sm\|base\|...)' packages/design-elements/src/components/{binary-pill-toggle,compact-row}/` = 0 |
| token-ssot 검출 2 (치수 하드코딩 0) | Yes | `rg -- '(min-height\|height\|font-size):\s*[0-9.]+(rem\|px)' packages/design-elements/src/components/{binary-pill-toggle,compact-row}/` = 0 |
| CEM (Custom Elements Manifest) 자동 생성 | Yes | `dist/custom-elements.json` 에 신규 element 등록 |
| @lit/react adapter | Yes | React adapter 가 createComponent 사용 |
| a11y 기본 테스트 통과 | Yes | Web Test Runner + @open-wc/testing |
| 컴포넌트 import 가능 | Yes | `import { BinaryPillToggle, CompactRow } from '@verobee/design-react'` 작동 |

## Out-of-scope (별 SDD)

- Badge tone 확장 (취소: brand-isolation 위반)
- `theme.market-up/down` canonical slot 신설 (cross-brand 입증 부재)
- `theme.icon-tile.*` canonical slot 신설 (cross-brand 입증 부재)
- amount-hero / product-card / view-toggle wrapper 신설 (REUSE_AS_IS — consumer composition)
- app-girok 마이그레이션 (Phase F)
- showcase 사이트 추가 (Phase E3)
- 시각 회귀 (Playwright 등)

## Validation steps (Codex 자가검증)

1. SDD 정독
2. 기존 컴포넌트 source 정독 (vds-tabs.ts, vds-card.ts, vds-badge.ts 등 — 패턴 참고)
3. 3 작업 구현:
   - BinaryPillToggle Lit + React + a11y 테스트
   - CompactRow Lit element + React adapter (기존 React-only 백워드 보존) + state/href 확장
   - scrollbar-hide CSS utility
4. brand-isolation skill 검출 1-4 + token-ssot 검출 1-3 모두 0 확인
5. `pnpm --filter @verobee/design-elements build` + `pnpm --filter @verobee/design-react build` + `pnpm --filter @verobee/utilities build` 통과
6. CEM 자동 생성 확인
7. 기본 a11y 테스트 (Web Test Runner)
8. CHANGELOG entry 추가 (각 패키지)
9. 보고 (≤ 200줄): 신설 파일 list, brand-isolation 검출 0 증거, build 결과, 테스트 결과

## Layer-3 audit (별 세션)

- brand-isolation 검출 1-4 + token-ssot 검출 1-3 재실측 0
- a11y attribute 정합 (radiogroup/radio + tabindex roving)
- CEM 자동 생성 검증
- ARIA APG Radio Group / Button 표준 부합
- `pnpm --filter @verobee/* build` 통과
- Phase A/B 토큰 unchanged
- 다른 컴포넌트 source unchanged (`git diff packages/design-{elements,react}/src/` 가 신설 폴더 + CompactRow.tsx 만)
