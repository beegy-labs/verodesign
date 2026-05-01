# SDD: Utility layer (2차) — verobase consumer 갭 채우기

> Status: staged in `[Unreleased]` | Driver: verobase consumer migration | Reference: `docs/llm/decisions.md` § Utility layer | Predecessor: [`utility-layer-1.md`](./utility-layer-1.md)

## Why

`utility-layer-1.md` 이행 후 verobase consumer 마이그레이션 진행 중 발견된 갭. verobase 사용 빈도 분석 (2026-05-01) 으로 확인된 두 가지 누락:

1. **`vds-placeholder:` modifier 부재** — verobase 의 form 컴포넌트 167 회 사용 (`placeholder:text-muted-foreground`), state-variants.mjs 의 `STATES` 배열에 `placeholder` prefix 없음. Form 의 a11y/UX 표준이라 누락은 결정적.
2. **`vds-shadow-{semantic-name}` alias 부재** — verodesign 은 `shadow-0..6` numeric scale 만 emit. Tailwind/shadcn 생태계는 `shadow-{xs,sm,md,lg,xl,2xl}` semantic 명명. consumer 가 매번 `0..6` 으로 변환하는 부담 + 의미 흐림. 토큰 자체는 그대로, **utility 출력 시 alias 추가**.

원칙: consumer 가 verodesign 명명에 맞추는 게 기본 — 단, **a11y 필수 modifier (placeholder)** 와 **널리 통용되는 semantic alias (shadow)** 는 verodesign 이 흡수.

## 추가 범위

### A. `vds-placeholder:` state variant

`packages/design/src/build/utilities/state-variants.mjs` 의 `STATES` 배열에 추가:

```js
{ prefix: 'placeholder', pseudo: '::placeholder', applyTo: new Set(['text', 'opacity']) }
```

생성될 클래스 예시:
- `.vds-placeholder\:text-dim::placeholder { color: var(--vds-theme-text-dim); }`
- `.vds-placeholder\:text-faint::placeholder { color: var(--vds-theme-text-faint); }`
- `.vds-placeholder\:opacity-50::placeholder { opacity: var(--vds-opacity-50); }`

**적용 family:** `text` (color), `opacity`. `bg`/`border` 는 `::placeholder` 의사요소에 의미 없음.

**responsive 결합:** 기존 `responsive.mjs` wrapping 메커니즘이 자동 적용 — `vds-md:placeholder:text-dim` 자동 생성.

### B. Shadow semantic alias

`packages/design/src/build/utilities/effect.mjs` 에서 shadow 토큰을 alias 와 함께 emit.

현재 토큰 (변경 없음):
- `--vds-shadow-0` ~ `--vds-shadow-6`

신규 alias (decisions.md `[Unreleased]` 섹션의 shadow 부분 update + utility 출력 추가):

| Semantic alias | Numeric token |
| -------------- | ------------- |
| `vds-shadow-none` | `none` (특수, 토큰 X) |
| `vds-shadow-xs`   | `--vds-shadow-1` |
| `vds-shadow-sm`   | `--vds-shadow-1` |
| `vds-shadow-md`   | `--vds-shadow-2` |
| `vds-shadow-lg`   | `--vds-shadow-3` |
| `vds-shadow-xl`   | `--vds-shadow-4` |
| `vds-shadow-2xl`  | `--vds-shadow-5` |
| `vds-shadow-inner` | (특수: `inset 0 2px 4px ...`) |

`vds-shadow-{0..6}` 은 그대로 유지 (numeric 직접 접근 보존).

⚠️ `vds-shadow-{xs,sm,md,...}` 을 만들어도 `--vds-shadow-{xs,sm,...}` **CSS variable 은 만들지 않음** — 토큰 SSOT 는 numeric, alias 는 utility 출력 단계에서만 존재. 이렇게 해야 토큰 명명 흐트러지지 않음.

**state variant 결합:** `hover:`, `focus:` 등이 자동 적용되어 `.vds-hover\:shadow-md` 도 생성됨.

### C. CHANGELOG `[Unreleased]` 추가 항목

```
- Added: `vds-placeholder:` state variant for text/opacity utilities
- Added: shadow semantic alias utilities (`vds-shadow-{xs,sm,md,lg,xl,2xl,none,inner}`) — wraps numeric `shadow-{0..6}` tokens
```

### D. `decisions.md` § Utility layer update

`docs/llm/decisions.md` 의 `[Unreleased]` Utility layer 표에서:

- Effect 행 갱신: `vds-shadow-{0..6}` + alias `{none, xs, sm, md, lg, xl, 2xl, inner}`
- State variants 행 추가: `placeholder:` (text, opacity 만)

## Out of scope (의도적 제외)

- **Tailwind step 호환 spacing 추가 (`7, 9, 11, 14, 28, ...`)** — verodesign 의 4px grid (`0,1,2,3,4,5,6,8,10,12,16,20,24,32,48,64` + fractional `0.5, 1.5`) 철학 고수. consumer 가 가까운 grid 로 rounding.
- **Fractional step `2.5, 3.5` 추가** — 동일 이유. consumer rounding.
- **shadcn/Tailwind semantic name aliasing (`bg-background`, `text-muted-foreground`, `bg-accent`(subtle hover))** — SSOT 흐림. consumer 가 verodesign 명명 (`bg-page`, `text-dim`, `bg-hover`) 으로 rewrite.
- **`vds-shadow-*` 의 `--vds-shadow-{semantic}` 토큰 추가** — 토큰 SSOT 는 numeric 유지, utility 만 alias.

## 구현 순서

1. `state-variants.mjs` 에 `placeholder` prefix 추가 + 단위 테스트
2. `effect.mjs` 에 shadow semantic alias 추가 + 단위 테스트
3. `pnpm --filter @verobee/design build` → `dist/utilities/full.css` 검증
4. `decisions.md` 와 `CHANGELOG.md` update
5. showcase 앱에 `<input placeholder>` + `<div class="vds-shadow-md">` 추가하여 시각 확인

## 검증

| 항목 | 방법 |
| ---- | ---- |
| `vds-placeholder:` 생성 | `grep -c "vds-placeholder\\\\:" dist/utilities/full.css` ≥ 50 |
| Shadow alias 8개 | `grep -oE 'vds-shadow-(none\|xs\|sm\|md\|lg\|xl\|2xl\|inner)' dist/utilities/full.css` |
| Modifier × shadow alias | `vds-hover\\:shadow-lg` 존재 |
| Build size | `dist/utilities/full.css` 증가 < 5% |

## verobase 와의 인터페이스

이 SDD 가 머지/빌드되면 verobase 의 `placeholder:text-muted-foreground` 사용 167 개와 `shadow-sm/lg/xl/2xl` 사용 50+ 개가 각각 `vds-placeholder:text-dim` / `vds-shadow-{name}` 으로 1:1 rewrite 가능 — verobase consumer SDD (`/Users/vero/workspace/beegy/verobase/.specs/verobase/scopes/design-system-migration.md`) 의 codemap rule.
