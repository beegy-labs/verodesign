import { css as l, html as d } from "lit";
import { property as n } from "lit/decorators.js";
import { VdsElement as i } from "../../base/vds-element.js";
var v = Object.defineProperty, f = (e, r, a, c) => {
  for (var t = void 0, s = e.length - 1, o; s >= 0; s--)
    (o = e[s]) && (t = o(r, a, t) || t);
  return t && v(r, a, t), t;
};
class p extends i {
  constructor() {
    super(...arguments), this.density = "normal";
  }
  static {
    this.styles = l`
    :host { display: block; width: 100%; overflow-x: auto; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--vds-font-family-sans);
      font-size: var(--vds-font-size-sm);
      color: var(--vds-theme-text-primary);
      background: var(--vds-theme-bg-card);
    }
    ::slotted(thead),
    .head ::slotted(*) { background: var(--vds-theme-bg-elevated); }

    /* style projected table rows via ::part / standard cascade */
    :host([density="compact"]) table { font-size: var(--vds-font-size-xs); }
    :host([density="comfortable"]) table { font-size: var(--vds-font-size-base); }
  `;
  }
  render() {
    return d`
      <table part="table">
        <slot name="caption"></slot>
        <slot></slot>
      </table>
    `;
  }
}
f([
  n({ type: String, reflect: !0 })
], p.prototype, "density");
export {
  p as VdsTable
};
