# SDD: Experimental token isolation 정정 (X2-6)

> Authored: 2026-05-21 | Phase X2 — 정공법 시정 #6 | Depends: X2-1 (slot group), X2-2 (naming)
> Inputs: X1 BLOCKER (Phase B 의 `exp.girok.finance.*` 가 canonical `girok-{dark,light}.json` 안에 들어감, naming.md "experimental stays under `exp.*`" 위반)

## Why

Phase B 가 `exp.girok.market.{up,down}` mode-aware AA contrast 위해 girok-{light,dark}.json canonical theme 파일 안에 `exp.girok.finance.{up,down,flat}` mode-specific 값 추가. 이는 naming.md "Modes in file location, not name; experimental stays under `exp.*`" 위반. canonical theme = mode 별 file split (girok-light/dark), experimental 은 별 namespace.

**정공법 = experimental 토큰을 canonical theme 파일 밖으로 분리** + mode-aware 값은 `tokens/experimental/<scope>-<mode>.json` 형태로 mode split.

## Scope

### 1. 현 상태 진단

```sh
# girok-{light,dark}.json 안에 exp.girok.finance.* 존재 확인
rg -n '"exp"' packages/design/tokens/themes/girok-light.json packages/design/tokens/themes/girok-dark.json
```

Phase B alias 의 구체적 위치 확인.

### 2. Experimental token mode split 구조

| Before (현) | After (정공법) |
|-------------|-----------------|
| `tokens/experimental/girok-finance.json` 안에 mode-aware alias | `tokens/experimental/girok-finance.json` (mode-agnostic 토큰) + `tokens/experimental/girok-finance-light.json` (light override) + `tokens/experimental/girok-finance-dark.json` (dark override) |
| `tokens/themes/girok-light.json` 안에 `exp.girok.finance.up/down/flat` | 제거 (experimental 안으로 이동) |
| `tokens/themes/girok-dark.json` 동일 | 제거 |

또는 single file + mode key:

```json
{
  "exp": {
    "girok": {
      "finance": {
        "up": {
          "$value": "oklch(50% 0.17 28)",
          "$type": "color",
          "$extensions": { "verobee": { "modeOverride": { "dark": "oklch(70% 0.17 28)" } } }
        }
      }
    }
  }
}
```

Style Dictionary 빌드 시 mode key 처리. naming.md "modes in file" 정신 부합 — 분리 file 권장.

### 3. brand-isolation skill 갱신

`.add/skills/brand-isolation.md` 추가:
- "experimental 토큰은 `tokens/experimental/` 만, canonical theme 파일에 섞이면 안 됨"
- "mode-aware experimental 은 file split: `<scope>-<mode>.json`"
- 검출 패턴: `rg '"exp"' tokens/themes/*.json` → 0 (위반 시 BLOCKER)

### 4. `naming.md` 강화

| 신 규칙 | Reason |
|---------|--------|
| Experimental tokens MUST live under `tokens/experimental/`, never inside `tokens/themes/<brand>-<mode>.json` | naming.md "modes in file" 정합 + skill 검출 가능 |
| Experimental mode override = file split (`<scope>-<mode>.json`) or `$extensions.verobee.modeOverride` | DTCG 호환 + Style Dictionary 처리 |

### 5. Pattern-intake.md / Token-add.md 갱신

experimental token 신설 워크플로우의 acceptance gates 보강:
- 검출: experimental 토큰이 canonical theme 안에 안 들어감

## Acceptance gates

| Gate | 요구 |
|------|------|
| `girok-{light,dark}.json` 안에 `exp.*` namespace 0 | ✓ |
| Experimental 토큰 mode-aware 처리 = file split 또는 `$extensions.modeOverride` | ✓ |
| `pnpm build` 통과 (CSS variable 산출 변경 없음 — alias 결과 동일) | ✓ |
| brand-isolation skill 검출 패턴 강화 | ✓ |
| `naming.md` 규칙 추가 | ✓ |
| Phase B 의 `exp.girok.market` / `finance` 매핑 정합 유지 | ✓ |

## Out-of-scope

- slot group 분리 — X2-1
- naming format migration — X2-2
- contrast policy — X2-3

## Cross-impact

- X1 G6 BLOCKER (experimental isolation 붕괴) → 시정
- Phase B 의 visual outcome 보존 (CSS 산출 동일)

## Validation steps

1. X2-1 + X2-2 완료 확인
2. girok-{light,dark}.json 안의 `exp.girok.finance.*` 위치 진단
3. `tokens/experimental/girok-finance-light.json` + `girok-finance-dark.json` 분리 (또는 modeOverride 처리)
4. girok-{light,dark}.json 에서 exp.* namespace 제거
5. brand-isolation skill 검출 패턴 강화
6. naming.md 규칙 추가
7. `pnpm build` 통과 + CSS 변수 산출 동일 (regression test)
8. 보고
