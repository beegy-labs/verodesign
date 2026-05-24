import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { nothing as c, html as a } from "../../node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as i } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { setRole as v, setAriaProperty as p } from "../../utils/attribute-mirror.js";
import { VdsElement as h } from "../../base/vds-element.js";
import { css as g } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var f = Object.defineProperty, s = (n, e, l, u) => {
  for (var t = void 0, o = n.length - 1, d; o >= 0; o--)
    (d = n[o]) && (t = d(e, l, t) || t);
  return t && f(e, l, t), t;
};
const b = {
  default: "var(--vds-theme-text-dim)",
  success: "var(--vds-theme-status-success)",
  warning: "var(--vds-theme-status-warning)",
  destructive: "var(--vds-theme-status-destructive)"
};
class r extends h {
  constructor() {
    super(), this.tone = "zinc", this.rowLabel = "", this.description = "", this.descriptionTone = "default", this.chevron = !1, this.disabled = !1, this.handleClick = () => {
      this.disabled || this.emit("click");
    }, this.handleKeydown = (e) => {
      this.disabled || (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.emit("click"));
    }, this.internals = this.attachInternals(), v(this, this.internals, "button");
  }
  static {
    this.styles = g`
    :host {
      display: block;
      font-family: var(--vds-font-family-sans);
    }

    button {
      all: unset;
      box-sizing: border-box;
      inline-size: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--vds-spacing-3);
      padding: var(--vds-spacing-4);
      border-radius: var(--vds-radius-xl);
      background: var(--vds-exp-girok-redesign-surface-card);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-subtle);
      cursor: pointer;
    }

    button:focus-visible {
      outline: var(--vds-border-width-2) solid var(--vds-theme-border-focus);
      outline-offset: var(--vds-spacing-0_5);
    }

    .main {
      min-inline-size: 0;
      display: flex;
      align-items: center;
      gap: var(--vds-spacing-3);
      flex: 1;
    }

    .tile {
      inline-size: var(--vds-exp-girok-redesign-settings-row-icon-tile-size);
      block-size: var(--vds-exp-girok-redesign-settings-row-icon-tile-size);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--vds-radius-xl);
      background: var(--_tile-bg);
      color: var(--_tile-fg);
      flex: none;
    }

    .body {
      min-inline-size: 0;
      flex: 1;
    }

    .title {
      color: var(--vds-theme-text-primary);
      font-size: var(--vds-type-role-label-size);
      font-weight: var(--vds-font-weight-bold);
      line-height: var(--vds-font-lineheight-tight);
    }

    .description {
      margin-block-start: var(--vds-spacing-0_5);
      color: var(--_description-color);
      font-size: var(--vds-exp-girok-redesign-font-size-caption);
      font-weight: var(--vds-font-weight-medium);
    }

    .trailing {
      color: var(--vds-theme-text-dim);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
    }

    svg {
      inline-size: 1rem;
      block-size: 1rem;
    }
  `;
  }
  updated() {
    p(this, this.internals, "ariaDisabled", this.disabled);
    const e = [this.rowLabel, this.description].filter(Boolean).join(" ");
    e && p(this, this.internals, "ariaLabel", e);
  }
  tileVars() {
    return [
      `--_tile-bg: var(--vds-exp-girok-redesign-settings-row-icon-tile-bg-${this.tone});`,
      `--_tile-fg: var(--vds-exp-girok-redesign-settings-row-icon-tile-fg-${this.tone});`,
      `--_description-color: ${b[this.descriptionTone]};`
    ].join(" ");
  }
  render() {
    return a`
      <button
        type="button"
        style=${this.tileVars()}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
        @keydown=${this.handleKeydown}
      >
        <span class="main">
          <span class="tile"><slot name="leading"></slot></span>
          <span class="body">
            <span class="title">${this.rowLabel}</span>
            ${this.description ? a`<div class="description">${this.description}</div>` : c}
          </span>
        </span>
        <span class="trailing">
          <slot name="trailing">
            ${this.chevron ? a`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path d="M6 3.5 10.5 8 6 12.5" /></svg>` : c}
          </slot>
        </span>
      </button>
    `;
  }
}
s([
  i({ type: String, reflect: !0 })
], r.prototype, "tone");
s([
  i({ type: String, attribute: "row-label" })
], r.prototype, "rowLabel");
s([
  i({ type: String })
], r.prototype, "description");
s([
  i({ type: String, attribute: "description-tone" })
], r.prototype, "descriptionTone");
s([
  i({ type: Boolean, reflect: !0 })
], r.prototype, "chevron");
s([
  i({ type: Boolean, reflect: !0 })
], r.prototype, "disabled");
export {
  r as VdsSettingsRow
};
