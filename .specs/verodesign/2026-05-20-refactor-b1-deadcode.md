# Scope — 라운드2 B1(verodesign): 데드코드 (보수적, cross-brand zero diff)

> canon: `.add/refactor-2026.md` §5·§6, CDD `docs/llm/dev-best-practices.md`.
> Knip 현재: unused files 1, unused deps 9. **맹목 삭제 금지** — 후보별
> 판별표(DEAD/USED/DEFER+근거). 스냅샷 `/tmp/bdrift-snap/vero-pre-b1.tgz`.

## 절대 규칙

- 후보마다 판별: grep 참조(동적·배럴·소비자 file: 포함)·빌드툴·
  번들 진입·테스트 참조 확인. **DEAD 증명만 제거.** 애매=DEFER.
- **package.json deps 9건**: 다수가 cli/codemods/showcase/theme 빌드·
  데모 패키지. 빌드/스크립트/피어 경유 사용 가능 → 런타임·빌드
  미사용 **확증 시에만** 제거. 확증 못하면 DEFER(삭제 금지).
- **unused file 1건**: 전 packages grep + 배럴/엔트리/번들 확인.
  참조 0 증명 시에만 삭제.
- 토큰/테마/`design-pkg dist`/typography/build-script **미접촉**
  (레포 기존 드리프트 보존). 소스/의도 dist만.

## 제약
- 색/토큰/테마/컴포넌트 동작 불변. **cross-brand zero diff**
  (brand-isolation). 소비자(app-girok file:) 영향 시
  `consumer-update.md` 절차 — 본 배치는 소비자 영향 0 인 것만.
- Knip/build/typecheck **델타 악화 0**. 발견 없으면 "변경 없음" 명시.

## 검증
- 판별표 전체 응답 포함.
- `pnpm refactor:knip`(개선분만, 신규 0), 영향 패키지 build/타입체크 pass.
- 스냅샷 대비: 삭제가 DEAD 증명 한정, 토큰/테마/dist 드리프트 0.

## 응답(≤400토큰)
- 후보 판별표(DEAD/USED/DEFER+근거)
- 실제 삭제 목록 + 보존/DEFER 사유
- Knip 델타(before→after, 악화 0) + build/typecheck
- cross-brand zero diff 근거 + 스냅샷 footprint + 범위 일탈
