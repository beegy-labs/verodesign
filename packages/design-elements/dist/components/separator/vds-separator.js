import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as l } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as n } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { setRole as s } from "../../utils/attribute-mirror.js";
import { VdsElement as p } from "../../base/vds-element.js";
import { css as c } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var v = Object.defineProperty, h = (r, t, o, u) => {
  for (var e = void 0, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (e = a(t, o, e) || e);
  return e && v(t, o, e), e;
};
class d extends p {
  constructor() {
    super(), this.orientation = "horizontal", this.decorative = !0, this.internals = this.attachInternals();
  }
  static {
    this.styles = c`
    :host {
      display: block;
      flex-shrink: 0;
      background: var(--vds-theme-border-subtle);
    }
    :host([orientation="horizontal"]) {
      width: 100%;
      height: var(--vds-border-width-1);
    }
    :host([orientation="vertical"]) {
      height: auto;
      align-self: stretch;
      width: var(--vds-border-width-1);
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), s(this, this.internals, this.decorative ? "presentation" : "separator"), this.decorative || this.setAttribute("aria-orientation", this.orientation);
  }
  updated(t) {
    super.updated(t), !(!t.has("decorative") && !t.has("orientation")) && (s(this, this.internals, this.decorative ? "presentation" : "separator"), this.toggleAttribute("aria-orientation", !this.decorative), this.decorative || this.setAttribute("aria-orientation", this.orientation));
  }
  render() {
    return l``;
  }
}
h([
  n({ type: String, reflect: !0 })
], d.prototype, "orientation");
h([
  n({ type: Boolean, reflect: !0 })
], d.prototype, "decorative");
export {
  d as VdsSeparator
};
