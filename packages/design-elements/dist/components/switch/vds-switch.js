import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as l } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as e } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { setRole as n, setAriaProperty as d } from "../../utils/attribute-mirror.js";
import { VdsElement as p } from "../../base/vds-element.js";
import { css as v } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var u = Object.defineProperty, a = (r, t, h, m) => {
  for (var s = void 0, c = r.length - 1, o; c >= 0; c--)
    (o = r[c]) && (s = o(t, h, s) || s);
  return s && u(t, h, s), s;
};
class i extends p {
  constructor() {
    super(), this.checked = !1, this.disabled = !1, this.required = !1, this.value = "on", this.size = "md", this.handleClick = (t) => {
      if (this.disabled) {
        t.preventDefault(), t.stopImmediatePropagation();
        return;
      }
      this.toggle();
    }, this.handleKeydown = (t) => {
      (t.key === " " || t.key === "Enter") && (t.preventDefault(), this.disabled || this.toggle());
    }, this.internals = this.attachInternals(), n(this, this.internals, "switch"), this.addEventListener("click", this.handleClick), this.addEventListener("keydown", this.handleKeydown);
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
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("tabindex") || (this.tabIndex = this.disabled ? -1 : 0), this.syncFormValue(), this.syncAria();
  }
  updated(t) {
    super.updated(t), (t.has("checked") || t.has("disabled") || t.has("required")) && (this.syncAria(), this.syncFormValue()), t.has("disabled") && (this.tabIndex = this.disabled ? -1 : 0);
  }
  syncAria() {
    d(this, this.internals, "ariaChecked", this.checked ? "true" : "false"), d(this, this.internals, "ariaDisabled", this.disabled), d(this, this.internals, "ariaRequired", this.required);
  }
  syncFormValue() {
    this.internals.setFormValue(this.checked ? this.value : null);
  }
  toggle() {
    this.checked = !this.checked, this.emit("change", { checked: this.checked });
  }
  render() {
    return l`
      <span class="track" part="track" aria-hidden="true">
        <span class="thumb" part="thumb"></span>
      </span>
      <slot></slot>
    `;
  }
}
a([
  e({ type: Boolean, reflect: !0 })
], i.prototype, "checked");
a([
  e({ type: Boolean, reflect: !0 })
], i.prototype, "disabled");
a([
  e({ type: Boolean, reflect: !0 })
], i.prototype, "required");
a([
  e({ type: String })
], i.prototype, "name");
a([
  e({ type: String })
], i.prototype, "value");
a([
  e({ type: String, reflect: !0 })
], i.prototype, "size");
export {
  i as VdsSwitch
};
