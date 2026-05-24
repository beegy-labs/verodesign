import * as React from 'react';
type Align = 'left' | 'center' | 'right';
export interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> { align?: Align; compact?: boolean; dim?: boolean; colspan?: number; }
export const Th = React.forwardRef<HTMLTableCellElement, ThProps>(function Th({ align = 'left', compact = false, dim = false, colspan, style, ...rest }, ref) {
  return <th {...rest} ref={ref} colSpan={colspan ?? 1} style={{ paddingBlock: compact ? 'var(--vds-spacing-2)' : 'var(--vds-spacing-3)', paddingInline: 'var(--vds-spacing-4)', fontWeight: 'var(--vds-font-weight-500)', color: dim ? 'var(--vds-theme-text-secondary)' : 'var(--vds-theme-text-primary)', textAlign: align, ...style }} />;
});
