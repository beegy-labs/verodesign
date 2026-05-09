import { css as f, html as u } from "lit";
import { property as o, state as p, query as c } from "lit/decorators.js";
import { setRole as v, setAriaProperty as l } from "../../utils/attribute-mirror.js";
import { VdsElement as y } from "../../base/vds-element.js";
var g = Object.defineProperty, i = (n, t, e, s) => {
  for (var a = void 0, d = n.length - 1, h; d >= 0; d--)
    (h = n[d]) && (a = h(t, e, a) || a);
  return a && g(t, e, a), a;
};
class r extends y {
  constructor() {
    super(), this.value = "", this.placeholder = "Select…", this.disabled = !1, this.required = !1, this.open = !1, this.activeIndex = -1, this.displayLabel = "", this.typeBuffer = "", this.typeBufferTimer = null, this._options = [], this.handleKey = (t) => {
      if (this.disabled) return;
      const e = this.options;
      if (this.open) {
        if (t.key === "Escape") {
          t.preventDefault(), this.open = !1;
          return;
        }
        if (t.key === "ArrowDown") {
          t.preventDefault(), this.setActive(Math.min(e.length - 1, this.activeIndex + 1));
          return;
        }
        if (t.key === "ArrowUp") {
          t.preventDefault(), this.setActive(Math.max(0, this.activeIndex - 1));
          return;
        }
        if (t.key === "Home") {
          t.preventDefault(), this.setActive(0);
          return;
        }
        if (t.key === "End") {
          t.preventDefault(), this.setActive(e.length - 1);
          return;
        }
        if (t.key === "Enter" || t.key === " ") {
          t.preventDefault(), this.activeIndex >= 0 && this.commit(this.activeIndex);
          return;
        }
        if (t.key.length === 1) {
          this.typeBuffer += t.key.toLowerCase(), this.typeBufferTimer && clearTimeout(this.typeBufferTimer), this.typeBufferTimer = setTimeout(() => {
            this.typeBuffer = "";
          }, 500);
          const s = e.findIndex((a) => (a.textContent ?? "").toLowerCase().startsWith(this.typeBuffer));
          s >= 0 && this.setActive(s);
        }
      } else if (t.key === " " || t.key === "Enter" || t.key === "ArrowDown") {
        t.preventDefault(), this.toggle();
        return;
      }
    }, this.handleTriggerClick = () => {
      this.toggle();
    }, this.handleListClick = (t) => {
      const e = t.target.closest("vds-option");
      if (!e) return;
      const s = this.options.indexOf(e);
      s >= 0 && this.commit(s);
    }, this.internals = this.attachInternals(), v(this, this.internals, "combobox"), this.addEventListener("keydown", this.handleKey);
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = f`
    :host {
      display: inline-flex;
      flex-direction: column;
      gap: var(--vds-spacing-1);
      font-family: var(--vds-font-family-sans);
      width: 100%;
    }
    .label {
      font-size: var(--vds-font-size-sm);
      font-weight: var(--vds-font-weight-500);
      color: var(--vds-theme-text-primary);
    }
    .label[data-required]::after {
      content: ' *';
      color: var(--vds-theme-destructive);
    }
    .helper {
      font-size: var(--vds-font-size-xs);
      color: var(--vds-theme-text-dim);
    }
    .helper[data-error] { color: var(--vds-theme-destructive); }
    .label:empty, .helper:empty { display: none; }

    .control {
      position: relative;
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
    super.connectedCallback(), this.hasAttribute("tabindex") || (this.tabIndex = this.disabled ? -1 : 0), queueMicrotask(() => this.refreshOptions());
  }
  updated(t) {
    if (super.updated(t), t.has("value")) {
      const e = this.findOptionByValue(this.value);
      this.displayLabel = e?.textContent?.trim() ?? "", this.refreshSelected(), this.internals.setFormValue(this.value || null);
    }
    l(this, this.internals, "ariaExpanded", this.open), l(this, this.internals, "ariaDisabled", this.disabled), l(this, this.internals, "ariaRequired", this.required), l(this, this.internals, "ariaHasPopup", "listbox");
  }
  get options() {
    return this._options;
  }
  findOptionByValue(t) {
    return this.options.find((e) => e.value === t) ?? null;
  }
  refreshOptions() {
    if (this._options = Array.from(this.querySelectorAll("vds-option")), this.value) {
      const t = this.findOptionByValue(this.value);
      t && (this.displayLabel = t.textContent?.trim() ?? "");
    }
    this.refreshSelected();
  }
  refreshSelected() {
    for (const t of this.options)
      t.selected = t.value === this.value;
  }
  setActive(t) {
    const e = this.options;
    for (const s of e) s.removeAttribute("data-active");
    t >= 0 && t < e.length && (e[t].setAttribute("data-active", ""), e[t].scrollIntoView({ block: "nearest" })), this.activeIndex = t;
  }
  toggle() {
    if (!this.disabled && (this.open = !this.open, this.open)) {
      const e = this.options.findIndex((s) => s.value === this.value);
      this.setActive(e >= 0 ? e : 0);
    }
  }
  commit(t) {
    const s = this.options[t];
    !s || s.disabled || (this.value = s.value, this.displayLabel = s.textContent?.trim() ?? "", this.open = !1, this.emit("change", { value: this.value }));
  }
  render() {
    const t = this.errorMessage ?? this.helper ?? "";
    return u`
      <span class="label" ?data-required=${this.required}>${this.label ?? ""}</span>
      <div class="control">
        <div class="trigger" part="trigger" @click=${this.handleTriggerClick}>
          <span class=${this.displayLabel ? "" : "placeholder"}>${this.displayLabel || this.placeholder}</span>
          <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="listbox" part="listbox" role="listbox" @click=${this.handleListClick}>
          <slot @slotchange=${() => this.refreshOptions()}></slot>
        </div>
      </div>
      <span class="helper" ?data-error=${!!this.errorMessage}>${t}</span>
    `;
  }
}
i([
  o({ type: String, reflect: !0 })
], r.prototype, "value");
i([
  o({ type: String })
], r.prototype, "placeholder");
i([
  o({ type: String })
], r.prototype, "label");
i([
  o({ type: String })
], r.prototype, "helper");
i([
  o({ type: String })
], r.prototype, "errorMessage");
i([
  o({ type: Boolean, reflect: !0 })
], r.prototype, "disabled");
i([
  o({ type: Boolean, reflect: !0 })
], r.prototype, "required");
i([
  o({ type: String })
], r.prototype, "name");
i([
  o({ type: Boolean, reflect: !0, attribute: "data-open" })
], r.prototype, "open");
i([
  p()
], r.prototype, "activeIndex");
i([
  p()
], r.prototype, "displayLabel");
i([
  c(".trigger")
], r.prototype, "triggerEl");
i([
  c(".listbox")
], r.prototype, "listboxEl");
export {
  r as VdsSelect
};
