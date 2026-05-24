# Verodesign SDD — vds-settings-row title → rowLabel rename

> Date: 2026-05-22 | Sandbox: workspace-write
> Owner: Claude (감독) + Codex (구현)
> Driver: app-girok Phase 2e G1 회수

## 1. Why

`vds-settings-row` Lit element 의 `@property() title` 가 React 19 consumer 에서 안 보임:

- `HTMLElement.prototype.title` = 브라우저 네이티브 tooltip 속성.
- React 19 가 `title` JSX prop 을 HTML attribute 로 강제 변환 → 브라우저 tooltip 으로 들어감.
- Lit 의 `@property({ type: String }) title` 데코레이터가 prototype 에 setter 를 정의해도, 일부 React/Lit 조합에서 attribute 반영이 안 됨 (React adapter 가 `setAttribute('title', ...)` 또는 `.title = ...` 시도해도 native title 가 우선).

증상: app-girok 의 `/ledger/settings` 에서 5 SettingsRow 모두 title/description 안 보이고 icon 만 표시. dev:shot 검증으로 확인 (2026-05-22).

app-girok 측 임시 우회 = local SettingsRow 재구현 → memory `feedback_no_local_design_primitives` 위반 + 0c SDD intake 무력화.

## 2. Goal

Lit element 의 `title` property 를 **`rowLabel`** 로 rename (attribute name `row-label`). 모든 consumer 측은 prop name `title` 그대로 사용하지만 React adapter 가 내부에서 `rowLabel` 로 forward.

비목표:
- description prop rename (native 충돌 없음 — 그대로).
- 다른 컴포넌트 audit.
- React adapter 의 attribute-based 어댑테이션 제거 (현재 setAttribute 기반 유지).

## 3. Scope — Codex 작업

### 3.1 Lit element 변경
`packages/design-elements/src/components/settings-row/vds-settings-row.ts`:

```diff
- @property({ type: String }) title = '';
+ @property({ type: String, attribute: 'row-label' }) rowLabel = '';
```

Render template:
```diff
- <span class="title">${this.title}</span>
+ <span class="title">${this.rowLabel}</span>
```

`updated()` 의 aria-label:
```diff
- const label = [this.title, this.description].filter(Boolean).join(' ');
+ const label = [this.rowLabel, this.description].filter(Boolean).join(' ');
```

### 3.2 React adapter 변경
`packages/design-react/src/components/SettingsRow.tsx`:

`SettingsRowProps.title` (consumer-facing) → 내부에서 `row-label` attribute 로 forward:

```diff
React.useLayoutEffect(() => {
  const el = innerRef.current;
  if (!el) return;
  el.setAttribute('tone', tone);
- el.setAttribute('title', title);
+ el.setAttribute('row-label', title);
  if (description) {
    el.setAttribute('description', description);
  } else {
    el.removeAttribute('description');
  }
  // ...
}, [tone, title, description, descriptionTone, chevron]);
```

Consumer API (`SettingsRowProps.title`) 는 그대로 유지 (호환).

### 3.3 Lit element 테스트 갱신
`packages/design-elements/test/settings-row.test.ts`:

```diff
- <vds-settings-row
-   tone="indigo"
-   title="KIS credentials"
-   description="API connected"
-   description-tone="success"
-   chevron
- ></vds-settings-row>
+ <vds-settings-row
+   tone="indigo"
+   row-label="KIS credentials"
+   description="API connected"
+   description-tone="success"
+   chevron
+ ></vds-settings-row>
```

aria-label assertion 그대로 ("KIS credentials" 포함).

### 3.4 design-react 테스트 (있다면)
`packages/design-react/src/components/__tests__/settings-row.test.tsx` — consumer API 변경 0 이므로 test 변경 0. 만약 있으면 확인 후 그대로.

### 3.5 빌드
```sh
pnpm --filter @verobee/design-elements build
pnpm --filter @verobee/design-react build
```

### 3.6 vds element 테스트
```sh
pnpm --filter @verobee/design-elements test 2>&1 | tail -15
```

## 4. 검증 gates (Codex 측)

| Gate | Pass criterion |
|---|---|
| **G_lit_no_title** | `grep -rE "@property.*title\\b\|this\\.title\\b" packages/design-elements/src/components/settings-row/` = 0 |
| **G_lit_rowlabel** | `grep -rE "rowLabel\|row-label" packages/design-elements/src/components/settings-row/` ≥ 3 |
| **G_adapter_forward** | `grep -E "setAttribute.\\(\\\"row-label\\\"" packages/design-react/src/components/SettingsRow.tsx` ≥ 1 |
| **G_test_pass** | design-elements test PASS (settings-row.test.ts) |
| **G_build** | design-elements + design-react build PASS |

## 5. 절대 금지

- consumer-facing API (`SettingsRowProps.title`) 변경.
- description / descriptionTone / tone / chevron prop rename.
- 다른 컴포넌트 변경.
- AI/LLM/Codex/Claude 멘션 (commit msg + 파일 코멘트).

## 6. 출력 보고 (≤ 200 줄)

1. 변경 파일 list.
2. 5 gate stdout.
3. dist/ 의 vds-settings-row.js 안 `rowLabel` 등장 확인.

## 7. Commit message template

```
fix(design-elements): rename vds-settings-row title → rowLabel

The Lit @property('title') conflicted with HTMLElement.prototype.title
(native tooltip), so consumer-side React adapters could not reliably
set the value through .title = … nor setAttribute('title', …). The
property is now exposed as `rowLabel` (attribute `row-label`), which
has no native HTMLElement collision.

- vds-settings-row.ts: @property({attribute: 'row-label'}) rowLabel.
  render template + aria-label updated.
- design-react SettingsRow.tsx: setAttribute('row-label', title) so
  the consumer-facing prop name stays `title` for backward source
  compat. No API change for React callers.
- settings-row.test.ts: fixture switched to row-label attribute. aria
  assertions unchanged.

Verified: design-elements test PASS, design-elements + design-react
build PASS.
```

## 8. 후속 (Claude 측, 별 round)

- app-girok 측 SettingsPage.tsx 의 local SettingsRow 제거 → `@verobee/design-react` 의 SettingsRow 로 갈아끼움.
- dev:shot /ledger/settings 검증 — title/description 정상 렌더.
- app-girok node_modules 의 design-elements / design-react 인스턴스 resync.
