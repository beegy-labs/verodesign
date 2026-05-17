import * as React from 'react';

export interface AppShellProps {
  header?: React.ReactNode;
  bottomNav?: React.ReactNode;
  children?: React.ReactNode;
}

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const safeAreaTop = 'var(--vds-safe-area-top, env(safe-area-inset-top))';
const safeAreaBottom = 'var(--vds-safe-area-bottom, env(safe-area-inset-bottom))';

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

function mergeStyle(
  style: React.CSSProperties | undefined,
  additions: React.CSSProperties,
): React.CSSProperties {
  return {
    ...style,
    ...additions,
  };
}

function normalizeBottomNav(bottomNav: React.ReactNode): React.ReactNode {
  if (!React.isValidElement(bottomNav)) return bottomNav;
  const rootElement = bottomNav as React.ReactElement<{
    children?: React.ReactNode;
    style?: React.CSSProperties;
  }>;

  const rootProps = rootElement.props as {
    children?: React.ReactNode;
    style?: React.CSSProperties;
  };

  const normalizedChildren = React.Children.map(rootProps.children, (child) => {
    if (!React.isValidElement(child)) return child;
    const childElement = child as React.ReactElement<{ style?: React.CSSProperties }>;
    const childProps = childElement.props as { style?: React.CSSProperties };
    return React.cloneElement(childElement, {
      style: mergeStyle(childProps.style, {
        flex: '1 1 0',
        minWidth: '0',
        display: 'flex',
        justifyContent: 'center',
      }),
    });
  });

  return React.cloneElement(rootElement, {
    style: mergeStyle(rootProps.style, {
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'space-between',
      gap: 'var(--vds-spacing-1)',
      width: '100%',
      minWidth: '0',
      minHeight: 'var(--vds-app-shell-bottom-nav-height)',
    }),
    children: normalizedChildren,
  });
}

export function AppShell({ header, bottomNav, children }: AppShellProps) {
  const reducedMotion = useReducedMotion();

  return (
    <>
      {/* position:fixed pins viewport regions. Prohibited black-screen pattern is nested overflow scroll containers, which this component does not create. */}
      {header ? (
        <div
          data-vds-app-shell="header"
          style={{
            position: 'fixed',
            insetInline: '0',
            top: '0',
            zIndex: 'var(--vds-zindex-app-shell)',
            minHeight: `calc(var(--vds-app-shell-header-height) + ${safeAreaTop})`,
            paddingTop: safeAreaTop,
            background: 'var(--vds-theme-bg-elevated)',
            borderBottom: 'var(--vds-border-width-1) solid var(--vds-theme-border-subtle)',
            boxShadow: 'var(--vds-elevation-1)',
          }}
        >
          {header}
        </div>
      ) : null}
      {bottomNav ? (
        <div
          data-vds-app-shell="bottom-nav"
          style={{
            position: 'fixed',
            insetInline: '0',
            bottom: '0',
            zIndex: 'var(--vds-zindex-app-shell)',
            minHeight: `calc(var(--vds-app-shell-bottom-nav-height) + ${safeAreaBottom})`,
            paddingBottom: safeAreaBottom,
            background: 'var(--vds-theme-bg-elevated)',
            borderTop: 'var(--vds-border-width-1) solid var(--vds-theme-border-subtle)',
            boxShadow: 'var(--vds-elevation-1)',
            transition: reducedMotion
              ? 'none'
              : 'transform var(--vds-motion-duration-fast) var(--vds-motion-easing-standard)',
          }}
        >
          <div
            style={{
              minHeight: 'var(--vds-app-shell-bottom-nav-height)',
              paddingInline: 'var(--vds-spacing-2)',
              width: '100%',
              minWidth: '0',
            }}
          >
            {normalizeBottomNav(bottomNav)}
          </div>
        </div>
      ) : null}
      <div
        data-vds-app-shell="content"
        style={{
          minHeight: '100dvh',
          paddingTop: header
            ? `calc(var(--vds-app-shell-header-height) + ${safeAreaTop})`
            : undefined,
          paddingBottom: bottomNav
            ? `calc(var(--vds-app-shell-bottom-nav-height) + ${safeAreaBottom})`
            : undefined,
        }}
      >
        {children}
      </div>
    </>
  );
}
