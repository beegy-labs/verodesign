import { LitElement, css, html } from "lit";
import { property, state, query } from "lit/decorators.js";
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
class VdsSelect extends LitElement {
  constructor() {
    super();
    this.value = "";
    this.placeholder = "Select…";
    this.disabled = false;
    this.required = false;
    this.open = false;
    this.activeIndex = -1;
    this.displayLabel = "";
    this.typeBuffer = "";
    this.typeBufferTimer = null;
    this.handleKey = (event) => {
      if (this.disabled) return;
      const opts = this.options;
      if (!this.open) {
        if (event.key === " " || event.key === "Enter" || event.key === "ArrowDown") {
          event.preventDefault();
          this.toggle();
          return;
        }
      } else {
        if (event.key === "Escape") {
          event.preventDefault();
          this.open = false;
          return;
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          this.setActive(Math.min(opts.length - 1, this.activeIndex + 1));
          return;
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          this.setActive(Math.max(0, this.activeIndex - 1));
          return;
        }
        if (event.key === "Home") {
          event.preventDefault();
          this.setActive(0);
          return;
        }
        if (event.key === "End") {
          event.preventDefault();
          this.setActive(opts.length - 1);
          return;
        }
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (this.activeIndex >= 0) this.commit(this.activeIndex);
          return;
        }
        if (event.key.length === 1) {
          this.typeBuffer += event.key.toLowerCase();
          if (this.typeBufferTimer) clearTimeout(this.typeBufferTimer);
          this.typeBufferTimer = setTimeout(() => {
            this.typeBuffer = "";
          }, 500);
          const match = opts.findIndex((o) => (o.textContent ?? "").toLowerCase().startsWith(this.typeBuffer));
          if (match >= 0) this.setActive(match);
        }
      }
    };
    this.handleTriggerClick = () => {
      this.toggle();
    };
    this.handleListClick = (event) => {
      const target = event.target.closest("vds-option");
      if (!target) return;
      const idx = this.options.indexOf(target);
      if (idx >= 0) this.commit(idx);
    };
    this.internals = this.attachInternals();
    setRole(this, this.internals, "combobox");
    this.addEventListener("keydown", this.handleKey);
  }
  static {
    this.formAssociated = true;
  }
  static {
    this.styles = css`
    :host {
      display: inline-flex;
      position: relative;
      font-family: var(--vds-font-family-sans);
      width: 100%;
    }

    .trigger {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--vds-spacing-2);
      width: 100%;
      min-height: 2.5rem;
      padding: var(--vds-spacing-2) var(--vds-spacing-3);
      background: var(--vds-theme-bg-card);
      color: var(--vds-theme-text-primary);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      border-radius: var(--vds-radius-md);
      font-size: var(--vds-font-size-sm);
      cursor: pointer;
      user-select: none;
      transition: border-color var(--vds-duration-fast);
    }
    :host([disabled]) .trigger { opacity: 0.5; cursor: not-allowed; }
    :host(:focus-visible) .trigger,
    :host([data-open]) .trigger {
      outline: 2px solid var(--vds-theme-border-focus);
      outline-offset: 1px;
      border-color: var(--vds-theme-border-focus);
    }

    .placeholder { color: var(--vds-theme-text-faint); }
    .chevron { width: 16px; height: 16px; flex-shrink: 0; transition: transform var(--vds-duration-fast); }
    :host([data-open]) .chevron { transform: rotate(180deg); }

    .listbox {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: var(--vds-theme-bg-card);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      border-radius: var(--vds-radius-md);
      box-shadow: var(--vds-shadow-3);
      z-index: var(--vds-zindex-popover, 500);
      max-height: 240px;
      overflow-y: auto;
      padding: var(--vds-spacing-1) 0;
      display: none;
    }
    :host([data-open]) .listbox { display: block; }
  `;
  }
  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute("tabindex")) this.tabIndex = this.disabled ? -1 : 0;
    queueMicrotask(() => this.refreshOptions());
  }
  updated(changed) {
    if (changed.has("open")) {
      if (this.open) this.dataset.open = "";
      else delete this.dataset.open;
    }
    if (changed.has("value")) {
      const opt = this.findOptionByValue(this.value);
      this.displayLabel = opt?.textContent?.trim() ?? "";
      this.refreshSelected();
      this.internals.setFormValue(this.value || null);
    }
    setAriaProperty(this, this.internals, "ariaExpanded", this.open);
    setAriaProperty(this, this.internals, "ariaDisabled", this.disabled);
    setAriaProperty(this, this.internals, "ariaRequired", this.required);
    setAriaProperty(this, this.internals, "ariaHasPopup", "listbox");
  }
  get options() {
    return Array.from(this.querySelectorAll("vds-option"));
  }
  findOptionByValue(value) {
    return this.options.find((o) => o.value === value) ?? null;
  }
  refreshOptions() {
    if (this.value) {
      const opt = this.findOptionByValue(this.value);
      if (opt) this.displayLabel = opt.textContent?.trim() ?? "";
    }
    this.refreshSelected();
  }
  refreshSelected() {
    for (const o of this.options) {
      o.selected = o.value === this.value;
    }
  }
  setActive(idx) {
    const opts = this.options;
    for (const o of opts) o.removeAttribute("data-active");
    if (idx >= 0 && idx < opts.length) {
      opts[idx].setAttribute("data-active", "");
      opts[idx].scrollIntoView({ block: "nearest" });
    }
    this.activeIndex = idx;
  }
  toggle() {
    if (this.disabled) return;
    this.open = !this.open;
    if (this.open) {
      const opts = this.options;
      const selectedIdx = opts.findIndex((o) => o.value === this.value);
      this.setActive(selectedIdx >= 0 ? selectedIdx : 0);
    }
  }
  commit(idx) {
    const opts = this.options;
    const opt = opts[idx];
    if (!opt || opt.disabled) return;
    this.value = opt.value;
    this.displayLabel = opt.textContent?.trim() ?? "";
    this.open = false;
    this.dispatchEvent(new CustomEvent("change", { detail: { value: this.value }, bubbles: true, composed: true }));
  }
  render() {
    return html`
      <div class="trigger" part="trigger" @click=${this.handleTriggerClick}>
        <span class=${this.displayLabel ? "" : "placeholder"}>${this.displayLabel || this.placeholder}</span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
      <div class="listbox" part="listbox" role="listbox" @click=${this.handleListClick}>
        <slot @slotchange=${() => this.refreshOptions()}></slot>
      </div>
    `;
  }
}
__decorateClass([
  property({ type: String, reflect: true })
], VdsSelect.prototype, "value");
__decorateClass([
  property({ type: String })
], VdsSelect.prototype, "placeholder");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsSelect.prototype, "disabled");
__decorateClass([
  property({ type: Boolean, reflect: true })
], VdsSelect.prototype, "required");
__decorateClass([
  property({ type: String })
], VdsSelect.prototype, "name");
__decorateClass([
  state()
], VdsSelect.prototype, "open");
__decorateClass([
  state()
], VdsSelect.prototype, "activeIndex");
__decorateClass([
  state()
], VdsSelect.prototype, "displayLabel");
__decorateClass([
  query(".trigger")
], VdsSelect.prototype, "triggerEl");
__decorateClass([
  query(".listbox")
], VdsSelect.prototype, "listboxEl");
export {
  VdsSelect
};
//# sourceMappingURL=vds-select.js.map
