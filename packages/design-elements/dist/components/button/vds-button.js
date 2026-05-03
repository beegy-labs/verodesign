import { css as h, html as n } from "lit";
import { property as e } from "lit/decorators.js";
import { setRole as c, setAriaProperty as v } from "../../utils/attribute-mirror.js";
import { focusRing as u, srOnly as b, reducedMotion as p } from "../../styles/shared.js";
import { VdsElement as m } from "../../base/vds-element.js";
var f = Object.defineProperty, r = (s, t, d, g) => {
  for (var a = void 0, i = s.length - 1, l; i >= 0; i--)
    (l = s[i]) && (a = l(t, d, a) || a);
  return a && f(t, d, a), a;
};
class o extends m {
  constructor() {
    super(), this.variant = "solid", this.tone = "primary", this.size = "md", this.type = "button", this.disabled = !1, this.loading = !1, this.ariaLabelText = null, this.handleClick = (t) => {
      if (this.disabled || this.loading) {
        t.preventDefault(), t.stopImmediatePropagation();
        return;
      }
      this.type === "submit" && this.internals.form?.requestSubmit(), this.type === "reset" && this.internals.form?.reset();
    }, this.handleKeydown = (t) => {
      (t.key === " " || t.key === "Enter") && (t.preventDefault(), this.click());
    }, this.internals = this.attachInternals(), c(this, this.internals, "button"), this.addEventListener("click", this.handleClick), this.addEventListener("keydown", this.handleKeydown);
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = [
      u,
      b,
      p,
      h`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      :host([hidden]) { display: none; }

      .button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--vds-spacing-2);
        font-family: var(--vds-font-family-sans);
        font-weight: var(--vds-font-weight-500);
        line-height: var(--vds-font-lineheight-normal);
        white-space: nowrap;
        cursor: pointer;
        user-select: none;
        border-radius: var(--vds-radius-md);
        border: var(--vds-border-width-1) solid transparent;
        transition: background-color var(--vds-duration-fast) var(--vds-easing-ease-out),
                    color var(--vds-duration-fast) var(--vds-easing-ease-out),
                    border-color var(--vds-duration-fast) var(--vds-easing-ease-out),
                    box-shadow var(--vds-duration-fast) var(--vds-easing-ease-out);
      }

      :host([size="sm"]) .button {
        padding: var(--vds-spacing-1_5) var(--vds-spacing-3);
        font-size: var(--vds-font-size-sm);
        min-height: 2rem;
      }
      :host([size="md"]) .button {
        padding: var(--vds-spacing-2) var(--vds-spacing-4);
        font-size: var(--vds-font-size-base);
        min-height: 2.5rem;
      }
      :host([size="lg"]) .button {
        padding: var(--vds-spacing-3) var(--vds-spacing-5);
        font-size: var(--vds-font-size-lg);
        min-height: 3rem;
      }

      :host([tone="primary"][variant="solid"]) .button {
        background: var(--vds-theme-primary);
        color: var(--vds-theme-primary-fg);
      }
      :host([tone="primary"][variant="solid"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-primary) 90%, black);
      }
      :host([tone="primary"][variant="soft"]) .button {
        background: color-mix(in oklch, var(--vds-theme-primary) 12%, transparent);
        color: var(--vds-theme-primary);
      }
      :host([tone="primary"][variant="outline"]) .button {
        border-color: var(--vds-theme-primary);
        color: var(--vds-theme-primary);
      }
      :host([tone="primary"][variant="ghost"]) .button {
        color: var(--vds-theme-primary);
      }
      :host([tone="primary"][variant="ghost"]:hover) .button,
      :host([tone="primary"][variant="outline"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-primary) 8%, transparent);
      }

      :host([tone="accent"][variant="solid"]) .button {
        background: var(--vds-theme-accent);
        color: var(--vds-theme-accent-fg);
      }
      :host([tone="accent"][variant="solid"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-accent) 90%, black);
      }
      :host([tone="accent"][variant="soft"]) .button {
        background: color-mix(in oklch, var(--vds-theme-accent) 12%, transparent);
        color: var(--vds-theme-accent);
      }
      :host([tone="accent"][variant="outline"]) .button {
        border-color: var(--vds-theme-accent);
        color: var(--vds-theme-accent);
      }
      :host([tone="accent"][variant="ghost"]) .button {
        color: var(--vds-theme-accent);
      }

      :host([tone="neutral"][variant="solid"]) .button {
        background: var(--vds-theme-neutral);
        color: var(--vds-theme-neutral-fg);
      }
      :host([tone="neutral"][variant="soft"]) .button {
        background: var(--vds-theme-bg-muted);
        color: var(--vds-theme-text-primary);
      }
      :host([tone="neutral"][variant="outline"]) .button {
        border-color: var(--vds-theme-border-default);
        color: var(--vds-theme-text-primary);
      }
      :host([tone="neutral"][variant="ghost"]) .button {
        color: var(--vds-theme-text-primary);
      }
      :host([tone="neutral"][variant="ghost"]:hover) .button,
      :host([tone="neutral"][variant="outline"]:hover) .button {
        background: var(--vds-theme-bg-hover);
      }

      :host([tone="destructive"][variant="solid"]) .button {
        background: var(--vds-theme-destructive);
        color: var(--vds-theme-destructive-fg);
      }
      :host([tone="destructive"][variant="solid"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-destructive) 90%, black);
      }
      :host([tone="destructive"][variant="soft"]) .button {
        background: color-mix(in oklch, var(--vds-theme-destructive) 12%, transparent);
        color: var(--vds-theme-destructive);
      }
      :host([tone="destructive"][variant="outline"]) .button {
        border-color: var(--vds-theme-destructive);
        color: var(--vds-theme-destructive);
      }
      :host([tone="destructive"][variant="ghost"]) .button {
        color: var(--vds-theme-destructive);
      }

      :host([disabled]) .button,
      :host([data-loading]) .button {
        opacity: 0.5;
        cursor: not-allowed;
      }

      :host(:focus-visible) .button {
        outline: 2px solid var(--vds-theme-border-focus);
        outline-offset: 2px;
      }

      .spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    `
    ];
  }
  updated(t) {
    super.updated(t), t.has("disabled") ? (v(this, this.internals, "ariaDisabled", this.disabled), this.tabIndex = this.disabled ? -1 : 0) : this.tabIndex < 0 && !this.disabled && (this.tabIndex = 0), t.has("ariaLabelText") && this.ariaLabelText != null && v(this, this.internals, "ariaLabel", this.ariaLabelText);
  }
  connectedCallback() {
    super.connectedCallback(), this.hasAttribute("tabindex") || (this.tabIndex = 0);
  }
  render() {
    return n`
      <button
        class="button"
        part="button"
        type="button"
        ?disabled=${this.disabled}
        tabindex="-1"
        aria-hidden="true"
      >
        ${this.loading ? n`<span class="spinner" aria-hidden="true"></span>` : n`<slot name="start"></slot>`}
        <slot></slot>
        <slot name="end"></slot>
      </button>
    `;
  }
}
r([
  e({ type: String, reflect: !0 })
], o.prototype, "variant");
r([
  e({ type: String, reflect: !0 })
], o.prototype, "tone");
r([
  e({ type: String, reflect: !0 })
], o.prototype, "size");
r([
  e({ type: String, reflect: !0 })
], o.prototype, "type");
r([
  e({ type: Boolean, reflect: !0 })
], o.prototype, "disabled");
r([
  e({ type: Boolean, reflect: !0, attribute: "data-loading" })
], o.prototype, "loading");
r([
  e({ type: String })
], o.prototype, "name");
r([
  e({ type: String })
], o.prototype, "value");
r([
  e({ type: String, attribute: "aria-label" })
], o.prototype, "ariaLabelText");
export {
  o as VdsButton
};
