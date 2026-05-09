import { css as c, html as p } from "lit";
import { property as e } from "lit/decorators.js";
import { VdsElement as l } from "../../base/vds-element.js";
var v = Object.defineProperty, o = (s, r, a, m) => {
  for (var t = void 0, i = s.length - 1, d; i >= 0; i--)
    (d = s[i]) && (t = d(r, a, t) || t);
  return t && v(r, a, t), t;
};
class n extends l {
  constructor() {
    super(...arguments), this.size = "md";
  }
  static {
    this.styles = c`
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
      font-size: var(--vds-font-size-sm);
      font-weight: var(--vds-font-weight-500);
      color: var(--vds-theme-text-primary);
      margin: 0;
    }
    .description {
      font-size: var(--vds-font-size-xs);
      color: var(--vds-theme-text-secondary);
      max-width: 28rem;
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
], n.prototype, "size");
o([
  e({ type: String })
], n.prototype, "heading");
o([
  e({ type: String })
], n.prototype, "description");
export {
  n as VdsEmptyState
};
