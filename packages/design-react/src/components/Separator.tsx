import * as React from 'react';
type Orientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: Orientation;
  decorative?: boolean;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = 'horizontal', decorative = true, style, ...rest },
  ref,
) {
  return <div {...rest} ref={ref} role={decorative ? 'presentation' : 'separator'} aria-orientation={decorative ? undefined : orientation} style={{ display: 'block', flexShrink: 0, background: 'var(--vds-theme-border-subtle)', width: orientation === 'horizontal' ? '100%' : 'var(--vds-border-width-1)', height: orientation === 'horizontal' ? 'var(--vds-border-width-1)' : 'auto', alignSelf: orientation === 'vertical' ? 'stretch' : undefined, ...style }} />;
});
