import * as React from 'react';
import { createPortal } from 'react-dom';
import { cx, extractSlottedChildren, focusRing, mergeRefs } from './_internal.js';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  size?: DialogSize;
  closeOnBackdrop?: boolean;
  'close-on-backdrop'?: boolean;
  closeOnEscape?: boolean;
  'close-on-escape'?: boolean;
  onOpen?: ((event: CustomEvent<void>) => void) | undefined;
  onClose?: ((event: CustomEvent<void>) => void) | undefined;
}

const dialogWidths: Record<DialogSize, string> = { sm: '24rem', md: '32rem', lg: '48rem', xl: '56rem', '2xl': '72rem' };
const focusableSelector = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { open = false, size = 'md', closeOnBackdrop = true, 'close-on-backdrop': closeOnBackdropAttr, closeOnEscape = true, 'close-on-escape': closeOnEscapeAttr, onOpen, onClose, className, children, style, ...rest },
  ref,
) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const titleId = React.useId();
  const { slotted: titleSlot, rest: titleRest } = extractSlottedChildren(children, 'title');
  const { slotted: footerSlot, rest: bodyNodes } = extractSlottedChildren(titleRest, 'footer');
  const backdropEnabled = closeOnBackdropAttr ?? closeOnBackdrop;
  const escapeEnabled = closeOnEscapeAttr ?? closeOnEscape;
  React.useEffect(() => { if (open) onOpen?.(new CustomEvent('vds-open')); }, [open, onOpen]);
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(focusableSelector);
    firstFocusable?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && escapeEnabled) onClose?.(new CustomEvent('vds-close'));
      if (event.key !== 'Tab' || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector)).filter((node) => !node.hasAttribute('disabled'));
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', onKeyDown); };
  }, [escapeEnabled, onClose, open]);
  if (!open) return null;
  return createPortal(
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && backdropEnabled) onClose?.(new CustomEvent('vds-close'));
      }}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'color-mix(in oklab, var(--vds-theme-text-primary) 50%, transparent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--vds-spacing-4)',
        zIndex: 'var(--vds-zindex-modal)',
      }}
    >
      <div
        {...rest}
        ref={(node) => { panelRef.current = node; mergeRefs(ref, node); }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleSlot.length ? titleId : undefined}
        className={cx('vds-dialog', className)}
        style={{
          background: 'var(--vds-theme-bg-elevated)',
          color: 'var(--vds-theme-text-primary)',
          borderRadius: 'var(--vds-radius-lg)',
          boxShadow: 'var(--vds-shadow-5, var(--vds-elevation-3))',
          maxWidth: `min(${dialogWidths[size]}, 100%)`,
          width: '100%',
          maxHeight: 'calc(100dvh - 2rem)',
          display: 'flex',
          flexDirection: 'column',
          outline: 'none',
          ...style,
        }}
      >
        {titleSlot.length ? <div style={{ padding: 'var(--vds-spacing-4) var(--vds-spacing-5)', borderBottom: 'var(--vds-border-width-1) solid var(--vds-theme-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--vds-spacing-3)' }}><div id={titleId} style={{ margin: 0, fontFamily: 'var(--vds-font-family-sans)', fontSize: 'var(--vds-type-role-title-size)', fontWeight: 'var(--vds-type-role-title-weight)', lineHeight: 'var(--vds-font-lineheight-tight)' }}>{titleSlot}</div><button type="button" aria-label="Close dialog" onClick={() => onClose?.(new CustomEvent('vds-close'))} style={{ all: 'unset', cursor: 'pointer', padding: 'var(--vds-spacing-1)', borderRadius: 'var(--vds-radius-sm)', color: 'var(--vds-theme-text-dim)', ...focusRing }}>×</button></div> : null}
        <div style={{ padding: 'var(--vds-spacing-4) var(--vds-spacing-5)', flex: 1, overflowY: 'auto' }}>{bodyNodes}</div>
        {footerSlot.length ? <div style={{ padding: 'var(--vds-spacing-4) var(--vds-spacing-5)', borderTop: 'var(--vds-border-width-1) solid var(--vds-theme-border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--vds-spacing-2)' }}>{footerSlot}</div> : null}
      </div>
    </div>,
    document.body,
  );
});
