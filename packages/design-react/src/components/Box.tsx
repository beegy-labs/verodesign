import * as React from 'react';
import { spacing } from './_internal.js';

type Spacing = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8' | '10' | '12' | '16';
type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  p?: Spacing;
  px?: Spacing;
  py?: Spacing;
  maxWidth?: MaxWidth;
  'max-width'?: MaxWidth;
  inline?: boolean;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(function Box(
  { p, px, py, maxWidth, 'max-width': maxWidthAttr, inline = false, style, ...rest },
  ref,
) {
  const resolvedMaxWidth = maxWidth ?? maxWidthAttr;
  const maxWidthMap: Record<MaxWidth, string> = {
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    full: '100%',
  };
  return (
    <div
      {...rest}
      ref={ref}
      style={{
        display: inline ? 'inline-block' : 'block',
        padding: p ? spacing[p] : undefined,
        paddingInline: px ? spacing[px] : undefined,
        paddingBlock: py ? spacing[py] : undefined,
        maxWidth: resolvedMaxWidth ? maxWidthMap[resolvedMaxWidth] : undefined,
        marginInline: resolvedMaxWidth && resolvedMaxWidth !== 'full' ? 'auto' : undefined,
        ...style,
      }}
    />
  );
});
