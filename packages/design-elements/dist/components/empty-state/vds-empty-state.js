import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as p } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as e } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as c } from "../../base/vds-element.js";
import { css as l } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var v = Object.defineProperty, o = (s, n, r, m) => {
  for (var t = void 0, i = s.length - 1, d; i >= 0; i--)
    (d = s[i]) && (t = d(n, r, t) || t);
  return t && v(n, r, t), t;
};
class a extends c {
  constructor() {
    super(...arguments), this.size = "md";
  }
  static {
    this.styles = l`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      gap: var(--vds-spacing-2);
    }
    :host([hidden]) { display: none; }

    :host([size="sm"]) { padding-block: var(--vds-spacing-6); }
    :host([size="md"]) { padding-block: var(--vds-spacing-10); }
    :host([size="lg"]) { padding-block: var(--vds-spacing-16); }

    .icon {
      color: var(--vds-theme-text-faint);
    }
    :host([size="sm"]) .icon ::slotted(*) { width: var(--vds-spacing-6); height: var(--vds-spacing-6); }
    :host([size="md"]) .icon ::slotted(*) { width: var(--vds-spacing-8); height: var(--vds-spacing-8); }
    :host([size="lg"]) .icon ::slotted(*) { width: var(--vds-spacing-10); height: var(--vds-spacing-10); }

    .title {
      font-size: var(--vds-type-role-label-size);
      font-weight: var(--vds-type-role-label-weight);
      color: var(--vds-theme-text-primary);
      margin: 0;
    }
    .description {
      font-size: var(--vds-type-role-caption-size);
      color: var(--vds-theme-text-secondary);
      max-width: calc(var(--vds-spacing-64) + var(--vds-spacing-48));
      margin: 0;
    }
    .action { margin-top: var(--vds-spacing-3); }

    slot[name="description"]:not(:empty) ~ .description-fallback,
    slot:not([name]):not(:empty) ~ .title-fallback {
      display: none;
    }
  `;
  }
  render() {
    return p`
      <div class="icon"><slot name="icon"></slot></div>
      <p class="title"><slot>${this.heading ?? ""}</slot></p>
      <p class="description"><slot name="description">${this.description ?? ""}</slot></p>
      <div class="action"><slot name="action"></slot></div>
    `;
  }
}
o([
  e({ type: String, reflect: !0 })
], a.prototype, "size");
o([
  e({ type: String })
], a.prototype, "heading");
o([
  e({ type: String })
], a.prototype, "description");
export {
  a as VdsEmptyState
};
