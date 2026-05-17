import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { literal as s, html as d } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/static.js";
import { property as l } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as v } from "../../base/vds-element.js";
import { css as p } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var g = Object.defineProperty, n = (o, e, r, f) => {
  for (var t = void 0, i = o.length - 1, h; i >= 0; i--)
    (h = o[i]) && (t = h(e, r, t) || t);
  return t && g(e, r, t), t;
};
class a extends v {
  constructor() {
    super(...arguments), this.level = "1", this.tone = "bright";
  }
  static {
    this.styles = p`
    :host {
      display: block;
      font-family: var(--vds-font-family-sans);
    }
    :host([hidden]) { display: none; }

    .heading {
      margin: 0;
      font-weight: var(--vds-type-role-title-weight);
      line-height: var(--vds-font-lineheight-snug);
      color: var(--vds-theme-text-bright);
    }
    :host([level="1"]) .heading { font-size: var(--vds-type-role-title-size); }
    :host([level="2"]) .heading { font-size: var(--vds-type-role-title-size); }
    :host([level="3"]) .heading { font-size: var(--vds-type-role-body-size); }
    :host([level="4"]) .heading { font-size: var(--vds-type-role-label-size); }

    :host([tone="default"]) .heading { color: var(--vds-theme-text-primary); }
    :host([tone="muted"])   .heading { color: var(--vds-theme-text-secondary); }
  `;
  }
  render() {
    const e = this.as ?? `h${this.level}`, r = e === "h1" ? s`h1` : e === "h2" ? s`h2` : e === "h3" ? s`h3` : s`h4`;
    return d`<${r} class="heading" part="heading"><slot></slot></${r}>`;
  }
}
n([
  l({ type: String, reflect: !0 })
], a.prototype, "level");
n([
  l({ type: String })
], a.prototype, "as");
n([
  l({ type: String, reflect: !0 })
], a.prototype, "tone");
export {
  a as VdsHeading
};
