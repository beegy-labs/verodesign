import * as React from 'react';

type ButtonVariant = 'solid' | 'tonal' | 'ghost' | 'soft' | 'outline';
type ButtonTone = 'primary' | 'accent' | 'neutral' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'type'> {
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  name?: string;
  value?: string;
  ariaLabelText?: string | null;
  fullWidth?: boolean;
  'full-width'?: boolean;
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

function pickToneStyles(tone: ButtonTone, variant: 'solid' | 'tonal' | 'ghost'): React.CSSProperties {
  const solidMap = {
    primary: ['var(--vds-theme-primary)', 'var(--vds-theme-primary-fg)'],
    accent: ['var(--vds-theme-accent)', 'var(--vds-theme-accent-fg)'],
    neutral: ['var(--vds-theme-neutral)', 'var(--vds-theme-neutral-fg)'],
    destructive: ['var(--vds-theme-destructive)', 'var(--vds-theme-destructive-fg)'],
  } as const;

  const surfaceMap = {
    primary: 'var(--vds-theme-primary)',
    accent: 'var(--vds-theme-accent)',
    neutral: 'var(--vds-theme-text-primary)',
    destructive: 'var(--vds-theme-destructive)',
  } as const;

  if (variant === 'solid') {
    const [background, color] = solidMap[tone];
    return { background, color };
  }

  if (variant === 'tonal') {
    if (tone === 'neutral') {
      return {
        background: 'var(--vds-theme-bg-selected)',
        color: 'var(--vds-theme-text-primary)',
        borderColor: 'var(--vds-theme-border-subtle)',
        boxShadow: 'var(--vds-elevation-1)',
      };
    }

    return {
      background: `color-mix(in oklch, ${surfaceMap[tone]} 14%, var(--vds-theme-bg-card))`,
      color: surfaceMap[tone],
      borderColor: `color-mix(in oklch, ${surfaceMap[tone]} 22%, var(--vds-theme-border-subtle))`,
      boxShadow: 'var(--vds-elevation-1)',
    };
  }

  return {
    background: 'transparent',
    color: surfaceMap[tone],
    borderColor: 'transparent',
  };
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'solid',
    tone = 'primary',
    size = 'md',
    type = 'button',
    disabled = false,
    loading = false,
    name,
    value,
    ariaLabelText = null,
    fullWidth,
    'full-width': fullWidthAttr,
    className,
    children,
    style,
    onClick,
    ...rest
  },
  ref,
) {
  const reducedMotion = useReducedMotion();
  const resolvedVariant: 'solid' | 'tonal' | 'ghost' =
    variant === 'soft' || variant === 'outline' ? 'tonal' : variant;
  const isFullWidth = fullWidth ?? fullWidthAttr ?? false;
  const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
    sm: {
      padding: 'var(--vds-spacing-1_5) var(--vds-spacing-3)',
      fontSize: 'var(--vds-type-role-label-size)',
      minHeight: 'calc(var(--vds-spacing-8))',
    },
    md: {
      padding: 'var(--vds-spacing-2) var(--vds-spacing-4)',
      fontSize: 'var(--vds-type-role-body-size)',
      minHeight: 'calc(var(--vds-spacing-10))',
    },
    lg: {
      padding: 'var(--vds-spacing-3) var(--vds-spacing-5)',
      fontSize: 'var(--vds-type-role-title-size)',
      minHeight: 'calc(var(--vds-spacing-12))',
    },
  };

  return (
    <button
      {...rest}
      ref={ref}
      type={type}
      name={name}
      value={value}
      disabled={disabled || loading}
      aria-label={ariaLabelText ?? rest['aria-label']}
      className={['vds-inline-flex vds-items-center vds-justify-center', className]
        .filter(Boolean)
        .join(' ')}
      data-variant={variant}
      data-visual-variant={resolvedVariant}
      data-tone={tone}
      data-size={size}
      data-loading={loading || undefined}
      style={{
        all: 'unset',
        boxSizing: 'border-box',
        display: isFullWidth ? 'inline-flex' : 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        gap: 'var(--vds-spacing-2)',
        width: isFullWidth ? '100%' : undefined,
        fontFamily: 'var(--vds-font-family-sans)',
        fontWeight: 'var(--vds-type-role-body-weight)',
        lineHeight: 'var(--vds-type-role-body-lineheight)',
        whiteSpace: 'nowrap',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        verticalAlign: 'middle',
        borderRadius: 'var(--vds-radius-md)',
        border: 'var(--vds-border-width-1) solid transparent',
        boxShadow: resolvedVariant === 'solid' || resolvedVariant === 'tonal' ? 'var(--vds-elevation-1)' : 'var(--vds-elevation-0)',
        opacity: disabled || loading ? 'var(--vds-opacity-disabled)' : undefined,
        transition: reducedMotion
          ? 'none'
          : 'background-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), border-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), box-shadow var(--vds-motion-duration-fast) var(--vds-motion-easing-standard), transform var(--vds-motion-duration-fast) var(--vds-motion-easing-standard)',
        transform: loading ? 'none' : undefined,
        ...sizeStyles[size],
        ...pickToneStyles(tone, resolvedVariant),
        ...(resolvedVariant === 'ghost'
          ? { boxShadow: 'var(--vds-elevation-0)' }
          : null),
        ...(disabled || loading
          ? {
              background:
                resolvedVariant === 'ghost' ? 'transparent' : 'var(--vds-theme-state-disabled)',
              color: 'var(--vds-theme-text-dim)',
              borderColor:
                resolvedVariant === 'ghost'
                  ? 'transparent'
                  : 'var(--vds-theme-border-subtle)',
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
