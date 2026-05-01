import { LitElement, html, css, type PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { setAriaProperty } from '../../utils/attribute-mirror.js';
import { focusRing, srOnly } from '../../styles/shared.js';

type Size = 'sm' | 'md' | 'lg';

/**
 * <vds-text-field> — text input with label, helper, error states. WAI-ARIA AP 1.2 textbox pattern.
 * Form-Associated Custom Element via ElementInternals.
 */
export class VdsTextField extends LitElement {
  static formAssociated = true;

  static styles = [
    focusRing,
    srOnly,
    css`
      :host {
        display: inline-flex;
        flex-direction: column;
        gap: var(--vds-spacing-1);
        font-family: var(--vds-font-family-sans);
        color: var(--vds-theme-text-primary);
        min-width: 16ch;
      }

      :host([hidden]) { display: none; }

      .label {
        font-size: var(--vds-font-size-sm);
        font-weight: var(--vds-font-weight-500);
        color: var(--vds-theme-text-primary);
      }
      .label[data-required]::after {
        content: ' *';
        color: var(--vds-theme-destructive);
      }

      .field {
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--vds-spacing-2);
        background: var(--vds-theme-bg-card);
        border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
        border-radius: var(--vds-radius-md);
        transition: border-color var(--vds-duration-fast) var(--vds-easing-ease-out),
                    box-shadow var(--vds-duration-fast) var(--vds-easing-ease-out);
      }

      :host([data-size="sm"]) .field { padding: var(--vds-spacing-1_5) var(--vds-spacing-2); min-height: 2rem; }
      :host([data-size="md"]) .field { padding: var(--vds-spacing-2) var(--vds-spacing-3); min-height: 2.5rem; }
      :host([data-size="lg"]) .field { padding: var(--vds-spacing-3) var(--vds-spacing-4); min-height: 3rem; }

      .input {
        all: unset;
        flex: 1;
        min-width: 0;
        font: inherit;
        color: var(--vds-theme-text-primary);
        background: transparent;
      }
      .input::placeholder { color: var(--vds-theme-text-faint); }

      :host([data-size="sm"]) .input { font-size: var(--vds-font-size-sm); }
      :host([data-size="md"]) .input { font-size: var(--vds-font-size-base); }
      :host([data-size="lg"]) .input { font-size: var(--vds-font-size-lg); }

      :host(:focus-within) .field {
        border-color: var(--vds-theme-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklch, var(--vds-theme-border-focus) 25%, transparent);
      }

      :host([data-invalid]) .field {
        border-color: var(--vds-theme-destructive);
      }
      :host([data-invalid]:focus-within) .field {
        box-shadow: 0 0 0 3px color-mix(in oklch, var(--vds-theme-destructive) 25%, transparent);
      }

      :host([disabled]) .field {
        opacity: 0.5;
        cursor: not-allowed;
      }
      :host([disabled]) .input { cursor: not-allowed; }

      .helper {
        font-size: var(--vds-font-size-xs);
        color: var(--vds-theme-text-dim);
      }
      .helper[data-error] {
        color: var(--vds-theme-destructive);
      }

      ::slotted([slot="start"]),
      ::slotted([slot="end"]) {
        flex-shrink: 0;
        color: var(--vds-theme-text-dim);
      }
    `,
  ];

  @property({ type: String }) value = '';
  @property({ type: String }) name?: string;
  @property({ type: String }) label?: string;
  @property({ type: String }) helper?: string;
  @property({ type: String }) errorMessage?: string;
  @property({ type: String }) placeholder?: string;
  @property({ type: String }) type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search' = 'text';
  @property({ type: String, reflect: true }) size: Size = 'md';
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: String }) autocomplete?: string;
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) maxlength?: number;
  @property({ type: String }) pattern?: string;

  @query('.input') private inputEl!: HTMLInputElement;
  @state() private _touched = false;

  private internals: ElementInternals;
  private _labelId = `vds-tf-label-${crypto.randomUUID().slice(0, 8)}`;
  private _helperId = `vds-tf-helper-${crypto.randomUUID().slice(0, 8)}`;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.dataset.size = this.size;
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('size')) this.dataset.size = this.size;
    if (changed.has('value') || changed.has('required') || changed.has('minlength') || changed.has('maxlength') || changed.has('pattern')) {
      this.syncFormValue();
    }
    if (changed.has('disabled')) {
      setAriaProperty(this, this.internals, 'ariaDisabled', this.disabled);
    }
    if (changed.has('required')) {
      setAriaProperty(this, this.internals, 'ariaRequired', this.required);
    }
  }

  private syncFormValue() {
    this.internals.setFormValue(this.value);
    this.syncValidity();
  }

  private syncValidity() {
    if (this.disabled || this.readonly) {
      this.internals.setValidity({});
      this.toggleAttribute('data-invalid', false);
      return;
    }
    if (this.required && this.value.trim() === '') {
      this.internals.setValidity({ valueMissing: true }, this.errorMessage ?? 'Required', this);
      this.toggleAttribute('data-invalid', this._touched);
      return;
    }
    if (this.minlength != null && this.value.length < this.minlength) {
      this.internals.setValidity({ tooShort: true }, this.errorMessage ?? `Min length ${this.minlength}`, this);
      this.toggleAttribute('data-invalid', this._touched);
      return;
    }
    if (this.maxlength != null && this.value.length > this.maxlength) {
      this.internals.setValidity({ tooLong: true }, this.errorMessage ?? `Max length ${this.maxlength}`, this);
      this.toggleAttribute('data-invalid', this._touched);
      return;
    }
    if (this.pattern && !new RegExp(`^(?:${this.pattern})$`).test(this.value)) {
      this.internals.setValidity({ patternMismatch: true }, this.errorMessage ?? 'Pattern mismatch', this);
      this.toggleAttribute('data-invalid', this._touched);
      return;
    }
    this.internals.setValidity({});
    this.toggleAttribute('data-invalid', false);
  }

  private handleInput = (e: Event): void => {
    this.value = (e.target as HTMLInputElement).value;
    this.dispatchEvent(new CustomEvent('vds-input', { bubbles: true, composed: true, detail: { value: this.value } }));
  };

  private handleChange = (): void => {
    this.dispatchEvent(new CustomEvent('vds-change', { bubbles: true, composed: true, detail: { value: this.value } }));
  };

  private handleBlur = (): void => {
    this._touched = true;
    this.syncValidity();
  };

  formResetCallback(): void {
    this.value = '';
    this._touched = false;
    this.syncFormValue();
  }

  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  formStateRestoreCallback(state: string | FormData | File | null): void {
    if (typeof state === 'string') this.value = state;
  }

  focus(): void { this.inputEl?.focus(); }
  select(): void { this.inputEl?.select(); }
  reportValidity(): boolean { this._touched = true; this.syncValidity(); return this.internals.reportValidity(); }
  checkValidity(): boolean { return this.internals.checkValidity(); }

  render() {
    const errorVisible = this._touched && this.hasAttribute('data-invalid') && this.errorMessage;
    const helperText = errorVisible ? this.errorMessage : this.helper;

    return html`
      ${this.label
        ? html`<label class="label" id=${this._labelId} ?data-required=${this.required} for="input">${this.label}</label>`
        : null}
      <div class="field">
        <slot name="start"></slot>
        <input
          id="input"
          class="input"
          type=${this.type}
          .value=${this.value}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          placeholder=${this.placeholder ?? ''}
          autocomplete=${this.autocomplete ?? ''}
          aria-labelledby=${this.label ? this._labelId : ''}
          aria-describedby=${helperText ? this._helperId : ''}
          aria-invalid=${errorVisible ? 'true' : 'false'}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @blur=${this.handleBlur}
        />
        <slot name="end"></slot>
      </div>
      ${helperText
        ? html`<div class="helper" id=${this._helperId} ?data-error=${errorVisible}>${helperText}</div>`
        : null}
    `;
  }
}
