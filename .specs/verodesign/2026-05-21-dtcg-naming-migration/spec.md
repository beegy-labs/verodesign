# SDD: DTCG naming source migration (X2-2)

> Authored: 2026-05-21 | Phase X2 — 정공법 시정 #2 | Depends: X2-1 (slot group)
> Inputs: X1 BLOCKER G6 (naming drift) + user decision (방향 B: source 를 DTCG 표준으로)

## Why

`naming.md` 정책 = DTCG dot-path:
- `theme.status.success.foreground` (dotted)
- `theme.primary.foreground`
- `theme.destructive.foreground`

현 source drift:
- `theme.success` (root, status.* 안 아님) — naming.md 표 `status` domain 위반
- `theme.success-fg` (dashed) — naming.md `*.foreground` (dotted) 위반
- `theme.primary-fg`, `theme.destructive-fg` 동일

**정공법 = source 를 DTCG 표준으로 마이그레이션 + 모든 consumer 변환 codemod**. brand 1000 환경 표준 정합 필수.

## Scope

### 1. `tokens/semantic/*` source 마이그레이션

| Before | After |
|--------|-------|
| `theme.success` | `theme.status.success` |
| `theme.success-fg` | `theme.status.success.foreground` |
| `theme.error` | `theme.status.error` |
| `theme.error-fg` | `theme.status.error.foreground` |
| `theme.warning` | `theme.status.warning` |
| `theme.warning-fg` | `theme.status.warning.foreground` |
| `theme.info` | `theme.status.info` |
| `theme.info-fg` | `theme.status.info.foreground` |
| `theme.neutral` | `theme.status.neutral` |
| `theme.neutral-fg` | `theme.status.neutral.foreground` |
| `theme.primary-fg` | `theme.primary.foreground` |
| `theme.accent-fg` | `theme.accent.foreground` |
| `theme.destructive-fg` | `theme.destructive.foreground` (status 안 아님, naming.md 표 destructive = 별 domain) |
| `theme.cancelled-fg` | `theme.cancelled.foreground` |

CSS variable mapping:
- `--vds-theme-success-fg` → `--vds-theme-status-success-foreground`
- `--vds-theme-primary-fg` → `--vds-theme-primary-foreground`
- `--vds-theme-destructive-fg` → `--vds-theme-destructive-foreground`

### 2. `@verobee/codemods` 패키지 작성

- 패키지 신설 (없다면) `packages/codemods/`
- transform 작성:
  - DTCG JSON transform: source token rename (jq 등)
  - CSS variable transform: `--vds-theme-success-fg` → `--vds-theme-status-success-foreground` (regex)
  - JSX/TSX transform: 컴포넌트 prop 또는 styled string 안의 var(...) 참조
  - Lit element transform: TaggedTemplate string 안의 var(...) 참조
- CLI: `npx @verobee/codemods migrate-naming-2026-05`

### 3. 모든 verodesign source migration

- `tokens/semantic/*.json`
- `tokens/themes/*.json`
- `tokens/experimental/*.json`
- `packages/design-elements/src/**/*.ts` (vds 변수 참조)
- `packages/design-react/src/**/*.tsx` (vds 변수 참조)
- `packages/utilities/src/**/*.css`
- `packages/showcase/**` (있다면)
- `docs/llm/**/*.md` (예시 코드)
- `.specs/verodesign/**/*.md` (이전 spec의 토큰 참조)

### 4. Consumer notification

- `docs/llm/migrations/v0-to-v1.md` 갱신 (또는 `v1-to-v2.md` 신설)
- consumer app (app-girok, verobase, veronex 등) 에 codemod 적용 가이드

## Acceptance gates

| Gate | 요구 |
|------|------|
| `@verobee/codemods` 패키지 build + test | ✓ |
| 모든 verodesign source 마이그레이션 (regex grep 후 구 표기 0) | ✓ |
| `pnpm build` 통과 (모든 패키지) | ✓ |
| CSS variable 산출이 DTCG dot-path 부합 (`--vds-theme-status-success-foreground` 등) | ✓ |
| `naming.md` examples 갱신 | ✓ |
| `tokens/CHANGELOG.md` breaking change 명시 | ✓ |
| 모든 brand theme `implements` 정합 (X2-1 의존) | ✓ |
| consumer migration 가이드 (`docs/llm/migrations/v1-to-v2.md`) 작성 | ✓ |

## Out-of-scope

- consumer app (app-girok, verobase 등) 의 실제 마이그레이션 = 별 consumer-update 작업 (codemod 제공만)
- slot group 결정 — X2-1 영역

## Cross-impact

- X1 G6 BLOCKER (naming drift) → 시정
- X1 G2 BLOCKER (semantic schema parity) → X2-1 + X2-2 결합으로 시정
- breaking change → semver major bump (v1 → v2)

## Validation steps

1. X2-1 완료 확인 (slot group 분리)
2. `tokens/semantic/status.json` 의 slot 명 = `status.success.foreground` 등 DTCG 정합
3. 모든 source 의 토큰 참조 `rg "theme\.(success|warning|error|info|neutral|primary|destructive|accent)-fg"` = 0
4. 모든 source 의 토큰 참조 `rg "theme\.(success|warning|error|info|neutral)\b"` (단독 root) = 0 (status.* 로 이동)
5. codemod 패키지 test = 모든 transform 적용 정합
6. `pnpm --filter "@verobee/*" build` 통과
7. 보고
