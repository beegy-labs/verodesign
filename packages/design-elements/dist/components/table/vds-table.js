import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as l } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as d } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as i } from "../../base/vds-element.js";
import { css as n } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var p = Object.defineProperty, m = (e, s, o, c) => {
  for (var t = void 0, r = e.length - 1, a; r >= 0; r--)
    (a = e[r]) && (t = a(s, o, t) || t);
  return t && p(s, o, t), t;
};
class v extends i {
  constructor() {
    super(...arguments), this.density = "normal";
  }
  static {
    this.styles = n`
    :host { display: block; width: 100%; overflow-x: auto; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--vds-font-family-sans);
      font-size: var(--vds-type-role-label-size);
      color: var(--vds-theme-text-primary);
      background: var(--vds-theme-bg-card);
    }
    ::slotted(thead),
    .head ::slotted(*) { background: var(--vds-theme-bg-elevated); }

    /* style projected table rows via ::part / standard cascade */
    :host([density="compact"]) table { font-size: var(--vds-type-role-caption-size); }
    :host([density="comfortable"]) table { font-size: var(--vds-type-role-body-size); }
  `;
  }
  render() {
    return l`
      <table part="table">
        <slot name="caption"></slot>
        <slot></slot>
      </table>
    `;
  }
}
m([
  d({ type: String, reflect: !0 })
], v.prototype, "density");
export {
  v as VdsTable
};
