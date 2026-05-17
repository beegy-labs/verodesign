import * as React from 'react';
import { spacing } from './_internal.js';
type Direction = 'column' | 'row';
type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8';
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export interface StackProps extends React.HTMLAttributes<HTMLDivElement> { direction?: Direction; gap?: Gap; align?: Align; justify?: Justify; wrap?: boolean; }
export const Stack = React.forwardRef<HTMLDivElement, StackProps>(function Stack({ direction = 'column', gap = '0', align, justify, wrap = false, style, ...rest }, ref) {
  const alignMap = { start: 'flex-start', center: 'center', end: 'flex-end', stretch: 'stretch', baseline: 'baseline' } as const;
  const justifyMap = { start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between', around: 'space-around', evenly: 'space-evenly' } as const;
  return <div {...rest} ref={ref} style={{ display: 'flex', flexDirection: direction, flexWrap: wrap ? 'wrap' : undefined, gap: spacing[gap], alignItems: align ? alignMap[align] : undefined, justifyContent: justify ? justifyMap[justify] : undefined, ...style }} />;
});
