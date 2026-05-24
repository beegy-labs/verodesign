# Phase X2 Input

> Date: 2026-05-21
> Inputs: Phase X1 drift audit + Phase X1-A policy best-practice audit

## X1 Summary

| Metric | Count |
| --- | ---: |
| BLOCKER | 12 |
| WARN | 3 |
| INFO | 1 |

Source: [finding.md](/Users/vero/workspace/beegy/verodesign/.specs/verodesign/2026-05-21-verodesign-drift-audit/finding.md)

## X1-A Summary

| Metric | Count |
| --- | ---: |
| Policy areas reviewed | 10 |
| 2026 BP 부합 | 6 |
| Partial refresh needed | 4 |
| Clearly outdated | 1 |
| Ahead of trend | 1 |

Source: [policy-best-practice-audit.md](/Users/vero/workspace/beegy/verodesign/.specs/verodesign/2026-05-21-verodesign-drift-audit/policy-best-practice-audit.md)

## BLOCKER 정책 위반 (X1)

| Area | Issue | Priority |
| --- | --- | --- |
| Component docs | Capability Matrix 누락 14개, canonical page drift | P1 |
| Theme parity | semantic schema parity 주장과 source 불일치 | P1 |
| Contrast | policy vs validator/report mismatch | P1 |
| Naming | `theme.status.*` vs root status, `foreground` vs `-fg` drift | P2 |
| Experimental isolation | experimental token이 canonical theme에 섞임 | P2 |

## Policy Outdated / Partial (X1-A)

| Area | Status | Why it matters | Priority |
| --- | --- | --- | --- |
| Component canonical docs | Outdated | markdown-only canon is drift-prone vs CEM-backed docs pipelines | P1 |
| Workflow coverage | Partial | no dedicated component workflow; current drift source | P1 |
| SSR policy | Partial | DSD maturity improved, Lit SSR still Labs | P1 |
| Accessibility baseline wording | Partial | WCAG 2.2 is current baseline, policy text still centers 2.1 | P1 |
| Token tooling note | Partial | DTCG is stable, SD4 is not full 2025.10 fidelity | P2 |
| Color output policy | Partial | `light-dark()` now viable addition | P2 |

## Consolidated Priority

| Priority | Action lane | Includes |
| --- | --- | --- |
| P1 | Policy/source reconciliation | semantic parity, contrast requirement vocabulary, component docs canon, component workflow, WCAG 2.2 wording, SSR maturity wording |
| P2 | Structural cleanup | experimental isolation, naming convergence, Style Dictionary compatibility note, `light-dark()` policy |
| P3 | Documentation hygiene | brand guides, changelog, path/language scope cleanup |

## X2 Execution Order

1. Reconcile source-of-truth vocabulary.
2. Decide whether source changes to match policy, or policy changes to match implemented system.
3. Establish component documentation and workflow canon.
4. Separate experimental isolation fixes from naming cleanup.
5. Run doc-sync after policy decisions lock.

## Decision Triggers for X2

| Trigger | Required decision |
| --- | --- |
| theme parity fix | Keep full status parity across all themes, or narrow semantic schema |
| contrast fix | Keep AAA for primary/status pairs, or reduce policy to AA and update docs/build |
| docs canon fix | Keep hand-authored markdown canon, or move to CEM-backed generated API + prose |
| workflow fix | Add component workflow under `.add/`, or broaden pattern workflow remit explicitly |
