import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as l } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as e } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as c } from "../../base/vds-element.js";
import { css as g } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var f = Object.defineProperty, s = (n, i, a, h) => {
  for (var t = void 0, o = n.length - 1, p; o >= 0; o--)
    (p = n[o]) && (t = p(i, a, t) || t);
  return t && f(i, a, t), t;
};
class r extends c {
  constructor() {
    super(...arguments), this.direction = "column", this.gap = "0", this.wrap = !1;
  }
  static {
    this.styles = g`
    :host {
      display: flex;
      flex-direction: column;
    }
    :host([hidden]) { display: none; }

    :host([direction="row"])    { flex-direction: row; }
    :host([direction="column"]) { flex-direction: column; }
    :host([wrap])               { flex-wrap: wrap; }

    :host([gap="0"]) { gap: 0; }
    :host([gap="1"]) { gap: var(--vds-spacing-1); }
    :host([gap="2"]) { gap: var(--vds-spacing-2); }
    :host([gap="3"]) { gap: var(--vds-spacing-3); }
    :host([gap="4"]) { gap: var(--vds-spacing-4); }
    :host([gap="5"]) { gap: var(--vds-spacing-5); }
    :host([gap="6"]) { gap: var(--vds-spacing-6); }
    :host([gap="8"]) { gap: var(--vds-spacing-8); }

    :host([align="start"])    { align-items: flex-start; }
    :host([align="center"])   { align-items: center; }
    :host([align="end"])      { align-items: flex-end; }
    :host([align="stretch"])  { align-items: stretch; }
    :host([align="baseline"]) { align-items: baseline; }

    :host([justify="start"])   { justify-content: flex-start; }
    :host([justify="center"])  { justify-content: center; }
    :host([justify="end"])     { justify-content: flex-end; }
    :host([justify="between"]) { justify-content: space-between; }
    :host([justify="around"])  { justify-content: space-around; }
    :host([justify="evenly"])  { justify-content: space-evenly; }
  `;
  }
  render() {
    return l`<slot></slot>`;
  }
}
s([
  e({ type: String, reflect: !0 })
], r.prototype, "direction");
s([
  e({ type: String, reflect: !0 })
], r.prototype, "gap");
s([
  e({ type: String, reflect: !0 })
], r.prototype, "align");
s([
  e({ type: String, reflect: !0 })
], r.prototype, "justify");
s([
  e({ type: Boolean, reflect: !0 })
], r.prototype, "wrap");
export {
  r as VdsStack
};
