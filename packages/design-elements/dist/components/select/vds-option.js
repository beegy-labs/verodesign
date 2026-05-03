import { LitElement as p, css as d, html as c } from "lit";
import { property as s } from "lit/decorators.js";
import { setRole as v } from "../../utils/attribute-mirror.js";
var h = Object.defineProperty, o = (t, i, l, m) => {
  for (var e = void 0, r = t.length - 1, n; r >= 0; r--)
    (n = t[r]) && (e = n(i, l, e) || e);
  return e && h(i, l, e), e;
};
class a extends p {
  constructor() {
    super(), this.value = "", this.selected = !1, this.disabled = !1, this.internals = this.attachInternals(), v(this, this.internals, "option");
  }
  static {
    this.styles = d`
    :host {
      display: flex;
      align-items: center;
      padding: var(--vds-spacing-1_5) var(--vds-spacing-3);
      cursor: pointer;
      color: var(--vds-theme-text-primary);
      font-size: var(--vds-font-size-sm);
      user-select: none;
    }
    :host([disabled]) { opacity: 0.5; cursor: not-allowed; }
    :host([data-active]) { background: var(--vds-theme-bg-hover); }
    :host([selected]) { background: color-mix(in oklab, var(--vds-theme-primary) 12%, transparent); color: var(--vds-theme-primary); }
  `;
  }
  render() {
    return c`<slot></slot>`;
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
