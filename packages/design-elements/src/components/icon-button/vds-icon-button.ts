import { html, css, unsafeCSS, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { setAriaProperty, setRole } from '../../utils/attribute-mirror.js';
import { focusRing, srOnly } from '../../styles/shared.js';
import { VdsElement } from '../../base/vds-element.js';

type Variant = 'ghost' | 'soft' | 'outline';
type Tone = 'neutral' | 'primary' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

// 44px coarse-pointer minimum touch target from the touch-safe compact button spec.
const TOUCH_TARGET_MIN_SIZE = '2.75rem';

/**
 * <vds-icon-button> — square icon-only button. WAI-ARIA AP 1.2 button pattern.
 * Always requires `aria-label` (or `ariaLabelText`) for screen readers.
 *
 * @csspart button - underlying button
 * @slot - icon content (svg recommended)
 */
export class VdsIconButton extends VdsElement {
  static formAssociated = true;

  static styles = [
    focusRing,
    srOnly,
    css`
      :host { display: inline-flex; vertical-align: middle; }
      :host([hidden]) { display: none; }

      .button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        user-select: none;
        border-radius: var(--vds-radius-md);
        transition: background-color var(--vds-duration-fast) var(--vds-easing-ease-out),
                    color var(--vds-duration-fast) var(--vds-easing-ease-out);
        color: var(--vds-theme-text-secondary);
      }

      @media (pointer: coarse) {
        .button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: max(100%, ${unsafeCSS(TOUCH_TARGET_MIN_SIZE)});
          height: max(100%, ${unsafeCSS(TOUCH_TARGET_MIN_SIZE)});
          transform: translate(-50%, -50%);
        }
      }
      .button ::slotted(*) {
        width: 1em; height: 1em;
      }

      :host([size="sm"]) .button { padding: var(--vds-spacing-1);   font-size: 0.875rem; }
      :host([size="md"]) .button { padding: var(--vds-spacing-1_5); font-size: 1rem;     }
      :host([size="lg"]) .button { padding: var(--vds-spacing-2);   font-size: 1.125rem; }

      :host([variant="ghost"][tone="neutral"]:hover) .button {
        background: var(--vds-theme-bg-hover);
        color: var(--vds-theme-text-primary);
      }
      :host([variant="ghost"][tone="primary"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-primary) 8%, transparent);
        color: var(--vds-theme-primary);
      }
      :host([variant="ghost"][tone="destructive"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-destructive) 8%, transparent);
        color: var(--vds-theme-destructive);
      }

      :host([variant="soft"][tone="neutral"]) .button { background: var(--vds-theme-bg-muted); }
      :host([variant="soft"][tone="primary"]) .button {
        background: color-mix(in oklch, var(--vds-theme-primary) 12%, transparent);
        color: var(--vds-theme-primary);
      }
      :host([variant="soft"][tone="destructive"]) .button {
        background: color-mix(in oklch, var(--vds-theme-destructive) 12%, transparent);
        color: var(--vds-theme-destructive);
      }

      :host([variant="outline"]) .button {
        border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      }

      :host([disabled]) .button { opacity: 0.5; cursor: not-allowed; }

      :host(:focus-visible) .button {
        outline: 2px solid var(--vds-theme-border-focus);
        outline-offset: 2px;
      }
    `,
  ];

  @property({ type: String, reflect: true }) variant: Variant = 'ghost';
  @property({ type: String, reflect: true }) tone: Tone = 'neutral';
  @property({ type: String, reflect: true }) size: Size = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String, attribute: 'aria-label' }) ariaLabelText: string | null = null;

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
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
    setRole(this, this.internals, 'button');
    if (!this.hasAttribute('tabindex')) this.tabIndex = 0;
  }

  private handleClick = (event: Event): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.click();
    }
  };

  render() {
    return html`
      <button class="button" part="button" type="button" ?disabled=${this.disabled} tabindex="-1" aria-hidden="true">
        <slot></slot>
      </button>
    `;
  }
}
