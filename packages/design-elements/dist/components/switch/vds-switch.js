import { css as l, html as c } from "lit";
import { property as s } from "lit/decorators.js";
import { setRole as p, setAriaProperty as o } from "../../utils/attribute-mirror.js";
import { VdsElement as u } from "../../base/vds-element.js";
var m = Object.defineProperty, i = (a, t, d, f) => {
  for (var e = void 0, h = a.length - 1, n; h >= 0; h--)
    (n = a[h]) && (e = n(t, d, e) || e);
  return e && m(t, d, e), e;
};
class r extends u {
  constructor() {
    super(), this.checked = !1, this.disabled = !1, this.required = !1, this.value = "on", this.size = "md", this.handleClick = (t) => {
      if (this.disabled) {
        t.preventDefault(), t.stopImmediatePropagation();
        return;
      }
      this.toggle();
    }, this.handleKeydown = (t) => {
      (t.key === " " || t.key === "Enter") && (t.preventDefault(), this.disabled || this.toggle());
    }, this.internals = this.attachInternals(), p(this, this.internals, "switch"), this.addEventListener("click", this.handleClick), this.addEventListener("keydown", this.handleKeydown);
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = l`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-2);
      cursor: pointer;
      user-select: none;
      color: var(--vds-theme-text-primary);
      font-family: var(--vds-font-family-sans);
    }
    :host([disabled]) { cursor: not-allowed; opacity: 0.5; }
    :host([size="sm"]) { font-size: var(--vds-font-size-sm); }
    :host([size="md"]) { font-size: var(--vds-font-size-base); }
    :host([size="lg"]) { font-size: var(--vds-font-size-lg); }

    .track {
      position: relative;
      flex-shrink: 0;
      background: var(--vds-theme-border-default);
      border-radius: 999px;
      transition: background var(--vds-duration-fast);
    }
    :host([size="sm"]) .track { width: 28px; height: 16px; }
    :host([size="md"]) .track { width: 36px; height: 20px; }
    :host([size="lg"]) .track { width: 44px; height: 24px; }

    :host([checked]) .track { background: var(--vds-theme-primary); }

    .thumb {
      position: absolute;
      top: 2px;
      left: 2px;
      background: var(--vds-theme-bg-card);
      border-radius: 999px;
      transition: transform var(--vds-duration-fast);
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    :host([size="sm"]) .thumb { width: 12px; height: 12px; }
    :host([size="md"]) .thumb { width: 16px; height: 16px; }
    :host([size="lg"]) .thumb { width: 20px; height: 20px; }

    :host([size="sm"][checked]) .thumb { transform: translateX(12px); }
    :host([size="md"][checked]) .thumb { transform: translateX(16px); }
    :host([size="lg"][checked]) .thumb { transform: translateX(20px); }

    :host(:focus-visible) .track {
      outline: 2px solid var(--vds-theme-border-focus);
      outline-offset: 2px;
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("tabindex") || (this.tabIndex = this.disabled ? -1 : 0), this.syncFormValue(), this.syncAria();
  }
  updated(t) {
    super.updated(t), (t.has("checked") || t.has("disabled") || t.has("required")) && (this.syncAria(), this.syncFormValue()), t.has("disabled") && (this.tabIndex = this.disabled ? -1 : 0);
  }
  syncAria() {
    o(this, this.internals, "ariaChecked", this.checked ? "true" : "false"), o(this, this.internals, "ariaDisabled", this.disabled), o(this, this.internals, "ariaRequired", this.required);
  }
  syncFormValue() {
    this.internals.setFormValue(this.checked ? this.value : null);
  }
  toggle() {
    this.checked = !this.checked, this.emit("change", { checked: this.checked });
  }
  render() {
    return c`
      <span class="track" part="track" aria-hidden="true">
        <span class="thumb" part="thumb"></span>
      </span>
      <slot></slot>
    `;
  }
}
i([
  s({ type: Boolean, reflect: !0 })
], r.prototype, "checked");
i([
  s({ type: Boolean, reflect: !0 })
], r.prototype, "disabled");
i([
  s({ type: Boolean, reflect: !0 })
], r.prototype, "required");
i([
  s({ type: String })
], r.prototype, "name");
i([
  s({ type: String })
], r.prototype, "value");
i([
  s({ type: String, reflect: !0 })
], r.prototype, "size");
export {
  r as VdsSwitch
};
