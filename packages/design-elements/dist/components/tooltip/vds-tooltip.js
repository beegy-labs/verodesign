import { LitElement, css, html } from "lit";
import { property, state } from "lit/decorators.js";
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
class VdsTooltip extends LitElement {
  constructor() {
    super();
    this.placement = "top";
    this.delay = 200;
    this.disabled = false;
    this.open = false;
    this.timer = null;
    this.tipId = `vds-tooltip-${Math.random().toString(36).slice(2, 9)}`;
    this.show = () => {
      if (this.disabled) return;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.open = true;
      }, this.delay);
    };
    this.hide = () => {
      if (this.timer) clearTimeout(this.timer);
      this.open = false;
    };
    this.handleKey = (event) => {
      if (event.key === "Escape") this.hide();
    };
    this.internals = this.attachInternals();
    setRole(this, this.internals, "presentation");
    this.addEventListener("mouseenter", this.show);
    this.addEventListener("mouseleave", this.hide);
    this.addEventListener("focusin", this.show);
    this.addEventListener("focusout", this.hide);
    this.addEventListener("keydown", this.handleKey);
  }
  static {
    this.styles = css`
    :host {
      display: inline-flex;
      position: relative;
      vertical-align: middle;
    }

    .tip {
      position: absolute;
      z-index: var(--vds-zindex-tooltip, 600);
      padding: var(--vds-spacing-1_5) var(--vds-spacing-2_5);
      background: var(--vds-theme-bg-inverse);
      color: var(--vds-theme-text-inverse);
      font-family: var(--vds-font-family-sans);
      font-size: var(--vds-font-size-xs);
      border-radius: var(--vds-radius-sm);
      pointer-events: none;
      opacity: 0;
      transform: scale(0.95);
      transition: opacity var(--vds-duration-fast), transform var(--vds-duration-fast);
      white-space: nowrap;
      max-width: 240px;
      box-shadow: var(--vds-shadow-2);
    }
    .tip[data-open] {
      opacity: 1;
      transform: scale(1);
    }
    :host([placement="top"]) .tip { bottom: 100%; left: 50%; transform: translateX(-50%) scale(0.95); margin-bottom: 6px; }
    :host([placement="top"]) .tip[data-open] { transform: translateX(-50%) scale(1); }
    :host([placement="bottom"]) .tip { top: 100%; left: 50%; transform: translateX(-50%) scale(0.95); margin-top: 6px; }
    :host([placement="bottom"]) .tip[data-open] { transform: translateX(-50%) scale(1); }
    :host([placement="left"]) .tip { right: 100%; top: 50%; transform: translateY(-50%) scale(0.95); margin-right: 6px; }
    :host([placement="left"]) .tip[data-open] { transform: translateY(-50%) scale(1); }
    :host([placement="right"]) .tip { left: 100%; top: 50%; transform: translateY(-50%) scale(0.95); margin-left: 6px; }
    :host([placement="right"]) .tip[data-open] { transform: translateY(-50%) scale(1); }
  `;
  }
  updated(_) {
    const trigger = this.querySelector('[slot="trigger"]');
    if (trigger) {
      const existing = trigger.getAttribute("aria-describedby") ?? "";
      if (!existing.split(" ").includes(this.tipId)) {
        trigger.setAttribute("aria-describedby", `${existing} ${this.tipId}`.trim());
      }
    }
  }
  render() {
    return html`
      <slot name="trigger"></slot>
      <span class="tip" part="tip" id=${this.tipId} role="tooltip" ?data-open=${this.open}>
        <slot></slot>
      </span>
    `;
  }
}
__decorateClass([
  property({ type: String, reflect: true })
], VdsTooltip.prototype, "placement");
__decorateClass([
  property({ type: Number })
], VdsTooltip.prototype, "delay");
__decorateClass([
  property({ type: Boolean })
], VdsTooltip.prototype, "disabled");
__decorateClass([
  state()
], VdsTooltip.prototype, "open");
export {
  VdsTooltip
};
//# sourceMappingURL=vds-tooltip.js.map
