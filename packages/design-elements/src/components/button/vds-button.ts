import { html, css, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { setAriaProperty, setRole } from '../../utils/attribute-mirror.js';
import { focusRing, srOnly, reducedMotion } from '../../styles/shared.js';
import { VdsElement } from '../../base/vds-element.js';

type Variant = 'solid' | 'soft' | 'outline' | 'ghost';
type Tone = 'primary' | 'accent' | 'neutral' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

/**
 * <vds-button> — accessible button (WAI-ARIA AP 1.2 button pattern).
 *
 * Form-associated: when `type="submit"` or `type="reset"` and placed inside a `<form>`,
 * the click submits/resets the form.
 *
 * @csspart button - the underlying button element
 * @slot - button label
 * @slot start - leading icon
 * @slot end - trailing icon
 */
export class VdsButton extends VdsElement {
  static formAssociated = true;

  static styles = [
    focusRing,
    srOnly,
    reducedMotion,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      :host([hidden]) { display: none; }

      .button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--vds-spacing-2);
        font-family: var(--vds-font-family-sans);
        font-weight: var(--vds-font-weight-500);
        line-height: var(--vds-font-lineheight-normal);
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        border-radius: var(--vds-radius-md);
        border: var(--vds-border-width-1) solid transparent;
        transition: background-color var(--vds-duration-fast) var(--vds-easing-ease-out),
                    color var(--vds-duration-fast) var(--vds-easing-ease-out),
                    border-color var(--vds-duration-fast) var(--vds-easing-ease-out),
                    box-shadow var(--vds-duration-fast) var(--vds-easing-ease-out);
      }

      :host([size="sm"]) .button {
        padding: var(--vds-spacing-1_5) var(--vds-spacing-3);
        font-size: var(--vds-font-size-sm);
        min-height: 2rem;
      }
      :host([size="md"]) .button {
        padding: var(--vds-spacing-2) var(--vds-spacing-4);
        font-size: var(--vds-font-size-base);
        min-height: 2.5rem;
      }
      :host([size="lg"]) .button {
        padding: var(--vds-spacing-3) var(--vds-spacing-5);
        font-size: var(--vds-font-size-lg);
        min-height: 3rem;
      }

      :host([tone="primary"][variant="solid"]) .button {
        background: var(--vds-theme-primary);
        color: var(--vds-theme-primary-fg);
      }
      :host([tone="primary"][variant="solid"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-primary) 90%, black);
      }
      :host([tone="primary"][variant="soft"]) .button {
        background: color-mix(in oklch, var(--vds-theme-primary) 12%, transparent);
        color: var(--vds-theme-primary);
      }
      :host([tone="primary"][variant="outline"]) .button {
        border-color: var(--vds-theme-primary);
        color: var(--vds-theme-primary);
      }
      :host([tone="primary"][variant="ghost"]) .button {
        color: var(--vds-theme-primary);
      }
      :host([tone="primary"][variant="ghost"]:hover) .button,
      :host([tone="primary"][variant="outline"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-primary) 8%, transparent);
      }

      :host([tone="accent"][variant="solid"]) .button {
        background: var(--vds-theme-accent);
        color: var(--vds-theme-accent-fg);
      }
      :host([tone="accent"][variant="solid"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-accent) 90%, black);
      }
      :host([tone="accent"][variant="soft"]) .button {
        background: color-mix(in oklch, var(--vds-theme-accent) 12%, transparent);
        color: var(--vds-theme-accent);
      }
      :host([tone="accent"][variant="outline"]) .button {
        border-color: var(--vds-theme-accent);
        color: var(--vds-theme-accent);
      }
      :host([tone="accent"][variant="ghost"]) .button {
        color: var(--vds-theme-accent);
      }

      :host([tone="neutral"][variant="solid"]) .button {
        background: var(--vds-theme-neutral);
        color: var(--vds-theme-neutral-fg);
      }
      :host([tone="neutral"][variant="soft"]) .button {
        background: var(--vds-theme-bg-muted);
        color: var(--vds-theme-text-primary);
      }
      :host([tone="neutral"][variant="outline"]) .button {
        border-color: var(--vds-theme-border-default);
        color: var(--vds-theme-text-primary);
      }
      :host([tone="neutral"][variant="ghost"]) .button {
        color: var(--vds-theme-text-primary);
      }
      :host([tone="neutral"][variant="ghost"]:hover) .button,
      :host([tone="neutral"][variant="outline"]:hover) .button {
        background: var(--vds-theme-bg-hover);
      }

      :host([tone="destructive"][variant="solid"]) .button {
        background: var(--vds-theme-destructive);
        color: var(--vds-theme-destructive-fg);
      }
      :host([tone="destructive"][variant="solid"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-destructive) 90%, black);
      }
      :host([tone="destructive"][variant="soft"]) .button {
        background: color-mix(in oklch, var(--vds-theme-destructive) 12%, transparent);
        color: var(--vds-theme-destructive);
      }
      :host([tone="destructive"][variant="outline"]) .button {
        border-color: var(--vds-theme-destructive);
        color: var(--vds-theme-destructive);
      }
      :host([tone="destructive"][variant="ghost"]) .button {
        color: var(--vds-theme-destructive);
      }

      :host([disabled]) .button,
      :host([data-loading]) .button {
        opacity: 0.5;
        cursor: not-allowed;
      }

      :host(:focus-visible) .button {
        outline: 2px solid var(--vds-theme-border-focus);
        outline-offset: 2px;
      }

      .spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    `,
  ];

  @property({ type: String, reflect: true }) variant: Variant = 'solid';
  @property({ type: String, reflect: true }) tone: Tone = 'primary';
  @property({ type: String, reflect: true }) size: Size = 'md';
  @property({ type: String, reflect: true }) type: 'button' | 'submit' | 'reset' = 'button';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true, attribute: 'data-loading' }) loading = false;
  @property({ type: String }) name?: string;
  @property({ type: String }) value?: string;
  @property({ type: String, attribute: 'aria-label' }) ariaLabelText: string | null = null;

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'button');
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeydown);
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('disabled')) {
      setAriaProperty(this, this.internals, 'ariaDisabled', this.disabled);
      this.tabIndex = this.disabled ? -1 : 0;
    } else if (this.tabIndex < 0 && !this.disabled) {
      this.tabIndex = 0;
    }
    if (changed.has('ariaLabelText') && this.ariaLabelText != null) {
      setAriaProperty(this, this.internals, 'ariaLabel', this.ariaLabelText);
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
  }

  private handleClick = (event: Event): void => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (this.type === 'submit') this.internals.form?.requestSubmit();
    if (this.type === 'reset') this.internals.form?.reset();
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.click();
    }
  };

  render() {
    return html`
      <button
        class="button"
        part="button"
        type="button"
        ?disabled=${this.disabled}
        tabindex="-1"
        aria-hidden="true"
      >
        ${this.loading
          ? html`<span class="spinner" aria-hidden="true"></span>`
          : html`<slot name="start"></slot>`}
        <slot></slot>
        <slot name="end"></slot>
      </button>
    `;
  }
}
