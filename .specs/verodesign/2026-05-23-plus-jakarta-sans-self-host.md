# Plus Jakarta Sans 폰트 verodesign self-host

> Date: 2026-05-23
> Builder: Codex
> Reviewer: Claude
> Workspace: verodesign
> Supersedes: `2026-05-23-girok-display-font.md` (token-only 버전 — Style Dictionary fontFamily 가 CSS 값 emit 안 함 + Tauri CSP 가 Google Fonts CDN 차단 → self-host 정공법)

## 라이센스 확인

**Plus Jakarta Sans** by Tokotype/ITF
- License: **SIL Open Font License 1.1 (OFL)**
- 출처: https://github.com/tokotype/PlusJakartaSans
- 사용 가능: 자유 사용, 수정, 재배포, 번들, 상용 임베딩
- 의무: 라이센스 텍스트 동봉
- 금지: 폰트 단독 판매 (앱/소프트웨어 임베딩은 OK)
- 결론: verodesign 자체에 폰트 파일 self-host + 라이센스 동봉으로 합법.

## 목표

verodesign 패키지가 Plus Jakarta Sans variable woff2 폰트를 자체 호스팅. 소비자(app-girok)는
별도 CSS 임포트 한 줄로 폰트 사용. 외부 CDN(Google Fonts) 의존 제거 → Tauri CSP `font-src 'self'`
만으로 작동.

## 변경 범위 (Codex)

### 1. 폰트 파일 다운로드 + 배치

GitHub 공식 저장소(`tokotype/PlusJakartaSans`)의 variable woff2 파일 가져옴:
- `PlusJakartaSans[wght].woff2` (variable, 200-800 axis) — wordmark + 향후 hero 영역에 사용
- 또는 정적 weight 가 더 안전하면 `PlusJakartaSans-ExtraBold.woff2` (800), `PlusJakartaSans-Black.woff2` (900?) — 사용처가 wordmark뿐이라 variable 권장

배치 위치:
```
packages/design/assets/fonts/plus-jakarta-sans/
  PlusJakartaSans-VariableFont_wght.woff2      (라이센스 OK한 variable)
  OFL.txt                                      (SIL OFL 라이센스 사본)
  README.md                                    (출처 + 버전 명시)
```

빌드 시 dist 로 복사:
```
packages/design/dist/fonts/plus-jakarta-sans/
  PlusJakartaSans-VariableFont_wght.woff2
  OFL.txt
  plus-jakarta-sans.css                        (@font-face 선언 — verodesign이 생성)
```

### 2. @font-face CSS 작성

`packages/design/dist/fonts/plus-jakarta-sans/plus-jakarta-sans.css`:
```css
@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('./PlusJakartaSans-VariableFont_wght.woff2') format('woff2-variations');
  font-weight: 200 800;
  font-style: normal;
  font-display: swap;
}
```

(variable 폰트라 `font-weight: 200 800` 범위 표기)

### 3. package.json exports 추가

`packages/design/package.json` 의 `exports` 에:
```json
"./fonts/plus-jakarta-sans.css": "./dist/fonts/plus-jakarta-sans/plus-jakarta-sans.css",
"./fonts/plus-jakarta-sans/*": "./dist/fonts/plus-jakarta-sans/*"
```

(woff2 도 직접 import 가능하게 와일드카드)

### 4. files 필드 업데이트

`packages/design/package.json` 의 `files` 에 `"dist/fonts/**"` 추가 — npm publish 시 폰트 포함.

### 5. 빌드 스크립트 (scripts/build.mjs) 수정

폰트 디렉토리를 `assets/fonts/` → `dist/fonts/` 로 복사하는 단계 추가. plus-jakarta-sans.css 도
같이 emit.

### 6. token 보정 (옵션)

`tokens/experimental/girok-redesign.json` 의 `font-family.display` 가 이미 추가되어 있지만,
Style Dictionary fontFamily 의 CSS 값 emit 누락은 별도 이슈. 이 spec 으로는 단순히 폰트 파일만
self-host. consumer 가 직접 `font-family: 'Plus Jakarta Sans', ...` 로 CSS 작성하면 됨.

향후 Style Dictionary fontFamily 의 theme CSS emit 도 별도 spec 으로 처리.

### 7. 검증 게이트

- `ls packages/design/dist/fonts/plus-jakarta-sans/` → 3 파일 (woff2, OFL.txt, plus-jakarta-sans.css)
- `cat packages/design/dist/fonts/plus-jakarta-sans/OFL.txt` → SIL OFL 1.1 보임
- `node -e "console.log(require('@verobee/design/package.json').exports['./fonts/plus-jakarta-sans.css'])"` → resolve OK
- `du -h packages/design/dist/fonts/plus-jakarta-sans/PlusJakartaSans-VariableFont_wght.woff2` → 100-200KB 정도 (variable font 정상 크기)

## 보고

```
다운로드한 파일: <목록 + 크기>
빌드 결과: pnpm build exit 0
exports 추가: OK
files 필드: OK
검증 게이트 4종: <pass/fail>
```
