import "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/reactive-element.js";
import { html as c } from "../../node_modules/.pnpm/lit-html@3.3.2/node_modules/lit-html/lit-html.js";
import "../../node_modules/.pnpm/lit-element@4.2.2/node_modules/lit-element/lit-element.js";
import { property as a } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/decorators/property.js";
import { VdsElement as p } from "../../base/vds-element.js";
import { css as f } from "../../node_modules/.pnpm/@lit_reactive-element@2.1.2/node_modules/@lit/reactive-element/css-tag.js";
var u = Object.defineProperty, n = (i, r, e, s) => {
  for (var t = void 0, o = i.length - 1, d; o >= 0; o--)
    (d = i[o]) && (t = d(r, e, t) || t);
  return t && u(r, e, t), t;
};
class l extends p {
  constructor() {
    super(...arguments), this.required = !1, this.size = "md", this.handleClick = (r) => {
      if (!this.for || r.defaultPrevented) return;
      const e = this.getRootNode().getElementById(this.for);
      if (e && typeof e.focus == "function" && (e.focus(), e.tagName === "INPUT" || e.tagName === "TEXTAREA")) {
        const s = e;
        (s.type === "checkbox" || s.type === "radio") && s.click();
      }
    };
  }
  static {
    this.styles = f`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-1);
      font-family: var(--vds-font-family-sans);
      font-weight: var(--vds-type-role-label-weight);
      color: var(--vds-theme-text-primary);
      cursor: pointer;
      user-select: none;
    }
    :host([size="sm"]) { font-size: var(--vds-type-role-label-size); }
    :host([size="md"]) { font-size: var(--vds-type-role-body-size); }
    :host([size="lg"]) { font-size: var(--vds-type-role-title-size); }

    .required {
      color: var(--vds-theme-destructive);
      margin-left: calc(var(--vds-spacing-0_5) / 2);
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this.handleClick);
  }
  render() {
    return c`
      <slot></slot>
      ${this.required ? c`<span class="required" aria-hidden="true">*</span>` : null}
    `;
  }
}
n([
  a({ type: String, reflect: !0 })
], l.prototype, "for");
n([
  a({ type: Boolean, reflect: !0 })
], l.prototype, "required");
n([
  a({ type: String, reflect: !0 })
], l.prototype, "size");
export {
  l as VdsLabel
};
