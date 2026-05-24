import * as React from 'react';
import { createPortal } from 'react-dom';

import { Button } from './Button.js';
import { GlassSurface } from './GlassSurface.js';

export interface EntryDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  onConfirm: () => void | Promise<void>;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmDisabled?: boolean;
  destructive?: boolean;
}

export function EntryDialog({
  open,
  onClose,
  title,
  description,
  children,
  onConfirm,
  confirmLabel = '확인',
  cancelLabel = '취소',
  confirmDisabled = false,
  destructive = false,
}: EntryDialogProps) {
  if (!open) return null;
  const [entered, setEntered] = React.useState(false);
  const safeCancelLabel = cancelLabel?.trim() ? cancelLabel : '취소';
  const safeConfirmLabel = confirmLabel?.trim() ? confirmLabel : '확인';

  const titleId = React.useId();
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    setEntered(false);
    const id = requestAnimationFrame(() => setEntered(true));
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      cancelAnimationFrame(id);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background:
          'color-mix(in srgb, var(--vds-theme-scrim, var(--vds-theme-text-primary)) 55%, transparent)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--vds-spacing-4)',
        paddingBottom: 'calc(var(--vds-spacing-4) + env(safe-area-inset-bottom))',
        opacity: entered || reduceMotion ? 1 : 0,
        transition: reduceMotion
          ? 'none'
          : 'opacity var(--vds-motion-duration-base) var(--vds-motion-easing-standard)',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <GlassSurface
          strength="base"
          style={{
            width: 'min(28rem, calc(100vw - 2 * var(--vds-spacing-4)))',
            maxHeight:
              'calc(100dvh - var(--vds-spacing-8) - env(safe-area-inset-bottom))',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 'var(--vds-radius-lg)',
            opacity: entered || reduceMotion ? 1 : 0,
            transform:
              entered || reduceMotion
                ? 'translate3d(0, 0, 0) scale(1)'
                : 'translate3d(0, 6px, 0) scale(0.98)',
            transition: reduceMotion
              ? 'none'
              : 'opacity var(--vds-motion-duration-base) var(--vds-motion-easing-standard), transform var(--vds-motion-duration-base) var(--vds-motion-easing-decelerate)',
          }}
        >
          <header
            style={{
              padding: 'var(--vds-spacing-4) var(--vds-spacing-5)',
              borderBottom:
                'var(--vds-border-width-sm, thin) solid var(--vds-theme-border-subtle, var(--vds-theme-border-default))',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--vds-spacing-1)',
            }}
          >
            <strong id={titleId} style={{ fontSize: 'var(--vds-type-role-title-size)', fontWeight: 'var(--vds-type-role-title-weight)' }}>
              {title}
            </strong>
            {description ? (
              <span style={{ fontSize: 'var(--vds-type-role-label-size)', color: 'var(--vds-theme-text-secondary)' }}>
                {description}
              </span>
            ) : null}
          </header>

          <div
            style={{
              flex: 1,
              minHeight: 0,
              overflowY: 'auto',
              padding: 'var(--vds-spacing-4) var(--vds-spacing-5)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--vds-spacing-3)',
            }}
          >
            {children}
          </div>

          <footer
            style={{
              padding: 'var(--vds-spacing-4) var(--vds-spacing-5)',
              paddingBottom: 'calc(var(--vds-spacing-4) + env(safe-area-inset-bottom))',
              borderTop:
                'var(--vds-border-width-sm, thin) solid var(--vds-theme-border-subtle, var(--vds-theme-border-default))',
              display: 'flex',
              gap: 'var(--vds-spacing-2)',
            }}
          >
            <Button tone="neutral" variant="outline" style={{ flex: 1 }} onClick={onClose}>
              {safeCancelLabel}
            </Button>
            <Button
              tone={destructive ? 'destructive' : 'primary'}
              style={{ flex: 2 }}
              disabled={confirmDisabled}
              onClick={onConfirm}
            >
              {safeConfirmLabel}
            </Button>
          </footer>
        </GlassSurface>
      </div>
    </div>,
    document.body,
  );
}
