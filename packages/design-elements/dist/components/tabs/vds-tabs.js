import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as h } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import { LitElement as u } from "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as i } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { setRole as v, setAriaProperty as b } from "../../utils/attribute-mirror.js";
import { VdsElement as y } from "../../base/vds-element.js";
import { css as c } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var k = Object.defineProperty, o = (n, t, a, e) => {
  for (var s = void 0, r = n.length - 1, l; r >= 0; r--)
    (l = n[r]) && (s = l(t, a, s) || s);
  return s && k(t, a, s), s;
};
class d extends y {
  constructor() {
    super(), this.value = "", this.orientation = "horizontal", this.activation = "auto", this.variant = "underline", this.tabsCache = [], this.panelsCache = [], this.refreshChildren = () => {
      this.tabsCache = Array.from(this.querySelectorAll("vds-tab")), this.panelsCache = Array.from(this.querySelectorAll("vds-tab-panel")), this.syncActive();
    }, this.handleClick = (t) => {
      const a = t.target.closest("vds-tab");
      a && this.setActive(a);
    }, this.handleKeydown = (t) => {
      const a = t.target.closest("vds-tab");
      if (!a) return;
      const e = this.tabs.filter((m) => !m.disabled), s = e.indexOf(a);
      if (s < 0) return;
      let r;
      const l = this.orientation === "horizontal", f = l ? "ArrowLeft" : "ArrowUp", g = l ? "ArrowRight" : "ArrowDown";
      if (t.key === f) r = e[(s - 1 + e.length) % e.length];
      else if (t.key === g) r = e[(s + 1) % e.length];
      else if (t.key === "Home") r = e[0];
      else if (t.key === "End") r = e[e.length - 1];
      else if (t.key === "Enter" || t.key === " ") {
        t.preventDefault(), this.setActive(a);
        return;
      }
      r && (t.preventDefault(), this.activation === "auto" ? this.setActive(r) : r.focus());
    }, this.internals = this.attachInternals(), v(this, this.internals, "presentation");
  }
  static {
    this.styles = c`
    :host {
      display: block;
      font-family: var(--vds-font-family-sans);
      color: var(--vds-theme-text-primary);
    }
    .tablist {
      display: flex;
      gap: var(--vds-spacing-1);
      padding: 0;
      border-bottom: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      border-radius: 0;
      background: transparent;
      overflow-x: auto;
      scrollbar-width: thin;
    }
    :host([variant="segmented"]) .tablist {
      padding: var(--vds-spacing-1);
      border-bottom: none;
      border-radius: var(--vds-radius-lg);
      background: var(--vds-theme-bg-subtle);
    }
    :host([data-orientation="vertical"]) {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: var(--vds-spacing-4);
    }
    :host([data-orientation="vertical"]) .tablist {
      flex-direction: column;
      border-bottom: none;
      border-right: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      overflow-x: visible;
    }
    :host([data-orientation="vertical"][variant="segmented"]) .tablist {
      border-right: none;
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("keydown", this.handleKeydown), this.addEventListener("click", this.handleClick), queueMicrotask(() => this.syncActive());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("keydown", this.handleKeydown), this.removeEventListener("click", this.handleClick);
  }
  updated(t) {
    (t.has("value") || t.has("orientation") || t.has("variant")) && this.syncActive(), t.has("orientation") && b(this, this.internals, "ariaOrientation", this.orientation);
  }
  get tabs() {
    return this.tabsCache;
  }
  get panels() {
    return this.panelsCache;
  }
  syncActive() {
    const t = this.tabs;
    if (t.length === 0) return;
    let a = t.find((e) => e.value === this.value);
    a || (a = t[0], this.value = a.value);
    for (const e of t) {
      const s = e === a;
      e.setAttribute("data-variant", this.variant), e.toggleAttribute("data-active", s), e.tabIndex = s ? 0 : -1, e.setAttribute("aria-selected", String(s));
    }
    for (const e of this.panels) {
      const s = e.value === this.value;
      e.toggleAttribute("hidden", !s), e.setAttribute("aria-hidden", String(!s));
    }
  }
  setActive(t) {
    if (!(!t || t.disabled)) {
      if (this.value === t.value) {
        t.focus();
        return;
      }
      this.value = t.value, t.focus(), this.emit("vds-change", { value: this.value });
    }
  }
  render() {
    return h`
      <div class="tablist" role="tablist" aria-orientation=${this.orientation}>
        <slot name="tab" @slotchange=${this.refreshChildren}></slot>
      </div>
      <div class="panels">
        <slot @slotchange=${this.refreshChildren}></slot>
      </div>
    `;
  }
}
o([
  i({ type: String })
], d.prototype, "value");
o([
  i({ type: String, reflect: !0, attribute: "data-orientation" })
], d.prototype, "orientation");
o([
  i({ type: String })
], d.prototype, "activation");
o([
  i({ type: String, reflect: !0 })
], d.prototype, "variant");
class p extends u {
  constructor() {
    super(), this.value = "", this.disabled = !1, this.internals = this.attachInternals(), v(this, this.internals, "tab");
  }
  static {
    this.styles = c`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-1_5);
      padding: var(--vds-spacing-2) var(--vds-spacing-4);
      cursor: pointer;
      user-select: none;
      color: var(--vds-theme-text-dim);
      border-bottom: var(--vds-border-width-2) solid transparent;
      border-radius: 0;
      background: transparent;
      font-size: var(--vds-type-role-label-size);
      font-weight: var(--vds-type-role-label-weight);
      transition: color var(--vds-duration-fast) var(--vds-easing-ease-out),
        border-color var(--vds-duration-fast) var(--vds-easing-ease-out),
        background-color var(--vds-duration-fast) var(--vds-easing-ease-out);
    }
    :host(:hover) { color: var(--vds-theme-text-primary); }
    :host([data-active]) {
      color: var(--vds-theme-primary);
      border-bottom-color: var(--vds-theme-primary);
    }
    :host([data-variant="segmented"]) {
      border-bottom-color: transparent;
      border-radius: var(--vds-radius-md);
    }
    :host([data-variant="segmented"]:hover) {
      background: var(--vds-theme-bg-elevated-hover);
      color: var(--vds-theme-text-primary);
    }
    :host([data-variant="segmented"][data-active]) {
      background: var(--vds-theme-bg-elevated);
      color: var(--vds-theme-text-primary);
    }
    :host([disabled]) { opacity: 0.5; cursor: not-allowed; }
    :host(:focus-visible) {
      outline: var(--vds-border-width-2) solid var(--vds-theme-border-focus);
      outline-offset: var(--vds-spacing-0_5);
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), this.slot = "tab", this.hasAttribute("tabindex") || (this.tabIndex = -1);
  }
  updated(t) {
    t.has("disabled") && b(this, this.internals, "ariaDisabled", this.disabled);
  }
  render() {
    return h`<slot></slot>`;
  }
}
o([
  i({ type: String })
], p.prototype, "value");
o([
  i({ type: Boolean, reflect: !0 })
], p.prototype, "disabled");
class A extends u {
  constructor() {
    super(), this.value = "", this.internals = this.attachInternals(), v(this, this.internals, "tabpanel"), this.tabIndex = 0;
  }
  static {
    this.styles = c`
    :host { display: block; padding: var(--vds-spacing-4) 0; }
    :host([hidden]) { display: none; }
  `;
  }
  render() {
    return h`<slot></slot>`;
  }
}
o([
  i({ type: String })
], A.prototype, "value");
export {
  p as VdsTab,
  A as VdsTabPanel,
  d as VdsTabs
};
