import * as React from 'react';
import { spacing } from './_internal.js';
type Gap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8';
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> { gap?: Gap; align?: Align; justify?: Justify; nowrap?: boolean; }
export const Cluster = React.forwardRef<HTMLDivElement, ClusterProps>(function Cluster({ gap = '2', align, justify, nowrap = false, style, ...rest }, ref) {
  const alignMap = { start: 'flex-start', center: 'center', end: 'flex-end', stretch: 'stretch', baseline: 'baseline' } as const;
  const justifyMap = { start: 'flex-start', center: 'center', end: 'flex-end', between: 'space-between', around: 'space-around', evenly: 'space-evenly' } as const;
  return <div {...rest} ref={ref} style={{ display: 'flex', flexDirection: 'row', flexWrap: nowrap ? 'nowrap' : 'wrap', alignItems: align ? alignMap[align] : 'center', justifyContent: justify ? justifyMap[justify] : undefined, gap: spacing[gap], ...style }} />;
});
