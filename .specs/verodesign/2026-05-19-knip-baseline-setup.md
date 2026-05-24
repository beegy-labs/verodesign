# Scope — Knip 셋업 + 베이스라인 리포트 (verodesign, 코드/토큰 수정 0)

> 근거: `.add/refactor-2026.md` §3. 라운드 1 = 도구+리포트만. 실제
> 토큰/컴포넌트 리팩토링은 후속 별도 승인. CI 강제 없음.

## 변경 (도구/설정/문서만 — tokens·themes·컴포넌트·dist 변경 절대 금지)

1. `knip` devDependency 추가(pnpm, 버전 핀). 루트 레벨.
2. `knip.json` — pnpm **workspace 모노레포** + TS project refs 인식:
   - workspaces: `packages/*`. 각 패키지 entry(빌드 스크립트/빌드
     엔트리/테스트) 인식. Style Dictionary/build 스크립트 엔트리 포함.
   - ignore: `**/dist`, 생성물, 토큰 JSON(데이터지 코드 아님).
   - production 모드 옵션.
3. 루트 `package.json` `"refactor:knip": "knip"` (+ `:prod`).
4. 베이스라인 리포트 `.add/refactor-2026-baseline.md` — 패키지별 unused
   files/exports/deps **요약 수치만** + 날짜 + knip 버전 + `pnpm build`
   pass 여부 + "후속 우선순위 후보"(수치 기반).

## 제약

- **tokens/themes/컴포넌트/dist/소스 변경 0.** knip 미사용 검출해도
  제거 금지(리포트만). 브랜드/semantic/대비 무관.
- CI 워크플로 추가 금지. app-girok 손대지 않음.
- 기존 빌드/스킬 검출 회귀 0.

## 검증

- `pnpm install` 후 `pnpm refactor:knip` 산출(에러 없이).
- `pnpm build` 여전히 pass(도구 추가가 dist/빌드 안 깨뜨림).
- `.add/refactor-2026-baseline.md` 존재 + 수치. tokens/themes/packages
  src diff 0(레포 기존 미커밋 드리프트는 건드리지 말 것).

## 응답(≤400토큰)

- 추가 파일/스크립트, knip 버전
- 패키지별 요약 수치
- build pass 여부
- 소스/토큰 변경 0 확인
- 범위 일탈 항목
