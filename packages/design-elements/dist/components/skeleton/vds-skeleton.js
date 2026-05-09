import { css as d, html as o } from "lit";
import { property as n } from "lit/decorators.js";
import { VdsElement as h } from "../../base/vds-element.js";
var p = Object.defineProperty, v = (r, t, i, u) => {
  for (var e = void 0, s = r.length - 1, a; s >= 0; s--)
    (a = r[s]) && (e = a(t, i, e) || e);
  return e && p(t, i, e), e;
};
class m extends h {
  constructor() {
    super(...arguments), this.shape = "rect";
  }
  static {
    this.styles = d`
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
    return o``;
  }
}
v([
  n({ type: String, reflect: !0 })
], m.prototype, "shape");
export {
  m as VdsSkeleton
};
