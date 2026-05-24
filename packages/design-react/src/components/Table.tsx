import * as React from 'react';
type Density = 'compact' | 'normal' | 'comfortable';
export interface TableProps extends React.HTMLAttributes<HTMLDivElement> { density?: Density; }
export const Table = React.forwardRef<HTMLDivElement, TableProps>(function Table({ density = 'normal', children, style, ...rest }, ref) {
  return <div {...rest} ref={ref} style={{ display: 'block', width: '100%', overflowX: 'auto', ...style }}><table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--vds-font-family-sans)', fontSize: density === 'compact' ? 'var(--vds-type-role-caption-size)' : density === 'comfortable' ? 'var(--vds-type-role-body-size)' : 'var(--vds-type-role-label-size)', color: 'var(--vds-theme-text-primary)', background: 'var(--vds-theme-bg-card)' }}>{children}</table></div>;
});
