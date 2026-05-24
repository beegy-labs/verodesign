# 2026-05-15 — girok brand canonical 승격

> girok(기록) 앱의 CI/BI 합의안을 기반으로 verodesign 내 girok theme/brand를
> **정식(canonical)** 으로 승격한다. (값 변경 없음 — Phase A13 OKLCH 유지)

## Intent

- girok를 “자기계발 기록 + 공유” 제품군의 대표 브랜드로 정의한다.
- 기존 `girok-light` / `girok-dark` 테마 토큰을 experimental이 아닌 **canonical**
  브랜드 자산으로 취급한다.
- 2개 이상의 consumer에서 재사용 가능한 “브랜드/톤/타이포/워드마크 규칙”을
  문서화한다(에셋 생성은 scope 외).

## CI/BI (합의안)

- Mission: **“기록이 자산이 된다 — 나의 성장을 기록하고 나눈다”**
- Concept: **디지털 서재**(warm wood library)
  - 키워드: 축적 · 신뢰 · 따뜻함 · 절제
- Color role:
  - Base: warm neutral (ivory / warm charcoal)
  - Accent: brass/cognac (절제된 1점)
  - Surface hierarchy: `bg.page < bg.card < bg.elevated` 명확한 계층
- Logotype(가이드만):
  - 소문자 워드마크 `girok`
  - brass accent는 1점(예: dot, underline, 한 글자만)으로 제한
- Typography(가이드만):
  - 본문: sans
  - 강조: serif (제목/키워드/브랜드 강조 일부)
- Tone/Voice:
  - 진중 · 따뜻 · 담백
  - 일본 미니멀 감성(과장/이모지/과도한 수식어 지양)

## Promotion rationale

- Consumer 1: girok 앱(현재 repo: `dreamstock/`) — Phase A5~A13 실사용/검증
  과정에서 girok theme가 UI 전반에 사용됨.
- Consumer 2(예정): 가계부/운동 등 확장 모듈에서도 동일 테마를 사용 예정.
- Phase A13에서 contrast audit를 통과했고, surface 계층/대비 기준을 만족함.

## Token mapping (키 구조 불변)

승격 대상:
- `packages/design/tokens/themes/girok-light.json`
- `packages/design/tokens/themes/girok-dark.json`

승격 방법:
- 값(OKLCH) **변경 없음**
- 존재 시: `$extensions.verobee.status` 를 `canonical` 로 설정
  - 키 구조는 그대로 유지(새 슬롯/새 키 추가 금지)

## Non-goals

- 다른 brand(default/verobase/veronex) 토큰/문서 변경
- girok 토큰 값 수정(Phase A13 유지)
- 로고 SVG/PNG 에셋 생성

## Verification

- `pnpm --filter "@verobee/*" -C verodesign build` (contrast audit 포함) 통과
- girok CSS 산출물 유지 확인 (`packages/design/dist/css/themes/girok*.css`)

