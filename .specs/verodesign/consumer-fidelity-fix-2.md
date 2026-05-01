# SDD: Consumer fidelity fix (2차) — Tailwind-compat utility batch + Lightning CSS 최적화

> Status: staged in `[Unreleased]` | Driver: verobase 토큰 audit (485 unique tokens, 65 missing) (2026-05-02) | Reference: `docs/llm/decisions.md` § Utility layer · Build pipeline | Predecessor: [`consumer-fidelity-fix-1.md`](./consumer-fidelity-fix-1.md)

## Why

`/tmp/audit/check-tokens.mjs` 로 verobase consumer 의 git HEAD (Tailwind 시절) tsx 파일 124 개에서 **485 개 unique class token** 추출 후 verodesign 매핑/emit 검증. **65 개 토큰의 utility 클래스가 verodesign 에서 미생성** 으로 시각 회귀 발생.

3 개 큰 카테고리:
1. **Tailwind-numeric scale 호환 부재** (z-{10..50}, duration-{ms}, ease-keyword) — verodesign 은 token-name (`duration-medium`, `ease-in-out` token-path) 만 emit. 사용자는 `z-10`, `duration-200` 같은 숫자 값을 Tailwind 표준으로 사용함.
2. **Primitive color + Tailwind-static 색** (black, white, transparent, blue-50, etc.) — verodesign 은 semantic slot 기반. 일부 컴포넌트 (modal backdrop `bg-black/50`, "info" hint `bg-blue-50`) 가 직접 primitive 사용.
3. **누락된 형태 utilities** — `border-collapse`, `flex-shrink-0`, `inset-y-0`, `w-px`, `gap-px`, `rounded` (default), `shadow` (default), `transform`, `tracking-widest`, `fill-current`, `hover:underline` 등.

추가로 사용자 직접 요청 (2026-05-02):
> "디자인 시스템에도 rust 기반 css를 써야해 즉 최적화를 중점으로 봐"

→ Lightning CSS (Rust-based, `lightningcss` npm package, parcel-css) 를 verodesign 빌드에 통합. dist 출력 minify + 벤더 prefix + 모던 syntax transform.

## 추가 범위

### A. Tailwind-numeric scale 호환

#### A1. `transition.mjs` — numeric duration + ease keyword 추가

```js
// Tailwind-compat numeric durations (ms)
const TW_DURATIONS = [75, 100, 150, 200, 300, 500, 700, 1000];
for (const ms of TW_DURATIONS) {
  rules.push(`.vds-duration-${ms} { transition-duration: ${ms}ms; }`);
}

// Tailwind ease keywords (alias on existing easing tokens)
rules.push(`.vds-ease-linear { transition-timing-function: linear; }`);
rules.push(`.vds-ease-in { transition-timing-function: cubic-bezier(0.4, 0, 1, 1); }`);
rules.push(`.vds-ease-out { transition-timing-function: cubic-bezier(0, 0, 0.2, 1); }`);
rules.push(`.vds-ease-in-out { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }`);
```

설계: token-driven `vds-duration-{name}` 은 그대로 유지 (semantic 권장). 숫자 alias 는 Tailwind 마이그 호환층.

### B. Animation aliases

#### B1. `backdrop.mjs` — `vds-animate-{spin,pulse,bounce}` 별칭 추가

기존 `vds-anim-{spin,pulse,bounce}` 는 별도 import (`@verobee/design/animations.css`). Tailwind 표준명 `vds-animate-*` alias 를 default `full.css` 에 emit 해서 import 없이 쓸 수 있게.

```js
rules.push(`.vds-animate-spin { animation: vds-spin 1s linear infinite; }`);
rules.push(`.vds-animate-pulse { animation: vds-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }`);
rules.push(`.vds-animate-bounce { animation: vds-bounce 1s infinite; }`);
rules.push(`.vds-animate-none { animation: none; }`);

// keyframes (재정의 안 되도록 가드)
@keyframes vds-spin { to { transform: rotate(360deg); } }
@keyframes vds-pulse { 50% { opacity: 0.5; } }
@keyframes vds-bounce { 0%,100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); } }
```

`prefers-reduced-motion` reset 도 `animate-*` 적용.

### C. Cursor 확장

#### C1. `layout.mjs` cursor 목록에 추가
- `grab`, `grabbing` (drag handle)
- `zoom-in`, `zoom-out`

### D. Layout 추가

#### D1. `layout.mjs`
- `vds-flex-shrink-0` (alias for `vds-shrink-0` — modern Tailwind 명명 호환)
- `vds-flex-shrink` (alias for `vds-shrink`)
- `vds-flex-grow-0`, `vds-flex-grow` (alias for grow)

