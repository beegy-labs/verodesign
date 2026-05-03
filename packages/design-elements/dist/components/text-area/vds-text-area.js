import { css as v, html as l } from "lit";
import { property as r, query as p, state as c } from "lit/decorators.js";
import { setAriaProperty as u } from "../../utils/attribute-mirror.js";
import { focusRing as f } from "../../styles/shared.js";
import { VdsElement as y } from "../../base/vds-element.js";
var b = Object.defineProperty, t = (o, e, a, h) => {
  for (var s = void 0, d = o.length - 1, n; d >= 0; d--)
    (n = o[d]) && (s = n(e, a, s) || s);
  return s && b(e, a, s), s;
};
class i extends y {
  constructor() {
    super(), this.value = "", this.disabled = !1, this.required = !1, this.readonly = !1, this.rows = 4, this.resize = "vertical", this.showCount = !1, this._touched = !1, this._labelId = this.createId("vds-ta-label"), this._helperId = this.createId("vds-ta-helper"), this.handleInput = (e) => {
      this.value = e.target.value, this.emit("vds-input", { value: this.value });
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
      f,
      v`
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
  updated(e) {
    super.updated(e), (e.has("value") || e.has("required") || e.has("minlength") || e.has("maxlength")) && (this.internals.setFormValue(this.value), this.syncValidity()), e.has("disabled") && u(this, this.internals, "ariaDisabled", this.disabled), e.has("required") && u(this, this.internals, "ariaRequired", this.required);
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
    if (this.maxlength != null && this.value.length > this.maxlength) {
      this.internals.setValidity({ tooLong: !0 }, this.errorMessage ?? `Max length ${this.maxlength}`, this), this.toggleAttribute("data-invalid", this._touched);
      return;
    }
    this.internals.setValidity({}), this.toggleAttribute("data-invalid", !1);
  }
  formResetCallback() {
    this.value = "", this._touched = !1, this.internals.setFormValue(""), this.syncValidity();
  }
  formDisabledCallback(e) {
    this.disabled = e;
  }
  formStateRestoreCallback(e) {
    typeof e == "string" && (this.value = e);
  }
  focus() {
    this.textareaEl?.focus();
  }
  reportValidity() {
    return this._touched = !0, this.syncValidity(), this.internals.reportValidity();
  }
  checkValidity() {
    return this.internals.checkValidity();
  }
  render() {
    const e = this._touched && this.hasAttribute("data-invalid") && this.errorMessage, a = e ? this.errorMessage : this.helper, h = this.maxlength != null ? `${this.value.length} / ${this.maxlength}` : `${this.value.length}`;
    return l`
      ${this.label ? l`<label class="label" id=${this._labelId} ?data-required=${this.required} for="textarea">${this.label}</label>` : null}
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
          aria-describedby=${a ? this._helperId : ""}
          aria-invalid=${e ? "true" : "false"}
          @input=${this.handleInput}
          @change=${this.handleChange}
          @blur=${this.handleBlur}
        ></textarea>
      </div>
      <div class="meta">
        ${a ? l`<div class="helper" id=${this._helperId} ?data-error=${e}>${a}</div>` : l`<span></span>`}
        ${this.showCount ? l`<div class="count" aria-live="polite">${h}</div>` : null}
      </div>
    `;
  }
}
t([
  r({ type: String })
], i.prototype, "value");
t([
  r({ type: String })
], i.prototype, "name");
t([
  r({ type: String })
], i.prototype, "label");
t([
  r({ type: String })
], i.prototype, "helper");
t([
  r({ type: String })
], i.prototype, "errorMessage");
t([
  r({ type: String })
], i.prototype, "placeholder");
t([
  r({ type: Boolean, reflect: !0 })
], i.prototype, "disabled");
t([
  r({ type: Boolean, reflect: !0 })
], i.prototype, "required");
t([
  r({ type: Boolean, reflect: !0 })
], i.prototype, "readonly");
t([
  r({ type: Number })
], i.prototype, "minlength");
t([
  r({ type: Number })
], i.prototype, "maxlength");
t([
  r({ type: Number })
], i.prototype, "rows");
t([
  r({ type: String, reflect: !0, attribute: "data-resize" })
], i.prototype, "resize");
t([
  r({ type: Boolean, attribute: "show-count" })
], i.prototype, "showCount");
t([
  p(".textarea")
], i.prototype, "textareaEl");
t([
  c()
], i.prototype, "_touched");
export {
  i as VdsTextArea
};
