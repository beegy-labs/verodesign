# SDD: Component workflow 신설 (X2-4)

> Authored: 2026-05-21 | Phase X2 — 정공법 시정 #4 | Depends: none (병렬 가능)
> Inputs: X1 INFO G10 (.add component workflow 부재) + X1-A P1 (dedicated component workflow 신설)

## Why

`.add` 워크플로우 = token-add / theme-add / pattern-intake / pattern-promote / consumer-update / doc-sync / release / deprecate / contrast-audit / optimize-2026 / refactor-2026 / refactor-2026-baseline / codex-delegate / pattern-research / pattern-deprecate. **컴포넌트 신설/수정/폐기 전용 워크플로우 부재**.

Phase E2 가 일반 SDD + codex-delegate + brand-isolation skill 조합으로 우회 = 정책 정합이지만 workflow semantics 흐림. `codex-delegate.md` Decision Matrix 에도 "component add/modify" row 부재.

**정공법 = `.add/component-{add,modify,deprecate}.md` 3 워크플로우 신설 + `codex-delegate.md` Decision Matrix 갱신**.

## Scope

### 1. `.add/component-add.md` 신설

Workflow:
1. SDD scope (Claude) — component slug + intended usage + API draft + a11y pattern (APG) + tokens consumed + slot composition + form-association (if any)
2. Slot group 검증 (X2-1 의존) — 사용 토큰이 `core` 또는 implements 한 group 안인지
3. brand-isolation skill (검출 1-4) — canonical only, brand prefix 0
4. token-ssot skill (검출 1-3) — role token only
5. Lit element 작성 (`packages/design-elements/src/components/{name}/vds-{name}.ts`)
6. React adapter (`packages/design-react/src/components/{Name}.tsx`)
7. CEM auto-gen 확인 (X2-5 의존? 또는 기존 CEM analyzer)
8. a11y test (web-test-runner + @open-wc/testing)
9. CHANGELOG entry
10. doc-sync (X2-5 의 CEM-backed canonical docs)

Acceptance gates:
- Lit element + React adapter + CEM 등록 + a11y test + CHANGELOG
- brand-isolation/token-ssot 검출 0
- build 통과

### 2. `.add/component-modify.md` 신설

trigger:
- prop 추가 (additive, no breaking)
- variant 확장
- state 추가
- slot 추가
- a11y enhancement

workflow:
1. SDD scope (Claude)
2. 영향 분석 (consumer 영향)
3. Lit + React adapter 수정
4. CEM regenerate
5. a11y test
6. CHANGELOG entry
7. doc-sync

breaking change (prop 제거, slot 제거, role 변경 등) = `component-deprecate.md` 단계 거침

### 3. `.add/component-deprecate.md` 신설

workflow:
1. deprecation notice (CHANGELOG + component .md 페이지)
2. codemod 작성 (`@verobee/codemods`)
3. ≥ 6 month deprecation window
4. removal SDD

### 4. `codex-delegate.md` Decision Matrix 갱신

추가 row:
| Task | Delegate | Stay in Claude |
|------|----------|----------------|
| Add component via `component-add.md` | ✓ | ✗ |
| Modify component via `component-modify.md` | ✓ | ✗ |
| Deprecate component via `component-deprecate.md` | ✓ | ✗ |
| Decide component API (props, variants, slots) | ✗ | ✓ |
| Decide a11y pattern (APG selection) | ✗ | ✓ |

### 5. `.add/README.md` Index 갱신

새 3 워크플로우 등록.

## Acceptance gates

| Gate | 요구 |
|------|------|
| 3 워크플로우 신설 (component-add/modify/deprecate) | ✓ |
| codex-delegate Decision Matrix 갱신 | ✓ |
| .add/README.md Index 갱신 | ✓ |
| 워크플로우 본문에 brand-isolation + token-ssot 게이트 명시 | ✓ |
| 각 워크플로우의 acceptance gates 명시 | ✓ |
| 기존 Phase E2 산출 (BinaryPillToggle / CompactRow Lit / scrollbar-hide) 가 신 워크플로우 기준 retroactive 검증 통과 명시 | ✓ |

## Out-of-scope

- 실 컴포넌트 신설 (이미 Phase E2 완료)
- CEM-backed docs migration — X2-5 영역
- naming migration — X2-2 영역

## Validation steps

1. .add/component-add.md / component-modify.md / component-deprecate.md 작성
2. codex-delegate.md Decision Matrix 갱신
3. .add/README.md 갱신
4. 워크플로우의 acceptance gates 가 명확 + 게임 불가
5. retroactive: Phase E2 산출이 component-add 기준 통과 (이미 brand-isolation/token-ssot 검출 0, ARIA APG 부합, CEM 등록 → 통과)
6. 보고
