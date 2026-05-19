import * as React from 'react';
type Variant = 'default' | 'padded' | 'section' | 'inset' | 'divided';
type Radius = 'lg' | 'xl';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  radius?: Radius;
  borderless?: boolean;
}

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(function Surface(
  { variant = 'default', radius = 'xl', borderless = false, style, ...rest },
  ref,
) {
  return <div {...rest} ref={ref} style={{ display: variant === 'section' ? 'flex' : 'block', flexDirection: variant === 'section' ? 'column' : undefined, gap: variant === 'section' ? 'var(--vds-spacing-4)' : undefined, background: 'var(--vds-theme-bg-card)', borderRadius: radius === 'lg' ? 'var(--vds-radius-lg)' : 'var(--vds-radius-xl)', border: borderless ? undefined : 'var(--vds-border-width-1) solid var(--vds-theme-border-default)', padding: variant === 'padded' || variant === 'section' ? 'var(--vds-spacing-5)' : undefined, overflow: variant === 'inset' ? 'hidden' : undefined, ...style }} />;
});
