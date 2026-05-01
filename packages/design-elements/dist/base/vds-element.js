import { LitElement, html } from "lit";
class VdsElement extends LitElement {
  static {
    this.formAssociated = false;
  }
  emit(name, detail, options = {}) {
    const event = new CustomEvent(name, {
      bubbles: true,
      composed: true,
      cancelable: true,
      ...options,
      detail
    });
    return this.dispatchEvent(event);
  }
  updated(changed) {
    super.updated(changed);
  }
  renderSr(text) {
    return html`<span class="sr-only">${text}</span>`;
  }
}
export {
  VdsElement
};
//# sourceMappingURL=vds-element.js.map
