# Girok Redesign Token Map

Archived reference. The active Girok SSOT is the split token tree under `packages/design/tokens/experimental/girok/` and source patterns now consume `--vds-exp-girok-*` directly.

- Status: legacy research snapshot
- Current compatibility surface: `girok-redesign.json` alias vars emitted in `dist/css/themes/girok.css`
- Do not use this file for new token naming decisions

Mock source: `/Users/vero/workspace/beegy/app-design-2.txt`

| Mock literal | 등장 (회) | 의미 | vds token | CSS var |
| --- | ---: | --- | --- | --- |
| `#0D0C0A` | 3 | 메인 스크롤 콘텐츠 배경 | `exp.girok-redesign.shell.content-surface` | `--vds-exp-girok-redesign-shell-content-surface` |
| `#0E0D0A` | 31 | 디바이스 프레임 및 루트 배경 | `exp.girok-redesign.shell.frame-surface` | `--vds-exp-girok-redesign-shell-frame-surface` |
| `#12110E` | 1 | 다크 그라데이션 종단 | `exp.girok-redesign.shell.content-surface` | `--vds-exp-girok-redesign-shell-content-surface` |
| `#14120E` | 17 | 서브 카드 및 리스트 행 표면 | `exp.girok-redesign.surface.card-subtle` | `--vds-exp-girok-redesign-surface-card-subtle` |
| `#161410` | 1 | 어두운 보조 패널 배경 | `exp.girok-redesign.surface.card-subtle` | `--vds-exp-girok-redesign-surface-card-subtle` |
| `#1A1812` | 2 | 보조 브라운 패널 배경 | `exp.girok-redesign.surface.toolbar` | `--vds-exp-girok-redesign-surface-toolbar` |
| `#1A1813` | 4 | 툴바 및 제어 레일 표면 | `exp.girok-redesign.surface.toolbar` | `--vds-exp-girok-redesign-surface-toolbar` |
| `#1C1A14` | 17 | 기본 카드 및 모달 표면 | `exp.girok-redesign.surface.card` | `--vds-exp-girok-redesign-surface-card` |
| `#1F1C15` | 1 | 딥 브라운 보조 배경 | `exp.girok-redesign.surface.card` | `--vds-exp-girok-redesign-surface-card` |
| `#232018` | 4 | 서브 카드 테두리 | `exp.girok-redesign.border.card-subtle` | `--vds-exp-girok-redesign-border-card-subtle` |
| `#25221B` | 2 | 보조 시트 배경 | `exp.girok-redesign.surface.toolbar` | `--vds-exp-girok-redesign-surface-toolbar` |
| `#2B271E` | 6 | 기본 컨트롤 테두리 | `exp.girok-redesign.border.control` | `--vds-exp-girok-redesign-border-control` |
| `#2E281C` | 8 | 세그먼트 활성 배경 | `exp.girok-redesign.toggle.active-bg` | `--vds-exp-girok-redesign-toggle-active-bg` |
| `#3A3326` | 9 | 모달 강한 테두리 | `exp.girok-redesign.border.modal-strong` | `--vds-exp-girok-redesign-border-modal-strong` |
| `#3D3425` | 1 | 깊은 활성 패널 배경 | `exp.girok-redesign.border.active` | `--vds-exp-girok-redesign-border-active` |
| `#483E2C` | 5 | 활성 pill 테두리 | `exp.girok-redesign.border.active` | `--vds-exp-girok-redesign-border-active` |
| `bg-[#0D0C0A]` | 3 | 메인 스크롤 콘텐츠 배경 유틸 | `exp.girok-redesign.shell.content-surface` | `--vds-exp-girok-redesign-shell-content-surface` |
| `bg-[#0E0D0A]` | 31 | 프레임 및 루트 배경 유틸 | `exp.girok-redesign.shell.frame-surface` | `--vds-exp-girok-redesign-shell-frame-surface` |
| `bg-[#14120E]` | 16 | 서브 카드 배경 유틸 | `exp.girok-redesign.surface.card-subtle` | `--vds-exp-girok-redesign-surface-card-subtle` |
| `bg-[#161410]` | 1 | 딥 서브 카드 배경 | `exp.girok-redesign.surface.card-subtle` | `--vds-exp-girok-redesign-surface-card-subtle` |
| `bg-[#1A1812]` | 2 | 브라운 패널 배경 | `exp.girok-redesign.surface.toolbar` | `--vds-exp-girok-redesign-surface-toolbar` |
| `bg-[#1A1813]` | 3 | 툴바 배경 유틸 | `exp.girok-redesign.surface.toolbar` | `--vds-exp-girok-redesign-surface-toolbar` |
| `bg-[#1C1A14]` | 15 | 카드 배경 유틸 | `exp.girok-redesign.surface.card` | `--vds-exp-girok-redesign-surface-card` |
| `bg-[#1F1C15]` | 1 | 딥 카드 배경 유틸 | `exp.girok-redesign.surface.card` | `--vds-exp-girok-redesign-surface-card` |
| `bg-[#25221B]` | 2 | 보조 시트 배경 유틸 | `exp.girok-redesign.surface.toolbar` | `--vds-exp-girok-redesign-surface-toolbar` |
| `bg-[#2E281C]` | 7 | 세그먼트 활성 배경 유틸 | `exp.girok-redesign.toggle.active-bg` | `--vds-exp-girok-redesign-toggle-active-bg` |
| `bg-[#3D3425]` | 1 | 강조 패널 배경 유틸 | `exp.girok-redesign.border.active` | `--vds-exp-girok-redesign-border-active` |
| `bg-amber-400` | 8 | 탭 활성 텍스트/강조 계열 배경 | `exp.girok-redesign.nav.tab-active` | `--vds-exp-girok-redesign-nav-tab-active` |
| `bg-amber-500` | 10 | 주요 CTA 배경 | `theme.primary` | `--vds-theme-primary` |
| `bg-amber-500/10` | 3 | 은은한 앰버 틴트 | `theme.primary + opacity.10` | `--vds-theme-primary` |
| `bg-amber-500/20` | 2 | 앰버 pill/tint 배경 | `theme.primary + opacity.20` | `--vds-theme-primary` |
| `bg-blue-400` | 2 | 토요일/정보 배경 포인트 | `exp.girok-redesign.calendar.weekend-sat` | `--vds-exp-girok-redesign-calendar-weekend-sat` |
| `bg-blue-500` | 2 | 정보 CTA 배경 | `theme.status.info` | `--vds-theme-status-info` |
| `bg-blue-500/20` | 1 | 정보 pill 배경 | `exp.girok-redesign.pill.info-bg` | `--vds-exp-girok-redesign-pill-info-bg` |
| `bg-emerald-400` | 2 | 상승/수입 강조 배경 | `exp.girok-redesign.stats.income-text` | `--vds-exp-girok-redesign-stats-income-text` |
| `bg-emerald-500` | 6 | 성공 CTA 배경 | `theme.status.success` | `--vds-theme-status-success` |
| `bg-emerald-500/20` | 1 | 성공 pill 배경 | `exp.girok-redesign.pill.success-bg` | `--vds-exp-girok-redesign-pill-success-bg` |
| `bg-gradient-to-b` | 3 | 수직 그라데이션 컨테이너 | `exp.girok-redesign.surface.card → shell.content-surface` | `--vds-exp-girok-redesign-surface-card` |
| `bg-gradient-to-r` | 1 | 수평 그라데이션 컨테이너 | `exp.girok-redesign.toggle.active-bg → nav.tab-active` | `--vds-exp-girok-redesign-toggle-active-bg` |
| `bg-indigo-500/10` | 1 | 인디고 아이콘 타일 | `exp.girok-redesign.pill.indigo-tile-bg` | `--vds-exp-girok-redesign-pill-indigo-tile-bg` |
| `bg-purple-400` | 1 | 보조 차트/카테고리 강조 | `exp.girok-redesign.chart.rank-5-fill` | `--vds-exp-girok-redesign-chart-rank-5-fill` |
| `bg-rose-400` | 2 | 지출 강조 배경 | `exp.girok-redesign.stats.expense-text` | `--vds-exp-girok-redesign-stats-expense-text` |
| `bg-rose-450` | 1 | 커스텀 로즈 중간값 | `exp.girok-redesign.stats.expense-text` | `--vds-exp-girok-redesign-stats-expense-text` |
| `bg-rose-500` | 5 | 지출/파괴적 CTA 배경 | `theme.status.error` | `--vds-theme-status-error` |
| `bg-rose-500/10` | 1 | 약한 로즈 틴트 | `theme.status.error + opacity.10` | `--vds-theme-status-error` |
| `bg-rose-500/20` | 1 | 지출 pill 배경 | `exp.girok-redesign.pill.expense-bg` | `--vds-exp-girok-redesign-pill-expense-bg` |
| `bg-zinc-300` | 1 | 밝은 중립 배경 | `color-slate-4` | `--vds-color-slate-4` |
| `bg-zinc-500` | 1 | 중립 보조 배경 | `exp.girok-redesign.nav.bottom-inactive` | `--vds-exp-girok-redesign-nav-bottom-inactive` |
| `bg-zinc-600` | 1 | 중립 진한 배경 | `color-slate-6` | `--vds-color-slate-6` |
| `bg-zinc-700` | 5 | 딥 중립 배경 | `color-slate-8` | `--vds-color-slate-8` |
| `bg-zinc-750` | 6 | 커스텀 중립 배경 | `exp.girok-redesign.surface.toolbar` | `--vds-exp-girok-redesign-surface-toolbar` |
| `bg-zinc-800` | 15 | 다크 패널 배경 | `theme.bg.inverse` | `--vds-theme-bg-inverse` |
| `bg-zinc-800/30` | 1 | 희미한 다크 틴트 | `theme.bg.inverse + opacity.30` | `--vds-theme-bg-inverse` |
| `bg-zinc-800/50` | 1 | 절반 강도 다크 틴트 | `theme.bg.inverse + opacity.50` | `--vds-theme-bg-inverse` |
| `bg-zinc-900` | 10 | 근접 블랙 배경 | `color-slate-11` | `--vds-color-slate-11` |
| `bg-zinc-950` | 1 | 최외곽 화면 배경 | `theme.bg.page` | `--vds-theme-bg-page` |
| `border-[#232018]` | 4 | 서브 카드 테두리 유틸 | `exp.girok-redesign.border.card-subtle` | `--vds-exp-girok-redesign-border-card-subtle` |
| `border-[#2B271E]` | 6 | 기본 컨트롤 테두리 유틸 | `exp.girok-redesign.border.control` | `--vds-exp-girok-redesign-border-control` |
| `border-[#3A3326]` | 9 | 모달 강한 테두리 유틸 | `exp.girok-redesign.border.modal-strong` | `--vds-exp-girok-redesign-border-modal-strong` |
| `border-[#483E2C]` | 5 | 활성 pill 테두리 유틸 | `exp.girok-redesign.border.active` | `--vds-exp-girok-redesign-border-active` |
| `border-[10px]` | 1 | 두꺼운 장식 보더 폭 | `border-width.8` | `--vds-border-width-8` |
| `border-0` | 1 | 보더 제거 | `border-width.0` | `--vds-border-width-0` |
| `border-amber-500` | 12 | 앰버 보더 | `theme.primary` | `--vds-theme-primary` |
| `border-amber-500/10` | 1 | 은은한 앰버 보더 | `theme.primary + opacity.10` | `--vds-theme-primary` |
| `border-amber-500/20` | 3 | 앰버 보더 20% | `theme.primary + opacity.20` | `--vds-theme-primary` |
| `border-amber-500/30` | 3 | 앰버 보더 30% | `theme.primary + opacity.30` | `--vds-theme-primary` |
| `border-amber-500/60` | 1 | 앰버 보더 60% | `theme.primary + opacity.60` | `--vds-theme-primary` |
| `border-b` | 6 | 하단 보더 1px | `border-width.1` | `--vds-border-width-1` |
| `border-rose-500` | 1 | 로즈 보더 | `theme.status.error` | `--vds-theme-status-error` |
| `border-rose-500/20` | 1 | 로즈 보더 20% | `theme.status.error + opacity.20` | `--vds-theme-status-error` |
| `border-rose-500/30` | 1 | 로즈 보더 30% | `theme.status.error + opacity.30` | `--vds-theme-status-error` |
| `border-rose-900/30` | 1 | 다크 로즈 보더 | `theme.status.error + opacity.30` | `--vds-theme-status-error` |
| `border-zinc-400` | 1 | 중립 포커스 보더 | `theme.border.default` | `--vds-theme-border-default` |
| `border-zinc-800` | 37 | 다크 카드 보더 | `theme.border-strong` | `--vds-theme-border-strong` |
| `border-zinc-800/50` | 2 | 다크 카드 보더 50% | `theme.border-strong + opacity.50` | `--vds-theme-border-strong` |
| `border-zinc-800/60` | 3 | 다크 카드 보더 60% | `theme.border-strong + opacity.60` | `--vds-theme-border-strong` |
| `border-zinc-800/80` | 9 | 다크 카드 보더 80% | `theme.border-strong + opacity.80` | `--vds-theme-border-strong` |
| `border-zinc-900` | 1 | 강한 중립 보더 | `color-slate-11` | `--vds-color-slate-11` |
| `font-bold` | 84 | 강한 제목 및 금액 가중치 | `font.weight.700` | `--vds-font-weight-700` |
| `font-medium` | 2 | 중간 가중치 | `font.weight.500` | `--vds-font-weight-500` |
| `font-semibold` | 12 | 세미볼드 가중치 | `font.weight.600` | `--vds-font-weight-600` |
| `from-[#1C1A14]` | 2 | 카드 그라데이션 시작 | `exp.girok-redesign.surface.card` | `--vds-exp-girok-redesign-surface-card` |
| `from-[#2E281C]` | 1 | 세그먼트 그라데이션 시작 | `exp.girok-redesign.toggle.active-bg` | `--vds-exp-girok-redesign-toggle-active-bg` |
| `from-amber-600` | 1 | CTA 그라데이션 시작 | `theme.primary` | `--vds-theme-primary` |
| `gap-0.5` | 1 | 초소형 간격 | `spacing.0_5` | `--vds-spacing-0_5` |
| `gap-1` | 9 | 소형 간격 | `spacing.1` | `--vds-spacing-1` |
| `gap-1.5` | 14 | 소형+ 간격 | `spacing.1_5` | `--vds-spacing-1_5` |
| `gap-2` | 15 | 기본 컴팩트 간격 | `spacing.2` | `--vds-spacing-2` |
| `gap-2.5` | 7 | 중간 컴팩트 간격 | `spacing.2_5` | `--vds-spacing-2_5` |
| `gap-3` | 5 | 표준 간격 | `spacing.3` | `--vds-spacing-3` |
| `gap-3.5` | 3 | 표준+ 간격 | `spacing.3_5` | `--vds-spacing-3_5` |
| `gap-4` | 1 | 중간 간격 | `spacing.4` | `--vds-spacing-4` |
| `gap-5` | 1 | 중대 간격 | `spacing.5` | `--vds-spacing-5` |
| `gap-y-5` | 1 | 세로 중대 간격 | `spacing.5` | `--vds-spacing-5` |
| `m-[#1C1A14]` | 2 | 색상형 임시 마진 해킹 | `exp.girok-redesign.surface.card` | `--vds-exp-girok-redesign-surface-card` |
| `m-[#2E281C]` | 1 | 색상형 임시 마진 해킹 | `exp.girok-redesign.toggle.active-bg` | `--vds-exp-girok-redesign-toggle-active-bg` |
| `m-0` | 3 | 마진 없음 | `spacing.0` | `--vds-spacing-0` |
| `m-1` | 2 | 마진 4px | `spacing.1` | `--vds-spacing-1` |
| `m-1.5` | 1 | 마진 6px | `spacing.1_5` | `--vds-spacing-1_5` |
| `m-2` | 1 | 마진 8px | `spacing.2` | `--vds-spacing-2` |
| `mb-1` | 20 | 하단 마진 4px | `spacing.1` | `--vds-spacing-1` |
| `mb-1.5` | 6 | 하단 마진 6px | `spacing.1_5` | `--vds-spacing-1_5` |
| `mb-2` | 7 | 하단 마진 8px | `spacing.2` | `--vds-spacing-2` |
| `mb-3` | 14 | 하단 마진 12px | `spacing.3` | `--vds-spacing-3` |
| `mb-4` | 8 | 하단 마진 16px | `spacing.4` | `--vds-spacing-4` |
| `mr-5` | 1 | 우측 마진 20px | `spacing.5` | `--vds-spacing-5` |
| `mt-0.5` | 8 | 상단 마진 2px | `spacing.0_5` | `--vds-spacing-0_5` |
| `mt-1` | 11 | 상단 마진 4px | `spacing.1` | `--vds-spacing-1` |
| `mt-1.5` | 2 | 상단 마진 6px | `spacing.1_5` | `--vds-spacing-1_5` |
| `mt-2` | 5 | 상단 마진 8px | `spacing.2` | `--vds-spacing-2` |
| `mt-2.5` | 2 | 상단 마진 10px | `spacing.2_5` | `--vds-spacing-2_5` |
| `mt-3` | 1 | 상단 마진 12px | `spacing.3` | `--vds-spacing-3` |
| `mt-4` | 2 | 상단 마진 16px | `spacing.4` | `--vds-spacing-4` |
| `mt-5` | 1 | 상단 마진 20px | `spacing.5` | `--vds-spacing-5` |
| `p-0` | 4 | 패딩 없음 | `spacing.0` | `--vds-spacing-0` |
| `p-0.5` | 1 | 패딩 2px | `spacing.0_5` | `--vds-spacing-0_5` |
| `p-1` | 13 | 패딩 4px | `spacing.1` | `--vds-spacing-1` |
| `p-1.5` | 6 | 패딩 6px | `spacing.1_5` | `--vds-spacing-1_5` |
| `p-16` | 1 | 패딩 64px | `spacing.16` | `--vds-spacing-16` |
| `p-2` | 6 | 패딩 8px | `spacing.2` | `--vds-spacing-2` |
| `p-2.5` | 5 | 패딩 10px | `spacing.2_5` | `--vds-spacing-2_5` |
| `p-3` | 16 | 패딩 12px | `spacing.3` | `--vds-spacing-3` |
| `p-3.5` | 2 | 패딩 14px | `spacing.3_5` | `--vds-spacing-3_5` |
| `p-4` | 14 | 패딩 16px | `spacing.4` | `--vds-spacing-4` |
| `p-5` | 7 | 패딩 20px | `spacing.5` | `--vds-spacing-5` |
| `p-6` | 11 | 패딩 24px | `spacing.6` | `--vds-spacing-6` |
| `pb-0` | 1 | 하단 패딩 없음 | `spacing.0` | `--vds-spacing-0` |
| `pb-2` | 3 | 하단 패딩 8px | `spacing.2` | `--vds-spacing-2` |
| `pb-24` | 8 | 하단 패딩 96px | `spacing.24` | `--vds-spacing-24` |
| `pb-3` | 1 | 하단 패딩 12px | `spacing.3` | `--vds-spacing-3` |
| `pb-6` | 2 | 하단 패딩 24px | `spacing.6` | `--vds-spacing-6` |
| `pb-8` | 1 | 하단 패딩 32px | `spacing.8` | `--vds-spacing-8` |
| `pt-1` | 2 | 상단 패딩 4px | `spacing.1` | `--vds-spacing-1` |
| `pt-2` | 8 | 상단 패딩 8px | `spacing.2` | `--vds-spacing-2` |
| `pt-3` | 1 | 상단 패딩 12px | `spacing.3` | `--vds-spacing-3` |
| `pt-4` | 2 | 상단 패딩 16px | `spacing.4` | `--vds-spacing-4` |
| `px-1` | 2 | 좌우 패딩 4px | `spacing.1` | `--vds-spacing-1` |
| `px-1.5` | 3 | 좌우 패딩 6px | `spacing.1_5` | `--vds-spacing-1_5` |
| `px-2` | 6 | 좌우 패딩 8px | `spacing.2` | `--vds-spacing-2` |
| `px-2.5` | 2 | 좌우 패딩 10px | `spacing.2_5` | `--vds-spacing-2_5` |
| `px-3` | 11 | 좌우 패딩 12px | `spacing.3` | `--vds-spacing-3` |
| `px-3.5` | 1 | 좌우 패딩 14px | `spacing.3_5` | `--vds-spacing-3_5` |
| `px-4` | 3 | 좌우 패딩 16px | `spacing.4` | `--vds-spacing-4` |
| `px-6` | 16 | 좌우 패딩 24px | `spacing.6` | `--vds-spacing-6` |
| `px-8` | 1 | 좌우 패딩 32px | `spacing.8` | `--vds-spacing-8` |
| `py-0.5` | 3 | 상하 패딩 2px | `spacing.0_5` | `--vds-spacing-0_5` |
| `py-1` | 3 | 상하 패딩 4px | `spacing.1` | `--vds-spacing-1` |
| `py-1.5` | 12 | 상하 패딩 6px | `spacing.1_5` | `--vds-spacing-1_5` |
| `py-10` | 1 | 상하 패딩 40px | `spacing.10` | `--vds-spacing-10` |
| `py-2` | 12 | 상하 패딩 8px | `spacing.2` | `--vds-spacing-2` |
| `py-2.5` | 10 | 상하 패딩 10px | `spacing.2_5` | `--vds-spacing-2_5` |
| `py-3` | 14 | 상하 패딩 12px | `spacing.3` | `--vds-spacing-3` |
| `py-4` | 4 | 상하 패딩 16px | `spacing.4` | `--vds-spacing-4` |
| `py-6` | 2 | 상하 패딩 24px | `spacing.6` | `--vds-spacing-6` |
| `ring-zinc-700/30` | 1 | 포커스 링 중립 30% | `theme.border-focus + opacity.30` | `--vds-theme-border-focus` |
| `rounded-[1px]` | 1 | 초미세 코너 반경 | `radius.xs` | `--vds-radius-xs` |
| `rounded-[28px]` | 7 | 모달 반경 | `exp.girok-redesign.radius.modal` | `--vds-exp-girok-redesign-radius-modal` |
| `rounded-[52px]` | 1 | 디바이스 프레임 반경 | `exp.girok-redesign.radius.device-frame` | `--vds-exp-girok-redesign-radius-device-frame` |
| `rounded-2xl` | 8 | 대형 반경 | `radius.2xl` | `--vds-radius-2xl` |
| `rounded-3xl` | 3 | 대형+ 반경 | `exp.girok-redesign.radius.sheet` | `--vds-exp-girok-redesign-radius-sheet` |
| `rounded-full` | 25 | 완전 pill 반경 | `radius.full` | `--vds-radius-full` |
| `rounded-lg` | 21 | 표준 카드 반경 | `radius.lg` | `--vds-radius-lg` |
| `rounded-md` | 4 | 컴팩트 반경 | `radius.md` | `--vds-radius-md` |
| `rounded-sm` | 1 | 소형 반경 | `radius.sm` | `--vds-radius-sm` |
| `rounded-xl` | 49 | 확장 카드 반경 | `radius.xl` | `--vds-radius-xl` |
| `shadow-[0_-10px_40px_rgba(0,0,0,0.8)]` | 1 | 강한 상단 오버레이 그림자 | `shadow.6` | `--vds-shadow-6` |
| `shadow-[0_-2px_8px_rgba(251,191,36,0.5)]` | 1 | 탭 언더라인 glow | `exp.girok-redesign.nav.tab-underline-glow` | `--vds-exp-girok-redesign-nav-tab-underline-glow` |
| `shadow-[0_-5px_15px_rgba(0,0,0,0.5)]` | 1 | 보조 상단 그림자 | `shadow.5` | `--vds-shadow-5` |
| `shadow-[0_0_10px_rgba(245,158,11,0.3)]` | 1 | 앰버 포커스 glow | `exp.girok.shadow.glow.warning` | `--vds-exp-girok-shadow-glow-warning` |
| `shadow-[0_0_10px_rgba(251,191,36,0.5)]` | 1 | 앰버 강조 glow | `exp.girok.shadow.glow.accent` | `--vds-exp-girok-shadow-glow-accent` |
| `shadow-[0_0_15px_rgba(16,185,129,0.4)]` | 1 | 수입 버튼 glow | `exp.girok-redesign.shadow.glow.income` | `--vds-exp-girok-redesign-shadow-glow-income` |
| `shadow-[0_0_30px_rgba(251,191,36,0.15)]` | 1 | 모달 소프트 glow | `exp.girok-redesign.shadow.glow.modal-soft` | `--vds-exp-girok-redesign-shadow-glow-modal-soft` |
| `shadow-[0_0_8px_rgba(16,185,129,0.4)]` | 1 | 짧은 수입 glow | `exp.girok-redesign.shadow.glow.income` | `--vds-exp-girok-redesign-shadow-glow-income` |
| `shadow-2xl` | 5 | 대형 그림자 | `shadow.6` | `--vds-shadow-6` |
| `shadow-lg` | 4 | 대형 카드 그림자 | `shadow.4` | `--vds-shadow-4` |
| `shadow-md` | 4 | 중형 그림자 | `shadow.3` | `--vds-shadow-3` |
| `shadow-sm` | 7 | 소형 그림자 | `shadow.2` | `--vds-shadow-2` |
| `text-[10px]` | 94 | 캡션/배지 폰트 | `exp.girok-redesign.font-size.caption` | `--vds-exp-girok-redesign-font-size-caption` |
| `text-[11px]` | 22 | 마이크로 라벨 폰트 | `exp.girok-redesign.font-size.micro` | `--vds-exp-girok-redesign-font-size-micro` |
| `text-[12px]` | 2 | 기존 캡션 폰트 | `font.size.xs` | `--vds-font-size-xs` |
| `text-[13px]` | 10 | 컴팩트 본문 폰트 | `exp.girok-redesign.font-size.body-sm` | `--vds-exp-girok-redesign-font-size-body-sm` |
| `text-[15px]` | 4 | 메뉴 폰트 | `exp.girok-redesign.font-size.menu` | `--vds-exp-girok-redesign-font-size-menu` |
| `text-[8px]` | 4 | 초미세 라벨 폰트 | `exp.girok-redesign.font-size.caption` | `--vds-exp-girok-redesign-font-size-caption` |
| `text-[9px]` | 26 | 초소형 라벨 폰트 | `exp.girok-redesign.font-size.caption` | `--vds-exp-girok-redesign-font-size-caption` |
| `text-amber-400` | 32 | 활성 탭 텍스트 | `exp.girok-redesign.nav.tab-active` | `--vds-exp-girok-redesign-nav-tab-active` |
| `text-amber-500` | 17 | 활성 네비/CTA 텍스트 | `exp.girok-redesign.nav.bottom-active` | `--vds-exp-girok-redesign-nav-bottom-active` |
| `text-amber-500/10` | 1 | 약한 앰버 텍스트 | `theme.primary + opacity.10` | `--vds-theme-primary` |
| `text-amber-500/80` | 1 | 강한 앰버 텍스트 | `theme.primary + opacity.80` | `--vds-theme-primary` |
| `text-blue-400` | 3 | 토요일/정보 텍스트 | `exp.girok-redesign.calendar.weekend-sat` | `--vds-exp-girok-redesign-calendar-weekend-sat` |
| `text-blue-500` | 2 | 정보 강조 텍스트 | `theme.status.info` | `--vds-theme-status-info` |
| `text-emerald-400` | 11 | 수입/성공 텍스트 | `exp.girok-redesign.stats.income-text` | `--vds-exp-girok-redesign-stats-income-text` |
| `text-emerald-500` | 2 | 성공 CTA 텍스트 | `theme.status.success` | `--vds-theme-status-success` |
| `text-indigo-400` | 1 | 인디고 정보 텍스트 | `exp.girok-redesign.icon.info-strong` | `--vds-exp-girok-redesign-icon-info-strong` |
| `text-rose-400` | 15 | 지출 텍스트 | `exp.girok-redesign.stats.expense-text` | `--vds-exp-girok-redesign-stats-expense-text` |
| `text-rose-500` | 6 | 파괴적 액션 텍스트 | `theme.status.error` | `--vds-theme-status-error` |
| `text-zinc-100` | 22 | 최상위 역전 텍스트 | `theme.text.primary` | `--vds-theme-text-primary` |
| `text-zinc-200` | 10 | 보조 역전 텍스트 | `theme.text.secondary` | `--vds-theme-text-secondary` |
| `text-zinc-300` | 19 | 보조 설명 텍스트 | `theme.text-secondary` | `--vds-theme-text-secondary` |
| `text-zinc-400` | 29 | 중립 비활성 텍스트 | `exp.girok-redesign.nav.bottom-inactive` | `--vds-exp-girok-redesign-nav-bottom-inactive` |
| `text-zinc-500` | 60 | 깊은 중립 텍스트 | `color-slate-7` | `--vds-color-slate-7` |
| `text-zinc-600` | 3 | 강한 중립 텍스트 | `color-slate-6` | `--vds-color-slate-6` |
| `text-zinc-950` | 1 | 거의 검정 텍스트 | `theme.text.primary` | `--vds-theme-text-primary` |
| `to-[#12110E]` | 1 | 다크 그라데이션 종단 | `exp.girok-redesign.shell.content-surface` | `--vds-exp-girok-redesign-shell-content-surface` |
| `to-[#14120E]` | 1 | 카드 그라데이션 종단 | `exp.girok-redesign.surface.card-subtle` | `--vds-exp-girok-redesign-surface-card-subtle` |
| `to-[#1A1813]` | 1 | 툴바 그라데이션 종단 | `exp.girok-redesign.surface.toolbar` | `--vds-exp-girok-redesign-surface-toolbar` |
| `to-amber-400` | 1 | 앰버 그라데이션 종단 | `exp.girok-redesign.nav.tab-active` | `--vds-exp-girok-redesign-nav-tab-active` |

Notes:
- `exp.girok-redesign.toggle.active-bg` is a semantic alias of `exp.girok.bg.segmented-active`.
- `exp.girok-redesign.shadow.glow.modal-soft` is a semantic alias of `exp.girok.shadow.glow.warning-soft`.
- Font sizes `caption`, `micro`, `body-sm`, and `menu` are redesign-specific because canonical primitive typography does not provide 10px, 11px, 13px, or 15px steps.
