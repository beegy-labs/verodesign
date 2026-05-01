# SDD: Consumer fidelity fix (1차) — preflight 갭 + verobase-dark surface 재보정

> Status: staged in `[Unreleased]` | Driver: verobase consumer 시각 검증 회귀 (2026-05-01) | Reference: `docs/llm/decisions.md` § Reset · Themes

## Why

verobase Tailwind→verodesign 마이그 후 **사이트 와이드 시각 회귀** 두 가지 발견:

1. **모든 `<a>` 가 브라우저 디폴트 밑줄로 렌더링됨.** verodesign reset.css 가 modern-normalize subset 만 포함, Tailwind preflight 의 `a { color: inherit; text-decoration: inherit; }` 룰 누락. shadcn/Tailwind 생태계 쪽은 이 룰을 reset 의 일부로 간주하므로, 마이그레이션 시 모든 nav/CTA 링크가 밑줄 + 파란 글자 색으로 깨짐.
2. **verobase 다크모드 page 배경이 사실상 순수 검정** (`slate.12` = `oklch(5% ...)` = `~#000001`). 원본 verobase brand 다크 팔레트 (`#0a0c10` ≈ 14% lightness) 와 **9-point lightness 차이** — 입력 필드/카드 외 영역이 새카매 보이고 입력 (`bg-page`) 이 카드 (`bg-card` = slate.11 = 12% lightness) 위에 검정 구멍처럼 보임. 사용자 직접 confirm: "글자 입력시 검정색 화면이라 기존값과 너무 달라" (2026-05-01).

원칙: reset 는 **modern-normalize + Tailwind-호환 preflight 핵심 룰** 까지가 SSOT 범위. 테마 토큰은 **브랜드 의도** 가 우선 — 슬레이트 12-step ramp 에 강제 매핑하지 말고, 정밀 값이 필요한 슬롯은 직접 OKLCH 표기 허용 (`primary` / `primary-fg` 가 이미 그렇게 정의되어 있음, 선례 존재).

## 추가 범위

### A. `reset.css` Tailwind preflight 핵심 룰 흡수

`packages/design/src/build/reset.mjs` (또는 reset.css 가 정적 파일이면 해당 파일) 에 추가:

```css
/* Anchor: inherit color/decoration so utility classes drive styling */
a { color: inherit; text-decoration: inherit; }

/* Replaced elements: block default + max-width:100% (responsive media) */
img, svg, video, canvas, audio, iframe, embed, object {
  display: block;
  vertical-align: middle;
}
img, video { max-width: 100%; height: auto; }

/* Headings + paragraph: inherit font-* + reset margin (utility-driven) */
h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }
h1, h2, h3, h4, h5, h6, p, blockquote, pre, dl, dd, ol, ul, figure, hr {
  margin: 0;
}
ol, ul, menu { list-style: none; padding: 0; }

/* Form: button cursor + reset background */
button, [role="button"] { cursor: pointer; }
button { background-color: transparent; background-image: none; }
:disabled { cursor: default; }
```

설계 결정:
- **anchor**: `color/text-decoration: inherit` — utility (`vds-text-primary`, `vds-underline`) 가 driver. shadcn/Tailwind 호환성 + verobase 사이드바/CTA 일관성 회복.
- **replaced elements display: block**: img/svg 의 inline default 가 baseline alignment 이슈를 일으키고 wrap 컨테이너에서 의도치 않은 4px 갭을 만듦. Tailwind preflight 동일 이유.
- **headings 마진/폰트 reset**: utility 가 모든 typography 를 책임. `<h1>` 이 자동 24px 도 아니고, 32px 도 아니다 — 명시 utility 만.
- **list-style: none**: nav 항목 등 `<ul>` 의 disc 는 항상 utility (`vds-list-disc`) 로 명시.
- **button background-color: transparent**: WebKit/Firefox 의 회색 디폴트 background 를 제거. utility-driven background 의 전제.
- **`:disabled { cursor: default }`**: 사용성 표준.
- **prose 영향**: `dist/css/prose.css` 가 명시적으로 h1-h6/p/ol/ul 마진 정의 — `.vds-prose` 안에서는 위 reset 가 cascade 로 prose 룰에 의해 override 되므로 prose 텍스트 렌더링 영향 없음.

### B. verobase-dark bg surface 재보정 (브랜드 정합)

`packages/design/tokens/themes/verobase-dark.json` 에서 bg slot reference 를 직접 OKLCH 표기로 변경 — 원본 verobase brand `Obsidian Base` 팔레트 정렬:

