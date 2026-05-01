import { LitElement, css, html } from "lit";
import { property, query, state } from "lit/decorators.js";
import { setAriaProperty } from "../../utils/attribute-mirror.js";
import { focusRing } from "../../styles/shared.js";
var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(target, key, result) || result;
  if (result) __defProp(target, key, result);
  return result;
};
class VdsTextArea extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.disabled = false;
    this.required = false;
    this.readonly = false;
    this.rows = 4;
    this.resize = "vertical";
    this.showCount = false;
    this._touched = false;
    this._labelId = `vds-ta-label-${crypto.randomUUID().slice(0, 8)}`;
    this._helperId = `vds-ta-helper-${crypto.randomUUID().slice(0, 8)}`;
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
    `
    ];
  }
  updated(changed) {
    if (changed.has("value") || changed.has("required") || changed.has("minlength") || changed.has("maxlength")) {
      this.internals.setFormValue(this.value);
      this.syncValidity();
    }
    if (changed.has("disabled")) setAriaProperty(this, this.internals, "ariaDisabled", this.disabled);
    if (changed.has("required")) setAriaProperty(this, this.internals, "ariaRequired", this.required);
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
    if (this.maxlength != null && this.value.length > this.maxlength) {
      this.internals.setValidity({ tooLong: true }, this.errorMessage ?? `Max length ${this.maxlength}`, this);
      this.toggleAttribute("data-invalid", this._touched);
      return;
    }
    this.internals.setValidity({});
    this.toggleAttribute("data-invalid", false);
  }
  formResetCallback() {
    this.value = "";
    this._touched = false;
    this.internals.setFormValue("");
    this.syncValidity();
  }
  formDisabledCallback(disabled) {
    this.disabled = disabled;
  }
  formStateRestoreCallback(state2) {
    if (typeof state2 === "string") this.value = state2;
  }
  focus() {
    this.textareaEl?.focus();
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
          placeholder=${this.placeholder ?? ""}
          aria-labelledby=${this.label ? this._labelId : ""}
          aria-describedby=${helperText ? this._helperId : ""}
          aria-invalid=${errorVisible ? "true" : "false"}
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
__decorateClass([
  property({ type: String })
], VdsTextArea.prototype, "value");
__decorateClass([
  property({ type: String })
], VdsTextArea.prototype, "name");
__decorateClass([
  property({ type: String })
], VdsTextArea.prototype, "label");
__decorateClass([
  property({ type: String })
], VdsTextArea.prototype, "helper");
__decorateClass([
  property({ type: String })
], VdsTextArea.prototype, "errorMessage");
__decorateClass([
  property({ type: String })
], VdsTextArea.prototype, "placeholder");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsTextArea.prototype, "disabled");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsTextArea.prototype, "required");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsTextArea.prototype, "readonly");
__decorateClass([
  property({ type: Number })
], VdsTextArea.prototype, "minlength");
__decorateClass([
  property({ type: Number })
], VdsTextArea.prototype, "maxlength");
__decorateClass([
  property({ type: Number })
], VdsTextArea.prototype, "rows");
__decorateClass([
  property({ type: String, reflect: true, attribute: "data-resize" })
], VdsTextArea.prototype, "resize");
__decorateClass([
  property({ type: Boolean, attribute: "show-count" })
], VdsTextArea.prototype, "showCount");
__decorateClass([
  query(".textarea")
], VdsTextArea.prototype, "textareaEl");
__decorateClass([
  state()
], VdsTextArea.prototype, "_touched");
export {
  VdsTextArea
};
//# sourceMappingURL=vds-text-area.js.map
