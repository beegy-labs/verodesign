import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as n } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as s } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as v } from "../../base/vds-element.js";
import { css as p } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var u = Object.defineProperty, d = (t, a, i, h) => {
  for (var r = void 0, e = t.length - 1, l; e >= 0; e--)
    (l = t[e]) && (r = l(a, i, r) || r);
  return r && u(a, i, r), r;
};
class o extends v {
  constructor() {
    super(...arguments), this.variant = "default", this.radius = "xl", this.borderless = !1;
  }
  static {
    this.styles = p`
    :host {
      display: block;
      background: var(--vds-theme-bg-card);
      border-radius: var(--vds-radius-xl);
    }
    :host([hidden]) { display: none; }

    :host(:not([borderless])) {
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
    }

    :host([radius="lg"]) { border-radius: var(--vds-radius-lg); }

    :host([variant="padded"])  { padding: var(--vds-spacing-5); }
    :host([variant="section"]) {
      padding: var(--vds-spacing-5);
      display: flex;
      flex-direction: column;
      gap: var(--vds-spacing-4);
    }
    :host([variant="inset"])   { overflow: hidden; }
    :host([variant="divided"]) ::slotted(* + *) {
      border-top: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
    }
  `;
  }
  render() {
    return n`<slot></slot>`;
  }
}
d([
  s({ type: String, reflect: !0 })
], o.prototype, "variant");
d([
  s({ type: String, reflect: !0 })
], o.prototype, "radius");
d([
  s({ type: Boolean, reflect: !0 })
], o.prototype, "borderless");
export {
  o as VdsSurface
};