| Slot | 현재 ref | 현재 값 (sRGB) | 신규 값 (OKLCH) | 신규 sRGB | 원본 brand |
| ---- | ------- | ------------- | --------------- | --------- | ---------- |
| `bg.page` | `{color.slate.12}` | `~#000001` | `oklch(13% 0.012 240)` | `~#0a0c10` | `#0a0c10` ✓ |
| `bg.card` | `{color.slate.11}` | `~#030609` | `oklch(17% 0.014 240)` | `~#111318` | `#111318` ✓ |
| `bg.elevated` | `{color.slate.10}` | `~#10171c` | `oklch(23% 0.016 240)` | `~#191c24` | `#191c24` ✓ |
| `bg.hover` | `{color.slate.10}` | `~#10171c` | `oklch(28% 0.018 240)` | `~#1f2330` | `#1f2330` ✓ |
| `bg.muted` | `{color.slate.9}` | `~#1d2933` | `{color.slate.9}` (변경 없음) | — | — |
| `bg.code` | `{color.slate.10}` | `~#10171c` | `oklch(23% 0.016 240)` (= elevated) | — | — |

설계 결정:
- **slate ramp 그대로 두고 slot 만 직접 OKLCH** — `primary` / `primary-fg` / `primary-ring` 이 이미 그렇게 정의되어 있어 패턴 일관성. 슬레이트 ramp 의 다른 사용 (text/border 등) 은 영향 없음.
- **slate.12 (5%) 는 `text.inverse` 와 `accent-2-fg` 에서 계속 사용** — text-on-light 용도라 매우 진한 검정이 맞음. 본 SDD 는 surface 슬롯만 변경.
- **WCAG 영향 검증**: 본 SDD 적용 후 `text.primary` (slate.1, 98% lightness) on `bg.page` (13% lightness) → 약 17:1 contrast → AAA 유지. (현재는 5% → 21:1, 절대값 차이는 약간 줄지만 AAA 마진 충분.) build pipeline 의 contrast gate 에서 자동 검증.
- **slate primitive ramp 자체를 손대지 않는 이유**: default-dark / veronex-dark theme 도 같은 ramp 를 쓰고 있어 그쪽 calibration 이 깨질 위험. 브랜드별 미세조정은 theme 파일에서.

### C. CHANGELOG `[Unreleased]` 추가 항목

```
- Added (reset): anchor color/text-decoration inherit, replaced-elements block display, headings/paragraph margin reset, list-style none, button transparent background — Tailwind preflight 핵심 룰 흡수 (consumer 마이그 시 시각 회귀 방지)
- Changed (theme verobase-dark): bg.{page, card, elevated, hover, code} 직접 OKLCH 표기로 변경 — `Obsidian Base` 브랜드 팔레트 (#0a0c10 ~ #1f2330) 정합. slate.{10,11,12} 는 text/inverse 슬롯에서 그대로 사용.
```

### D. `decisions.md` 업데이트

- `## Reset` 섹션 (없으면 신규 추가) — preflight subset 채택 명시
- `## Themes` 섹션 verobase-dark 레퍼런스 — surface 슬롯이 brand-direct OKLCH 임을 노트

## Out of scope

- **Tailwind preflight 완전 흡수** (border 색 디폴트, ::placeholder 색, default form bg 등) — 본 SDD 는 verobase 회귀가 확인된 룰만. 다른 룰은 다음 consumer feedback 시.
- **slate ramp 자체 재배열** — default/veronex theme 영향. 별도 SDD 필요 시.
- **verobase-light surface 재보정** — light 테마는 현재 회귀 보고 없음. light 검증 후 별도 항목.

## 구현 순서

1. `reset.css` source (`packages/design/src/build/reset.mjs` 또는 정적 파일) 에 preflight 룰 6 그룹 추가
2. `tokens/themes/verobase-dark.json` 의 `theme.bg.{page, card, elevated, hover, code}` 직접 OKLCH 로 변경
3. `pnpm --filter @verobee/design build` — contrast gate 통과 확인 (`AAA` 유지)
4. `CHANGELOG.md` + `decisions.md` 업데이트
5. verobase 에 re-vendor (`scripts/vendor-verodesign.mjs`) → 재빌드 → 스크린샷 확인 (anchor 밑줄 사라짐, page 배경 `#0a0c10` 톤)

## 검증

| 항목 | 방법 |
| ---- | ---- |
| anchor inherit 룰 | `grep "a { color: inherit; text-decoration: inherit; }" dist/css/reset.css` ≥ 1 |
| img/svg block | `grep "img, svg, video, canvas" dist/css/reset.css` ≥ 1 |
| heading reset | `grep "h1, h2, h3" dist/css/reset.css` ≥ 1 |
| button bg transparent | `grep "button { background-color: transparent" dist/css/reset.css` ≥ 1 |
| verobase-dark bg.page | `grep "bg-page" dist/css/themes/verobase.css \| grep "13%"` ≥ 1 |
| WCAG contrast | build 의 `[audit] WCAG contrast` 스텝 PASS |
