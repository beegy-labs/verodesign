import * as React from 'react';
import { cx, extractSlottedChildren, focusRing } from './_internal.js';

type MenuContextValue = { close: () => void; onSelect?: ((event: CustomEvent<{ value: string }>) => void) | undefined };
const MenuContext = React.createContext<MenuContextValue | null>(null);

export interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  open?: boolean;
  placement?: 'bottom-start' | 'bottom-end';
  onSelect?: ((event: CustomEvent<{ value: string }>) => void) | undefined;
}
export interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
  disabled?: boolean;
  tone?: 'default' | 'destructive';
  'data-tone'?: 'default' | 'destructive';
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>(function Menu(
  { open: openProp, placement = 'bottom-start', onSelect, children, style, ...rest },
  ref,
) {
  const [open, setOpen] = React.useState(Boolean(openProp));
  const triggerRef = React.useRef<HTMLElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  React.useEffect(() => { if (openProp != null) setOpen(openProp); }, [openProp]);
  React.useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node) && !triggerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    return () => document.removeEventListener('mousedown', onPointer);
  }, [open]);
  const { slotted: trigger, rest: items } = extractSlottedChildren(children, 'trigger');
  return (
    <MenuContext.Provider value={{ close: () => setOpen(false), onSelect }}>
      <div {...rest} ref={ref} style={{ display: 'inline-block', position: 'relative', fontFamily: 'var(--vds-font-family-sans)', ...style }}>
        {trigger[0] && React.isValidElement(trigger[0]) ? React.cloneElement(trigger[0] as React.ReactElement<any>, {
          ref: (node: HTMLElement | null) => { triggerRef.current = node; },
          'aria-haspopup': 'menu',
          'aria-expanded': open,
          onClick: (event: React.MouseEvent) => {
            triggerRef.current = event.currentTarget as unknown as HTMLElement;
            setOpen((value) => !value);
            (trigger[0] as React.ReactElement<any>).props.onClick?.(event);
          },
          onKeyDown: (event: React.KeyboardEvent) => {
            if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setOpen(true); }
            if (event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); }
            (trigger[0] as React.ReactElement<any>).props.onKeyDown?.(event);
          },
        }) : null}
        {open ? <div ref={menuRef} role="menu" style={{ position: 'absolute', top: '100%', left: placement === 'bottom-start' ? 0 : 'auto', right: placement === 'bottom-end' ? 0 : 'auto', marginTop: 'var(--vds-spacing-1)', minWidth: '12rem', background: 'var(--vds-theme-bg-elevated)', color: 'var(--vds-theme-text-primary)', border: 'var(--vds-border-width-1) solid var(--vds-theme-border-subtle)', borderRadius: 'var(--vds-radius-md)', boxShadow: 'var(--vds-shadow-3)', padding: 'var(--vds-spacing-1)', zIndex: 'var(--vds-zindex-dropdown)', display: 'flex', flexDirection: 'column', gap: 'var(--vds-spacing-0_5)' }}>{items}</div> : null}
      </div>
    </MenuContext.Provider>
  );
});

export const MenuItem = React.forwardRef<HTMLButtonElement, MenuItemProps>(function MenuItem(
  { value = '', disabled = false, tone, 'data-tone': toneAttr, style, onClick, ...rest },
  ref,
) {
  const context = React.useContext(MenuContext);
  const resolvedTone = toneAttr ?? tone ?? 'default';
  return (
    <button
      {...rest}
      ref={ref}
      type="button"
      role="menuitem"
      disabled={disabled}
      onClick={(event) => {
        if (disabled) return;
        context?.onSelect?.(new CustomEvent('vds-select', { detail: { value } }));
        context?.close();
        onClick?.(event);
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--vds-spacing-2)',
        padding: 'var(--vds-spacing-2) var(--vds-spacing-3)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
        color: resolvedTone === 'destructive' ? 'var(--vds-theme-destructive)' : 'var(--vds-theme-text-primary)',
        borderRadius: 'var(--vds-radius-sm)',
        fontSize: 'var(--vds-type-role-label-size)',
        background: 'transparent',
        border: 'none',
        textAlign: 'left',
        opacity: disabled ? 0.5 : 1,
        ...focusRing,
        outline: 'none',
        ...style,
      }}
    />
  );
});
