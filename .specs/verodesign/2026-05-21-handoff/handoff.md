# Handoff — verodesign v1 정공법 시정 (Phase X1–X3 진행 + 잔여)

> Authored: 2026-05-21 | 다른 로컬 터미널에서 작업 이어가기 위한 인수인계 문서
> Owner: Claude (planner/감독) + Codex (실행)

## 큰 그림 (왜 verodesign 부터인가)

**최종 목표** = `app-girok` 의 design.txt (879 라인 UI 시안) 기반 **5탭 IA 마이그레이션** (가계부 / 투자 / 자산 / 부채 / 설정). 38 catalog unit (`app-girok/docs/design/units/`) 를 verodesign 신설 컴포넌트 + Phase A/B 토큰 + 기존 컴포넌트 조합으로 구현.

**선행 작업** (현재 진행 중) = **verodesign 자체의 누적 drift 시정 + 2026 BP 정합** (Phase X). 이유:
1. app-girok 작업 (Phase A/B/C/E2 등) 누적이 verodesign CDD/skill 정책과 일부 어긋남 (Phase X1 = BLOCKER 12)
2. verodesign 정책 자체가 2026 BP 와 일부 갱신 필요 (Phase X1-A = P1 4)
3. 정공법 = **verodesign 정합 회복 우선 → 깨끗한 base 에서 app-girok 마이그레이션**

**진행 흐름**:
```
[다음 단계] Phase F (app-girok 5탭 마이그레이션) — 재개 준비됨
            ↑
[완료] Phase X (verodesign 정공법 시정) — 2026-05-21 X4 PASS-WITH-NOTES
  ├─ X1 ✅ drift audit (BLOCKER 12 / WARN 3 / INFO 1)
  ├─ X1-A ✅ 2026 BP audit (10 영역 / P1 4)
  ├─ X2 ✅ master plan + 6 SDD outline
  ├─ X3 ✅
  │   ├─ R1 ✅ X2-1 slot group + X2-4 component workflow
  │   ├─ R2 ✅ X2-2 naming migration + X2-3 contrast policy v2
  │   ├─ R3 ✅ X2-5 (CEM-backed docs + 부록 A/B) + X2-6 (experimental isolation)
  │   └─ R4 ✅ X4 FAIL 항목 4 카테고리 근본수정 + girok aaa-strict opt-in
  │           + build-time optional-group fallback emission
  └─ X4 ✅ PASS-WITH-NOTES (잔여 INFO: G10 path stale, P2 SSR wording)
```

**브랜드 확장성 전제**: brand 1000 환경 가정. 컴포넌트 = brand-agnostic (canonical 토큰만), brand 시각 = theme binding 으로만 표현.

## 현재 진행 단계

**Phase X 완료 (2026-05-21)**. X4 final audit verdict = PASS-WITH-NOTES. 잔여 INFO 2건(G10 path/language stale, P2 SSR wording)은 별 작업으로 분리.

**다음 단계**: Phase F (app-girok 5탭 마이그레이션) 재개. 자세한 시작점은 §7 참조.

## 전체 흐름 요약

```
Phase X1 (drift audit) ✅ → Phase X1-A (정책 2026 BP 검증) ✅ →
Phase X2 (master plan + 6 SDD outline) ✅ →
Phase X3 (실행) — Round 1 ✅, Round 2 PASS-WITH-NOTES (G1 false positive), Round 3 진행 중 →
Phase X4 (final audit) — 대기 →
Phase F (app-girok 마이그레이션) — 보류
```

## 1. Phase X 산출물 위치

### Audit & plan

| 문서 | 경로 |
|---|---|
| X1 drift audit finding | `.specs/verodesign/2026-05-21-verodesign-drift-audit/finding.md` |
| X1-A policy 2026 BP audit | `.specs/verodesign/2026-05-21-verodesign-drift-audit/policy-best-practice-audit.md` |
| X1+X1-A 통합 X2 input | `.specs/verodesign/2026-05-21-verodesign-drift-audit/x2-input.md` |
| X2 master plan | `.specs/verodesign/2026-05-21-verodesign-drift-audit/x2-master-plan.md` |
| trend snapshot 2026 Q2 | `docs/llm/research/trend-snapshot.md` (append) |

