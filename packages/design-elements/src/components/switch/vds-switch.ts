import { html, css, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { setAriaProperty, setRole } from '../../utils/attribute-mirror.js';
import { VdsElement } from '../../base/vds-element.js';

type Size = 'sm' | 'md' | 'lg';

/**
 * <vds-switch> — toggle switch (WAI-ARIA AP 1.2 § Switch).
 *
 * Form-associated. Keyboard: Space and Enter toggle.
 *
 * @event change - { detail: { checked: boolean } }
 */
export class VdsSwitch extends VdsElement {
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
    :host([size="sm"]) { font-size: var(--vds-type-role-label-size); }
    :host([size="md"]) { font-size: var(--vds-type-role-body-size); }
    :host([size="lg"]) { font-size: var(--vds-type-role-title-size); }

    .track {
      position: relative;
      flex-shrink: 0;
      background: var(--vds-theme-border-default);
      border-radius: 999px;
      transition: background var(--vds-duration-fast);
    }
    :host([size="sm"]) .track { width: calc(var(--vds-spacing-7)); height: calc(var(--vds-spacing-4)); }
    :host([size="md"]) .track { width: calc(var(--vds-spacing-9)); height: calc(var(--vds-spacing-5)); }
    :host([size="lg"]) .track { width: calc(var(--vds-spacing-11)); height: calc(var(--vds-spacing-6)); }

    :host([checked]) .track { background: var(--vds-theme-primary); }

    .thumb {
      position: absolute;
      top: calc(var(--vds-spacing-0_5) / 2);
      left: calc(var(--vds-spacing-0_5) / 2);
      background: var(--vds-theme-bg-card);
      border-radius: 999px;
      transition: transform var(--vds-duration-fast);
      box-shadow: var(--vds-shadow-1);
    }
    :host([size="sm"]) .thumb { width: calc(var(--vds-spacing-3)); height: calc(var(--vds-spacing-3)); }
    :host([size="md"]) .thumb { width: calc(var(--vds-spacing-4)); height: calc(var(--vds-spacing-4)); }
    :host([size="lg"]) .thumb { width: calc(var(--vds-spacing-5)); height: calc(var(--vds-spacing-5)); }

    :host([size="sm"][checked]) .thumb { transform: translateX(calc(var(--vds-spacing-3))); }
    :host([size="md"][checked]) .thumb { transform: translateX(calc(var(--vds-spacing-4))); }
    :host([size="lg"][checked]) .thumb { transform: translateX(calc(var(--vds-spacing-5))); }

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
    if (!this.hasAttribute('tabindex')) this.tabIndex = this.disabled ? -1 : 0;
    this.syncFormValue();
    this.syncAria();
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
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
    this.emit('change', { checked: this.checked });
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
