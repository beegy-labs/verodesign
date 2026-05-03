import { html, css, type PropertyValues } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { setAriaProperty } from '../../utils/attribute-mirror.js';
import { focusRing } from '../../styles/shared.js';
import { VdsElement } from '../../base/vds-element.js';

type Resize = 'none' | 'vertical' | 'horizontal' | 'both';

export class VdsTextArea extends VdsElement {
  static formAssociated = true;

  static styles = [
    focusRing,
    css`
      :host {
        display: inline-flex;
        flex-direction: column;
        gap: var(--vds-spacing-1);
        font-family: var(--vds-font-family-sans);
        color: var(--vds-theme-text-primary);
        min-width: 24ch;
      }

      :host([hidden]) { display: none; }

      .label {
        font-size: var(--vds-font-size-sm);
        font-weight: var(--vds-font-weight-500);
      }
      .label[data-required]::after {
        content: ' *';
        color: var(--vds-theme-destructive);
      }

      .field {
        background: var(--vds-theme-bg-card);
        border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
        border-radius: var(--vds-radius-md);
        padding: var(--vds-spacing-2) var(--vds-spacing-3);
        transition: border-color var(--vds-duration-fast) var(--vds-easing-ease-out),
                    box-shadow var(--vds-duration-fast) var(--vds-easing-ease-out);
      }

      :host(:focus-within) .field {
        border-color: var(--vds-theme-border-focus);
        box-shadow: 0 0 0 3px color-mix(in oklch, var(--vds-theme-border-focus) 25%, transparent);
      }

      :host([data-invalid]) .field {
        border-color: var(--vds-theme-destructive);
      }

      :host([disabled]) .field {
        opacity: 0.5;
      }

      .textarea {
        all: unset;
        display: block;
        width: 100%;
        min-height: 6rem;
        font: inherit;
        font-size: var(--vds-font-size-base);
        line-height: var(--vds-font-lineheight-normal);
        color: var(--vds-theme-text-primary);
        background: transparent;
        resize: vertical;
      }
      .textarea::placeholder { color: var(--vds-theme-text-faint); }

      :host([data-resize="none"]) .textarea { resize: none; }
      :host([data-resize="horizontal"]) .textarea { resize: horizontal; }
      :host([data-resize="both"]) .textarea { resize: both; }

      .meta {
        display: flex;
        justify-content: space-between;
        gap: var(--vds-spacing-2);
      }
      .helper {
        font-size: var(--vds-font-size-xs);
        color: var(--vds-theme-text-dim);
      }
      .helper[data-error] {
        color: var(--vds-theme-destructive);
      }
      .count {
        font-size: var(--vds-font-size-xs);
        color: var(--vds-theme-text-dim);
        font-variant-numeric: tabular-nums;
      }
    `,
  ];

  @property({ type: String }) value = '';
  @property({ type: String }) name?: string;
  @property({ type: String }) label?: string;
  @property({ type: String }) helper?: string;
  @property({ type: String }) errorMessage?: string;
  @property({ type: String }) placeholder?: string;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: Number }) minlength?: number;
  @property({ type: Number }) maxlength?: number;
  @property({ type: Number }) rows = 4;
  @property({ type: String, reflect: true, attribute: 'data-resize' }) resize: Resize = 'vertical';
  @property({ type: Boolean, attribute: 'show-count' }) showCount = false;

  @query('.textarea') private textareaEl!: HTMLTextAreaElement;
  @state() private _touched = false;

  private internals: ElementInternals;
  private _labelId = this.createId('vds-ta-label');
  private _helperId = this.createId('vds-ta-helper');

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('value') || changed.has('required') || changed.has('minlength') || changed.has('maxlength')) {
      this.internals.setFormValue(this.value);
      this.syncValidity();
    }
    if (changed.has('disabled')) setAriaProperty(this, this.internals, 'ariaDisabled', this.disabled);
    if (changed.has('required')) setAriaProperty(this, this.internals, 'ariaRequired', this.required);
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
    if (this.maxlength != null && this.value.length > this.maxlength) {
      this.internals.setValidity({ tooLong: true }, this.errorMessage ?? `Max length ${this.maxlength}`, this);
      this.toggleAttribute('data-invalid', this._touched);
      return;
    }
    this.internals.setValidity({});
    this.toggleAttribute('data-invalid', false);
  }

  private handleInput = (e: Event): void => {
    this.value = (e.target as HTMLTextAreaElement).value;
    this.emit('vds-input', { value: this.value });
  };
  private handleChange = (): void => {
    this.emit('vds-change', { value: this.value });
  };
  private handleBlur = (): void => { this._touched = true; this.syncValidity(); };

  formResetCallback(): void { this.value = ''; this._touched = false; this.internals.setFormValue(''); this.syncValidity(); }
  formDisabledCallback(disabled: boolean): void { this.disabled = disabled; }
  formStateRestoreCallback(state: string | FormData | File | null): void { if (typeof state === 'string') this.value = state; }

  focus(): void { this.textareaEl?.focus(); }
  reportValidity(): boolean { this._touched = true; this.syncValidity(); return this.internals.reportValidity(); }
  checkValidity(): boolean { return this.internals.checkValidity(); }

  render() {
    const errorVisible = this._touched && this.hasAttribute('data-invalid') && this.errorMessage;
    const helperText = errorVisible ? this.errorMessage : this.helper;
    const count = this.maxlength != null ? `${this.value.length} / ${this.maxlength}` : `${this.value.length}`;

    return html`
      ${this.label ? html`<label class="label" id=${this._labelId} ?data-required=${this.required} for="textarea">${this.label}</label>` : null}
      <div class="field">
        <textarea
          id="textarea"
          class="textarea"
          rows=${this.rows}
          .value=${this.value}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          placeholder=${this.placeholder ?? ''}
          aria-labelledby=${this.label ? this._labelId : ''}
          aria-describedby=${helperText ? this._helperId : ''}
          aria-invalid=${errorVisible ? 'true' : 'false'}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @blur=${this.handleBlur}
        ></textarea>
      </div>
      <div class="meta">
        ${helperText ? html`<div class="helper" id=${this._helperId} ?data-error=${errorVisible}>${helperText}</div>` : html`<span></span>`}
        ${this.showCount ? html`<div class="count" aria-live="polite">${count}</div>` : null}
      </div>
    `;
  }
}
