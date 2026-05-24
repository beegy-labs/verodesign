# girok-redesign display font family 토큰 추가

> Date: 2026-05-23
> Builder: Codex
> Reviewer: Claude
> Workspace: verodesign

## 목표

app-girok 의 `girok.` wordmark + 향후 큰 헤어로 숫자 영역에서 사용할 **display 폰트** 토큰을
girok-redesign 실험 네임스페이스에 추가.

## 토큰 정의 (Claude 결정)

| 키 | 값 |
|---|---|
| 토큰 경로 | `exp.girok-redesign.font-family.display` |
| CSS 변수 | `--vds-exp-girok-redesign-font-family-display` |
| 타입 | `fontFamily` |
| `$value` | `"'Plus Jakarta Sans', system-ui, -apple-system, 'Apple SD Gothic Neo', 'Segoe UI', Roboto, sans-serif"` |
| `$description` | `"Heavy/black-weight display sans-serif for girok wordmark and hero numerals. Falls back to system stack for Korean and other scripts."` |

## 폰트 호스팅

폰트 파일 자체는 verodesign 패키지가 호스팅하지 않음. 소비자(앱) 측에서 다음 중 하나로 로드:

1. **권장**: app-girok `index.html` 에 Google Fonts `<link>` 추가
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800;900&display=swap" rel="stylesheet">
   ```
   (wght 800, 900 만 — wordmark 가 black 사용)
2. 또는 self-host (.woff2 파일 추가) — 후속.

## 변경 범위 (Codex)

1. `packages/design/tokens/experimental/girok-redesign.json` 의 `exp.girok-redesign` 아래에 `font-family` 섹션 추가:
   ```json
   "font-family": {
     "display": {
       "$value": "'Plus Jakarta Sans', system-ui, -apple-system, 'Apple SD Gothic Neo', 'Segoe UI', Roboto, sans-serif",
       "$type": "fontFamily",
       "$description": "Heavy/black-weight display sans-serif for girok wordmark and hero numerals. Falls back to system stack for Korean and other scripts."
     }
   }
   ```
2. `pnpm --filter @verobee/design build` → girok 테마 CSS 에 `--vds-exp-girok-redesign-font-family-display` 토큰 생성 검증.
3. app-girok resync — `.pnpm/@verobee+design@*` 모든 인스턴스의 dist css 갱신.
4. (consumer 측 작업은 후속) — app-girok `index.html` 에 Google Fonts link 추가 + `.girok-shell-wordmark` 가 `var(--vds-exp-girok-redesign-font-family-display)` 사용하도록 업데이트.

## 검증

- `grep "exp-girok-redesign-font-family-display" packages/design/dist/css/themes/girok.css` → 1 hit (변수 정의)
- `grep "exp-girok-redesign-font-family-display" packages/design/dist/css/themes/default.css` → 0 hits (girok 전용 — default 에 누출 안 됨)
- app-girok `node_modules/@verobee/design/dist/css/themes/girok.css` 에도 위 변수 존재 확인 (resync 검증)

## 보고

```
변경 파일: <목록>
빌드 결과: pnpm build exit 0
girok.css 변수 hit: 1
default.css 누출: 0
app-girok resync: 인스턴스 수 N개 동기
```
