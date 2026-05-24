import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { nothing as u, html as p } from "../../node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js";
import { svg as _ } from "../../node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as n } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as f } from "../../base/vds-element.js";
import { css as v } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var g = Object.defineProperty, l = (t, e, r, b) => {
  for (var i = void 0, s = t.length - 1, d; s >= 0; s--)
    (d = t[s]) && (i = d(e, r, i) || i);
  return i && g(e, r, i), i;
};
const o = {
  sm: "var(--vds-icon-size-sm)",
  md: "var(--vds-icon-size-md)",
  lg: "var(--vds-icon-size-lg)"
}, m = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Set();
function A(t, e) {
  m.set(t, e);
}
function c(t) {
  return t in o ? o[t] : /^\d+(\.\d+)?$/.test(t) ? `${t}px` : /^\d+(\.\d+)?(px|rem|em|%)$/.test(t) ? t : o.md;
}
class a extends f {
  constructor() {
    super(...arguments), this.name = "", this.size = "md", this.strokeWidth = 2;
  }
  static {
    this.styles = v`
    :host {
      display: inline-flex;
      color: currentColor;
      vertical-align: middle;
      flex: 0 0 auto;
    }

    :host([hidden]) {
      display: none;
    }

    svg {
      inline-size: 100%;
      block-size: 100%;
      display: block;
      overflow: visible;
    }
  `;
  }
  updated() {
    const e = this.getAttribute("aria-label");
    e && e.trim().length > 0 ? (this.setAttribute("role", "img"), this.removeAttribute("aria-hidden")) : (this.removeAttribute("role"), this.setAttribute("aria-hidden", "true"));
  }
  render() {
    const e = m.get(this.name), r = this.hasAttribute("stroke-width") ? String(this.strokeWidth || 2) : "var(--vds-icon-stroke-width)";
    return e ? p`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        focusable="false"
        aria-hidden="true"
        style=${`inline-size: ${c(this.size)}; block-size: ${c(this.size)}; stroke-width: ${r};`}
      >
        ${e}
      </svg>
    ` : (this.name && !h.has(this.name) && (h.add(this.name), console.warn(`[vds-icon] Unknown icon "${this.name}".`)), u);
  }
}
l([
  n({ type: String, reflect: !0 })
], a.prototype, "name");
l([
  n({ type: String, reflect: !0 })
], a.prototype, "size");
l([
  n({ type: Number, attribute: "stroke-width", reflect: !0 })
], a.prototype, "strokeWidth");
export {
  a as VdsIcon,
  A as registerIcon,
  _ as svg
};
