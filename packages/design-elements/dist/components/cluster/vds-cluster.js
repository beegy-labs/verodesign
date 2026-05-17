import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as l } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as e } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as g } from "../../base/vds-element.js";
import { css as f } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var c = Object.defineProperty, s = (r, o, i, h) => {
  for (var t = void 0, n = r.length - 1, p; n >= 0; n--)
    (p = r[n]) && (t = p(o, i, t) || t);
  return t && c(o, i, t), t;
};
class a extends g {
  constructor() {
    super(...arguments), this.gap = "2", this.nowrap = !1;
  }
  static {
    this.styles = f`
    :host {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
    }
    :host([hidden]) { display: none; }
    :host([nowrap]) { flex-wrap: nowrap; }

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
], a.prototype, "gap");
s([
  e({ type: String, reflect: !0 })
], a.prototype, "align");
s([
  e({ type: String, reflect: !0 })
], a.prototype, "justify");
s([
  e({ type: Boolean, reflect: !0 })
], a.prototype, "nowrap");
export {
  a as VdsCluster
};
