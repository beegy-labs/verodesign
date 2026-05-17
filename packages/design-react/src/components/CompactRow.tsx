import * as React from 'react';

export interface CompactRowProps {
  leading?: React.ReactNode;
  label: React.ReactNode;
  meta?: React.ReactNode;
  trailing?: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export function CompactRow({
  leading,
  label,
  meta,
  trailing,
  onClick,
  selected = false,
  className,
}: CompactRowProps) {
  const Comp: any = onClick ? 'button' : 'div';
  return (
    <Comp
      type={onClick ? 'button' : undefined}
      className={className}
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--vds-spacing-3)',
        padding: 'var(--vds-spacing-3)',
        borderRadius: 'var(--vds-radius-lg)',
        border: 'var(--vds-border-width-sm, thin) solid var(--vds-theme-border-default)',
        background: selected ? 'var(--vds-theme-bg-selected, var(--vds-theme-bg-card))' : 'var(--vds-theme-bg-card)',
        color: 'var(--vds-theme-text-primary)',
        cursor: onClick ? 'pointer' : 'default',
        textAlign: 'left',
      }}
    >
      {leading ? <span style={{ display: 'inline-flex', flexShrink: 0 }}>{leading}</span> : null}

      <span style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 'var(--vds-spacing-1)', flex: 1 }}>
        <span
          style={{
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontWeight: 'var(--vds-type-role-title-weight)',
          }}
        >
          {label}
        </span>
        {meta ? (
          <span
            style={{
              minWidth: 0,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontSize: 'var(--vds-type-role-label-size)',
              color: 'var(--vds-theme-text-secondary)',
            }}
          >
            {meta}
          </span>
        ) : null}
      </span>

      {trailing ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--vds-spacing-2)', flexShrink: 0 }}>
          {trailing}
        </span>
      ) : null}
    </Comp>
  );
}
