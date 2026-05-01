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
class VdsToast extends LitElement {
  constructor() {
    super();
    this.tone = "neutral";
    this.duration = 5e3;
    this.dismissible = true;
    this._timer = 0;
    this.internals = this.attachInternals();
  }
  static {
    this.styles = css`
    :host {
      display: flex;
      align-items: flex-start;
      gap: var(--vds-spacing-3);
      padding: var(--vds-spacing-3) var(--vds-spacing-4);
      background: var(--vds-theme-bg-elevated);
      color: var(--vds-theme-text-primary);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      border-radius: var(--vds-radius-md);
      box-shadow: var(--vds-shadow-3);
      font-family: var(--vds-font-family-sans);
      font-size: var(--vds-font-size-sm);
      pointer-events: auto;
      max-width: 24rem;
    }

    :host([data-tone="success"]) { border-left: 4px solid var(--vds-theme-success); }
    :host([data-tone="warning"]) { border-left: 4px solid var(--vds-theme-warning); }
    :host([data-tone="error"]) { border-left: 4px solid var(--vds-theme-error); }
    :host([data-tone="info"]) { border-left: 4px solid var(--vds-theme-info); }

    .body { flex: 1; min-width: 0; }
    .title {
      font-weight: var(--vds-font-weight-600);
      margin-bottom: var(--vds-spacing-0_5);
    }
    .message { color: var(--vds-theme-text-secondary); }
    .dismiss {
      all: unset;
      cursor: pointer;
      color: var(--vds-theme-text-dim);
      padding: var(--vds-spacing-0_5);
      border-radius: var(--vds-radius-sm);
      flex-shrink: 0;
    }
    .dismiss:hover { background: var(--vds-theme-bg-hover); color: var(--vds-theme-text-primary); }
    .dismiss:focus-visible { outline: 2px solid var(--vds-theme-border-focus); outline-offset: 2px; }
  `;
  }
  connectedCallback() {
    super.connectedCallback();
    setRole(this, this.internals, this.tone === "error" ? "alert" : "status");
    setAriaProperty(this, this.internals, "ariaLive", this.tone === "error" ? "assertive" : "polite");
    setAriaProperty(this, this.internals, "ariaAtomic", true);
    if (this.duration > 0) {
      this._timer = window.setTimeout(() => this.dismiss(), this.duration);
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._timer);
  }
  dismiss() {
    clearTimeout(this._timer);
    this.dispatchEvent(new CustomEvent("vds-dismiss", { bubbles: true, composed: true }));
    this.remove();
  }
  render() {
    return html`
      <div class="body">
        ${this.toastTitle ? html`<div class="title">${this.toastTitle}</div>` : null}
        ${this.message ? html`<div class="message">${this.message}</div>` : html`<slot></slot>`}
      </div>
      ${this.dismissible ? html`<button class="dismiss" type="button" aria-label="Dismiss" @click=${() => this.dismiss()}>✕</button>` : null}
    `;
  }
}
__decorateClass([
  property({ type: String })
], VdsToast.prototype, "toastTitle");
__decorateClass([
  property({ type: String })
], VdsToast.prototype, "message");
__decorateClass([
  property({ type: String, reflect: true, attribute: "data-tone" })
], VdsToast.prototype, "tone");
__decorateClass([
  property({ type: Number })
], VdsToast.prototype, "duration");
__decorateClass([
  property({ type: Boolean })
], VdsToast.prototype, "dismissible");
class VdsToastGroup extends LitElement {
  constructor() {
    super();
    this.placement = "bottom-right";
    this.max = 5;
    this.internals = this.attachInternals();
    setRole(this, this.internals, "region");
    setAriaProperty(this, this.internals, "ariaLabel", "Notifications");
  }
  static {
    this.styles = css`
    :host {
      position: fixed;
      z-index: var(--vds-zindex-toast);
      display: flex;
      flex-direction: column;
      gap: var(--vds-spacing-2);
      padding: var(--vds-spacing-4);
      pointer-events: none;
    }
    :host([data-placement="top-right"]) { top: 0; right: 0; }
    :host([data-placement="top-left"]) { top: 0; left: 0; }
    :host([data-placement="bottom-right"]) { bottom: 0; right: 0; }
    :host([data-placement="bottom-left"]) { bottom: 0; left: 0; }
    :host([data-placement="top-center"]) { top: 0; left: 50%; transform: translateX(-50%); }
    :host([data-placement="bottom-center"]) { bottom: 0; left: 50%; transform: translateX(-50%); }
  `;
  }
  publish(opts) {
    const toast = document.createElement("vds-toast");
    if (opts.title) toast.toastTitle = opts.title;
    if (opts.message) toast.message = opts.message;
    if (opts.tone) toast.tone = opts.tone;
    if (opts.duration != null) toast.duration = opts.duration;
    if (opts.dismissible != null) toast.dismissible = opts.dismissible;
    const overflow = this.children.length - this.max + 1;
    for (let i = 0; i < overflow; i++) {
      this.children[0]?.dismiss?.();
    }
    this.appendChild(toast);
    return toast;
  }
  render() {
    return html`<slot></slot>`;
  }
}
__decorateClass([
  property({ type: String, reflect: true, attribute: "data-placement" })
], VdsToastGroup.prototype, "placement");
__decorateClass([
  property({ type: Number })
], VdsToastGroup.prototype, "max");
export {
  VdsToast,
  VdsToastGroup
};
//# sourceMappingURL=vds-toast.js.map
