import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as d } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as o } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as n } from "../../base/vds-element.js";
import { css as m } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var p = Object.defineProperty, h = (e, t, i, u) => {
  for (var r = void 0, s = e.length - 1, a; s >= 0; s--)
    (a = e[s]) && (r = a(t, i, r) || r);
  return r && p(t, i, r), r;
};
class v extends n {
  constructor() {
    super(...arguments), this.shape = "rect";
  }
  static {
    this.styles = m`
    :host {
      display: block;
      background: linear-gradient(
        90deg,
        var(--vds-theme-bg-muted) 0%,
        var(--vds-theme-bg-hover) 50%,
        var(--vds-theme-bg-muted) 100%
      );
      background-size: 200% 100%;
      animation: shimmer 1.4s ease-in-out infinite;
      border-radius: var(--vds-radius-md);
      width: 100%;
      height: var(--vds-spacing-4);
    }
    :host([hidden]) { display: none; }
    :host([shape="circle"]) { border-radius: var(--vds-radius-full); aspect-ratio: 1; height: var(--vds-spacing-10); width: var(--vds-spacing-10); }
    :host([shape="text"]) { height: var(--vds-spacing-4); border-radius: var(--vds-radius-sm); }

    @keyframes shimmer {
      0%   { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      :host { animation: none; }
    }
  `;
  }
  render() {
    return d``;
  }
}
h([
  o({ type: String, reflect: !0 })
], v.prototype, "shape");
export {
  v as VdsSkeleton
};
