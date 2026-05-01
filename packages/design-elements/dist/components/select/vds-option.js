import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { setRole } from "../../utils/attribute-mirror.js";
var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(target, key, result) || result;
  if (result) __defProp(target, key, result);
  return result;
};
class VdsOption extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.selected = false;
    this.disabled = false;
    this.internals = this.attachInternals();
    setRole(this, this.internals, "option");
  }
  static {
    this.styles = css`
    :host {
      display: flex;
      align-items: center;
      padding: var(--vds-spacing-1_5) var(--vds-spacing-3);
      cursor: pointer;
      color: var(--vds-theme-text-primary);
      font-size: var(--vds-font-size-sm);
      user-select: none;
    }
    :host([disabled]) { opacity: 0.5; cursor: not-allowed; }
    :host([data-active]) { background: var(--vds-theme-bg-hover); }
    :host([selected]) { background: color-mix(in oklab, var(--vds-theme-primary) 12%, transparent); color: var(--vds-theme-primary); }
  `;
  }
  render() {
    return html`<slot></slot>`;
  }
}
__decorateClass([
  property({ type: String, reflect: true })
], VdsOption.prototype, "value");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsOption.prototype, "selected");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsOption.prototype, "disabled");
export {
  VdsOption
};
//# sourceMappingURL=vds-option.js.map
