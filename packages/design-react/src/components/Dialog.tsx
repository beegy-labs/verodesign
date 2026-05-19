import * as React from 'react';
import { createPortal } from 'react-dom';
import { cx, extractSlottedChildren, focusRing, mergeRefs } from './_internal.js';

type DialogSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type DialogPlacement = 'center' | 'bottom';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  size?: DialogSize;
  placement?: DialogPlacement;
  closeOnBackdrop?: boolean;
  'close-on-backdrop'?: boolean;
  closeOnEscape?: boolean;
  'close-on-escape'?: boolean;
  onOpen?: ((event: CustomEvent<void>) => void) | undefined;
  onClose?: ((event: CustomEvent<void>) => void) | undefined;
}

const dialogWidths: Record<DialogSize, string> = { sm: '24rem', md: '32rem', lg: '48rem', xl: '56rem', '2xl': '72rem' };
const focusableSelector = 'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])';
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const safeAreaBottom = 'env(safe-area-inset-bottom, var(--vds-spacing-0))';

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(function Dialog(
  { open = false, size = 'md', placement = 'center', closeOnBackdrop = true, 'close-on-backdrop': closeOnBackdropAttr, closeOnEscape = true, 'close-on-escape': closeOnEscapeAttr, onOpen, onClose, className, children, style, ...rest },
  ref,
) {
  const panelRef = React.useRef<HTMLDivElement | null>(null);
  const titleId = React.useId();
  const { slotted: titleSlot, rest: titleRest } = extractSlottedChildren(children, 'title');
  const { slotted: footerSlot, rest: bodyNodes } = extractSlottedChildren(titleRest, 'footer');
  const backdropEnabled = closeOnBackdropAttr ?? closeOnBackdrop;
  const escapeEnabled = closeOnEscapeAttr ?? closeOnEscape;
  const isBottom = placement === 'bottom';
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    const mediaQuery = window.matchMedia(reducedMotionQuery);
    const update = () => setReduceMotion(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, []);

  React.useEffect(() => { if (open) onOpen?.(new CustomEvent('vds-open')); }, [open, onOpen]);
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && escapeEnabled) onClose?.(new CustomEvent('vds-close'));
      if (event.key !== 'Tab' || !panelRef.current) return;
      const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector)).filter((node) => !node.hasAttribute('disabled'));
      const first = nodes[0] ?? panelRef.current;
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); (last ?? panelRef.current).focus(); }
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
        background: 'var(--vds-theme-scrim)',
        backdropFilter: 'blur(var(--vds-blur-lg))',
        WebkitBackdropFilter: 'blur(var(--vds-blur-lg))',
        display: 'flex',
        alignItems: isBottom ? 'flex-end' : 'center',
        justifyContent: 'center',
        padding: isBottom
          ? `var(--vds-spacing-4) var(--vds-spacing-4) calc(var(--vds-spacing-4) + ${safeAreaBottom})`
          : 'var(--vds-spacing-4)',
        zIndex: 'var(--vds-zindex-modal)',
      }}
    >
      <div
        {...rest}
        ref={(node) => { panelRef.current = node; mergeRefs(ref, node); }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleSlot.length ? titleId : undefined}
        tabIndex={-1}
        className={cx('vds-dialog', className)}
        style={{
          background: 'var(--vds-theme-bg-elevated)',
          color: 'var(--vds-theme-text-primary)',
          borderRadius: isBottom ? 'var(--vds-radius-lg) var(--vds-radius-lg) 0 0' : 'var(--vds-radius-lg)',
          boxShadow: 'var(--vds-shadow-5, var(--vds-elevation-3))',
          maxWidth: isBottom ? 'none' : `min(${dialogWidths[size]}, 100%)`,
          width: '100%',
          maxHeight: isBottom ? 'calc(100dvh - var(--vds-spacing-20))' : 'calc(100dvh - 2rem)',
          display: 'flex',
          flexDirection: 'column',
          outline: 'none',
          transform: isBottom ? (open ? 'translateY(0)' : `translateY(calc(var(--vds-spacing-12) + ${safeAreaBottom}))`) : undefined,
          transition: reduceMotion ? 'none' : (isBottom ? 'transform var(--vds-duration-medium) var(--vds-easing-ease-out)' : undefined),
          ...style,
        }}
      >
        {isBottom ? <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'var(--vds-spacing-6)', paddingTop: 'var(--vds-spacing-2)' }}><div style={{ width: 'var(--vds-spacing-12)', height: 'var(--vds-spacing-1)', borderRadius: 'var(--vds-radius-full)', background: 'var(--vds-theme-border-subtle)' }} /></div> : null}
        {titleSlot.length ? <div style={{ padding: isBottom ? 'var(--vds-spacing-2) var(--vds-spacing-5) var(--vds-spacing-4)' : 'var(--vds-spacing-4) var(--vds-spacing-5)', borderBottom: 'var(--vds-border-width-1) solid var(--vds-theme-border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--vds-spacing-3)' }}><div id={titleId} style={{ margin: 0, fontFamily: 'var(--vds-font-family-sans)', fontSize: 'var(--vds-type-role-title-size)', fontWeight: 'var(--vds-type-role-title-weight)', lineHeight: 'var(--vds-font-lineheight-tight)' }}>{titleSlot}</div><button type="button" aria-label="Close dialog" onClick={() => onClose?.(new CustomEvent('vds-close'))} style={{ all: 'unset', cursor: 'pointer', padding: 'var(--vds-spacing-1)', borderRadius: 'var(--vds-radius-sm)', color: 'var(--vds-theme-text-dim)', ...focusRing }}>×</button></div> : null}
        <div style={{ padding: 'var(--vds-spacing-4) var(--vds-spacing-5)', flex: 1, overflowY: 'auto' }}>{bodyNodes}</div>
        {footerSlot.length ? <div style={{ padding: 'var(--vds-spacing-4) var(--vds-spacing-5)', borderTop: 'var(--vds-border-width-1) solid var(--vds-theme-border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--vds-spacing-2)' }}>{footerSlot}</div> : null}
      </div>
    </div>,
    document.body,
  );
});
