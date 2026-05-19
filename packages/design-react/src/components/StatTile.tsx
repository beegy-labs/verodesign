import * as React from 'react';

type DeltaTone = 'positive' | 'negative' | 'neutral';
type StatTone = 'default' | 'success' | 'warning' | 'error';

export interface StatTileProps extends React.HTMLAttributes<HTMLElement> {
  label?: string;
  value?: string;
  delta?: string;
  hint?: string;
  deltaTone?: DeltaTone;
  tone?: StatTone;
}

function extractIcon(children: React.ReactNode) {
  let icon: React.ReactNode = null;
  const rest: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (!icon && React.isValidElement<{ slot?: string }>(child) && child.props.slot === 'icon') {
      icon = child;
      return;
    }
    rest.push(child);
  });

  return { icon, rest };
}

export const StatTile = React.forwardRef<HTMLElement, StatTileProps>(function StatTile(
  {
    label = '',
    value = '',
    delta,
    hint,
    deltaTone = 'neutral',
    tone = 'default',
    className,
    children,
    style,
    ...rest
  },
  ref,
) {
  const { icon, rest: bodyChildren } = extractIcon(children);

  const valueColor =
    tone === 'success'
      ? 'var(--vds-theme-success)'
      : tone === 'warning'
        ? 'var(--vds-theme-warning)'
        : tone === 'error'
          ? 'var(--vds-theme-destructive)'
          : 'var(--vds-theme-text-bright)';

  const deltaColor =
    deltaTone === 'positive'
      ? 'var(--vds-theme-success)'
      : deltaTone === 'negative'
        ? 'var(--vds-theme-destructive)'
        : 'var(--vds-theme-text-secondary)';

  return (
    <section
      {...rest}
      ref={ref}
      className={['vds-flex vds-flex-col', className].filter(Boolean).join(' ')}
      data-tone={tone}
      data-delta-tone={deltaTone}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--vds-spacing-1)',
        padding: 'var(--vds-spacing-4) var(--vds-spacing-5)',
        background: 'var(--vds-theme-bg-card)',
        border: 'var(--vds-border-width-1) solid var(--vds-theme-border-default)',
        borderRadius: 'var(--vds-radius-lg)',
        ...style,
      }}
    >
      <div
        className="vds-stat-tile-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--vds-spacing-2)',
        }}
      >
        <span
          className="vds-stat-tile-label"
          style={{ fontSize: 'var(--vds-type-role-caption-size)', color: 'var(--vds-theme-text-secondary)' }}
        >
          {label}
        </span>
        {icon ? (
          <span className="vds-stat-tile-icon" style={{ display: 'flex', color: 'var(--vds-theme-text-faint)' }}>
            {icon}
          </span>
        ) : null}
      </div>
      <span
        className="vds-stat-tile-value"
        style={{
          fontSize: 'var(--vds-type-role-metric-size)',
          fontWeight: 'var(--vds-type-role-metric-weight)',
          color: valueColor,
          lineHeight: 'var(--vds-type-role-metric-lineheight)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </span>
      {(delta || hint) && (
        <div
          className="vds-stat-tile-meta"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 'var(--vds-spacing-2)',
            flexWrap: 'wrap',
          }}
        >
          {delta ? (
            <span
              className="vds-stat-tile-delta"
              style={{
                fontSize: 'var(--vds-type-role-caption-size)',
                fontWeight: 'var(--vds-type-role-label-weight)',
                color: deltaColor,
              }}
            >
              {delta}
            </span>
          ) : null}
          {hint ? (
            <span
              className="vds-stat-tile-hint"
              style={{ fontSize: 'var(--vds-type-role-caption-size)', color: 'var(--vds-theme-text-secondary)' }}
            >
              {hint}
            </span>
          ) : null}
        </div>
      )}
      {bodyChildren.length > 0 ? bodyChildren : null}
    </section>
  );
});
