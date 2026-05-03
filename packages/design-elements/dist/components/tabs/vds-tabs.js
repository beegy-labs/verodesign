import { css as d, html as h, LitElement as u } from "lit";
import { property as r } from "lit/decorators.js";
import { setRole as c, setAriaProperty as p } from "../../utils/attribute-mirror.js";
import { VdsElement as m } from "../../base/vds-element.js";
var A = Object.defineProperty, n = (o, t, i, e) => {
  for (var s = void 0, a = o.length - 1, l; a >= 0; a--)
    (l = o[a]) && (s = l(t, i, s) || s);
  return s && A(t, i, s), s;
};
class v extends m {
  constructor() {
    super(), this.value = "", this.orientation = "horizontal", this.activation = "auto", this.tabsCache = [], this.panelsCache = [], this.refreshChildren = () => {
      this.tabsCache = Array.from(this.querySelectorAll("vds-tab")), this.panelsCache = Array.from(this.querySelectorAll("vds-tab-panel")), this.syncActive();
    }, this.handleClick = (t) => {
      const i = t.target.closest("vds-tab");
      i && this.setActive(i);
    }, this.handleKeydown = (t) => {
      const i = t.target.closest("vds-tab");
      if (!i) return;
      const e = this.tabs.filter((g) => !g.disabled), s = e.indexOf(i);
      if (s < 0) return;
      let a;
      const l = this.orientation === "horizontal", b = l ? "ArrowLeft" : "ArrowUp", y = l ? "ArrowRight" : "ArrowDown";
      if (t.key === b) a = e[(s - 1 + e.length) % e.length];
      else if (t.key === y) a = e[(s + 1) % e.length];
      else if (t.key === "Home") a = e[0];
      else if (t.key === "End") a = e[e.length - 1];
      else if (t.key === "Enter" || t.key === " ") {
        t.preventDefault(), this.setActive(i);
        return;
      }
      a && (t.preventDefault(), this.activation === "auto" ? this.setActive(a) : a.focus());
    }, this.internals = this.attachInternals(), c(this, this.internals, "presentation");
  }
  static {
    this.styles = d`
    :host {
      display: block;
      font-family: var(--vds-font-family-sans);
      color: var(--vds-theme-text-primary);
    }
    .tablist {
      display: flex;
      gap: var(--vds-spacing-1);
      border-bottom: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      overflow-x: auto;
      scrollbar-width: thin;
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
  `;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("keydown", this.handleKeydown), this.addEventListener("click", this.handleClick), queueMicrotask(() => this.syncActive());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("keydown", this.handleKeydown), this.removeEventListener("click", this.handleClick);
  }
  updated(t) {
    (t.has("value") || t.has("orientation")) && this.syncActive(), t.has("orientation") && p(this, this.internals, "ariaOrientation", this.orientation);
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
    let i = t.find((e) => e.value === this.value);
    i || (i = t[0], this.value = i.value);
    for (const e of t) {
      const s = e === i;
      e.toggleAttribute("data-active", s), e.tabIndex = s ? 0 : -1, e.setAttribute("aria-selected", String(s));
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
n([
  r({ type: String })
], v.prototype, "value");
n([
  r({ type: String, reflect: !0, attribute: "data-orientation" })
], v.prototype, "orientation");
n([
  r({ type: String })
], v.prototype, "activation");
class f extends u {
  constructor() {
    super(), this.value = "", this.disabled = !1, this.internals = this.attachInternals(), c(this, this.internals, "tab");
  }
  static {
    this.styles = d`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-1_5);
      padding: var(--vds-spacing-2) var(--vds-spacing-4);
      cursor: pointer;
      user-select: none;
      color: var(--vds-theme-text-dim);
      border-bottom: 2px solid transparent;
      font-size: var(--vds-font-size-sm);
      font-weight: var(--vds-font-weight-500);
      transition: color var(--vds-duration-fast) var(--vds-easing-ease-out),
                  border-color var(--vds-duration-fast) var(--vds-easing-ease-out);
    }
    :host(:hover) { color: var(--vds-theme-text-primary); }
    :host([data-active]) {
      color: var(--vds-theme-primary);
      border-bottom-color: var(--vds-theme-primary);
    }
    :host([disabled]) { opacity: 0.5; cursor: not-allowed; }
    :host(:focus-visible) {
      outline: 2px solid var(--vds-theme-border-focus);
      outline-offset: 2px;
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), this.slot = "tab", this.hasAttribute("tabindex") || (this.tabIndex = -1);
  }
  updated(t) {
    t.has("disabled") && p(this, this.internals, "ariaDisabled", this.disabled);
  }
  render() {
    return h`<slot></slot>`;
  }
}
n([
  r({ type: String })
], f.prototype, "value");
n([
  r({ type: Boolean, reflect: !0 })
], f.prototype, "disabled");
class x extends u {
  constructor() {
    super(), this.value = "", this.internals = this.attachInternals(), c(this, this.internals, "tabpanel"), this.tabIndex = 0;
  }
  static {
    this.styles = d`
    :host { display: block; padding: var(--vds-spacing-4) 0; }
    :host([hidden]) { display: none; }
  `;
  }
  render() {
    return h`<slot></slot>`;
  }
}
n([
  r({ type: String })
], x.prototype, "value");
export {
  f as VdsTab,
  x as VdsTabPanel,
  v as VdsTabs
};
