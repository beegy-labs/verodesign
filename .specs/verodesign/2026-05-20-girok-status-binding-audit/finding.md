# girok theme status binding audit

## Files reviewed
- `packages/design/tokens/themes/girok-dark.json`
- `packages/design/tokens/themes/girok-light.json`
- `packages/design/tokens/themes/default-dark.json`
- `packages/design/tokens/themes/_template-light.json`
- `packages/design/tokens/themes/veronex-dark.json`
- `packages/design/tokens/themes/veronex-light.json`
- `packages/design/tokens/themes/verobase-dark.json`
- `packages/design/tokens/themes/verobase-light.json`
- `docs/llm/decisions.md`
- `.add/skills/brand-isolation.md`
- `.specs/verodesign/2026-05-15-girok-brand-canonical.md`
- `.specs/verodesign/2026-05-15-girok-palette-refinement.md`
- `.specs/verodesign/2026-05-16-girok-modern-expression.md`
- `.specs/verodesign/2026-05-20-pattern-amount-hero/spec.md`
- `.specs/verodesign/2026-05-20-pattern-binary-pill-toggle/spec.md`
- `.specs/verodesign/2026-05-20-pattern-product-card/spec.md`
- `.specs/verodesign/2026-05-20-pattern-settings-row/spec.md`
- `.specs/verodesign/2026-05-20-pattern-view-toggle/spec.md`

## Current binding map

| slot | girok-dark | girok-light | default-dark | default-light | veronex-dark | veronex-light | verobase-dark | verobase-light |
| ---- | ---------- | ----------- | ------------ | ------------- | ------------ | ------------- | ------------- | -------------- |
| theme.success | ✗ | ✗ | ✓ `{color.green.7}` | ✗ | ✓ `{color.green.7}` | ✗ | ✗ | ✗ |
| theme.destructive | ✗ | ✗ | ✓ `{color.red.7}` | ✗ | ✓ `{color.red.7}` | ✗ | ✗ | ✗ |
| theme.warning | ✗ | ✗ | ✓ `{color.amber.5}` | ✗ | ✓ `{color.amber.5}` | ✗ | ✗ | ✗ |
| theme.info | ✓ `oklch(72% 0.09 66)` | ✓ `oklch(46% 0.08 56)` | ✓ `{color.blue.5}` | ✓ `oklch(50% 0.18 240)` | ✓ `oklch(72% 0.16 165)` | ✓ `oklch(30% 0.06 150)` | ✓ `oklch(60% 0.14 155)` | ✓ `oklch(45% 0.13 155)` |

## Verdict

mixed

근거:
- `docs/llm/decisions.md`는 brand theme를 직교 바인딩으로 두고 brand isolation을 요구하지만, 현재 저장소의 실제 theme 파일은 status slot parity가 전 브랜드/전 모드에 일관되게 채워져 있지 않다. `default-dark`, `veronex-dark`만 `success/destructive/warning`을 모두 갖고, `verobase-light`, `verobase-dark`, `veronex-light`, `girok-light`, `girok-dark`는 빠진 슬롯이 있다.
- `.add/skills/brand-isolation.md`는 코어 semantic 슬롯 추가 시 전 브랜드 parity를 강제한다고 적지만, 동시에 brand 특수 값은 해당 brand theme 또는 brand-scoped experimental 슬롯에만 두라고 한다. 즉 parity는 원칙이지만 현 구현은 미완 상태다.
- `.specs/verodesign/2026-05-15-girok-palette-refinement.md`는 girok light/dark 모두에 `success`와 `warning` 참고 값을 명시했다. 그런데 실제 `packages/design/tokens/themes/girok-{light,dark}.json`에는 `info`만 있고 `success`/`warning`/`destructive`가 없다. 이 세 슬롯은 문서 기대치 대비 누락으로 보는 근거가 충분하다.
- 반대로 `girok`의 warm monoculture를 유지하기 위해 일부 domain 색을 brand-scoped로 두려는 방향성은 `.specs/verodesign/2026-05-16-girok-modern-expression.md`와 `.add/skills/brand-isolation.md`에 부합한다. 특히 glow, hero, finance up/down 같은 값은 status 대신 brand-scoped/future slot으로 보내는 것이 맞다.
- 최근 pattern SDD도 이미 girok가 canonical status slot을 가진다는 가정 위에 서 있다. `.specs/verodesign/2026-05-20-pattern-binary-pill-toggle/spec.md`, `...product-card/spec.md`, `...settings-row/spec.md`, `...amount-hero/spec.md`, `...view-toggle/spec.md`는 `theme.success`, `theme.destructive`, `theme.warning`을 그대로 사용한다고 적는다. 현재 girok theme 파일과 문서가 어긋난다.

## Recommendation

- status 일반 의미가 필요한 슬롯은 missing으로 취급한다. 최소한 `theme.success`, `theme.warning`, `theme.destructive`의 girok binding 보강 여부를 별도 theme-add SDD에서 명시적으로 결정해야 한다.
- 대신 finance 상승/하락, hero gradient, warm glow처럼 girok 문맥 의미가 더 중요한 값은 status에 억지로 태우지 말고 `exp.girok.*` 또는 future/app-shell slot group으로 직접 매핑한다.
- 현재 상태를 기준으로는 “status 의존 제거”만으로 끝내기 어렵다. 이미 여러 2026-05-20 pattern spec이 canonical status binding 존재를 전제로 작성돼 있어, spec과 theme 중 하나를 맞춰야 한다.
