import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as p } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as i } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { query as c } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/query.js";
import { setRole as v, setAriaProperty as d } from "../../utils/attribute-mirror.js";
import { FocusTrap as h } from "../../utils/focus-trap.js";
import { VdsElement as m } from "../../base/vds-element.js";
import { css as u } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var f = Object.defineProperty, t = (o, e, r, b) => {
  for (var s = void 0, n = o.length - 1, l; n >= 0; n--)
    (l = o[n]) && (s = l(e, r, s) || s);
  return s && f(e, r, s), s;
};
class a extends m {
  constructor() {
    super(), this.open = !1, this.size = "md", this.placement = "center", this.closeOnBackdrop = !0, this.closeOnEscape = !0, this.ariaLabelText = null, this._titleId = this.createId("vds-dialog-title"), this.handleEscape = (e) => {
      !this.open || !this.closeOnEscape || e.key === "Escape" && (e.preventDefault(), this.open = !1);
    }, this.handleBackdropClick = (e) => {
      this.closeOnBackdrop && e.target === e.currentTarget && (this.open = !1);
    }, this.internals = this.attachInternals(), v(this, this.internals, "dialog"), d(this, this.internals, "ariaModal", !0);
  }
  static {
    this.styles = u`
    :host {
      display: contents;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background: var(--vds-theme-scrim, color-mix(in oklab, var(--vds-color-black) 50%, transparent));
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--vds-spacing-4);
      z-index: var(--vds-zindex-modal);
      opacity: 0;
      transition: opacity var(--vds-duration-medium) var(--vds-easing-ease-out);
      pointer-events: none;
    }

    :host([placement="bottom"]) .backdrop {
      align-items: flex-end;
      padding: var(--vds-spacing-4) var(--vds-spacing-4) calc(var(--vds-spacing-4) + env(safe-area-inset-bottom, var(--vds-spacing-0)));
      backdrop-filter: blur(var(--vds-blur-lg));
      -webkit-backdrop-filter: blur(var(--vds-blur-lg));
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

    :host([placement="bottom"]) .panel {
      max-width: none;
      width: 100%;
      max-height: calc(100dvh - var(--vds-spacing-20));
      border-radius: var(--vds-radius-lg) var(--vds-radius-lg) 0 0;
      transform: translateY(calc(var(--vds-spacing-12) + env(safe-area-inset-bottom, var(--vds-spacing-0))));
    }

    :host([open]) .panel {
      transform: translateY(0) scale(1);
    }

    :host([placement="bottom"][open]) .panel {
      transform: translateY(0);
    }

    :host([size="sm"])  .panel { max-width: min(24rem, 100%); }
    :host([size="lg"])  .panel { max-width: min(48rem, 100%); }
    :host([size="xl"])  .panel { max-width: min(56rem, 100%); }
    :host([size="2xl"]) .panel { max-width: min(72rem, 100%); }

    .header {
      padding: var(--vds-spacing-4) var(--vds-spacing-5);
      border-bottom: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      display: flex;
      align-items: center;
      gap: var(--vds-spacing-3);
    }

    :host([placement="bottom"]) .header {
      padding-top: var(--vds-spacing-2);
    }

    .title {
      flex: 1;
      min-width: 0;
      font-family: var(--vds-font-family-sans);
      font-size: var(--vds-type-role-title-size);
      font-weight: var(--vds-type-role-title-weight);
      line-height: var(--vds-font-lineheight-tight);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .close {
      all: unset;
      flex: none;
      cursor: pointer;
      padding: var(--vds-spacing-1);
      border-radius: var(--vds-radius-sm);
      color: var(--vds-theme-text-dim);
    }
    .close:hover { background: var(--vds-theme-bg-hover); color: var(--vds-theme-text-primary); }
    .close:focus-visible { outline: 2px solid var(--vds-theme-border-focus); outline-offset: 2px; }

    .handle-area {
      display: none;
    }

    :host([placement="bottom"]) .handle-area {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: var(--vds-spacing-6);
      padding-top: var(--vds-spacing-2);
    }

    .handle {
      width: var(--vds-spacing-12);
      height: var(--vds-spacing-1);
      border-radius: var(--vds-radius-full);
      background: var(--vds-theme-border-subtle);
    }

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
    document.body.style.overflow = "hidden", this.focusTrap = new h(this.panelEl), requestAnimationFrame(() => this.focusTrap?.activate(this.panelEl)), this.emit("vds-open");
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
    const r = (this.shadowRoot?.querySelector('slot[name="title"]')?.assignedElements().length ?? 0) > 0 || !this.ariaLabelText;
    return p`
      <div
        class="backdrop"
        @click=${this.handleBackdropClick}
        aria-hidden=${this.open ? "false" : "true"}
      >
        <div
          class="panel"
          part="panel"
          tabindex="-1"
          aria-labelledby=${r && !this.ariaLabelText ? this._titleId : ""}
          aria-label=${this.ariaLabelText ?? ""}
        >
          <div class="handle-area" aria-hidden="true"><div class="handle" part="handle"></div></div>
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
t([
  i({ type: Boolean, reflect: !0 })
], a.prototype, "open");
t([
  i({ type: String, reflect: !0 })
], a.prototype, "size");
t([
  i({ type: String, reflect: !0 })
], a.prototype, "placement");
t([
  i({ type: Boolean, attribute: "close-on-backdrop" })
], a.prototype, "closeOnBackdrop");
t([
  i({ type: Boolean, attribute: "close-on-escape" })
], a.prototype, "closeOnEscape");
t([
  i({ type: String, attribute: "aria-label" })
], a.prototype, "ariaLabelText");
t([
  c(".panel")
], a.prototype, "panelEl");
export {
  a as VdsDialog
};
