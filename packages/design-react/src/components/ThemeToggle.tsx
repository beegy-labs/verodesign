import * as React from 'react';

export type ThemeMode = 'auto' | 'light' | 'dark';

export interface ThemeToggleProps {
  value: ThemeMode;
  onChange: (mode: ThemeMode) => void;
  compact?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const ORDER: ThemeMode[] = ['auto', 'light', 'dark'];
const LABEL: Record<ThemeMode, string> = { auto: 'Auto', light: 'Light', dark: 'Dark' };
const ICON: Record<ThemeMode, string> = { auto: '◐', light: '☀', dark: '☾' };

function nextByDelta(value: ThemeMode, delta: -1 | 1) {
  const idx = ORDER.indexOf(value);
  const next = (idx + delta + ORDER.length) % ORDER.length;
  return ORDER[next] ?? 'auto';
}

export function ThemeToggle({
  value,
  onChange,
  compact = false,
  size = 'md',
  className,
}: ThemeToggleProps) {
  const refs = React.useRef<Record<ThemeMode, HTMLButtonElement | null>>({
    auto: null,
    light: null,
    dark: null,
  });

  const paddingBlock = size === 'sm' ? 'var(--vds-spacing-1)' : 'var(--vds-spacing-2)';
  const paddingInline = size === 'sm' ? 'var(--vds-spacing-2)' : 'var(--vds-spacing-3)';
  const radius = 'var(--vds-radius-full)';

  const baseButtonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--vds-spacing-2)',
    padding: `${paddingBlock} ${paddingInline}`,
    borderRadius: radius,
    border: 'var(--vds-border-width-sm, thin) solid var(--vds-theme-border-default)',
    background: 'transparent',
    color: 'var(--vds-theme-text-primary)',
    cursor: 'pointer',
    userSelect: 'none',
    minWidth: compact ? 'auto' : '8ch',
  };

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const delta: -1 | 1 = e.key === 'ArrowLeft' ? -1 : 1;
    const next = nextByDelta(value, delta);
    onChange(next);
    queueMicrotask(() => refs.current[next]?.focus());
  }

  return (
    <div
      role="radiogroup"
      aria-label="Theme mode"
      className={className}
      onKeyDown={onKeyDown}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--vds-spacing-1)',
        padding: 'var(--vds-spacing-1)',
        borderRadius: radius,
        background: 'var(--vds-theme-bg-card)',
        border: 'var(--vds-border-width-sm, thin) solid var(--vds-theme-border-default)',
      }}
    >
      {ORDER.map((mode) => {
        const active = value === mode;
        return (
          <button
            key={mode}
            ref={(el) => {
              refs.current[mode] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(mode)}
            style={{
              ...baseButtonStyle,
              background: active ? 'var(--vds-theme-primary)' : 'transparent',
              color: active ? 'var(--vds-theme-primary-fg)' : 'var(--vds-theme-text-primary)',
              borderColor: active ? 'var(--vds-theme-primary)' : 'var(--vds-theme-border-default)',
            }}
          >
            <span aria-hidden="true" style={{ fontSize: size === 'sm' ? '1rem' : '1.1rem' }}>
              {ICON[mode]}
            </span>
            {compact ? null : <span style={{ fontWeight: 'var(--vds-type-role-title-weight)' }}>{LABEL[mode]}</span>}
          </button>
        );
      })}
    </div>
  );
}
