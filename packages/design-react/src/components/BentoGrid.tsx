import * as React from 'react';

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  columns?: 2 | 4;
}

export function BentoGrid({ children, columns = 4, style, ...props }: BentoGridProps) {
  return (
    <div
      {...props}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: 'var(--vds-spacing-3)',
        alignItems: 'stretch',
        minWidth: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
