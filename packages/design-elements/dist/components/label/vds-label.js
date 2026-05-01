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
class VdsLabel extends LitElement {
  constructor() {
    super(...arguments);
    this.required = false;
    this.size = "md";
    this.handleClick = (event) => {
      if (!this.for) return;
      if (event.defaultPrevented) return;
      const target = this.getRootNode().getElementById(this.for);
      if (target && typeof target.focus === "function") {
        target.focus();
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
          const input = target;
          if (input.type === "checkbox" || input.type === "radio") input.click();
        }
      }
    };
  }
  static {
    this.styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-1);
      font-family: var(--vds-font-family-sans);
      font-weight: var(--vds-font-weight-500);
      color: var(--vds-theme-text-primary);
      cursor: pointer;
      user-select: none;
    }
    :host([data-size="sm"]) { font-size: var(--vds-font-size-sm); }
    :host([data-size="md"]) { font-size: var(--vds-font-size-base); }
    :host([data-size="lg"]) { font-size: var(--vds-font-size-lg); }

    .required {
      color: var(--vds-theme-destructive);
      margin-left: 2px;
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.dataset.size = this.size;
    this.addEventListener("click", this.handleClick);
  }
  updated() {
    this.dataset.size = this.size;
  }
  render() {
    return html`
      <slot></slot>
      ${this.required ? html`<span class="required" aria-hidden="true">*</span>` : null}
    `;
  }
}
__decorateClass([
  property({ type: String, reflect: true })
], VdsLabel.prototype, "for");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsLabel.prototype, "required");
__decorateClass([
  property({ type: String, reflect: true })
], VdsLabel.prototype, "size");
export {
  VdsLabel
};
//# sourceMappingURL=vds-label.js.map
