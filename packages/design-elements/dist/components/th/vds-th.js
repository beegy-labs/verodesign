import { css as i, html as d } from "lit";
import { property as l } from "lit/decorators.js";
import { VdsElement as p } from "../../base/vds-element.js";
var h = Object.defineProperty, s = (c, t, o, v) => {
  for (var e = void 0, a = c.length - 1, n; a >= 0; a--)
    (n = c[a]) && (e = n(t, o, e) || e);
  return e && h(t, o, e), e;
};
class r extends p {
  constructor() {
    super(...arguments), this.align = "left", this.compact = !1, this.dim = !1;
  }
  // Use Light DOM (no shadow) so the <th> is a real table cell child of the parent <tr>.
  createRenderRoot() {
    return this;
  }
  static {
    this.styles = i``;
  }
  render() {
    const t = ["vds-th-cell"];
    return this.align && t.push(`vds-th-cell--${this.align}`), this.compact && t.push("vds-th-cell--compact"), this.dim && t.push("vds-th-cell--dim"), d`<th class="${t.join(" ")}" part="cell" colspan=${this.colspan ?? 1}><slot></slot></th>`;
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
s([
  l({ type: String, reflect: !0 })
], r.prototype, "align");
s([
  l({ type: Boolean, reflect: !0 })
], r.prototype, "compact");
s([
  l({ type: Boolean, reflect: !0 })
], r.prototype, "dim");
s([
  l({ type: Number, reflect: !0 })
], r.prototype, "colspan");
export {
  r as VdsTh
};
