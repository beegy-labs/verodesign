import { css as d } from "lit";
import { literal as o, html as v } from "lit/static-html.js";
import { property as i } from "lit/decorators.js";
import { VdsElement as f } from "../../base/vds-element.js";
var g = Object.defineProperty, h = (r, t, s, p) => {
  for (var e = void 0, n = r.length - 1, l; n >= 0; n--)
    (l = r[n]) && (e = l(t, s, e) || e);
  return e && g(t, s, e), e;
};
class a extends f {
  constructor() {
    super(...arguments), this.level = "1", this.tone = "bright";
  }
  static {
    this.styles = d`
    :host {
      display: block;
      font-family: var(--vds-font-family-sans);
    }
    :host([hidden]) { display: none; }

    .heading {
      margin: 0;
      font-weight: var(--vds-font-weight-700);
      line-height: var(--vds-font-lineheight-snug);
      color: var(--vds-theme-text-bright);
    }
    :host([level="1"]) .heading { font-size: var(--vds-font-size-2xl); }
    :host([level="2"]) .heading { font-size: var(--vds-font-size-xl); }
    :host([level="3"]) .heading { font-size: var(--vds-font-size-lg); }
    :host([level="4"]) .heading { font-size: var(--vds-font-size-base); }

    :host([tone="default"]) .heading { color: var(--vds-theme-text-primary); }
    :host([tone="muted"])   .heading { color: var(--vds-theme-text-secondary); }
  `;
  }
  render() {
    const t = this.as ?? `h${this.level}`, s = t === "h1" ? o`h1` : t === "h2" ? o`h2` : t === "h3" ? o`h3` : o`h4`;
    return v`<${s} class="heading" part="heading"><slot></slot></${s}>`;
  }
}
h([
  i({ type: String, reflect: !0 })
], a.prototype, "level");
h([
  i({ type: String })
], a.prototype, "as");
h([
  i({ type: String, reflect: !0 })
], a.prototype, "tone");
export {
  a as VdsHeading
};
