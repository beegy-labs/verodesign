import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as h } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as t } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { setRole as c, setAriaProperty as d } from "../../utils/attribute-mirror.js";
import { VdsElement as p } from "../../base/vds-element.js";
import { css as v } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var m = Object.defineProperty, s = (a, e, n, u) => {
  for (var r = void 0, o = a.length - 1, l; o >= 0; o--)
    (l = a[o]) && (r = l(e, n, r) || r);
  return r && m(e, n, r), r;
};
class i extends p {
  constructor() {
    super(), this.checked = !1, this.indeterminate = !1, this.disabled = !1, this.required = !1, this.value = "on", this.size = "md", this.handleClick = (e) => {
      if (this.disabled) {
        e.preventDefault(), e.stopImmediatePropagation();
        return;
      }
      this.toggle();
    }, this.handleKeydown = (e) => {
      e.key === " " && (e.preventDefault(), this.disabled || this.toggle());
    }, this.internals = this.attachInternals(), c(this, this.internals, "checkbox"), this.addEventListener("click", this.handleClick), this.addEventListener("keydown", this.handleKeydown);
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = v`
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
    :host([size="sm"]) .box { width: calc(var(--vds-spacing-3) + var(--vds-spacing-0_5)); height: calc(var(--vds-spacing-3) + var(--vds-spacing-0_5)); }
    :host([size="md"]) .box { width: calc(var(--vds-spacing-4) + var(--vds-spacing-0_5)); height: calc(var(--vds-spacing-4) + var(--vds-spacing-0_5)); }
    :host([size="lg"]) .box { width: calc(var(--vds-spacing-5) + var(--vds-spacing-0_5)); height: calc(var(--vds-spacing-5) + var(--vds-spacing-0_5)); }

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
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("tabindex") || (this.tabIndex = this.disabled ? -1 : 0), this.syncFormValue(), this.syncAria();
  }
  updated(e) {
    super.updated(e), (e.has("checked") || e.has("indeterminate") || e.has("disabled") || e.has("required")) && (this.syncAria(), this.syncFormValue()), e.has("disabled") && (this.tabIndex = this.disabled ? -1 : 0);
  }
  syncAria() {
    const e = this.indeterminate ? "mixed" : this.checked ? "true" : "false";
    d(this, this.internals, "ariaChecked", e), d(this, this.internals, "ariaDisabled", this.disabled), d(this, this.internals, "ariaRequired", this.required);
  }
  syncFormValue() {
    this.internals.setFormValue(this.checked ? this.value : null);
  }
  toggle() {
    this.indeterminate ? (this.indeterminate = !1, this.checked = !0) : this.checked = !this.checked, this.emit("change", { checked: this.checked });
  }
  render() {
    return h`
      <span class="box" part="box" aria-hidden="true">
        <svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <svg class="dash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </span>
      <slot></slot>
    `;
  }
}
s([
  t({ type: Boolean, reflect: !0 })
], i.prototype, "checked");
s([
  t({ type: Boolean, reflect: !0 })
], i.prototype, "indeterminate");
s([
  t({ type: Boolean, reflect: !0 })
], i.prototype, "disabled");
s([
  t({ type: Boolean, reflect: !0 })
], i.prototype, "required");
s([
  t({ type: String })
], i.prototype, "name");
s([
  t({ type: String })
], i.prototype, "value");
s([
  t({ type: String, reflect: !0 })
], i.prototype, "size");
export {
  i as VdsCheckbox
};
