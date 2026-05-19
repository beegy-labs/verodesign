# ADD Workflows Index

> Autonomous Development Engine — execution workflows | **Last Updated**: 2026-05-20

Each workflow is a structured prompt for an LLM agent. Read the relevant CDD doc first, then follow the workflow.

> **리팩토링 진입점 = [`refactor-2026.md`](./refactor-2026.md)** (2026
> canonical·체크리스트·도구·§5 베스트프랙티스 수동 canon·§6 배치 로그).
> 모든 리팩토링은 거기서 시작. 베이스라인 =
> [`refactor-2026-baseline.md`](./refactor-2026-baseline.md).
> **개발 베스트프랙티스 SSOT(필수 pre-read) = CDD
> [`../docs/llm/dev-best-practices.md`](../docs/llm/dev-best-practices.md)**
> (토큰 SSOT/최적화·순수성·간결화·데드코드·불변식, 수동 갱신만).
> 타이포 정책 = CDD [`../docs/llm/typography-policy.md`](../docs/llm/typography-policy.md).

## Policy enforcement (skills) — ABSOLUTE

> **정책은 무조건 지켜진다.** 모든 토큰/테마/컴포넌트/슬롯/유틸 변경은 머지·
> 위임·커밋 전에 아래 스킬 검출을 통과해야 한다(LLM-agnostic — Claude/Codex/
> Gemini 동일 적용). 위반 잔존은 SDD `잔존(사유)` + 사용자 비준일 때만.

| Skill | When to run |
| ----- | ----------- |
| [`skills/README.md`](./skills/README.md) | 스킬 인덱스·3 게이트·공통 출력 형식 |
| [`skills/brand-isolation.md`](./skills/brand-isolation.md) | semantic 슬롯/theme/컴포넌트 색·값 변경 — brand X→Y zero diff 강제 |
| [`skills/token-ssot.md`](./skills/token-ssot.md) | typography/size/spacing·컴포넌트 크기 — 3-tier·의미역할 SSOT 강제 |

## Delegation contract

| Workflow | When to run |
| -------- | ----------- |
| [`codex-delegate.md`](./codex-delegate.md) | Read before every Claude → Codex handoff. Defines the response cap, review pipeline, and stay-in-Claude exceptions |

## Token lifecycle

| Workflow | When to run |
| -------- | ----------- |
| [`token-add.md`](./token-add.md) | Adding a new token (primitive or semantic) |
| [`theme-add.md`](./theme-add.md) | Adding a new theme |
| [`deprecate.md`](./deprecate.md) | Marking a token deprecated |
| [`contrast-audit.md`](./contrast-audit.md) | Re-validate WCAG contrast for all themes |

## Pattern absorption

| Workflow | When to run |
| -------- | ----------- |
| [`pattern-research.md`](./pattern-research.md) | Searching for new design patterns |
| [`pattern-intake.md`](./pattern-intake.md) | Ingesting an external pattern reference |
| [`pattern-promote.md`](./pattern-promote.md) | Promoting experimental → canonical |
| [`pattern-deprecate.md`](./pattern-deprecate.md) | Removing unused experimental token |

## Release / consumer

| Workflow | When to run |
| -------- | ----------- |
| [`release.md`](./release.md) | Tag and release a new version |
| [`consumer-update.md`](./consumer-update.md) | Update veronex/verobase to new verodesign version |
| [`doc-sync.md`](./doc-sync.md) | Sync docs after token/theme changes |

## Architecture migration

| Workflow | When to run |
| -------- | ----------- |
| [`optimize-2026.md`](./optimize-2026.md) | Execute v0.2.0 size + perf optimization (`@property`, `light-dark()`, `color-mix()`, `@scope`, `@container`, Brotli-11) |

## Workflow execution rules

| Rule | Detail |
| ---- | ------ |
| Read CDD first | Each workflow declares required pre-reads |
| Use SDD spec for non-trivial changes | Token rename, theme add, slot group add |
| Build gates must pass | Workflow ends with successful `npm run build` |
| Update CHANGELOG | Every workflow that adds/changes tokens updates `docs/llm/tokens/CHANGELOG.md` |
| Commit by Conventional Commits | `<type>(<scope>): <subject>` |
| No AI mention in commits | Per AGENTS.md commit rule |
