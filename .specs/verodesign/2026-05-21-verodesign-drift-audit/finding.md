# verodesign Drift Audit (Phase X1)

> Generated: 2026-05-21 | Source: prior stdout preservation

## Summary

| Gate | drift count | severity |
| --- | ---: | --- |
| G1. CDD ↔ 코드 정합 | 21 | BLOCKER |
| G2. CDD ↔ 토큰 정합 | 8 | BLOCKER |
| G3. CDD ↔ Spec 정합 | 5 | WARN |
| G4. brand-isolation 검출 | 0 위반 / 1 구조 리스크 | INFO |
| G5. token-ssot 검출 | 0 위반 / 0 구조 리스크 | INFO |
| G6. naming convention | 4 | WARN |
| G7. WCAG contrast | 3 | BLOCKER |
| G8. brand status parity | 8 | BLOCKER |
| G9. `.ai/` + `.add/` + skills 정합 | 4 | WARN |
| G10. `.add` workflow gap | 1 | INFO |

## G1. CDD ↔ 코드 정합

| Drift | SSOT | 실재 | 판정 | Severity |
| --- | --- | --- | --- | --- |
| Capability Matrix 누락 14개 | [docs/llm/components/README.md:5](/Users/vero/workspace/beegy/verodesign/docs/llm/components/README.md:5), [docs/llm/components/README.md:7](/Users/vero/workspace/beegy/verodesign/docs/llm/components/README.md:7) 는 canonical page 1개=컴포넌트 1개와 matrix 관리를 요구 | 실제 element 32개, docs 23개. 누락: `binary-pill-toggle`, `box`, `cluster`, `empty-state`, `grid`, `heading`, `page-header`, `skeleton`, `spacer`, `stack`, `stat-tile`, `surface`, `text`, `th` | CDD index 불완전 | BLOCKER |
| Stale docs 5개 | same | docs에는 `app-shell`, `bento-grid`, `entry-dialog`, `glass-surface`, `theme-toggle` 존재, element 폴더 없음 | docs 실체 불일치 | WARN |
| `binary-pill-toggle` CDD 페이지 부재 | [docs/llm/components/README.md:28](/Users/vero/workspace/beegy/verodesign/docs/llm/components/README.md:28) | 코드 존재: [vds-binary-pill-toggle.ts](/Users/vero/workspace/beegy/verodesign/packages/design-elements/src/components/binary-pill-toggle/vds-binary-pill-toggle.ts:9), [BinaryPillToggle.tsx](/Users/vero/workspace/beegy/verodesign/packages/design-react/src/components/BinaryPillToggle.tsx:6) | canonical page 없음 | BLOCKER |
| `compact-row` props drift | [compact-row.md:7](/Users/vero/workspace/beegy/verodesign/docs/llm/components/compact-row.md:7) | React props 추가: [CompactRow.tsx](/Users/vero/workspace/beegy/verodesign/packages/design-react/src/components/CompactRow.tsx:11), element props 추가: [vds-compact-row.ts](/Users/vero/workspace/beegy/verodesign/packages/design-elements/src/components/compact-row/vds-compact-row.ts:105) | 문서 미반영 | BLOCKER |
| `compact-row` a11y drift | [compact-row.md:16](/Users/vero/workspace/beegy/verodesign/docs/llm/components/compact-row.md:16) 는 `onClick` 시 button만 명시 | 실제는 link/div/button 3모드: [vds-compact-row.ts](/Users/vero/workspace/beegy/verodesign/packages/design-elements/src/components/compact-row/vds-compact-row.ts:117) | a11y 설명 불일치 | BLOCKER |
| `compact-row` token drift | [compact-row.md:19](/Users/vero/workspace/beegy/verodesign/docs/llm/components/compact-row.md:19) | 실제는 `bg-selected`, `bg-elevated-hover`, `state-disabled`, type roles 사용: [vds-compact-row.ts](/Users/vero/workspace/beegy/verodesign/packages/design-elements/src/components/compact-row/vds-compact-row.ts:44), [vds-compact-row.ts](/Users/vero/workspace/beegy/verodesign/packages/design-elements/src/components/compact-row/vds-compact-row.ts:84) | 문서 미반영 | WARN |

