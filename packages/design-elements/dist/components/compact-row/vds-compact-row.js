import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { nothing as e, html as o } from "../../node_modules/.pnpm/lit-html@3.3.3/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as r } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as h } from "../../base/vds-element.js";
import { css as c } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var p = Object.defineProperty, s = (i, d, l, g) => {
  for (var t = void 0, n = i.length - 1, v; n >= 0; n--)
    (v = i[n]) && (t = v(d, l, t) || t);
  return t && p(d, l, t), t;
};
const u = {
  neutral: "var(--vds-theme-border-default)",
  info: "var(--vds-theme-status-info)",
  success: "var(--vds-theme-status-success)",
  warning: "var(--vds-theme-status-warning)",
  danger: "var(--vds-theme-destructive)"
};
class a extends h {
  constructor() {
    super(...arguments), this.as = "button", this.href = null, this.tone = "neutral", this.selected = !1, this.disabled = !1, this.showChevron = !1;
  }
  static {
    this.styles = c`
    :host {
      display: block;
      color: var(--vds-theme-text-primary);
      font-family: var(--vds-font-family-sans);
    }
    :host([hidden]) {
      display: none;
    }
    .root {
      all: unset;
      box-sizing: border-box;
      inline-size: 100%;
      display: flex;
      align-items: center;
      gap: var(--vds-spacing-3);
      padding: var(--vds-spacing-3);
      border-radius: var(--vds-radius-lg);
      border: var(--vds-border-width-1) solid var(--vds-theme-border-default);
      background: var(--vds-theme-bg-card);
      color: var(--vds-theme-text-primary);
      text-align: left;
      transition:
        border-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard),
        background-color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard),
        color var(--vds-motion-duration-fast) var(--vds-motion-easing-standard);
    }
    :host([selected]) .root {
      background: var(--vds-theme-bg-selected);
    }
    :host([interactive]) .root {
      cursor: pointer;
    }
    :host([interactive]) .root:hover {
      border-color: var(--vds-tone-accent, var(--vds-theme-border-default));
      background: var(--vds-theme-bg-elevated-hover);
    }
    :host([disabled]) .root {
      color: var(--vds-theme-text-dim);
      background: var(--vds-theme-state-disabled);
      cursor: not-allowed;
      pointer-events: none;
    }
    :host([interactive]) .root:focus-visible {
      outline: var(--vds-border-width-2) solid var(--vds-theme-border-focus);
      outline-offset: var(--vds-spacing-0_5);
    }
    .leading,
    .trailing {
      display: inline-flex;
      align-items: center;
      flex-shrink: 0;
    }
    .content {
      min-inline-size: 0;
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: var(--vds-spacing-1);
    }
    .label,
    .meta {
      min-inline-size: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .label {
      font-size: var(--vds-type-role-title-size);
      font-weight: var(--vds-type-role-title-weight);
      line-height: var(--vds-type-role-title-lineheight);
    }
    .meta {
      color: var(--vds-theme-text-secondary);
      font-size: var(--vds-type-role-label-size);
      font-weight: var(--vds-type-role-label-weight);
      line-height: var(--vds-type-role-label-lineheight);
    }
    .trailing {
      gap: var(--vds-spacing-2);
    }
    .chevron {
      color: var(--vds-theme-text-secondary);
      font-size: var(--vds-type-role-body-size);
      line-height: var(--vds-type-role-body-lineheight);
    }
  `;
  }
  updated() {
    this.style.setProperty("--vds-tone-accent", u[this.tone]), this.toggleAttribute("interactive", this.as !== "div");
  }
  renderTag() {
    return this.as === "link" ? o`
        <a
          class="root"
          aria-disabled=${this.disabled ? "true" : e}
          aria-current=${this.selected ? "true" : e}
          href=${this.disabled ? e : this.href ?? e}
        >
          ${this.renderContent()}
        </a>
      ` : this.as === "div" ? o`<div class="root">${this.renderContent()}</div>` : o`
      <button
        class="root"
        type="button"
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? "true" : e}
        aria-current=${this.selected ? "true" : e}
      >
        ${this.renderContent()}
      </button>
    `;
  }
  renderContent() {
    return o`
      <span class="leading"><slot name="leading"></slot></span>
      <span class="content">
        <span class="label"><slot></slot></span>
        <span class="meta"><slot name="meta"></slot></span>
      </span>
      <span class="trailing">
        <slot name="trailing"></slot>
        ${this.showChevron ? o`<span class="chevron" aria-hidden="true">›</span>` : e}
      </span>
    `;
  }
  render() {
    return this.renderTag();
  }
}
s([
  r({ type: String, reflect: !0 })
], a.prototype, "as");
s([
  r({ type: String })
], a.prototype, "href");
s([
  r({ type: String, reflect: !0 })
], a.prototype, "tone");
s([
  r({ type: Boolean, reflect: !0 })
], a.prototype, "selected");
s([
  r({ type: Boolean, reflect: !0 })
], a.prototype, "disabled");
s([
  r({ type: Boolean, reflect: !0, attribute: "show-chevron" })
], a.prototype, "showChevron");
export {
  a as VdsCompactRow
};
