import * as React from 'react';
import { cx } from './_internal.js';

type BadgeVariant = 'solid' | 'soft' | 'outline';
type BadgeTone = 'primary' | 'accent' | 'neutral' | 'destructive' | 'success' | 'warning' | 'info';
type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  tone?: BadgeTone;
  size?: BadgeSize;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = 'soft', tone = 'neutral', size = 'md', className, children, style, ...rest },
  ref,
) {
  const tones: Record<BadgeTone, { solid: [string, string]; soft: [string, string]; outline: string }> = {
    primary: { solid: ['var(--vds-theme-primary)', 'var(--vds-theme-primary-fg)'], soft: ['color-mix(in oklab, var(--vds-theme-primary) 15%, transparent)', 'var(--vds-theme-primary)'], outline: 'var(--vds-theme-primary)' },
    accent: { solid: ['var(--vds-theme-accent)', 'var(--vds-theme-accent-fg)'], soft: ['color-mix(in oklab, var(--vds-theme-accent) 15%, transparent)', 'var(--vds-theme-accent)'], outline: 'var(--vds-theme-accent)' },
    neutral: { solid: ['var(--vds-theme-neutral)', 'var(--vds-theme-neutral-fg)'], soft: ['var(--vds-theme-bg-muted)', 'var(--vds-theme-text-primary)'], outline: 'var(--vds-theme-border-default)' },
    destructive: { solid: ['var(--vds-theme-destructive)', 'var(--vds-theme-destructive-fg)'], soft: ['var(--vds-theme-error-bg)', 'var(--vds-theme-destructive)'], outline: 'var(--vds-theme-destructive)' },
    success: { solid: ['var(--vds-theme-success)', 'var(--vds-theme-success-fg)'], soft: ['var(--vds-theme-success-bg)', 'var(--vds-theme-success)'], outline: 'var(--vds-theme-success)' },
    warning: { solid: ['var(--vds-theme-warning)', 'var(--vds-theme-warning-fg)'], soft: ['var(--vds-theme-warning-bg)', 'var(--vds-theme-warning)'], outline: 'var(--vds-theme-warning)' },
    info: { solid: ['var(--vds-theme-info)', 'var(--vds-theme-info-fg)'], soft: ['var(--vds-theme-info-bg)', 'var(--vds-theme-info)'], outline: 'var(--vds-theme-info)' },
  };
  const palette = tones[tone];
  return (
    <span
      {...rest}
      ref={ref}
      className={cx('vds-inline-flex vds-items-center', className)}
      data-variant={variant}
      data-tone={tone}
      data-size={size}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--vds-spacing-1)',
        verticalAlign: 'middle',
        fontFamily: 'var(--vds-font-family-sans)',
        fontWeight: 'var(--vds-type-role-label-weight)',
        lineHeight: '1',
        whiteSpace: 'nowrap',
        borderRadius: 'var(--vds-radius-full)',
        border: 'var(--vds-border-width-1) solid transparent',
        padding: size === 'sm' ? 'calc(var(--vds-spacing-0_5) / 2) var(--vds-spacing-2)' : 'var(--vds-spacing-1) var(--vds-spacing-2_5)',
        fontSize: size === 'sm' ? 'var(--vds-type-role-caption-size)' : 'var(--vds-type-role-label-size)',
        minHeight: size === 'sm' ? 'calc(var(--vds-spacing-4) + var(--vds-spacing-0_5))' : 'calc(var(--vds-spacing-6))',
        ...(variant === 'solid' ? { background: palette.solid[0], color: palette.solid[1] } : null),
        ...(variant === 'soft' ? { background: palette.soft[0], color: palette.soft[1] } : null),
        ...(variant === 'outline' ? { color: tone === 'neutral' ? 'var(--vds-theme-text-primary)' : palette.outline, borderColor: palette.outline } : null),
        ...style,
      }}
    >
      {children}
    </span>
  );
});
