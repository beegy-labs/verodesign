import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as n } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as a } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as p } from "../../base/vds-element.js";
import { css as c } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var d = Object.defineProperty, r = (i, o, h, l) => {
  for (var s = void 0, t = i.length - 1, v; t >= 0; t--)
    (v = i[t]) && (s = v(o, h, s) || s);
  return s && d(o, h, s), s;
};
class e extends p {
  constructor() {
    super(...arguments), this.axis = "vertical", this.grow = !1;
  }
  static {
    this.styles = c`
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
    return n``;
  }
}
r([
  a({ type: String, reflect: !0 })
], e.prototype, "axis");
r([
  a({ type: String, reflect: !0 })
], e.prototype, "size");
r([
  a({ type: Boolean, reflect: !0 })
], e.prototype, "grow");
export {
  e as VdsSpacer
};
