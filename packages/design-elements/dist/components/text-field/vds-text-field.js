import { css as p, html as d } from "lit";
import { property as s, query as u, state as v } from "lit/decorators.js";
import { setAriaProperty as n } from "../../utils/attribute-mirror.js";
import { focusRing as c, srOnly as m } from "../../styles/shared.js";
import { VdsElement as f } from "../../base/vds-element.js";
var y = Object.defineProperty, e = (l, t, r, g) => {
  for (var a = void 0, o = l.length - 1, h; o >= 0; o--)
    (h = l[o]) && (a = h(t, r, a) || a);
  return a && y(t, r, a), a;
};
class i extends f {
  constructor() {
    super(), this.value = "", this.type = "text", this.size = "md", this.disabled = !1, this.required = !1, this.readonly = !1, this._touched = !1, this._labelId = this.createId("vds-tf-label"), this._helperId = this.createId("vds-tf-helper"), this.handleInput = (t) => {
      this.value = t.target.value, this.emit("vds-input", { value: this.value });
    }, this.handleChange = () => {
      this.emit("vds-change", { value: this.value });
    }, this.handleBlur = () => {
      this._touched = !0, this.syncValidity();
    }, this.internals = this.attachInternals();
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = [
      c,
      m,
      p`
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

      :host([size="sm"]) .field { padding: var(--vds-spacing-1_5) var(--vds-spacing-2); min-height: 2rem; }
      :host([size="md"]) .field { padding: var(--vds-spacing-2) var(--vds-spacing-3); min-height: 2.5rem; }
      :host([size="lg"]) .field { padding: var(--vds-spacing-3) var(--vds-spacing-4); min-height: 3rem; }

      .input {
        all: unset;
        flex: 1;
        min-width: 0;
        font: inherit;
        color: var(--vds-theme-text-primary);
        background: transparent;
      }
      .input::placeholder { color: var(--vds-theme-text-faint); }

      :host([size="sm"]) .input { font-size: var(--vds-font-size-sm); }
      :host([size="md"]) .input { font-size: var(--vds-font-size-base); }
      :host([size="lg"]) .input { font-size: var(--vds-font-size-lg); }

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
  }
  updated(t) {
    super.updated(t), (t.has("value") || t.has("required") || t.has("minlength") || t.has("maxlength") || t.has("pattern")) && this.syncFormValue(), t.has("disabled") && n(this, this.internals, "ariaDisabled", this.disabled), t.has("required") && n(this, this.internals, "ariaRequired", this.required);
  }
  syncFormValue() {
    this.internals.setFormValue(this.value), this.syncValidity();
  }
  syncValidity() {
    if (this.disabled || this.readonly) {
      this.internals.setValidity({}), this.toggleAttribute("data-invalid", !1);
      return;
    }
    if (this.required && this.value.trim() === "") {
      this.internals.setValidity({ valueMissing: !0 }, this.errorMessage ?? "Required", this), this.toggleAttribute("data-invalid", this._touched);
      return;
    }
    if (this.minlength != null && this.value.length < this.minlength) {
      this.internals.setValidity({ tooShort: !0 }, this.errorMessage ?? `Min length ${this.minlength}`, this), this.toggleAttribute("data-invalid", this._touched);
      return;
    }
    if (this.maxlength != null && this.value.length > this.maxlength) {
      this.internals.setValidity({ tooLong: !0 }, this.errorMessage ?? `Max length ${this.maxlength}`, this), this.toggleAttribute("data-invalid", this._touched);
      return;
    }
    if (this.pattern && !new RegExp(`^(?:${this.pattern})$`).test(this.value)) {
      this.internals.setValidity({ patternMismatch: !0 }, this.errorMessage ?? "Pattern mismatch", this), this.toggleAttribute("data-invalid", this._touched);
      return;
    }
    this.internals.setValidity({}), this.toggleAttribute("data-invalid", !1);
  }
  formResetCallback() {
    this.value = "", this._touched = !1, this.syncFormValue();
  }
  formDisabledCallback(t) {
    this.disabled = t;
  }
  formStateRestoreCallback(t) {
    typeof t == "string" && (this.value = t);
  }
  focus() {
    this.inputEl?.focus();
  }
  select() {
    this.inputEl?.select();
  }
  reportValidity() {
    return this._touched = !0, this.syncValidity(), this.internals.reportValidity();
  }
  checkValidity() {
    return this.internals.checkValidity();
  }
  render() {
    const t = this._touched && this.hasAttribute("data-invalid") && this.errorMessage, r = t ? this.errorMessage : this.helper;
    return d`
      ${this.label ? d`<label class="label" id=${this._labelId} ?data-required=${this.required} for="input">${this.label}</label>` : null}
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
          aria-describedby=${r ? this._helperId : ""}
          aria-invalid=${t ? "true" : "false"}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @blur=${this.handleBlur}
        />
        <slot name="end"></slot>
      </div>
      ${r ? d`<div class="helper" id=${this._helperId} ?data-error=${t}>${r}</div>` : null}
    `;
  }
}
e([
  s({ type: String })
], i.prototype, "value");
e([
  s({ type: String })
], i.prototype, "name");
e([
  s({ type: String })
], i.prototype, "label");
e([
  s({ type: String })
], i.prototype, "helper");
e([
  s({ type: String })
], i.prototype, "errorMessage");
e([
  s({ type: String })
], i.prototype, "placeholder");
e([
  s({ type: String })
], i.prototype, "type");
e([
  s({ type: String, reflect: !0 })
], i.prototype, "size");
e([
  s({ type: Boolean, reflect: !0 })
], i.prototype, "disabled");
e([
  s({ type: Boolean, reflect: !0 })
], i.prototype, "required");
e([
  s({ type: Boolean, reflect: !0 })
], i.prototype, "readonly");
e([
  s({ type: String })
], i.prototype, "autocomplete");
e([
  s({ type: Number })
], i.prototype, "minlength");
e([
  s({ type: Number })
], i.prototype, "maxlength");
e([
  s({ type: String })
], i.prototype, "pattern");
e([
  u(".input")
], i.prototype, "inputEl");
e([
  v()
], i.prototype, "_touched");
export {
  i as VdsTextField
};
