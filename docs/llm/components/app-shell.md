# App Shell

Fixed-region mobile app shell for document-scroll layouts.

## Structure

- Root stays in normal document flow.
- `header` wrapper uses `position: fixed; top: 0` with `var(--vds-safe-area-top, env(safe-area-inset-top))`.
- `bottomNav` wrapper uses `position: fixed; bottom: 0` with `var(--vds-safe-area-bottom, env(safe-area-inset-bottom))`.
- Content wrapper adds top/bottom padding equal to region height tokens plus safe-area so overlap stays 0.
- `bottomNav` height must remain token-sized for icon+label vertical stacks and distribute items evenly without truncating labels by default.

## Scroll Policy

- `position: fixed` means viewport pinning for shell regions.
- The prohibited black-screen pattern is nested `overflow: auto|scroll` containers.
- `AppShell` does not create nested scrollers; scrolling remains on the single document viewport.

## Tokens

- Heights: `--vds-app-shell-header-height`, `--vds-app-shell-bottom-nav-height`
- Safe area override: consumer-provided `--vds-safe-area-top`, `--vds-safe-area-bottom` take priority, `env(...)` remains the fallback
- Layering: `--vds-zindex-app-shell`
- Surface: `--vds-theme-bg-elevated`, `--vds-theme-border-subtle`, `--vds-elevation-1`

cross-brand: `app-shell` regions — 대상 {brand목록=전체}. 각 브랜드가 이 의미를 보유하는 근거: 고정 셸 chrome, safe-area, viewport pinning은 브랜드와 무관한 앱 구조 공통 의미. 브랜드별 값 차이: 없음. 사용자 비준: 2026-05-16 spec contract.
