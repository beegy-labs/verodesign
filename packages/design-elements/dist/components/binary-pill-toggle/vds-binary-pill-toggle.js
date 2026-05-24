import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as p, nothing as f } from "../../node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as r } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as u } from "../../base/vds-element.js";
import { setRole as v, setAriaProperty as c } from "../../utils/attribute-mirror.js";
import { css as b } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var m = Object.defineProperty, o = (h, t, i, s) => {
  for (var e = void 0, a = h.length - 1, n; a >= 0; a--)
    (n = h[a]) && (e = n(t, i, e) || e);
  return e && m(t, i, e), e;
};
class l extends u {
  constructor() {
    super(), this.value = "", this.emphasis = "neutral", this.size = "md", this.disabled = !1, this.ariaLabel = null, this.optionsCache = [], this.refreshOptions = () => {
      this.optionsCache = Array.from(this.querySelectorAll("vds-binary-pill-toggle-option")), this.syncOptions();
    }, this.handleClick = (t) => {
      const i = t.target.closest("vds-binary-pill-toggle-option");
      i && this.commit(i);
    }, this.handleKeydown = (t) => {
      const i = t.target.closest("vds-binary-pill-toggle-option");
      if (i) {
        if (t.key === "ArrowLeft" || t.key === "ArrowUp") {
          t.preventDefault(), this.move(-1);
          return;
        }
        if (t.key === "ArrowRight" || t.key === "ArrowDown") {
          t.preventDefault(), this.move(1);
          return;
        }
        if (t.key === "Home") {
          t.preventDefault();
          const s = this.options.find((e) => !this.isOptionDisabled(e));
          s && this.commit(s);
          return;
        }
        if (t.key === "End") {
          t.preventDefault();
          const s = this.options.filter((a) => !this.isOptionDisabled(a)), e = s[s.length - 1];
          e && this.commit(e);
          return;
        }
        t.key === " " && (t.preventDefault(), this.commit(i));
      }
    }, this.internals = this.attachInternals(), v(this, this.internals, "radiogroup");
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = b`
    :host {
      display: inline-flex;
      font-family: var(--vds-font-family-sans);
      color: var(--vds-theme-text-primary);
    }
    :host([hidden]) {
      display: none;
    }
    .group {
      display: inline-flex;
      align-items: stretch;
      gap: var(--vds-spacing-1);
      padding: var(--vds-spacing-1);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      border-radius: var(--vds-radius-full);
      background: var(--vds-theme-bg-card);
    }
    :host([disabled]) .group {
      background: var(--vds-theme-state-disabled);
    }
    :host([size="sm"]) .group {
      gap: var(--vds-spacing-0_5);
      padding: var(--vds-spacing-0_5);
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this.handleClick), this.addEventListener("keydown", this.handleKeydown), queueMicrotask(() => this.refreshOptions());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.removeEventListener("click", this.handleClick), this.removeEventListener("keydown", this.handleKeydown);
  }
  updated(t) {
    (t.has("value") || t.has("disabled") || t.has("emphasis") || t.has("size")) && this.syncOptions(), t.has("value") && this.internals.setFormValue(this.value || null), t.has("ariaLabel") && c(this, this.internals, "ariaLabel", this.ariaLabel), t.has("disabled") && c(this, this.internals, "ariaDisabled", this.disabled);
  }
  get options() {
    return this.optionsCache;
  }
  syncOptions() {
    const i = this.options.filter((e) => !this.isOptionDisabled(e))[0] ?? this.options[0], s = this.options.find((e) => e.value === this.value && !this.isOptionDisabled(e)) ?? i;
    if (s) {
      if (this.value !== s.value) {
        this.value = s.value;
        return;
      }
      for (const e of this.options) {
        const a = e === s, n = this.isOptionDisabled(e);
        e.checked = a, e.emphasis = this.emphasis, e.size = this.size, e.groupDisabled = this.disabled, e.tabIndex = a && !n ? 0 : -1, e.setAttribute("aria-checked", String(a)), e.setAttribute("aria-disabled", String(n));
      }
    }
  }
  isOptionDisabled(t) {
    return this.disabled || t.disabled;
  }
  commit(t, i = !0) {
    if (this.isOptionDisabled(t)) return;
    const s = this.value !== t.value;
    this.value = t.value, i && t.focus(), s && (this.emit("vds-change", { value: this.value }), this.emit("input", void 0), this.emit("change", void 0));
  }
  move(t, i = !0) {
    const s = this.options.filter((n) => !this.isOptionDisabled(n));
    if (s.length === 0) return;
    const e = s.findIndex((n) => n.value === this.value), a = s[(e + t + s.length) % s.length] ?? s[0];
    this.commit(a, i);
  }
  render() {
    return p`<div class="group" role="presentation"><slot @slotchange=${this.refreshOptions}></slot></div>`;
  }
}
o([
  r({ type: String, reflect: !0 })
], l.prototype, "value");
o([
  r({ type: String, reflect: !0 })
], l.prototype, "emphasis");
o([
  r({ type: String, reflect: !0 })
], l.prototype, "size");
o([
  r({ type: Boolean, reflect: !0 })
], l.prototype, "disabled");
o([
  r({ type: String, attribute: "aria-label" })
], l.prototype, "ariaLabel");
class d extends u {
  constructor() {
    super(), this.value = "", this.disabled = !1, this.checked = !1, this.emphasis = "neutral", this.size = "md", this.groupDisabled = !1, this.internals = this.attachInternals(), v(this, this.internals, "radio");
  }
  static {
    this.styles = b`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-inline-size: 0;
      padding: var(--vds-spacing-2) var(--vds-spacing-4);
      border-radius: var(--vds-radius-full);
      color: var(--vds-theme-text-secondary);
      background: transparent;
      cursor: pointer;
      user-select: none;
      white-space: nowrap;
      font-size: var(--vds-type-role-label-size);
      font-weight: var(--vds-type-role-label-weight);
      line-height: var(--vds-type-role-label-lineheight);
      transition:
        background-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard),
        color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard),
        border-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard);
    }
    :host([data-size="sm"]) {
      padding: var(--vds-spacing-1_5) var(--vds-spacing-3);
    }
    :host([data-checked]) {
      background: var(--vds-theme-bg-selected);
      color: var(--vds-theme-text-primary);
    }
    :host([data-emphasis="success"][data-checked]) {
      background: var(--vds-theme-status-success);
      color: var(--vds-theme-status-success-foreground);
    }
    :host([data-emphasis="destructive"][data-checked]) {
      background: var(--vds-theme-destructive);
      color: var(--vds-theme-destructive-foreground);
    }
    :host([data-emphasis="brand"][data-checked]) {
      background: var(--vds-theme-state-selected);
      color: var(--vds-theme-text-primary);
    }
    :host([disabled]),
    :host([data-group-disabled]) {
      cursor: not-allowed;
      color: var(--vds-theme-text-dim);
    }
    :host(:focus-visible) {
      outline: var(--vds-border-width-2) solid var(--vds-theme-border-focus);
      outline-offset: var(--vds-spacing-0_5);
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("tabindex") || (this.tabIndex = -1);
  }
  updated(t) {
    if (t.has("checked") && (this.toggleAttribute("data-checked", this.checked), c(this, this.internals, "ariaChecked", this.checked)), t.has("disabled") || t.has("groupDisabled")) {
      const i = this.disabled || this.groupDisabled;
      this.toggleAttribute("data-group-disabled", this.groupDisabled), c(this, this.internals, "ariaDisabled", i);
    }
    t.has("emphasis") && this.setAttribute("data-emphasis", this.emphasis), t.has("size") && this.setAttribute("data-size", this.size);
  }
  render() {
    return p`<slot></slot>${f}`;
  }
}
o([
  r({ type: String })
], d.prototype, "value");
o([
  r({ type: Boolean, reflect: !0 })
], d.prototype, "disabled");
o([
  r({ type: Boolean })
], d.prototype, "checked");
o([
  r({ type: String })
], d.prototype, "emphasis");
o([
  r({ type: String })
], d.prototype, "size");
o([
  r({ type: Boolean, attribute: !1 })
], d.prototype, "groupDisabled");
export {
  l as VdsBinaryPillToggle,
  d as VdsBinaryPillToggleOption
};
