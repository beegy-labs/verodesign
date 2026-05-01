import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import { setRole, setAriaProperty } from "../../utils/attribute-mirror.js";
import { focusRing, srOnly, reducedMotion } from "../../styles/shared.js";
var __defProp = Object.defineProperty;
var __decorateClass = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(target, key, result) || result;
  if (result) __defProp(target, key, result);
  return result;
};
class VdsButton extends LitElement {
  constructor() {
    super();
    this.variant = "solid";
    this.tone = "primary";
    this.size = "md";
    this.type = "button";
    this.disabled = false;
    this.loading = false;
    this.ariaLabelText = null;
    this.handleClick = (event) => {
      if (this.disabled || this.loading) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return;
      }
      if (this.type === "submit") this.internals.form?.requestSubmit();
      if (this.type === "reset") this.internals.form?.reset();
    };
    this.handleKeydown = (event) => {
      if (event.key === " " || event.key === "Enter") {
        event.preventDefault();
        this.click();
      }
    };
    this.internals = this.attachInternals();
    setRole(this, this.internals, "button");
    this.addEventListener("click", this.handleClick);
    this.addEventListener("keydown", this.handleKeydown);
  }
  static {
    this.formAssociated = true;
  }
  static {
    this.styles = [
      focusRing,
      srOnly,
      reducedMotion,
      css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      :host([hidden]) { display: none; }

      .button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--vds-spacing-2);
        font-family: var(--vds-font-family-sans);
        font-weight: var(--vds-font-weight-500);
        line-height: var(--vds-font-lineheight-normal);
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        border-radius: var(--vds-radius-md);
        border: var(--vds-border-width-1) solid transparent;
        transition: background-color var(--vds-duration-fast) var(--vds-easing-ease-out),
                    color var(--vds-duration-fast) var(--vds-easing-ease-out),
                    border-color var(--vds-duration-fast) var(--vds-easing-ease-out),
                    box-shadow var(--vds-duration-fast) var(--vds-easing-ease-out);
      }

      :host([data-size="sm"]) .button {
        padding: var(--vds-spacing-1_5) var(--vds-spacing-3);
        font-size: var(--vds-font-size-sm);
        min-height: 2rem;
      }
      :host([data-size="md"]) .button {
        padding: var(--vds-spacing-2) var(--vds-spacing-4);
        font-size: var(--vds-font-size-base);
        min-height: 2.5rem;
      }
      :host([data-size="lg"]) .button {
        padding: var(--vds-spacing-3) var(--vds-spacing-5);
        font-size: var(--vds-font-size-lg);
        min-height: 3rem;
      }

      :host([data-tone="primary"][data-variant="solid"]) .button {
        background: var(--vds-theme-primary);
        color: var(--vds-theme-primary-fg);
      }
      :host([data-tone="primary"][data-variant="solid"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-primary) 90%, black);
      }
      :host([data-tone="primary"][data-variant="soft"]) .button {
        background: color-mix(in oklch, var(--vds-theme-primary) 12%, transparent);
        color: var(--vds-theme-primary);
      }
      :host([data-tone="primary"][data-variant="outline"]) .button {
        border-color: var(--vds-theme-primary);
        color: var(--vds-theme-primary);
      }
      :host([data-tone="primary"][data-variant="ghost"]) .button {
        color: var(--vds-theme-primary);
      }
      :host([data-tone="primary"][data-variant="ghost"]:hover) .button,
      :host([data-tone="primary"][data-variant="outline"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-primary) 8%, transparent);
      }

      :host([data-tone="accent"][data-variant="solid"]) .button {
        background: var(--vds-theme-accent);
        color: var(--vds-theme-accent-fg);
      }
      :host([data-tone="accent"][data-variant="solid"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-accent) 90%, black);
      }
      :host([data-tone="accent"][data-variant="soft"]) .button {
        background: color-mix(in oklch, var(--vds-theme-accent) 12%, transparent);
        color: var(--vds-theme-accent);
      }
      :host([data-tone="accent"][data-variant="outline"]) .button {
        border-color: var(--vds-theme-accent);
        color: var(--vds-theme-accent);
      }
      :host([data-tone="accent"][data-variant="ghost"]) .button {
        color: var(--vds-theme-accent);
      }

      :host([data-tone="neutral"][data-variant="solid"]) .button {
        background: var(--vds-theme-neutral);
        color: var(--vds-theme-neutral-fg);
      }
      :host([data-tone="neutral"][data-variant="soft"]) .button {
        background: var(--vds-theme-bg-muted);
        color: var(--vds-theme-text-primary);
      }
      :host([data-tone="neutral"][data-variant="outline"]) .button {
        border-color: var(--vds-theme-border-default);
        color: var(--vds-theme-text-primary);
      }
      :host([data-tone="neutral"][data-variant="ghost"]) .button {
        color: var(--vds-theme-text-primary);
      }
      :host([data-tone="neutral"][data-variant="ghost"]:hover) .button,
      :host([data-tone="neutral"][data-variant="outline"]:hover) .button {
        background: var(--vds-theme-bg-hover);
      }

      :host([data-tone="destructive"][data-variant="solid"]) .button {
        background: var(--vds-theme-destructive);
        color: var(--vds-theme-destructive-fg);
      }
      :host([data-tone="destructive"][data-variant="solid"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-destructive) 90%, black);
      }
      :host([data-tone="destructive"][data-variant="soft"]) .button {
        background: color-mix(in oklch, var(--vds-theme-destructive) 12%, transparent);
        color: var(--vds-theme-destructive);
      }
      :host([data-tone="destructive"][data-variant="outline"]) .button {
        border-color: var(--vds-theme-destructive);
        color: var(--vds-theme-destructive);
      }
      :host([data-tone="destructive"][data-variant="ghost"]) .button {
        color: var(--vds-theme-destructive);
      }

      :host([disabled]) .button,
      :host([data-loading]) .button {
        opacity: 0.5;
        cursor: not-allowed;
      }

      :host(:focus-visible) .button {
        outline: 2px solid var(--vds-theme-border-focus);
        outline-offset: 2px;
      }

      .spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    `
    ];
  }
  updated(changed) {
    if (changed.has("size")) this.dataset.size = this.size;
    if (changed.has("variant")) this.dataset.variant = this.variant;
    if (changed.has("tone")) this.dataset.tone = this.tone;
    if (changed.has("disabled")) {
      setAriaProperty(this, this.internals, "ariaDisabled", this.disabled);
      this.tabIndex = this.disabled ? -1 : 0;
    } else if (this.tabIndex < 0 && !this.disabled) {
      this.tabIndex = 0;
    }
    if (changed.has("ariaLabelText") && this.ariaLabelText != null) {
      setAriaProperty(this, this.internals, "ariaLabel", this.ariaLabelText);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.dataset.size = this.size;
    this.dataset.variant = this.variant;
    this.dataset.tone = this.tone;
    if (!this.hasAttribute("tabindex")) this.tabIndex = 0;
  }
  render() {
    return html`
      <button
        class="button"
        part="button"
        type="button"
        ?disabled=${this.disabled}
        tabindex="-1"
        aria-hidden="true"
      >
        ${this.loading ? html`<span class="spinner" aria-hidden="true"></span>` : html`<slot name="start"></slot>`}
        <slot></slot>
        <slot name="end"></slot>
      </button>
    `;
  }
}
__decorateClass([
  property({ type: String, reflect: true })
], VdsButton.prototype, "variant");
__decorateClass([
  property({ type: String, reflect: true })
], VdsButton.prototype, "tone");
__decorateClass([
  property({ type: String, reflect: true })
], VdsButton.prototype, "size");
__decorateClass([
  property({ type: String, reflect: true })
], VdsButton.prototype, "type");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsButton.prototype, "disabled");
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "data-loading" })
], VdsButton.prototype, "loading");
__decorateClass([
  property({ type: String })
], VdsButton.prototype, "name");
__decorateClass([
  property({ type: String })
], VdsButton.prototype, "value");
__decorateClass([
  property({ type: String, attribute: "aria-label" })
], VdsButton.prototype, "ariaLabelText");
export {
  VdsButton
};
//# sourceMappingURL=vds-button.js.map
