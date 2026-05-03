import { css as p, html as d } from "lit";
import { property as n } from "lit/decorators.js";
import { setRole as s } from "../../utils/attribute-mirror.js";
import { VdsElement as c } from "../../base/vds-element.js";
var u = Object.defineProperty, h = (r, t, o, f) => {
  for (var e = void 0, i = r.length - 1, a; i >= 0; i--)
    (a = r[i]) && (e = a(t, o, e) || e);
  return e && u(t, o, e), e;
};
class l extends c {
  constructor() {
    super(), this.orientation = "horizontal", this.decorative = !0, this.internals = this.attachInternals();
  }
  static {
    this.styles = p`
    :host {
      display: block;
      flex-shrink: 0;
      background: var(--vds-theme-border-subtle);
    }
    :host([orientation="horizontal"]) {
      width: 100%;
      height: 1px;
    }
    :host([orientation="vertical"]) {
      height: auto;
      align-self: stretch;
      width: 1px;
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
    return d``;
  }
}
h([
  n({ type: String, reflect: !0 })
], l.prototype, "orientation");
h([
  n({ type: Boolean, reflect: !0 })
], l.prototype, "decorative");
export {
  l as VdsSeparator
};
