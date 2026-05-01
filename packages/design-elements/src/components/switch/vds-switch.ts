import { LitElement, html, css, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { setAriaProperty, setRole } from '../../utils/attribute-mirror.js';

type Size = 'sm' | 'md' | 'lg';

/**
 * <vds-switch> — toggle switch (WAI-ARIA AP 1.2 § Switch).
 *
 * Form-associated. Keyboard: Space and Enter toggle.
 *
 * @event change - { detail: { checked: boolean } }
 */
export class VdsSwitch extends LitElement {
  static formAssociated = true;

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-2);
      cursor: pointer;
      user-select: none;
      color: var(--vds-theme-text-primary);
      font-family: var(--vds-font-family-sans);
    }
    :host([disabled]) { cursor: not-allowed; opacity: 0.5; }
    :host([data-size="sm"]) { font-size: var(--vds-font-size-sm); }
    :host([data-size="md"]) { font-size: var(--vds-font-size-base); }
    :host([data-size="lg"]) { font-size: var(--vds-font-size-lg); }

    .track {
      position: relative;
      flex-shrink: 0;
      background: var(--vds-theme-border-default);
      border-radius: 999px;
      transition: background var(--vds-duration-fast);
    }
    :host([data-size="sm"]) .track { width: 28px; height: 16px; }
    :host([data-size="md"]) .track { width: 36px; height: 20px; }
    :host([data-size="lg"]) .track { width: 44px; height: 24px; }

    :host([checked]) .track { background: var(--vds-theme-primary); }

    .thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      background: var(--vds-theme-bg-card);
      border-radius: 999px;
      transition: transform var(--vds-duration-fast);
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    :host([data-size="sm"]) .thumb { width: 12px; height: 12px; }
    :host([data-size="md"]) .thumb { width: 16px; height: 16px; }
    :host([data-size="lg"]) .thumb { width: 20px; height: 20px; }

    :host([data-size="sm"][checked]) .thumb { transform: translateX(12px); }
    :host([data-size="md"][checked]) .thumb { transform: translateX(16px); }
    :host([data-size="lg"][checked]) .thumb { transform: translateX(20px); }

    :host(:focus-visible) .track {
      outline: 2px solid var(--vds-theme-border-focus);
      outline-offset: 2px;
    }
  `;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String }) name?: string;
  @property({ type: String }) value = 'on';
  @property({ type: String, reflect: true }) size: Size = 'md';

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'switch');
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeydown);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.dataset.size = this.size;
    if (!this.hasAttribute('tabindex')) this.tabIndex = this.disabled ? -1 : 0;
    this.syncFormValue();
    this.syncAria();
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('size')) this.dataset.size = this.size;
    if (changed.has('checked') || changed.has('disabled') || changed.has('required')) {
      this.syncAria();
      this.syncFormValue();
    }
    if (changed.has('disabled')) this.tabIndex = this.disabled ? -1 : 0;
  }

  private syncAria(): void {
    setAriaProperty(this, this.internals, 'ariaChecked', this.checked ? 'true' : 'false');
    setAriaProperty(this, this.internals, 'ariaDisabled', this.disabled);
    setAriaProperty(this, this.internals, 'ariaRequired', this.required);
  }

  private syncFormValue(): void {
    this.internals.setFormValue(this.checked ? this.value : null);
  }

  private handleClick = (event: Event): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.toggle();
  };

  private handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (!this.disabled) this.toggle();
    }
  };

  toggle(): void {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('change', { detail: { checked: this.checked }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <span class="track" part="track" aria-hidden="true">
        <span class="thumb" part="thumb"></span>
      </span>
      <slot></slot>
    `;
  }
}
