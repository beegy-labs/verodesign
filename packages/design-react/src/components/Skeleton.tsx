import * as React from 'react';
type Shape = 'rect' | 'circle' | 'text';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> { shape?: Shape; }

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { shape = 'rect', style, ...rest },
  ref,
) {
  return <div {...rest} ref={ref} style={{ display: 'block', background: 'linear-gradient(90deg, var(--vds-theme-bg-muted) 0%, var(--vds-theme-bg-hover) 50%, var(--vds-theme-bg-muted) 100%)', backgroundSize: '200% 100%', borderRadius: shape === 'circle' ? 'var(--vds-radius-full)' : shape === 'text' ? 'var(--vds-radius-sm)' : 'var(--vds-radius-md)', width: shape === 'circle' ? 'var(--vds-spacing-10)' : '100%', height: shape === 'circle' ? 'var(--vds-spacing-10)' : 'var(--vds-spacing-4)', aspectRatio: shape === 'circle' ? '1' : undefined, ...style }} />;
});
