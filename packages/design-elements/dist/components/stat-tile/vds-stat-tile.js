import { css as d, html as v } from "lit";
import { property as t } from "lit/decorators.js";
import { VdsElement as p } from "../../base/vds-element.js";
var h = Object.defineProperty, s = (r, o, i, c) => {
  for (var e = void 0, n = r.length - 1, l; n >= 0; n--)
    (l = r[n]) && (e = l(o, i, e) || e);
  return e && h(o, i, e), e;
};
class a extends p {
  constructor() {
    super(...arguments), this.label = "", this.value = "", this.deltaTone = "neutral", this.tone = "default";
  }
  static {
    this.styles = d`
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
      font-size: var(--vds-font-size-xs);
      color: var(--vds-theme-text-secondary);
    }
    .icon { color: var(--vds-theme-text-faint); display: flex; }
    .icon ::slotted(*) { width: 1rem; height: 1rem; }

    .value {
      font-size: var(--vds-font-size-2xl);
      font-weight: var(--vds-font-weight-700);
      color: var(--vds-theme-text-bright);
      line-height: var(--vds-font-lineheight-tight);
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
      font-size: var(--vds-font-size-xs);
      font-weight: var(--vds-font-weight-500);
    }
    :host([delta-tone="positive"]) .delta { color: var(--vds-theme-success); }
    :host([delta-tone="negative"]) .delta { color: var(--vds-theme-destructive); }
    :host([delta-tone="neutral"])  .delta { color: var(--vds-theme-text-secondary); }
    .delta:empty { display: none; }

    .hint {
      font-size: var(--vds-font-size-xs);
      color: var(--vds-theme-text-secondary);
    }
    .hint:empty { display: none; }
    .meta:has(.delta:empty):has(.hint:empty) { display: none; }
  `;
  }
  render() {
    return v`
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
s([
  t({ type: String })
], a.prototype, "label");
s([
  t({ type: String })
], a.prototype, "value");
s([
  t({ type: String })
], a.prototype, "delta");
s([
  t({ type: String })
], a.prototype, "hint");
s([
  t({ type: String, reflect: !0, attribute: "delta-tone" })
], a.prototype, "deltaTone");
s([
  t({ type: String, reflect: !0 })
], a.prototype, "tone");
export {
  a as VdsStatTile
};
