import { css as n, html as h } from "lit";
import { property as s } from "lit/decorators.js";
import { VdsElement as l } from "../../base/vds-element.js";
var b = Object.defineProperty, v = (r, t, a, p) => {
  for (var e = void 0, o = r.length - 1, d; o >= 0; o--)
    (d = r[o]) && (e = d(t, a, e) || e);
  return e && b(t, a, e), e;
};
class i extends l {
  constructor() {
    super(...arguments), this.variant = "surface", this.elevation = "1";
  }
  static {
    this.styles = n`
    :host {
      display: block;
      background: var(--vds-theme-bg-card);
      color: var(--vds-theme-text-primary);
      border-radius: var(--vds-radius-lg);
      overflow: hidden;
    }

    :host([variant="outline"]) {
      background: transparent;
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
    }
    :host([variant="ghost"]) {
      background: transparent;
    }

    :host([elevation="1"]) { box-shadow: var(--vds-shadow-1); }
    :host([elevation="2"]) { box-shadow: var(--vds-shadow-2); }
    :host([elevation="3"]) { box-shadow: var(--vds-shadow-3); }
    :host([elevation="4"]) { box-shadow: var(--vds-shadow-4); }
    :host([elevation="5"]) { box-shadow: var(--vds-shadow-5); }

    .header,
    .body,
    .footer {
      padding: var(--vds-spacing-4);
    }
    .header {
      border-bottom: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
    }
    .footer {
      border-top: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      background: var(--vds-theme-bg-page);
    }

    slot[name="header"]:not(:empty) ~ .body,
    .body:has(+ slot[name="footer"]:not(:empty)) {
      padding-block: var(--vds-spacing-4);
    }

    .header:empty,
    .footer:empty {
      display: none;
    }
  `;
  }
  render() {
    return h`
      <div class="header"><slot name="header"></slot></div>
      <div class="body"><slot></slot></div>
      <div class="footer"><slot name="footer"></slot></div>
    `;
  }
}
v([
  s({ type: String, reflect: !0 })
], i.prototype, "variant");
v([
  s({ type: String, reflect: !0 })
], i.prototype, "elevation");
export {
  i as VdsCard
};
