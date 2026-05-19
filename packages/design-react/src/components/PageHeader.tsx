import * as React from 'react';

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  heading?: string;
  subtitle?: string;
}

function partitionChildren(children: React.ReactNode) {
  const leading: React.ReactNode[] = [];
  const actions: React.ReactNode[] = [];
  const rest: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement<{ slot?: string }>(child) && child.props.slot === 'leading') {
      leading.push(child);
      return;
    }
    if (React.isValidElement<{ slot?: string }>(child) && child.props.slot === 'actions') {
      actions.push(child);
      return;
    }
    rest.push(child);
  });

  return { leading, actions, rest };
}

export const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(function PageHeader(
  { heading, subtitle, className, children, style, ...rest },
  ref,
) {
  const { leading, actions, rest: bodyChildren } = partitionChildren(children);

  return (
    <header
      {...rest}
      ref={ref}
      className={['vds-flex', className].filter(Boolean).join(' ')}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 'var(--vds-spacing-4)',
        ...style,
      }}
    >
      {leading.length > 0 ? leading : null}
      <div
        className="vds-page-header-body"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--vds-spacing-1)',
          flex: 1,
          minWidth: 0,
        }}
      >
        <h1
          className="vds-page-header-title"
          style={{
            margin: 0,
            fontSize: 'var(--vds-type-role-title-size)',
            fontWeight: 'var(--vds-type-role-title-weight)',
            lineHeight: 'var(--vds-type-role-title-lineheight)',
            color: 'var(--vds-theme-text-bright)',
          }}
        >
          {heading ?? ''}
        </h1>
        {subtitle ? (
          <p
            className="vds-page-header-subtitle"
            style={{ margin: 0, fontSize: 'var(--vds-type-role-label-size)', color: 'var(--vds-theme-text-secondary)' }}
          >
            {subtitle}
          </p>
        ) : null}
        {bodyChildren.length > 0 ? bodyChildren : null}
      </div>
      {actions.length > 0 ? (
        <div
          className="vds-page-header-actions"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 'var(--vds-spacing-2)',
            flexShrink: 0,
          }}
        >
          {actions}
        </div>
      ) : null}
    </header>
  );
});
