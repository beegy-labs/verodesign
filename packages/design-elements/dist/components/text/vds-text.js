import { css as h, html as p } from "lit";
import { property as t } from "lit/decorators.js";
import { VdsElement as f } from "../../base/vds-element.js";
var v = Object.defineProperty, e = (s, i, a, c) => {
  for (var r = void 0, n = s.length - 1, l; n >= 0; n--)
    (l = s[n]) && (r = l(i, a, r) || r);
  return r && v(i, a, r), r;
};
class o extends f {
  constructor() {
    super(...arguments), this.truncate = !1, this.uppercase = !1, this.mono = !1, this.tabular = !1;
  }
  static {
    this.styles = h`
    :host {
      display: block;
      font-family: var(--vds-font-family-sans);
      color: var(--vds-theme-text-primary);
      margin: 0;
    }
    :host([as="span"]) { display: inline; }
    :host([hidden]) { display: none; }

    :host([size="xs"])    { font-size: var(--vds-font-size-xs); }
    :host([size="sm"])    { font-size: var(--vds-font-size-sm); }
    :host([size="base"])  { font-size: var(--vds-font-size-base); }
    :host([size="lg"])    { font-size: var(--vds-font-size-lg); }
    :host([size="xl"])    { font-size: var(--vds-font-size-xl); }

    :host([tone="bright"])  { color: var(--vds-theme-text-bright); }
    :host([tone="dim"])     { color: var(--vds-theme-text-secondary); }
    :host([tone="muted"])   { color: var(--vds-theme-text-faint); }
    :host([tone="primary"]) { color: var(--vds-theme-primary); }
    :host([tone="success"]) { color: var(--vds-theme-success); }
    :host([tone="warning"]) { color: var(--vds-theme-warning); }
    :host([tone="error"])   { color: var(--vds-theme-destructive); }

    :host([weight="400"]) { font-weight: var(--vds-font-weight-400); }
    :host([weight="500"]) { font-weight: var(--vds-font-weight-500); }
    :host([weight="600"]) { font-weight: var(--vds-font-weight-600); }
    :host([weight="700"]) { font-weight: var(--vds-font-weight-700); }

    :host([align="left"])   { text-align: left; }
    :host([align="center"]) { text-align: center; }
    :host([align="right"])  { text-align: right; }

    :host([truncate]) {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    :host([uppercase]) { text-transform: uppercase; letter-spacing: 0.05em; }
    :host([mono]) { font-family: var(--vds-font-family-mono); }
    :host([tabular]) { font-variant-numeric: tabular-nums; }
  `;
  }
  render() {
    return p`<slot></slot>`;
  }
}
e([
  t({ type: String, reflect: !0 })
], o.prototype, "size");
e([
  t({ type: String, reflect: !0 })
], o.prototype, "tone");
e([
  t({ type: String, reflect: !0 })
], o.prototype, "weight");
e([
  t({ type: String, reflect: !0 })
], o.prototype, "align");
e([
  t({ type: String, reflect: !0 })
], o.prototype, "as");
e([
  t({ type: Boolean, reflect: !0 })
], o.prototype, "truncate");
e([
  t({ type: Boolean, reflect: !0 })
], o.prototype, "uppercase");
e([
  t({ type: Boolean, reflect: !0 })
], o.prototype, "mono");
e([
  t({ type: Boolean, reflect: !0 })
], o.prototype, "tabular");
export {
  o as VdsText
};
