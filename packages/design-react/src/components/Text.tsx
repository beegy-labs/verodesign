import * as React from 'react';
type Size = 'xs' | 'sm' | 'base' | 'lg' | 'xl';
type Tone = 'default' | 'bright' | 'dim' | 'muted' | 'primary' | 'success' | 'warning' | 'error';
type Weight = '400' | '500' | '600' | '700';
type Align = 'left' | 'center' | 'right';
type AsTag = 'p' | 'span' | 'div';
export interface TextProps extends React.HTMLAttributes<HTMLElement> { size?: Size; tone?: Tone; weight?: Weight; align?: Align; as?: AsTag; truncate?: boolean; uppercase?: boolean; mono?: boolean; tabular?: boolean; }
export const Text = React.forwardRef<HTMLElement, TextProps>(function Text({ size, tone, weight, align, as = 'p', truncate = false, uppercase = false, mono = false, tabular = false, style, ...rest }, ref) {
  const Tag = as;
  return <Tag {...rest as any} ref={ref as any} style={{ margin: 0, display: as === 'span' ? 'inline' : 'block', fontFamily: mono ? 'var(--vds-font-family-mono)' : 'var(--vds-font-family-sans)', color: tone === 'bright' ? 'var(--vds-theme-text-bright)' : tone === 'dim' ? 'var(--vds-theme-text-secondary)' : tone === 'muted' ? 'var(--vds-theme-text-faint)' : tone === 'primary' ? 'var(--vds-theme-primary)' : tone === 'success' ? 'var(--vds-theme-success)' : tone === 'warning' ? 'var(--vds-theme-warning)' : tone === 'error' ? 'var(--vds-theme-destructive)' : 'var(--vds-theme-text-primary)', fontSize: size === 'xs' ? 'var(--vds-type-role-caption-size)' : size === 'sm' ? 'var(--vds-type-role-label-size)' : size === 'lg' ? 'var(--vds-type-role-title-size)' : size === 'xl' ? 'var(--vds-type-role-metric-size)' : size === 'base' ? 'var(--vds-type-role-body-size)' : undefined, fontWeight: weight ? `var(--vds-font-weight-${weight})` : undefined, textAlign: align, overflow: truncate ? 'hidden' : undefined, textOverflow: truncate ? 'ellipsis' : undefined, whiteSpace: truncate ? 'nowrap' : undefined, textTransform: uppercase ? 'uppercase' : undefined, letterSpacing: uppercase ? '0.05em' : undefined, fontVariantNumeric: tabular ? 'tabular-nums' : undefined, ...style }} />;
});
