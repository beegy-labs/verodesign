import * as React from 'react';

type IconButtonVariant = 'ghost' | 'tonal' | 'soft' | 'outline';
type IconButtonTone = 'neutral' | 'primary' | 'destructive';
type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'type'> {
  variant?: IconButtonVariant;
  tone?: IconButtonTone;
  size?: IconButtonSize;
  disabled?: boolean;
  ariaLabelText?: string | null;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia?.(reducedMotionQuery);
    if (!media) return;
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener?.('change', sync);
    return () => media.removeEventListener?.('change', sync);
  }, []);

  return reduced;
}

function getVariantStyles(variant: 'ghost' | 'tonal', tone: IconButtonTone): React.CSSProperties {
  if (variant === 'tonal') {
    if (tone === 'neutral') {
      return {
        background: 'var(--vds-theme-bg-selected)',
        border: 'var(--vds-border-width-1) solid var(--vds-theme-border-subtle)',
        boxShadow: 'var(--vds-elevation-1)',
      };
    }

    const color = tone === 'primary' ? 'var(--vds-theme-primary)' : 'var(--vds-theme-destructive)';
    return {
      background: `color-mix(in oklch, ${color} 14%, var(--vds-theme-bg-card))`,
      color,
      border: `var(--vds-border-width-1) solid color-mix(in oklch, ${color} 22%, var(--vds-theme-border-subtle))`,
      boxShadow: 'var(--vds-elevation-1)',
    };
  }

  if (tone === 'primary') return { color: 'var(--vds-theme-primary)' };
  if (tone === 'destructive') return { color: 'var(--vds-theme-destructive)' };
  return {};
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    variant = 'ghost',
    tone = 'neutral',
    size = 'md',
    disabled = false,
    ariaLabelText = null,
    className,
    children,
    style,
    onClick,
    ...rest
  },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const resolvedVariant: 'ghost' | 'tonal' = variant === 'soft' || variant === 'outline' ? 'tonal' : variant;
  const sizeStyles: Record<IconButtonSize, React.CSSProperties> = {
    sm: { padding: 'var(--vds-spacing-1)', fontSize: 'var(--vds-type-role-label-size)' },
    md: { padding: 'var(--vds-spacing-1_5)', fontSize: 'var(--vds-type-role-body-size)' },
    lg: { padding: 'var(--vds-spacing-2)', fontSize: 'var(--vds-type-role-title-size)' },
  };

  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      disabled={disabled}
      aria-label={ariaLabelText ?? rest['aria-label']}
      className={['vds-inline-flex vds-items-center vds-justify-center', className]
        .filter(Boolean)
        .join(' ')}
      data-variant={variant}
      data-visual-variant={resolvedVariant}
      data-tone={tone}
      data-size={size}
      style={{
        all: 'unset',
        boxSizing: 'border-box',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        verticalAlign: 'middle',
        borderRadius: 'var(--vds-radius-md)',
        color: 'var(--vds-theme-text-secondary)',
        opacity: disabled ? 'var(--vds-opacity-disabled)' : undefined,
        boxShadow: resolvedVariant === 'ghost' ? 'var(--vds-elevation-0)' : 'var(--vds-elevation-1)',
        transition: reducedMotion
          ? 'none'
          : 'background-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), border-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), box-shadow var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), transform var(--vds-motion-duration-fast) var(--vds-motion-easing-standard)',
        ...sizeStyles[size],
        ...getVariantStyles(resolvedVariant, tone),
        ...(disabled
          ? {
              background: resolvedVariant === 'ghost' ? 'transparent' : 'var(--vds-theme-state-disabled)',
              color: 'var(--vds-theme-text-dim)',
              border:
                resolvedVariant === 'ghost'
                  ? undefined
                  : 'var(--vds-border-width-1) solid var(--vds-theme-border-subtle)',
              boxShadow: 'var(--vds-elevation-0)',
            }
          : null),
        ...style,
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
});
