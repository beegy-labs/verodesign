import { css as p, html as u, LitElement as f } from "lit";
import { property as d, query as v } from "lit/decorators.js";
import { setRole as m, setAriaProperty as y } from "../../utils/attribute-mirror.js";
import { VdsElement as g } from "../../base/vds-element.js";
var b = Object.defineProperty, a = (l, e, s, r) => {
  for (var t = void 0, i = l.length - 1, n; i >= 0; i--)
    (n = l[i]) && (t = n(e, s, t) || t);
  return t && b(e, s, t), t;
};
class h extends g {
  constructor() {
    super(), this.open = !1, this.placement = "bottom-start", this.typeBuffer = "", this.typeTimer = 0, this.itemsCache = [], this.handleClick = (e) => {
      const s = this.getTrigger(), r = e.composedPath();
      if (s && r.includes(s)) {
        this.open = !this.open;
        return;
      }
      const t = e.target.closest("vds-menu-item");
      t && !t.disabled && this.activate(t);
    }, this.handleKeydown = (e) => {
      const s = this.getTrigger(), r = e.composedPath();
      if (s && r.includes(s)) {
        e.key === "ArrowDown" || e.key === "Enter" || e.key === " " ? (e.preventDefault(), this.open = !0) : e.key === "ArrowUp" && (e.preventDefault(), this.open = !0, queueMicrotask(() => {
          const o = this.getItems();
          o[o.length - 1]?.focus();
        }));
        return;
      }
      if (!this.open) return;
      const t = this.getItems(), i = t.find((o) => o === document.activeElement || o.matches(":focus-within")), n = i ? t.indexOf(i) : -1;
      e.key === "Escape" ? (e.preventDefault(), this.open = !1) : e.key === "ArrowDown" ? (e.preventDefault(), t[(n + 1) % t.length]?.focus()) : e.key === "ArrowUp" ? (e.preventDefault(), t[(n - 1 + t.length) % t.length]?.focus()) : e.key === "Home" ? (e.preventDefault(), t[0]?.focus()) : e.key === "End" ? (e.preventDefault(), t[t.length - 1]?.focus()) : e.key === "Enter" || e.key === " " ? i && (e.preventDefault(), this.activate(i)) : e.key === "Tab" ? this.open = !1 : e.key.length === 1 && /\S/.test(e.key) && this.handleTypeAhead(e.key, t, n);
    }, this.handleOutsideClick = (e) => {
      if (!this.open) return;
      e.composedPath().includes(this) || (this.open = !1);
    }, this.internals = this.attachInternals(), m(this, this.internals, "presentation");
  }
  static {
    this.styles = p`
    :host {
      display: inline-block;
      position: relative;
      font-family: var(--vds-font-family-sans);
    }

    .menu {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: var(--vds-spacing-1);
      min-width: 12rem;
      background: var(--vds-theme-bg-elevated);
      color: var(--vds-theme-text-primary);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      border-radius: var(--vds-radius-md);
      box-shadow: var(--vds-shadow-3);
      padding: var(--vds-spacing-1);
      z-index: var(--vds-zindex-dropdown);
      display: none;
      flex-direction: column;
      gap: var(--vds-spacing-0_5);
    }
    :host([open]) .menu { display: flex; }

    @media (prefers-reduced-motion: reduce) {
      .menu { transition: none; }
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this.handleClick), this.addEventListener("keydown", this.handleKeydown), document.addEventListener("mousedown", this.handleOutsideClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this.handleClick), this.removeEventListener("keydown", this.handleKeydown), document.removeEventListener("mousedown", this.handleOutsideClick);
  }
  updated(e) {
    if (super.updated(e), e.has("open")) {
      const s = this.getTrigger();
      s && (s.setAttribute("aria-expanded", String(this.open)), s.setAttribute("aria-haspopup", "menu")), this.open ? this.getItems()[0]?.focus() : this.shadowRoot?.activeElement && s?.focus?.();
    }
    e.has("placement") && this.placement === "bottom-end" && (this.menuEl.style.left = "auto", this.menuEl.style.right = "0");
  }
  getTrigger() {
    return this.shadowRoot?.querySelector('slot[name="trigger"]')?.assignedElements()[0] ?? null;
  }
  getItems() {
    return this.itemsCache;
  }
  refreshItems() {
    this.itemsCache = Array.from(this.querySelectorAll("vds-menu-item:not([disabled])"));
  }
  handleTypeAhead(e, s, r) {
    clearTimeout(this.typeTimer), this.typeBuffer += e.toLowerCase(), this.typeTimer = window.setTimeout(() => {
      this.typeBuffer = "";
    }, 500);
    const t = r + 1;
    [...s.slice(t), ...s.slice(0, t)].find((o) => o.textContent?.trim().toLowerCase().startsWith(this.typeBuffer))?.focus();
  }
  activate(e) {
    this.emit("vds-select", { value: e.value, item: e }), this.open = !1;
  }
  show() {
    this.open = !0;
  }
  hide() {
    this.open = !1;
  }
  render() {
    return u`
      <slot name="trigger"></slot>
      <div class="menu" role="menu">
        <slot @slotchange=${this.refreshItems}></slot>
      </div>
    `;
  }
}
a([
  d({ type: Boolean, reflect: !0 })
], h.prototype, "open");
a([
  d({ type: String })
], h.prototype, "placement");
a([
  v(".menu")
], h.prototype, "menuEl");
class c extends f {
  constructor() {
    super(), this.value = "", this.disabled = !1, this.tone = "default", this.internals = this.attachInternals(), m(this, this.internals, "menuitem");
  }
  static {
    this.styles = p`
    :host {
      display: flex;
      align-items: center;
      gap: var(--vds-spacing-2);
      padding: var(--vds-spacing-2) var(--vds-spacing-3);
      cursor: pointer;
      user-select: none;
      color: var(--vds-theme-text-primary);
      border-radius: var(--vds-radius-sm);
      font-size: var(--vds-font-size-sm);
      transition: background var(--vds-duration-fast) var(--vds-easing-ease-out);
    }
    :host(:hover),
    :host(:focus-visible) {
      background: var(--vds-theme-bg-hover);
      outline: none;
    }
    :host([disabled]) {
      opacity: 0.5;
      cursor: not-allowed;
    }
    :host([data-tone="destructive"]) {
      color: var(--vds-theme-destructive);
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("tabindex") || (this.tabIndex = -1);
  }
  updated(e) {
    e.has("disabled") && y(this, this.internals, "ariaDisabled", this.disabled);
  }
  render() {
    return u`<slot></slot>`;
  }
}
a([
  d({ type: String })
], c.prototype, "value");
a([
  d({ type: Boolean, reflect: !0 })
], c.prototype, "disabled");
a([
  d({ type: String, reflect: !0, attribute: "data-tone" })
], c.prototype, "tone");
export {
  h as VdsMenu,
  c as VdsMenuItem
};
