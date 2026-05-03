import { css as p, html as c } from "lit";
import { property as i, query as h } from "lit/decorators.js";
import { setRole as v, setAriaProperty as d } from "../../utils/attribute-mirror.js";
import { FocusTrap as u } from "../../utils/focus-trap.js";
import { VdsElement as m } from "../../base/vds-element.js";
var f = Object.defineProperty, a = (r, e, o, b) => {
  for (var t = void 0, n = r.length - 1, l; n >= 0; n--)
    (l = r[n]) && (t = l(e, o, t) || t);
  return t && f(e, o, t), t;
};
class s extends m {
  constructor() {
    super(), this.open = !1, this.size = "md", this.closeOnBackdrop = !0, this.closeOnEscape = !0, this.ariaLabelText = null, this._titleId = this.createId("vds-dialog-title"), this.handleEscape = (e) => {
      !this.open || !this.closeOnEscape || e.key === "Escape" && (e.preventDefault(), this.open = !1);
    }, this.handleBackdropClick = (e) => {
      this.closeOnBackdrop && e.target === e.currentTarget && (this.open = !1);
    }, this.internals = this.attachInternals(), v(this, this.internals, "dialog"), d(this, this.internals, "ariaModal", !0);
  }
  static {
    this.styles = p`
    :host {
      display: contents;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background: oklch(0% 0 0 / 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--vds-spacing-4);
      z-index: var(--vds-zindex-modal);
      opacity: 0;
      transition: opacity var(--vds-duration-medium) var(--vds-easing-ease-out);
      pointer-events: none;
    }

    :host([open]) .backdrop {
      opacity: 1;
      pointer-events: auto;
    }

    .panel {
      background: var(--vds-theme-bg-elevated);
      color: var(--vds-theme-text-primary);
      border-radius: var(--vds-radius-lg);
      box-shadow: var(--vds-shadow-5);
      max-width: min(32rem, 100%);
      width: 100%;
      max-height: calc(100dvh - 2rem);
      display: flex;
      flex-direction: column;
      transform: translateY(8px) scale(0.98);
      transition: transform var(--vds-duration-medium) var(--vds-easing-ease-out);
      outline: none;
    }

    :host([open]) .panel {
      transform: translateY(0) scale(1);
    }

    :host([size="lg"]) .panel { max-width: min(48rem, 100%); }
    :host([size="sm"]) .panel { max-width: min(24rem, 100%); }

    .header {
      padding: var(--vds-spacing-4) var(--vds-spacing-5);
      border-bottom: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--vds-spacing-3);
    }
    .title {
      font-family: var(--vds-font-family-sans);
      font-size: var(--vds-font-size-xl);
      font-weight: var(--vds-font-weight-600);
      line-height: var(--vds-font-lineheight-tight);
    }
    .close {
      all: unset;
      cursor: pointer;
      padding: var(--vds-spacing-1);
      border-radius: var(--vds-radius-sm);
      color: var(--vds-theme-text-dim);
    }
    .close:hover { background: var(--vds-theme-bg-hover); color: var(--vds-theme-text-primary); }
    .close:focus-visible { outline: 2px solid var(--vds-theme-border-focus); outline-offset: 2px; }

    .body {
      padding: var(--vds-spacing-4) var(--vds-spacing-5);
      flex: 1;
      overflow-y: auto;
    }

    .footer {
      padding: var(--vds-spacing-4) var(--vds-spacing-5);
      border-top: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      display: flex;
      justify-content: flex-end;
      gap: var(--vds-spacing-2);
    }
    .footer:has(slot[name="footer"]:empty),
    .header:has(slot[name="title"]:empty) {
      display: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .backdrop, .panel { transition: none; }
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), document.addEventListener("keydown", this.handleEscape);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.removeEventListener("keydown", this.handleEscape), this.focusTrap?.deactivate();
  }
  updated(e) {
    super.updated(e), e.has("open") && (this.open ? this.handleOpen() : this.handleClose()), e.has("ariaLabelText") && this.ariaLabelText != null && d(this, this.internals, "ariaLabel", this.ariaLabelText);
  }
  handleOpen() {
    document.body.style.overflow = "hidden", this.focusTrap = new u(this.panelEl), requestAnimationFrame(() => this.focusTrap?.activate()), this.emit("vds-open");
  }
  handleClose() {
    document.body.style.overflow = "", this.focusTrap?.deactivate(), this.emit("vds-close");
  }
  show() {
    this.open = !0;
  }
  hide() {
    this.open = !1;
  }
  render() {
    const o = (this.shadowRoot?.querySelector('slot[name="title"]')?.assignedElements().length ?? 0) > 0 || !this.ariaLabelText;
    return c`
      <div
        class="backdrop"
        @click=${this.handleBackdropClick}
        aria-hidden=${this.open ? "false" : "true"}
      >
        <div
          class="panel"
          part="panel"
          tabindex="-1"
          aria-labelledby=${o && !this.ariaLabelText ? this._titleId : ""}
          aria-label=${this.ariaLabelText ?? ""}
        >
          <div class="header">
            <h2 class="title" id=${this._titleId}><slot name="title"></slot></h2>
            <button
              class="close"
              type="button"
              aria-label="Close"
              @click=${() => this.open = !1}
            >✕</button>
          </div>
          <div class="body" part="body"><slot></slot></div>
          <div class="footer"><slot name="footer"></slot></div>
        </div>
      </div>
    `;
  }
}
a([
  i({ type: Boolean, reflect: !0 })
], s.prototype, "open");
a([
  i({ type: String, reflect: !0 })
], s.prototype, "size");
a([
  i({ type: Boolean, attribute: "close-on-backdrop" })
], s.prototype, "closeOnBackdrop");
a([
  i({ type: Boolean, attribute: "close-on-escape" })
], s.prototype, "closeOnEscape");
a([
  i({ type: String, attribute: "aria-label" })
], s.prototype, "ariaLabelText");
a([
  h(".panel")
], s.prototype, "panelEl");
export {
  s as VdsDialog
};