증거: 컴포넌트 32개 / docs 23개 비교 결과에서 `missing_docs=14`, `stale_docs=5`.

## G2. CDD ↔ 토큰 정합

| Drift | SSOT | 실재 | 판정 | Severity |
| --- | --- | --- | --- | --- |
| girok guide에 status token 안내 없음 | [girok.md:15](/Users/vero/workspace/beegy/verodesign/docs/llm/brands/girok.md:15) | girok theme는 `destructive/success/warning/info` 및 fg 보유: [girok-light.json](/Users/vero/workspace/beegy/verodesign/packages/design/tokens/themes/girok-light.json:44), [girok-dark.json](/Users/vero/workspace/beegy/verodesign/packages/design/tokens/themes/girok-dark.json:45) | Phase A 미반영 | BLOCKER |
| girok guide contrast snapshot 불일치 | [girok.md:29](/Users/vero/workspace/beegy/verodesign/docs/llm/brands/girok.md:29) | actual report light `15.11`, dark `14.37`: [contrast-report.json](/Users/vero/workspace/beegy/verodesign/packages/design/dist/data/contrast-report.json:513), [contrast-report.json](/Users/vero/workspace/beegy/verodesign/packages/design/dist/data/contrast-report.json:575) | snapshot stale | WARN |
| brand guide coverage 부족 | consumer table은 default/veronex/verobase/girok 다중 브랜드 전제 | `docs/llm/brands` 실제 파일은 `girok.md` 1개뿐 | per-brand guide 누락 | WARN |
| CHANGELOG에 Phase E2 누락 | [rules.md:69](/Users/vero/workspace/beegy/verodesign/.ai/rules.md:69) | [CHANGELOG.md:7](/Users/vero/workspace/beegy/verodesign/docs/llm/tokens/CHANGELOG.md:7) 에 Phase A/B만 있고 E2 컴포넌트/utility change 기록 없음 | doc drift | WARN |
| token architecture path drift | [tokens/architecture.md:11](/Users/vero/workspace/beegy/verodesign/docs/llm/tokens/architecture.md:11) 는 `tokens/...` 경로 기술 | 권위 경로는 skill이 `packages/design/tokens/...`로 고정: [brand-isolation.md:8](/Users/vero/workspace/beegy/verodesign/.add/skills/brand-isolation.md:8) | SSOT 경로 이행기 drift | WARN |
| semantic schema parity 주장 vs source 불일치 | [tokens/architecture.md:32](/Users/vero/workspace/beegy/verodesign/docs/llm/tokens/architecture.md:32), [tokens/architecture.md:165](/Users/vero/workspace/beegy/verodesign/docs/llm/tokens/architecture.md:165) | 다수 theme file에 status slots 없음. 예: [veronex-light.json](/Users/vero/workspace/beegy/verodesign/packages/design/tokens/themes/veronex-light.json:15), [verobase-light.json](/Users/vero/workspace/beegy/verodesign/packages/design/tokens/themes/verobase-light.json:15) | parity gate 실효성 의심 | BLOCKER |
| experimental token metadata `since: TBD` | [pattern-intake.md:61](/Users/vero/workspace/beegy/verodesign/.add/pattern-intake.md:61) | Phase B files 모두 `since: "TBD"`: [girok-finance.json](/Users/vero/workspace/beegy/verodesign/packages/design/tokens/experimental/girok-finance.json:5) | workflow 미충족 | WARN |
| experimental token이 canonical theme에 섞임 | [pattern-intake.md:126](/Users/vero/workspace/beegy/verodesign/.add/pattern-intake.md:126) | girok theme 내부에 `exp.girok.finance.*` 바인딩 존재: [girok-light.json](/Users/vero/workspace/beegy/verodesign/packages/design/tokens/themes/girok-light.json:80), [girok-dark.json](/Users/vero/workspace/beegy/verodesign/packages/design/tokens/themes/girok-dark.json:80) | experimental isolation drift | BLOCKER |