#### D2. `sizing.mjs`
- `vds-{w,h}-px` (1px exact)
- `vds-{gap,gap-x,gap-y}-px`
- `vds-{w,h,min-w,min-h,max-w,max-h}-{0,1,...}` 에 `px` 한 단계 추가

#### D3. position-anchored values
- `vds-inset-y-0`, `vds-inset-x-0`, `vds-inset-0` (이미 있을 수 있음, 검증)
- `vds-{top,bottom,left,right}-full` (= 100%)
- `vds-{top,bottom,left,right}-px` (= 1px)

### E. Typography 추가

#### E1. `typography.mjs`
- `vds-tracking-widest` (-0.05em 이 아닌 0.1em — Tailwind 값)
- decoration: `vds-underline`, `vds-line-through`, `vds-no-underline` (state variant 가능하게)
- `vds-fill-current { fill: currentColor; }`
- `vds-stroke-current { stroke: currentColor; }`

#### E2. state-variants — `text-decoration` family 등록
- `text-decoration-` prefix → `decoration` family 추가
- `hover:` applyTo 에 `decoration` 포함 → `vds-hover:underline` 자동 생성
- 또는 단순 케이스만 직접 emit: `.vds-hover\:underline:hover { text-decoration: underline; }`

### F. Border 확장

#### F1. `effect.mjs`
- `vds-border-collapse { border-collapse: collapse; }`, `vds-border-separate { border-collapse: separate; }`
- `vds-border-transparent { border-color: transparent; }`
- `vds-border-{t,r,b,l}-transparent { border-{...}-color: transparent; }` (4 개)

### G. Default 단축형

#### G1. `effect.mjs`
- `vds-rounded { border-radius: var(--vds-radius-md); }` (Tailwind 디폴트 = md)
- `vds-rounded-{t,r,b,l}-{none,xs,sm,md,...}` (각 변별 radius — 필요한 것만 우선)
- `vds-shadow { box-shadow: var(--vds-shadow-sm); }` (이미 emit됨, 추가 시 중복 회피)
  - 현재 `.vds-shadow-sm` 만 있고 bare `.vds-shadow` 없음 → bare 추가
- `vds-transform { /* modern browsers auto */ }` — Tailwind v3 호환 더미. v4 에서는 no-op.

### H. Tailwind primitive color compat

#### H1. `color.mjs` — primitive 색 utility emit 확장

verobase 사용 중인 primitive 색만 우선 추가 (`black`, `white`, `transparent`, `blue-50/100/.../900`, `indigo-50/.../900`):

```js
// Tailwind-static colors (no theme dependency)
const STATIC_COLORS = {
  'black': '#000', 'white': '#fff', 'transparent': 'transparent',
  'current': 'currentColor', 'inherit': 'inherit',
};
for (const [name, value] of Object.entries(STATIC_COLORS)) {
  rules.push(`.vds-bg-${name} { background-color: ${value}; }`);
  rules.push(`.vds-text-${name} { color: ${value}; }`);
  rules.push(`.vds-border-${name} { border-color: ${value}; }`);
  rules.push(`.vds-fill-${name} { fill: ${value}; }`);
  rules.push(`.vds-stroke-${name} { stroke: ${value}; }`);
}

// Primitive ramps (existing tokens) — emit as utility too
// color.{red, orange, ..., slate}.{1..12} → .vds-{bg,text,border}-{name}-{step}
// 이미 primitive 토큰 정의되어 있어 utility 만 emit.
```

#### H2. opacity 변형
- `vds-bg-{black,white}/{0..95}` — color-mix 적용 (이미 slot opacity 가 있어 동일 함수 재사용)

### I. focus / focus-visible variant

`outline` family 가 `focus-visible:` applyTo 에는 등록됐지만 `focus:` 에는 없음. 추가:

#### I1. `state-variants.mjs`
```js
{ prefix: 'focus', pseudo: ':focus', applyTo: new Set(['bg', 'text', 'border', 'ring', 'opacity', 'outline']) },
```

`vds-focus:outline-none`, `vds-focus:ring-primary/50` 등 자동 생성.

### J. Tailwind-static z-index 호환

#### J1. `effect.mjs` 또는 별도 `legacy.mjs`
```js
for (const z of [0, 10, 20, 30, 40, 50]) {
  rules.push(`.vds-z-${z} { z-index: ${z}; }`);
}
rules.push(`.vds-z-auto { z-index: auto; }`);
```

기존 semantic z-{slot-name} 은 그대로.

### K. Last-child sibling variant (`vds-last:border-0`)

state-variants 에 sibling pseudo 등록 — `last:` family. `last-child` 의사클래스, `border-0` (width) 외 일반 utility 도 적용 가능.

```js
{ prefix: 'last', pseudo: ':last-child', applyTo: new Set(['border', 'bg', 'text', 'opacity']) },
{ prefix: 'first', pseudo: ':first-child', applyTo: new Set(['border', 'bg', 'text', 'opacity']) },
```

