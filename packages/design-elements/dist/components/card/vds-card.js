import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(target, key, result) || result;
  if (result) __defProp(target, key, result);
  return result;
};
class VdsCard extends LitElement {
  constructor() {
    super(...arguments);
    this.variant = "surface";
    this.elevation = "1";
  }
  static {
    this.styles = css`
    :host {
      display: block;
      background: var(--vds-theme-bg-card);
      color: var(--vds-theme-text-primary);
      border-radius: var(--vds-radius-lg);
      overflow: hidden;
    }

    :host([data-variant="outline"]) {
      background: transparent;
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
    }
    :host([data-variant="ghost"]) {
      background: transparent;
    }

    :host([data-elevation="1"]) { box-shadow: var(--vds-shadow-1); }
    :host([data-elevation="2"]) { box-shadow: var(--vds-shadow-2); }
    :host([data-elevation="3"]) { box-shadow: var(--vds-shadow-3); }
    :host([data-elevation="4"]) { box-shadow: var(--vds-shadow-4); }
    :host([data-elevation="5"]) { box-shadow: var(--vds-shadow-5); }

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
  connectedCallback() {
    super.connectedCallback();
    this.dataset.variant = this.variant;
    this.dataset.elevation = this.elevation;
  }
  updated(changed) {
    if (changed.has("variant")) this.dataset.variant = this.variant;
    if (changed.has("elevation")) this.dataset.elevation = this.elevation;
  }
  render() {
    return html`
      <div class="header"><slot name="header"></slot></div>
      <div class="body"><slot></slot></div>
      <div class="footer"><slot name="footer"></slot></div>
    `;
  }
}
__decorateClass([
  property({ type: String, reflect: true })
], VdsCard.prototype, "variant");
__decorateClass([
  property({ type: String, reflect: true })
], VdsCard.prototype, "elevation");
export {
  VdsCard
};
//# sourceMappingURL=vds-card.js.map
