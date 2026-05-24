# Pattern Intake: Icon component — `<vds-icon>` + React adapter

> Slug: `pattern-icons` · Created: 2026-05-22 · Status: **proposed** · Owner: vero · Driver app: **app-girok redesign** (mock `/Users/vero/workspace/beegy/app-design-2.txt:1-7` lucide-react import 35종)

## 1. Knowledge-gap check

- verodesign 신규 패키지 선례 없음. WC-first 패턴(Button/Dialog/Tabs/Toast)을 따르도록 본 SDD는 **`packages/design-elements/` + `packages/design-react/` 안에 신설**(별도 패키지 아님). 신규 패키지 도입은 defer.
- 산업 WC 패턴: Shoelace `<sl-icon>` 단일 컴포넌트 + library 시스템(name 속성 + 외부 등록). 본 SDD는 이 패턴 채택.
- 외부 의존성: 현재 verodesign에 SVG 아이콘 라이브러리 0건.

## 2. Source & Rationale

- **Source art**: [lucide.dev](https://lucide.dev) (ISC 라이선스, attribution 요구). SVG path 데이터만 차용, 자체 Lit 템플릿으로 재패키징.
- **Why**: app-girok 리디자인 mock이 35종 아이콘 사용. verodesign에 아이콘 시스템 부재. 사용자가 "verodesign에 적용하는 design pattern"임을 명시 — 별도 패키지/외부 의존 회피, design-elements 안에 정착.

## 3. Architecture decision — single WC + registry + per-icon React adapters

| 후보 | 채택 | 사유 |
|---|---|---|
| (A) 단일 `<vds-icon name="...">` + 등록 레지스트리 | ✅ | WC 1개만 customElements 등록(레지스트리 오염↓), per-icon registration 모듈로 tree-shaking 보존, Shoelace 선례 |
| (B) 35개 개별 `<vds-icon-calendar>` 등 | ✗ | customElements 35종 등록은 verodesign 다른 컴포넌트 패턴과 비대칭 |
| (C) Sprite + `<use href="#…">` | ✗ | 별도 sprite 로드 의존, tree-shaking 어려움 |
| (D) React-only(WC 없음) | ✗ | 사용자가 WC-first 패턴 일관성을 명시 채택 |

**채택 구조**:

```
packages/design-elements/src/components/icon/
├─ vds-icon.ts                  ← Lit element (단일 WC, name 속성 기반)
├─ define.ts                     ← customElements.define('vds-icon', ...)
├─ index.ts                      ← export { VdsIcon, registerIcon }
└─ icons/
   ├─ calendar.ts                ← registerIcon('calendar', svg`<path d="…"/>`)
   ├─ chevron-left.ts
   ├─ … (35종)

packages/design-react/src/icons/
├─ createIcon.tsx                ← React wrapper 팩토리(@lit/react useController 또는 VdsIcon 직접 렌더)
├─ Calendar.tsx                  ← export const Calendar = createIcon('calendar')
├─ ChevronLeft.tsx
└─ … (35종)
```

**Side-effect import 체인** (tree-shakeable):
- `import { Calendar } from "@verobee/design-react"` 
  → `Calendar.tsx` 가 `@verobee/design-elements/icon-registry/calendar` 부수효과 import
  → `calendar.ts` 가 레지스트리에 SVG 등록
  → 미사용 35-1개 아이콘은 번들에서 제거

## 4. Scope — initial release

**35 icons** (mock `app-design-2.txt:2-7` lucide import 그대로):

```
Calendar · List · ChevronLeft · ChevronRight · Home · Wallet · Activity ·
ShoppingBag · MoreHorizontal · Menu · X · TrendingUp · CreditCard · PieChart ·
Settings · Bell · ToggleLeft · ToggleRight · Trash2 · FolderEdit · Plus ·
Target · Zap · Landmark · ArrowDownRight · ArrowUpRight · Users · ShieldCheck ·
FileText · ArrowRightLeft · History · Download · RefreshCcw · Check · Edit2
```

36번째 이상은 consumer(현재 app-girok) 요구 등장 시 incremental PR. defer.

## 5. Public API

### 5.1 Web Component (`<vds-icon>`)

```html
<vds-icon name="calendar" size="md" stroke-width="2"></vds-icon>
<vds-icon name="x" size="20"></vds-icon>
<vds-icon name="settings" aria-label="설정"></vds-icon>
```

**Attributes**:
| 속성 | 타입 | 기본 | 설명 |
|---|---|---|---|
| `name` | string | (필수) | 등록된 아이콘 이름. 미등록 시 콘솔 warn + empty 렌더 |
| `size` | `"sm"`\|`"md"`\|`"lg"`\|number | `"md"` | sm=16, md=20, lg=32, number=px |
| `stroke-width` | number | `var(--vds-icon-stroke-width)` = 2 | |
| `aria-label` | string | (없음) | 미지정 시 `aria-hidden="true"` 자동 |

**Shadow DOM**: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" focusable="false">…</svg>`, 사이즈는 `:host` CSS에 `width/height: var(--_size)`. 색은 `currentColor` 상속.

### 5.2 React adapter (`@verobee/design-react`)

```tsx
import { Calendar, ChevronLeft, X } from "@verobee/design-react";

<Calendar size={20} />
<ChevronLeft strokeWidth={2} aria-label="이전 달" />
<X className="vds-text-muted" />
```

**Props** (모든 icon 공통):
```ts
interface IconProps extends React.HTMLAttributes<HTMLElement> {
  size?: number | "sm" | "md" | "lg";
  strokeWidth?: number;
  // className, style, onClick, role, aria-* … passthrough → vds-icon
}
```

Color prop 없음 — 호출자가 `color` CSS property 또는 `vds-*` 토큰 클래스로 결정.

### 5.3 등록 모듈 export 경로

`packages/design-elements/package.json` exports map:
```json
{
  "exports": {
    ".": "./dist/index.js",
    "./icon-registry/*": "./dist/components/icon/icons/*.js"
  }
}
```

## 6. Token dependencies

**신규 canonical 토큰** (`packages/design/tokens/canonical/icon.json`):

```json
{
  "icon": {
    "size": {
      "sm": { "$value": "16px", "$type": "dimension" },
      "md": { "$value": "20px", "$type": "dimension" },
      "lg": { "$value": "32px", "$type": "dimension" }
    },
    "stroke-width": {
      "default": { "$value": "2", "$type": "number" }
    }
  }
}
```

CSS 변수 출력:
- `--vds-icon-size-sm`, `--vds-icon-size-md`, `--vds-icon-size-lg`
- `--vds-icon-stroke-width`

기존 토큰 재사용: 색은 `currentColor` 상속(토큰 직접 결합 안 함).

## 7. WCAG & accessibility

| 케이스 | 동작 |
|---|---|
| `aria-label` 미지정 | `aria-hidden="true"` 자동, `role` 제거 |
| `aria-label` 지정 | `role="img"` 자동, `aria-label` passthrough |
| 버튼 내부 | 호출자가 button에 label, 아이콘은 `aria-hidden` (consumer 책임) |
| 전체 | `focusable="false"`, `tabindex` 없음 |

WCAG contrast: 아이콘 자체엔 의무 없음. 호출자의 텍스트/배경 컬러 토큰이 verodesign에서 이미 검증.

## 8. License & attribution

- lucide ISC license — `packages/design-elements/src/components/icon/NOTICE.md` 신설, lucide 저작권/라이선스 본문 명시.

## 9. Deliverables

### 9.1 design-elements
1. `packages/design-elements/src/components/icon/vds-icon.ts` — Lit element, `registerIcon` export, 레지스트리 Map
2. `packages/design-elements/src/components/icon/define.ts` — `customElements.define('vds-icon', VdsIcon)`
3. `packages/design-elements/src/components/icon/index.ts` — `export { VdsIcon, registerIcon, type IconName }`
4. `packages/design-elements/src/components/icon/icons/{kebab-name}.ts` × **35** — 각 아이콘 SVG 등록
5. `packages/design-elements/src/components/icon/NOTICE.md` — lucide attribution
6. `packages/design-elements/src/index.ts` 또는 동급 entrypoint에 icon 컴포넌트 정의 import
7. `packages/design-elements/package.json` exports에 `./icon-registry/*` map 추가
8. `packages/design-elements/dist/custom-elements.json` 갱신(`vds-icon` 등록)

### 9.2 design-react
9. `packages/design-react/src/icons/createIcon.tsx` — React wrapper 팩토리(@lit/react)
10. `packages/design-react/src/icons/{PascalName}.tsx` × **35** — `export const Calendar = createIcon('calendar')` 등 + 부수효과 import `@verobee/design-elements/icon-registry/calendar`
11. `packages/design-react/src/index.ts` — 35종 named export 추가

### 9.3 design (tokens)
12. `packages/design/tokens/canonical/icon.json` — size/stroke-width 토큰
13. `packages/design/dist/css/canonical.css` 재빌드 → `--vds-icon-*` 4개 등장 확인

### 9.4 docs/catalog
14. `docs/llm/research/pattern-catalog.md` — 1행 추가 (`| icon | experimental | internal:app-girok | 2026-05-22 |`)
15. `CHANGELOG.md` (design, design-elements, design-react 각각)

### 9.5 tests
16. `packages/design-elements/src/components/icon/vds-icon.test.ts` — 렌더링/사이즈/a11y/미등록 이름 경고 smoke
17. `packages/design-react/src/icons/Icon.test.tsx` — Calendar/X 2개 컴포넌트 smoke

## 10. Integration points

- **app-girok 측 후속 SDD** 책임:
  - `app-girok/package.json` 에 `@verobee/design-react` 버전 bump
  - `TabBar.tsx` 인라인 SVG 5종(`HomeIcon`/`WalletIcon`/`ActivityIcon`/`ShoppingBagIcon`/`MenuIcon`) 제거 → 동명 verodesign 아이콘 import
- **design-react 재수출**: 아이콘 35종은 `@verobee/design-react` 기존 named export에 합류(별도 entry 안 만듦). consumer는 `import { Calendar } from "@verobee/design-react"` 단일 import만 사용.

## 11. Cross-brand zero-diff plan

- 아이콘 brand-neutral, `currentColor` 상속만.
- 기존 컴포넌트 영향: 0 (Dialog/Button/Tabs 등 미수정).
- 기존 토큰 영향: 0 (canonical 신규 추가만, 기존 토큰 미수정).

## 12. Promotion criteria (experimental → canonical)

- ≥ 2주 사용 (≥ 2026-06-05).
- ≥ 1 consumer app 실사용 — app-girok 리디자인 머지가 첫 케이스.
- Incremental 아이콘 추가 패턴 1회 검증(36번째 아이콘 추가 PR).
- 번들 사이즈: per-icon import 시 단일 아이콘 < 1KB(gzip 전).

## 13. Out of scope (defer)

- 36번째 이상 아이콘 — consumer 요청 시 incremental PR.
- 색 변형/dual-tone — 현재 mock에 1색만 등장.
- 동적 import (`import("@verobee/design-react/icons/calendar")`) — 정적 named export로 충분.
- SVG sprite 빌드 모드.
- font-icon 변형.
- 아이콘 alias/시맨틱 매핑 — consumer 측 책임.

## 14. Open questions

- (Q1) `packages/design-elements/` 의 빌드 도구(현재 사용 도구를 Codex가 확인 후 동일 채택, 미정).
- (Q2) lucide path 데이터 출처 버전: Codex가 위임 시점의 lucide stable을 명시 핀(예: lucide@v0.x.y).
- (Q3) `@lit/react` 의 `createComponent` 와 직접 Lit element 렌더 중 어느 패턴이 design-react의 기존 패턴인지 — Codex가 Button.tsx 참조 후 결정.

---

## Verification gates (for Codex; non-gameable)

| Gate | Pass criterion |
|---|---|
| TypeScript | `pnpm -w tsc --noEmit` 워크스페이스 전체 통과 |
| Build | `pnpm -w build` 통과, `packages/design-elements/dist/components/icon/` 및 `packages/design-react/dist/icons/` 산출 |
| CEM | `custom-elements.json` 에 `vds-icon` 등록 확인 (`grep -c '"name": "vds-icon"'` ≥ 1) |
| Token CSS | `packages/design/dist/css/canonical.css` 에 `--vds-icon-size-sm`, `--vds-icon-size-md`, `--vds-icon-size-lg`, `--vds-icon-stroke-width` 4개 모두 등장 (`grep -c '--vds-icon-' canonical.css` = 4 이상) |
| Icon file count | `packages/design-elements/src/components/icon/icons/*.ts` ≥ 35, `packages/design-react/src/icons/*.tsx` ≥ 35 (`-x__test__` 제외) |
| Export count | `node -e "import('@verobee/design-react').then(m => console.log([Calendar,List,ChevronLeft,ChevronRight,Home,Wallet,Activity,ShoppingBag,MoreHorizontal,Menu,X,TrendingUp,CreditCard,PieChart,Settings,Bell,ToggleLeft,ToggleRight,Trash2,FolderEdit,Plus,Target,Zap,Landmark,ArrowDownRight,ArrowUpRight,Users,ShieldCheck,FileText,ArrowRightLeft,History,Download,RefreshCcw,Check,Edit2].filter(n => typeof m[n] !== 'undefined').length))"` → 35 |
| Test | `pnpm -w test` smoke 2건 추가 + 통과 |
| License | `packages/design-elements/src/components/icon/NOTICE.md` 존재 + 'ISC' 및 'Lucide' 문자열 포함 |
| External dep | `packages/design-elements/package.json` + `packages/design-react/package.json` dependencies에 `lucide-react`, `@heroicons/*`, `react-icons` 등 외부 아이콘 라이브러리 **0건** (`grep -E "lucide-react|heroicons|react-icons" package.json` = 0 양 패키지) |
| Catalog | `docs/llm/research/pattern-catalog.md` 에 `icon` 라인 추가 |
| Tree-shake smoke | 임시 컨슈머에서 `Calendar` 하나만 import 시 번들에 `chevron-left` 문자열 미포함(`grep -c "chevron-left" out.js` = 0) |

**비-게임가능 교차검증**: 모든 게이트는 디스크 산출물(파일 수, dist CSS, package.json, custom-elements.json)에 대한 측정. 자가선언/주석 우회 불가. 2연속 클린 측정 후 Codex 작업 종료.