### 6 SDD outline (X2)

| SDD | 경로 | 상태 |
|---|---|---|
| X2-1 Slot group reorganization | `.specs/verodesign/2026-05-21-slot-group-reorganization/spec.md` | 실행 완료 (R1 PASS) |
| X2-2 DTCG naming migration | `.specs/verodesign/2026-05-21-dtcg-naming-migration/spec.md` | 실행 완료 (R2 PASS-with-notes after cleanup) |
| X2-3 Contrast policy v2 | `.specs/verodesign/2026-05-21-contrast-policy-v2/spec.md` | 실행 완료 (R2) |
| X2-4 Component workflow | `.specs/verodesign/2026-05-21-component-workflow/spec.md` | 실행 완료 (R1 PASS) |
| X2-5 CEM-backed docs | `.specs/verodesign/2026-05-21-cem-backed-docs/spec.md` | **R3 진행 중 (background)** |
| X2-6 Experimental isolation | `.specs/verodesign/2026-05-21-experimental-isolation-fix/spec.md` | **R3 진행 중 (background)** |

## 2. Background Codex 작업 (인수인계 시점)

| Task ID | 작업 | output 파일 |
|---|---|---|
| `bwrtg64i3` | X2-5 CEM-backed canonical docs | ⚠️ 부분 완료 — §13 참조, redo 필요 |
| `b903ilwvf` | X2-6 experimental isolation | ✅ 완료 — §5 결과 인용 |

위 task 둘 다 완료. **X2-5 redo (§13) 진행 → R3 audit** 위임.

## 3. R3 audit 명령 (다음 단계)

R3 두 작업 완료 후 다음 명령:

```bash
# R3 audit prompt 작성 (또는 /tmp/codex-x3-r3-audit.txt 신설)
# 검수 대상:
#   - X2-5: CEM analyzer 정합, components/*.md prose-only 재구조, Capability Matrix auto-gen, 누락 페이지 신설
#   - X2-6: girok-{light,dark}.json 안 exp.* 잔존 0, experimental file split, brand-isolation skill 검출 패턴 추가, naming.md 규칙 추가

cat /tmp/codex-x3-r3-audit.txt | codex exec \
  -C /Users/vero/workspace/beegy/verodesign \
  -s read-only --skip-git-repo-check - < /dev/null 2>&1 | tail -200 &
```

audit verdict PASS면 **X4 final audit** (전 chain 통합 검증) 위임.

## 4. R1 + R2 결과 요약

### Round 1 (X2-1 + X2-4)

- **X2-1 slot group**: status / finance 신설 active optional-implements group. 11 theme 모두 implements 명시. validator group-aware. core.json 에서 status/destructive 분리.
- **X2-4 component workflow**: `.add/component-{add,modify,deprecate}.md` 신설. codex-delegate Decision Matrix 갱신. retroactive Phase E2 검증 메모 추가.
- **Audit verdict**: PASS

### Round 2 (X2-2 + X2-3)

- **X2-2 DTCG naming migration**: source token / 컴포넌트 var() / dist CSS 모두 dot-path. `@verobee/codemods` v1.0.0 패키지 신설 (`migrate-naming-2026-05`). `docs/llm/migrations/v0-to-v1.md` 신규 작성 + 기존 package split 내용 `v0-to-v1-package-split.md` 분리.
- **X2-3 contrast policy v2**: WCAG 2.2 baseline. AA 4.5:1 baseline + AAA 7:1 optional `aaa-strict` group. `tokens/semantic/aaa-strict.json` 신설 (10+ strong slot). validator group/tier-aware (`packages/design/src/audit/contrast.mjs`).
- **Audit verdict**: 1차 FAIL → cleanup → PASS-with-notes
  - G1 33건 = false positive (정상 nested DTCG key)
  - G2 codemods 디렉터리 vs 파일 구조 = README.md 만 잔존 (entry .ts 외부)
  - G3 rename 표 = 정확한 token string 매핑 9 row 추가 완료