## G3. CDD ↔ Spec 정합

| Drift | SSOT | 실재 | 판정 | Severity |
| --- | --- | --- | --- | --- |
| Phase B spec acceptance와 구현 불일치 | [spec.md:148](/Users/vero/workspace/beegy/verodesign/.specs/verodesign/2026-05-20-girok-experimental-tokens/spec.md:148) | actual files `since: TBD`, canonical theme touched | spec-contract 불이행 | WARN |
| Phase B spec는 “canonical token unchanged” 명시 | [spec.md:154](/Users/vero/workspace/beegy/verodesign/.specs/verodesign/2026-05-20-girok-experimental-tokens/spec.md:154) | girok theme files modified | scope drift | WARN |
| Phase C pattern specs are component specs, but workflow is token-intake | [pattern-intake.md:7](/Users/vero/workspace/beegy/verodesign/.add/pattern-intake.md:7) | `binary-pill-toggle` spec itself says “Component API (drafted, not implemented)”: [spec.md:39](/Users/vero/workspace/beegy/verodesign/.specs/verodesign/2026-05-20-pattern-binary-pill-toggle/spec.md:39) | workflow overloading | WARN |
| Phase E2 proceeded without dedicated workflow | `.add/README.md` has no component-add workflow | E2 spec explicitly uses “일반 SDD + codex-delegate + skills”: [girok-components-v03/spec.md:3](/Users/vero/workspace/beegy/verodesign/.specs/verodesign/2026-05-20-girok-components-v03/spec.md:3) | process gap | INFO |
| 7 pattern specs meet template headings but not experimental-token output | [pattern-intake.md:82](/Users/vero/workspace/beegy/verodesign/.add/pattern-intake.md:82) | headings exist in all 7 specs, but several target components/utility rather than token files | formal compliance, semantic mismatch | INFO |

## G4. brand-isolation 검출

| 검출 | 결과 |
| --- | --- |
| theme 변경 로그 | `git log --name-only HEAD -- 'packages/design/tokens/themes/*.json'` 결과 girok 외 verobase/veronex/default 변경 이력 다수 존재. 이 자체는 repo history이며 현재 task 범위 위반 증거는 아님. |
| raw color | `raw_color_hits=0` |
| brand prefix direct ref | `brand_prefix_hits=0` |

판정:
- 현재 컴포넌트 소스는 skill 검출 3/4 기준 CLEAN.
- 다만 [brand-isolation.md:20](/Users/vero/workspace/beegy/verodesign/.add/skills/brand-isolation.md:20) 의 “core semantic 추가 시 전 브랜드 parity 강제”와 현재 theme source 상태는 충돌한다. 구조 리스크 1건.

## G5. token-ssot 검출

| 검출 | 결과 |
| --- | --- |
| raw font-size primitive | `raw_font_size_hits=0` |
| hardcoded dimension | `hardcoded_dimension_hits=0` |
| semantic role layer 존재 | `role_layer_files=1` with roles at [semantic/core.json:375](/Users/vero/workspace/beegy/verodesign/packages/design/tokens/semantic/core.json:375) |

판정:
- skill 검출 1-3 기준 현재 소스 CLEAN.
- `CompactRow`/`BinaryPillToggle` 모두 role token 사용: [vds-compact-row.ts](/Users/vero/workspace/beegy/verodesign/packages/design-elements/src/components/compact-row/vds-compact-row.ts:84), [vds-binary-pill-toggle.ts](/Users/vero/workspace/beegy/verodesign/packages/design-elements/src/components/binary-pill-toggle/vds-binary-pill-toggle.ts:197).

## G6. naming convention

