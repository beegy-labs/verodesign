# Scope — Dialog `placement="bottom"` 바텀시트 표현 (additive)

> 대상: `packages/design-elements/src/components/dialog/vds-dialog.ts`.
> 소비자(app-girok 캘린더 날짜 상세 등) 바텀시트용. 사용자 레퍼런스:
> 슬라이드업·드래그핸들·하단고정·상단라운드, 배경 확실히 블러+딤.
> **additive·opt-in**, 기본=현행 중앙 모달 불변.

## 의도 (Claude 결정 — 네이밍/역할 정책)

- `vds-dialog` 에 `@property placement: 'center' | 'bottom'`,
  **기본 `'center'`(현행 100% 불변, reflect)**.
- `placement="bottom"`:
  - panel 을 화면 **하단 고정·풀폭**, 상단 모서리만 라운드
    (`--vds-radius-lg`), 하단 safe-area inset 존중. 진입은 아래→위
    슬라이드(`transform: translateY`), 닫힘 역방향. `prefers-reduced-
    motion` 시 transition 제거(기존 규칙 일관).
  - panel 상단 중앙에 **드래그 핸들**(시각 표시; 토큰 색
    `--vds-theme-border-*`/dim, 크기 spacing/radius 토큰). 핸들은
    장식+영역 표시(실제 드래그-제스처 닫기 구현은 선택 — 최소 요건은
    시각 핸들 + 기존 backdrop/Esc 닫기 유지).
  - backdrop: 기존 `var(--vds-theme-scrim)` 유지하되 **backdrop-filter
    blur 를 상향**(레퍼런스처럼 배경이 확실히 블러+딤; 기존 blur 토큰/
    값 체계 안에서 더 강한 단계 사용, raw px 가능하면 기존 blur 스케일
    토큰 사용). center 모드 blur 는 변경 금지(회귀 0).
- a11y/포커스 트랩·초기 포커스(panel, ⑩)·Esc·backdrop 닫기·
  `aria`·`vds-close`·focus 복원 **불변**(placement 무관 동일).
- 색·간격·반경·모션 전부 `var(--vds-*)` 토큰만. semantic/theme 토큰
  **신설 없음**(기존 재사용). 브랜드 분기 없음 → cross-brand zero
  diff(기본 center).

## 제약 (verodesign skills)

- token-ssot/brand-isolation 준수, raw hex/px 금지(기존 blur/spacing/
  radius 토큰 스케일 사용). 기존 center 경로·⑩ 포커스/헤더 균형·②
  scrim 토큰 회귀 0. blur/radius/z-index 기존 동작 유지(bottom 분기만).
- dist 재빌드는 **design-elements dist 만**. app-girok·레포 기존
  미커밋 드리프트(build 스크립트/typography/design dist) 절대 손대지
  말 것.

## 검증

- 표준 타입체크/빌드/`@verobee/design-elements`·`design` validate
  통과까지 자체 재시도(최대3회). (브라우저 E2E 환경 baseline 실패는
  무관 — 회귀 테스트는 추가: center 기본 렌더, bottom 렌더, Esc/
  backdrop/포커스 트랩 보존.)
- dist grep: `placement` 정의·기본 center·bottom 분기(슬라이드/핸들/
  blur 상향) 확인. app-girok 재링크 필요 여부 명시.

## 응답(≤400토큰, 코드/diff/로그 금지)
- 변경 파일(경로 — 의도)
- placement 속성/기본값 + bottom 분기(슬라이드·핸들·blur 상향) 방식
- 사용 토큰(신설 없음 확인) / center·② scrim·⑩ 회귀 0 근거
- 빌드/validate / dist grep / app-girok 재링크 필요 여부
- cross-brand zero diff 근거 / 범위 일탈
