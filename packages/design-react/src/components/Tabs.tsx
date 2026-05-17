import * as React from 'react';

type TabsOrientation = 'horizontal' | 'vertical';
type TabsActivation = 'auto' | 'manual';

type TabsContextValue = {
  value: string;
  orientation: TabsOrientation;
  setActive: (value: string, focus?: boolean) => void;
  activation: TabsActivation;
  registerTab: (value: string, ref: HTMLButtonElement | null, disabled: boolean) => void;
  activeIndex: (value: string) => number;
  tabId: (value: string) => string;
  panelId: (value: string) => string;
};

const TabsContext = React.createContext<TabsContextValue | null>(null);

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string;
  activation?: TabsActivation;
  orientation?: TabsOrientation;
  onChange?: ((event: CustomEvent<{ value: string }>) => void) | undefined;
}

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  disabled?: boolean;
}

export interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    value = '',
    activation = 'auto',
    orientation = 'horizontal',
    onChange,
    className,
    children,
    style,
    ...rest
  },
  ref,
) {
  const generatedId = React.useId();
  const tabRefs = React.useRef(new Map<string, { ref: HTMLButtonElement | null; disabled: boolean }>());
  const [internalValue, setInternalValue] = React.useState(value);
  const currentValue = value || internalValue;
  const orderedValues = React.Children.toArray(children)
    .filter((child): child is React.ReactElement<TabProps> => React.isValidElement(child) && child.type === Tab)
    .map((child) => child.props.value ?? '');

  React.useEffect(() => {
    if (value) setInternalValue(value);
  }, [value]);

  const registerTab = React.useCallback((tabValue: string, tabRef: HTMLButtonElement | null, disabled: boolean) => {
    tabRefs.current.set(tabValue, { ref: tabRef, disabled });
  }, []);

  const activeIndex = React.useCallback((tabValue: string) => orderedValues.indexOf(tabValue), [orderedValues]);

  const setActive = React.useCallback(
    (nextValue: string, focus = true) => {
      setInternalValue(nextValue);
      onChange?.(new CustomEvent('vds-change', { detail: { value: nextValue } }));
      if (focus) queueMicrotask(() => tabRefs.current.get(nextValue)?.ref?.focus());
    },
    [onChange],
  );

  const context = React.useMemo<TabsContextValue>(
    () => ({
      value: currentValue,
      orientation,
      setActive,
      activation,
      registerTab,
      activeIndex,
      tabId: (tabValue) => `${generatedId}-tab-${tabValue}`,
      panelId: (tabValue) => `${generatedId}-panel-${tabValue}`,
    }),
    [activation, activeIndex, currentValue, generatedId, orientation, registerTab, setActive],
  );

  const tabs: React.ReactNode[] = [];
  const panels: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) {
      panels.push(child);
      return;
    }
    if (child.type === Tab) tabs.push(child);
    else panels.push(child);
  });

  return (
    <TabsContext.Provider value={context}>
      <div
        {...rest}
        ref={ref}
        className={['vds-block', className].filter(Boolean).join(' ')}
        data-orientation={orientation}
        style={{
          display: orientation === 'vertical' ? 'grid' : 'block',
          gridTemplateColumns: orientation === 'vertical' ? 'auto 1fr' : undefined,
          gap: orientation === 'vertical' ? 'var(--vds-spacing-4)' : undefined,
          fontFamily: 'var(--vds-font-family-sans)',
          color: 'var(--vds-theme-text-primary)',
          ...style,
        }}
      >
        <div
          role="tablist"
          aria-orientation={orientation}
          className="vds-tabs-list"
          style={{
            display: 'flex',
            flexDirection: orientation === 'vertical' ? 'column' : 'row',
            gap: 'var(--vds-spacing-1)',
            borderBottom:
              orientation === 'horizontal'
                ? 'var(--vds-border-width-1) solid var(--vds-theme-border-subtle)'
                : undefined,
            borderRight:
              orientation === 'vertical'
                ? 'var(--vds-border-width-1) solid var(--vds-theme-border-subtle)'
                : undefined,
            overflowX: orientation === 'horizontal' ? 'auto' : 'visible',
            scrollbarWidth: 'thin',
          }}
        >
          {tabs}
        </div>
        <div className="vds-tabs-panels">{panels}</div>
      </div>
    </TabsContext.Provider>
  );
});

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value = '', disabled = false, className, children, onClick, onKeyDown, style, ...rest },
  ref,
) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');
  const tabsContext = context;

  const localRef = React.useRef<HTMLButtonElement | null>(null);
  React.useImperativeHandle(ref, () => localRef.current as HTMLButtonElement, []);

  React.useEffect(() => {
    tabsContext.registerTab(value, localRef.current, disabled);
  }, [disabled, tabsContext, value]);

  const isActive = tabsContext.value === value || (!tabsContext.value && tabsContext.activeIndex(value) === 0);
  function move(nextDirection: -1 | 1) {
    const tabs = Array.from((document.getElementById(tabsContext.tabId(value))?.closest('[role="tablist"]')?.querySelectorAll('[role="tab"]') ?? []))
      .filter((node): node is HTMLButtonElement => node instanceof HTMLButtonElement && node.getAttribute('aria-disabled') !== 'true');
    const index = tabs.findIndex((node) => node.id === tabsContext.tabId(value));
    if (index < 0) return;
    const next = tabs[(index + nextDirection + tabs.length) % tabs.length];
    if (!next) return;
    if (tabsContext.activation === 'auto' && next.dataset.value) tabsContext.setActive(next.dataset.value, true);
    else next.focus();
  }

  return (
    <button
      {...rest}
      ref={(node) => {
        localRef.current = node;
        if (typeof ref === 'function') ref(node);
      }}
      id={tabsContext.tabId(value)}
      type="button"
      role="tab"
      data-value={value}
      aria-selected={isActive}
      aria-controls={tabsContext.panelId(value)}
      aria-disabled={disabled || undefined}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      className={['vds-inline-flex vds-items-center', className].filter(Boolean).join(' ')}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--vds-spacing-1_5)',
        padding: 'var(--vds-spacing-2) var(--vds-spacing-4)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        color: isActive ? 'var(--vds-theme-primary)' : 'var(--vds-theme-text-dim)',
        border: 'none',
        borderBottom:
          context.orientation === 'horizontal'
            ? `2px solid ${isActive ? 'var(--vds-theme-primary)' : 'transparent'}`
            : 'none',
        background: 'transparent',
        fontSize: 'var(--vds-type-role-label-size)',
        fontWeight: 'var(--vds-type-role-label-weight)',
        opacity: disabled ? 0.5 : 1,
        transition:
          'color var(--vds-duration-fast) var(--vds-easing-ease-out), border-color var(--vds-duration-fast) var(--vds-easing-ease-out)',
        ...style,
      }}
      onClick={(event) => {
        if (!disabled) context.setActive(value);
        onClick?.(event);
      }}
      onKeyDown={(event) => {
          const previousKey = tabsContext.orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
          const nextKey = tabsContext.orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
        if (event.key === previousKey) {
          event.preventDefault();
          move(-1);
        } else if (event.key === nextKey) {
          event.preventDefault();
          move(1);
        } else if (event.key === 'Home') {
          event.preventDefault();
          const first = document.getElementById(tabsContext.tabId(value))?.closest('[role="tablist"]')?.querySelector<HTMLButtonElement>('[role="tab"]');
          first?.focus();
          if (tabsContext.activation === 'auto' && first?.dataset.value) tabsContext.setActive(first.dataset.value, false);
        } else if (event.key === 'End') {
          event.preventDefault();
          const tabNodes = document.getElementById(tabsContext.tabId(value))?.closest('[role="tablist"]')?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
          const last = tabNodes?.[tabNodes.length - 1];
          last?.focus();
          if (tabsContext.activation === 'auto' && last?.dataset.value) tabsContext.setActive(last.dataset.value, false);
        } else if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          if (!disabled) tabsContext.setActive(value);
        }
        onKeyDown?.(event);
      }}
    >
      {children}
    </button>
  );
});

export const TabPanel = React.forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { value = '', className, children, style, ...rest },
  ref,
) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');
  const tabsContext = context;
  const isActive = tabsContext.value === value || (!tabsContext.value && tabsContext.activeIndex(value) === 0);

  return (
    <div
      {...rest}
      ref={ref}
      id={tabsContext.panelId(value)}
      role="tabpanel"
      aria-labelledby={tabsContext.tabId(value)}
      aria-hidden={!isActive}
      hidden={!isActive}
      tabIndex={0}
      className={['vds-block', className].filter(Boolean).join(' ')}
      style={{
        display: isActive ? 'block' : 'none',
        padding: 'var(--vds-spacing-4) 0',
        ...style,
      }}
    >
      {children}
    </div>
  );
});