| Drift | Evidence | Severity |
| --- | --- | --- |
| semantic docs still use `theme.status.*`, source uses root `theme.success`, `theme.warning` etc. | naming doc examples/status domain: [naming.md:33](/Users/vero/workspace/beegy/verodesign/docs/llm/tokens/naming.md:33), semantic source root keys: [semantic/core.json:184](/Users/vero/workspace/beegy/verodesign/packages/design/tokens/semantic/core.json:184) | BLOCKER |
| contrast doc uses `theme.primary.foreground`, `theme.destructive.foreground` but source is dashed `primary-fg`, `destructive-fg` | [contrast.md:38](/Users/vero/workspace/beegy/verodesign/docs/llm/tokens/contrast.md:38), source [semantic/core.json:154](/Users/vero/workspace/beegy/verodesign/packages/design/tokens/semantic/core.json:154) | BLOCKER |
| Phase B naming split `exp.girok.finance.*` vs `exp.girok.market.*` duplicates same concept | spec rationale admits aliasing: [girok-experimental-tokens/spec.md:50](/Users/vero/workspace/beegy/verodesign/.specs/verodesign/2026-05-20-girok-experimental-tokens/spec.md:50), implementation alias: [girok-finance.json:14](/Users/vero/workspace/beegy/verodesign/packages/design/tokens/experimental/girok-finance.json:14) | WARN |
| theme files embed `exp.girok.finance` under canonical theme root | naming rule says modes in file, semantic schema in theme, experimental stays under `exp.*`: [naming.md:49](/Users/vero/workspace/beegy/verodesign/docs/llm/tokens/naming.md:49) | [girok-light.json:80](/Users/vero/workspace/beegy/verodesign/packages/design/tokens/themes/girok-light.json:80) | WARN |

## G7. WCAG contrast

| Drift | SSOT | 실재 | Severity |
| --- | --- | --- | --- |
| policy requires AAA for primary/status surface pairs | [contrast.md:32](/Users/vero/workspace/beegy/verodesign/docs/llm/tokens/contrast.md:32) | report records many of those as `required: "AA"` only, incl. girok `primary-fg`, `success-fg`, `warning-fg`, `destructive-fg`, `info-fg`: [contrast-report.json:533](/Users/vero/workspace/beegy/verodesign/packages/design/dist/data/contrast-report.json:533) | BLOCKER |
| girok guide says minimum AA only for primary pair | [girok.md:55](/Users/vero/workspace/beegy/verodesign/docs/llm/brands/girok.md:55) | policy says brand primary emphasis AAA 7:1: [contrast.md:19](/Users/vero/workspace/beegy/verodesign/docs/llm/tokens/contrast.md:19) | BLOCKER |
| actual girok ratios include sub-AAA values that still pass due AA rule | light `primary-fg on primary = 6.95`, dark `destructive-fg on destructive = 4.51`: [contrast-report.json:533](/Users/vero/workspace/beegy/verodesign/packages/design/dist/data/contrast-report.json:533), [contrast-report.json:605](/Users/vero/workspace/beegy/verodesign/packages/design/dist/data/contrast-report.json:605) | if CDD AAA is authoritative, report validator is weaker than policy | BLOCKER |

## G8. brand status parity (system-wide)

| Theme file | Missing status slots | Severity |
| --- | --- | --- |
| `_template-light.json` | 10 missing (`success/success-fg/warning/.../neutral-fg`) | BLOCKER |
| `girok-light.json` | 4 missing (`error/error-fg/neutral/neutral-fg`) | BLOCKER |
| `girok-dark.json` | 5 missing (`warning-fg/error/error-fg/neutral/neutral-fg`) | BLOCKER |
| `veronex-light.json` | 10 missing | BLOCKER |
| `verobase-light.json` | 10 missing | BLOCKER |
| `verobase-dark.json` | 10 missing | BLOCKER |
| `verobase-admin-light.json` | 10 missing | BLOCKER |
| `verobase-admin-dark.json` | 10 missing | BLOCKER |