## 5. R3 (현재) 작업 내용

### X2-5 — CEM-backed component canonical docs (`bwrtg64i3`)

- CEM analyzer 검증 + API table generator script
- `docs/llm/components/*.md` prose-only 재구조 (16+ 페이지)
- 누락 페이지 신설 (icon-button / heading / stack / cluster / grid / spacer / surface / page-header / skeleton / stat-tile / box / empty-state / th / **binary-pill-toggle (Phase E2 신설)**)
- `compact-row.md` Phase E2 Lit promote 반영
- `components/README.md` Capability Matrix auto-gen
- `dev-best-practices.md` + `decisions.md` CEM-backed 정책 명시

### X2-6 — Experimental token isolation (`b903ilwvf`)

- `girok-{light,dark}.json` 안 `exp.girok.finance.*` 잔존 제거
- experimental mode split: `tokens/experimental/girok-finance{,-light,-dark}.json`
- `.add/skills/brand-isolation.md` 검출 패턴 추가 (`rg '"exp"' tokens/themes/*.json` = 0)
- `naming.md` "Experimental MUST live under tokens/experimental/" 규칙 추가
- visual outcome 보존 (CSS variable 산출 동일)

## 6. X4 final audit (R3 이후 단계)

전 chain 통합 검증:
- 모든 X1 BLOCKER (12) + X1-A P1 (4) 해소 확인
- brand-isolation 검출 1-4 + token-ssot 검출 1-3 모두 0
- WCAG contrast (AA baseline + AAA-strict optional) 정합
- CEM auto-gen + component canonical docs 정합
- experimental isolation 정합
- migration codemod 작동 확인

audit prompt: 별 작성 또는 X1 audit prompt 재사용 + 갱신.

PASS면 **Phase X 종료** + Phase F (app-girok 마이그레이션) 재개.

## 7. Phase F (보류)

`app-girok` 5탭 마이그레이션. Phase F1 (verodesign dist resync to app-girok) 완료. F2 시작 전 결정 항목 (이전 발견, 기록 보존):
- dirty 99 파일 (브랜치 `feat/stock-goal-suite-2026`) commit/stash/discard 결정
- wrong-direction 4 파일 untracked (`InvestPage.tsx` / `AssetsPage.tsx` / `DebtPage.tsx` / `AppIcon.tsx`) 삭제 결정
- L1 IA 5탭 (가계부/투자/자산/부채/설정) 라우팅 변경
- 38 catalog unit → consumer composition + 신설 컴포넌트 (BinaryPillToggle / CompactRow Lit / scrollbar-hide utility) + Phase A/B 토큰 사용

자세한 catalog: `app-girok/docs/design/units/INDEX.md`.

## 8. 작업 환경 / 도구

### Codex exec 형식

```bash
cat /tmp/<prompt-file>.txt | codex exec \
  -C /Users/vero/workspace/beegy/verodesign \
  -s workspace-write --skip-git-repo-check - < /dev/null 2>&1 | tail -200 &
```

read-only audit 는 `-s read-only`. `--add-dir <path>` 로 추가 read 영역 허용 (예: app-girok read 필요시).

### verodesign dist resync to consumer (Phase F1 영역, 재진행시)

`memory feedback pnpm-file-dep-multi-instance-trap`:
- consumer (app-girok 등) node_modules 의 모든 `@verobee+pkg@hash` 인스턴스 갱신
- `pwd -P` 기준 실제 resolve 경로 확인
- `.vite` cache 클리어

명령 예시는 이전 F1 prompt (`bt7nf8u3m`) 참고.

### 자가검증 / audit 정신

- 자가선언 불인정 — 모든 검증은 stdout 인용 (line count, grep 결과)
- 별 Codex 세션 read-only audit 가 정공법 (자가 PASS 가 아닌 cross-validation)
- audit prompt 의 grep 패턴이 false positive 가능 — 33건 같은 case 는 정상 nested 인지 cross-check

