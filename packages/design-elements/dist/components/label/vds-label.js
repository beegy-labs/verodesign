import { css as c, html as d } from "lit";
import { property as n } from "lit/decorators.js";
import { VdsElement as p } from "../../base/vds-element.js";
var u = Object.defineProperty, a = (i, r, e, s) => {
  for (var t = void 0, o = i.length - 1, f; o >= 0; o--)
    (f = i[o]) && (t = f(r, e, t) || t);
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
    this.styles = c`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--vds-spacing-1);
      font-family: var(--vds-font-family-sans);
      font-weight: var(--vds-font-weight-500);
      color: var(--vds-theme-text-primary);
      cursor: pointer;
      user-select: none;
    }
    :host([size="sm"]) { font-size: var(--vds-font-size-sm); }
    :host([size="md"]) { font-size: var(--vds-font-size-base); }
    :host([size="lg"]) { font-size: var(--vds-font-size-lg); }

    .required {
      color: var(--vds-theme-destructive);
      margin-left: 2px;
    }
  `;
  }
  connectedCallback() {
    super.connectedCallback(), this.addEventListener("click", this.handleClick);
  }
  render() {
    return d`
      <slot></slot>
      ${this.required ? d`<span class="required" aria-hidden="true">*</span>` : null}
    `;
  }
}
a([
  n({ type: String, reflect: !0 })
], l.prototype, "for");
a([
  n({ type: Boolean, reflect: !0 })
], l.prototype, "required");
a([
  n({ type: String, reflect: !0 })
], l.prototype, "size");
export {
  l as VdsLabel
};
