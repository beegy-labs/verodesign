import { LitElement, css, html } from "lit";
import { property, query, state } from "lit/decorators.js";
import { setAriaProperty } from "../../utils/attribute-mirror.js";
import { focusRing, srOnly } from "../../styles/shared.js";
var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(target, key, result) || result;
  if (result) __defProp(target, key, result);
  return result;
};
class VdsTextField extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.type = "text";
    this.size = "md";
    this.disabled = false;
    this.required = false;
    this.readonly = false;
    this._touched = false;
    this._labelId = `vds-tf-label-${crypto.randomUUID().slice(0, 8)}`;
    this._helperId = `vds-tf-helper-${crypto.randomUUID().slice(0, 8)}`;
    this.handleInput = (e) => {
      this.value = e.target.value;
      this.dispatchEvent(new CustomEvent("vds-input", { bubbles: true, composed: true, detail: { value: this.value } }));
    };
    this.handleChange = () => {
      this.dispatchEvent(new CustomEvent("vds-change", { bubbles: true, composed: true, detail: { value: this.value } }));
    };
    this.handleBlur = () => {
      this._touched = true;
      this.syncValidity();
    };
    this.internals = this.attachInternals();
  }
  static {
    this.formAssociated = true;
  }
  static {
    this.styles = [
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
    `
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    this.dataset.size = this.size;
  }
  updated(changed) {
    if (changed.has("size")) this.dataset.size = this.size;
    if (changed.has("value") || changed.has("required") || changed.has("minlength") || changed.has("maxlength") || changed.has("pattern")) {
      this.syncFormValue();
    }
    if (changed.has("disabled")) {
      setAriaProperty(this, this.internals, "ariaDisabled", this.disabled);
    }
    if (changed.has("required")) {
      setAriaProperty(this, this.internals, "ariaRequired", this.required);
    }
  }
  syncFormValue() {
    this.internals.setFormValue(this.value);
    this.syncValidity();
  }
  syncValidity() {
    if (this.disabled || this.readonly) {
      this.internals.setValidity({});
      this.toggleAttribute("data-invalid", false);
      return;
    }
    if (this.required && this.value.trim() === "") {
      this.internals.setValidity({ valueMissing: true }, this.errorMessage ?? "Required", this);
      this.toggleAttribute("data-invalid", this._touched);
      return;
    }
    if (this.minlength != null && this.value.length < this.minlength) {
      this.internals.setValidity({ tooShort: true }, this.errorMessage ?? `Min length ${this.minlength}`, this);
      this.toggleAttribute("data-invalid", this._touched);
      return;
    }
    if (this.maxlength != null && this.value.length > this.maxlength) {
      this.internals.setValidity({ tooLong: true }, this.errorMessage ?? `Max length ${this.maxlength}`, this);
      this.toggleAttribute("data-invalid", this._touched);
      return;
    }
    if (this.pattern && !new RegExp(`^(?:${this.pattern})$`).test(this.value)) {
      this.internals.setValidity({ patternMismatch: true }, this.errorMessage ?? "Pattern mismatch", this);
      this.toggleAttribute("data-invalid", this._touched);
      return;
    }
    this.internals.setValidity({});
    this.toggleAttribute("data-invalid", false);
  }
  formResetCallback() {
    this.value = "";
    this._touched = false;
    this.syncFormValue();
  }
  formDisabledCallback(disabled) {
    this.disabled = disabled;
  }
  formStateRestoreCallback(state2) {
    if (typeof state2 === "string") this.value = state2;
  }
  focus() {
    this.inputEl?.focus();
  }
  select() {
    this.inputEl?.select();
  }
  reportValidity() {
    this._touched = true;
    this.syncValidity();
    return this.internals.reportValidity();
  }
  checkValidity() {
    return this.internals.checkValidity();
  }
  render() {
    const errorVisible = this._touched && this.hasAttribute("data-invalid") && this.errorMessage;
    const helperText = errorVisible ? this.errorMessage : this.helper;
    return html`
      ${this.label ? html`<label class="label" id=${this._labelId} ?data-required=${this.required} for="input">${this.label}</label>` : null}
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
          placeholder=${this.placeholder ?? ""}
          autocomplete=${this.autocomplete ?? ""}
          aria-labelledby=${this.label ? this._labelId : ""}
          aria-describedby=${helperText ? this._helperId : ""}
          aria-invalid=${errorVisible ? "true" : "false"}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @blur=${this.handleBlur}
        />
        <slot name="end"></slot>
      </div>
      ${helperText ? html`<div class="helper" id=${this._helperId} ?data-error=${errorVisible}>${helperText}</div>` : null}
    `;
  }
}
__decorateClass([
  property({ type: String })
], VdsTextField.prototype, "value");
__decorateClass([
  property({ type: String })
], VdsTextField.prototype, "name");
__decorateClass([
  property({ type: String })
], VdsTextField.prototype, "label");
__decorateClass([
  property({ type: String })
], VdsTextField.prototype, "helper");
__decorateClass([
  property({ type: String })
], VdsTextField.prototype, "errorMessage");
__decorateClass([
  property({ type: String })
], VdsTextField.prototype, "placeholder");
__decorateClass([
  property({ type: String })
], VdsTextField.prototype, "type");
__decorateClass([
  property({ type: String, reflect: true })
], VdsTextField.prototype, "size");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsTextField.prototype, "disabled");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsTextField.prototype, "required");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsTextField.prototype, "readonly");
__decorateClass([
  property({ type: String })
], VdsTextField.prototype, "autocomplete");
__decorateClass([
  property({ type: Number })
], VdsTextField.prototype, "minlength");
__decorateClass([
  property({ type: Number })
], VdsTextField.prototype, "maxlength");
__decorateClass([
  property({ type: String })
], VdsTextField.prototype, "pattern");
__decorateClass([
  query(".input")
], VdsTextField.prototype, "inputEl");
__decorateClass([
  state()
], VdsTextField.prototype, "_touched");
export {
  VdsTextField
};
//# sourceMappingURL=vds-text-field.js.map
