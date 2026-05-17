import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as n } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as s } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as d } from "../../base/vds-element.js";
import { css as p } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var h = Object.defineProperty, l = (c, t, a, m) => {
  for (var e = void 0, o = c.length - 1, i; o >= 0; o--)
    (i = c[o]) && (e = i(t, a, e) || e);
  return e && h(t, a, e), e;
};
class r extends d {
  constructor() {
    super(...arguments), this.align = "left", this.compact = !1, this.dim = !1;
  }
  // Use Light DOM (no shadow) so the <th> is a real table cell child of the parent <tr>.
  createRenderRoot() {
    return this;
  }
  static {
    this.styles = p``;
  }
  render() {
    const t = ["vds-th-cell"];
    return this.align && t.push(`vds-th-cell--${this.align}`), this.compact && t.push("vds-th-cell--compact"), this.dim && t.push("vds-th-cell--dim"), n`<th class="${t.join(" ")}" part="cell" colspan=${this.colspan ?? 1}><slot></slot></th>`;
  }
  connectedCallback() {
    if (super.connectedCallback(), !document.head.querySelector("style[data-vds-th]")) {
      const t = document.createElement("style");
      t.setAttribute("data-vds-th", ""), t.textContent = `
        .vds-th-cell {
          padding-block: var(--vds-spacing-3);
          padding-inline: var(--vds-spacing-4);
          font-weight: var(--vds-font-weight-500);
          color: var(--vds-theme-text-primary);
        }
        .vds-th-cell--left   { text-align: left; }
        .vds-th-cell--center { text-align: center; }
        .vds-th-cell--right  { text-align: right; }
        .vds-th-cell--compact { padding-block: var(--vds-spacing-2); }
        .vds-th-cell--dim { color: var(--vds-theme-text-secondary); }
      `, document.head.appendChild(t);
    }
  }
}
l([
  s({ type: String, reflect: !0 })
], r.prototype, "align");
l([
  s({ type: Boolean, reflect: !0 })
], r.prototype, "compact");
l([
  s({ type: Boolean, reflect: !0 })
], r.prototype, "dim");
l([
  s({ type: Number, reflect: !0 })
], r.prototype, "colspan");
export {
  r as VdsTh
};
