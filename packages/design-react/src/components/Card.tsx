import * as React from 'react';

type CardElevation = '0' | '1' | '2' | '3' | '4' | '5';
type CardVariant = 'surface' | 'outline' | 'ghost';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: CardVariant;
  elevation?: CardElevation;
}

function partitionCardChildren(children: React.ReactNode) {
  const header: React.ReactNode[] = [];
  const body: React.ReactNode[] = [];
  const footer: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement<{ slot?: string }>(child) && child.props.slot === 'header') {
      header.push(child);
      return;
    }
    if (React.isValidElement<{ slot?: string }>(child) && child.props.slot === 'footer') {
      footer.push(child);
      return;
    }
    body.push(child);
  });

  return { header, body, footer };
}

export const Card = React.forwardRef<HTMLElement, CardProps>(function Card(
  { variant = 'surface', elevation = '0', className, children, style, ...rest },
  ref,
) {
  const { header, body, footer } = partitionCardChildren(children);
  const shadow = elevation === '0' ? 'var(--vds-elevation-0)' : `var(--vds-elevation-${elevation})`;

  return (
    <section
      {...rest}
      ref={ref}
      className={['vds-block', className].filter(Boolean).join(' ')}
      data-variant={variant}
      data-elevation={elevation}
      style={{
        display: 'block',
        background: variant === 'ghost' ? 'transparent' : 'var(--vds-theme-bg-card)',
        color: 'var(--vds-theme-text-primary)',
        borderRadius: 'var(--vds-radius-lg)',
        overflow: 'hidden',
        border:
          variant === 'outline'
            ? 'var(--vds-border-width-1) solid var(--vds-theme-border-default)'
            : undefined,
        boxShadow: shadow,
        ...style,
      }}
    >
      {header.length > 0 ? (
        <div
          className="vds-card-header"
          style={{
            padding: 'var(--vds-spacing-4)',
            borderBottom: 'var(--vds-border-width-1) solid var(--vds-theme-border-subtle)',
          }}
        >
          {header}
        </div>
      ) : null}
      <div className="vds-card-body" style={{ padding: 'var(--vds-spacing-4)' }}>
        {body}
      </div>
      {footer.length > 0 ? (
        <div
          className="vds-card-footer"
          style={{
            padding: 'var(--vds-spacing-4)',
            borderTop: 'var(--vds-border-width-1) solid var(--vds-theme-border-subtle)',
            background: 'var(--vds-theme-bg-page)',
          }}
        >
          {footer}
        </div>
      ) : null}
    </section>
  );
});
