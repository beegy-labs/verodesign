import { unsafeCSS as l, css as v, html as c } from "lit";
import { property as r } from "lit/decorators.js";
import { setAriaProperty as h, setRole as b } from "../../utils/attribute-mirror.js";
import { focusRing as p, srOnly as m } from "../../styles/shared.js";
import { VdsElement as f } from "../../base/vds-element.js";
var y = Object.defineProperty, s = (i, t, n, g) => {
  for (var e = void 0, o = i.length - 1, d; o >= 0; o--)
    (d = i[o]) && (e = d(t, n, e) || e);
  return e && y(t, n, e), e;
};
const u = "2.75rem";
class a extends f {
  constructor() {
    super(), this.variant = "ghost", this.tone = "neutral", this.size = "md", this.disabled = !1, this.ariaLabelText = null, this.handleClick = (t) => {
      this.disabled && (t.preventDefault(), t.stopImmediatePropagation());
    }, this.handleKeydown = (t) => {
      (t.key === " " || t.key === "Enter") && (t.preventDefault(), this.click());
    }, this.internals = this.attachInternals(), this.addEventListener("click", this.handleClick), this.addEventListener("keydown", this.handleKeydown);
  }
  static {
    this.formAssociated = !0;
  }
  static {
    this.styles = [
      p,
      m,
      v`
      :host { display: inline-flex; vertical-align: middle; }
      :host([hidden]) { display: none; }

      .button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        user-select: none;
        border-radius: var(--vds-radius-md);
        transition: background-color var(--vds-duration-fast) var(--vds-easing-ease-out),
                    color var(--vds-duration-fast) var(--vds-easing-ease-out);
        color: var(--vds-theme-text-secondary);
      }

      @media (pointer: coarse) {
        .button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: max(100%, ${l(u)});
          height: max(100%, ${l(u)});
          transform: translate(-50%, -50%);
        }
      }
      .button ::slotted(*) {
        width: 1em; height: 1em;
      }

      :host([size="sm"]) .button { padding: var(--vds-spacing-1);   font-size: 0.875rem; }
      :host([size="md"]) .button { padding: var(--vds-spacing-1_5); font-size: 1rem;     }
      :host([size="lg"]) .button { padding: var(--vds-spacing-2);   font-size: 1.125rem; }

      :host([variant="ghost"][tone="neutral"]:hover) .button {
        background: var(--vds-theme-bg-hover);
        color: var(--vds-theme-text-primary);
      }
      :host([variant="ghost"][tone="primary"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-primary) 8%, transparent);
        color: var(--vds-theme-primary);
      }
      :host([variant="ghost"][tone="destructive"]:hover) .button {
        background: color-mix(in oklch, var(--vds-theme-destructive) 8%, transparent);
        color: var(--vds-theme-destructive);
      }

      :host([variant="soft"][tone="neutral"]) .button { background: var(--vds-theme-bg-muted); }
      :host([variant="soft"][tone="primary"]) .button {
        background: color-mix(in oklch, var(--vds-theme-primary) 12%, transparent);
        color: var(--vds-theme-primary);
      }
      :host([variant="soft"][tone="destructive"]) .button {
        background: color-mix(in oklch, var(--vds-theme-destructive) 12%, transparent);
        color: var(--vds-theme-destructive);
      }

      :host([variant="outline"]) .button {
        border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      }

      :host([disabled]) .button { opacity: 0.5; cursor: not-allowed; }

      :host(:focus-visible) .button {
        outline: 2px solid var(--vds-theme-border-focus);
        outline-offset: 2px;
      }
    `
    ];
  }
  updated(t) {
    super.updated(t), t.has("disabled") ? (h(this, this.internals, "ariaDisabled", this.disabled), this.tabIndex = this.disabled ? -1 : 0) : this.tabIndex < 0 && !this.disabled && (this.tabIndex = 0), t.has("ariaLabelText") && this.ariaLabelText != null && h(this, this.internals, "ariaLabel", this.ariaLabelText);
  }
  connectedCallback() {
    super.connectedCallback(), b(this, this.internals, "button"), this.hasAttribute("tabindex") || (this.tabIndex = 0);
  }
  render() {
    return c`
      <button class="button" part="button" type="button" ?disabled=${this.disabled} tabindex="-1" aria-hidden="true">
        <slot></slot>
      </button>
    `;
  }
}
s([
  r({ type: String, reflect: !0 })
], a.prototype, "variant");
s([
  r({ type: String, reflect: !0 })
], a.prototype, "tone");
s([
  r({ type: String, reflect: !0 })
], a.prototype, "size");
s([
  r({ type: Boolean, reflect: !0 })
], a.prototype, "disabled");
s([
  r({ type: String, attribute: "aria-label" })
], a.prototype, "ariaLabelText");
export {
  a as VdsIconButton
};
