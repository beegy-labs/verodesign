import { css as l, html as n } from "lit";
import { property as o } from "lit/decorators.js";
import { VdsElement as g } from "../../base/vds-element.js";
var c = Object.defineProperty, m = (s, a, e, d) => {
  for (var t = void 0, r = s.length - 1, p; r >= 0; r--)
    (p = s[r]) && (t = p(a, e, t) || t);
  return t && c(a, e, t), t;
};
class i extends g {
  constructor() {
    super(...arguments), this.cols = "1", this.gap = "0";
  }
  static {
    this.styles = l`
    :host {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    :host([hidden]) { display: none; }

    :host([cols="1"])  { grid-template-columns: repeat(1,  minmax(0, 1fr)); }
    :host([cols="2"])  { grid-template-columns: repeat(2,  minmax(0, 1fr)); }
    :host([cols="3"])  { grid-template-columns: repeat(3,  minmax(0, 1fr)); }
    :host([cols="4"])  { grid-template-columns: repeat(4,  minmax(0, 1fr)); }
    :host([cols="5"])  { grid-template-columns: repeat(5,  minmax(0, 1fr)); }
    :host([cols="6"])  { grid-template-columns: repeat(6,  minmax(0, 1fr)); }
    :host([cols="12"]) { grid-template-columns: repeat(12, minmax(0, 1fr)); }

    :host([gap="0"]) { gap: 0; }
    :host([gap="1"]) { gap: var(--vds-spacing-1); }
    :host([gap="2"]) { gap: var(--vds-spacing-2); }
    :host([gap="3"]) { gap: var(--vds-spacing-3); }
    :host([gap="4"]) { gap: var(--vds-spacing-4); }
    :host([gap="5"]) { gap: var(--vds-spacing-5); }
    :host([gap="6"]) { gap: var(--vds-spacing-6); }
    :host([gap="8"]) { gap: var(--vds-spacing-8); }
  `;
  }
  render() {
    return n`<slot></slot>`;
  }
}
m([
  o({ type: String, reflect: !0 })
], i.prototype, "cols");
m([
  o({ type: String, reflect: !0 })
], i.prototype, "gap");
export {
  i as VdsGrid
};
