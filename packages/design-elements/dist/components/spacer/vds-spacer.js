import { css as n, html as c } from "lit";
import { property as a } from "lit/decorators.js";
import { VdsElement as d } from "../../base/vds-element.js";
var p = Object.defineProperty, e = (i, h, o, l) => {
  for (var s = void 0, t = i.length - 1, v; t >= 0; t--)
    (v = i[t]) && (s = v(h, o, s) || s);
  return s && p(h, o, s), s;
};
class r extends d {
  constructor() {
    super(...arguments), this.axis = "vertical", this.grow = !1;
  }
  static {
    this.styles = n`
    :host { display: block; flex-shrink: 0; }
    :host([hidden]) { display: none; }

    :host([grow]) { flex-grow: 1; }

    :host([axis="vertical"][size="1"])  { height: var(--vds-spacing-1); }
    :host([axis="vertical"][size="2"])  { height: var(--vds-spacing-2); }
    :host([axis="vertical"][size="3"])  { height: var(--vds-spacing-3); }
    :host([axis="vertical"][size="4"])  { height: var(--vds-spacing-4); }
    :host([axis="vertical"][size="5"])  { height: var(--vds-spacing-5); }
    :host([axis="vertical"][size="6"])  { height: var(--vds-spacing-6); }
    :host([axis="vertical"][size="8"])  { height: var(--vds-spacing-8); }
    :host([axis="vertical"][size="10"]) { height: var(--vds-spacing-10); }
    :host([axis="vertical"][size="12"]) { height: var(--vds-spacing-12); }
    :host([axis="vertical"][size="16"]) { height: var(--vds-spacing-16); }

    :host([axis="horizontal"][size="1"])  { width: var(--vds-spacing-1); }
    :host([axis="horizontal"][size="2"])  { width: var(--vds-spacing-2); }
    :host([axis="horizontal"][size="3"])  { width: var(--vds-spacing-3); }
    :host([axis="horizontal"][size="4"])  { width: var(--vds-spacing-4); }
    :host([axis="horizontal"][size="5"])  { width: var(--vds-spacing-5); }
    :host([axis="horizontal"][size="6"])  { width: var(--vds-spacing-6); }
    :host([axis="horizontal"][size="8"])  { width: var(--vds-spacing-8); }
    :host([axis="horizontal"][size="10"]) { width: var(--vds-spacing-10); }
    :host([axis="horizontal"][size="12"]) { width: var(--vds-spacing-12); }
    :host([axis="horizontal"][size="16"]) { width: var(--vds-spacing-16); }
  `;
  }
  render() {
    return c``;
  }
}
e([
  a({ type: String, reflect: !0 })
], r.prototype, "axis");
e([
  a({ type: String, reflect: !0 })
], r.prototype, "size");
e([
  a({ type: Boolean, reflect: !0 })
], r.prototype, "grow");
export {
  r as VdsSpacer
};
