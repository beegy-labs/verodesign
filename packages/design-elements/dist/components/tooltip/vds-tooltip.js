import { css as p, html as d } from "lit";
import { property as o, state as h } from "lit/decorators.js";
import { setRole as m } from "../../utils/attribute-mirror.js";
import { VdsElement as c } from "../../base/vds-element.js";
var f = Object.defineProperty, s = (r, t, n, v) => {
  for (var e = void 0, a = r.length - 1, l; a >= 0; a--)
    (l = r[a]) && (e = l(t, n, e) || e);
  return e && f(t, n, e), e;
};
class i extends c {
  constructor() {
    super(), this.placement = "top", this.delay = 200, this.disabled = !1, this.open = !1, this.timer = null, this.triggerEl = null, this.tipId = this.createId("vds-tooltip"), this.syncTrigger = () => {
      if (this.triggerEl = this.querySelector('[slot="trigger"]'), this.triggerEl) {
        const t = this.triggerEl.getAttribute("aria-describedby") ?? "";
        t.split(" ").includes(this.tipId) || this.triggerEl.setAttribute("aria-describedby", `${t} ${this.tipId}`.trim());
      }
    }, this.show = () => {
      this.disabled || (this.timer && clearTimeout(this.timer), this.timer = setTimeout(() => {
        this.open = !0;
      }, this.delay));
    }, this.hide = () => {
      this.timer && clearTimeout(this.timer), this.open = !1;
    }, this.handleKey = (t) => {
      t.key === "Escape" && this.hide();
    }, this.internals = this.attachInternals(), m(this, this.internals, "presentation"), this.addEventListener("mouseenter", this.show), this.addEventListener("mouseleave", this.hide), this.addEventListener("focusin", this.show), this.addEventListener("focusout", this.hide), this.addEventListener("keydown", this.handleKey);
  }
  static {
    this.styles = p`
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
  disconnectedCallback() {
    super.disconnectedCallback(), this.timer && clearTimeout(this.timer);
  }
  updated(t) {
    super.updated(t), (t.has("open") || t.has("disabled")) && this.syncTrigger();
  }
  render() {
    return d`
      <slot name="trigger" @slotchange=${this.syncTrigger}></slot>
      <span class="tip" part="tip" id=${this.tipId} role="tooltip" ?data-open=${this.open}>
        <slot></slot>
      </span>
    `;
  }
}
s([
  o({ type: String, reflect: !0 })
], i.prototype, "placement");
s([
  o({ type: Number })
], i.prototype, "delay");
s([
  o({ type: Boolean })
], i.prototype, "disabled");
s([
  h()
], i.prototype, "open");
export {
  i as VdsTooltip
};
