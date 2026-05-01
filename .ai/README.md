# Verobee Design System

> CDD Layer 1 — Entry Point | **Last Updated**: 2026-04-30

## Project

Token-driven CSS architecture. W3C DTCG JSON tokens → Style Dictionary build → multi-output (CSS variables, utility classes, TS types). OKLCH-first, Tailwind-independent, multi-theme, multi-framework, multi-environment (web + Tauri).

## Identity

| Term | Value |
| ---- | ----- |
| System | Verobee Design System (VDS) |
| Repo | beegy-labs/verodesign |
| Package | @verobee/design |
| License | MIT |
| Version | 0.0.1 |

## Navigation

| Goal | Path |
| ---- | ---- |
| All locked decisions | `docs/llm/decisions.md` |
| Core rules (NEVER/ALWAYS) | `.ai/rules.md` |
| Architecture overview | `.ai/architecture.md` |
| Git & release flow | `.ai/git-flow.md` |
| Token architecture (3-tier) | `docs/llm/tokens/architecture.md` |
| Naming conventions | `docs/llm/tokens/naming.md` |
| Theme system | `docs/llm/tokens/themes.md` |
| Cross-platform extensibility | `docs/llm/tokens/platforms.md` |
| WCAG contrast policy | `docs/llm/tokens/contrast.md` |
| Build pipeline | `docs/llm/build/style-dictionary.md` |
| Output spec | `docs/llm/build/outputs.md` |
| Consumer integration (any framework) | `docs/llm/build/consumer.md` |
| SemVer policy | `docs/llm/build/versioning.md` |
| Pattern absorption | `docs/llm/research/README.md` |
| LLM context indexes | `docs/llm/llm-context/` |
| Workflow index | `.add/README.md` |

## Themes (v0.1.0 ship)

| Theme | Concept | Modes |
| ----- | ------- | ----- |
| default | Neutral universal blue | light, dark |
| veronex | Verde Nexus (green) | light, dark |
| verobase | Vero Base (navy) | light, dark |

## Consumer support

Web frameworks (React, Vue, Svelte, Solid, Angular, Astro, Qwik, Lit, Preact, vanilla) and webview environments (Tauri Desktop/Mobile, Electron, Capacitor, PWA) all supported via CSS output.
