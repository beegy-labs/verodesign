# 2026-05-15 — girok 팔레트 정제 (고급 서재 톤)

> 초기 girok-light/dark 가 "muddy single-brown" 으로 칙칙하다는 피드백.
> 중성 베이스 + 절제된 brass accent + 뚜렷한 표면 계층으로 재설계.
> 본문 AAA, 큰 텍스트/버튼 AA, UI 컴포넌트 경계 3:1 유지.

## 사용자 피드백 (raw)

"디자인이 구지잖아 ... 색감도 고급스럽지 않아 싹 조합을 수정해 색감의 경우
AAA, 버튼, 컴포넌트등은 A를 지켜"

→ 해석: 본문 텍스트 = WCAG AAA (≥7:1). 버튼/컴포넌트/큰 텍스트 = 최소 AA
(≥4.5:1 텍스트, ≥3:1 비텍스트 경계). "구지다" = 단조로운 갈색, 표면 계층
구분 약함, accent 가 배경에 묻힘.

## 진단 (현재 girok 문제)

- bg-page / bg-card / bg-elevated 가 너무 비슷한 갈색 → 카드 경계 안 보임.
- primary (cognac) 가 갈색 배경에 묻혀 버튼이 안 도드라짐.
- dark mode 가 진흙색 단일 brown → 깊이감 없음.
- 전체 채도 과다 + 명도 대비 부족.

## 설계 방향

**원목 도서관 컨셉 유지하되**: 베이스를 **따뜻한 중성색 (warm
gray / charcoal)** 으로, 나무색은 **accent 한 점 (brass/cognac)** 으로 절제.
표면 계층 (page < card < elevated) 명도 차이를 또렷하게.

### girok-light (재설계)

| 토큰 | 값 (참고) | 의도 / 대비 |
| --- | --- | --- |
| `bg.page` | `#F4F1EA` | warm ivory (덜 노랗게, 채도↓) |
| `bg.card` | `#FBFAF6` | near-white paper — page 와 명도차 또렷 |
| `bg.elevated` | `#EAE5D8` | 한 단계 진한 sand |
| `border.default` | `#CBC2AD` | card 위 3:1 이상 경계 |
| `border.strong` | `#A99B7E` | 입력 필드 등 강조 경계 |
| `text.primary` | `#22201B` | espresso — bg.card 대비 ≥ 14:1 (AAA) |
| `text.secondary` | `#544F44` | ≥ 7:1 (AAA) |
| `text.tertiary` | `#7C7464` | ≥ 4.5:1 (AA, 보조) |
| `primary` | `#8A5A2B` | cognac — bg.page 위 텍스트 사용 시 ≥ 4.5:1 |
| `primary.fg` | `#FCFBF7` | primary 위 ≥ 4.5:1 |
| `accent` | `#9C6B34` | brass — hover/focus |
| `success` | `#3C6B45` | forest |
| `warning` | `#9A6516` | amber |
| `danger` | `#8C2F28` | oxblood |

### girok-dark (재설계)

진흙 brown 대신 **warm charcoal** 베이스 + parchment 텍스트 + soft brass.

| 토큰 | 값 (참고) | 의도 / 대비 |
| --- | --- | --- |
| `bg.page` | `#1A1815` | warm charcoal (갈색 아님, 중성에 가깝게) |
| `bg.card` | `#23211C` | page 와 명도차 또렷 |
| `bg.elevated` | `#2D2A23` | 한 단계 위 |
| `border.default` | `#3C382F` | card 위 ≥ 3:1 |
| `border.strong` | `#564F40` | 입력 강조 |
| `text.primary` | `#F2EDDF` | parchment — bg.card 대비 ≥ 14:1 (AAA) |
| `text.secondary` | `#CFC6B0` | ≥ 7:1 (AAA) |
| `text.tertiary` | `#988E76` | ≥ 4.5:1 (AA) |
| `primary` | `#C99355` | warm brass — bg.page 위 ≥ 4.5:1 |
| `primary.fg` | `#1A1815` | primary 위 ≥ 4.5:1 |
| `accent` | `#D9A867` | 밝은 brass — hover/focus |
| `success` | `#7FB07A` |  |
| `warning` | `#D6A04F` |  |
| `danger` | `#D98279` |  |

값은 참고 — Codex 가 contrast 검사로 미세 조정. **각 페어 검증 필수**:
- text.primary / bg.card, text.primary / bg.page → AAA (≥7:1, 가능하면 ≥14:1).
- text.secondary / bg.card → AAA (≥7:1).
- text.tertiary / bg.card → AA (≥4.5:1).
- primary.fg / primary → AA (≥4.5:1).
- border.default / bg.card → 비텍스트 ≥3:1.

## 표면 계층 규칙

`bg.page` → `bg.card` → `bg.elevated` 의 상대 명도 차이를 **각 단계 ≥ 5%
L\*** 확보. 카드가 배경에서 또렷이 떠 보여야 함 (현재 문제의 핵심).

## 스코프

- `verodesign/packages/design/tokens/themes/girok-light.json`
- `verodesign/packages/design/tokens/themes/girok-dark.json`
- 위 두 파일의 값만 교체. 키 구조 / 다른 brand 변경 X.
- `pnpm --filter "@verobee/*" -C verodesign build` → girok CSS 재생성 +
  contrast 검사 통과.
- dreamstock `node_modules/@verobee/design/dist/css/themes/girok*` sync.

## 검증

- verodesign 빌드의 contrast 검사 통과 (위 페어).
- dreamstock 시뮬에서 light/dark 둘 다: 카드 경계 또렷, 버튼 도드라짐, 텍스트
  선명.

## refactor-policy 자가점검

- [ ] 다른 brand (default/verobase/veronex) 토큰 불변.
- [ ] girok 키 이름 그대로, 값만 교체.
- [ ] contrast 검사 자동화 통과.
- [ ] `border.strong` 키가 다른 brand 에 없으면 추가하지 말고 기존 키 안에서
  해결 (스키마 일관성). 필요 시 `border.default` 만 사용.