## 9. 정공법 결정 사항 (잊지 말 것)

사용자가 명시한 정공법 6 결정 (Phase X2 master plan 기반):

1. **Slot group 세분화** — core (parity 강제) + status (optional implements) + finance (optional) + future
2. **AA baseline + AAA optional slot 분리** — `*-strong` slot + `aaa-strict` group
3. **CEM-backed component docs** — 수기 markdown → prose + CEM auto-gen
4. **Component workflow 신설** — `.add/component-{add,modify,deprecate}.md`
5. **DTCG naming source migration** — `theme.success-fg` → `theme.status.success.foreground`, codemod 신설
6. **Brand manifest registry v2** — **별 roadmap, 본 v1 시정에 포함 X**

브랜드 1000 확장성 고려 — 컴포넌트는 brand-agnostic, brand 시각은 theme binding 으로만.

## 10. Task 상태 (2026-05-21 종료 시점)

```
#20. [completed] Phase F1 — verodesign dist resync to app-girok
#21. [pending]   Phase F2 — app-girok 5 탭 마이그레이션
#22. [pending]   Phase F3 — 전체 마이그레이션 audit
#23. [completed] Phase X1 — verodesign 전수 audit (drift 식별)
#24. [completed] Phase X2 — drift 분류 + 시정 plan
#25. [completed] Phase X3 — 시정 실행 (R1–R4 모두 완료)
#26. [completed] Phase X4 — 정합 회복 audit (PASS-WITH-NOTES)
#27. [completed] Phase X1-A — 정책 2026 best practice 검증
```

Phase X 종료. 다음 turn = Phase F 재개.

## 13. X2-5 잔여 작업 (가장 우선 — 다음 터미널 첫 작업)

X2-5 (`bwrtg64i3`) 부분 완료. **redo 필요**.

### 완료된 부분 (X2-5 1차)

- API generator script 신설: `packages/design-elements/scripts/generate-component-api.mjs`
- 일부 신설 페이지: `app-shell.md`, `bento-grid.md`, `entry-dialog.md`, `glass-surface.md`, `icon-button.md`, `theme-toggle.md`
- `components/README.md`, `theme-toggle.md` 갱신
- design-elements src 일부 수정 (badge/button/checkbox/stat-tile/text/toast) — **의도 확인 필요** (redo 시 검토)

### 잔여 작업

| # | 작업 | 상태 |
|---|---|---|
| 1 | `docs/llm/components/binary-pill-toggle.md` 신설 (Phase E2 신설 컴포넌트, APG Radio Group prose) | 부재 |
| 2 | 누락 페이지 신설: `heading.md`, `stack.md`, `cluster.md`, `grid.md`, `spacer.md`, `surface.md`, `page-header.md`, `skeleton.md`, `stat-tile.md`, `box.md`, `empty-state.md`, `th.md` (현재 design-elements src 에 존재하지만 docs 부재) | 다수 부재 |
| 3 | 모든 페이지에 `<!-- CEM:START --> ... <!-- CEM:END -->` marker 적용 (prose-only + auto-gen API table 구조) | 적용 안 됨 |
| 4 | `components/README.md` Capability Matrix `<!-- CAPABILITY:START --> ... <!-- CAPABILITY:END -->` marker auto-gen 적용 | 확인 필요 |
| 5 | `dev-best-practices.md` + `decisions.md` 의 "Component canonical docs: prose + CEM-backed API" 정책 명시 | 확인 필요 |
| 6 | design-elements src 변경 (badge/button/checkbox/stat-tile/text/toast) 의도 검토 — 의도된 변경이면 보존, 의도 외 mutation 이면 revert | 검토 필요 |

### Redo 명령 (prompt 사전 작성됨)

