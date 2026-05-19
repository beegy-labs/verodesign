import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as d } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as t } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as v } from "../../base/vds-element.js";
import { css as p } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var c = Object.defineProperty, a = (r, i, n, h) => {
  for (var e = void 0, o = r.length - 1, l; o >= 0; o--)
    (l = r[o]) && (e = l(i, n, e) || e);
  return e && c(i, n, e), e;
};
class s extends v {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.deltaTone = "neutral", this.tone = "default";
  }
  static {
    this.styles = p`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--vds-spacing-1);
      padding: var(--vds-spacing-4) var(--vds-spacing-5);
      background: var(--vds-theme-bg-card);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      border-radius: var(--vds-radius-lg);
    }
    :host([hidden]) { display: none; }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--vds-spacing-2);
    }
    .label {
      font-size: var(--vds-type-role-caption-size);
      color: var(--vds-theme-text-secondary);
    }
    .icon { color: var(--vds-theme-text-faint); display: flex; }
    .icon ::slotted(*) { width: var(--vds-spacing-4); height: var(--vds-spacing-4); }

    .value {
      font-size: var(--vds-type-role-metric-size);
      font-weight: var(--vds-type-role-metric-weight);
      color: var(--vds-theme-text-bright);
      line-height: var(--vds-type-role-metric-lineheight);
      font-variant-numeric: tabular-nums;
    }
    :host([tone="success"]) .value { color: var(--vds-theme-success); }
    :host([tone="warning"]) .value { color: var(--vds-theme-warning); }
    :host([tone="error"])   .value { color: var(--vds-theme-destructive); }

    .meta {
      display: flex;
      align-items: baseline;
      gap: var(--vds-spacing-2);
      flex-wrap: wrap;
    }
    .delta {
      font-size: var(--vds-type-role-caption-size);
      font-weight: var(--vds-type-role-label-weight);
    }
    :host([delta-tone="positive"]) .delta { color: var(--vds-theme-success); }
    :host([delta-tone="negative"]) .delta { color: var(--vds-theme-destructive); }
    :host([delta-tone="neutral"])  .delta { color: var(--vds-theme-text-secondary); }
    .delta:empty { display: none; }

    .hint {
      font-size: var(--vds-type-role-caption-size);
      color: var(--vds-theme-text-secondary);
    }
    .hint:empty { display: none; }
    .meta:has(.delta:empty):has(.hint:empty) { display: none; }
  `;
  }
  render() {
    return d`
      <div class="header">
        <span class="label">${this.label}</span>
        <span class="icon"><slot name="icon"></slot></span>
      </div>
      <span class="value">${this.value}</span>
      <div class="meta">
        <span class="delta">${this.delta ?? ""}</span>
        <span class="hint">${this.hint ?? ""}</span>
      </div>
    `;
  }
}
a([
  t({ type: String })
], s.prototype, "label");
a([
  t({ type: String })
], s.prototype, "value");
a([
  t({ type: String })
], s.prototype, "delta");
a([
  t({ type: String })
], s.prototype, "hint");
a([
  t({ type: String, reflect: !0, attribute: "delta-tone" })
], s.prototype, "deltaTone");
a([
  t({ type: String, reflect: !0 })
], s.prototype, "tone");
export {
  s as VdsStatTile
};
