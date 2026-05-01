import { LitElement, html, css, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import { setAriaProperty, setRole } from '../../utils/attribute-mirror.js';

type Size = 'sm' | 'md' | 'lg';

/**
 * <vds-checkbox> — tri-state checkbox (WAI-ARIA AP 1.2 § Checkbox).
 *
 * Form-associated. Keyboard: Space toggles.
 *
 * @slot - label text (rendered after the checkbox)
 * @event change - { detail: { checked: boolean } }
 */
export class VdsCheckbox extends LitElement {
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

    .box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      border-radius: var(--vds-radius-sm);
      background: var(--vds-theme-bg-card);
      transition: background var(--vds-duration-fast), border-color var(--vds-duration-fast);
    }
    :host([data-size="sm"]) .box { width: 14px; height: 14px; }
    :host([data-size="md"]) .box { width: 18px; height: 18px; }
    :host([data-size="lg"]) .box { width: 22px; height: 22px; }

    :host([checked]) .box,
    :host([indeterminate]) .box {
      background: var(--vds-theme-primary);
      border-color: var(--vds-theme-primary);
    }
    :host([checked]) .check { color: var(--vds-theme-primary-fg); }
    :host([indeterminate]) .dash { color: var(--vds-theme-primary-fg); }

    :host(:focus-visible) .box {
      outline: 2px solid var(--vds-theme-border-focus);
      outline-offset: 2px;
    }

    .check, .dash { width: 80%; height: 80%; }
    .check { display: var(--check-display, none); }
    .dash { display: var(--dash-display, none); }
    :host([checked]:not([indeterminate])) { --check-display: block; }
    :host([indeterminate]) { --dash-display: block; --check-display: none; }
  `;

  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: String }) name?: string;
  @property({ type: String }) value = 'on';
  @property({ type: String, reflect: true }) size: Size = 'md';

  private internals: ElementInternals;

  constructor() {
    super();
    this.internals = this.attachInternals();
    setRole(this, this.internals, 'checkbox');
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
    if (changed.has('checked') || changed.has('indeterminate') || changed.has('disabled') || changed.has('required')) {
      this.syncAria();
      this.syncFormValue();
    }
    if (changed.has('disabled')) this.tabIndex = this.disabled ? -1 : 0;
  }

  private syncAria(): void {
    const state = this.indeterminate ? 'mixed' : this.checked ? 'true' : 'false';
    setAriaProperty(this, this.internals, 'ariaChecked', state);
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
    if (event.key === ' ') {
      event.preventDefault();
      if (!this.disabled) this.toggle();
    }
  };

  toggle(): void {
    if (this.indeterminate) {
      this.indeterminate = false;
      this.checked = true;
    } else {
      this.checked = !this.checked;
    }
    this.dispatchEvent(new CustomEvent('change', { detail: { checked: this.checked }, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <span class="box" part="box" aria-hidden="true">
        <svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <svg class="dash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </span>
      <slot></slot>
    `;
  }
}
