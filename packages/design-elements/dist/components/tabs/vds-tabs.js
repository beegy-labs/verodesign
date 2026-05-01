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
class VdsTabs extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.orientation = "horizontal";
    this.activation = "auto";
    this.handleClick = (e) => {
      const target = e.target.closest("vds-tab");
      if (target) this.setActive(target);
    };
    this.handleKeydown = (e) => {
      const target = e.target.closest("vds-tab");
      if (!target) return;
      const tabs = this.tabs.filter((t) => !t.disabled);
      const idx = tabs.indexOf(target);
      if (idx < 0) return;
      let next;
      const isHorizontal = this.orientation === "horizontal";
      const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";
      const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";
      if (e.key === prevKey) next = tabs[(idx - 1 + tabs.length) % tabs.length];
      else if (e.key === nextKey) next = tabs[(idx + 1) % tabs.length];
      else if (e.key === "Home") next = tabs[0];
      else if (e.key === "End") next = tabs[tabs.length - 1];
      else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.setActive(target);
        return;
      }
      if (next) {
        e.preventDefault();
        if (this.activation === "auto") this.setActive(next);
        else next.focus();
      }
    };
    this.internals = this.attachInternals();
    setRole(this, this.internals, "presentation");
  }
  static {
    this.styles = css`
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
    super.connectedCallback();
    this.addEventListener("keydown", this.handleKeydown);
    this.addEventListener("click", this.handleClick);
    queueMicrotask(() => this.syncActive());
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this.handleKeydown);
    this.removeEventListener("click", this.handleClick);
  }
  updated(changed) {
    if (changed.has("value") || changed.has("orientation")) {
      this.syncActive();
    }
    if (changed.has("orientation")) {
      setAriaProperty(this, this.internals, "ariaOrientation", this.orientation);
    }
  }
  get tabs() {
    return Array.from(this.querySelectorAll("vds-tab"));
  }
  get panels() {
    return Array.from(this.querySelectorAll("vds-tab-panel"));
  }
  syncActive() {
    const tabs = this.tabs;
    if (tabs.length === 0) return;
    let active = tabs.find((t) => t.value === this.value);
    if (!active) {
      active = tabs[0];
      this.value = active.value;
    }
    for (const tab of tabs) {
      const isActive = tab === active;
      tab.toggleAttribute("data-active", isActive);
      tab.tabIndex = isActive ? 0 : -1;
      tab.setAttribute("aria-selected", String(isActive));
    }
    for (const panel of this.panels) {
      const isActive = panel.value === this.value;
      panel.toggleAttribute("hidden", !isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    }
  }
  setActive(tab) {
    if (!tab || tab.disabled) return;
    if (this.value === tab.value) {
      tab.focus();
      return;
    }
    this.value = tab.value;
    tab.focus();
    this.dispatchEvent(new CustomEvent("vds-change", { bubbles: true, composed: true, detail: { value: this.value } }));
  }
  render() {
    return html`
      <div class="tablist" role="tablist" aria-orientation=${this.orientation}>
        <slot name="tab"></slot>
      </div>
      <div class="panels">
        <slot></slot>
      </div>
    `;
  }
}
__decorateClass([
  property({ type: String })
], VdsTabs.prototype, "value");
__decorateClass([
  property({ type: String, reflect: true, attribute: "data-orientation" })
], VdsTabs.prototype, "orientation");
__decorateClass([
  property({ type: String })
], VdsTabs.prototype, "activation");
class VdsTab extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.disabled = false;
    this.internals = this.attachInternals();
    setRole(this, this.internals, "tab");
  }
  static {
    this.styles = css`
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
    super.connectedCallback();
    this.slot = "tab";
    if (!this.hasAttribute("tabindex")) this.tabIndex = -1;
  }
  updated(changed) {
    if (changed.has("disabled")) {
      setAriaProperty(this, this.internals, "ariaDisabled", this.disabled);
    }
  }
  render() {
    return html`<slot></slot>`;
  }
}
__decorateClass([
  property({ type: String })
], VdsTab.prototype, "value");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsTab.prototype, "disabled");
class VdsTabPanel extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.internals = this.attachInternals();
    setRole(this, this.internals, "tabpanel");
    this.tabIndex = 0;
  }
  static {
    this.styles = css`
    :host { display: block; padding: var(--vds-spacing-4) 0; }
    :host([hidden]) { display: none; }
  `;
  }
  render() {
    return html`<slot></slot>`;
  }
}
__decorateClass([
  property({ type: String })
], VdsTabPanel.prototype, "value");
export {
  VdsTab,
  VdsTabPanel,
  VdsTabs
};
//# sourceMappingURL=vds-tabs.js.map
