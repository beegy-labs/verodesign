import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as n } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as d } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as h } from "../../base/vds-element.js";
import { css as l } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var p = Object.defineProperty, v = (o, t, a, b) => {
  for (var r = void 0, e = o.length - 1, s; e >= 0; e--)
    (s = o[e]) && (r = s(t, a, r) || r);
  return r && p(t, a, r), r;
};
class i extends h {
  constructor() {
    super(...arguments), this.variant = "surface", this.elevation = "1";
  }
  static {
    this.styles = l`
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
    return n`
      <div class="header"><slot name="header"></slot></div>
      <div class="body"><slot></slot></div>
      <div class="footer"><slot name="footer"></slot></div>
    `;
  }
}
v([
  d({ type: String, reflect: !0 })
], i.prototype, "variant");
v([
  d({ type: String, reflect: !0 })
], i.prototype, "elevation");
export {
  i as VdsCard
};
