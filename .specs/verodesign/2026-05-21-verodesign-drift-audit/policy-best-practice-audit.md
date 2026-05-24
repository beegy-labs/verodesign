# verodesign Policy Best Practice Audit (Phase X1-A)

> Date: 2026-05-21
> Scope: current policy vs external 2026 sources

## Self-check

```text
[knowledge-gap-check] Read llm-knowledge-gaps.md.
Topics in scope: design tokens 2026 best practice, OKLCH/color-mix/light-dark adoption, DTCG spec status, Lit 3 + Web Components, Lit SSR + Declarative Shadow DOM, React 19 custom elements, ARIA APG / WCAG status, brand isolation, monorepo + per-brand package, component canonical docs, workflow architecture, naming convention.
Web search required: yes.
Most recent training cutoff acknowledged: 2026-01.
```

## Policy Areas

| Policy area | Current | External source | 2026 trend | Difference | Recommendation |
| --- | --- | --- | --- | --- | --- |
| Token format | W3C DTCG + Style Dictionary 4.x | https://www.designtokens.org/ ; https://styledictionary.com/info/dtcg/ | DTCG 2025.10 is stable. Style Dictionary v4 has first-class DTCG support, but latest 2025.10 support is not complete and v5 is the stated path for full support. | 일부 | Keep DTCG. Add policy note that SD4 is acceptable but not full-fidelity for latest 2025.10; track SD5 migration. |
| Color space | OKLCH-first, `color-mix()` utilities, theme files split by mode | https://tailwindcss.com/blog/tailwindcss-v4 ; https://tailwindcss.com/docs/customizing-spacing/ ; https://web.dev/articles/light-dark | CSS-first token systems and OKLCH are mainstream in 2026. `light-dark()` is baseline-newly-available since 2024-05-13 and simplifies mode pairs. | 일부 | Policy is ahead on OKLCH. Add `light-dark()` adoption guidance for utility/theme output where subtree theming is not required. |
| Component core | Lit 3 + Web Components + `@lit/react` thin wrappers | https://lit.dev/ ; https://react.dev/blog/2024/12/05/react-19 ; https://react.dev/reference/react-dom/components | React 19 now fully supports custom elements. Web Components are more viable cross-framework than when this policy was written. Lit remains current; no official Lit 4 evidence found. | 없음 | Keep Lit 3 + CE core. Reposition `@lit/react` as ergonomic optional layer, not architectural requirement. |
| a11y patterns | APG 1.2, WCAG 2.1/2.2, WCAG 3 deferred | https://www.w3.org/WAI/ARIA/apg/about/introduction/ ; https://www.w3.org/WAI/standards-guidelines/aria/ ; https://www.w3.org/press-releases/2025/wcag22-iso-pas/ ; https://www.w3.org/WAI/news/2026-03-03/wcag3/ | APG remains informative guidance, not recommendation-track. WAI-ARIA 1.2 is recommendation; 1.3 is still working draft. WCAG 2.2 is formal and ISO/IEC 40500:2025; WCAG 3 remains working draft in March 2026. | 일부 | Keep APG 1.2 baseline, but update policy wording from WCAG 2.1 to WCAG 2.2 as current baseline. Keep WCAG 3 deferred. |
| SSR | `@lit-labs/ssr` + DSD | https://lit.dev/docs/ssr/overview/ ; https://lit.dev/docs/ssr/client-usage/ ; https://web.dev/articles/declarative-shadow-dom | Lit SSR is still Labs/experimental. Declarative Shadow DOM is baseline-newly-available since 2024-08-05, but Lit docs still document polyfill/fallback constraints. | 일부 | Policy should stop projecting “widely available 2026-08” as fixed forecast. Treat DSD as usable progressive enhancement; mark Lit SSR as low-level/experimental. |
| Brand isolation | Per-brand package + identical semantic schema | https://carbondesignsystem.com/elements/themes/overview/ ; https://carbondesignsystem.com/elements/color/overview/ ; https://vercel.com/geist/colors | 2026 systems still converge on stable role names with theme-specific values. Carbon explicitly keeps token names/roles fixed across themes; Geist exposes role-based accessible scales. | 없음 | Keep current isolation model. It aligns with current enterprise practice. Real gap is implementation drift, not policy. |
| Architecture | 3-tier primitive / semantic / component, CSS variables + utilities + TS | https://www.designtokens.org/ ; https://tailwindcss.com/blog/tailwindcss-v4 ; https://carbondesignsystem.com/elements/color/tokens/ | CSS-first theming and role-based tokens are mainstream. Tailwind v4 pushes theme variables in CSS; Carbon keeps role-based token layers. | 없음 | Keep 3-tier model. Add note that CSS-first emission is a best-practice complement, not a replacement for DTCG source. |
| Component canonical docs | Per-component markdown pages | https://storybook.js.org/docs/9.0/writing-docs/mdx ; https://custom-elements-manifest.open-wc.org/ ; https://storybook.js.org/addons/wc-storybook-helpers | 2026 docs trend is MDX/interactive docs plus generated API metadata. CEM is mature and Storybook Web Components integrates with CEM; Storybook manifests are currently React-only preview. | 있음 | Upgrade policy: canonical docs should be “MDX or markdown + CEM-backed API extraction + examples”, not hand-maintained prose only. |
| Workflow (`.ai/` + `docs/llm/` + `.add/` + `.specs/`) | SSOT + spec + execution split | https://www.designtokens.org/ ; https://storybook.js.org/docs/ai/manifests | No single 2026 external standard matches this exact structure. However, spec-first and machine-readable documentation are increasingly common. This is a local architecture choice, not a broadly obsolete one. | 일부 | Keep the split. Main update needed is workflow coverage: add dedicated component workflow and policy synchronization rules. |
| Naming convention | semantic-purpose naming, `theme.{slot}`, `exp.{brand}.{slot}` | https://carbondesignsystem.com/elements/themes/overview/ ; https://carbondesignsystem.com/elements/color/overview/ ; https://www.designtokens.org/ | 2026 naming practice still favors role/intent over appearance. Carbon explicitly defines token as role-based and stable across themes. | 없음 | Keep purpose-first naming. Real issue is internal doc/source drift, not policy direction. |

