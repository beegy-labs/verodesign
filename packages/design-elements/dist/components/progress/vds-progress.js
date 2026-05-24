import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { nothing as l, html as m } from "../../node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as t } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { setRole as d, setAriaProperty as p } from "../../utils/attribute-mirror.js";
import { VdsElement as u } from "../../base/vds-element.js";
import { css as g } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var v = Object.defineProperty, i = (n, e, a, c) => {
  for (var s = void 0, o = n.length - 1, h; o >= 0; o--)
    (h = n[o]) && (s = h(e, a, s) || s);
  return s && v(e, a, s), s;
};
const f = {
  success: "var(--vds-theme-status-success)",
  destructive: "var(--vds-theme-status-destructive)",
  warning: "var(--vds-theme-status-warning)",
  neutral: "var(--vds-theme-text-dim)"
};
class r extends u {
  constructor() {
    super(), this.value = 0, this.max = 100, this.min = 0, this.tone = "primary", this.size = "md", this.indeterminate = !1, this.ariaLabelText = null, this.internals = this.attachInternals(), d(this, this.internals, "progressbar");
  }
  static {
    this.styles = g`
    :host {
      display: block;
      inline-size: 100%;
    }

    .root {
      position: relative;
      inline-size: 100%;
      block-size: var(--_progress-height);
      overflow: hidden;
      border-radius: var(--vds-radius-full);
      background: var(--vds-exp-girok-redesign-progress-track-bg);
    }

    .fill {
      block-size: 100%;
      border-radius: inherit;
      background: var(--_progress-fill);
      transition: inline-size var(--vds-duration-medium) var(--vds-easing-ease-out);
    }

    :host([indeterminate]) .fill {
      inline-size: 42%;
      animation: vds-progress-indeterminate 1.2s var(--vds-easing-ease-out) infinite;
    }

    :host([size="sm"]) { --_progress-height: var(--vds-exp-girok-redesign-progress-height-sm); }
    :host([size="md"]) { --_progress-height: var(--vds-exp-girok-redesign-progress-height-md); }
    :host([size="lg"]) { --_progress-height: var(--vds-exp-girok-redesign-progress-height-lg); }

    @keyframes vds-progress-indeterminate {
      0% { transform: translateX(-120%); }
      100% { transform: translateX(260%); }
    }

    @media (prefers-reduced-motion: reduce) {
      .fill {
        transition: none;
      }

      :host([indeterminate]) .fill {
        animation: none;
        transform: translateX(0);
      }
    }
  `;
  }
  updated() {
    const e = this.ariaLabelText?.trim();
    if (e && p(this, this.internals, "ariaLabel", e), this.indeterminate) {
      this.removeAttribute("aria-valuenow"), this.removeAttribute("aria-valuemin"), this.removeAttribute("aria-valuemax");
      return;
    }
    const a = this.clampedValue;
    this.setAttribute("aria-valuemin", String(this.min)), this.setAttribute("aria-valuemax", String(this.safeMax)), this.setAttribute("aria-valuenow", String(a));
  }
  get safeMax() {
    return this.max > this.min ? this.max : this.min + 1;
  }
  get clampedValue() {
    return Math.min(Math.max(this.value, this.min), this.safeMax);
  }
  get ratio() {
    return (this.clampedValue - this.min) / (this.safeMax - this.min) * 100;
  }
  get fillStyle() {
    return this.tone === "primary" ? "linear-gradient(90deg, var(--vds-exp-girok-progress-goal-fill-start), var(--vds-exp-girok-progress-goal-fill-end))" : f[this.tone];
  }
  render() {
    const e = this.indeterminate ? l : `${this.ratio}%`;
    return m`
      <div class="root" part="track" style=${`--_progress-fill: ${this.fillStyle};`}>
        <div class="fill" part="fill" style=${e === l ? l : `inline-size: ${e};`}></div>
      </div>
    `;
  }
}
i([
  t({ type: Number })
], r.prototype, "value");
i([
  t({ type: Number })
], r.prototype, "max");
i([
  t({ type: Number, attribute: "min" })
], r.prototype, "min");
i([
  t({ type: String, reflect: !0 })
], r.prototype, "tone");
i([
  t({ type: String, reflect: !0 })
], r.prototype, "size");
i([
  t({ type: Boolean, reflect: !0 })
], r.prototype, "indeterminate");
i([
  t({ type: String, attribute: "aria-label" })
], r.prototype, "ariaLabelText");
export {
  r as VdsProgress
};
