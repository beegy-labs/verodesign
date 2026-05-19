# Refactoring — 2026 Canonical (START HERE)

> **모든 향후 리팩토링은 이 문서에서 시작한다.** (LLM-agnostic — 실행
> 주체 무관) 정책 SSOT = `docs/llm/decisions.md` +
> `.specs/verodesign/2026-05-06-greenfield-architecture.md`. 기계적 강제 =
> [`skills/`](skills/README.md). 성능/사이즈 워크플로 =
> [`optimize-2026.md`](optimize-2026.md). 소비자 영향 =
> [`consumer-update.md`](consumer-update.md). 위임 계약 =
> [`codex-delegate.md`](codex-delegate.md). 이 문서는 그 위에 2026
> 베스트프랙티스 합성과 프로그램 결정을 얹는 진입점·체크리스트다.

## 0. 프로그램 결정 (2026-05-19, 사용자 확정)

- 자동화 게이트 = **문서 + 수동 실행만**, 검출 도구 로컬 실행, **CI 강제
  없음**.
- 라운드 1(2026-05-19) = canonical `.add` 정비 + Knip 셋업 +
  **베이스라인 리포트까지**.
- **라운드 2(2026-05-20, 사용자 승인): 실제 코드/토큰 리팩토링 실행
  승인.** 게이트 배치(B1 데드코드 → B2 토큰 SSOT/중복·미사용 →
  B3 공통화/중복 → B4 순수성·O(1)·간결화). 배치마다 3게이트 + 스냅샷
  footprint + Knip/build/typecheck 델타 악화 0 + brand-isolation/
  token-ssot 준수. **2회 연속 미발견 시 종료.** 베스트프랙티스 SSOT =
  CDD [`docs/llm/dev-best-practices.md`](../docs/llm/dev-best-practices.md)
  + 본 문서 §5(수동 canon, 재검색 금지).
- semantic·타 브랜드 theme 영향 건은 사용자 비준 필수(skills/README 3
  게이트 그대로).
- 본 레포 변경은 소비자(app-girok 등 `file:` 의존) 영향 → 변경 시
  [`consumer-update.md`](consumer-update.md) 절차 동반.

## 1. 리팩토링 진입 절차

1. 이 문서 → `docs/llm/decisions.md` → 해당 [`skills/*`](skills/README.md).
2. 검출 도구(§3) 실행, 베이스라인 대비 신규 위반 0.
3. 3 게이트(구현 자가점검 → 신선한 눈 → 승인). 자가선언 불인정.
4. 변경은 SSOT 한 곳. raw 값 금지(토큰만). brand X 변경 → brand Y zero
   diff([`skills/brand-isolation.md`](skills/brand-isolation.md)).

## 2. 2026 베스트프랙티스 합성 (웹조사 → 본 레포 적용)

| 영역 | 2026 기준 | 적용 (근거) |
|---|---|---|
| 데드코드/미사용 | **Knip** 모노레포 표준 — workspace/TS project refs 인식, production 모드 | 미사용 file/export/dep 1차 스윕. `deprecate.md`/`pattern-deprecate.md` 의 제거 판단 입력으로 |
| 토큰 3-tier | primitive→semantic→component, semantic(의미역할) 우선, theme=직교 바인딩 | [`skills/token-ssot.md`](skills/token-ssot.md) — 이미 정책. raw primitive 산발 선택 금지 |
| 브랜드 격리 | semantic 슬롯 1곳, 브랜드 무관 역할 | [`skills/brand-isolation.md`](skills/brand-isolation.md) |
| Lit 컴포넌트 | `static styles` + CSS 가 스타일 SSOT, Style Dictionary 가 토큰→CSS 변환(JS 토큰 산발 금지) | 컴포넌트는 `var(--vds-*)` 소비만, raw hex 금지(2026-05-19 scrim 토큰화가 실증) |
| public API/중복 | 패키지 export 표면 최소, 중복 로직 합치기 | knip unused export + 수동 검수 |
| 사이즈/런타임 | `@property inherits:false`, `@layer`, `light-dark()`, brotli | [`optimize-2026.md`](optimize-2026.md) 페이즈 플랜 |

출처: Knip(knip.dev) · 디자인토큰 계층/Lit(philparsons bundling-lit-design-tokens,
USWDS design-tokens, contentful design-token-system) · 디자인시스템 2026
(designsystems.surf).

## 3. 검출 도구 (로컬 — CI 강제 없음)

```sh
pnpm refactor:knip          # 미사용 file/export/dep (모노레포 전체)
pnpm -r exec tsc --noEmit   # 타입
pnpm build                  # dist 산출
# 토큰/브랜드/대비: skills 의 검출 명령 + contrast-audit.md
```

Knip 은 skills 검출을 대체하지 않는다 — 토큰/브랜드 SSOT 는 스킬이 권위,
Knip 은 데드코드/미사용 export·dep 자동 스윕만.

## 4. 후속 평가 항목 (지금 도입 안 함)

- 데드코드/경계 CI 게이트화. 현재 로컬·수동.
- ~~실제 토큰/컴포넌트 리팩토링 — 별도 승인 후~~ → **승인됨
  (2026-05-20). §0 라운드2, §5 canon, §6 배치.**
- 소비자 일괄 마이그레이션은 [`consumer-update.md`](consumer-update.md) 로.

## 5. 베스트프랙티스 canon (2026-05-20 · 수동 SSOT · 재검색 금지)

> 상세 SSOT = CDD [`docs/llm/dev-best-practices.md`](../docs/llm/dev-best-practices.md).
> 본 표는 진입 체크용 요약. 갱신은 사용자 승인 후 수동만.

| 영역 | canon 규칙 |
|---|---|
| 순수성 | 컴포넌트/훅 순수·idempotent, 렌더 중 부수효과·비지역 mutation 0. 애니/포커스/observer = effect+cleanup(Dialog `entered` rAF 패턴). |
| 토큰 SSOT/최적화 | primitive→semantic→component, semantic 우선. 동일 의미 중복 토큰 합치기. 미사용 토큰=deprecate(`.add/deprecate.md`, cross-brand 확인). raw 0. |
| additive API | 신규 prop 기본=기존동작, 소비자 회귀 0. 소비자가 못 덮을 지오메트리는 spread 순서로 우선. |
| 간결화 | TS 유틸타입으로 중복 타입 제거, 조기 return, 추측 추상화 금지, 2+중복만 추출(단일소비=콜로케이트, `_internal`). |
| 데드코드 | Knip(production) 베이스라인 대비 미사용 file/export/dep 제거, 잔존=사유. |
| 불변식 | Knip/build/typecheck 델타 악화 0, 동작·시각 회귀 0, 토큰/색 무변경, **cross-brand zero diff**, 커밋은 소스+의도 dist만(design-pkg/typography/build-script 드리프트 0). |

## 6. 라운드2 실행 배치 (게이트별 로그)

- B1 데드코드: 베이스라인(`refactor-2026-baseline.md`) — 패키지별
  unused dep 위주(cli2/codemods1/design1/showcase6/theme2x3/util1),
  파일/export 0. Tauri 무관, 빌드툴·소비자 영향 판별 후 보수적 제거.
- B2 토큰 SSOT/중복·미사용 토큰. B3 공통화/중복. B4 순수성·O(1)·간결화.
- 각 배치 = `.specs` + 3게이트 + 스냅샷 footprint + 델타 0 +
  brand-isolation/token-ssot. **2회 연속 미발견 시 종료.** 완료 1줄 로그.
