import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { setRole, setAriaProperty } from "../../utils/attribute-mirror.js";
var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(target, key, result) || result;
  if (result) __defProp(target, key, result);
  return result;
};
class VdsCheckbox extends LitElement {
  constructor() {
    super();
    this.checked = false;
    this.indeterminate = false;
    this.disabled = false;
    this.required = false;
    this.value = "on";
    this.size = "md";
    this.handleClick = (event) => {
      if (this.disabled) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      this.toggle();
    };
    this.handleKeydown = (event) => {
      if (event.key === " ") {
        event.preventDefault();
        if (!this.disabled) this.toggle();
      }
    };
    this.internals = this.attachInternals();
    setRole(this, this.internals, "checkbox");
    this.addEventListener("click", this.handleClick);
    this.addEventListener("keydown", this.handleKeydown);
  }
  static {
    this.formAssociated = true;
  }
  static {
    this.styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-2);
      cursor: pointer;
      user-select: none;
      color: var(--vds-theme-text-primary);
      font-family: var(--vds-font-family-sans);
    }
    :host([disabled]) { cursor: not-allowed; opacity: 0.5; }
    :host([data-size="sm"]) { font-size: var(--vds-font-size-sm); }
    :host([data-size="md"]) { font-size: var(--vds-font-size-base); }
    :host([data-size="lg"]) { font-size: var(--vds-font-size-lg); }

    .box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      border-radius: var(--vds-radius-sm);
      background: var(--vds-theme-bg-card);
      transition: background var(--vds-duration-fast), border-color var(--vds-duration-fast);
    }
    :host([data-size="sm"]) .box { width: 14px; height: 14px; }
    :host([data-size="md"]) .box { width: 18px; height: 18px; }
    :host([data-size="lg"]) .box { width: 22px; height: 22px; }

    :host([checked]) .box,
    :host([indeterminate]) .box {
      background: var(--vds-theme-primary);
      border-color: var(--vds-theme-primary);
    }
    :host([checked]) .check { color: var(--vds-theme-primary-fg); }
    :host([indeterminate]) .dash { color: var(--vds-theme-primary-fg); }

    :host(:focus-visible) .box {
      outline: 2px solid var(--vds-theme-border-focus);
      outline-offset: 2px;
    }

    .check, .dash { width: 80%; height: 80%; }
    .check { display: var(--check-display, none); }
    .dash { display: var(--dash-display, none); }
    :host([checked]:not([indeterminate])) { --check-display: block; }
    :host([indeterminate]) { --dash-display: block; --check-display: none; }
  `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.dataset.size = this.size;
    if (!this.hasAttribute("tabindex")) this.tabIndex = this.disabled ? -1 : 0;
    this.syncFormValue();
    this.syncAria();
  }
  updated(changed) {
    if (changed.has("size")) this.dataset.size = this.size;
    if (changed.has("checked") || changed.has("indeterminate") || changed.has("disabled") || changed.has("required")) {
      this.syncAria();
      this.syncFormValue();
    }
    if (changed.has("disabled")) this.tabIndex = this.disabled ? -1 : 0;
  }
  syncAria() {
    const state = this.indeterminate ? "mixed" : this.checked ? "true" : "false";
    setAriaProperty(this, this.internals, "ariaChecked", state);
    setAriaProperty(this, this.internals, "ariaDisabled", this.disabled);
    setAriaProperty(this, this.internals, "ariaRequired", this.required);
  }
  syncFormValue() {
    this.internals.setFormValue(this.checked ? this.value : null);
  }
  toggle() {
    if (this.indeterminate) {
      this.indeterminate = false;
      this.checked = true;
    } else {
      this.checked = !this.checked;
    }
    this.dispatchEvent(new CustomEvent("change", { detail: { checked: this.checked }, bubbles: true, composed: true }));
  }
  render() {
    return html`
      <span class="box" part="box" aria-hidden="true">
        <svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        <svg class="dash" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </span>
      <slot></slot>
    `;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsCheckbox.prototype, "checked");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsCheckbox.prototype, "indeterminate");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsCheckbox.prototype, "disabled");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsCheckbox.prototype, "required");
__decorateClass([
  property({ type: String })
], VdsCheckbox.prototype, "name");
__decorateClass([
  property({ type: String })
], VdsCheckbox.prototype, "value");
__decorateClass([
  property({ type: String, reflect: true })
], VdsCheckbox.prototype, "size");
export {
  VdsCheckbox
};
//# sourceMappingURL=vds-checkbox.js.map
