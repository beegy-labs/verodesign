import { LitElement, css, html } from "lit";
import { property, query } from "lit/decorators.js";
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
class VdsMenu extends LitElement {
  constructor() {
    super();
    this.open = false;
    this.placement = "bottom-start";
    this.typeBuffer = "";
    this.typeTimer = 0;
    this.handleClick = (e) => {
      const trigger = this.getTrigger();
      const path = e.composedPath();
      if (trigger && path.includes(trigger)) {
        this.open = !this.open;
        return;
      }
      const item = e.target.closest("vds-menu-item");
      if (item && !item.disabled) {
        this.activate(item);
      }
    };
    this.handleKeydown = (e) => {
      const trigger = this.getTrigger();
      const path = e.composedPath();
      if (trigger && path.includes(trigger)) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.open = true;
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          this.open = true;
          queueMicrotask(() => {
            const items2 = this.getItems();
            items2[items2.length - 1]?.focus();
          });
        }
        return;
      }
      if (!this.open) return;
      const items = this.getItems();
      const active = items.find((i) => i === document.activeElement || i.matches(":focus-within"));
      const idx = active ? items.indexOf(active) : -1;
      if (e.key === "Escape") {
        e.preventDefault();
        this.open = false;
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        items[(idx + 1) % items.length]?.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length]?.focus();
      } else if (e.key === "Home") {
        e.preventDefault();
        items[0]?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        items[items.length - 1]?.focus();
      } else if (e.key === "Enter" || e.key === " ") {
        if (active) {
          e.preventDefault();
          this.activate(active);
        }
      } else if (e.key === "Tab") {
        this.open = false;
      } else if (e.key.length === 1 && /\S/.test(e.key)) {
        this.handleTypeAhead(e.key, items, idx);
      }
    };
    this.handleOutsideClick = (e) => {
      if (!this.open) return;
      const path = e.composedPath();
      if (!path.includes(this)) this.open = false;
    };
    this.internals = this.attachInternals();
    setRole(this, this.internals, "presentation");
  }
  static {
    this.styles = css`
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
    super.connectedCallback();
    this.addEventListener("click", this.handleClick);
    this.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("mousedown", this.handleOutsideClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("click", this.handleClick);
    this.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("mousedown", this.handleOutsideClick);
  }
  updated(changed) {
    if (changed.has("open")) {
      const trigger = this.getTrigger();
      if (trigger) {
        trigger.setAttribute("aria-expanded", String(this.open));
        trigger.setAttribute("aria-haspopup", "menu");
      }
      if (this.open) {
        const items = this.getItems();
        items[0]?.focus();
      } else {
        if (this.shadowRoot?.activeElement) {
          trigger?.focus?.();
        }
      }
    }
    if (changed.has("placement")) {
      if (this.placement === "bottom-end") {
        this.menuEl.style.left = "auto";
        this.menuEl.style.right = "0";
      }
    }
  }
  getTrigger() {
    const slot = this.shadowRoot?.querySelector('slot[name="trigger"]');
    return slot?.assignedElements()[0] ?? null;
  }
  getItems() {
    return Array.from(this.querySelectorAll("vds-menu-item:not([disabled])"));
  }
  handleTypeAhead(char, items, currentIdx) {
    clearTimeout(this.typeTimer);
    this.typeBuffer += char.toLowerCase();
    this.typeTimer = window.setTimeout(() => {
      this.typeBuffer = "";
    }, 500);
    const start = currentIdx + 1;
    const ordered = [...items.slice(start), ...items.slice(0, start)];
    const match = ordered.find((it) => it.textContent?.trim().toLowerCase().startsWith(this.typeBuffer));
    match?.focus();
  }
  activate(item) {
    this.dispatchEvent(new CustomEvent("vds-select", {
      bubbles: true,
      composed: true,
      detail: { value: item.value, item }
    }));
    this.open = false;
  }
  show() {
    this.open = true;
  }
  hide() {
    this.open = false;
  }
  render() {
    return html`
      <slot name="trigger"></slot>
      <div class="menu" role="menu">
        <slot></slot>
      </div>
    `;
  }
}
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsMenu.prototype, "open");
__decorateClass([
  property({ type: String })
], VdsMenu.prototype, "placement");
__decorateClass([
  query(".menu")
], VdsMenu.prototype, "menuEl");
class VdsMenuItem extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.disabled = false;
    this.tone = "default";
    this.internals = this.attachInternals();
    setRole(this, this.internals, "menuitem");
  }
  static {
    this.styles = css`
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
    super.connectedCallback();
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
], VdsMenuItem.prototype, "value");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsMenuItem.prototype, "disabled");
__decorateClass([
  property({ type: String, reflect: true, attribute: "data-tone" })
], VdsMenuItem.prototype, "tone");
export {
  VdsMenu,
  VdsMenuItem
};
//# sourceMappingURL=vds-menu.js.map
