# LLM Knowledge Gaps

> CDD Layer 2 — Explicit enumeration of areas where LLM training data is likely insufficient | **Last Updated**: 2026-04-30

## Why This Doc Exists

Most LLM agents have training cutoffs. Design system trends, color tooling, and W3C specs evolve quickly — the agent may confidently produce **outdated or incorrect** recommendations unless explicitly told what it does NOT know.

This file is the **mandatory pre-read** for any pattern-research or pattern-intake workflow. Always update it when training cutoffs change or new specs ship.

## Categories Where LLM Knowledge Decays Fastest

| Category | Why decay is fast | Authoritative source today |
| -------- | ----------------- | -------------------------- |
| W3C DTCG spec | Active development; first stable shipped 2025-10 | https://www.w3.org/community/design-tokens/ |
| Style Dictionary v4 API | Major rewrite; many examples online use v3 | https://styledictionary.com/ |
| CSS color spaces (oklch, color-mix, P3) | Browser support changes | https://caniuse.com/css-color-function |
| Tailwind v4 architecture | Released 2025; v3-era advice still dominant in training data | https://tailwindcss.com/docs |
| Modern design system patterns | Trends shift quarterly | See `discovery-sources.md` |
| Accessibility specifications (WCAG 3 draft) | WCAG 3 is in working draft | https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/ |
| Browser CSS nesting, `@layer`, `@scope`, `@container` | Recent additions, support shifts | https://developer.mozilla.org/ |

## Mandatory Behavior When Hitting These Topics

| Situation | Required action |
| --------- | --------------- |
| User asks about latest of any topic above | Web search FIRST, do not answer from memory |
| Unsure about API surface | Read official docs URL via WebFetch |
| Citing a feature | Verify with caniuse.com / mdn.io |
| Adopting a design pattern | Cite source URL in `$extensions.verobee.source` |

## Self-Audit Triggers

Re-read this file before:

| Trigger | Why |
| ------- | --- |
| Starting `.add/pattern-research.md` | Avoid stale pattern recommendations |
| Modifying `style-dictionary.config.js` | API may have changed |
| Adding contrast logic | WCAG specs evolve |
| Suggesting any color tool to the user | Tooling churns rapidly |

## Update Protocol

| When | What to update |
| ---- | -------------- |
| New official spec stable | Add row to "Authoritative source today" |
| New tooling supersedes existing | Update reference |
| Quarterly | Re-verify all rows |

## Self-Description

The agent operating on this repo SHOULD output a one-line acknowledgment at the start of any research/intake task:

```
[knowledge-gap-check] Read llm-knowledge-gaps.md. Topics in scope: <list>. Web search required: <yes|no>.
```
