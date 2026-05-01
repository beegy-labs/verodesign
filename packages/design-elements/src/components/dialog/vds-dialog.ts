import { LitElement, html, css, type PropertyValues } from 'lit';
import { property, query } from 'lit/decorators.js';
import { setAriaProperty, setRole } from '../../utils/attribute-mirror.js';
import { FocusTrap } from '../../utils/focus-trap.js';

/**
 * <vds-dialog> — modal dialog (WAI-ARIA AP 1.2 Dialog Modal pattern).
 *
 * - role="dialog", aria-modal="true"
 * - Focus trapped inside while open
 * - Esc closes
 * - Backdrop click closes (unless modal)
 * - Restores focus to trigger on close
 *
 * @slot title - dialog heading
 * @slot - main content
 * @slot footer - footer (typically buttons)
 * @event vds-open - dispatched when opened
 * @event vds-close - dispatched when closed
 */
export class VdsDialog extends LitElement {
  static styles = css`
    :host {
      display: contents;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background: oklch(0% 0 0 / 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--vds-spacing-4);
      z-index: var(--vds-zindex-modal);
      opacity: 0;
      transition: opacity var(--vds-duration-medium) var(--vds-easing-ease-out);
      pointer-events: none;
    }

    :host([open]) .backdrop {
      opacity: 1;
      pointer-events: auto;
    }

    .panel {
      background: var(--vds-theme-bg-elevated);
      color: var(--vds-theme-text-primary);
      border-radius: var(--vds-radius-lg);
      box-shadow: var(--vds-shadow-5);
      max-width: min(32rem, 100%);
      width: 100%;
      max-height: calc(100dvh - 2rem);
      display: flex;
      flex-direction: column;
      transform: translateY(8px) scale(0.98);
      transition: transform var(--vds-duration-medium) var(--vds-easing-ease-out);
      outline: none;
    }

    :host([open]) .panel {
      transform: translateY(0) scale(1);
    }

    :host([data-size="lg"]) .panel { max-width: min(48rem, 100%); }
    :host([data-size="sm"]) .panel { max-width: min(24rem, 100%); }

    .header {
      padding: var(--vds-spacing-4) var(--vds-spacing-5);
      border-bottom: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--vds-spacing-3);
    }
    .title {
      font-family: var(--vds-font-family-sans);
      font-size: var(--vds-font-size-xl);
      font-weight: var(--vds-font-weight-600);
      line-height: var(--vds-font-lineheight-tight);
    }
    .close {
      all: unset;
      cursor: pointer;
      padding: var(--vds-spacing-1);
      border-radius: var(--vds-radius-sm);
      color: var(--vds-theme-text-dim);
    }
    .close:hover { background: var(--vds-theme-bg-hover); color: var(--vds-theme-text-primary); }
    .close:focus-visible { outline: 2px solid var(--vds-theme-border-focus); outline-offset: 2px; }

    .body {
      padding: var(--vds-spacing-4) var(--vds-spacing-5);
      flex: 1;
      overflow-y: auto;
    }

    .footer {
      padding: var(--vds-spacing-4) var(--vds-spacing-5);
      border-top: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      display: flex;
      justify-content: flex-end;
      gap: var(--vds-spacing-2);
    }
    .footer:has(slot[name="footer"]:empty),
    .header:has(slot[name="title"]:empty) {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .backdrop, .panel { transition: none; }
    }
  `;

  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, attribute: 'close-on-backdrop' }) closeOnBackdrop = true;
  @property({ type: Boolean, attribute: 'close-on-escape' }) closeOnEscape = true;
  @property({ type: String, attribute: 'aria-label' }) ariaLabelText: string | null = null;

  @query('.panel') private panelEl!: HTMLElement;
  private internals: ElementInternals;
  private focusTrap?: FocusTrap;
  private _titleId = `vds-dialog-title-${crypto.randomUUID().slice(0, 8)}`;

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'dialog');
    setAriaProperty(this, this.internals, 'ariaModal', true);
  }

  connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleEscape);
    this.dataset.size = this.size;
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleEscape);
    this.focusTrap?.deactivate();
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('size')) this.dataset.size = this.size;
    if (changed.has('open')) {
      if (this.open) this.handleOpen();
      else this.handleClose();
    }
    if (changed.has('ariaLabelText') && this.ariaLabelText != null) {
      setAriaProperty(this, this.internals, 'ariaLabel', this.ariaLabelText);
    }
  }

  private handleOpen(): void {
    document.body.style.overflow = 'hidden';
    this.focusTrap = new FocusTrap(this.panelEl);
    requestAnimationFrame(() => this.focusTrap?.activate());
    this.dispatchEvent(new CustomEvent('vds-open', { bubbles: true, composed: true }));
  }

  private handleClose(): void {
    document.body.style.overflow = '';
    this.focusTrap?.deactivate();
    this.dispatchEvent(new CustomEvent('vds-close', { bubbles: true, composed: true }));
  }

  private handleEscape = (e: KeyboardEvent): void => {
    if (!this.open || !this.closeOnEscape) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      this.open = false;
    }
  };

  private handleBackdropClick = (e: MouseEvent): void => {
    if (!this.closeOnBackdrop) return;
    if (e.target === e.currentTarget) {
      this.open = false;
    }
  };

  show(): void { this.open = true; }
  hide(): void { this.open = false; }

  render() {
    const titleSlot = this.shadowRoot?.querySelector('slot[name="title"]') as HTMLSlotElement | null;
    const hasTitle = (titleSlot?.assignedElements().length ?? 0) > 0 || !this.ariaLabelText;

    return html`
      <div
        class="backdrop"
        @click=${this.handleBackdropClick}
        aria-hidden=${this.open ? 'false' : 'true'}
      >
        <div
          class="panel"
          part="panel"
          tabindex="-1"
          aria-labelledby=${hasTitle && !this.ariaLabelText ? this._titleId : ''}
          aria-label=${this.ariaLabelText ?? ''}
        >
          <div class="header">
            <h2 class="title" id=${this._titleId}><slot name="title"></slot></h2>
            <button
              class="close"
              type="button"
              aria-label="Close"
              @click=${() => (this.open = false)}
            >✕</button>
          </div>
          <div class="body" part="body"><slot></slot></div>
          <div class="footer"><slot name="footer"></slot></div>
        </div>
      </div>
    `;
  }
}