## Per-area Notes

### Token format

| Field | Value |
| --- | --- |
| Status | 2026 BP 부합, with tooling caveat |
| Note | DTCG choice is current best practice. Style Dictionary 4 support is strong but not fully aligned to the latest stable spec yet. |

### Color space

| Field | Value |
| --- | --- |
| Status | 2026 BP 부합, partly ahead |
| Note | OKLCH-first is now mainstream enough to be justified. `light-dark()` is the missing policy-level update. |

### Component core

| Field | Value |
| --- | --- |
| Status | 2026 BP 부합 |
| Note | React 19 materially improves CE integration, which strengthens this decision rather than weakening it. |

### a11y patterns

| Field | Value |
| --- | --- |
| Status | mostly compliant, terminology stale |
| Note | APG 1.2 and WCAG 3 defer remain correct. WCAG 2.2 should replace 2.1 in policy headlines because 2.2 is the current formal baseline. |

### SSR

| Field | Value |
| --- | --- |
| Status | partially outdated |
| Note | DSD is no longer speculative, but Lit SSR is still explicitly Labs. The policy is directionally right and maturity-wise too optimistic. |

### Brand isolation

| Field | Value |
| --- | --- |
| Status | 2026 BP 부합 |
| Note | External systems still use stable token roles with per-theme values. |

### Architecture

| Field | Value |
| --- | --- |
| Status | 2026 BP 부합 |
| Note | The 3-tier model is conservative but still well aligned with current large-system practice. |

### Component canonical docs

| Field | Value |
| --- | --- |
| Status | outdated |
| Note | Hand-authored markdown-only canon drifts too easily versus current CEM-backed, docs-as-code pipelines. |

### Workflow

| Field | Value |
| --- | --- |
| Status | mostly compliant, incomplete |
| Note | The split itself is not outdated. Missing workflow coverage for component lifecycle is the actual gap. |

### Naming

| Field | Value |
| --- | --- |
| Status | 2026 BP 부합 |
| Note | Purpose-first naming remains the norm. |

## Integrated Conclusion

| Policy area | Current status | 2026 BP fit | Update needed | Priority |
| --- | --- | --- | --- | --- |
| Token format | Strong | Yes | Yes, tooling caveat | P2 |
| Color space | Strong | Yes | Yes, add `light-dark()` policy | P2 |
| Component core | Strong | Yes | No | P3 |
| a11y patterns | Strong but stale wording | Partial | Yes, WCAG 2.2 baseline wording | P1 |
| SSR | Optimistic | Partial | Yes | P1 |
| Brand isolation | Strong | Yes | No | P3 |
| Architecture | Strong | Yes | No | P3 |
| Component canonical docs | Weak | No | Yes | P1 |
| Workflow | Incomplete | Partial | Yes | P1 |
| Naming | Strong | Yes | No | P3 |

## Totals

| Metric | Count |
| --- | ---: |
| Total policy areas | 10 |
| 2026 BP 부합 | 6 |
| Partially aligned / needs refresh | 4 |
| Clearly outdated | 1 |
| Ahead of trend | 1 |

Inference:
- “Clearly outdated” is limited to component canonical docs policy.
- “Ahead of trend” is the OKLCH-first source policy.

## Update Recommendations

| Priority | Recommendation | Why |
| --- | --- | --- |
| P1 | Promote WCAG 2.2 to current policy baseline and keep WCAG 3 deferred | External standards moved; internal wording did not |
| P1 | Rewrite SSR policy to say DSD is production-usable progressive enhancement, while Lit SSR remains Labs | Current policy overstates maturity certainty |
| P1 | Replace markdown-only component canon with CEM-backed API docs + prose docs | 2026 docs pipelines reduce drift this way |
| P1 | Add dedicated component-add / component-modify workflow under `.add/` | Current workflow coverage gap is a primary drift source |
| P2 | Add explicit Style Dictionary v4/v5 compatibility note to token policy | DTCG is right, tooling support is nuanced |
| P2 | Add `light-dark()` adoption rule for output optimization where subtree theming is not needed | Current web platform supports it |
