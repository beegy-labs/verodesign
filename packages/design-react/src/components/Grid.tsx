import * as React from 'react';
import { spacing } from './_internal.js';
type Cols = '1' | '2' | '3' | '4' | '5' | '6' | '12';
type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8';
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> { cols?: Cols; gap?: Gap; }
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(function Grid({ cols = '1', gap = '0', style, ...rest }, ref) {
  return <div {...rest} ref={ref} style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: spacing[gap], ...style }} />;
});
