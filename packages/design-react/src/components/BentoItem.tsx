import * as React from 'react';

type ColSpan = 1 | 2 | 3 | 4;
type RowSpan = 1 | 2 | 3;

export interface BentoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  colSpan?: ColSpan;
  rowSpan?: RowSpan;
}

export function BentoItem({
  children,
  colSpan = 2,
  rowSpan = 1,
  style,
  ...props
}: BentoItemProps) {
  return (
    <div
      {...props}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
        minWidth: 0,
        borderRadius: 'var(--vds-radius-lg)',
        background: 'var(--vds-theme-bg-card)',
        color: 'var(--vds-theme-text-primary)',
        border: '1px solid var(--vds-theme-border-default)',
        boxShadow: 'var(--vds-elevation-2)',
        padding: 'var(--vds-spacing-4)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

