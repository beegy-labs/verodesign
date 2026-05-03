import { css as c, html as a } from "lit";
import { property as i } from "lit/decorators.js";
import { setRole as v, setAriaProperty as l } from "../../utils/attribute-mirror.js";
import { VdsElement as p } from "../../base/vds-element.js";
var f = Object.defineProperty, r = (n, t, s, m) => {
  for (var e = void 0, d = n.length - 1, h; d >= 0; d--)
    (h = n[d]) && (e = h(t, s, e) || e);
  return e && f(t, s, e), e;
};
class o extends p {
  constructor() {
    super(), this.tone = "neutral", this.duration = 5e3, this.dismissible = !0, this._timer = 0, this.internals = this.attachInternals();
  }
  static {
    this.styles = c`
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
    super.connectedCallback(), this.syncAria(), this.duration > 0 && (this._timer = window.setTimeout(() => this.dismiss(), this.duration));
  }
  disconnectedCallback() {
    super.disconnectedCallback(), clearTimeout(this._timer);
  }
  updated(t) {
    super.updated(t), t.has("tone") && this.syncAria(), t.has("duration") && this.isConnected && (clearTimeout(this._timer), this.duration > 0 && (this._timer = window.setTimeout(() => this.dismiss(), this.duration)));
  }
  syncAria() {
    const t = this.tone === "error";
    v(this, this.internals, t ? "alert" : "status"), l(this, this.internals, "ariaLive", t ? "assertive" : "polite"), l(this, this.internals, "ariaAtomic", !0);
  }
  dismiss() {
    clearTimeout(this._timer), this.emit("vds-dismiss"), this.remove();
  }
  render() {
    return a`
      <div class="body">
        ${this.toastTitle ? a`<div class="title">${this.toastTitle}</div>` : null}
        ${this.message ? a`<div class="message">${this.message}</div>` : a`<slot></slot>`}
      </div>
      ${this.dismissible ? a`<button class="dismiss" type="button" aria-label="Dismiss" @click=${() => this.dismiss()}>✕</button>` : null}
    `;
  }
}
r([
  i({ type: String })
], o.prototype, "toastTitle");
r([
  i({ type: String })
], o.prototype, "message");
r([
  i({ type: String, reflect: !0, attribute: "data-tone" })
], o.prototype, "tone");
r([
  i({ type: Number })
], o.prototype, "duration");
r([
  i({ type: Boolean })
], o.prototype, "dismissible");
class u extends p {
  constructor() {
    super(), this.placement = "bottom-right", this.max = 5, this.internals = this.attachInternals(), v(this, this.internals, "region"), l(this, this.internals, "ariaLabel", "Notifications");
  }
  static {
    this.styles = c`
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
  publish(t) {
    const s = document.createElement("vds-toast");
    t.title && (s.toastTitle = t.title), t.message && (s.message = t.message), t.tone && (s.tone = t.tone), t.duration != null && (s.duration = t.duration), t.dismissible != null && (s.dismissible = t.dismissible);
    const m = this.children.length - this.max + 1;
    for (let e = 0; e < m; e++)
      this.children[0]?.dismiss?.();
    return this.appendChild(s), s;
  }
  render() {
    return a`<slot></slot>`;
  }
}
r([
  i({ type: String, reflect: !0, attribute: "data-placement" })
], u.prototype, "placement");
r([
  i({ type: Number })
], u.prototype, "max");
export {
  o as VdsToast,
  u as VdsToastGroup
};
