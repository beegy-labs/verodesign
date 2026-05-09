import { css as n, html as v } from "lit";
import { property as s } from "lit/decorators.js";
import { VdsElement as p } from "../../base/vds-element.js";
var u = Object.defineProperty, d = (e, a, i, h) => {
  for (var r = void 0, t = e.length - 1, l; t >= 0; t--)
    (l = e[t]) && (r = l(a, i, r) || r);
  return r && u(a, i, r), r;
};
class o extends p {
  constructor() {
    super(...arguments), this.variant = "default", this.radius = "xl", this.borderless = !1;
  }
  static {
    this.styles = n`
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
    return v`<slot></slot>`;
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
