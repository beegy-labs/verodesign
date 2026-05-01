# Verobee Design System Docs Index

> CDD Layer 2 — Domain SSOT | **Last Updated**: 2026-04-30

## Master decision document

[`decisions.md`](./decisions.md) — All locked decisions. Single source of truth.

## Policies (vendored via ADP submodule)

| Policy | File |
| ------ | ---- |
| Identity | `policies/identity.md` |
| Methodology | `policies/development-methodology.md` |
| CDD | `policies/cdd.md` |
| SDD | `policies/sdd.md` |
| ADD | `policies/add.md` |
| Token Optimization (doc format) | `policies/token-optimization.md` |
| Agents Customization | `policies/agents-customization.md` |
| Monorepo | `policies/monorepo.md` |

## Tokens domain

| Doc | Purpose |
| --- | ------- |
| [`tokens/architecture.md`](./tokens/architecture.md) | 3-tier model, DTCG, slot groups |
| [`tokens/naming.md`](./tokens/naming.md) | Token name conventions, prefix rules |
| [`tokens/themes.md`](./tokens/themes.md) | Theme system, multi-brand strategy |
| [`tokens/platforms.md`](./tokens/platforms.md) | Cross-platform extensibility (Tauri, future native) |
| [`tokens/contrast.md`](./tokens/contrast.md) | WCAG AA mandatory, AAA primary |
| [`tokens/CHANGELOG.md`](./tokens/CHANGELOG.md) | Per-release token changes |

## Build domain

| Doc | Purpose |
| --- | ------- |
| [`build/style-dictionary.md`](./build/style-dictionary.md) | Build pipeline, transforms, formatters |
| [`build/outputs.md`](./build/outputs.md) | `dist/*` file specifications |
| [`build/consumer.md`](./build/consumer.md) | Framework integration matrix, all modes |
| [`build/versioning.md`](./build/versioning.md) | SemVer policy, release flow |

## Research / absorption domain

| Doc | Purpose |
| --- | ------- |
| [`research/README.md`](./research/README.md) | Domain overview, lifecycle |
| [`research/llm-knowledge-gaps.md`](./research/llm-knowledge-gaps.md) | Mandatory pre-read for pattern workflows |
| [`research/discovery-sources.md`](./research/discovery-sources.md) | Where to look for new patterns |
| [`research/pattern-catalog.md`](./research/pattern-catalog.md) | Discovered patterns with status |
| [`research/trend-snapshot.md`](./research/trend-snapshot.md) | Quarterly trend snapshot |

## LLM context indexes

| Doc | Purpose |
| --- | ------- |
| [`llm-context/snapshot.md`](./llm-context/snapshot.md) | Current token state (auto-generated) |
| [`llm-context/slot-map.md`](./llm-context/slot-map.md) | Slot → consumer usage mapping |
| [`llm-context/unknown-territory.md`](./llm-context/unknown-territory.md) | What verodesign does not yet cover |
| [`llm-context/reference-cheatsheet.md`](./llm-context/reference-cheatsheet.md) | Effect → token quick lookup |
