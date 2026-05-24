# SDD: CEM-backed component canonical docs 전환 (X2-5)

> Authored: 2026-05-21 | Phase X2 — 정공법 시정 #5 | Depends: X2-4 (component workflow)
> Inputs: X1 BLOCKER G1 (Component canonical docs 누락/oudated) + X1-A P1 (수기 markdown drift-prone, CEM-backed 가 2026 BP)

## Why

현 component canonical docs (`docs/llm/components/*.md`) = 수기 markdown. drift-prone:
- Phase E2 가 CompactRow Lit promote 했지만 `components/compact-row.md` 미갱신
- BinaryPillToggle 신설 했지만 `components/binary-pill-toggle.md` 부재
- `components/README.md` Capability Matrix 도 미갱신

2026 BP = **CEM (Custom Elements Manifest) auto-gen** + **prose docs 분리**. CEM analyzer 가 Lit element 의 props/slots/events 자동 추출. Storybook 9 MDX + wc-storybook-helpers 가 표준.

**정공법 = component canonical docs 를 CEM-backed pipeline 으로 전환**:
- API table (props/slots/events/CSS variables/parts) = CEM auto-gen
- Prose (purpose/when-to-use/design rationale/a11y narrative) = 수기 markdown
- 두 source 통합 = docs site (또는 .md)

## Scope

### 1. CEM 산출 검증

- 현재 `packages/design-elements/` 의 CEM analyzer 가 어떤 설정인지 점검
- Custom Elements Manifest analyzer v0.x 사용 가능성
- LitJSXProperty / 일반 @property / @customElement 모두 capture
- 이미 Phase E2 에서 `dist/custom-elements.json` 산출 확인 (BinaryPillToggle / CompactRow / option element 등록)

### 2. `components/*.md` 재구조

각 컴포넌트 페이지를 prose-only 로 슬림화:

```markdown
# {Component Name}

> Tag: `vds-{name}` · React: `<{Name}>` · Status · APG pattern

## Purpose
한 줄.

## When to use / not to use
짧은 표.

## Design rationale
디자인 의도 (왜 이렇게 만들어졌는지, brand-agnostic 측면, slot composition 설계 이유).

## A11y narrative
APG 패턴 선택 사유 + Form-associated (FACE) 시 form submission 동작 + 키보드 + screen reader 사용자 경험.

## API
> Auto-generated from `dist/custom-elements.json` — see CEM.

(빈 섹션 또는 CEM build-time generator 가 채움)

## Examples
실 사용 예시 (consumer composition 시나리오).
```

### 3. Docs build pipeline

- CEM analyzer 자동 실행 (build time)
- generator: CEM JSON → markdown table (props/slots/events/CSS vars/parts)
- prose markdown + generated API table = 통합 docs (별 build script 또는 docs site)
- Storybook 9 MDX integration (option): wc-storybook-helpers 사용해서 Lit element story + auto API table

### 4. 기존 16+ component docs 마이그레이션

| 컴포넌트 | 작업 |
|---------|------|
| badge / button / card / checkbox / dialog / label / menu / select / separator / switch / table / tabs / text-area / text-field / toast / tooltip | 기존 docs prose 보존, API table 부분만 CEM auto-gen 영역으로 표시 |
| compact-row | Phase E2 Lit promote 반영 + prose 보강 |
| binary-pill-toggle | 신설 페이지 (prose + APG Radio Group 설명) |
| icon-button / heading / stack / cluster / grid / spacer / surface / page-header / skeleton / stat-tile / box | 누락 페이지 신설 (현재 design-elements src 에 있지만 docs 없음) |

### 5. `components/README.md` Capability Matrix 자동화

CEM JSON parse → Capability Matrix auto-gen (build time). 수기 갱신 제거.

### 6. `dev-best-practices.md` + `decisions.md` 갱신

- "Component canonical docs: prose + CEM-backed API" 정책 명시
- "Storybook 9 MDX integration: optional" 명시

## Acceptance gates

| Gate | 요구 |
|------|------|
| CEM analyzer 가 모든 design-elements 컴포넌트 capture | ✓ |
| 기존 16+ component docs prose-only 슬림화 | ✓ |
| CEM-derived API table generator (build script) | ✓ |
| Capability Matrix CEM 기반 auto-gen | ✓ |
| `compact-row.md` Phase E2 반영 (`as`/`href`/`tone`/`showChevron`) | ✓ |
| `binary-pill-toggle.md` 신설 (APG Radio Group prose) | ✓ |
| 누락 페이지 신설 (icon-button / heading / stack / ...) | ✓ |
| `decisions.md` + `dev-best-practices.md` CEM-backed docs 정책 명시 | ✓ |
| `pnpm build` + docs build 통과 | ✓ |

## Out-of-scope

- Storybook 9 통합 = phase X2-5 본 SDD 에서 선택 (optional)
- showcase site 전체 재작성 = 별 phase
- 다른 패키지의 CEM (e.g. utilities) = scope 아님

## Validation steps

1. CEM analyzer 설정 점검
2. component docs prose-only 재구조 (16+ 페이지)
3. API table generator script (예: build-time markdown injection)
4. Capability Matrix auto-gen
5. 누락 페이지 신설
6. `pnpm build` + docs build 통과
7. `git diff` 확인 (CEM 산출은 build artifact)
8. 보고
