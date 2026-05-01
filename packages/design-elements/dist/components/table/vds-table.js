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
class VdsTable extends LitElement {
  constructor() {
    super(...arguments);
    this.density = "normal";
  }
  static {
    this.styles = css`
    :host { display: block; width: 100%; overflow-x: auto; }
    table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--vds-font-family-sans);
      font-size: var(--vds-font-size-sm);
      color: var(--vds-theme-text-primary);
      background: var(--vds-theme-bg-card);
    }
    ::slotted(thead),
    .head ::slotted(*) { background: var(--vds-theme-bg-elevated); }

    /* style projected table rows via ::part / standard cascade */
    :host([data-density="compact"]) table { font-size: var(--vds-font-size-xs); }
    :host([data-density="comfortable"]) table { font-size: var(--vds-font-size-base); }
  `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.dataset.density = this.density;
  }
  updated() {
    this.dataset.density = this.density;
  }
  render() {
    return html`
      <table part="table">
        <slot name="caption"></slot>
        <slot></slot>
      </table>
    `;
  }
}
__decorateClass([
  property({ type: String, reflect: true })
], VdsTable.prototype, "density");
export {
  VdsTable
};
//# sourceMappingURL=vds-table.js.map
