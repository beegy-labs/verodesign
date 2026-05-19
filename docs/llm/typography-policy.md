# Typography Policy (CDD — Layer 2 SSOT)

> Status: canonical. Authored 2026-05-20. Anchor: app-girok **calendar**
> screen (the most disciplined surface). Applies to consumers; verodesign
> ships the roles, this doc fixes **which role each semantic slot uses**.

## Problem

verodesign already defines 6 type-roles (below). Consumers were applying
them ad-hoc → same semantic element rendered at different sizes across
screens ("들쭉날쭉"). Policy = one role per semantic slot, app-wide.

## The 6 roles (verodesign, unchanged — no new tokens)

| role | size | weight | lh | utility |
|------|------|--------|----|---------|
| display | 44px | 700 | 1.25 | `vds-text-display` |
| metric  | 36px | 700 | 1.25 | `vds-text-metric` |
| title   | 18px | 700 | 1.375 | `vds-text-title` |
| body    | 16px | 400 | 1.5 | `vds-text-body` |
| label   | 14px | 500 | 1.5 | `vds-text-label` |
| caption | 12px | 400 | 1.5 | `vds-text-caption` |

## Canonical semantic → role map (calendar-anchored, **2-tier**)

The calendar uses essentially two tiers; this is the app-wide rule:

| Semantic slot (examples) | Role / classes |
|---|---|
| **Primary tier** — card/section/page title, dialog & bottom-sheet title (`저축 상품`, `은행계좌`, `주식 목표 달성하기`, `대출`, `5월 13일`, `2026년 5월`); primary values & amounts (`0원`, `1,000,000원`, summary values); day numbers; list-row primary text | **`vds-text-label`** (14/500); numbers add `vds-tabular-nums` |
| **Secondary tier** — sub-labels, descriptions, captions, helper/meta, weekday header, day amounts, empty-state text (`수`, `월 수입`, `원금 합계` label, `등록된 거래가 없습니다`) | **`vds-text-caption vds-text-secondary`** (12/400) |
| Interactive | verodesign `Button`/`Tabs` component defaults (do not restyle) |

`display` / `metric` / `title` / `body` are **NOT used in app-girok**
(reserved for marketing/large dashboards elsewhere). No raw `fontSize`/
`fontWeight`, no off-scale weights (e.g. 800).

## Rationale

User directive 2026-05-20: unify "calendar 기준 싹다 공통". Calendar's
restrained 14/12 two-tier reads as the cleanest surface; promoting it to
the global rule removes the title-size variance (18/700 cards vs 14 header)
and the unsized-metric clash. Hierarchy comes from weight(500 vs 400),
color (`vds-text-secondary`), and spacing — not size jumps.

## Enforcement

- Consumer rule + audit list: app `.add/typography-conformance.md`.
- verodesign roles/tokens **unchanged** (zero cross-brand diff). Dialog
  title role override is a **consumer** concern (wrap slot in
  `vds-text-label`), not a verodesign token change.
- Related: [[decisions.md]] typography scope; reference-cheatsheet
  "Typography use cases" (now superseded by this map for app-girok).
