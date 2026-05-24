# P28a — Pattern CSS 분리 (emit-static.mjs → .css 파일들)

> Date: 2026-05-24
> Owner: Claude / Builder: Codex
> Driver: P15-P27 회귀 빈도 + 1504줄 JS string template literal 변경 friction

## 동기

`packages/design/src/build/emit-static.mjs` 의 `GIROK_APP_PATTERNS_CSS` const 가 약 1300줄의 JS template literal 안에 CSS string. Codex 가 작은 변경할 때:
- line 위치 찾기 어려움 (다른 패턴 영향 risk)
- diff 보기 어려움 (전체 string 재출력)
- IDE CSS syntax highlight 없음
- BEM 자동완성 X

2026 best practice (ITCSS / 7-1 pattern): 패턴별 .css 파일 분리 + build 시 concat.

## 구조 변경

### Before

```
packages/design/src/build/emit-static.mjs
  ├── RESET_CSS = `...`
  ├── CLI = `...`
  └── GIROK_APP_PATTERNS_CSS = `...1300줄...`
```

### After

```
packages/design/src/build/
  └── emit-static.mjs (RESET_CSS, CLI 만)

packages/design/src/patterns/girok/
  ├── index.css                # @import 으로 모두 묶음
  ├── _wordmark.css            # vds-pattern-girok-wordmark
  ├── _tab-l1.css              # vds-pattern-girok-tab-l1*
  ├── _tab-l2.css              # vds-pattern-girok-tab-l2*
  ├── _page-toolbar.css        # vds-pattern-girok-page-toolbar*
  ├── _currency-toggle.css     # vds-pattern-girok-currency-toggle*
  ├── _stats.css               # vds-pattern-girok-stats*
  ├── _calendar.css            # vds-pattern-girok-calendar*
  ├── _bottomsheet.css         # vds-pattern-bottomsheet*
  ├── _icon-actions.css        # vds-pattern-girok-icon-actions*
  ├── _snowball-hero.css       # vds-pattern-girok-snowball-hero*
  ├── _position-card.css       # vds-pattern-girok-position-card*
  ├── _fx-summary-card.css     # vds-pattern-girok-fx-summary-card*
  ├── _fx-history-card.css     # vds-pattern-girok-fx-history-card*
  ├── _category-progress-list.css # vds-pattern-girok-category-progress-list*
  ├── _select-card.css         # vds-pattern-girok-select-card*
  └── _ledger-swapper.css      # vds-pattern-girok-ledger-swapper*
```

각 파일 50-200줄. 각 파일은 자기 패턴의 `@scope` block 하나만 포함.

### build.mjs 변경

현재: `emit-static.mjs` 가 `GIROK_APP_PATTERNS_CSS` 를 dist 에 직접 write.

변경: `emit-static.mjs` 가 `src/patterns/girok/index.css` 와 그 @import 들을 inline expand → dist 의 `patterns/girok-app.css` 로 write. Minify 는 기존 lightningcss 그대로.

방법 A — fs.readFile 로 각 .css read + concat:
```js
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const PATTERNS_DIR = new URL('../patterns/girok/', import.meta.url).pathname;
const PATTERN_FILES = [
  '_wordmark.css',
  '_tab-l1.css',
  ...
];

const GIROK_APP_PATTERNS_CSS = '/* @verobee/design — patterns/girok-app.css */\n@layer components {\n'
  + PATTERN_FILES.map(f => readFileSync(join(PATTERNS_DIR, f), 'utf8')).join('\n')
  + '\n}\n';
```

방법 B — index.css 에 `@import` + lightningcss bundle. 지원 여부 확인 필요.

방법 A 더 안전 + 단순. 추천.

## 검증

- dist 의 `patterns/girok-app.css` 와 `patterns/girok-app.min.css` 가 **변경 전과 byte-by-byte 동일** (concat 순서/공백만 미세 차이 허용). regression 없음.
- `pnpm --filter @verobee/design build` PASS
- `pnpm --filter @verobee/design audit:pattern-spacing` PASS — 분리된 파일에서도 audit 작동
- 모든 14개 패턴이 dist 에 emit 되었는지 grep 확인

## audit-pattern-spacing.mjs 업데이트

현재 audit script 가 emit-static.mjs 의 JS string 안에서 검사하면 분리 후 못 찾음. audit script 가 dist 의 girok-app.css 또는 src/patterns/girok/*.css 를 read 하도록 변경.

## 응답 (≤500 토큰)

- 신규 디렉터리 + 파일 list (개수)
- emit-static.mjs 의 라인 감소 (1504 → 몇)
- audit-pattern-spacing script 업데이트
- dist 동일성 검증 결과
- build PASS / audit PASS
- 예외 (어떤 패턴이 분리 시 BEM child 누락 등 어색했는지)
