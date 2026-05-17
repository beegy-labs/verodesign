import * as React from 'react';
import { spacing } from './_internal.js';
type Size = '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';
type Axis = 'horizontal' | 'vertical';
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> { axis?: Axis; size?: Size; grow?: boolean; }
export const Spacer = React.forwardRef<HTMLDivElement, SpacerProps>(function Spacer({ axis = 'vertical', size, grow = false, style, ...rest }, ref) {
  return <div {...rest} ref={ref} style={{ display: 'block', flexShrink: 0, flexGrow: grow ? 1 : undefined, width: axis === 'horizontal' && size ? spacing[size] : undefined, height: axis === 'vertical' && size ? spacing[size] : undefined, ...style }} />;
});