`vds-last:border-0`, `vds-first:border-0` 자동 생성.

### L. Lightning CSS 통합 (build 최적화)

#### L1. 의존성 추가

`packages/design/package.json`:
```json
"devDependencies": {
  "lightningcss": "^1.30.1"
}
```

#### L2. `scripts/build.mjs` 또는 `src/build/utilities/index.mjs`

각 dist CSS 파일 emit 후 production minify 패스 추가. 옵션:

```js
import { transform } from 'lightningcss';

function minify(code, filename) {
  const { code: out } = transform({
    filename,
    code: Buffer.from(code),
    minify: true,
    targets: { chrome: 111 << 16, firefox: 113 << 16, safari: 15 << 16 | 4 << 8 },
    drafts: { customMedia: true },
  });
  return out.toString();
}

// dist/utilities/full.css 등에 minify 적용 후 .min.css 출력
// dev: full.css unminified 유지, prod: .min.css alias 추가
```

#### L3. 출력 구조

기존 `dist/utilities/full.css` (unminified, debugging) + 신규 `dist/utilities/full.min.css` (minified, production). `package.json` exports 에 `./utilities/full.min` 추가.

#### L4. 측정

- 현재 `full.css` raw: ~5 MB
- 예상 minify 후 raw: ~1 MB (whitespace + comments 제거)
- gzip: 60 KB 유지/개선

build script 에 `[bench]` 단계 추가 — `lightningcss` vs `node:zlib` 비교 로깅.

### M. CHANGELOG `[Unreleased]` + decisions.md

- 새 utility 카테고리 행 추가
- Lightning CSS 채택 결정 + targets browserslist 명시

## Out of scope

- **Arbitrary value JIT** (`vds-w-[80vw]`, `vds-text-[10px]`) — verodesign AOT 모델에 위배. 별도 SDD 필요. 임시방편: 자주 쓰이는 패턴은 named token (`text-xxs` 등) 추가, 1회성은 verobase 측에서 inline `style={{}}`.
- **Primitive color full ramp utility** (12 hue × 12 step × 3 family = 432 rule) — verobase 가 실제로 쓰는 색만 우선. 본 SDD 는 black/white/transparent + blue/indigo subset. 더 필요해지면 별도 SDD.
- **`@property` 기반 transform composition** — Tailwind v3 의 `--tw-translate-x` 같은 구조. verobase 마이그에 불필요.
- **Container queries (`@container`)** — Baseline 미달 (decisions.md 기존 결정).

## 구현 순서

1. `transition.mjs` — numeric duration + ease keywords
2. `backdrop.mjs` — animate-* aliases
3. `layout.mjs` — cursor 확장 + flex-shrink-0 alias
4. `sizing.mjs` — w-px / h-px / gap-px / inset 확장
5. `typography.mjs` — tracking-widest + decoration + fill/stroke-current
6. `effect.mjs` — border-collapse, border-transparent, rounded default, shadow default, transform
7. `state-variants.mjs` — focus + last + first + decoration family
8. `color.mjs` — black/white/transparent/current/inherit static colors
9. 별도 module `legacy.mjs` (또는 effect.mjs 끝) — z-numeric (0/10/20/30/40/50)
10. `lightningcss` devDep 추가, `build.mjs` minify 패스 통합, `dist/.../*.min.css` 출력
11. `pnpm --filter @verobee/design build` — full.css → full.min.css 검증
12. `decisions.md` + `CHANGELOG.md` 업데이트
13. verobase re-vendor → docker rebuild → screenshot diff

## 검증

| 항목 | 방법 |
| ---- | ---- |
| numeric duration | `grep "vds-duration-200" dist/utilities/full.css` ≥ 1 |
| ease keywords | `grep -oE "vds-ease-(linear\|in\|out\|in-out)" dist/utilities/full.css \| sort -u` 4 줄 |
| animate aliases | `grep -oE "vds-animate-(spin\|pulse\|bounce\|none)" dist/utilities/full.css \| sort -u` 4 줄 |
| cursor extras | `grep -oE "vds-cursor-(grab\|grabbing\|zoom-in\|zoom-out)" dist/utilities/full.css \| sort -u` 4 줄 |
| static colors | `grep -E "vds-(bg\|text)-(black\|white\|transparent)" dist/utilities/full.css` ≥ 6 |
| numeric z | `grep -oE "vds-z-([0-9]+)" dist/utilities/full.css \| sort -u` ≥ 6 |
| lightningcss dist | `ls dist/utilities/full.min.css && wc -c dist/utilities/full.css dist/utilities/full.min.css` |
| audit pass 2 | `node /tmp/audit/check-tokens.mjs` — utilityMissing < 10 |
| WCAG contrast | build audit PASS |
