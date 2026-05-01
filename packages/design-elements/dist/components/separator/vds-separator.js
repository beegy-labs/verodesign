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
class VdsSeparator extends LitElement {
  constructor() {
    super();
    this.orientation = "horizontal";
    this.decorative = true;
    this.internals = this.attachInternals();
  }
  static {
    this.styles = css`
    :host {
      display: block;
      flex-shrink: 0;
      background: var(--vds-theme-border-subtle);
    }
    :host([orientation="horizontal"]) {
      width: 100%;
      height: 1px;
    }
    :host([orientation="vertical"]) {
      height: auto;
      align-self: stretch;
      width: 1px;
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback();
    setRole(this, this.internals, this.decorative ? "presentation" : "separator");
    if (!this.decorative) {
      this.setAttribute("aria-orientation", this.orientation);
    }
  }
  updated() {
    setRole(this, this.internals, this.decorative ? "presentation" : "separator");
    if (!this.decorative) {
      this.setAttribute("aria-orientation", this.orientation);
    } else {
      this.removeAttribute("aria-orientation");
    }
  }
  render() {
    return html``;
  }
}
__decorateClass([
  property({ type: String, reflect: true })
], VdsSeparator.prototype, "orientation");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsSeparator.prototype, "decorative");
export {
  VdsSeparator
};
//# sourceMappingURL=vds-separator.js.map
