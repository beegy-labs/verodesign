// © vero 2026. Verodesign icon component.
// SVG path data derived from Lucide (https://lucide.dev), ISC licensed.
import * as React from 'react';

type IconSize = 'sm' | 'md' | 'lg' | number;

export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  size?: IconSize;
  strokeWidth?: number;
}

function toAttributeSize(size: IconSize | undefined) {
  if (typeof size === 'number') return String(size);
  return size;
}

export function createIcon(name: string) {
  return React.forwardRef<HTMLElement, IconProps>(function VdsNamedIcon(
    { size = 'md', strokeWidth, ...rest },
    ref,
  ) {
    return React.createElement('vds-icon', {
      ...rest,
      ref,
      name,
      size: toAttributeSize(size),
      'stroke-width': strokeWidth,
    });
  });
}
