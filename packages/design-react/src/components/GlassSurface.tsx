import * as React from 'react';

export type GlassStrength = 'subtle' | 'base' | 'strong';

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  strength?: GlassStrength;
}

function getGlassTokens(strength: GlassStrength) {
  switch (strength) {
    case 'subtle':
      return { blur: 'var(--vds-blur-sm)', elevation: 'var(--vds-elevation-2)', alpha: '70%' };
    case 'strong':
      return { blur: 'var(--vds-blur-lg)', elevation: 'var(--vds-elevation-4)', alpha: '55%' };
    case 'base':
    default:
      return { blur: 'var(--vds-blur-md)', elevation: 'var(--vds-elevation-3)', alpha: '62%' };
  }
}

export function GlassSurface({
  children,
  strength = 'base',
  style,
  ...props
}: GlassSurfaceProps) {
  const t = getGlassTokens(strength);
  return (
    <div
      {...props}
      style={{
        background: `color-mix(in srgb, var(--vds-theme-bg-card) ${t.alpha}, transparent)`,
        color: 'var(--vds-theme-text-primary)',
        border: '1px solid color-mix(in srgb, var(--vds-theme-border-default) 60%, transparent)',
        boxShadow: t.elevation,
        backdropFilter: `blur(${t.blur})`,
        WebkitBackdropFilter: `blur(${t.blur})`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

