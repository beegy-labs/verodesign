import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as p } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import { LitElement as d } from "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as s } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { setRole as c } from "../../utils/attribute-mirror.js";
import { css as v } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var m = Object.defineProperty, o = (t, i, l, h) => {
  for (var e = void 0, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (e = n(i, l, e) || e);
  return e && m(i, l, e), e;
};
class a extends d {
  constructor() {
    super(), this.value = "", this.selected = !1, this.disabled = !1, this.internals = this.attachInternals(), c(this, this.internals, "option");
  }
  static {
    this.styles = v`
    :host {
      display: flex;
      align-items: center;
      padding: var(--vds-spacing-1_5) var(--vds-spacing-3);
      cursor: pointer;
      color: var(--vds-theme-text-primary);
      font-size: var(--vds-type-role-label-size);
      user-select: none;
    }
    :host([disabled]) { opacity: 0.5; cursor: not-allowed; }
    :host([data-active]) { background: var(--vds-theme-bg-hover); }
    :host([selected]) { background: color-mix(in oklab, var(--vds-theme-primary) 12%, transparent); color: var(--vds-theme-primary); }
  `;
  }
  render() {
    return p`<slot></slot>`;
  }
}
o([
  s({ type: String, reflect: !0 })
], a.prototype, "value");
o([
  s({ type: Boolean, reflect: !0 })
], a.prototype, "selected");
o([
  s({ type: Boolean, reflect: !0 })
], a.prototype, "disabled");
export {
  a as VdsOption
};