```bash
# X2-5 redo (잔여 6 작업)
cat .specs/verodesign/2026-05-21-handoff/codex-prompts/x3-r3-x2-5-redo.txt | codex exec \
  -C /Users/vero/workspace/beegy/verodesign \
  -s workspace-write --skip-git-repo-check - < /dev/null 2>&1 | tail -200 &

# 완료 후 R3 audit
cat .specs/verodesign/2026-05-21-handoff/codex-prompts/x3-r3-audit.txt | codex exec \
  -C /Users/vero/workspace/beegy/verodesign \
  -s read-only --skip-git-repo-check - < /dev/null 2>&1 | tail -200 &

# R3 audit PASS 후 X4 final audit
cat .specs/verodesign/2026-05-21-handoff/codex-prompts/x4-final-audit.txt | codex exec \
  -C /Users/vero/workspace/beegy/verodesign \
  -s read-only --skip-git-repo-check - < /dev/null 2>&1 | tail -200 &
```

3 prompt 모두 `.specs/verodesign/2026-05-21-handoff/codex-prompts/` 에 사전 작성됨.

Redo 후 자가검증:
```sh
ls docs/llm/components/binary-pill-toggle.md docs/llm/components/heading.md  # 신설 페이지
rg -l "<!-- CEM:START -->" docs/llm/components/*.md | wc -l  # marker 적용 페이지 수
rg "<!-- CAPABILITY:START -->" docs/llm/components/README.md  # Matrix auto-gen
```

## 11. 알려진 보강 권고

R2 cleanup 보고서에서 명시:
- `packages/showcase` CSS minify warning (shadow token 직렬화) — 본 작업 범위 외, 후속 점검
- codemods `transforms/v0-to-v1/` 디렉터리에 entry .ts 가 외부 (README.md 만 디렉터리) — 향후 transforms 가 늘어나면 디렉터리 안으로 entry 이동 권장

X4 PASS-WITH-NOTES 잔여 INFO (별 작업으로 처리):
- **G10 path/language/scope rule stale** — 운영 규칙 문서 정리 이슈, 별 doc-sync 라운드
- **P2 SSR maturity wording** — DSD mainstream + Lit SSR Labs 명시, 별 policy refresh 라운드
- **theme 11 파일 git diff** — X2-2 dot-path migration + Cat 1 implements trim + Cat 2 accent-N migration + aaa-strict opt-in + fallback emission 으로 인한 정상 diff. baseline commit 기준 변경셋 분리 검토 권고

X3 R4 부산물:
- `packages/design/src/build/optional-group-fallback.mjs` — build-time fallback emission 모듈 (status / destructive — finance / aaa-strict 도 동일 패턴으로 추후 확장 가능)
- `packages/design/src/audit/contrast.mjs` — CSS var alias 재귀 해석 (`resolveCssVarAlias()`) — validator 가 build-emit fallback 을 인식

## 12. 위치 인덱스 (빠른 참조)

```
.specs/verodesign/
├── 2026-05-20-* (Phase A/B/C/E2 + audit 결과 — 보존)
├── 2026-05-21-verodesign-drift-audit/   ← X1 + X1-A 결과
├── 2026-05-21-slot-group-reorganization/  ← X2-1
├── 2026-05-21-dtcg-naming-migration/      ← X2-2
├── 2026-05-21-contrast-policy-v2/         ← X2-3
├── 2026-05-21-component-workflow/         ← X2-4
├── 2026-05-21-cem-backed-docs/            ← X2-5
├── 2026-05-21-experimental-isolation-fix/ ← X2-6
└── 2026-05-21-handoff/handoff.md          ← 본 문서

packages/codemods/                       ← X2-2 신설 (v1.0.0)
packages/design/tokens/semantic/
├── core.json (X2-1 status/destructive 분리)
├── status.json (신설, X2-1)
├── finance.json (신설, X2-1)
├── aaa-strict.json (신설, X2-3)
└── web.json

docs/llm/migrations/
├── v0-to-v1.md (X2-2 naming migration)
└── v0-to-v1-package-split.md (이전 내용 보존)

.add/
├── component-add.md (X2-4 신설)
├── component-modify.md (X2-4)
├── component-deprecate.md (X2-4)
└── [기존 워크플로우 — codex-delegate Matrix X2-4 갱신]
```
