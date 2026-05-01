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
class VdsSwitch extends LitElement {
  constructor() {
    super();
    this.checked = false;
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
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        if (!this.disabled) this.toggle();
      }
    };
    this.internals = this.attachInternals();
    setRole(this, this.internals, "switch");
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

    .track {
      position: relative;
      flex-shrink: 0;
      background: var(--vds-theme-border-default);
      border-radius: 999px;
      transition: background var(--vds-duration-fast);
    }
    :host([data-size="sm"]) .track { width: 28px; height: 16px; }
    :host([data-size="md"]) .track { width: 36px; height: 20px; }
    :host([data-size="lg"]) .track { width: 44px; height: 24px; }

    :host([checked]) .track { background: var(--vds-theme-primary); }

    .thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      background: var(--vds-theme-bg-card);
      border-radius: 999px;
      transition: transform var(--vds-duration-fast);
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    :host([data-size="sm"]) .thumb { width: 12px; height: 12px; }
    :host([data-size="md"]) .thumb { width: 16px; height: 16px; }
    :host([data-size="lg"]) .thumb { width: 20px; height: 20px; }

    :host([data-size="sm"][checked]) .thumb { transform: translateX(12px); }
    :host([data-size="md"][checked]) .thumb { transform: translateX(16px); }
    :host([data-size="lg"][checked]) .thumb { transform: translateX(20px); }

    :host(:focus-visible) .track {
      outline: 2px solid var(--vds-theme-border-focus);
      outline-offset: 2px;
    }
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
    if (changed.has("checked") || changed.has("disabled") || changed.has("required")) {
      this.syncAria();
      this.syncFormValue();
    }
    if (changed.has("disabled")) this.tabIndex = this.disabled ? -1 : 0;
  }
  syncAria() {
    setAriaProperty(this, this.internals, "ariaChecked", this.checked ? "true" : "false");
    setAriaProperty(this, this.internals, "ariaDisabled", this.disabled);
    setAriaProperty(this, this.internals, "ariaRequired", this.required);
  }
  syncFormValue() {
    this.internals.setFormValue(this.checked ? this.value : null);
  }
  toggle() {
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent("change", { detail: { checked: this.checked }, bubbles: true, composed: true }));
  }
  render() {
    return html`
      <span class="track" part="track" aria-hidden="true">
        <span class="thumb" part="thumb"></span>
      </span>
      <slot></slot>
    `;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsSwitch.prototype, "checked");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsSwitch.prototype, "disabled");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsSwitch.prototype, "required");
__decorateClass([
  property({ type: String })
], VdsSwitch.prototype, "name");
__decorateClass([
  property({ type: String })
], VdsSwitch.prototype, "value");
__decorateClass([
  property({ type: String, reflect: true })
], VdsSwitch.prototype, "size");
export {
  VdsSwitch
};
//# sourceMappingURL=vds-switch.js.map