근거:
- semantic core defines all status slots: [semantic/core.json:184](/Users/vero/workspace/beegy/verodesign/packages/design/tokens/semantic/core.json:184)
- architecture says “Each theme provides values for the same semantic schema” and missing slot aborts build: [tokens/architecture.md:32](/Users/vero/workspace/beegy/verodesign/docs/llm/tokens/architecture.md:32), [tokens/architecture.md:165](/Users/vero/workspace/beegy/verodesign/docs/llm/tokens/architecture.md:165)
- actual light/dark theme files above omit many keys.

판정:
- “system-wide status parity 미완”은 의도적 미완이 아니라 CDD와 직접 충돌하는 source drift.

## G9. `.ai/` + `.add/` + skills 정합

| Drift | Evidence | Severity |
| --- | --- | --- |
| `.ai/rules.md` says all code/docs/commits MUST be English | [rules.md:7](/Users/vero/workspace/beegy/verodesign/.ai/rules.md:7) | CDD Layer 2/SDD에 한국어 다수. repo 운영 현실과 규칙 불일치 | WARN |
| `.ai/rules.md` scope boundary excludes React components | [rules.md:117](/Users/vero/workspace/beegy/verodesign/.ai/rules.md:117) | repo now has active `packages/design-react/src/components/*` and E2 changed them | WARN |
| `codex-delegate.md` decision matrix has no component add/modify row | [codex-delegate.md:22](/Users/vero/workspace/beegy/verodesign/.add/codex-delegate.md:22) | E2 had to use generic SDD | INFO |
| path SSOT split between old docs and skills | old docs `tokens/...`, skill says current authority `packages/design/tokens/...`: [brand-isolation.md:8](/Users/vero/workspace/beegy/verodesign/.add/skills/brand-isolation.md:8) | WARN |

## G10. `.add` workflow gap

전용 컴포넌트 신설/수정 workflow가 `.add/README.md`에 없습니다. 현재 목록은 token/theme/pattern/release/consumer/doc-sync 중심이고 component lifecycle 문서는 부재: [.add/README.md:21](/Users/vero/workspace/beegy/verodesign/.add/README.md:21).  
Phase E2 는 이를 우회해 “일반 SDD + codex-delegate + skills”로 집행했습니다: [girok-components-v03/spec.md:3](/Users/vero/workspace/beegy/verodesign/.specs/verodesign/2026-05-20-girok-components-v03/spec.md:3).

판정:
- 정책 위반으로 단정할 문구는 없음.
- 다만 component change를 pattern-intake/spec 조합으로 처리하게 만들어 workflow semantics가 흐려졌고, G1/G3 drift의 직접 원인입니다.
- Severity = INFO, but Phase X2에서 별도 workflow 신설 판단 필요.

## Drift 분류 (severity)

| drift | gate | severity | 시정 우선순위 |
| --- | --- | --- | --- |
| Component canonical docs 누락/오래된 index | G1 | BLOCKER | 1 |
| Theme semantic parity 붕괴 | G2/G8 | BLOCKER | 1 |
| Contrast policy vs validator/report 불일치 | G7 | BLOCKER | 1 |
| Experimental token isolation 붕괴 (`exp` in canonical theme) | G2/G6 | BLOCKER | 2 |
| Naming schema drift (`status.*` vs root status, `foreground` vs `-fg`) | G6 | BLOCKER | 2 |
| Brand guide / snapshot stale | G2 | WARN | 3 |
| Spec-contract drift (Phase B/C/E2 workflow mismatch) | G3/G10 | WARN | 3 |
| Path / language / scope rule stale | G9 | WARN | 3 |

## Recommendation

- Phase X2 진입 가능 = YES
- BLOCKER count = 12
- 우선순위 1
  - semantic/theme parity를 source 기준으로 먼저 재정의하거나 복구
- 우선순위 2
  - contrast policy, validator, brand guides의 requirement vocabulary를 하나로 통일
- 우선순위 3
  - component workflow와 component canonical docs 체계를 분리 신설
