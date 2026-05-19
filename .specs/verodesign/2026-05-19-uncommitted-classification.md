# 미커밋 변경 분류 리포트 — verodesign

> 생성: 2026-05-19 (Claude planner). HEAD=`4d987fd`.
> 방법: 경로를 세션 ②(scrim)·⑨(knip) 산출과 교차대조.

## A. 세션 작업 (커밋 대상)

**② Dialog scrim 토큰화**
- `packages/design/tokens/semantic/core.json` — `theme.scrim` 신설
- `packages/spec/tokens/semantic/core.json` — spec 스키마 동기화
- `packages/design/tokens/themes/girok-dark.json` · `girok-light.json` — scrim 오버라이드
- `packages/design-elements/src/components/dialog/vds-dialog.ts` — `var(--vds-theme-scrim)` 소비(폴백 유지)

**⑨ Knip 인프라/문서**
- `.add/refactor-2026.md`(신규) · `.add/README.md`(진입점 링크)
- `.add/refactor-2026-baseline.md`(신규) · `knip.json`(신규)
- `package.json` · `pnpm-lock.yaml` — knip devDep+스크립트
- `.specs/verodesign/2026-05-19-knip-baseline-setup.md`(신규)

## B. 세션 이전 드리프트 (커밋 분리/검토 필요)
- `packages/design/src/build/emit-theme.mjs`
- `packages/design/src/build/loader.mjs`
- `packages/design/tokens/primitive/typography.json`

(② scrim 은 semantic/core + themes/girok + vds-dialog 만 건드림. 위
빌드 스크립트·typography primitive 는 세션 범위 밖 = 이전 드리프트.)

## C. 생성물 (dist — 정책 결정)
- `packages/**/dist/**` 62개 = ② scrim 재빌드 + ⑨ `pnpm build` 부수효과로
  재생성. 소스 아님. verodesign 이 dist 를 커밋하는 레포면 A 와 함께,
  아니면 제외(레포 관례 따름 — 사용자 확인).

## 권장 커밋 계획 (사용자 확인 후)
1. A 를 2 커밋: (i) ② scrim 토큰(semantic/spec/themes/vds-dialog +
   필요한 dist), (ii) ⑨ knip 인프라/문서.
2. semantic `core.json` 변경은 코어 영향 → skills/README 3 게이트상
   **사용자 비준** 대상(기본값은 기존 룩 동일 `oklch(0% 0 0/.5)`이라
   타 브랜드 zero diff — 비준 근거 명시).
3. B(빌드 스크립트·typography) 는 **커밋하지 않음** — 출처 확인 요청.
4. dist 커밋 여부 = verodesign 레포 관례 확인 후 결정.
5. AI 공동저자 표기 금지. SemVer 영향: `theme.scrim` 신규 semantic
   = Added(minor 후보) — `feedback semver-intentional` 따라 판단.
