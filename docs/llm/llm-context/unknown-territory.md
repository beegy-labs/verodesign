# Unknown Territory

> CDD Layer 2 — Areas verodesign does NOT cover yet | **Last Updated**: 2026-04-30

Explicit enumeration of UI/design domains where verodesign currently has no token coverage. LLM agents seeing a request in these areas MUST trigger `pattern-research` workflow before fabricating a solution.

## Currently uncovered domains

| Domain | Status | Workflow when needed |
| ------ | ------ | -------------------- |
| Component-specific tokens (button, card, input internals) | Reserved Tier 3 | Wait for `@verobee/design-react` package |
| Code editor styling (gutter, syntax, diff, terminal) | Reserved `code` slot group | `pattern-research` → `pattern-intake` |
| AI chat UI (user/assistant/tool message bubbles) | Reserved `chat` slot group | Same |
| File tree / navigator | Reserved `tree` slot group (future) | Same |
| Visual editor canvas (rulers, snap lines, selection) | Reserved `canvas` slot group (future) | Same |
| Tauri window chrome (custom titlebar, controls) | Reserved `app-shell` slot group | Same |
| Mobile shell (safe areas, touch targets) | Reserved `mobile-shell` slot group | Same |
| Native iOS-only (haptic, blur effect, dynamic island) | Reserved `ios` slot group | Same |
| Native Android-only (ripple, material motion) | Reserved `android` slot group | Same |
| High-contrast mode (`prefers-contrast: more`) | Reserved as theme variant | New theme spec |
| Reduced motion alternate | Partially covered (durations → 0) | Already in spec |
| Color-blind friendly variant theme | Not designed | New theme spec |
| Print stylesheet | Not designed | New `print` slot group |
| Animation choreography (sequence, stagger) | Out of scope (libraries downstream) | Reject |
| Icon library | Out of scope | Reject |
| Layout primitives (Stack, Cluster, Grid) | Out of scope (component layer) | `@verobee/design-react` |
| Typography pairing presets | Not designed | Could be added |
| Gradient tokens | Not designed | Could be added |
| Mesh / blur background | Not designed | Could be added |
| Glassmorphism (backdrop-filter recipes) | Not designed | `pattern-research` |

## When LLM agent encounters uncovered domain

| Step | Action |
| ---- | ------ |
| 1 | Acknowledge the gap explicitly to user |
| 2 | Read `docs/llm/research/llm-knowledge-gaps.md` |
| 3 | Run `pattern-research` workflow (web search 2026 best practices) |
| 4 | Run `pattern-intake` workflow → write to `tokens/experimental/` |
| 5 | Reference experimental token in user code (with `vds-exp-*` prefix awareness) |
| 6 | Document in `pattern-catalog.md` |

## Forbidden response patterns

| Bad agent behavior | Reason |
| ------------------ | ------ |
| Fabricate `var(--vds-syntax-keyword)` because it sounds plausible | Token does not exist; will fail at runtime |
| Suggest hex value directly when token is missing | Violates `tokens/rules.md` no-hardcode rule |
| Suggest using Tailwind class as fallback | Violates Tailwind-independence policy |
| Skip pattern-research and assume the agent's training knows | Knowledge may be stale (per `llm-knowledge-gaps.md`) |
| Add token directly to canonical without absorption lifecycle | Violates lifecycle policy |

## Boundary signals

If user request mentions any of these terms, treat as uncovered until verified:

```
syntax highlighting, code editor, terminal, diff view, gutter, line numbers,
chat bubble, message thread, AI response, tool call,
glassmorphism, mesh gradient, neumorphism, claymorphism,
file tree, navigator, sidebar tree,
canvas, rulers, snap lines,
custom titlebar, frameless window, drag region,
safe area, notch, home indicator,
haptic, blur effect, dynamic island,
ripple, material motion, navigation bar,
print, page break,
icon set, illustration system
```

## Maintenance

This file is updated whenever a new pattern is absorbed into canonical (move row from "uncovered" to fully implemented) OR when a new uncovered area is identified.
