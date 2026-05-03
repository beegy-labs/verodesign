import { css as l, html as c } from "lit";
import { property as t } from "lit/decorators.js";
import { setRole as p, setAriaProperty as d } from "../../utils/attribute-mirror.js";
import { VdsElement as u } from "../../base/vds-element.js";
var f = Object.defineProperty, s = (a, e, n, m) => {
  for (var r = void 0, o = a.length - 1, h; o >= 0; o--)
    (h = a[o]) && (r = h(e, n, r) || r);
  return r && f(e, n, r), r;
};
class i extends u {
  constructor() {
    super(), this.checked = !1, this.indeterminate = !1, this.disabled = !1, this.required = !1, this.value = "on", this.size = "md", this.handleClick = (e) => {
      if (this.disabled) {
        e.preventDefault(), e.stopImmediatePropagation();
        return;
      }
      this.toggle();
    }, this.handleKeydown = (e) => {
      e.key === " " && (e.preventDefault(), this.disabled || this.toggle());
    }, this.internals = this.attachInternals(), p(this, this.internals, "checkbox"), this.addEventListener("click", this.handleClick), this.addEventListener("keydown", this.handleKeydown);
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = l`
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
    :host([size="sm"]) { font-size: var(--vds-font-size-sm); }
    :host([size="md"]) { font-size: var(--vds-font-size-base); }
    :host([size="lg"]) { font-size: var(--vds-font-size-lg); }

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
    :host([size="sm"]) .box { width: 14px; height: 14px; }
    :host([size="md"]) .box { width: 18px; height: 18px; }
    :host([size="lg"]) .box { width: 22px; height: 22px; }

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
    return c`
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
